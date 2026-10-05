---
type: decision
project: genel
date: 2026-10-05
status: active
tags: [mac, gecis, claude, ortam]
source: ZZ kök oturumu 2026-10-05 (Windows → Mac taşıma paketi)
---

# Karar: Çalışma ortamı Windows'tan Mac'e taşınıyor; Claude hafızası yollar çevrilerek paketle taşınır, konuşma kayıtları Windows'ta kalır

> **Güncelleme (aynı gün, taşımadan önce):** İlk plan konuşma kayıtlarını (`.jsonl`, yaklaşık 1,3 GB) da taşımaktı. Yusuf, kaybın yalnızca token raporunun eski dönemi olduğunu görünce vazgeçti. Kayıtlar Windows'ta arşiv olarak duruyor. Windows döneminin token özeti vault'a kaydedildi: [[2026-10-05-windows-donemi-token-ozeti]]. Paketi tam haliyle üretmek hâlâ mümkün: `TAM=1 bash hazirla.sh`.

## Bağlam
Yusuf tüm Claude çalışmasını (ZZ, vault, oturumlar, hafıza, kurallar, token raporu) Windows'tan Mac'e taşımak istedi. Yalnızca ZZ'yi kopyalamak yetmiyor çünkü:
- Claude oturumları ve hafıza ZZ'de değil, `~/.claude/projects/<klasör>` altında duruyor.
- Bu klasörün adı projenin mutlak yolundan türetiliyor: harf ve rakam dışındaki her karakter `-` oluyor. `C:\Users\yusuf\ZZ` → `C--Users-yusuf-ZZ`, `/Users/ziroo/ZZ` → `-Users-ziroo-ZZ`. Klasör adları değişmezse Mac'teki Claude eski geçmişi ve hafızayı bulamaz.

