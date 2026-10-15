---
type: resource
project: kisisel
date: 2026-10-15
status: active
tags: [cihaz, android, xiaomi, hyperos, xiaomi-eu]
source: Oturum "kişisel: Xiaomi 17 Pro xiaomi.eu kurulumu" (2026-10-14)
---

# Xiaomi 17 Pro (pandora): durum ve bakım notu

Yusuf'un telefonu. Çin modeli (25098PN5AC), yurt dışından alındı; Türkiye'de bir servis "IMEI attı" ve bölgeyi global/TR yaptı. 2026-10-14'te temizlenip xiaomi.eu ROM'una geçirildi.

## Güncel durum (2026-10-15)
- ROM: **xiaomi.eu OS3.0.319.0.WBLCNXM** (HyperOS 3, Android 16, güvenlik yaması 2026-08). Bölge TR, Google servisleri yerleşik.
- Bootloader açık (orange). Root yok.
- Güncellemeler xiaomi.eu'nun kendi OTA'sından telefona gelir; resmi Xiaomi OTA bu cihaza hiç gelmez (17 Pro'nun global sürümü yok, Çin donanımına global ROM flaşı Xiaomi tarafından engelli).
- IMEI: cihazın bildirdiği IMEI kutudakinden farklı; servis yazmış. e-Devlet "ithalat yoluyla kayıtlı" diyor ama bu kayıt o numaraya ait, cihaza değil. Yasal yol: kutudaki gerçek IMEI'yi e-Devlet'ten ithalat kaydıyla kendi adına kaydettirmek. **Açık iş.**
- Mac'te yedekler: `~/Downloads/xiaomi17pro-yedek/` (21 GB medya kopyası) ve `~/Downloads/xiaomi-eu-pandora/` (ROM arşivi + açılmış hali). Fotoğraflar Google Fotoğraflar'da doğrulandıktan sonra silinebilir.

## 2026-10-14 öncesi cihazda ne vardı (adb ile tespit)
- Stok Çin ROM OS3.0.25.0.WBLCNXM (Ekim 2025), tamamen release-keys.
- **KernelSU** (bootstrap/LKM) + **Zygisk Next**, denylist ile Güncelleyici ve Google'dan gizlenmiş. Yönetici uygulaması görünmüyordu.
- `mi_ext` bölümü, Xiaomi 17 (pudding) global ROM'unun OS3.0.9.0.WPCMIXN sürümünden alınıp `mod_device=pandora_global`, bölge TR yapılmıştı. Google ve TR bölgesi bu hileyle açılmıştı.
- Güncelleme görünmeme nedeni: Güncelleyici sunucuya "pandora_global / 3.0.9.0" diye soruyordu; sunucu "success" ama boş liste dönüyordu (böyle bir ROM yok).

## Yeniden kurulum runbook'u (xiaomi.eu, fastboot)
1. Yedek: Google cihaz yedeği, WhatsApp, Google Fotoğraflar, Authenticator senkronu; Mi hesabından çıkış (Find Device kapalıysa şifre sormaz). İstersen medyayı `adb pull` ile Mac'e.
2. ROM: SourceForge `xiaomi-eu-multilang-miui-roms` → `HyperOS-STABLE-RELEASES` → `xiaomi.eu_PANDORA_...zip`. MD5/SHA1 sayfadaki gömülü JSON'da; dosya adındaki son ek MD5'in başı.
3. `adb reboot bootloader`, `fastboot getvar product` → `pandora`, `unlocked: yes`.
4. Arşivdeki `macos_install_and_format_data.sh` (veri siler) ya da `macos_install_upgrade.sh` (veri korur, xiaomi.eu üstüne). Betik kendi fastboot'unu getirir, kilitleme komutu yok, modemst/fsg/persist'e dokunmaz; `modem.img`'yi günceller. "skip copying avb footer" uyarıları normal; `FAILED`/`error` aranır.
5. İlk açılış 3-5 dk; FRP eski ekran kilidini sorar (bkz. [[2026-10-14-xiaomi-17-pro-kurulum-dersleri]]).
6. Kontrol: `adb shell getprop` ile `ro.build.version.incremental`, `ro.miui.region`, `persist.radio.imei*`, `ro.xiaomi.eu.ota_device`.

## İlgili
- [[2026-10-14-xiaomi-17-pro-xiaomieu-secimi]]
- [[2026-10-14-xiaomi-17-pro-kurulum-dersleri]]
