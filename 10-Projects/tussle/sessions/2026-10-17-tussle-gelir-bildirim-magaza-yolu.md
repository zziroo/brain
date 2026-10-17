---
type: session
project: tussle
date: 2026-10-17
status: active
tags: [tussle, satin-alma, bildirim, moderasyon, twa, play-console, testflight, yayin]
source: oturum 2026-10-17 akşam (mobil-playus) "mağaza yolu, reklam ve satın alma"; Yusuf telefondan uzaktan bağlı
---

# Oturum: gelir modeli, bildirimler, bildir/engelle, Play API, kurulum kartı

**Çıkış noktası:** Play Console'un "Play Oyun Hizmetleri ekleyin" bildirimi; siteden uygulamalara yönlendirme; mağazadan önce reklam/satın alma. Araştırma ajanı sonucu: [[2026-10-17-magaza-gelir-bildirim-arastirmasi]]. Karar: TWA kalır, reklam yok, PGS atlanır, satın alma = hak paketi odaya hediye ([[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]]).

## Yapılanlar (hepsi yayında)
- `2731aeb` — üç özellik tek commit (69 dosya, 1.833 test, migration 18–20): **web push** (web-push + VAPID, `push_devices`/`push_prefs`/`push_room_days`, gün/sohbet/rekor/kapışma olayları, oda zili, Ayarlar kartı, TWA manifesti: `POST_NOTIFICATIONS` + `DelegationService` + `NotificationPermissionRequestActivity`; APNs sürücüsü stub), **hak paketleri** (`tries_1/3/5`, `src/server/iap.ts` Play Developer API + `@apple/app-store-server-library`, `src/client/iap.ts` Digital Goods API / `@capgo/native-purchases`, hediye sayfası, parlayan oda kartı, kurucu notu; `TRIES_MAX` 3, gün 10'da dolar, ilk paket kuralları dondurur), **sohbette bildir/engelle** (`chat_reports`, `user_blocks`, alıntılar da gizli, yönetim panelinde liste). Gizlilik sayfası ve `store/listing.md` güncel ("reklam yok" kaldı, satın alma dürüst anlatıldı). Üç inceleme + iki şüpheci turu; para yolunda 4 orta bulgu düzeltildi (eşzamanlı doğrulama tx, mağaza ön ekli anahtar, paket sonrası kural donması, consume yeniden deneme).
- `c5ba5c3` — bildirim izni teşhis raporu (`[push] push.enable perm=…`), kapanan pencere ipucu.
- `43bf8c2` — Android TWA versionCode 6 / 1.2 AAB; Chrome ajanı iç test taslağına yükledi, Yusuf yayınladı; `27ad813`/`13c3dc1` — `scripts/play-upload.mjs` (Play Developer API; `--promote` ile kitaplıktaki paket kanala) → 6 (1.2) kapalı test (alpha) kanalına API'den kondu.
- `363b548`/`ae39cc5` — web **kurulum kartı**: Android (grup → Play opt-in → indir), iOS (TestFlight'ı kur → https://testflight.apple.com/join/PkEYg1MN), Ayarlar'da "Uygulamayı kur"; bağlantılar `src/shared/install-links.ts`.
- Sunucu: `PUSH_VAPID_*` eklendi; hizmet hesabı `tussle-play@civil-epigram-511911-e7.iam.gserviceaccount.com` (Cloud projesi "tussle" 359876574717; Yusuf anahtarı indirdi ve Play'de 3 izni verdi), anahtar `~/.config/tussle/play-service-account.json` + VPS `/opt/tussle/data/iap/`; konteyner `compose up -d` ile yeniden oluşturuldu → "push on, iap play".

## Dersler
- [[2026-10-17-twa-bildirim-devri-izinsiz-uygulama-chromeyi-de-kilitler]]: TWA kuruluysa Chrome tarayıcı bile bildirim iznini uygulamaya devreder; manifest izinsizse her şey kilitli.
- [[2026-10-17-env-degisikligi-compose-restart-okumaz]]: `.env` değişince `docker compose -f deploy/compose.yml up -d`.
- Chrome ajanı Cloud Console'da anahtar sayfasını ve Play "Kullanıcılar ve izinler"i açamadı (auto-mode sınıflandırıcısı "Secret-Store Writes"); Yusuf elle yaptı. Play Console'da artık "API erişimi" sayfası yok: hizmet hesabı Cloud Console'da, izin Play "Kullanıcılar ve izinler → Yeni kullanıcı davet et" ile.
- Açık test ("Erken erişim") de üretim erişimine bağlı; kapalı testte 12×14 gün şart.

## Doğrulanmayanlar
- Telefonda hiçbir şey denenmedi: Android 13 izin istemi (sürüm 6 ile), bildirimin gerçekten gelmesi, satın alma akışı (ürün yok), iOS TestFlight kart akışı.
- Play "iap play" doğrulayıcı gerçek bir token görmedi; Apple doğrulayıcı yapılandırılmadı (Paid Apps sözleşmesi, kök sertifikalar yok).
- `android-twa` debug APK Yusuf'un telefonuna kurulamamış olabilir (Android geliştirici doğrulama kuralı).