## Karar
- Mac'te ZZ `/Users/ziroo/ZZ` yolunda (ev klasörü, kullanıcı adı `ziroo`). Belgeler ve Masaüstü kullanılmadı.
- Taşıma klasörü `C:\Users\yusuf\mac-tasima\`. İçindekiler:
  - `hazirla.sh`: paketi üretir.
  - `notlar-uyarla.sh`: Windows'a özgü 4 hafıza notunu uyarlar.
  - `kur.sh`: Mac'te paketi yerine koyar.
  - `BENIOKU.md`: adım adım talimatlar.
  - `paket.tar.gz`: paketin kendisi.
- Pakete girenler:
  - ZZ.
  - `diskort-inbox` ve `diskort-review`.
  - `~/.claude` içinden: `CLAUDE.md`, `settings.json`, `skills/basla` ve `skills/kaydet`, `scheduled-tasks`, `orchestration-report`, ve `projects` altından **yalnızca `memory/` klasörleri**. Konuşma kayıtları, eski `C--dev-*` klasörleri ve hafızası boş projeler pakete girmez.
- Hazırlarken yapılan dönüşümler:
  - `C--Users-yusuf-ZZ*` klasörleri `-Users-ziroo-ZZ*` olarak yeniden adlandırıldı.
  - `.md` dosyalarındaki `C:\Users\yusuf\...` yolları `/Users/ziroo/...` oldu. `.jsonl` transkriptlere dokunulmadı.
  - "Komutları PowerShell sözdiziminde ver" hafıza kuralı Mac için "zsh sözdizimi" oldu.
  - `usage.mjs` "ZZ (genel)" eşlemesi Mac klasör adını da tanıyor.
- Git satır sonu sorunu `kur.sh` içinde çözülüyor. Windows'ta `core.autocrlf=true` vardı, yani dosyalar diskte CRLF.
  - Taşınırken temiz olan repolar Mac'te bir kez LF'ye yeniden yazılır (`rm --cached` + `reset --hard`). Bu adım hâlâ temiz olduğu tekrar kontrol edilmeden çalışmaz. Repo `mactasima.lf=done` ile işaretlenir.
  - Kaydedilmemiş değişikliği olan repolara (vault ve steam-avgr-calculator) `autocrlf=input` verilir, dosyalara dokunulmaz. Not: taşımadan önce vault commit edildi. steam-avgr-calculator'daki değişiklik ise 98d802c düzeltmesini yanlışlıkla geri almış eski bir haldi; Yusuf'un onayıyla son commit'e döndürüldü. Bu nedenle bütün repolar temiz taşınıyor.

## Neden
- Süreklilik vault'tan, hafızadan ve kurallardan geliyor; bunlar taşınmazsa Mac'teki Claude projeleri ve tercihleri bilmeden başlar.
- Eski konuşma kayıtlarının Mac'te tek işlevi token raporunu sürdürmek ve geçmişe bakmak olurdu. İçlerindeki Windows yolları yüzünden `--resume` ile devam etmek zaten önerilmiyor. Kayıtlar Windows'ta silinmeden kaldığı için gerçek bir kayıp yok.
- Yol çevirisi betikle yapıldı. Bu sayede taşımadan hemen önce `bash hazirla.sh` ile paket tekrar üretilebilir ve son hafıza değişiklikleri de girer.
- Betikleri ayrı bir inceleme ajanı iki tur okudu. Bulunan veri kaybı riski düzeltildi: git adımı tekrar çalışırsa Mac'te yapılmış değişiklikleri silebiliyordu.

## Reddedilen alternatifler
- **Yalnızca ZZ'yi kopyalamak:** Oturumlar, hafıza, global kurallar ve skill'ler gelmezdi.
- **`~/.claude` klasörünün tamamını kopyalamak:** Şunlar Windows'a ya da o makineye özgü:
  - `.credentials.json` (Mac'te girişler Keychain'de tutuluyor),
  - `.claude.json` (Windows yolları ve hesap durumu içeriyor),
  - `cache`, `session-env`, `shell-snapshots`.
  Bunun yerine Mac'te yeniden giriş yapılıyor.
- **Konuşma kayıtlarını da taşımak (ilk plan):** Paket 761 MB olurdu; tek kazanç Mac'teki token raporunun eski dönemi de sayması olurdu. Bunun yerine Windows dönemi bir özet notla kapatıldı.
- **Transkriptlerin (`.jsonl`) içindeki yolları da çevirmek:** Geçmiş kaydını bozma riski var, kazancı az. Kayıtlar zaten taşınmıyor.
- **Mac'te tamamen sıfırdan başlamak (hafıza dahil):** Proje hafızası ve kurallar elle yeniden kurulmak zorunda kalırdı. Bunların bir kısmı unutulurdu.

## Sonuçlar / riskler
- Pakette olmayanlar:
  - `node_modules` ve Python `venv` klasörleri,
  - büyük derleme çıktıları (`diskort/apps/desktop/release` ve `out`, `string-tool/release`, `web-fps-game/shots`),
  - diskort'un eski agent worktree'leri. İçlerinde kaydedilmemiş değişiklik yoktu, dalları repoda duruyor.
  - diskort'taki yerel dosyalar (`.claude/settings.local.json`, `.claude/etkinlik-ekran/`, `now.txt`) taşındı ama git onları `.git/info/exclude` ile yok sayıyor. Bunlar commit edilmez, çünkü repo herkese açık.
- SSH anahtarı (`~/.ssh/diskort_vps`) pakette yok, Yusuf kendisi taşır. iOS imza dosyaları OneDrive'daki `Yedekler` klasöründe.
- Pakette projelerin `.env` dosyaları var. Kişisel yolla (USB ya da kendi bulut hesabı) taşınır, kurulumdan sonra silinir.
- Eski oturumlar Mac'te açılamaz; bakmak gerekirse Windows'tan bakılır. Mac'te token raporu sıfırdan başlar. Windows dönemi: [[2026-10-05-windows-donemi-token-ozeti]].
- Zamanlanmış görevler Mac'te yeniden kurulana kadar Windows'ta çalışmaya devam eder. Mac'te kurulunca Windows'takiler kapatılmalı, yoksa gözcü iki kez çalışır.
- Vault artık GitHub'da da var: özel repo `yusufholat/brain`, 2026-10-05'te açıldı. Önce gizli değer taraması yapıldı, çalışma ağacında ve geçmişte bir şey çıkmadı; notlarda yalnızca sunucu IP'leri var. İki makine bu repo üzerinden eşitlenir. Vault kuralları, `/basla` (pull) ve `/kaydet` (push) buna göre güncellendi.
- Mac tarafında yapılacakların listesi: [[mac-gecisi-kontrol-listesi]].

## İlgili
- [[mac-gecisi-kontrol-listesi]], [[araclar-ve-raporlar]], [[zamanlanmis-gorevler-ve-skiller]], [[_index]]
