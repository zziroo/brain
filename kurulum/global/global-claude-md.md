# General working rules (all projects)

- Reply to the user in Turkish; keep status messages short.
- Plan: Claude **Max 20x** (stated by the user 2026-10-11; `get_usage` just says "Max"). Sessions, subagents and scheduled tasks share the 5-hour and weekly limits. Check `get_usage` before a large fan-out.
- Memory and vault notes are snapshots. Verify live state (server, repo, version) before acting on or asserting them.

## Orchestration
- Sizable multi-step work: the main chat is the coordinator. It plans, asks the user for product decisions, delegates to background subagents (`run_in_background: true`), then reviews, tests and commits. Agents edit the working copy in place and don't commit; use `isolation: "worktree"` (own branch) only when parallel agents could touch overlapping files or the work is risky or experimental. This is a standing permission; don't ask per task.
- Inline vs agent: an agent starts cold (~45–50k tokens of context). Go inline for short work with little reading (one-line fix, config or memory edit, git/deploy steps, quick check). Delegate when it needs a lot of reading or editing, even if the change is small, and whenever the coordinator's context is getting large.
- Split by feature (vertical slice), not by role. Parallel agents only on areas that don't overlap.
- Agent size: cost comes from context size, not agent count (each call re-reads the whole context; at 400k+ a call costs ~3x one under 200k). Keep each agent around ≤100 tool calls and ≤300k context. Split work that would take 150+ calls into phases, each a fresh agent with a short handoff note (files, decisions, what's left). Don't split small work; a cold start is cheap.
- Repeated same-pattern work (e.g. several themes): one agent builds the first instance plus the shared seam and lists the files involved; the rest get that exact spec. Mechanical repeats may go to `sonnet`; design and feel stay on `opus`.
- Every agent prompt includes the lean-context rule: grep first, then read only line ranges, not whole large files; don't re-read files already read; pipe build/test/install output through `grep -iE "error|fail|warn"` first, then `tail -40`, never the full log.
- Coordinator: rely on the review agent's findings instead of reading whole agent diffs; past ~400k context, save decisions to the vault and `/compact` or hand off to a fresh session.
- Agents never commit to main, merge, tag, release, deploy, touch secrets or SSH into production (scheduled read-only routines, such as Diskort's watcher, may read production over SSH). The coordinator does those within the project's rules.
- Models: the coordinator runs on Fable; subagents never inherit it. Default `model: "opus"` with `effort: "medium"` (raise to `"high"` for cross-cutting or design-heavy work and deep reviews); `sonnet` for narrow well-specified changes, verifier/skeptic passes and tooling; `haiku` or Explore for read-only search. Always pass `model` explicitly.
- Relay agent results concisely; never present unverified agent claims as verified. Clean up any worktrees and branches after merging.

## Review gate
- Before committing or merging agent code changes (a branch or the working-tree diff), a separate read-only review agent (not the author) checks the diff for security and correctness bugs, with verified file:line findings. Tell review agents to stay read-only: `git diff` / `git show`, no checkout and no changes to the main working copy.
- Non-code work (memory, vault, docs, settings): no review agent. The coordinator re-reads the changed files and checks links and secrets itself, and never trusts the agent's report alone.
- Medium-or-higher findings: a skeptic agent (sonnet) tries to refute each against the code (CONFIRMED / REFUTED / DOWNGRADE) and judges the proposed fix. The coordinator decides and reports disagreements. No findings, no skeptic.
- Fix high and critical findings before merging.

## Decision split
- The user decides: what to build and its priorities; releases, deploys and irreversible or outward-facing actions; budget, security boundaries and product feel.
- Claude decides how (agent split, models, testing, code structure) and briefly reports what it chose.

## Tools
- Orchestration report: `/Users/ziroo/.claude/orchestration-report/`, run `node report.mjs [--session <id>] [--project <dir-key>]` (writes HTML and JSON to `out/`). Publish as an Artifact only when asked, after reading the whole HTML. Details and quirks: vault `20-Areas/working-rules/araclar-ve-raporlar.md`.

## Second brain
- Obsidian vault (Markdown) at `/Users/ziroo/ZZ/brain`: project decisions, lessons, runbooks, session summaries. Never read it wholesale: `Home.md`, then the project's `_overview.md`, then grep for specific notes.
- After a substantial session, or when asked, write decisions (with why + rejected alternatives) and lessons there, following `/Users/ziroo/ZZ/brain/CLAUDE.md`. Never write secrets into it.
