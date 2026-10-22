---
type: project
project: tussle
date: 2026-10-22
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar, açılış, splash, Android Apple girişi); önceki oturumlar sessions/ altında"
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
_Son güncelleme: 2026-10-22 ([[2026-10-22-tussle-telefon-tasmalari-ve-tasma-denetimi]], [[2026-10-22-tussle-kapismaya-davet-ve-huni]], [[2026-10-22-tussle-gecis-cubugu-sezon-oyuncu-karti-kilic-dili]], [[2026-10-22-tussle-canli-sayfa-jeton-sans-hakki]], [[2026-10-22-hak-jeton-dili-sans-hakki-kalkti]]); önceki [[2026-10-21-tussle-roller-kapisma-1v1-arena-sekmesi]]; önceki [[2026-10-21-arena-parti-2-gecikmesiz-oyunlar-ve-gorsel-sema]]; önceki [[2026-10-21-arena-ikinci-parti-crown-trails-paint-type-race]]; önceki [[2026-10-21-tussle-arena-xiaomi-kasma-telemetri]]; canlıdan doğrula. Önceki: [[2026-10-21-tussle-gorsel-tur-parti-3b-4]], [[2026-10-21-tussle-gorsel-tur-parti-1]], [[2026-10-20-tussle-geri-bildirim-turu-antrenman-analizi]], [[2026-10-20-tussle-ilk-acilis-takilmasi-gecisler]], [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]], [[2026-10-20-tussle-rozetler-kontur-kapanis-iskelet]], [[2026-10-19-tussle-karttan-karta-gecis-bitmis-gun-afisi]], eski hâl [[10-Projects/tussle/sessions/2026-10-17-tussle-guncel-durum-arsivi|arşiv]]._
- **Yayında:** https://tussle.ziroo.net, sunucu 4cb21c1 (22 Eki 14:31, OTA 0.20261022.1431, DB 28): telefon taşmaları düzeltildi (1v1 skor küçülmesi, kart altı not, sürüm iki satır, oda ayarları başı kodsuz, oyun havuzu satır altında), `npm run tasma` taşma denetimi ([[2026-10-22-tussle-telefon-tasmalari-ve-tasma-denetimi]], ders [[2026-10-22-dev-verisi-uretimden-kisa-tasma-gorunmez]]). Önceki 1a459eb (22 Eki 13:06, OTA 0.20261022.1306): kapışmaya davet (maç linki `/?mac=`, kartta Davet et, iOS kod yapıştırma) + sunucu tarafı huni olayları (`feedback-cli huni`, /admin Huni) ([[2026-10-22-kapismaya-davet-mac-linki-ve-kendi-olay-tablosu]]). Önceki a6819e3 (OTA 0.20261022.1149; önceki da56efa profil OTA .1140, 2123e8c OTA .1116, 6330e48 OTA 0.20261022.1058, 4d7726b OTA 0.20261022.1041, 4a09acd OTA 0.20261022.1024). Değişenler: profil (+düzenleme), oda ayarları ve ayarlar sayfası ⚔ şablonunda (oyun havuzu katlı satır; profil Genel 6 karo kutu içinde) (liveSwitch, account.ts üçe bölündü), ana↔oda geçişinde durum/alt çubuk yanıp sönmesi giderildi (ölçüm sapma 0), sezon sayfası kaymasız (sabit grafik kutusu, ön çekme, gün kartı gerçek biçimli iskelet), sezon üstü + oyuncu kartı ⚔ diline çekildi, Geçmiş lede ucunda pill ([[2026-10-22-tussle-gecis-cubugu-sezon-oyuncu-karti-kilic-dili]], [[2026-10-22-kilic-sayfa-dili-genel-sablon]]). Önceki sunucu e9d5922 (22 Eki, OTA 0.20261021.2320, DB 26): Chain v7 tek süre + her sayı ayrı renk (taban 12 sn), Four Arrows v5 süreye bağlı rampa, Double Tap kalktı, oyuncu kartında avatar büyümesi yok ([[2026-10-22-tussle-chain-tek-sure-four-arrows-double-tap-kalkti]]). Önceki 3bfeb05 (OTA 0.20261021.2238): Arena'da önce kişi sonra süzülmüş oyunlar, ⚔ sayfası boy değişiminde kayar, üst üste sayfada alttaki geri çekilir ([[2026-10-22-tussle-arena-kisi-once-sayfa-kaymasi-yigin]]). Önceki 7042573 (OTA 0.20261021.2152): ⚔ sayfası sadeleşti, hak = jeton (C2 Delikli), şans hakkı kalktı, günün tablosunda Hak sütunu yerine isimde kalan hak rozeti ([[2026-10-22-hak-jeton-dili-sans-hakki-kalkti]]). Önceki ce164c0 (DB 25): yardımcı rolü kalktı, herkes parti açar + sonraki günü başlatır ([[2026-10-21-yardimci-rol-kalkti-parti-ve-sonraki-gun-herkese]]); kapışma 1v1 bildirimsiz, ⚔ üç sekme (Kapışma · Arena · Parti), VS açılışı, Parti halka açılışı ([[2026-10-21-kapisma-1v1-arena-sekmesi-acilis-sahneleri]]). Önceki 7df653d arena parti 2 ([[2026-10-21-arena-parti-2-gecikmesiz-oyunlar-ve-gorsel-sema]]). main `e9d5922`. Konteyner `tussle` (127.0.0.1:8087, `/opt/tussle`, veri `/opt/tussle/data`, sırlar `.env`). Yayın `bash deploy/release.sh` ([[2026-10-18-yayin-temiz-worktree-den-yan-oturum-ayni-klasorde]]); `.env` değişince `docker compose -f deploy/compose.yml up -d --force-recreate` ([[2026-10-17-env-degisikligi-compose-restart-okumaz]]).
- **20 Eki gece yayını (geri bildirim turu):** tek ölçü (flutter geçit, spike-wall boncuksuz, crack-it fitil anahtarda) [[2026-10-20-oyunda-tek-olcu-ikinci-birim-yok]]; adil ceza (flip-match v4, on-time v5, color-recall v4, double-tap çubukta −1 sn, hoop v4) [[2026-10-20-ceza-yalniz-bilinebilir-hatada]]; swing v5 [[2026-10-20-swing-gercek-sarkac-tek-dokunus-otomatik-tutunma]]; bridge v3 tam isabet platform genişletir; stop-wheel v3 30 sn; zigzag/spiral/bounce/split görsel; ortak bitiş satırı [[2026-10-20-oyun-ici-bitis-satiri-duz-neden]]; şeritte profil fotoğrafı; "herkes bitirince" satırı herkese. Geri bildirim #6–#20 kapandı ve CLI'de ack edildi. Ders: [[2026-10-20-geri-bildirimi-replay-ile-sinifla]].
- **20 Eki yayınları:** rozetler, kontur, kapanış geçişleri, iskeletler ([[2026-10-20-kademeli-rozetler-bronz-gumus-altin]]); ana ekranda ayarlar dişlisi ([[2026-10-20-ayarlar-girisi-ana-ekranda-diskli-disli]]); Parti tek "Kaç hak" ([[2026-10-20-parti-gecesi-tek-hak-secimi]]); ilk oda dokunuşu dolu açılır ([[2026-10-20-ilk-oda-dokunusu-ana-sayfa-ozetinden-on-kart]]); logoya uçuş açılışı ([[2026-10-20-acilis-animasyonu-logoya-ucus]]); Android'de Apple girişi, `APPLE_ANDROID=1` açık ([[2026-10-20-android-apple-girisi-custom-tab-sunucu-yonlendirme]]).
- **Gelir:** hak paketleri odaya hediye, reklam yok ([[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]]); Play TR 9,99/19,99/29,99 ₺ ([[2026-10-19-play-hak-paketleri-tr-fiyati]]); Apple doğrulaması açık. Bildirim: web push + APNs + FCM.
- **Android:** Play `net.ziroo.tussle`, 1.12 (vc 16, 21 Eki gece) iç + kapalı test; önceki 1.11 (vc 15); `npm run play:upload`. Kapalı test: 12 testçi (19 Eki), 14 gün sayıyor. Tuzaklar [[2026-10-18-magaza-derlemesi-ortam-tuzaklari-java-home-zsh]].
- **iOS:** 1.4 build 10 TestFlight dış grup, beta incelemesinde (21 Eki gece; tuzaklar [[2026-10-21-testflight-export-hesap-hatasi-ve-grup-404]]); önceki build 9 (1.3). TestFlight https://testflight.apple.com/join/PkEYg1MN; dağıtım `npm run ios:testflight`.
- **İzleme:** istemci hataları + geri bildirim + ölçüm olayları (`scripts/feedback-cli.mjs`; arena maç telemetrisi `log --kind arena`, [[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]]), gece yedeği 04:20, gece gözcüsü ([[2026-10-18-global-gece-gozcusu]]), canlı DB okuma [[2026-10-18-canli-db-okuma-docker-exec-node-sqlite]]. Kod haritası `docs/kod-haritasi.md` (bakım `harita.mjs kontrol`).

