---
name: orchestrator-mode
description: "Diskort-specific additions to the global orchestration rules in ~/.claude/CLAUDE.md (scheduled main review task, verification steps)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 72824d08-d870-48e5-bdad-ab589c1b5f78
  modified: 2026-09-30T09:41:33.689Z
---

The general orchestration, review-gate, skeptic, budget and model rules moved to `/Users/ziroo/.claude/CLAUDE.md` on 2026-09-28, at the user's request, so they apply to all projects. Diskort-specific additions:

- **Checks after an agent's work:** the coordinator runs `pnpm -r typecheck` + `pnpm -r test` on the agent's changes itself. UI checks use the local test server with an isolated dev profile (see [[diskort-workflow]] "Local UI test env"), never production.
- **After merging:** push to main (see [[git-push-autonomy]]). Deploy the server if needed. Cut client releases only when the user says "sürüm çıkar".
- **Worktree cleanup on Windows (only if a worktree was used):** `git worktree remove` fails with "Filename too long". Delete the folder with `cmd /c "rmdir /s /q \\?\<path>"`, then `git branch -d`.
- **Scheduled task `diskort-main-kod-inceleme`** (00:10 daily):
  - It reviews origin/main commits since the SHA in `/Users/ziroo/diskort-review/last-reviewed.txt`.
  - It runs a sonnet skeptic when there are findings.
  - It sends a push notification only for surviving high/critical findings.
  - Its prompt hardcodes the repo path /Users/ziroo/ZZ/zProjects/diskort. Update it if the project moves.

`OneDrive\Yedekler\Diskort` is the intentional offsite backup (DB, attachments, signing keys, secrets; see `BENIOKU.txt`). KEEP it.

**Why:** the user wants one chat that coordinates, with agents doing the work. They asked for independent review, including an adversarial check, of everything that lands on main.

Related: [[diskort-baslangic]], [[git-push-autonomy]], [[diskort-project]]
