---
type: project
project: tussle
date: 2026-10-18
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: "oturum 2026-10-18 akşam (mobil-playus): mini motor Faz 2 yayında (`e61359e`, OTA 0.20261018.1346, Play 1.4); önceki: oturum 2026-10-18 akşam (mobil-playus): Android Capacitor dönüşü Faz 3 (`8f25f61`…`2b99a2e`, 1.3 Play); önceki: oturum 2026-10-18 öğleden sonra (mobil-playus): cila turu yayında (`6e62748`, OTA 0.20261018.1044); önceki: oturum 2026-10-18 öğlen (mobil-playus): TestFlight scripti, Apple ürünleri hazır, Play IARC/lisans testi/hesap grubu (`ad1677f`); önceki: oturum 2026-10-17/18 gece (mobil-playus): YOSEF geri bildirimi, Denge v4, hız sınırları, iptal kartı, Google token akışı (`fe8c460`…`ded6d74`); önceki: oturum 2026-10-17 akşam (mobil-playus): gelir modeli + bildirimler + bildir/engelle + Play API + kurulum kartı (`2731aeb`…`ae39cc5`); önceki: oturum 2026-10-17 (mobil-playus): kapışma ızgarası, bağlı hesap, hak rozeti (`2db9eed`); önceki: oturum 2026-10-17 (mobil-playus): iOS native Google+Apple girişi, build 4 onaylandı (`c0dd863`); önceki: oturum 2026-10-17 (mobil-playus): Google ve Apple web girişi açıldı (yalnız sunucu .env); önceki: oturum 2026-10-17 (mobil-playus): profil ekranı + fotoğraf + rozetler yayında (`d33b787`, `a98a161`); önceki: oturum 2026-10-17 gece (mobil-playus): Android TWA deneme ve geçiş (`ce1f519`, iç test yayında, kapalı test incelemede); önceki: oturum 2026-10-16 gece (mobil-playus): kare sınırı kalktı (`11127a3`, OTA 0.20261016.1948), Android ekran sabitleme eklentisi (`050c924`, AAB yok), iOS build 3 yüklendi, Android WebView takılması bulgusu + TWA önerisi; önceki: oturum 2026-10-16 (mobil-playus): oda ve parti sınırı 32 yayında (`1d44092`, OTA 0.20261016.1743), 90 Hz kare düzensizliği bulgusu; önceki: kapalı test onaylandı, yedek budama + Mac aynası, Türkçe Play girişi incelemede; önceki: Play kapalı test Google Grubu ile kuruldu ve incelemeye gitti; önceki: animasyonlu tanıtım akışı yayını + privacy@ catch-all kontrolü; önceki: mağaza yayını + Play Console kurulumu; admin paneli yayını; önceki: telefon geri bildirimi turu (izleme sesi, antrenman, renk); önceki: hata toplama + geri bildirim, izleme katmanları önerisi; Yayın 3 izleme, önceki: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi"
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main; GitHub özel `zziroo/tussle`). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`, `docs/VISUAL.md` (görsel yönerge; arayüz 2026-10-15'ten beri orta yol: kartlarda ince kontur, kontroller düz; ana renk 2026-10-16'dan beri ikon mavisi, pembe ikinci vurgu; kapaklar ve sahneler sade).

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (46 kayıtlı, hepsi günlük havuzda; Claw 2026-10-16'da, Brick Break 2026-10-15'te, Bop, Pop or Stop, Catch 2026-10-15'te silindi): M0 dörtlüsü + Parti A–J + Dört Ok. Plinko, Zar Kulesi, Salyangoz, Jeton İtici 2026-10-10'da; Gizli Geçit, Kutu Seç, Yüksek/Alçak, Örüntü ve Terazi, İp Atla, Fırlat 2026-10-13'te silindi; `src/shared/pool.ts` `OFF_POOL` mekanizması boş küme olarak duruyor. **Varyant yok** (2026-10-13'ten beri her oyun tek ve sabit; altyapı tek girişle duruyor), **oda parametresi yok**, denge kodda. Meta: `gesture` (hayalet el), `score {unit, decimals, better}` (doğal ölçü). Üretim kiti: `src/games/shell`, `npm run new-game`, `docs/GAME-CONTRACT.md`, yol haritası `docs/GAMES-ROADMAP.md`.
- i18n: TR/EN (`src/client/i18n`, `docs/I18N.md`); sunucu hata kodları; akış satırları yapısal.

## Güncel durum
_Son güncelleme: 2026-10-18 akşam; canlıdan doğrula. Eski ayrıntılı hâl: [[10-Projects/tussle/sessions/2026-10-17-tussle-guncel-durum-arsivi|arşiv]]._
- **Yayında:** https://tussle.ziroo.net, sunucu `b4ee6d7` (18 Eki ~17:15, yalnız sunucu: FCM kaydı eski TWA web push'u kapatır [[2026-10-18-twa-den-native-e-geciste-chrome-web-push-kaydi-kalir]]), main = origin/main (GitHub'a gönderildi 18 Eki), OTA 0.20261018.1346 (mini motor Faz 2); APNs + FCM açık; ~2.100 test, DB sürümü 20; yedekler `pre-<rev>.db`. Konteyner `tussle` (127.0.0.1:8087, `/opt/tussle`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`), Caddy `hosts/tussle.caddy`. Yayın `bash deploy/release.sh`; `.env` değişince `docker compose -f deploy/compose.yml up -d --force-recreate` ([[2026-10-17-env-degisikligi-compose-restart-okumaz]]). Makine: [[vps-makinesi]].
- **Gelir ve bildirim (2026-10-17 akşam):** web push canlı (sunucu "push on"), hak paketleri odaya hediye (1/3/5, gün 10'da dolar, kurucu en çok 3; sunucu "iap play"; Play ürünleri aktif, Apple ürünleri Ready to Submit [[2026-10-18-testflight-dis-test-ve-apple-urun-metadatasi-api-ile]]), sohbette bildir/engelle. Reklam yok, Play Oyun Hizmetleri atlandı; Android bildirimi FCM (18 Eki akşam). [[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]], [[2026-10-17-magaza-gelir-bildirim-arastirmasi]], oturum [[2026-10-17-tussle-gelir-bildirim-magaza-yolu]].
- **Android:** Play `net.ziroo.tussle` Capacitor uygulaması (`android/`), **versionCode 8 / 1.4** iç + kapalı testte; oyunlar yerel mini motorda, Play Billing, FCM (Firebase "tussle"), Google girişi native; `android-twa/` geri dönüş için duruyor. Yükleme `npm run play:upload` (+ `--promote`). [[2026-10-18-tussle-android-capacitor-donusu-faz-3]], [[2026-10-18-tussle-mini-motor-faz-2]].
- **Kapalı test:** Google Grubu "Tussle Test" (herkes katılabilir), 12 testçi toplanıyor (18 Eki: 3 kayıtlı); web kapı sayfası Android ziyaretçiyi gruba + Play opt-in'e yönlendiriyor ([[2026-10-16-kapali-test-google-grubuyla-acildi-mail-toplanmaz]]). Açık test de üretim erişimini bekler.
- **iOS:** build 5 (1.1: StoreKit 2 + APNs + 120 Hz; `b54bb82`) dış gruba eklendi, beta incelemesinde (yeni sürümün ilk yapısı: [[2026-10-18-testflight-yeni-surumun-ilk-yapisi-beta-incelemesine-gider]]); build 4 iç + dış grupta. Herkese açık bağlantı https://testflight.apple.com/join/PkEYg1MN. Dış test devri `npm run ios:testflight`. Paid Apps aktif, APNs anahtarı sunucuda; iOS cihazda henüz denenmedi (Yusuf'un iOS cihazı yok). OTA yalnız iOS, `release.sh` OTA'yı da yayınlar.
- **Açılış ve giriş (2026-10-17 gece):** mağaza perdesi → yükleme ikonu (`load` + 350 ms sonra solar) → ilk açılışta dört tam boy tanıtım slaytı (yeniden tasarlandı) → giriş ekranı: Google/Apple önde, misafir küçük; sonraki açılışlar doğrudan giriş/ana sayfa. Oda kurma ad → saat → davet (QR + kod); `POST rooms` saat alır ([[2026-10-17-acilis-tek-akis-ikon-yukleme-giris-formu-oda-sihirbazi-qr]]).
- **Uygulama-içi (2026-10-17 gece):** tarayıcı ziyaretçisi kapı sayfası görür (kurulum adımları, davet kodu); TWA/native/standalone/localhost/`?web=1` uygulamayı açar. Oda üst çubuğu: çan yok, dişli herkese (Oda sayfası), kaydırınca tek sezon satırı; ana kart skorsuz; birimler yalnız oyun bağlamında ([[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]]).
- **Oyun:** 46 oyun, hepsi günlük havuzda; oda ve parti sınırı 32; kare sınırı yok ([[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]).
- **Profil, giriş, izleme:** profil ekranı + fotoğraf + rozetler ([[2026-10-17-tussle-profil]]); Google/Apple girişi web + TWA + iOS native ([[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]], [[2026-10-17-ios-native-giris-capgo-social-login]]); istemci hata toplama + geri bildirim (`scripts/feedback-cli.mjs`), gece yedeği 04:20 ([[2026-10-15-sunucuda-gece-yedegi-systemd]]), makine izleme ziroo-edge'de.
- **Mağaza:** `/privacy` (EN/TR) yayında, satın alma/bildirim/moderasyon metinleri güncel; Play girişi EN + TR.

## Sıradaki işler
0. **Android mini motor yayında (18 Eki):** oyunlar QuickJS + Android Canvas motorunda, arayüz Capacitor; Play 1.4. Açık: Play 1.4 iç + kapalı testte `completed` (18 Eki API'den), Xiaomi'ye önbellekten 1.3 geldi; 1.4'te satın alma elle denenmedi (FCM 1.3'te iki telefonda çalıştı); uygulama içi lisans ekranı (18 Eki akşam ajan yazıyor); Faz 4 iOS mini motoru (~1 hafta; 4a JSC replayCheck + CoreGraphics ressamı ayrı dalda başladı 18 Eki akşam, gerekenler [[2026-10-18-mini-motor-faz-devir-notu]]); Basket v3 dalı `basket-pull-range` inceleme + his testi bekliyor [[2026-10-18-basket-v3-cekme-gucu-artti]]. Karar [[2026-10-18-android-mini-oyun-motoru]], oturum [[2026-10-18-tussle-android-motor-arayisi-koordinasyon]].
1. **Mağaza bekleyenleri (18 Eki öğlen, oturum [[2026-10-18-tussle-kalan-isler-testflight-urunler-play-konsol]]):** Play %15: hesap grubu kuruldu (yalnız Ziroo), şart kabul düğmesi Ödeme profilinde çıkınca Yusuf basar (tıklama sınıflandırıcıya takılır). Play IARC yeni anketi incelemede (Brezilya 14+). Apple build 5 beta incelemesinde. Apple sandbox testçi yok (iPhone'lu testçi için gerekli).
2. **Kapalı test:** 3/12 testçi; 12 olunca 14 gün say, üretim başvurusu, sonra açık test/üretim; `install-links.ts` `stage: 'store'`.
3. **iOS cihazda ilk deneme:** iPhone'lu testçi ile APNs bildirimi ve sandbox satın alma (kod ve sunucu hazır, kimse denemedi). Her iOS yüklemesinden sonra `npm run ios:testflight` (önce `store/testflight-notes.txt`).
4. **Cila turu kalanı** ([[2026-10-18-tussle-cila-turu-tema-ekranlar]]): mağaza ekran görüntülerini konsollara yükleme (Yusuf, `store/README.md`); telefonda ince konturlar ve parti lobisi/host paneli bakışı. (Gece TWA gezinme çubuğu sorunu TWA bırakıldığı için düştü.)
5. **Mağaza sonrası:** Play tablet ekranları, kısa açıklama uyarısı.
6. **Diskort gece gözcüsüne Tussle bölümü**; tanıtımda kimlikli figürler; sonra: yayın partileri, sonsuz oyun rampaları, dolaylı etkileşim/arena, tema toptan düzenleme. Tembel parçalar rafta ([[2026-10-17-oyunlar-tembel-parca-modul-sistemi-rafta]]). Küçük açıklar ve kit işleri arşivde.

## Önemli kararlar
- [[2026-10-18-android-titresim-sistem-ayarini-izler]]: Android titreşimi performHapticFeedback, sistem ayarını izler (MEDIA kararının yerine).
- [[2026-10-18-android-geri-tusu-ekrandaki-geri-dugmesiyle-ayni]]: geri tuşu = ekrandaki geri düğmesi, ana sayfada arka plana.
- [[2026-10-18-cila-turu-kontrol-konturu-ters-bildirim-gece-cubugu-bekler]]: kontroller iki temada konturlu (`--control-line`), bildirim ters renk, gündüz oyun zemini, theme-color yığını; gece Android çubuğu Chrome düzeltene kadar bekler
- [[2026-10-18-android-twa-kalir-web-izleri-kodda-kapatilir]]: TWA kalır, web izleri kodda kapatılır; WebView'e dönüş yine reddedildi.
- [[2026-10-18-hak-paketi-fiyatlari-ve-magaza-urunleri]]: 0,49 / 0,99 / 1,49 $; iki mağazada scriptle ürün.
- [[2026-10-18-google-girisi-kendi-dugme-token-akisi]]: web/TWA Google girişi kendi düğme + GIS token akışı, tek dokunuş, sır gerekmez (bindirme ve kod akışı reddedildi)
- [[2026-10-18-iptal-karti-sohbetten-kalkar-kapisma-sinirlari-gevsedi]]: iptal kartı sohbetten animasyonla kalkar; start/attempt 30/dk, matchCreate 30/10 dk, 429 günlüğü · [[2026-10-18-denge-v4-rampa-tavan-180]]: Denge v4 ikinci rampa, tavan 180 sn
- [[2026-10-17-acilis-tek-akis-ikon-yukleme-giris-formu-oda-sihirbazi-qr]]: açılış tek akış (ikon yükleme → form, slaytlar silindi), Google/Apple önde, oda sihirbazı, QR davet
- [[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]]: Tussle uygulama-içi (tarayıcıya kapı sayfası), oda üstü tek sezon satırı, Oda sayfası herkese, birimler yalnız oyun bağlamında
- [[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]]: hak paketleri odaya hediye, gün 10'da dolar, reklam yok, PGS atlandı (araştırma: [[2026-10-17-magaza-gelir-bildirim-arastirmasi]], oturum: [[2026-10-17-tussle-gelir-bildirim-magaza-yolu]])
- [[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]] (ders: [[2026-10-17-konsol-kurulumunda-onay-tiklamalari-kullanicida]], oturum: [[2026-10-17-tussle-google-apple-girisi]]) · [[2026-10-17-ios-native-giris-capgo-social-login]] (ders: [[2026-10-17-ios-native-giris-simulator-tuzaklari]], oturum: [[2026-10-17-tussle-ios-native-giris]])
- [[2026-10-17-profil-ekrani-kapsami]] · [[2026-10-17-profil-fotografi-sqlite-blob-bildir-admin]] · [[2026-10-17-ai-oge-beyani-etiketlenmez]]
- [[2026-10-17-android-twa-onerisi]]: Android uygulaması WebView yerine Chrome motorunda (TWA), geçiş yapıldı · [[2026-10-17-oyun-titresimi-media-arayuz-touch]]
- [[2026-10-16-oda-ve-parti-siniri-32-ayri-parti-sabiti]]: oda ve parti sınırı 32, ayrı `PARTY_MAX_PLAYERS`
- [[2026-10-16-animasyonlu-tanitim-akisi-herkes-bir-kez-gorur]] · [[2026-10-16-ziroo-net-posta-catch-all-ayri-kural-yok]]
- [[2026-10-16-ikon-kadraji-yuzde-90-yatiklik-kalir]] · [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]]
- [[2026-10-16-gizlilik-sayfasi-sunucudan-statik-en-tr]] · [[2026-10-16-magaza-ekran-goruntuleri-puppeteer-uretilebilir-gecici]] · [[2026-10-16-native-google-apple-giris-play-imzasindan-sonra]]
- [[2026-10-16-admin-paneli-tek-sayfa-admin-token-kapaliysa-404]] ([[2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]] uygulama katmanı yapıldı)
- [[2026-10-16-telefon-turu-izleme-sesi-rozet-claw-cups-antrenman]] · [[2026-10-16-ana-renk-ikon-mavisi-pembe-vurgu-takasi]] ([[2026-10-15-tema-orta-yol-kart-konturu-yumusak-pembe]] renk kısmını değiştirdi)
- [[2026-10-15-istemci-hata-toplama-jsonl-geri-bildirim-sqlite]] · [[2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]] (öneri)
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]]
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
- [[2026-10-08-gorsel-dil-neon-oyuncak-koyu-varsayilan]]
- [[2026-10-08-kule-salinim-parametresi-ve-migrasyon]]
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]] (neon oyuncak kararını geçersiz kıldı)
- [[2026-10-08-font-nunito-tek-aile]]
- [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]]
- [[2026-10-08-oyun-bitis-kuyrugu-runner]]
- [[2026-10-09-oda-parametreleri-kaldirildi-varyantlar-kalir]] (superseded: [[2026-10-13-varyantlar-kaldirildi-oyunlar-tek-ve-sabit]])
- [[2026-10-09-oda-ekrani-sohbet-merkezli]]
- [[2026-10-09-dil-altyapisi-tr-en]]
- [[2026-10-09-havuz-haric-tutma-listesi]]
- [[2026-10-09-oyun-uretim-kiti-ve-partiler]]
- [[2026-10-09-deneme-basina-tohum]] (eskidi)
- [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]
- [[2026-10-09-gizli-cekilisler-yalniz-tohumdan]]
- [[2026-10-09-sans-hakki-yazi-tura]]
- [[2026-10-09-puanlama-sabit-gunun-kurallari-donar]]
- [[2026-10-09-skor-dogal-olcu]]
- [[2026-10-09-baslangic-karti-basla-dugmesi-ve-sayac]]
- [[2026-10-09-sure-siniri-yerine-sonsuz-hizlanan]]
- [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]
- [[2026-10-10-canli-kapisma-lobi-karti]]
- [[2026-10-11-oyun-ici-ust-duzen-ve-gunluk-serit]]
- [[2026-10-11-oda-ekrani-sezon-bandi-ve-canli-ilk-3]] ([[2026-10-09-oda-ekrani-sohbet-merkezli]] yerleşimini değiştirdi)
- [[2026-10-11-deneme-turu-gunde-bir-baslangic-kartinda]]
- [[2026-10-11-canli-kapisma-tek-seferlik-kosu]]
- [[2026-10-11-parti-gecesi]]
- [[2026-10-09-ajanlar-tarayicida-oynar]]
- [[2026-10-12-sure-baskisi-yerine-tur-penceresi]]
- [[2026-10-12-can-sistemi-kaldirildi-ilk-hata-bitirir]]
- [[2026-10-12-oyun-sahnesi-sade]]
- [[2026-10-13-duz-sans-oyunlari-ve-oruntu-kaldirildi]]
- [[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]]
- [[2026-10-13-parti-i-dort-hypercasual-oyun]]
- [[2026-10-13-canli-alt-sayfa-sekmeler-baslik-oldu]]
- [[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]] ([[2026-10-12-oyun-sahnesi-sade]] kapaklara genişledi)
- [[2026-10-13-terazi-ip-atla-firlat-yerine-parti-j]]
- [[2026-10-13-varyantlar-kaldirildi-oyunlar-tek-ve-sabit]]
- [[2026-10-13-once-magaza-sonra-denge]]
- [[2026-10-13-dort-ok-oyunu]]
- [[2026-10-13-paket-kimligi-net-ziroo-tussle-ve-ios-kabuk]]
- [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]]
- [[2026-10-13-android-kabuk-ve-durum-cubugu-seridi]]
- [[2026-10-15-ota-web-paketi-self-hosted-capgo]]
- [[2026-10-13-oyun-adlari-her-dilde-ortak]]
- [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]]
- [[2026-10-15-tema-orta-yol-kart-konturu-yumusak-pembe]] ([[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]] arayüz dilini değiştirdi)
- [[2026-10-15-parti-oyun-sayisi-ve-oyun-basina-hak]] ([[2026-10-11-parti-gecesi]] kısmen değişti)
- [[2026-10-15-oda-sahibi-sonraki-gunu-baslatir-gun-kaymasi]]
- [[2026-10-15-sohbet-tek-tepki-ve-emoji-dugmesi-kalkti]] ([[2026-10-09-oda-ekrani-sohbet-merkezli]] tepki kısmı değişti)
- [[2026-10-15-bop-pop-or-stop-catch-silindi]]
- [[2026-10-15-denge-turu-yusuf-telefon-geri-bildirimi]] (doğrulanmadı)

