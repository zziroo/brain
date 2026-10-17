---
type: project
project: tussle
date: 2026-10-17
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: "oturum 2026-10-17 gece (mobil-playus): Android TWA deneme ve geçiş (`ce1f519`, iç test yayında, kapalı test incelemede); önceki: oturum 2026-10-16 gece (mobil-playus): kare sınırı kalktı (`11127a3`, OTA 0.20261016.1948), Android ekran sabitleme eklentisi (`050c924`, AAB yok), iOS build 3 yüklendi, Android WebView takılması bulgusu + TWA önerisi; önceki: oturum 2026-10-16 (mobil-playus): oda ve parti sınırı 32 yayında (`1d44092`, OTA 0.20261016.1743), 90 Hz kare düzensizliği bulgusu; önceki: kapalı test onaylandı, yedek budama + Mac aynası, Türkçe Play girişi incelemede; önceki: Play kapalı test Google Grubu ile kuruldu ve incelemeye gitti; önceki: animasyonlu tanıtım akışı yayını + privacy@ catch-all kontrolü; önceki: mağaza yayını + Play Console kurulumu; admin paneli yayını; önceki: telefon geri bildirimi turu (izleme sesi, antrenman, renk); önceki: hata toplama + geri bildirim, izleme katmanları önerisi; Yayın 3 izleme, önceki: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi"
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
_Son güncelleme: 2026-10-17; canlıdan doğrula. Eski ayrıntılı hâl: [[10-Projects/tussle/sessions/2026-10-17-tussle-guncel-durum-arsivi|arşiv]]._
- **Yayında:** https://tussle.ziroo.net, son yayın `ce1f519` (2026-10-17 gece, yedek `pre-ce1f519.db`), 1.741 test, DB sürümü 16. Konteyner `tussle` (127.0.0.1:8087, `/opt/tussle`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`), Caddy `hosts/tussle.caddy`. Yayın `bash deploy/release.sh` (yedek + deploy). Makine: [[vps-makinesi]].
- **Android TWA'ya geçti (2026-10-17):** Play `net.ziroo.tussle` versionCode 5 / 1.1 = `android-twa/` (Chrome motoru, akıcı). İç testte yayında, kapalı test (Alpha) Google incelemesinde. Misafir hesaplar taşınmaz (kabul). `android/` geri dönüş için duruyor. [[2026-10-17-android-twa-gecis-plani]], [[2026-10-17-tussle-twa-deneme]].
- **Kapalı test:** Google Grubu "Tussle Test" ile; katılım mesajı gitti, 12 testçi toplanıyor ([[2026-10-16-kapali-test-google-grubuyla-acildi-mail-toplanmaz]]).
- **iOS:** build 3 App Store Connect'te, build 2 Beta Review'dan geçti; herkese açık TestFlight bağlantısı henüz paylaşılmadı. Yusuf'un iOS cihazı yok. OTA artık yalnız iOS için, sunucudaki paket 0.20261016.1948 ([[2026-10-15-ota-web-paketi-self-hosted-capgo]]).
- **Oyun:** 46 oyun, hepsi günlük havuzda; varyant ve oda parametresi yok. Oda ve parti sınırı 32. Kare sınırı yok, her vsync'te çizim ([[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]).
- **Telefon turu tamam (2026-10-17, Yusuf):** 2026-10-16 turu ve tanıtım akışı denendi, çoğunda sorun yok; gariplik hissedilirse ayrı oturum açılacak. Titreşim sistem "Dokunsal geri bildirim" açıkken çalışıyor.
- **İzleme ve yedek:** istemci hata toplama + uygulama içi geri bildirim (`scripts/feedback-cli.mjs`); gece yedeği 04:20, `pre-*.db` 30 günde budanır, Mac aynası 14 gün tutar ([[2026-10-15-sunucuda-gece-yedegi-systemd]], [[2026-10-16-yedek-tutma-sureleri-gizlilik-sozune-baglandi]]). Makine izleme ziroo-edge'de ([[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge|ops]]).
- **Mağaza:** `/privacy` (EN/TR) yayında, Play girişi EN + TR. Google/Apple girişi kodda hazır, env yok (`docs/AUTH-SETUP.md`); native giriş Play imzasından sonra.

## Sıradaki işler
1. **Kapalı test (TWA):** sürüm onaylanınca arkadaşlara gittiğini kontrol et; 12 kişi katılınca 14 gün say, sonra üretim başvurusu. Chrome'un ilk açılış bildirimi Yusuf'un hoşuna gitmedi, başka çözüm sonra (seçenekler plan notunda). Gezinme çubuğu beyaz.
2. **iOS:** build 3'ü dış gruba ekle, herkese açık bağlantıyı aç (Yusuf).
3. **Profil yapıldı, yayında değil (2026-10-17, `d33b787`):** profil ekranı + fotoğraf + rozetler + oyuncu kartında profil özeti, Antrenman kalktı. Kararlar: madalya altın/gümüş/bronz, başkasının rekorunda "senin en iyin", fotoğrafa bildir + admin, tek küresel profil, fotoğraf SQLite BLOB (`user_photos`, DB sürümü 17), ortak olmayan odanın adı başkasına gizli, oda silinince geçmişi profilden düşer. Mockup `src/client/mockups/profil.html`. Sırada: yayın (Yusuf onayı), telefonda deneme (fotoğraf seçme/kırpma, geri tuşu TWA'da), mağaza metinleri ve ekranlar Antrenman'sız yeniden (`store/listing.md`, `store/README.md`, `docs/STORE.md`).
4. **Mağaza sonrası:** Play tablet ekranları (istenirse), kısa açıklama uyarısı kalktı mı. AI öğe beyanı varsayılan "etiketleme"de kalıyor (oyun görselleri kodla çizili, ekranlar gerçek oyun görüntüsü; yalnız metinler Claude yazımı). Profil bitince ekranlar `store/make-graphics.mjs` ile yeniden, native Google+Apple giriş, sohbette bildirme/engelleme (Apple 1.2).
5. **Diskort gece gözcüsüne Tussle bölümü** (jsonl + açık geri bildirim).
6. **Tanıtım:** sezon/kapışma slaytındaki düz yüzler yerine kimlikli figürler.
7. **Sonra:** arkadaş geri bildirimiyle yayın partileri, sonsuz oyunların rampaları; dolaylı etkileşim modu ve arena prototipi (öneri sumo); tema toptan düzenleme; izlemenin ikinci tur adayları. Küçük açıklar ve kit işleri arşivde.

## Önemli kararlar
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
