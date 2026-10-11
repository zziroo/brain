---
name: diskort-baslangic
description: "Session-start protocol for Diskort work: read the vault overview (single source of project state), then inbox, then rules. Replaces the old handoff note."
metadata:
  node_type: memory
  type: feedback
---

There is no separate handoff note any more. The single source of project state (current state + next tasks) is the vault page `/Users/ziroo/ZZ/brain/10-Projects/diskort/_overview.md`. Do not keep copies of state in memory.

## When the user starts Diskort work
Triggers: `/basla` (skill in `~/.claude/skills/basla`, does exactly these steps), "overview'ı oku", "devam", "nerede kalmıştık", the old phrase "handoffu al" (same thing), or any Diskort task in a fresh chat.
1. Read `_overview.md` ("Güncel durum" + "Sıradaki işler").
2. Read unread files in `/Users/ziroo/diskort-inbox/`, summarize, propose actions, move them to `okundu/`.
3. Read [[diskort-rules]] before proposing features or UI.

## Server / error / "çalışmıyor" questions
Verify the live state first (the overview and memory can be stale), check the inbox, then use the paths in [[diskort-server]] and [[diskort-workflow]].

## End of a substantial session
The user runs `/kaydet` (skill in `~/.claude/skills/kaydet`); it does the following. If they forget and the session clearly produced decisions, remind them once. Update the overview's "Güncel durum" and "Sıradaki işler". Decisions (with why + rejected alternatives) go to `decisions/`, lessons to `lessons/`, following `/Users/ziroo/ZZ/brain/CLAUDE.md`.

**Why:** the user moved to the second-brain vault and wanted one source of truth instead of a handoff note plus an overview that drift apart (2026-10-01).

Related: [[diskort-rules]], [[diskort-workflow]], [[diskort-server]]
