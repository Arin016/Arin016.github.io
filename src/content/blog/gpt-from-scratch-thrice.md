---
title: "A language model from scratch, three times"
date: "2026-01-18"
tag: "ML"
minutes: 13
excerpt: "The same transformer at three levels: PyTorch with no shortcuts, dependency-free C++ with tests green, raw GPU code in progress. What changes each time you rebuild it."
---

I spent my engineering degree modeling ships and my nights competing in programming contests. Somewhere in there I realized I used transformer-based models daily without knowing what one computes. So I built one. Then twice more, one level down each time.

## Round one: ArinLM (PyTorch, no shortcuts)

ArinLM is a small GPT-style language model, the architecture family behind ChatGPT-style assistants, written in Python and PyTorch under a deliberate constraint: none of the framework's ready-made model components, no downloaded model code. Small on purpose. Vocab 100, context 32, width 64, 4 heads, 2 decoder blocks. Every tensor stays inspectable. Built incrementally: token embeddings first, then learned positionals, then attention, then blocks. Each step explained and tested before the next.

The constraint is the whole point. At 64 dimensions you can print the attention matrix and *read* it. Positional embeddings stop being a formula and become a table you watch get learned. Nothing about this model is useful. Everything about building it was.

Size one yourself. The formula is roughly 12 × layers × width², plus embeddings:

```widget-paramcalc
interactive: transformer sizing calculator (requires JavaScript)
```

## Round two: raw CUDA (no framework at all)

Same transformer, one level down: every kernel written by hand. The roadmap is strict. Naive matmul against a CPU reference first, then QK^T/softmax/·V as kernels, then the full forward pass, then a hand-rolled backward pass, then a tiny char-level training run, ending at tiled matmul and FlashAttention-style tiling benchmarked against PyTorch.

This one is explicitly a curriculum, not a result: learner-written code in `src/`, reference solutions quarantined in `solutions/` for post-attempt comparison only. The syllabus is GPU architecture the hard way. Memory hierarchy, coalescing, shared-memory tiling, occupancy, tensor cores. I'm early in it, and I'm not pretending otherwise.

## Round three: C++ on CPU (no dependencies at all)

The third implementation is the most complete: [gpt2-cpp](https://github.com/Arin016/gpt2-cpp), a GPT-2-style model in dependency-free C++17. No PyTorch, no BLAS, nothing beyond the standard library. Seven commits, each building on the last: tensor core with matmul, softmax/GELU/layer-norm, causal attention, multi-head attention, the transformer block, the full model with greedy decoding. Then a five-test harness.

The tests are the point. Softmax rows sum to one. Norms standardize. Future tokens provably don't move past logits. Identical seeds give identical logits. Shapes survive every layer. Weights are random, so output bytes are degenerate by construction. What is verified is the machinery, and the README says so upfront.

## What three implementations teach you

Building the same object three times, at adjacent levels of abstraction, is the fastest way I've found to locate the holes in your understanding. The framework teaches you the mathematics. C++ teaches you the cost in its barest form. Every allocation visible, every loop yours. The hardware teaches you that attention is a data-movement problem first and a math problem second.

It also changed how I read my production work. My export pipeline's "the app is a pipe, not a bucket" is a memory-hierarchy argument I was making before I had the vocabulary for it. Now I do.

## What's still missing, honestly

Three gaps, one now closed. Training is done: [lm-train](https://github.com/Arin016/lm-train) took the same architecture to a real run — 0.818M parameters on Shakespeare, validation loss 1.75, thirty-five seconds on Apple silicon, loss curve and samples committed. Remaining: no real tokenizer (bytes and toy vocabs stand in for BPE) and no KV-cache (decoding recomputes everything, which this site's router post would flag as wasteful). The roadmap names both.

*Code: [github.com/Arin016/aLM](https://github.com/Arin016/aLM) · the CUDA build lives in my local workspace; write-ups land here as the roadmap phases close.*