## Sıradaki işler
- **Telefon teyidi (22 Eki, 4cb21c1):** oda ayarları başı + oyun havuzu açılışı, bitmiş 1v1 kartı skoru, kendi açık kart düğmeleri, Ayarlar sürüm satırı; `tasma` kapsamı: alt sayfalar, canlı/parti/arena kartları, İngilizce.
- **Kapışmaya davet + huni (22 Eki, yayında 1a459eb):** telefon teyidi (Davet et → paylaşım → linkten VS sahnesi; iOS kod yapıştırma; web açılış kartı), yayın (göç 27+28), konsol beyanları (Play Data safety / ASC Product Interaction, store/listing.md), Faz 2: onboarding davetli kartı, Android Install Referrer, "Tussle'ı tanı". [[2026-10-22-tussle-kapismaya-davet-ve-huni]], [[2026-10-22-kapismaya-davet-mac-linki-ve-kendi-olay-tablosu]]
- **Pazarlama (20 Eki planı):** yeni oturumda güncel kodla davet→ilk maç akışı + ölçüm durumunu yeniden tara, konumlandırmayı arena oyunlarına göre gözden geçir, plan dokümanını güncelle; sonra davet akışı + ölçüm ayrı dalda. [[2026-10-20-tussle-pazarlama-plani]]
000000. **Telefon teyidi (22 Eki, 4d7726b):** geçiş çubuğu (Xiaomi'de de bak), sezon sayfası + Geçmiş pill, gün kartı açılışı, oyuncu kartı, ayarlar, oda ayarları (katlı havuz, Davet pill), profil + düzenleme (a6819e3; Genel karolar kutu içinde, büyük sayı küçülmesi; açık: rekor alt sayfası ve tüm sezonlar sayfası eski dilde, bağlı hesapta Google/Apple bağla bloğu üretimde bir kez bakılmalı). ⚔ dili turu TAMAM (sezon, oyuncu kartı, ayarlar, oda ayarları, profil); kalan: rekor alt sayfası, tüm sezonlar sayfası. [[2026-10-22-tussle-gecis-cubugu-sezon-oyuncu-karti-kilic-dili]]
00000. **Telefon teyidi (22 Eki, e9d5922):** Chain renkler + tek süre hissi, Four Arrows yeni uzunluk, oyuncu kartı düz açılış; birkaç gün sonra `feedback-cli practice --game chain` / `four-arrows` ile v7 / v5 ortancası (hedef 25–40 sn). [[2026-10-22-tussle-chain-tek-sure-four-arrows-double-tap-kalkti]]
0000. **Telefon teyidi (22 Eki gece, 3bfeb05):** Arena kişi → süzülmüş oyunlar, ⚔ sayfa kayması (Xiaomi akıcılığı), Sezon Geçmiş hizası, sezon → oyuncu kartı yığını (küçülme/karartma miktarı). [[2026-10-22-tussle-arena-kisi-once-sayfa-kaymasi-yigin]]
000. **Telefon teyidi (22 Eki yayını) + açıklar:** ⚔ sayfa aç/kapa, Gece'de küçük jeton dolu/boş ayrımı, tablo isim rozeti, parti kartı/akış jetonu. Açık: parti modunda oyun anlatımı (Melih: oyunlar anlaşılmadan geçiyor); sonraki sürümde `luck` tablosu + `days.luck` düşür. [[2026-10-22-tussle-canli-sayfa-jeton-sans-hakki]]
00. **Telefon teyidi (21 Eki gece yayını):** ⚔ solda kas hafızası; sahip olmayan parti açar/başlatır; sonraki gün düğmesi üyelerde; kapışma 1v1 kartı, VS açılışı ve halka sahnesinde kasma (düşük donanım), iki ekran izleme + dokununca tam ekran, rövanş, 2 kişilik arena masası, Android geri. Açık: arena toplu/açık odalar tasarımı; sohbet bildirimi sıklık sınırı (karar yok). [[2026-10-21-tussle-roller-kapisma-1v1-arena-sekmesi]]
0. **Telefon teyidi (21 Eki, geri bildirim turu 2):** chain süre devri, cups 3 bardak + çapraz/yem, lane-dash 18 m görüş, stop-wheel düğme metinleri, brake 0 puan satırı, color-recall tolerans. **Telefon teyidi (20 Eki gece, geri bildirim turu):** swing hissi (ölçek değişti), crack-it HUD kısalan anahtar, bitiş satırı konumları (quick-math, snake, knife-toss, crack-it), on-time "Henüz değil", hoop yeniden yükleme, zigzag renk/nokta, spiral çevirme, split tur noktaları, double-tap kırmızı −1 sn, şeritte fotoğraf. **Denge turu** (antrenman verisi): typicalSec yanlış olan oyunlar (knife-toss, make-10, odd-one-out, arrow-wall kısa; flutter, lane-dash, sort-it, bounce, snake, beat, balance uzun) ve hiç rozet alınmayanlar; bitiş satırına geçmeyen 4 oyun. Ayrıntı [[2026-10-20-tussle-geri-bildirim-turu-antrenman-analizi]].
0b. **Telefon teyidi (20 Eki akşam):** açılış uçuşu takılma/konma, ilk oda/oda sayfası/oyuncu kartı/ayarlar açılışı, açılır açılmaz karta basınca gecikme var mı, kararma basma hissi ([[2026-10-20-tussle-ilk-acilis-takilmasi-gecisler]]). **Telefon teyidi (20 Eki yayınları):** 1.10 Play'den gelince açılış (logoya uçuş, oturumlu yol) + splash keskinliği/eşleşmesi; Android Apple girişi ilk deneme (Ayarlar → hesap bağlama: dönüş otomatik mi, yedek "Tussle'a dön" mi); iPhone'da açılış ve tanıtım yerleşimi; avatar → profil geçişi 44 px; konturlar (Gece), kapanış geçişleri, iskeletler, rozet popup'ı; rozet eşiklerini veriyle ayarla ([[2026-10-20-kademeli-rozetler-bronz-gumus-altin]]). Cihaz hissini ölçümle doğrula ([[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]).
1. **Cihaz teyitleri (19 Eki):** bitmiş gün afişi + hediye rozeti, sezon kartı, Geçmiş + Android geri, oyuncu kartı, yavaş ağda maskot + Uyku, iPhone'da ilk dokunuşta ses, klavye açıkken sohbet, Gece teması, paylaşım ekranı; oda kilidi, yeni tempo (beğenilmezse `git revert fb9f2dd`), parti lobisi, Android satın alma (TR), iPhone hediye düğmesi.
2. **Açık soru (Yusuf):** küçük kontrastlar (kilitli kart 1/2, davet kartı, kendi mesaj saati, "2 hak", parti buton yazıları).
3. **Denge ölçümü:** sürüm bazlı insan medyanı (`scripts/balance-report.mjs`, dal `claude/heuristic-dirac-c207c7`; [[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]]).
4. **Herkes için zar (Playus fikri):** ücretli/ücretsiz kararı Yusuf'ta.
5. **Mağaza:** Play %15 şart kabulü (Yusuf), IARC, Apple sandbox testçi yok ([[2026-10-18-tussle-kalan-isler-testflight-urunler-play-konsol]]); ekran görüntüleri (Yusuf).
6. **Kapalı test → üretim:** 14 gün dolunca başvuru; `install-links.ts` `stage: 'store'`.
7. **iOS ilk denemeler:** APNs ve sandbox satın alma.
8. **Küçük açıklar:** `android-twa` yedek kabuğunda `data-boot` yok (Play'i etkilemiyor); belgelerdeki eskimiş yerler kod haritasının Tuzaklar bölümünde.
9. **Arena parti 2 (21 Eki gece, yayında OTA 0.20261021.1632, main `7df653d`):** Pocket, Puck, Drop Four, XOX, Number Hunt + 10 arena oyununun görsel şeması ve kapakları; [[2026-10-21-arena-parti-2-gecikmesiz-oyunlar-ve-gorsel-sema]]. Sırada: Yusuf yayın kararı → telefon teyidi (sürükle-bırak hissi, hamle süreleri, Number Hunt karışma, Gece tonları). **Önceki (yayında OTA 0.20261021.1500):** Crown, Trails, Paint ve Type Race (Yusuf'un yazı fikri) + istemci görünüm dikişi + `ain` karakter alanı; [[2026-10-21-arena-ikinci-parti-crown-trails-paint-type-race]]. Sırada: Yusuf telefon teyidi (özellikle Type Race klavye: kaydırarak yazma, otomatik düzeltme, Türkçe harf, Capacitor klavye yerleşimi) → yayın kararı → rozet yuvaları, izleme. **Arena modu (21 Eki):** Sumo prototipi main'de (`e9574bd`, 21 Eki `a396f75` yayınıyla canlıda, kapışma sayfasında "Arena" başlığı; [[2026-10-21-arena-modu-dort-oyun-ve-sumo-prototipi]]). İki telefon teyidi yapıldı: kasma veri açlığıydı, maç sonu telemetri (`client-log.jsonl`, `feedback-cli log --kind arena`) + uyarlanabilir render gecikmesi 100–250 ms ([[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]]); sırada ikinci ölçüm maçı (starved ~0 beklenir) → Trails → Crown, Paint → rozet yuvaları, izleme. **Sonra:** tanıtımda kimlikli figürler, **Görsel tur TAMAM ve YAYINDA (21 Eki 14:40, `d4c19d6`, OTA 0.20261021.1139):** 36 oyun; parti 3b (`1eac08a`: hop, flutter, jetpack, beat, trace, lane-dash, right-door) + parti 4 (`d4c19d6`: treasure, brake, cups, balance, pinata, slice, sort-it, arrow-wall, color-recall), oturum notu [[2026-10-21-tussle-gorsel-tur-parti-3b-4]] (sim önerileri + Gece kontrast adayları orada). Önceki: VISUAL.md §2.1 'dolu ama sakin' + sahne kiti (`view-kit`) + 20 oyun (parti 3a: stack, reflex, knife-toss, spiral, stop-wheel, how-many, odd-one-out; parti 1: four-arrows, make-10, bridge, target, snake, keep-up, chain, spike-wall; parti 2: lights, color-match, quick-math, double-tap, flip-match) + Gece mürekkep kontur/koyu gölge (`cfe9b76`, beğenilmezse revert); yüz yalnız oynatılan karakterde. Kontak sayfaları Yusuf'ta, telefon teyidi + yayın kararı onun; yüz ve Gece kontur kararı [[2026-10-21-yuz-yalniz-oynatilan-karakterde-gece-murekkep-kontur]]. Devir [[2026-10-21-devir-gorsel-tur-parti-3-brief]] (uygulandı); oturum notu [[2026-10-21-tussle-gorsel-tur-parti-1]]; analiz [[gorsel-2026-10-21/analiz]]. Tembel parçalar rafta ([[2026-10-17-oyunlar-tembel-parca-modul-sistemi-rafta]]).

## Önemli kararlar
- Pazarlama: [[2026-10-20-pazarlama-konumlandirma-canli-kapisma]], [[2026-10-20-sessiz-yayin-ayri-tanitim-hamlesi-ayri]]
- [[2026-10-21-yardimci-rol-kalkti-parti-ve-sonraki-gun-herkese]] · [[2026-10-21-kapisma-1v1-arena-sekmesi-acilis-sahneleri]]: roller sadeleşti; kapışma 1v1 bildirimsiz, arena sekmesi, açılış sahneleri.
- [[2026-10-20-oyunda-tek-olcu-ikinci-birim-yok]] · [[2026-10-20-ceza-yalniz-bilinebilir-hatada]] · [[2026-10-20-swing-gercek-sarkac-tek-dokunus-otomatik-tutunma]] · [[2026-10-20-oyun-ici-bitis-satiri-duz-neden]]: geri bildirim turu (tek ölçü, adil ceza, swing v5, düz bitiş satırı).
- [[2026-10-20-android-apple-girisi-custom-tab-sunucu-yonlendirme]]: Android'de Apple girişi Custom Tab + `apple-redirect.ts`, `APPLE_ANDROID` bayrağı.
- [[2026-10-20-acilis-animasyonu-logoya-ucus]] · [[2026-10-20-android-splash-ilk-boyamaya-kadar-ve-web-boot-esit-boy]]: logoya uçuş açılışı, splash ilk boyamaya kadar, eşit boy.
- [[2026-10-20-ayarlar-girisi-ana-ekranda-diskli-disli]] · [[2026-10-20-parti-gecesi-tek-hak-secimi]] · [[2026-10-20-ilk-oda-dokunusu-ana-sayfa-ozetinden-on-kart]]: ayarlar dişlisi ana ekranda, tek "Kaç hak", ilk oda dokunuşu dolu.
- [[2026-10-20-kademeli-rozetler-bronz-gumus-altin]] · [[2026-10-20-gorsel-kurallar-kontur-kapanis-gecisi-iskelet]]: 10 kademeli rozet + profil istatistikleri; avatar düz kontur, kapanışta düşüş, iskelet yükleme.
- [[2026-10-20-sezon-karti-h1c-gun-noktalari-7-kutu]] · [[2026-10-20-sezon-uzunlugu-7-30-gun]] · [[2026-10-20-sezon-gecmisi-ayri-ekran]] · [[2026-10-20-oyuncu-karti-denemeler-profil-baglantisi]] · [[2026-10-19-karttan-karta-gecis-bitmis-gun-afisi]]: sezon kartı (sıra|lider, gün noktaları, 7 kutu), sezon 7–30 gün, Geçmiş ekranı, sade oyuncu kartı, karttan karta geçiş + bitmiş gün afişi.
- [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]] · [[2026-10-19-maskot-yukleyici-karisik-havuz-uyku]]: B itme her yerde, C ortak nesnede, ekran geçişten sonra dolar; maskot yükleyici havuzu, 8 sn Uyku. Ders: [[2026-10-19-gecis-olcumu-gizli-bolme-ve-view-transition-tuzaklari]]
- [[2026-10-19-oyun-kimlikleri-ingilizce-kebab-case]]: oyun kimlikleri görünen addan İngilizce kebab-case, rota `#/game`, DB göçü 22.
- [[2026-10-19-oda-ustu-iki-satir-sezon-ve-bugun]] · [[2026-10-19-ana-sayfa-oda-karti-v3]] · [[2026-10-19-antrenman-gizli-testci-modu-ve-ayri-veri]] · [[2026-10-19-serit-ve-bardak-90-sn-tavan]] · [[2026-10-19-web-hediye-dugmesi-uygulamaya-yonlendirir]]
- [[2026-10-18-canli-macta-yalniz-dogrulanmis-sonuc-surum-zorunlu]]: canlı maçta yalnız doğrulanmış sonuç, gameVersion zorunlu, geri uyum yok.
- [[2026-10-18-oyunlarda-fontta-olmayan-isaret-cizilir]]: Nunito'da olmayan işaret (✓ ✗ ✕) çizim.
- [[2026-10-18-android-titresim-sistem-ayarini-izler]]: Android titreşimi performHapticFeedback, sistem ayarını izler (MEDIA kararının yerine).
- [[2026-10-18-android-geri-tusu-ekrandaki-geri-dugmesiyle-ayni]]: geri tuşu = ekrandaki geri düğmesi, ana sayfada arka plana.
- [[2026-10-18-cila-turu-kontrol-konturu-ters-bildirim-gece-cubugu-bekler]]: kontroller iki temada konturlu (`--control-line`), bildirim ters renk, gündüz oyun zemini, theme-color yığını; gece Android çubuğu Chrome düzeltene kadar bekler
- [[2026-10-18-android-twa-kalir-web-izleri-kodda-kapatilir]]: TWA kalır, web izleri kodda kapatılır; WebView'e dönüş yine reddedildi.
- [[2026-10-18-hak-paketi-fiyatlari-ve-magaza-urunleri]]: 0,49 / 0,99 / 1,49 $; iki mağazada scriptle ürün.
- [[2026-10-18-google-girisi-kendi-dugme-token-akisi]]: web/TWA Google girişi kendi düğme + GIS token akışı, tek dokunuş, sır gerekmez (bindirme ve kod akışı reddedildi)
- [[2026-10-18-iptal-karti-sohbetten-kalkar-kapisma-sinirlari-gevsedi]]: iptal kartı sohbetten animasyonla kalkar; start/attempt 30/dk, matchCreate 30/10 dk, 429 günlüğü · [[2026-10-18-denge-v4-rampa-tavan-180]]: Denge v4 ikinci rampa, tavan 180 sn
- [[2026-10-18-kurulum-adimlari-sirali-indirme-kilitli]]: kurulum kartında vurgu sıradaki adımda, indirme 1-2 bitene kadar kilitli, "zaten yaptım" yok
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
- [[2026-10-22-dev-verisi-uretimden-kisa-tasma-gorunmez]] — dev verisi üretim uzunluğunda olmalı; `npm run tasma` ekran kapısı
- [[2026-10-21-testflight-export-hesap-hatasi-ve-grup-404]] · [[2026-10-21-ortak-klasorde-commit-dizin-degil-dosya-ekle]]
- [[2026-10-21-sunucu-otoriteli-gercek-zamanli-oyun-telefonda-hantal]] — arena gecikmesi; gecikmesiz kalıplar
- [[2026-10-21-paralel-arena-ajanlari-worktree-tabani-ve-ekleme-cakismalari]] — worktree tabanı + birleştirme Sonnet'e
- [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]] · [[2026-10-20-webview-raster-ucus-animasyonunda-gpu-donmasi]] · [[2026-10-20-testte-yanlis-uygulama-acilabilir-debug-surumu-kaldir]]: cihaz hissini 120 Hz kayıt/CDP ile ölç; WebView raster donması; yanlış uygulama/debug sürümü.
- [[2026-10-20-siniflandirici-canli-yayin-ve-db-okumayi-son-mesaj-onaylamadikca-engeller]]: yayın/DB okuma için her seferinde açık onay.
- [[2026-10-19-onceden-cekme-gun-satirini-olusturmamali]]: odayı önceden çekmek today/catalog ile günün satırını oluşturup seçimi dondurur; önce salt okunur detay, `picked` ise devam.
- [[2026-10-19-oyun-kimligi-yeniden-adlandirma-dersleri]]: kimlik yeniden adlandırmada kör bul-değiştir olmaz (etiket/birim çakışması, log `g`, eski göç fixture'ları).
- [[2026-10-19-yayin-ayri-worktree-dalindan-kismi-geri-alma]] · [[2026-10-19-android-textzoom-sistem-yazi-boyutu]]
- [[2026-10-18-canli-db-okuma-docker-exec-node-sqlite]]: canlı DB host'ta sqlite3 yok, konteynerde node:sqlite salt okunur.
- [[2026-10-18-ayni-checkoutta-baska-oturum-varken-magaza-derlemesi-yarim-isi-alir]] · [[2026-10-18-play-kapali-test-erisimi-katilimdan-sonra-gecikir]] · [[2026-10-18-magaza-derlemesi-ortam-tuzaklari-java-home-zsh]] · [[2026-10-18-twa-den-native-e-geciste-chrome-web-push-kaydi-kalir]]
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
- [[2026-10-22-tussle-telefon-tasmalari-ve-tasma-denetimi]] — telefon taşmaları, kök neden, tasma scripti (`4cb21c1`, OTA 0.20261022.1431)
- [[2026-10-21-tussle-roller-kapisma-1v1-arena-sekmesi]] — roller sadeleşti, kapışma 1v1, arena sekmesi, VS + halka açılışı; Android 1.12, iOS build 10
- [[2026-10-21-tussle-arena-devam-turu]] — iki arena partisi, iki yayın
- [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]]: ayarlar dişlisi, tek hak, logoya uçuş, Android splash, Android Apple girişi (`9730a9a`, OTA 0.20261020.1216, Android 1.10)
- [[2026-10-20-tussle-rozetler-kontur-kapanis-iskelet]]: kontur, kapanış geçişleri, iskeletler, kademeli rozetler (`0787aa4`, OTA 0.20261020.645)
- [[2026-10-19-tussle-karttan-karta-gecis-bitmis-gun-afisi]]: telefon notları turu: geçişler, bitmiş gün afişi, önceden çekme, sezon kartı/Geçmiş, oyuncu kartı (`5c0161e`, OTA 0.20261019.2145, DB 24)
- [[2026-10-19-tussle-oyun-kimlikleri-ingilizce]]: oyun kimlikleri İngilizceye (`c81a8b7`, yayın bekliyor)
- [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]: Bardak v6, Şerit v4, gizli Antrenman, Apple IAP açık, derin bağlantılar, oda üstü iki satır, oda kartı v3 (`98c61ab`, OTA 0.20261019.51)
- [[2026-10-19-tussle-bildirim-geri-bildirimler-serit-kim-burada]]: bildirim, kim burada rozeti, Şerit v3 (`e2de09a`, OTA 2131)
- [[2026-10-18-tussle-basket-glif-lobi-parti-kilidi-magaza]]: Basket v3, çizilmiş işaretler, lobi turu, parti kilidi düzeltmesi (`624c6e0`), Android 1.6 + iOS build 7
- [[2026-10-18-tussle-durum-kalan-isler-ios-motor-yayin]]: bildirim düzeltmesi, lisans ekranı, iOS mini motor 4a-4c (`0d633ef`), Play 1.5 + iOS build 6, sunucu `202c2ec`
- [[2026-10-18-tussle-ios-mini-motor-faz-4a-4b]]: iOS mini motor Faz 4a-4c ayrıntısı
- [[2026-10-18-tussle-kurulum-adimlari-sirali]]: kurulum kartı adımları sıralı ve kilitli (`202c2ec`, OTA 0.20261018.1541)
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
