---
type: session
project: tussle
date: 2026-10-20
status: done
tags: [tussle, oturum, acilis, splash, android, apple, ayarlar, parti-gecesi]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Oturum 20 Eki öğleden sonra: ayarlar girişi, tek hak, logoya uçuş açılışı, Android splash, Android'de Apple girişi (hepsi yayında)

## Yayın
- Sunucu `9730a9a`, OTA 0.20261020.1216 (öncesinde `be4aba1` / OTA 0.20261020.1019). main = `c525277`.
- Sunucu `.env`'e `APPLE_ANDROID=1` eklendi (yedek `.env.bak-apple-android`), konteyner `docker compose -f deploy/compose.yml up -d --force-recreate` ile yeniden oluşturuldu; `/api/auth/providers` → `apple.android: true`.
- Android 1.10 (versionCode 14) Play iç test + kapalı test (alpha), API ile (`npm run play:upload`, `--promote 14 --track alpha`). 1.10 = splash ilk boyamaya kadar tutulur + splash ikonu VectorDrawable + mağaza notları (`store/release-notes.json`).
- iOS: native değişiklik yok, OTA yeterli; gönderilecek bir şey yok.
- Commit'ler: `9cafa1c`, `be4aba1`, `cc3c76e`, `12874be..f9f22bf` (açılış A + tanıtım), `8a1202c` (GPU donması + splash ikonu), `348d725` / `e3771bd` / `603da9f` (Android Apple), `9730a9a`, `c525277`.

## Kararlar
- Ayarlar: ana ekranda diskli dişli, profildeki kalktı → [[2026-10-20-ayarlar-girisi-ana-ekranda-diskli-disli]]
- Parti Gecesi tek "Kaç hak" → [[2026-10-20-parti-gecesi-tek-hak-secimi]]
- Sohbette başkasının avatar/adına dokununca oyuncu kartı (`openPlayer`) açılır.
- İlk oda dokunuşu özetten ön kartla + oda ayarları önbelleği + açılışta oda ön çekmesi → [[2026-10-20-ilk-oda-dokunusu-ana-sayfa-ozetinden-on-kart]]
- Açılış A logoya uçuş, tanıtım alt ölü bölge → [[2026-10-20-acilis-animasyonu-logoya-ucus]]
- Android splash ilk boyamaya kadar, VectorDrawable, web boot eşit boy → [[2026-10-20-android-splash-ilk-boyamaya-kadar-ve-web-boot-esit-boy]]
- Android'de Apple girişi → [[2026-10-20-android-apple-girisi-custom-tab-sunucu-yonlendirme]]

## Dersler
- [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]] · [[2026-10-20-webview-raster-ucus-animasyonunda-gpu-donmasi]] · [[2026-10-20-testte-yanlis-uygulama-acilabilir-debug-surumu-kaldir]]
- `/opt/tussle`'da compose dosyası `deploy/compose.yml` (tekrar yaşandı): [[2026-10-17-env-degisikligi-compose-restart-okumaz]]
- Mağaza derlemesi alınan kopyaya yarım iş sızmasın diye açılış işi worktree'de: [[2026-10-18-ayni-checkoutta-baska-oturum-varken-magaza-derlemesi-yarim-isi-alir]]

## Doğrulanmayanlar
- Android Apple girişi gerçek cihazda hiç denenmedi (Custom Tab 303 intent dönüşü otomatik mi, yedek düğme mi).
- Logoya uçuşun oturumlu ana ekran yolu gerçek cihazda ölçülmedi (yalnız headless 6x CPU).
- 1.10'un Play'den gelen kurulumu telefonda görülmedi.
- Avatar → profil ortak öğe geçişi 44 px avatarla telefonda bakılmadı.
- iPhone'da yeni açılış (ikon düz renkten belirme) ve tanıtım yerleşimi görülmedi.
- Bilinen açık: `android-twa` yedek kabuğunda `data-boot` ayarlanmıyor (Play'i etkilemiyor).
