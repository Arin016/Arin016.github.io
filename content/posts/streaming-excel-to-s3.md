---
title: "Streaming 25 Million Excel Cells Through 7 MB of Memory"
date: 2026-06-12
draft: false
tags: ["java", "aws", "s3", "apache-poi", "streaming", "memory"]
description: "How I designed a 5-stage export pipeline that maintains O(1) memory across 500K+ row Excel reports, multi-GB ZIPs, and concurrent S3 uploads on shared 4GB pods."
ShowToc: true
TocOpen: false
---

# Streaming 25 Million Excel Cells Through 7 MB of Memory

> **TL;DR:** I built an export pipeline that streams 15M+ records as formatted Excel files inside ZIPs directly to S3. Memory is flat at 7 MB regardless of data size. The architecture is five bounded stages — each one independently capped — so the system doesn't know or care how much data is coming.

```
┌──────────┐    ┌──────────┐    ┌────────────┐    ┌─────────────┐    ┌──────────┐
│    DB    │───►│ SXSSFWork│───►│  S3 Upload │───►│  ZIP Stream │───►│ S3 Final │
│ (paged)  │    │ book     │    │ (per file) │    │ (S3→ZIP→S3) │    │  (.zip)  │
└──────────┘    └──────────┘    └────────────┘    └─────────────┘    └──────────┘
  ~batch size    50-row window    ~10-20 MB         2 MB + 5 MB        complete
  (configurable) (flushed to disk) (unavoidable)    = 7 MB constant    object
```

| What | Before | After |
|------|--------|-------|
| Peak memory (single export) | 2+ GB (OOM crashes) | **~30 MB** |
| Concurrent exports on 4 GB pod | 1 (barely) | **4** (zero OOM) |
| Architecture limit | Data size | **None — O(1) memory** |
| CSV throughput | — | **840K records/s at 64 MB** |
| Production scale | — | **15M+ records, 300+ tenants** |

---

I work on an identity governance platform that serves 300+ enterprise clients. One of the things we do is let security teams export massive compliance reports — segregation-of-duties violations, access certifications, audit trails. Some of these reports hit 500K+ rows across multiple sheets.

The export lands as an Excel file (or a ZIP of Excel files) in S3. Sounds simple until you think about what's actually happening in memory.

## The naive approach, and why it fails

Here's what most people's first instinct looks like:

```java
// Create the workbook
XSSFWorkbook workbook = new XSSFWorkbook();
Sheet sheet = workbook.createSheet("Violations");

for (Record record : allRecords) {  // 500,000 records
    Row row = sheet.createRow(rowNum++);
    // fill cells...
}

// Write to S3
ByteArrayOutputStream baos = new ByteArrayOutputStream();
workbook.write(baos);
s3Client.putObject(request, RequestBody.fromBytes(baos.toByteArray()));
```

Let's count the memory:

- `XSSFWorkbook` holds every row, every cell, every style in a DOM tree. 500K rows × 10 columns × ~200 bytes/cell conservatively = **~1 GB in the workbook alone.**
- `ByteArrayOutputStream` duplicates the entire serialized .xlsx content: another **200-400 MB.**
- `toByteArray()` copies it AGAIN: **another 200-400 MB.**

Peak memory: **north of 2 GB** for a single export. We run 4 concurrent exports on pods with 4 GB heap. This math doesn't work.

The old system threw `OutOfMemoryError` regularly. Exports would hang. Pods would restart. Pager would go off. The usual.

## The constraints I was working within

Before I walk through the solution, here's what made this interesting — it's not just "use a streaming library":

1. **Apache POI is the only mature Java library for .xlsx generation.** No alternatives for enterprise Excel with formatting, multiple sheets, formulas. You're stuck with POI's architecture.
2. **POI's streaming mode (SXSSFWorkbook) flushes rows to temp files on disk** — but the final `write()` call still reads them ALL back to assemble the .xlsx ZIP structure. You can't stream the write.
3. **S3 has no OutputStream API.** You can upload bytes, or an InputStream with known length. You can't connect POI's `write(OutputStream)` directly to S3.
4. **The pod is shared.** 4 concurrent exports on one 4 GB pod. I can't budget more than ~200 MB per export, ideally less.
5. **Reports can span multiple workbooks** (Excel has a limit of ~1M rows per sheet, and we split at 500K × 10 sheets = 5M cells per workbook for manageability). The final deliverable is a ZIP containing all workbooks.

