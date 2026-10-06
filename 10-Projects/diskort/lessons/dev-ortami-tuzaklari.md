---
type: lesson
project: diskort
date: 2026-10-07
status: active
tags: [diskort, mac, windows-donemi, pnpm, node, ortam]
source: memory diskort-dev-environment.md; Mac'te komutlarla doğrulandı 2026-10-07
---

# Dev ortamı: node:sqlite ve npmRebuild:false Windows'ta C++ araçları olmadığı için seçildi; bu seçim Mac'te de duruyor

## Mac (güncel, 2026-10-07'de doğrulandı)
- Makine Apple Silicon (arm64), macOS 27. Kabuk zsh, Homebrew `/opt/homebrew`.
- Node v24.21.0 ve pnpm 12.6.0 `/opt/homebrew/bin` altında; git Apple Git 2.54.0 (`/usr/bin/git`); `python3` var (`/usr/bin/python3`), `python` yok.
- Xcode Command Line Tools kurulu (`/Library/Developer/CommandLineTools`, `cc`/`clang`/`make` var). Yani Mac'te C++ derleyicisi var; yine de proje `node:sqlite` ve `npmRebuild: false` ile kalıyor (kod bunu zaten böyle kullanıyor, değiştirmeye gerek yok). Native modül derlemesinin Mac'te fiilen denenmesi doğrulanmadı.
- Proje `/Users/ziroo/ZZ/zProjects/diskort`. pnpm node_modules bağları mutlak yol: klasör taşınınca tüm node_modules silinip yeniden kurulur.
- GitHub `gh` CLI ile HTTPS, `/opt/homebrew/bin/gh`; oturum açık hesap `zziroo` (token anahtar zincirinde) ([[2026-10-06-github-repolari-zziroo-hesabina-tasindi]]). Paketleme testlerinden sonra `apps/desktop/release` silinir (büyük).
- PATH yenileme gerekmiyor: zsh/Homebrew ortamında node, pnpm, gh doğrudan bulunuyor. Alışkanlık gereği araç komutlarında `export PATH=/opt/homebrew/bin:$PATH` yazmak zarar vermez.
- Mac'te Electron indirmesi: `node_modules` kurulu ama electron paketinin `dist/` klasörü yoktu (2026-10-07). Gerekirse electron paket klasöründe `node install.js` (Windows'ta geçerli olan çözüm; Mac'te çalıştırılıp doğrulanmadı). Windows'taki `dist/electron.exe` Mac'te `Electron.app` olur (doğrulanmadı).
- Python kullanımı: `python3` var. Mevcut dosyalara prettier çalıştırma. Ters eğik çizgili kod için Write/Edit kullan.

## Hâlâ geçerli (kodda duruyor, doğrulandı)
- `pnpm-workspace.yaml` içinde `allowBuilds:` haritası var (pnpm 12; `onlyBuiltDependencies` değil).
- `apps/server/tsup.config.ts` içinde `removeNodeProtocol: false` kalmalı, yoksa `node:sqlite` bundle'da bozulur.
- `apps/desktop/electron-builder.yml` içinde `npmRebuild: false` (uiohook-napi N-API prebuild ile gelir).
- Electron 44 paketinde postinstall yok (node_modules'ta `electron@44.4.5`).

## Windows dönemi (2026-10-05'e kadar; Mac'e geçişle geçersiz)
- Node 24 (winget zip), pnpm 12, git 2026-09-26'da kuruldu. PowerShell araç oturumlarında her çağrıda PATH yenilenirdi (Machine + User PATH birleştirilir).
- Visual Studio / C++ build tools YOKTU: node-gyp gerektiren native modüller başarısız oluyordu; `better-sqlite3` yerine `node:sqlite` seçiminin sebebi bu.
- Proje `C:\Users\yusuf\ZZ\zProjects\diskort` idi (OneDrive dışı; 2026-09-26'da taşınıp diskurt -> diskort yeniden adlandırıldı).
- Git Bash'te `/c/Program Files/GitHub CLI` ve WinGet Node dizini PATH'e eklenirdi. Windows'ta `yusufholat` ikinci hesap olarak duruyordu; Mac'te bu oturum kapatıldı.
- Bash'te `python` yoktu (Mac'te de `python` yok, `python3` var).
- Ek Windows tuzakları: [[ortam-tuzaklari-windows]].

## İlgili
- [[electron-cdp-testi]], [[_overview]]
