---
name: diskort-dev-environment
description: "Quirks of the user's Mac dev machine for Diskort (node:sqlite instead of native modules, pnpm 12 allowBuilds, CDP-based Electron testing); Windows-era items kept labelled"
metadata:
  node_type: memory
  type: reference
  originSessionId: 6b202245-1c00-4ad6-9973-1b24d27631fd
---

> 2026-10-07: Yusuf Mac'e geçti (kullanıcı `ziroo`, zsh, Homebrew `/opt/homebrew`, Apple Silicon arm64). Bu not Mac gerçeğini anlatır; "Windows dönemi" bölümü eski makineye aittir. Mac maddeleri 2026-10-07'de komutlarla doğrulandı, doğrulanamayanlar "doğrulanmadı" diye işaretli.

## Mac (güncel)
- Node v24.21.0, pnpm 12.6.0, gh `/opt/homebrew/bin/gh` (Homebrew), git Apple Git 2.54.0 (`/usr/bin/git`), `python3` var / `python` yok. PATH yenileme tuhaflığı yok; araç oturumlarında yine de `export PATH=/opt/homebrew/bin:$PATH` zararsız.
- Xcode Command Line Tools kurulu (clang/make var), yani Mac'te C++ derleyicisi var. Proje yine de `node:sqlite` (better-sqlite3 değil) ve electron-builder `npmRebuild: false` kullanıyor (uiohook-napi N-API prebuild); kodda doğrulandı. Native modül derlemesi Mac'te denenmedi (doğrulanmadı).
- pnpm 12 `pnpm-workspace.yaml` içinde `allowBuilds:` haritası kullanır (doğrulandı, `onlyBuiltDependencies` değil).
- Electron 44 paketinde postinstall yok. Mac'te electron paketinin `dist/` klasörü yoktu (2026-10-07); gerekirse paket klasöründe `node install.js`. Windows'taki `dist/electron.exe` Mac'te `Electron.app` olmalı (doğrulanmadı).
- tsup `removeNodeProtocol: false` kalmalı (apps/server/tsup.config.ts'te var), yoksa `node:sqlite` bundle'da bozulur.
- Dev Electron penceresi computer-use'a verilemez; CDP ile test et: env `DISKORT_DEBUG_PORT=9222 DISKORT_FAKE_MEDIA=1` (src/main/index.ts'te dev-only anahtarlar; `DISKORT_DEBUG_PORT` kodda doğrulandı), küçük bir Node WebSocket CDP betiğiyle sür; dev'de `window.__diskort` ses istemcisini ve store'ları açar.
- Proje `/Users/ziroo/ZZ/zProjects/diskort`. pnpm node_modules bağları mutlak yol: klasör taşınırsa ya da yeniden adlandırılırsa tüm node_modules silinip yeniden kurulur (gerekirse sonra electron paketinde `node install.js`).
- GitHub `gh` CLI ile HTTPS; oturum açık hesap `zziroo` (2026-10-06'dan beri, aktif, token anahtar zincirinde). Paketleme testlerinden sonra `apps/desktop/release` silinir (büyük).
- Yerel installer/güncelleme-akışı testleri: ayrı kimlik config'iyle build et (`extends: electron-builder.yml`, kendi appId/guid/name) VE `extraMetadata.productName` de ver; yoksa Electron userData yine gerçek `Diskort` klasörü olur (Mac'te `~/Library/Application Support/Diskort` var: kullanıcının gerçek ayarları/oturumu; yol Mac'te doğrulandı, Windows'ta `%APPDATA%\Diskort`'tu). `/updates/*`'i 302'leyen ve tek Range destekleyen bir Node sunucusuyla feed ver; paketli uygulamayı env `DISKORT_UPDATE_URL` ile ona yönelt. Uygulama pencerelerini görmek için masaüstü ekran görüntüsü alma (kullanıcının özel sohbetini yakalamıştı); bunun yerine `resources/splash/index.html`'i tarayıcı panelinde önizle. (Bu akış Mac'te yeniden denenmedi, doğrulanmadı.)
- Claude Code CLI: `claude` Mac'te PATH'te yok; masaüstü uygulaması ikiliyi `~/Library/Application Support/Claude/claude-code/<sürüm>/<hash>/claude.app/Contents/MacOS/claude` altında tutuyor.

## Windows dönemi (2026-10-05'e kadar; Mac'te geçersiz)
- Node 24 winget zip kurulumu; PowerShell araç oturumlarında her çağrıda PATH yenilenirdi: `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`.
- Visual Studio / C++ build tools YOKTU: node-gyp gerektiren native modüller başarısız oluyordu; `node:sqlite` seçiminin kaynağı bu.
- Proje `C:\Users\yusuf\ZZ\zProjects\diskort` idi. Git Bash'te `/c/Program Files/GitHub CLI` ve WinGet Node dizini PATH'e eklenirdi. Electron `dist/electron.exe`; userData `%APPDATA%\Diskort`.
- Kullanıcının PowerShell'i script engelliyordu (`pnpm.ps1 cannot be loaded`): pnpm komutları `pnpm.cmd ...` olarak verilirdi; Execution Policy'yi biz değiştirmezdik. Mac'te geçerli değil.
- Windows'ta `yusufholat` ikinci gh hesabıydı; 2026-10-07'de iki makinede de oturumu kapatıldı. Taşınan repolarda hâlâ collaborator.

Related: [[diskort-project]]
