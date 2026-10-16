---
type: session
project: tussle
date: 2026-10-16
status: active
tags: [tussle, session, magaza, google-play, ikon, yayin]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli" (devamı: mağaza yayını, keystore, Play Console)
---

# Oturum 2026-10-16 (devam): ikon kadrajı, mağaza paketi yayını, keystore ve Play Console kurulumu

- **İkon:** dört varyant karşılaştırıldı, B seçildi ([[2026-10-16-ikon-kadraji-yuzde-90-yatiklik-kalir]]); PWA/iOS/Play/Android 7 ikonları yeniden üretildi.
- **Yayın:** mağaza hazırlığı + ikon `9f32fa0`, `versionCode` 2 + STORE.md `JAVA_HOME` notu `ccea0ac` (main, GitHub, sunucu; yedek `pre-9f32fa0.db`). Canlıda `/privacy`, `/privacy/tr` 200, yeni ikonlar sunucuda. `privacy@ziroo.net` Cloudflare Email Routing ile açılacak (MX zaten Cloudflare), kural henüz yok.
- **Keystore:** Yusuf terminalde `keytool` koştu (`~/keys/tussle-upload.keystore`, alias `tussle-upload`, 2054'e kadar), yedek iCloud Drive `Yedek/`, parola Parolalar uygulamasına; `android/keystore.properties` dolduruldu; `signingReport` doğru; `dist/tussle-release.aab` (4,8 MB) Android Studio JBR ile üretildi.
- **Play Console (Chrome üzerinden, Claude in Chrome):** uygulama "Tussle: Daily Mini Games" (`net.ziroo.tussle`, Oyun, Ücretsiz) oluşturuldu; iç test sürümü 2 (1.0) Yusuf tarafından yayınlandı, liste "Tussle test"; 11 kurulum görevi tamamlandı; mağaza girişi metin + görseller yüklendi (ikon, özellik grafiği, 5 ekran). Ayrıntı ve dağıtım kararı: [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]]. Ders: [[2026-10-16-play-veri-guvenligi-formu-taslak-kaydet-diyalog-yigini]].
- **TestFlight:** yapı 1 ve 2 Approved, ikisi de internalgroup + externalgroup'ta; public link Yusuf açacak.
- **Doğrulanmayan:** iç test linki Yusuf'un telefonunda henüz denenmedi (bir saat işleme süresi); dahili uygulama paylaşımı inceleme öncesi kilitli; veri güvenliği formunun Google tarafında kabulü incelemeyle belli olur.
