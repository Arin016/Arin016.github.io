---
title: "Exports without an upper bound, in 7 MB of memory"
date: "2025-06-12"
tag: "STREAMING"
minutes: 19
excerpt: "The 5-stage bounded pipeline behind unbounded Excel exports. 15M+ rows proven in production. POI SXSSF, S3 multipart, streaming ZIP."
---

I work on an identity governance platform serving 300+ enterprise tenants. One of the things we do is let security teams export massive compliance reports. SoD violations, access certifications, audit trails. Some hit 500K+ rows across multiple sheets, landing as Excel (or ZIPs of Excel) in S3.

Sounds simple until you count what's in memory.

## The naive approach, and why it dies

```java
XSSFWorkbook workbook = new XSSFWorkbook();
Sheet sheet = workbook.createSheet("Violations");
for (Record record : allRecords) { // 500,000 records
    Row row = sheet.createRow(rowNum++);
    // fill cells...
}
ByteArrayOutputStream baos = new ByteArrayOutputStream();
workbook.write(baos);
s3Client.putObject(request, RequestBody.fromBytes(baos.toByteArray()));
```

Memory math: `XSSFWorkbook` holds every row/cell/style in a DOM tree. 500K rows × 10 cols × ~200 bytes ≈ **1GB**. `ByteArrayOutputStream` duplicates serialized bytes: another 200–400MB. `toByteArray()` copies again. Peak: **north of 2GB for one export**. Four such exports share one machine with 4 GB of memory. The old system exhausted it regularly. Exports stalled, machines restarted, and failures arrived during audit season, when the reports matter most.

Drag the rows. Watch the naive bar cross the pod line while the pipeline bar never moves.

```widget-memorysim
interactive: drag-the-rows memory simulator (requires JavaScript)
```

## Constraints that made it interesting

1. **POI is the only mature Java .xlsx library.** Enterprise Excel with formatting, sheets, formulas. You're stuck with its architecture.
2. **POI streaming (SXSSF) still reassembles everything on `write()`.** Rows flush to temp disk, but the final write reads them all back. You can't stream the write.
3. **S3 has no OutputStream API.** Bytes or InputStream-with-length only. You can't plug `workbook.write(out)` into S3.
4. **The pod is shared.** 4 concurrent exports, 4GB heap → budget ~200MB each, ideally far less.
5. **Multi-workbook reports.** Split at 500K rows for manageability; final deliverable is a ZIP of workbooks.

Each constraint has a known answer. Satisfying all five at once was the job.

## Why not bigger machines

The obvious fix is a bigger pod. The math kills it. Four concurrent exports at 2 GB each need an 8 GB heap before the application does anything else, and next quarter brings a bigger report. Vertical scaling chases a moving target while the bill grows per gigabyte. The bounded pipeline costs the same 7 MB whether the report doubles or grows tenfold. That property is worth more than any single speedup number.

## The architecture: 5 stages, each bounded

```
DB (paged) → SXSSF (50-row window) → S3 per-workbook → ZIP stream (S3→ZIP→S3) → final .zip
              flush to disk          10–20MB unavoidable   2MB read + 5MB write   5MB buffer
```

**Stage 1 — paginated fetch.** Standard pagination, `O(batch size)`, a few hundred KB. Nothing clever; that's the point.

**Stage 2 — SXSSF 50-row window.** Only the last 50 rows live in memory; older rows flush to temp XML on disk. Memory: `O(50 rows)`.

**Stage 3 — per-workbook S3 upload.** This is where my open-source library `s3-outputstream` came from: a real `java.io.OutputStream` over S3 multipart with a fixed 5MB buffer. It closes a 4-year gap in the AWS SDK (aws/aws-sdk-java-v2#3128). POI writes into it; parts flush as the buffer fills. Memory: constant 5MB regardless of file size.

**Stage 4 — streaming ZIP assembly.** Read each workbook back from S3 in 2MB chunks, feed a `ZipOutputStream` writing into another `s3-outputstream` with a 5MB buffer. Never materialize the ZIP.

**Stage 5 — final object.** One S3 key, assembled from parts, zero local disk at the end.

Total per-export memory: **~7MB flat** whether it's 1K rows or 100M. 15M+ proven in production, with no upper bound in the design. Throughput measured: **840K records/s CSV**.

## The multipart protocol in 60 seconds

S3 multipart has three moves that matter here:

```
initiate  →  get an upload ID back
upload    →  send numbered parts, collect receipts
complete  →  hand back the list, S3 assembles the object
```

Two details shaped the design. Parts must be at least 5 MB except the last, which is where the fixed buffer size comes from. And an unfinished upload keeps billing for stored parts until aborted, so every failure path has to end in abort, not silence.

## Failure modes, handled by construction

A part upload can fail while the rest succeed, so retry is per part, never per export. The process can die mid-run, so orphans must abort instead of accumulating as line items. And ZIP readers expect the central directory last, which fixes the stream order once and for all: data first, directory at the very end, straight into the final part.

## What I'd do differently

Size the S3 part buffer adaptively (3% of heap) so the same code runs optimally on 512MB and 64GB containers. Add per-tenant guard rails early. 5 concurrent per user, 10 per tenant, 100 system-wide. Because the first customer who exports everything at quarter-close will find your missing limits for you.

The app is a pipe, not a bucket. If any stage can grow unbounded, it will. In production, during audit season.

*Code: [github.com/Arin016/s3-outputstream](https://github.com/Arin016/s3-outputstream)*
