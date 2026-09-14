---
title: "255ms to 68ms: a --version fast-path for KiroCrew"
date: "2026-09-14"
tag: "PERF"
minutes: 9
excerpt: "Porting Claude Code's 12ms --version trick to an open-source Python CLI: two argv guards, six review rounds, one accidental PR closure, and a maintainer bot that finished the job."
---

It started with a post about Claude Code's boot time. Someone had dissected how `claude --version` answers in 12 milliseconds: handle the trivial flags before importing anything heavy, fire slow I/O during module evaluation, lazily load the megabyte-scale modules. I use Kiro CLI every day, I had heard its repo was open source, and I thought: same trick, same win, quick MR. Almost every part of that sentence turned out to be wrong, and the correction is the interesting part.

## The target that wasn't

Two facts killed the original plan in about ten minutes. First, Kiro CLI is not open source — the IDE and CLI ship under a proprietary license, and the public repo is an issue tracker that says so plainly. The genuinely open predecessor was archived. Second, it didn't need the optimization anyway: `kiro-cli --version` on my machine answers in 11 milliseconds. It's a compiled Rust binary. There is no import tree to skip.

But the machine next to it told a different story. KiroCrew — the open-source agent workspace that runs on top of `kiro-cli` — answered its own `--version` in 426 milliseconds installed, 255 milliseconds from a source checkout. Same flag, forty times slower. That became the port.

## What the milliseconds were

`import kiro_crew.cli` costs roughly a quarter second of module scope that `--version` never uses: the built-in apps registry, the doctor command pulling in `aiohttp`, the history-to-sandbox chain. A prior cleanup had already deferred the three heaviest modules and cut the import from 1.3 seconds to half a second. The remaining cost was death by twenty small imports, each individually justifiable, jointly absurd for a flag that prints fourteen characters.

The fix is eleven lines in two files. Both entry paths — the `kirocrew` console script and `python -m kiro_crew` — check for the exact bare form, print `kirocrew <version>`, and exit before the heavy imports execute. Only the bare form: `artifact show --version N` reuses the flag name for an artifact version integer, so anything else falls through to argparse untouched. Result: 255 down to 68 milliseconds, output byte-identical.

## The gauntlet

The code was the easy third of the work. The PR went through six review rounds, and nearly every one taught something:

**An early version had three guards instead of two**, including one at `cli.py` module scope. Two separate reviewers flagged it, and the second one brought receipts: every desktop launcher routes through `python -m`, so the third guard protected zero real invocations while adding an import-time exit to the most-imported module. I had defended it with a "frozen binary" argument that was factually wrong. Conceded in full, deleted the guard. Concede fast when the reviewer cites file and line.

**The fast-path silently disabled release gates.** Several build scripts use `--version` as an install-integrity probe — "the full import chain must resolve" — and my change made those gates prove nothing. That was a correct BLOCK, and the fix belonged in the same PR: companion `import kiro_crew.cli` probes next to both desktop self-containment gates, plus honest documentation of the lanes a fork physically cannot patch.

**The environment fought back.** Git pushes died with timeouts on a half-gigabyte shallow clone, so branches were built through the GitHub API. A stale fork base silently swept 110 lines of someone else's merged code into my diff — two reviewers caught it from opposite angles, one as hygiene, one as a security finding on code I never wrote. Fixed with a true rebase, verified file by file. An OAuth token missing one scope blocked the recovery until it was re-approved. And one ref-API workaround briefly auto-closed the PR; it was restored byte-identical within minutes. Verify every remote mutation by reading it back. Trust nothing that returns 200 without a follow-up GET.

**Lint is a hydra.** Black, then a subprocess-encoding gate nobody had told me about, each failing on exactly one line. The repo's gates are numerous, baselined, and almost entirely fair.

## The ending I didn't expect

After six idle days, a maintainer's bot took over the PR: rebased it onto current main, extended the gate coverage to the Dockerfile itself, documented the remaining workflow gap, and pushed as co-author. A human maintainer then approved, and it merged. My eleven lines ship alongside their additions, which is exactly the right shape for an outside contribution to land in.

The numbers for the record: 255ms to 68ms on the flag, six files, one new test file with three tests, zero behavior change anywhere else.

## What I'd repeat

Measure before theorizing — every decision in this story came from a timing number, an import trace, or a grep. Keep the diff purely additive where possible; reviewers forgive slowness, not scope. Write the failure modes into the description before reviewers find them. And when a reviewer proves you wrong with a file path, say so plainly and delete the code the same day. Nothing in this PR survived contact with review unchanged except the idea, and the idea was never mine — it was a post about someone else's twelve milliseconds.
