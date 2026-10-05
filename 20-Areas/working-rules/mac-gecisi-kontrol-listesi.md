---
type: resource
project: genel
date: 2026-10-05
status: active
tags: [mac, gecis, kontrol-listesi]
source: ZZ kök oturumu 2026-10-05; C:\Users\yusuf\mac-tasima\BENIOKU.md
---

# Mac geçişinde yapılacaklar: Mac'teki Claude bu listeyi işler, bitince bu notu arşivler

Karar ve gerekçe: [[2026-10-05-windowstan-maca-gecis]]. Mac'te ilk oturumda bu listeyi oku. Biten maddeyi işaretle. Liste bitince `status: done` yap ve notu `90-Archive/` altına taşı.

## Windows'ta, taşımadan hemen önce
- [x] Vault değişikliklerini commit et. Claude yaptı (2026-10-05); bütün repolar temiz.
- [ ] Paketi tazele: Git Bash'te `bash /c/Users/yusuf/mac-tasima/hazirla.sh`.

## Mac'te kurulum (Yusuf)
- [ ] `mac-tasima` klasörünü Mac'e kopyala ve `bash kur.sh` çalıştır. `~/ZZ` boş olmalı.
- [ ] Git için Xcode araçları yoksa önce `xcode-select --install`, sonra `bash kur.sh git`.
- [ ] Node.js LTS, Claude Code CLI ve Obsidian'ı kur. Obsidian'da `~/ZZ/brain` klasörünü kasa olarak aç.
- [ ] `~/.ssh/diskort_vps` anahtarını taşı ve `chmod 600` ile izinlerini daralt.
- [ ] OneDrive'ı kur; `Yedekler/Diskort` klasörü oradan gelir.
- [ ] Kurulum bitince `mac-tasima` paketini sil. İçinde `.env` dosyaları var.

## Mac'te ilk Claude oturumu (Claude)
- [ ] Kurulumu doğrula:
  - `~/.claude/projects/-Users-ziroo-ZZ*` klasörleri var.
  - `claude --resume` eski oturumları listeliyor.
  - `node ~/.claude/orchestration-report/usage.mjs` çalışıyor ve eski dönemi de sayıyor.
- [ ] Zamanlanmış görevleri yeniden kur: `diskort-geri-bildirim-kontrolu` saatlik, `diskort-main-kod-inceleme` 00:10'da. Metinleri `~/.claude/scheduled-tasks/` altında.
- [ ] Mac'teki görevler çalışmaya başlayınca Yusuf'a Windows'takileri kapattır. Yoksa gözcü iki kez çalışır.
- [ ] `git status` ile repoların temiz göründüğünü kontrol et. Taşımadan önce bütün repolar temizdi; `kur.sh` hepsini bir kez LF satır sonuna çevirdi.
- [ ] Bağımlılıkları `kur.sh` kendisi kurar: diskort için `pnpm install --frozen-lockfile`, song-finder, string-tool ve web-fps-game için `npm ci`, trencheck için venv. Node o sırada kurulu değildiyse sonradan `bash kur.sh bagimliliklar` çalıştır. `!!` ile başlayan hata satırı varsa birlikte bak.
- [ ] Git: repoların kimliği kendi `.git/config` dosyalarında (Ziroo / zziroo.ai@gmail.com). Global kimliği `kur.sh` ayarlar. Push için Yusuf `gh auth login` ile giriş yapar, ardından `bash kur.sh git-kimlik` çalıştırır.
- [ ] Diskort: hafızadaki `diskort-dev-environment` notunun Windows maddelerini Mac'te doğrula ve notu güncelle.
- [ ] Diskort: Windows masaüstü sürümü (NSIS `.exe`) şu ana kadar Windows'ta paketleniyordu. Mac'ten nasıl yayınlanacağını netleştir: GitHub Actions mı, Windows makinesi mi? Karar Yusuf'un.
- [ ] Windows'a özgü vault notlarını güncelle ya da Windows dönemine ait olduklarını belirt:
  - [[ortam-tuzaklari-windows]]
  - [[dev-ortami-tuzaklari]]
  - `10-Projects/diskort/runbooks/telefonla-erisim.md` (`claude.exe` yolu)
  - [[izinler-ve-ayarlar]]
  - [[zamanlanmis-gorevler-ve-skiller]] (gelen kutusu yolu)

## İlgili
- [[2026-10-05-windowstan-maca-gecis]], [[_index]]
