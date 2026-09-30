---
name: diskurt-dev-environment
description: "Quirks of the user's Windows dev machine for Diskort (no VS build tools, pnpm 12 allowBuilds, PATH refresh, CDP-based Electron testing)"
metadata:
  node_type: memory
  type: reference
  originSessionId: 6b202245-1c00-4ad6-9973-1b24d27631fd
  modified: 2026-09-26T13:47:28.404Z
---

- Node 24 (winget zip install), pnpm 12, git were installed 2026-09-26. PowerShell tool sessions need PATH refresh each call: `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`.
- No Visual Studio / C++ build tools → native modules needing node-gyp fail. That's why the server uses built-in `node:sqlite` (not better-sqlite3) and electron-builder has `npmRebuild: false` (uiohook-napi ships N-API prebuilds).
- pnpm 12 uses `allowBuilds:` map in pnpm-workspace.yaml (not onlyBuiltDependencies).
- Electron 44's package has no postinstall; if `dist/electron.exe` is missing run `node install.js` inside the electron package dir.
- tsup must keep `removeNodeProtocol: false` or `node:sqlite` breaks in the bundle.
- The dev Electron window can't be granted to computer-use; test it via CDP instead: start with env `DISKURT_DEBUG_PORT=9222 DISKURT_FAKE_MEDIA=1` (dev-only switches in src/main/index.ts) and drive with a small Node WebSocket CDP script; `window.__diskurt` exposes voice client + stores in dev.
- Project moved out of OneDrive to `C:\dev\diskurt` on 2026-09-26 (git repo, branch `main`, GitHub via `gh` CLI over HTTPS). Delete `apps/desktop/release` after packaging tests (large).

Related: [[diskurt-project]]
