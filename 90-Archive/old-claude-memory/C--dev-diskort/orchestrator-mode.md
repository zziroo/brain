---
name: orchestrator-mode
description: "Diskort-specific additions to the global orchestration rules in ~/.claude/CLAUDE.md (scheduled main review task, verification steps)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 72824d08-d870-48e5-bdad-ab589c1b5f78
  modified: 2026-09-28T13:53:58.655Z
---

The general orchestration, review-gate, skeptic, budget and model rules moved to `C:\Users\yusuf\.claude\CLAUDE.md` on 2026-09-28, at the user's request, so they apply to all projects. Diskort-specific additions:

- **Checks after an agent's work:** the coordinator runs `pnpm -r typecheck` + `pnpm -r test` on the agent's branch itself. UI checks use the local test server with an isolated dev profile (see [[diskort-handoff]] Workflow), never production.
- **After merging:** push to main (see [[git-push-autonomy]]). Deploy the server if needed. Cut client releases only when the user says "sürüm çıkar".
- **Worktree cleanup on Windows:** `git worktree remove` fails with "Filename too long". Delete the folder with `cmd /c "rmdir /s /q \\?\<path>"`, then `git branch -d`.
- **Scheduled task `diskort-main-kod-inceleme`** (13:20 and 23:20 daily):
  - It reviews origin/main commits since the SHA in `C:\Users\yusuf\.claude\diskort-review\last-reviewed.txt`.
  - It runs a sonnet skeptic when there are findings.
  - It sends a push notification only for surviving high/critical findings.
  - Its prompt hardcodes the repo path C:\dev\diskort. Update it if the project moves.

**Planned move (2026-09-28):** the project moves to `C:\Users\yusuf\ZZ\zProjects\diskort`. These references to C:\dev\diskort must be updated:
- this scheduled task's prompt;
- `.claude/settings.local.json` rules;
- the Windows Task Scheduler task "Diskort veritabanı yedeği", which runs `C:\dev\diskort\scripts\pull-db-backups.ps1`;
- the memory dir key (the memory must be copied to the new project key).
`OneDrive\Yedekler\Diskort` is the intentional offsite backup (DB, attachments, Android + OTA signing keys). KEEP it; only `OneDrive\ZZ\zProjects` is to be deleted.

**Why:** the user wants one chat that coordinates, with agents doing the work. They asked for independent review, including an adversarial check, of everything that lands on main.

Related: [[diskort-handoff]], [[git-push-autonomy]], [[diskurt-project]]