## Dersler
- [[2026-10-18-canvas-textbaseline-os2-typo-metrikleri]]: ressamda baseline OS/2 typo metrikleriyle (Chrome gibi)
- [[2026-10-18-paylasilan-telefonda-am-start-baska-oturumun-testini-boler]]: paylaşılan telefonda öne getirme yalnız cihaz serbestken
- [[2026-10-18-capacitor-android-donusu-tuzaklari]]: push eklentisi `then` tuzağı (iOS'u da vurmuştu), Firebase Android OAuth istemcisi elle, worktree origin/main'den kesilir.
- [[2026-10-18-chrome-klavye-yalniz-gorsel-gorunumu-daraltir-scrollintoview-calismaz]]: klavyede yerleşim küçülmez, önce taşma yarat.
- [[2026-10-18-magaza-formlari-ve-urun-olusturma-siniflandiriciya-takilir-script-yusuf-kosturur]]: mağaza formu/ürün işi scriptle Yusuf'a; Play ve Apple tuzakları.
- [[2026-10-18-gis-dugmesi-kisisellesir-kod-akisi-ara-ekran-sir-sonradan-gorunmez]]
- [[2026-10-17-uygulama-kabugu-acilis-perdesi-load-olayina-kadar-sayfayi-orter]]
- [[2026-10-17-bildirimden-acilan-pencere-referrer-ve-sessionstorage-tasimaz]]
- [[2026-10-17-twa-bildirim-devri-izinsiz-uygulama-chromeyi-de-kilitler]] · [[2026-10-17-env-degisikligi-compose-restart-okumaz]]
- [[2026-10-17-pencere-acilisinda-inert-tum-sayfayi-yeniden-bicimlendirir]]
- [[2026-10-17-ios-native-giris-simulator-tuzaklari]]
- [[2026-10-16-android-webview-parmak-kalkinca-takilma]] · [[2026-10-17-twa-elle-kurulum-tuzaklari]] · [[2026-10-17-titresim-sistem-dokunsal-geri-bildirim-kapaliysa-yok]]
- [[2026-10-16-90-hz-ekranda-60-fps-siniri-duzensiz-kare]]
- [[2026-10-16-ilk-acilisi-degistiren-web-icin-yeni-magaza-yapisi]] · [[2026-10-16-play-kisa-aciklamada-no-ads-tanitim-uyarisi]]
- [[2026-10-16-tanitim-animasyonu-gizli-bolmede-donar-headless-kayit]]
- [[2026-10-16-play-veri-guvenligi-formu-taslak-kaydet-diyalog-yigini]]
- [[2026-10-16-gizlilik-metni-brieften-degil-koddan]] · [[2026-10-16-play-ekran-orani-ve-32-bit-ikon]]
- [[2026-10-16-sw-gezinti-onbellegi-yeni-sunucu-sayfalarini-kabuk-sanir]] · [[2026-10-16-ajan-pkill-desenle-baska-oturumun-dev-sunucusunu-oldurur]]
- [[2026-10-16-renk-onizleme-css-degiskeni-ve-ajan-anahtar-sizintisi]]
- [[2026-10-15-kimliksiz-girdiden-terminale-giden-metni-suz]]
- [[2026-10-15-paralel-dilimler-icin-once-protokolu-koordinator-yazar]]
- [[2026-10-08-tussle-m0-dersleri]]
- [[2026-10-08-cila-turu-dersleri]]
- [[2026-10-08-ui-yenileme-dersleri]]
- [[2026-10-09-parti-a-dersleri]]
- [[2026-10-09-parti-b-c-dersleri]]
- [[2026-10-09-parti-d-e-f-dersleri]]
- [[2026-10-09-kapak-turu-dersleri]]
- [[2026-10-10-m1-dersleri]]
- [[2026-10-11-ust-duzen-dersleri]]
- [[2026-10-11-oda-yeniden-tasarim-dersleri]]
- [[2026-10-11-parti-gecesi-dersleri]]
- [[2026-10-12-denge-ve-tema-turu-dersleri]]
- [[2026-10-13-parti-i-ve-sure-modeli-dersleri]]
- [[2026-10-13-kapak-varyant-dort-ok-dersleri]]
- [[2026-10-13-capacitor-ios-dersleri]]
- [[2026-10-15-ajanlar-ortak-calisma-kopyasinda-git-stash-yasak]]
- [[2026-10-15-ayrik-klasor-paralellik-ve-paylasilan-dosyalar]]
- [[2026-10-15-vite-yeniden-yuklemeleri-tarayici-testini-boluyor]]
- [[2026-10-15-izin-siniflandirici-ref-yazma-ve-deploy]]
- [[2026-10-15-tema-degisikligini-once-goster]]

## Oturumlar
- [[2026-10-18-tussle-android-capacitor-donusu-faz-3]]: Android Capacitor'a döndü, Firebase/FCM, geri tuşu, titreşim; 1.3 iç + kapalı test.
- [[2026-10-17-tussle-oda-ustu-sadelesme-ve-web-kapisi]]: oda üstü/ana kart sadeleşti, web kapısı (`7c69e83`, `95033ba`), inceleme bulgusu standalone kuralı
- [[2026-10-17-tussle-yosef-geri-bildirimi-denge-429-iptal-karti-google-dugmesi]]: YOSEF geri bildirimi, Denge v4, hız sınırları, iptal kartı sohbetten kalkar, Google düğmesi düz (yayınlanmadı)
- [[2026-10-17-tussle-gelir-bildirim-magaza-yolu]]: gelir modeli, bildirimler, bildir/engelle, Play API, kurulum kartı
- [[2026-10-17-tussle-kapisma-izgarasi-bagli-hesap-hak-rozeti]]: kapışma ızgarası 4 sütun, bağlı hesap rozetleri, Çıkış/Sil düğmeleri, inert ertelendi, hak rozeti + deneme düğmesi (`a35b9db`, `c22c668`, `2db9eed`)
- [[2026-10-17-tussle-ios-native-giris]]: iOS native Google+Apple girişi (`c0dd863`), build 4 yüklendi ve Beta Review'dan geçti
- [[10-Projects/tussle/sessions/2026-10-17-tussle-guncel-durum-arsivi|2026-10-17 güncel durum arşivi]]: overview'un kısaltma öncesi "Güncel durum" ve "Sıradaki işler" bölümleri, olduğu gibi
- [[2026-10-17-tussle-twa-deneme]]: TWA deneme (Slice akıcı), geçiş (`23ba339`, `ce1f519`), Play iç test yayında, kapalı test incelemede
- [[2026-10-16-tussle-oda-parti-siniri-32]]: oda ve parti sınırı 32 (`1d44092`, OTA 0.20261016.1743), 90 Hz kare düzensizliği bulgusu
- [[2026-10-16-tussle-kapali-test-onayi-yedek-budama-turkce-giris]]: kapalı test onaylandı (0 testçi), yedek budama + Mac aynası (`bca6281`, Diskort `3ddcc48`), Türkçe Play girişi ve kısa açıklama incelemede (`dbfbfc4`)
- [[2026-10-16-tussle-play-kapali-test-google-grubu]]: Google Grubu + kapalı test kanalı kuruldu, 16 değişiklik incelemeye gitti; kod değişikliği yok
- [[2026-10-16-tussle-animasyonlu-tanitim-akisi]]: animasyonlu tanıtım akışı iki turda yazıldı, incelendi ve yayınlandı (`114db8f`, OTA 0.20261016.1119); privacy@ catch-all ile zaten teslim
- [[2026-10-16-tussle-magaza-yayini-ve-play-console]]: ikon kadrajı, mağaza paketi yayını (`9f32fa0`), keystore + AAB, Play Console kurulumu ve iç test
- [[2026-10-16-tussle-magaza-hazirligi]]: mağaza hazırlığı (gizlilik sayfası, store/ görseller + metinler, AAB imza yolu, Yusuf listesi); commit yok
- [[2026-10-16-tussle-admin-paneli]]: admin paneli yazıldı ve yayınlandı (`7d01386`); mağaza hazırlığı yan oturumu başladı
- [[2026-10-16-tussle-telefon-geri-bildirimi-turu]]: telefon turu yayını (izleme sesi + rozet, Claw, Cups v5, Antrenman, Slice, ana renk mavi)
- [[2026-10-15-tussle-hata-toplama-geri-bildirim]]: hata toplama + geri bildirim yayını, admin/ops planı
- [[2026-10-15-tussle-yayin-3-izleme]]: Yayın 3 izleme, sunucu + OTA yayını
- [[2026-10-15-tussle-gece-yedegi]]: sunucuda systemd gece yedeği (yan oturum)
- [[2026-10-08-tussle-tasarim-ve-m0-yayin]]
- [[2026-10-08-tussle-cila-turu-ve-tema]]
- [[2026-10-08-tussle-ui-yenileme-seker-dukkani]]
- [[2026-10-09-tussle-sohbet-merkezli-oda-kit-ve-parti-a]]
- [[2026-10-09-tussle-parti-b-c-deneme-hakki-ve-skor]]
- [[2026-10-09-tussle-parti-d-e-f-ve-canlandirma]]
- [[2026-10-09-tussle-kapaklar-ve-antrenman-duzeltmesi]]
- [[2026-10-09-tussle-parti-g-h]]
- [[2026-10-10-tussle-canli-kapisma-m1]]
- [[2026-10-11-tussle-gunluk-serit-ve-ust-duzen]]
- [[2026-10-11-tussle-oda-ekrani-yeniden-tasarim]]
- [[2026-10-11-tussle-m1-tek-seferlik-ve-parti-gecesi]]
- [[2026-10-12-tussle-denge-ve-sade-tema]]
- [[2026-10-13-tussle-eleme-sure-modeli-parti-i]]
- [[2026-10-13-tussle-kapaklar-parti-j-varyantlar-dort-ok]]
- [[2026-10-13-tussle-seker-kalintilari-ve-capacitor-ios]]
- [[2026-10-13-tussle-android-kabugu-testflight-play]]
- [[2026-10-15-tussle-ota-canli-guncelleme]]
- [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]]

## İlgili
Aynı VPS ([[vps-makinesi]]) ve Caddy ([[10-Projects/ziroo-edge/_overview|ziroo-edge]]): [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
