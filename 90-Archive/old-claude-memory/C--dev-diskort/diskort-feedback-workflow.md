---
name: diskort-feedback-workflow
description: How to review Diskort user feedback when the user says "incele" (server CLI commands, status flow)
metadata:
  type: project
---

Since v0.5.1 (2026-09-27) friends send in-app feedback (Hata/Öneri/Diğer + up to 3 screenshots, auth-only). When the user says "geri bildirimleri incele", read them on the server and turn chosen items into tasks together with the user.

Web: the admin panel https://diskort.ziroo.net/admin also has a feedback tab (read, screenshots, status/note). CLI still works:

Commands (from `/opt/diskort/infra` via `ssh -i ~/.ssh/diskort_vps root@185.92.0.242`):
- `docker compose exec api node dist/feedback-cli.js list --status yeni [--type hata] [--json]`
- `docker compose exec api node dist/feedback-cli.js show <id> [--json]` (screenshots at `/data/feedback/<id>.webp`, copy with `docker compose cp api:<path> .`)
- `docker compose exec api node dist/feedback-cli.js set <id> <yeni|incelendi|planlandi|tamamlandi|reddedildi> [not]`, `note <id> "<not>"`, `stats`

**Why:** the user asked for a feedback loop where they decide what becomes a task.
**How to apply:** summarize new items, propose which to do, mark `incelendi`/`planlandi` after agreeing, `tamamlandi` with a note when shipped (the submitter sees status + note live). CLI changes don't emit gateway events. Feedback context never includes DM names/ids.

Related: [[diskurt-project]], [[diskort-server]]