Each of these constraints individually has a known solution. The challenge was satisfying all five simultaneously.

## The architecture: a 5-stage pipeline, each stage bounded

Here's the full flow. I'll walk through each stage, explain what's happening in memory, and where the tricky parts are.

```
┌──────────┐     ┌───────────┐     ┌────────────┐     ┌───────────┐     ┌─────────┐
│ Database │────►│ SXSSFWork │────►│ S3 Upload  │────►│ ZIP Stream│────►│ S3 Final│
│ (paged)  │     │ book      │     │ (per-wb)   │     │ (S3→ZIP→S3)    │ (.zip)  │
└──────────┘     └───────────┘     └────────────┘     └───────────┘     └─────────┘
  batch size      50-row window     ByteArrayOS         2MB read          5MB write
  configurable    flush to disk     (10-20MB)           + 5MB write       buffer
                                    ← unavoidable →     buffer
```

### Stage 1: Paginated database fetching

Nothing clever here — standard pagination. Fetch N rows, process them, null the reference, move on. The batch never lives beyond one iteration.

```java
while (hasMore) {
    List<Record> batch = fetchNextPage(cursor, batchSize);
    processBatch(batch);
    batch = null;  // explicit for clarity, though GC handles it
    // ...
}
```

Memory: **O(batch size).** Configurable, typically a few hundred KB.

### Stage 2: SXSSFWorkbook — the 50-row sliding window

Apache POI's `SXSSFWorkbook` is their "streaming" workbook. It keeps only the last N rows in memory (the "window") and flushes older rows to temporary XML files on disk.

```java
SXSSFWorkbook workbook = new SXSSFWorkbook(50);  // 50-row window
```

With a window of 50 rows and 10 columns, you're holding maybe 50 × 10 × 200 bytes = **~100 KB** of actual row data in memory at any time. Rows 1 through 499,950 are on disk as temp XML fragments.

But there's a catch most people miss: **the shared strings table grows unbounded.** Every unique string value in the workbook gets interned into a table that lives in memory for the workbook's entire lifetime. If your 500K rows have high string cardinality (unique IDs, timestamps, names), this table alone can hit hundreds of MB.

The fix: set inline strings mode.

```java
workbook.setCompressTempFiles(true);  // gzip the temp XML
```

And for the cell values themselves — you just accept that strings will be inlined in each cell rather than deduplicated via the shared string table. Slightly larger .xlsx file, dramatically less memory.

**Memory at this stage: ~5-15 MB** (window + some POI internals + style objects).

### Stage 3: The unavoidable materialization — workbook → S3

Here's the part that can't be streamed, and I want to be honest about it.

When you call `workbook.write(outputStream)`, POI:
1. Reads all the temp XML files back
2. Compresses them into a ZIP structure (because .xlsx is literally a ZIP)
3. Writes the assembled ZIP to your OutputStream

There's no incremental API. No callback that gives you chunks. The `write()` call produces the entire .xlsx in one pass into whatever OutputStream you give it.

And on the S3 side, `PutObject` needs either the full byte array or an InputStream with a known content length. You can't know the length until POI finishes writing.

So we materialize:

```java
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
workbook.write(outputStream);
byte[] workbookData = outputStream.toByteArray();
cloudStorageAPI.uploadFile(bucket, path, workbookData);
```

Yes, this puts the full serialized workbook in memory. For our workbooks (500K rows × 10 sheets = 5M cells), that's typically 10-20 MB.

**Why this is acceptable:** we split into multiple workbooks at 500K rows × 10 sheets. Each workbook is manageable. We process them sequentially, upload each, then discard it before creating the next. The peak is one workbook in memory, not all of them.

