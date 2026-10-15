---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, capacitor, ota, deploy, magaza]
source: oturum 2026-10-13/15 (mobil-playus: Capacitor, OTA canlı güncelleme)
---

# Karar: OTA web paketi güncellemesi kendi sunucumuzdan, Capgo eklentisiyle (onlyDownload, açılışta geçiş)

## Bağlam
Gömülü web paketi yapı anında donuyor; diğer oturumun oyun/tema değişiklikleri TestFlight yapı 1'e ve telefondaki APK'ya girmedi. [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]] kararındaki OTA katmanı öne alındı.

## Karar
- Eklenti `@capgo/capacitor-updater` 8.52.x (MPL-2.0; 9.x/10.x npm'de Capacitor 5 artıkları, yükseltme), Capgo bulutu yok: `updateUrl = https://tussle.ziroo.net/api/app/update`, stats/channel kapalı.
- **Mod `autoUpdate: 'onlyDownload'`**: açılış ve öne gelişte kontrol+indirme; geçiş yalnız sayfa boot'unda (`initOta` → `notifyAppReady` → en yeni bekleyen pakete `set()`). Arka plana giden oyun hiç yeniden yüklenmez. `autoDeleteFailed: false` + localStorage'da başarısız sürüm listesi: bozuk paket döngüye girmez (emülatörde döngü görüldü, böyle kapandı).
- Sürüm `MAJOR.YYYYMMDD.HHMM` (UTC, semver uyumlu, zamanla büyür); `TUSSLE_BUNDLE_VERSION` ile elle. App build'de `dist/client/bundle.json` {version, rev, api, minNative}; `capacitor.config.ts` cap sync'te onu okur (yoksa uyarır; https dışı api'de `TUSSLE_ALLOW_MIXED=1` yoksa hata).
- Sunucu: `POST /api/app/update` (native istek, Origin yok; CORS gerekmez), `DATA_DIR/bundles/current.json` {version,file,sha256,minNative}; teklif kuralı: istemci sürümü ≠ güncel **ve** güncel > gömülü **ve** versionCode ≥ minNative; yoksa `up_to_date` / `blocked native_too_old`. `GET/HEAD /bundles/<ad>.zip` sıkı ad regex'i, immutable + ETag, 404 listeleme yok. Hız sınırı `bundle` 120/IP/10 dk, `otaCheck` 60/IP/dk. Eklenti sha256'yı anahtar olmadan da doğruluyor (kaynakta teyit edildi); imzalı/şifreli paket (`publicKey`, anahtar `~/.tussle/ota-key.pem`) sonraya.
- Araçlar: `node scripts/ota-bundle.mjs` → `dist/ota/tussle-<sürüm>.zip` + `current.json`; `bash deploy/ota.sh` (önce zip, sonra manifest, tmp+mv, var olan zip'in üstüne yazmaz, yayın sonrası endpoint'ten doğrular). `deploy/compose.yml` `OTA_BASE_URL`.
- **Geri alma = düzeltilmiş paketi daha yüksek sürümle yayınlamak.** Gömülü sürümün altına geri işaretlemek, daha yeni OTA'daki cihazlara ulaşmaz. iOS CFBundleVersion ve Android versionCode düz tamsayı ve eşit tutulur (`otaMinNative` package.json'da).
- Mağaza kuralı: oyun/denge/görsel/metin OTA; izin, eklenti, Capacitor sürümü, ödeme → mağaza yapısı (Apple 3.3.1/2.5.2 ve Google politikası içinde).

## Neden
- Arkadaş testi döneminde her düzeltme için TestFlight/Play yapısı yüklemek yavaş; OTA dakikalar içinde iner.
- Bulut servis yerine kendi sunucu: bağımlılık ve ücret yok, paket yalnız kendi alan adından iner.

## Reddedilen alternatifler
- `directUpdate`/varsayılan autoUpdate: arka plana gidince WebView yeniden yükleniyor, oyun ölür.
- Sunucuda "yalnız eski sürüme teklif" kuralı: "eşit değil" kuralı geri işaretlemeyi de taşıyor (gömülü üstü kaldığı sürece).

## Durum (2026-10-15)
Sunucu `a53cce5` canlı; ilk paket 0.20261015.831 yayında; Android APK (OTA'lı) Yusuf'un telefonunda; iOS yapı 2 TestFlight'a yüklendi (işlenmesi bekleniyor; 1.0'dan incelemeye tek yapı: önce yapı 1 onayı, sonra yapı 2 gruba eklenir).

## İlgili
- [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]], [[2026-10-13-android-kabuk-ve-durum-cubugu-seridi]], [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]]
