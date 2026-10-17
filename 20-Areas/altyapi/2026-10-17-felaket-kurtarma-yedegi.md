---
type: decision
project: genel
date: 2026-10-17
status: active
tags: [altyapi, yedek, felaket-kurtarma, kasa, sunucu]
source: Claude Code oturumu 2026-10-17 "sistem: kaydet/başla komutları ve vault düzeni" (yedek bölümü)
---

# Karar: VPS çökerse yeni makinede her şey geri gelsin; gece makine yedeği şifreli, sırlar Mac'teki şifreli kasada

## Bağlam
Yalnız Diskort ve Tussle veritabanları yedekleniyordu. ziroobank, rehber, kapis, song-finder, Uptime Kuma, kripto-bot verisi; sunucudaki bütün `.env` ve sır dosyaları; systemd/Caddy/konteyner ayarları yedeksizdi. Diskort imzaları (Android, iOS, OTA) yalnız Windows'taki OneDrive'daydı; Windows artık aktif değil ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]). Yusuf: "VPS çöktüğünde yeni bir makineyle geri gelebilelim."

## Karar
- **Sunucu gece yedeği** (ziroo-edge `ops/yedek/`, `ziroo-yedek.timer` 04:40, Diskort 04:00 ve Tussle 04:20'den sonra): `/var/backups/ziroo/<tarih>/` (7 gün). Her proje verisi (`veri-<proje>.tar.gz.enc`; SQLite'lar python3 backup API ile tutarlı), sırlar (`sirlar.tar.gz.enc`: `/etc/*.env`, `/opt/*/.env`, Diskort `secrets/` + `livekit.yaml`, ziroobank `secrets/`, `/root/.ssh`), gizli kurulum (`kurulum-gizli.tar.gz.enc`: Caddy siteleri, cron, sshd), düz kurulum (`kurulum.tar.gz`: systemd birimleri, ufw, apt listesi, `konteynerler.json/.sh` yalnız env ADLARIYLA). **Her şey RSA-OAEP + AES-256 ile açık anahtarla şifreli**; özel anahtar sunucuda yok. İlk çalışma 2026-10-17: 2,7 MB, 13 dosya, hata yok.
- **Mac'e çekme:** launchd `net.ziroo.sunucu-yedek` her gün 12:30 → `~/Yedekler/Sunucu/<tarih>` (30 gün), sonra iCloud Drive `Yedek/` kopyası: `Sunucu/` (7 gün), `Diskort/` (son DB + ekler + profil fotoğrafları), `Tussle/` (yalnız son DB; 14 gün gizlilik sözü). Diskort/Tussle DB çekimi hâlâ Diskort deposundaki `net.ziroo.diskort-yedek` (12:00) ile.
- **Kasa:** şifreli APFS disk görüntüsü `~/Kasa.sparsebundle` (birim `Kasa`, parola Yusuf'un Şifreler uygulamasında). İçinde: `sunucu-yedek/` (yedekleri açan özel anahtar), `diskort/` (OneDrive'dan gelen android/ios/ota imzaları, sunucu-ssh, uygulama-ayarlari), `mac/` (`~/.ssh`, `~/keys`, `Sertifikalar.p12`, projelerin `.env`'leri; `kasa-guncelle.sh` doldurur). `kasa-guncelle.sh` kasayı ayırıp iCloud `Yedek/Kasa.sparsebundle`'a kopyalar (bir önceki sürüm `.onceki`).
- **Kurtarma rehberi:** ziroo-edge `ops/yedek/README.md` "Yeni VPS'e kurtarma" (11 adım: makine → docker → yedeği çöz → sırlar ve veri `tar -C /` → kurulum dosyaları → ziroo-edge → projelerin deploy betikleri → Cloudflare DNS → smoke testi). Makine bilgisi: [[vps-makinesi]].
- **Kod:** kripto-bot GitHub'a özel repo olarak yüklendi (`zziroo/kripto-bot`, 2026-10-17). `ziroo-dns-vpn` boş klasör, yüklenecek bir şey yok.

## Neden
- Açık anahtarla şifreleme: sunucu gece kendi başına yedek alabilir ama ele geçse bile eski yedekleri açamaz; yedekler iCloud'da güvenle durur.
- Kasa yerel + ayrılınca iCloud'a kopya: bağlı bir sparsebundle iCloud'da senkronlanırken bozulabilir.
- Veri paketleri de şifreli: inceleme, Kuma DB'sinde Telegram bot jetonu ve ziroobank/rehber'de kişisel veri olduğunu gösterdi.

## Reddedilen alternatifler
- **Yalnız sırları şifrelemek:** Kuma jetonları ve kişisel veri iCloud'a düz giderdi.
- **Kasa doğrudan iCloud'da:** senkron sırasında bozulma riski.
- **OneDrive'ı Mac'e kurmak:** Windows dönemine bağlı kalırdı; iCloud zaten var (5 GB ücretsiz, kullanım ~80 MB).
- **Sunucuya age/rsync kurmak:** gereksiz paket; openssl ve tar akışı yetti.

## Kasa bakımı (ders)
Kasadan dosya silmek yer açmaz: Finder silinenleri kasanın kendi Çöp'üne koyar ve sparsebundle kendiliğinden küçülmez. Sıra: kasa açıkken Çöp'ü boşalt → `hdiutil detach` → `hdiutil compact ~/Kasa.sparsebundle` (parola sorar) → `kasa-guncelle.sh --yalniz-kopyala`. 2026-10-17'de bu yolla 400 MB → 60 MB.

## Doğrulananlar / açık noktalar
- Doğrulandı: sunucuda ilk yedek, Mac'e çekme (elle ve launchd ile), iCloud kopyası, kasadaki anahtarla 8 şifreli paketin çözülmesi, geri yüklenen ziroobank DB'sinde `integrity_check` ok.
- Denenmedi: gerçek bir boş VPS'e uçtan uca kurtarma provası (öneri: geçici küçük VPS'te bir kez).
- Kuma push monitörü "yedek makine" (#27, Makine grubu, 2 saat) açık ve yeşil; `PUSH_MAKINE_BACKUP` sunucuda `check.env`'de (2026-10-17).
- Cloudflare DNS: 7 kayıt (iki A: `ziroo.net` ve joker `*`, 3 MX, SPF ve DKIM TXT; hepsi DNS only) kasada `dns/ziroo.net-dns-2026-10-17.txt` (BIND biçimi, panelden okundu; Export düğmesi Chrome eklentisinden indirme vermedi). Yeni VPS'te yalnız iki A kaydı değişir.
- Açık: Diskort/Tussle DB çekimi ziroo-edge'deki ortak betiğe taşınabilir.

İlgili: [[yedekler]], [[secret-isleme-kurali]], [[2026-10-15-yedek-aynasi-mac-launchd]], [[proje-altyapi-standardi]]