**Why this can't be eliminated:** POI doesn't expose a content-length-up-front API, and S3's `PutObject` requires known length. The only way to connect them without materialization would be multipart upload (where each part has known length), but POI doesn't give you hooks to emit chunks during write. This is an architectural limitation in both libraries simultaneously.

**Memory: ~10-20 MB** spike per workbook (transient — freed immediately after upload).

### Stage 4: The streaming ZIP — S3 → buffer → ZIP → S3

This is where it gets interesting. We have N workbooks sitting in S3 (say, 3 workbooks of 20 MB each). We need to deliver a single .zip file containing all of them. The ZIP could be 50-60 MB.

The naive approach: download all workbooks, zip them in memory or on disk, upload the zip. Memory: 60+ MB. Disk: 120+ MB (workbooks + zip). Latency: three sequential I/O passes.

**The streaming approach: read from S3 and write to S3 simultaneously, with only 7 MB in the middle.**

```java
cloudStorageAPI.uploadStreamDirectly(bucket, zipPath, (zipOutputStream) -> {
    byte[] buffer = new byte[2 * 1024 * 1024];  // 2 MB read buffer

    for (String workbookPath : workbookPaths) {
        // Open a STREAM from S3 (no full download)
        InputStream workbookStream = cloudStorageAPI.downloadFileAsStream(bucket, workbookPath);

        zipOutputStream.putNextEntry(new ZipEntry(workbookName));

        // Pipe: S3 GET → buffer → ZIP compress → S3 multipart upload
        int bytesRead;
        while ((bytesRead = workbookStream.read(buffer)) != -1) {
            zipOutputStream.write(buffer, 0, bytesRead);
        }

        zipOutputStream.closeEntry();
        workbookStream.close();

        // Delete the source workbook — we're done with it
        cloudStorageAPI.deleteFile(bucket, workbookPath);
    }
});
```

What's actually happening here byte by byte:

```
S3 (source workbook)                              S3 (destination ZIP)
       │                                                ▲
       │ GET response body                              │ UploadPart (5MB chunks)
       │ (streamed, not buffered)                       │
       ▼                                                │
┌─────────────┐      ┌─────────────┐      ┌────────────────────┐
│  2 MB read  │─────►│ ZipOutput   │─────►│ S3Buffered         │
│  buffer     │      │ Stream      │      │ OutputStream       │
│             │      │ (deflate)   │      │ (5 MB buffer)      │
└─────────────┘      └─────────────┘      └────────────────────┘
                                                    │
                                                    ▼
                                           S3.uploadPart() when
                                           buffer hits 5 MB
```

The `S3BufferedOutputStream` is the key piece. It extends `java.io.OutputStream` and internally:
1. Accumulates writes into a 5 MB buffer
2. When the buffer fills, calls `S3.uploadPart()` with those 5 MB
3. Resets the buffer and continues
4. On `close()`, flushes the remaining bytes as the final part and calls `CompleteMultipartUpload`

