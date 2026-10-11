---
name: coordinator-delegates-code
description: In this project the main chat should avoid writing code itself and hand implementation to subagents (opus for features)
metadata:
  node_type: memory
  type: feedback
  originSessionId: 72fd0708-1f9e-4a55-aedc-df7bfd3fe2bc
  modified: 2026-10-02T18:05:25.910Z
---

The user asked (2026-10-02) that the main chat write as little code as possible and delegate the work to subagents ("işleri alt ajanlara devret, opus vs."). The main chat designs, briefs, reviews, merges, tests and reports.

**Why:** the user wants the coordinator's context kept for decisions and quality control, and wants parallel progress on a large feedback round.

**How to apply:** feature work goes to `model: "opus"` agents split by vertical slice; verifier / skeptic passes to `sonnet`. Inline edits by the coordinator only for merge conflict resolution, one-line fixes, memory and vault notes. Still follow the global review gate before merging agent code. See [[isik-bekcisi-project]].
