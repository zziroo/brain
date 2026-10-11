---
name: git-identity-per-repo
description: "This machine has no global git identity; new repos need a repo-local one copied from the user's other projects before committing"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 6d8df6c2-d2f6-41a4-acee-7bc01a447e7f
  modified: 2026-10-02T09:41:42.167Z
---

There is no global `user.name` / `user.email` on this machine, so `git commit` fails in a freshly initialised repo. The user's repos carry a repo-local identity instead: `Ziroo <zziroo.ai@gmail.com>` (as set in `zProjects\diskort\.git\config`). In a new repo, set the same two values with `git config` (no `--global`) and commit — don't stop to ask.

**Why:** on 2026-10-02 the first commit in the new game repo failed with "Author identity unknown"; Claude left the files staged and asked which identity to use. The user's reply: "diskortu geliştirirken commit attırıyordum sana direkt ama" — they expect commits to just work, as in Diskort.

**How to apply:** when a commit fails for missing identity, check a sibling repo's local config (`git -C <repo> config --show-origin --get user.email`) rather than guessing or asking, and never write to the global git config. Committing itself is already a standing permission for the coordinator in the user's global rules.
