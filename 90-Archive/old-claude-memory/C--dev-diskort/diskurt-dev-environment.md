---
name: diskurt-dev-environment
description: "Quirks of the user's Windows dev machine for Diskort (no VS build tools, pnpm 12 allowBuilds, PATH refresh, CDP-based Electron testing)"
metadata:
  node_type: memory
  type: reference
  originSessionId: 6b202245-1c00-4ad6-9973-1b24d27631fd
  modified: 2026-09-26T14:53:41.111Z
---

- Node 24 (winget zip install), pnpm 12, git were installed 2026-09-26. PowerShell tool sessions need PATH refresh each call: `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`.
- No Visual Studio / C++ build tools → native modules needing node-gyp fail. That's why the server uses built-in `node:sqlite` (not better-sqlite3) and electron-builder has `npmRebuild: false` (uiohook-napi ships N-API prebuilds).
- pnpm 12 uses `allowBuilds:` map in pnpm-workspace.yaml (not onlyBuiltDependencies).
- Electron 44's package has no postinstall; if `dist/electron.exe` is missing run `node install.js` inside the electron package dir.
- tsup must keep `removeNodeProtocol: false` or `node:sqlite` breaks in the bundle.
- The dev Electron window can't be granted to computer-use; test it via CDP instead: start with env `DISKORT_DEBUG_PORT=9222 DISKORT_FAKE_MEDIA=1` (dev-only switches in src/main/index.ts) and drive with a small Node WebSocket CDP script; `window.__diskort` exposes voice client + stores in dev.
- Project lives at `C:\dev\diskort` (moved out of OneDrive, folder renamed from diskurt on 2026-09-26). pnpm node_modules links use absolute paths: after moving/renaming the folder, delete every node_modules and reinstall (then `node install.js` in the electron package if `dist/electron.exe` is missing).
- GitHub via `gh` CLI over HTTPS (account yusufholat). In Git Bash, add `/c/Program Files/GitHub CLI` and the WinGet Node dir to PATH. Delete `apps/desktop/release` after packaging tests (large).
- Local installer/update-flow tests: build with a separate identity config (`extends: electron-builder.yml`, own appId/guid/name) AND set `extraMetadata.productName` too, otherwise Electron's userData is still `%APPDATA%\Diskort` (the user's real settings/session; happened once 2026-09-26: no data written, but the test app logged in with the user's session). Serve a feed with a Node server that 302s `/updates/*` and supports single Range; point the packaged app at it with env `DISKORT_UPDATE_URL`. Never screenshot the desktop to see app windows (captured the user's private chat once); preview `resources/splash/index.html` in the browser pane instead.

Related: [[diskurt-project]]
