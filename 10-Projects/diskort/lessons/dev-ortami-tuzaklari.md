---
type: lesson
project: diskort
date: 2026-09-26
status: active
tags: [diskort, windows, pnpm, node, ortam]
source: memory diskurt-dev-environment.md
---

# Windows dev makinesinde C++ derleme araçları yok; bu yüzden node:sqlite ve npmRebuild:false

- Node 24 (winget zip), pnpm 12, git 2026-09-26'da kuruldu. PowerShell araç oturumlarında her çağrıda PATH yenilenmeli (Machine + User PATH birleştirilir).
- Visual Studio / C++ build tools YOK: node-gyp gerektiren native modüller başarısız olur. Bu yüzden sunucu `better-sqlite3` yerine yerleşik `node:sqlite` kullanır, electron-builder'da `npmRebuild: false` (uiohook-napi N-API prebuild ile gelir).
- pnpm 12 `pnpm-workspace.yaml` içinde `allowBuilds:` haritası kullanır (`onlyBuiltDependencies` değil).
- Electron 44 paketinde postinstall yok; `dist/electron.exe` yoksa paket klasöründe `node install.js`.
- tsup `removeNodeProtocol: false` kalmalı, yoksa `node:sqlite` bundle'da bozulur.
- Proje `C:\Users\yusuf\ZZ\zProjects\diskort` (OneDrive dışı; 2026-09-26'da taşınıp diskurt -> diskort yeniden adlandırıldı). pnpm node_modules bağları mutlak yol: klasör taşınınca tüm node_modules silinip yeniden kurulur.
- GitHub `gh` CLI ile HTTPS. 2026-10-06'dan beri hesap `zziroo` (repo sahibi). Mac'te `yusufholat` oturumu kapatıldı; Windows'ta ikinci hesap olarak duruyordu ([[2026-10-06-github-repolari-zziroo-hesabina-tasindi]]). Git Bash'te `/c/Program Files/GitHub CLI` ve WinGet Node dizini PATH'e eklenir. Paketleme testlerinden sonra `apps/desktop/release` silinir (büyük).
- Bash'te `python` yok. Mevcut dosyalara prettier çalıştırma. Ters eğik çizgili kod için Write/Edit kullan.

## İlgili
- [[electron-cdp-testi]], [[_overview]]
