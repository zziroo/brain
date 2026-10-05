---
type: decision
project: genel
date: 2026-10-05
status: active
tags: [mac, gecis, claude, ortam]
source: ZZ kök oturumu 2026-10-05 (Windows → Mac taşıma paketi)
---

# Karar: Çalışma ortamı Windows'tan Mac'e taşınıyor; Claude geçmişi ve hafızası yollar çevrilerek paketle taşınır

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
  - `~/.claude` içinden: `CLAUDE.md`, `settings.json`, `skills/basla` ve `skills/kaydet`, `scheduled-tasks`, `orchestration-report`, `projects`. Oturum geçmişinin tamamı taşınır; eski `C--dev-*` klasörleri adları değişmeden, token raporu için.
- Hazırlarken yapılan dönüşümler:
  - `C--Users-yusuf-ZZ*` klasörleri `-Users-ziroo-ZZ*` olarak yeniden adlandırıldı.
  - `.md` dosyalarındaki `C:\Users\yusuf\...` yolları `/Users/ziroo/...` oldu. `.jsonl` transkriptlere dokunulmadı.
  - "Komutları PowerShell sözdiziminde ver" hafıza kuralı Mac için "zsh sözdizimi" oldu.
  - `usage.mjs` "ZZ (genel)" eşlemesi Mac klasör adını da tanıyor.
- Git satır sonu sorunu `kur.sh` içinde çözülüyor. Windows'ta `core.autocrlf=true` vardı, yani dosyalar diskte CRLF.
  - Taşınırken temiz olan repolar Mac'te bir kez LF'ye yeniden yazılır (`rm --cached` + `reset --hard`). Bu adım hâlâ temiz olduğu tekrar kontrol edilmeden çalışmaz. Repo `mactasima.lf=done` ile işaretlenir.
  - Kaydedilmemiş değişikliği olan repolara (vault ve steam-avgr-calculator) `autocrlf=input` verilir, dosyalara dokunulmaz.

## Neden
- Geçmiş ve hafıza taşınırsa token raporu kesintisiz devam eder ve hafıza kuralları kaybolmaz. Süreklilik zaten vault ve hafızadan geliyor.
- Yol çevirisi betikle yapıldı. Bu sayede taşımadan hemen önce `bash hazirla.sh` ile paket tekrar üretilebilir ve son oturumlar da girer.
- Betikleri ayrı bir inceleme ajanı iki tur okudu. Bulunan veri kaybı riski düzeltildi: git adımı tekrar çalışırsa Mac'te yapılmış değişiklikleri silebiliyordu.

## Reddedilen alternatifler
- **Yalnızca ZZ'yi kopyalamak:** Oturumlar, hafıza, global kurallar ve skill'ler gelmezdi.
- **`~/.claude` klasörünün tamamını kopyalamak:** Şunlar Windows'a ya da o makineye özgü:
  - `.credentials.json` (Mac'te girişler Keychain'de tutuluyor),
  - `.claude.json` (Windows yolları ve hesap durumu içeriyor),
  - `cache`, `session-env`, `shell-snapshots`.
  Bunun yerine Mac'te yeniden giriş yapılıyor.
- **Transkriptlerin (`.jsonl`) içindeki yolları da çevirmek:** Geçmiş kaydını bozma riski var, kazancı az. Eski oturum `claude --resume` ile açılabiliyor ama yeni iş için yeni oturum açılıyor.
- **Geçmişi taşımadan Mac'te sıfırdan başlamak:** Token raporu eski dönemi kaybederdi; proje hafızası da elle yeniden kurulmak zorunda kalırdı.

## Sonuçlar / riskler
- Pakette olmayanlar:
  - `node_modules` ve Python `venv` klasörleri,
  - büyük derleme çıktıları (`diskort/apps/desktop/release` ve `out`, `string-tool/release`, `web-fps-game/shots`),
  - diskort'un eski agent worktree'leri. İçlerinde kaydedilmemiş değişiklik yoktu, dalları repoda duruyor.
- SSH anahtarı (`~/.ssh/diskort_vps`) pakette yok, Yusuf kendisi taşır. iOS imza dosyaları OneDrive'daki `Yedekler` klasöründe.
- Pakette projelerin `.env` dosyaları var. Kişisel yolla (USB ya da kendi bulut hesabı) taşınır, kurulumdan sonra silinir.
- Masaüstü uygulamasının kenar çubuğundaki eski oturum listesi büyük ihtimalle Mac'te görünmez. Eski oturumlar `claude --resume` ile açılır.
- Zamanlanmış görevler Mac'te yeniden kurulana kadar Windows'ta çalışmaya devam eder. Mac'te kurulunca Windows'takiler kapatılmalı, yoksa gözcü iki kez çalışır.
- Mac tarafında yapılacakların listesi: [[mac-gecisi-kontrol-listesi]].

## İlgili
- [[mac-gecisi-kontrol-listesi]], [[araclar-ve-raporlar]], [[zamanlanmis-gorevler-ve-skiller]], [[_index]]
