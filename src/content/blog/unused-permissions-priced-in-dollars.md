---
title: "Unused permissions, priced in dollars"
date: "2026-08-25"
tag: "PLATFORM"
minutes: 15
excerpt: "A license-saving feature end to end: live-computed findings, one action that becomes removal tasks, and action records engineered to survive the nightly data refresh."
---

Every year, large companies pay their software vendors per user. The price of each user depends on how powerful that user's access is. Over time, people accumulate permissions they no longer need, accounts go dormant, and nobody connects the access data to the invoice. Finance keeps paying. This is the story of the feature I built, as part of a program called License Intelligence, to close that gap: find the waste, price it, and remove it.

## The two questions

Enterprise SAP licenses are priced in tiers: a user whose permissions *could* do a lot costs more than one who does little, regardless of what they actually do each day. Against that sits reality. Who logged in recently, which transactions they ran in the last 90 days. The feature answers two questions:

1. **Who can go entirely?** Accounts with no login and no usage for 90+ days at the top tier. The action removes all their roles.
2. **Who can step down?** Users billed at the top tier whose actual usage fits a cheaper one. The action removes only the roles responsible for the excess. Nothing else.

The savings math is simple multiplication: people affected, times the license-weight difference between tiers, times the dollar price per unit. Simple. But only trustworthy if every input is live.

Price your own tenant:

```widget-savingscalc
interactive: license savings calculator (requires JavaScript)
```

## Computed, never stored

The findings are derived at request time, every time, from the search index. Not precomputed by the nightly job and served stale. This was a deliberate architectural choice: counts and dollar figures are always current, the feature team can iterate without touching the data pipeline, and there is no persisted "finding" entity that can drift out of agreement with reality.

The API surface is small: list the findings sorted by savings with an aggregate annual figure, open one for its detail and review list, act on a selection. Deterministic IDs, paginated review lists, display ordering computed server-side so the client renders arrays as received.

## Closing the loop

Finding waste is half the feature; the other half removes it. One action call carries the selected accounts or users. The service validates them against the finding, resolves every affected permission, and publishes an event to the message bus. After that, the originating system creates one removal task per permission, with de-duplication so redelivered events never double-create.

Ordering here is a correctness decision, not a performance one: the event is published *first*, and local records are marked only after the publish succeeds. If publishing fails, the API returns an error and nothing is marked. The screen never shows a state the rest of the system doesn't share.

## The interesting problem: state that outlives its pipeline

Every night, an analysis job re-evaluates all accounts and replaces the underlying data wholesale. But an admin's action, "remove these permissions," with a task now in flight, must survive that replacement. Otherwise the UI forgets what it asked for, the admin acts twice, and duplicate tasks pile up.

The solution has three parts. First, action records live on the identity document itself, separate from the refreshed data, and ingestion *merges* rather than replaces them. Second, incoming data is stripped of any action fields before merging, so the pipeline can never accidentally wipe them. Third, stale entries are pruned. If a permission is no longer assigned, its action record goes with it. And the cooldown that prevents re-acting is evaluated at read time, so the system unlocks items without any write at all.

In other words: the pipeline owns the data, the feature owns the marks on the data, and the contract between them is merge, strip, and prune.

## The lifecycle, as a state machine

Every finding an admin touches moves through the same four states. The admin, the nightly job, and the clock each own different transitions, and no state lives only in the browser:

```widget-statemachine
interactive: finding lifecycle state machine (requires JavaScript)
```

The rules that keep it honest: reads never write (the cooldown unlock is evaluated at read time, so unlocking costs nothing), marks survive the refresh by merge instead of replace, and anything no longer true gets pruned. One endpoint carries the whole action: the UI sends a single call with lists, and the server validates, resolves, publishes, and marks. No browser fan-out, one failure domain, fail fast on publish errors.

## Validation

Fifty-one automated checks against live APIs, all passing. Counts, dollar figures, review hierarchies, pagination, error cases. Forty of forty again after the action workflow landed. Then two rounds of senior review, which earned their keep: one reviewer restructured the code around the domain's own vocabulary, and another caught a blocking flaw in how indirectly-assigned permissions were targeted — a catch that changed the event contract before production rather than after.

The test tenant showed seven findings worth about $11,000 a year. One dataset's answer from an engine that computes over whatever it is given, with no upper bound on what it can find. Small numbers, real pipeline. That is the correct order to build in.