I've extracted this as a [standalone library](https://github.com/Arin016/s3-outputstream) because the AWS SDK genuinely doesn't provide this primitive ([open since 2022](https://github.com/aws/aws-sdk-java-v2/issues/3128)).

**Memory at this stage: 2 MB (read buffer) + 5 MB (write buffer) = 7 MB.** Constant. Whether the ZIP is 50 MB or 5 GB.

### Stage 5: Completion

After the ZIP is assembled in S3 via multipart upload, we:
- Store the final path + size
- Generate a pre-signed download URL
- Notify the client via the progress API

No additional memory.

## The full memory budget

| Stage | Peak | Duration |
|-------|------|----------|
| DB fetch batch | ~configurable (KB) | Per batch, freed between batches |
| SXSSFWorkbook active | ~5-15 MB | Per workbook lifetime |
| Workbook → S3 materialization | ~10-20 MB | Transient spike, freed after upload |
| ZIP streaming (S3 → ZIP → S3) | ~7 MB | Duration of ZIP assembly |
| **Concurrent peak (1 export)** | **~25-35 MB** | — |
| **4 concurrent exports** | **~100-140 MB** | On a 4 GB pod |

Compared to the naive approach: **2+ GB for a single export vs ~30 MB.** That's what allows 4 concurrent exports on one pod without OOM.

## The CellStyle pooling problem (bonus)

One more thing that bit us at scale. Excel has a hard limit of ~64,000 cell styles per workbook. POI provides no built-in way to reuse styles. If you naively call `workbook.createCellStyle()` per cell:

```java
// This blows up at row ~6,400 (64K styles / 10 columns)
for (Row row : rows) {
    for (Cell cell : row) {
        CellStyle style = workbook.createCellStyle();  // DON'T DO THIS
        style.setDataFormat(...);
        cell.setCellStyle(style);
    }
}
```

Solution: a per-workbook style cache keyed on formatting properties.

```java
Map<String, CellStyle> styleCache = new ConcurrentHashMap<>();

CellStyle getOrCreateStyle(Workbook wb, String formatKey) {
    return styleCache.computeIfAbsent(formatKey, k -> {
        CellStyle style = wb.createCellStyle();
        // apply formatting based on key
        return style;
    });
}
```

With 10-20 unique formatting patterns across 500K rows, you use 10-20 styles instead of 5,000,000. POI should have this built in. It doesn't.

## The formula injection guard

Excel interprets cells starting with `=`, `+`, `-`, `@`, `\t`, `\r` as formulas. If your data contains user-generated strings (and compliance report data absolutely does), you need to escape them:

```java
char first = value.charAt(0);
if (first == '=' || first == '+' || first == '-' || first == '@' || first == '\t' || first == '\r') {
    value = "'" + value;  // prefix with single quote — Excel displays it without the quote
}
```

This is a CSV injection / formula injection vulnerability. POI doesn't handle it for you. Every enterprise application writing user data to Excel needs this.

## What I'd do differently

If I were designing this from scratch without the POI constraint:

1. **Skip .xlsx entirely for large exports.** CSV or Parquet, streamed directly to S3 in one pass. Zero materialization. But enterprise clients want Excel — with formatting, multiple sheets, frozen panes, auto-filters. So POI stays.

2. **A true single-pass .xlsx writer** that emits inline strings, declares sheets upfront, writes rows directly into a live ZIP stream, and never touches temp files. Go's [excelize](https://github.com/qax-os/excelize) library does something close to this. Java POI doesn't. This is architecturally possible but would essentially be rewriting POI's OOXML layer — a multi-month effort. I've raised this as an RFC with the POI community.

3. **Multipart upload directly from POI's write()** — if the S3 SDK offered an OutputStream, or if POI offered a chunked write API, the Stage 3 materialization disappears entirely. Neither does. Two independent library gaps that compound.

## Takeaways

- **Memory is bounded by design, not by hope.** Every stage has an explicit cap. Nothing grows with data size. This is the difference between "works in dev" and "works at 500K rows × 4 concurrent × 300 clients."
- **The AWS SDK's lack of an OutputStream API costs the entire Java ecosystem.** Every project that writes dynamically generated content to S3 reinvents the same multipart-upload-wrapped-in-OutputStream plumbing. I've [published mine](https://github.com/Arin016/s3-outputstream) and [commented on the open issue](https://github.com/aws/aws-sdk-java-v2/issues/3128).
- **POI's "streaming" mode (SXSSFWorkbook) is streaming for writes, not for the final serialize.** The `write()` call is still a full materialization. Plan for it.
- **Composition of streams is powerful but invisible.** `ZipOutputStream(S3BufferedOutputStream(...))` — that one line connects four systems (ZIP compression → buffer management → multipart upload → S3 storage) with 7 MB of memory. Most of the engineering is making sure each layer stays bounded.

---

*Built in production at an identity governance platform serving 300+ enterprise clients. Handles 500K+ row exports across AWS, Azure, and GovCloud with zero OOM incidents since deployment.*
