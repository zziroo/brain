---
name: kapis-push-on-commit
description: In the KAPIŞ repo, push main to GitHub after every commit
metadata:
  type: feedback
---

Push `main` to `origin` (private `zziroo/web-fps-game`) whenever something lands on main.

**Why:** the user asked on 2026-10-03: "bu repoyu da gite pushla maine bişeyler geldikçe".
**How to apply:** after each coordinator commit in this repo run `git push origin main`; deploy stays a separate, deliberate step (`bash deploy/deploy.sh`). See [[kapis-project]].
