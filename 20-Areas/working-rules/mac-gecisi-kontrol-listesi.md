---
type: resource
project: genel
date: 2026-10-07
status: active
tags: [mac, gecis, kontrol-listesi]
source: ZZ kök oturumu 2026-10-05; C:\Users\yusuf\mac-tasima\BENIOKU.md
---

# Mac geçişinde yapılacaklar: Mac'teki Claude bu listeyi işler, bitince bu notu arşivler

Karar ve gerekçe: [[2026-10-05-windowstan-maca-gecis]]. Mac'te ilk oturumda bu listeyi oku. Biten maddeyi işaretle. Liste bitince `status: done` yap ve notu `90-Archive/` altına taşı.

## Windows'ta, taşımadan hemen önce
- [x] Vault değişikliklerini commit et. Claude yaptı (2026-10-05); bütün repolar temiz.
- [x] Paketi tazele: Git Bash'te `bash /c/Users/yusuf/mac-tasima/hazirla.sh`.

## Mac'te kurulum (Yusuf)
- [x] `mac-tasima` klasörünü Mac'e kopyala ve `bash kur.sh` çalıştır. `~/ZZ` boş olmalı.
- [x] Git için Xcode araçları yoksa önce `xcode-select --install`, sonra `bash kur.sh git`.
- [ ] (2026-10-07: Node v24 ve Claude masaüstü uygulaması var; Obsidian `/Applications`'ta yok) Node.js LTS, Claude Code CLI ve Obsidian'ı kur. Obsidian'da `~/ZZ/brain` klasörünü kasa olarak aç.
- [x] `~/.ssh/diskort_vps` anahtarını taşı ve `chmod 600` ile izinlerini daralt.
- [ ] (2026-10-07: OneDrive kurulu değil) OneDrive'ı kur; `Yedekler/Diskort` klasörü oradan gelir.
- [x] (2026-10-07: paket yok; yalnızca `~/.claude/mac-tasima/` altında kur.sh'ın iki CRLF kayıt dosyası kaldı, `.env` yok) Kurulum bitince `mac-tasima` paketini sil. İçinde `.env` dosyaları var.

## Mac'te ilk Claude oturumu (Claude)
- [x] Kurulumu doğrula (2026-10-07: 7 memory klasörü var, usage.mjs çalışıyor):
  - `~/.claude/projects/-Users-ziroo-ZZ*/memory` klasörleri var. Konuşma kayıtları bilerek taşınmadı. (2026-10-07: sonradan `~/Arsiv/claude-konusmalar/` altına alındı, bkz. [[2026-10-05-windowstan-maca-gecis]] eki.)
  - `node ~/.claude/orchestration-report/usage.mjs` çalışıyor. Yalnızca Mac oturumlarını sayar; Windows dönemi: [[2026-10-05-windows-donemi-token-ozeti]].
- [ ] (Yusuf 2026-10-07: şimdilik ertelendi) Zamanlanmış görevleri yeniden kur: `diskort-geri-bildirim-kontrolu` saatlik, `diskort-main-kod-inceleme` 00:10'da. Metinleri `~/.claude/scheduled-tasks/` altında.
- [x] (2026-10-07: Windows'taki iki görev zaten kapalı, `enabled: false`; Windows artık yalnız Silksong için, bkz. [[2026-10-07-windows-makinesi-yalniz-silksong-icin]]) Mac'teki görevler çalışmaya başlayınca Yusuf'a Windows'takileri kapattır. Yoksa gözcü iki kez çalışır.
- [ ] Mac'te `~/.claude/settings.json` içine `"cleanupPeriodDays": 3650` ekle (belgelenen üst sınır; 36500 değil). Masaüstü oturumları zaten süresiz; bu ayar alt ajan kayıtlarını, araç çıktılarını ve terminal oturumlarını korur. Windows'ta 2026-10-07'de eklendi.
- [x] (2026-10-07: 15 repo temiz, fetch sonrası geride/ileride yok) `git status` ile repoların temiz göründüğünü kontrol et. Taşımadan önce bütün repolar temizdi; `kur.sh` hepsini bir kez LF satır sonuna çevirdi.
- [x] (2026-10-07: gerekenlerin hepsi kurulu; node_modules'u olmayan 3 projenin bağımlılığı yok) Bağımlılıkları `kur.sh` kendisi kurar: diskort için `pnpm install --frozen-lockfile`, song-finder, string-tool ve web-fps-game için `npm ci`, trencheck için venv. Node o sırada kurulu değildiyse sonradan `bash kur.sh bagimliliklar` çalıştır. `!!` ile başlayan hata satırı varsa birlikte bak.
- [x] (2026-10-07: global kimlik Ziroo / zziroo.ai@gmail.com, gh `zziroo`) Git: repoların kimliği kendi `.git/config` dosyalarında (Ziroo / zziroo.ai@gmail.com). Global kimliği `kur.sh` ayarlar. Push için Yusuf `gh auth login` ile giriş yapar, ardından `bash kur.sh git-kimlik` çalıştırır.
- [x] Vault: GitHub'da özel repo `zziroo/brain` (2026-10-05). `kur.sh`, gh girişi varsa vault'u oradan en güncel haline çeker. Giriş sonradan yapıldıysa `bash kur.sh git-kimlik` çalıştır. `/basla` her oturumda pull yapar, `/kaydet` commit'ten sonra push eder.
- [x] GitHub hesabı (2026-10-06, Mac'te 2026-10-06 yapıldı: gh `zziroo` aktif, 15 remote çevrildi ve ls-remote ile test edildi): 15 repo `zziroo` hesabına taşındı ([[2026-10-06-github-repolari-zziroo-hesabina-tasindi]]). Mac'te Yusuf `gh auth login` ile `zziroo` olarak girer (HTTPS) ve ardından `gh auth setup-git` çalıştırır. Sonra remote'ları çevir. Aşağıdaki komut yalnızca taşınan repoların remote'unu değiştirir, SSH remote'ları da HTTPS'e çevirir. Klasörler `~/ZZ` altında değilse yolu düzelt:
  `L=" brain isik-bekcisi diskort ziroo-edge ziroobank-expenses web-fps-game bal-vadisi document-formatter song-finder achievement-guide-formatter string-tool steam-avgr-calculator web-boss-teaser voice-detector trencheck "; for d in ~/ZZ/brain ~/ZZ/zProjects/*/; do u=$(git -C "$d" remote get-url origin 2>/dev/null) || continue; r=$(basename "$u" .git); case "$u" in *yusufholat/*) case "$L" in *" $r "*) git -C "$d" remote set-url origin "https://github.com/zziroo/$r.git" && echo "$d -> zziroo/$r";; esac;; esac; done`
- [x] (2026-10-07) Diskort: hafızadaki `diskort-dev-environment` notunun Windows maddelerini Mac'te doğrula ve notu güncelle.
- [x] Diskort Windows `.exe`: Karar GitHub Actions (Yusuf, 2026-10-07). Zaten kuruluymuş: `release.yml`'deki `windows` işi `v*` etiketiyle `windows-latest`'te paketleyip taslağa yüklüyor (v0.9.1–v0.9.6 hep başarılı, Windows işi ~2 dk). Windows makinesine gerek yok; `pnpm release:win` (scripts/release-win.mjs) yalnızca yedek yol.
- [x] (2026-10-07; diskort `.claude/settings.local.json` içindeki Windows yol kuralları bayat, bkz. [[izinler-ve-ayarlar]]) Windows'a özgü vault notlarını güncelle ya da Windows dönemine ait olduklarını belirt:
  - [[ortam-tuzaklari-windows]]
  - [[dev-ortami-tuzaklari]]
  - `10-Projects/diskort/runbooks/telefonla-erisim.md` (`claude.exe` yolu)
  - [[izinler-ve-ayarlar]]
  - [[zamanlanmis-gorevler-ve-skiller]] (gelen kutusu yolu)

## Windows temizliği (2026-10-07)
Karar (Yusuf, 2026-10-07): Windows silinmiyor, yalnız Silksong modu için kalıyor (LoRA eğitimi Windows'ta). O oturumlar Mac'ten Remote Control ile sürülür. Geri kalan her şey Windows'tan gitti. Windows'ta yapılanlar: [[2026-10-07-windows-makinesi-yalniz-silksong-icin]].
- [x] **Işık Bekçisi:** "Camın ısısı" `b14f502` ile `main`'e girdi ve push edildi. Mac'te pull edildi (2026-10-07).
- [x] **Silksong modu:** Windows'ta kalıyor. Kodu `C:\Users\yusuf\ZZ\zProjects\silksong-mod` ve `D:\SilksongMod\work` altında; GitHub'da repo yok. Mac'teki `silksong-mod` klasöründe yalnız 2 tasarım dosyası var, asıl kopya sayılmaz.
- [x] **Diskort'ta yalnız Windows'ta duran 2 commit:** `origin/mimari-tanitim-videosu` dalına push'landı, Mac'te görünüyor. Merge kararı Yusuf'ta.
- [x] **Windows oturumları:** Silksong dışındaki 212 oturum Windows'ta arşivlendi; Mac kenar çubuğundaki `isik-bekcisi · yusufholat` grubu bunlardandı.
- [ ] **Telefondan açılmış iki eski Windows oturumu** ("projenin mimarisini anlatan bir motion design video…", "diskortumuzu geliştiriyoruz", 2026-09-29/30, eski `C:\dev\diskort`): Windows arşivlemesine girmedi, Mac kenar çubuğunda "Other" altında duruyor. Kayıtları zip'te; arşivlenebilir.
- [x] **Konuşma arşivi** (2026-10-07): Windows'taki son zip (2.553 dosya, 690 `.jsonl`) Mac'te denetlendi ve `~/Arsiv/claude-konusmalar/windows/` içinde eskisinin yerine kondu; eskisi çöpte.
- [x] **Claude hafızası** (2026-10-07): Geçişten sonra Windows'ta değişen hafıza notları Mac'tekilerle karşılaştırıldı. `incremantal-game`'e yeni `gamepad-later-keep-keeper-clean` notu eklendi; diskort `dev-environment` notuna `yusufholat` oturumunun iki makinede kapandığı işlendi. Windows'a özgü `msix-appdata-sanallastirma` (ZZ) ve `silksong-mod` hafızası Windows'ta kaldı; diğer farklar Mac'in daha yeni ya da Mac'e uyarlanmış hâli.
- [ ] **Zamanlanmış görevler:** Windows'taki iki Diskort görevi kapalı (gözcü 2026-10-06'dan beri çalışmıyor), Mac'te kurulmadı. Yani gözcü şu an hiçbir yerde çalışmıyor; kurulum yukarıdaki ertelenmiş maddede.

## Notlar
- 2026-10-05 akşam Mac'ten ilk yayın yapıldı (altı araç): [[mac-ten-yayin-copyfile-disable-ve-exe-siz-ceviri-sayfasi]]. SSH anahtarı ve `gh` push çalışıyor.

## İlgili
- [[2026-10-05-windowstan-maca-gecis]], [[_index]]
