---
title: "From 21 hours to 3 minutes, via 2 seconds of compute"
date: "2025-09-01"
tag: "PERF"
minutes: 15
excerpt: "A compliance check re-examined the company hierarchy once per rule. Resolving it a single time collapsed a day of computing into minutes. 2 seconds of compute, the rest database writes, identical results."
---

Large companies must regularly prove that no employee holds conflicting permissions. Creating and approving the same payment, for instance. Running this check across a whole organization is called segregation-of-duties evaluation. One customer's check ran **21 hours on a machine with 64 GB of memory**. The replacement computes in **2 seconds in 256 MB**. Database writes included, it finishes in **about 3 minutes**, producing byte-identical results. Here's what was wrong and what replaced it.

## The shape of the problem

Each compliance rule names a pair of conflicting permissions, and the check finds every employee holding both. Directly, or inherited through role hierarchies and nested groups. The old program handled rules one at a time, and for each rule it re-examined the entire organization hierarchy from scratch:

1. Load the relevant part of the hierarchy
2. Work out every member below it, transitively
3. Compare against the rule's permission holders
4. Repeat for the next rule: re-examining the same hierarchy

Thousands of rules over a deep hierarchy meant the same subtrees were walked thousands of times. Memory churned, the machine sat at full capacity, and the job still took most of a day.

## The fix: examine once, compare with bits

**Pass 1 — one walk of the hierarchy.** Traverse the organization structure a single time. Give every employee a dense numeric id, and record each group's full membership as a bitset. A compact string of bits, one per person.

**Pass 2 — rules as bit operations.** Each rule's permission holders become bitsets too, so checking a rule is a bitwise AND across machine words: 64 people compared per processor instruction.

```
before: for each rule, re-examine the hierarchy → O(R · H²)
after:  examine once; each rule is a bit operation → O(H + R · U/64)
```

Size it yourself, then watch one instruction do 64 users at once:

```widget-bitsetlab
interactive: bitset sizing lab with live AND demo (requires JavaScript)
```

## The hardware reason it holds

Memory: membership for 100K employees fits in about 12.5 KB per set. The whole check runs in compact arrays instead of sprawling object graphs.

## The hardware reason it holds

A 64-bit AND executes in one cycle, touches one cache line per operand, and never branches. The old code chased pointers through object graphs and asked the garbage collector to clean up. Representing 100K users as roughly 12 KB of bits turns the same question into a streaming pass the prefetcher loves. Data structure choice is hardware choice.

## Where this stops working

Two limits. The single hierarchy pass is still proportional to hierarchy size. An org ten times deeper costs ten times more traversal, and no bit trick removes that. And as the coda says, once compute vanished, writes dominated. Push users 10x and the bottleneck moves again, this time to database write throughput. That's fine. Each migration buys a cheaper problem.

## Verification

Identical output to the old program on the customer's complete dataset before switching over. Compared by automated diff, not by inspection. Then run in parallel with the old system for two full cycles. Then the old code was removed.

Numbers: **21 hours → ~3 minutes end to end (2.04 s of compute)**, **64 GB → 256 MB**, no differences in detected violations across 300+ customer organizations.

## What stayed with me

The data wasn't big. The work was repeated. Many problems that present as scale turn out to be repetition: the same question answered thousands of times instead of once. Examine once, represent compactly, and let the hardware do what it does best.

And the coda, worth more than the speedup: the job didn't go to zero. With evaluation negligible, persisting results to the database became the cost. Roughly 3 minutes of writes. Every optimization ends this way. You don't eliminate the bottleneck; you migrate it somewhere cheaper. The skill is knowing which migrations are worth it.
