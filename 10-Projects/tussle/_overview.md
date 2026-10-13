---
type: project
project: tussle
date: 2026-10-13
status: active
tags: [tussle, overview, oyun, mobil, pwa]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Tussle: arkadaşlarla günlük mini oyun kapışması (Playus'un hafif rakibi)

> Durum kaynağı bu sayfa; canlı gerçek değildir, işlem öncesi repo/sunucudan doğrula.

## Nedir
Playus (`club.playus`, günlük 1 dk mini oyun + grup sezonu) benzeri ama **hiç kasmayan**, odası tamamen ayarlanabilir, canlı kapışma planlı bir mobil web oyunu. Hedef önce arkadaş grubu, sonra App Store + Google Play (global, ad Tussle). Repo `~/ZZ/zProjects/mobil-playus` (git, main; GitHub özel `zziroo/tussle`). Dokümanlar: `docs/DESIGN.md` (ürün), `docs/M0-PLAN.md` (teknik sözleşme), `docs/GAME-CONTRACT.md` (oyun ekleme), `docs/ARCHITECTURE.md`, `docs/POLISH.md`, `docs/AUTH-SETUP.md`, `docs/VISUAL.md` (görsel yönerge; arayüz paleti "Şeker Dükkanı", kapaklar ve sahneler sade).

## Teknoloji
- İstemci: saf TS + Vite + Canvas 2D, framework yok; menüler DOM (rAF yalnız oyunda). PWA (manifest + SW; SW `/api`'yi hiç önbelleklemez).
- Oyun sözleşmesi: 60 Hz sabit adım deterministik sim (`sim.ts`, DOM'suz) + `view.ts`; sim'de `Math.sin/cos/pow/hypot/random/Date` yasak (`shared/dmath`, `shared/rng`); adım başına sıfır tahsis; varsayılan 60 kare sınırı, "Yüksek kare hızı" ayarı.
- Sunucu: Node 24 + `ws` + `node:sqlite`, tek konteyner; girdi günlüğü sunucuda tekrar oynatılır, skor sunucuda hesaplanır (hile ve tekrar izleme). Oda kodu (4 harf), günün oyunu `mixSeed(oda, gün, sezon)`, deneme hakkı, sezon, sohbet + otomatik akış satırları, misafir kimliği + Google/Apple bağlama (JWT doğrulama `node:crypto`), günlük `VACUUM INTO` yedek.
- Oyunlar (51 kayıtlı = 47 + Parti J 3 + Dört Ok 1, hepsi günlük havuzda): M0 dörtlüsü + Parti A–J + Dört Ok. Plinko, Zar Kulesi, Salyangoz, Jeton İtici 2026-10-10'da; Gizli Geçit, Kutu Seç, Yüksek/Alçak, Örüntü ve Terazi, İp Atla, Fırlat 2026-10-13'te silindi; `src/shared/pool.ts` `OFF_POOL` mekanizması boş küme olarak duruyor. **Varyant yok** (2026-10-13'ten beri her oyun tek ve sabit; altyapı tek girişle duruyor), **oda parametresi yok**, denge kodda. Meta: `gesture` (hayalet el), `score {unit, decimals, better}` (doğal ölçü). Üretim kiti: `src/games/shell`, `npm run new-game`, `docs/GAME-CONTRACT.md`, yol haritası `docs/GAMES-ROADMAP.md`.
- i18n: TR/EN (`src/client/i18n`, `docs/I18N.md`); sunucu hata kodları; akış satırları yapısal.

## Güncel durum (2026-10-13; canlıdan doğrula)
**Yayında:** https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, `/opt/tussle`, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data` (konteyner içinde `/data`), sırlar `/opt/tussle/.env`). Deploy: `bash deploy/release.sh` (yedek + `deploy/deploy.sh`) ya da yalnız `bash deploy/deploy.sh`. Son yayın `a2865d0` (2026-10-13, ortak oyun adları), DB sürümü 13 (şema değişmedi); GitHub `zziroo/tussle` aynı. Yayın öncesi yedekler `/opt/tussle/data/pre-*.db` (son: `pre-a2865d0.db`; elle alma: `docker exec tussle node -e` ile `VACUUM INTO '/data/pre-<rev>.db'`, veri `/data/tussle.db`; rev'i önce yerelde değişkene al). 1.699 test yeşil.
- **2026-10-13 ikinci oturum** ([[2026-10-13-tussle-kapaklar-parti-j-varyantlar-dort-ok]]), main `2609905` → `3fe3dc2` (18 commit), yayınlar `fd7368a`, `f04ef65`, `e1c252f`, `2db56a3`, `3fe3dc2`:
  - **Kapaklar şekersiz** ([[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]]): 24 kapak yeniden çizildi, küçük resimler aynı SVG'den düzeldi; Şeker Dükkânı yalnız arayüz paleti.
  - **Parti J** ([[2026-10-13-terazi-ip-atla-firlat-yerine-parti-j]]): Terazi, İp Atla, Fırlat silindi (410 `game_gone`); Köprü Kur `kopru`, Ok Duvarı `okduvar`, Topla 10 `onluk`.
  - **Varyant yok** ([[2026-10-13-varyantlar-kaldirildi-oyunlar-tek-ve-sabit]]): 12 oyunda yalnız ilk mod, sim birebir, altın tohum testleri; silinmiş mod id'si klasik + varsayılana çözülür.
  - **Dört Ok v3** ([[2026-10-13-dort-ok-oyunu]]): 2×2 oklu karo, kendi süre çubukları, 4 → 2 → 1,4 sn; Yusuf telefonda denedi.
  - **Öncelik** ([[2026-10-13-once-magaza-sonra-denge]]): önce Capacitor/mağaza, denge sonra.
  - **Oyun adları her dilde ortak** ([[2026-10-13-oyun-adlari-her-dilde-ortak]]): 51 ad İngilizce kökenli, kısa; eski Türkçe adlar GAMES-ROADMAP tablosunda. Yayın `a2865d0`. Yusuf 24 şekersiz kapağa telefonda baktı: "garip duran yok".
  - **Capacitor yolu** ([[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]]): gömülü web + imzalı canlı güncelleme; URL-kabuk değil.
- Önceki durum (2026-10-13 ilk oturum, yayın `2609905`): aşağıdaki maddeler yerinde; Terazi/Fırlat geçen satırlar tarihsel.
- **2026-10-13 yayın zinciri:** `00211aa` canlı alt sayfa UI, `75bb90e` sezon çipi, `ba6dccc` küçük bulgular, `d2f3ab3` 4 oyun silme, `be2f534` `BonusClock` çekirdeği, Parti I merge'leri + `f33df9a` inceleme düzeltmeleri, `2323498` kapaklar, `ef42a91` süre modeli A, B merge + `2609905` Renk Hafızası bayrak düzeltmesi. [[2026-10-13-tussle-eleme-sure-modeli-parti-i]]
- **Oyun eleme** ([[2026-10-13-duz-sans-oyunlari-ve-oruntu-kaldirildi]]): silinen gecit, kutu, yuksek, oruntu; Refleks, Tam Zamanı, Top Nerede, Terazi, Kaç Tane, Hazine, Şifre, Renk Hafızası ve Çark kaldı. **Parti I** ([[2026-10-13-parti-i-dort-hypercasual-oyun]]): Basket, Jetpack, Şerit Kaç, Kargo Ayır (yeni birim `paket`); kapakları ikinci oturumda şekersiz yapıldı. O an toplam 50.
- **Süre modeli** ([[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]]): taban 50–60 sn, iyi oyun bonus, sert tavan 90 sn (sonsuzlarda teknik 120).

  | Kalıp | Oyunlar |
  |---|---|
  | A süre (`BonusClock`, "+N sn") | Çift Dokun, Işık Sırası (20 tur), Çark (Dur'da çeviriş başına +1, en çok +5) |
  | A adet (`EV_EXTRA`) | Bardak Doldur 16, Fırlat 16, Balon 16 (+1), Refleks 8 tur, Tam Zamanı 7 tur, Hazine 20 kürek/90 sn |
  | B sonsuz (çubuk yok, 120 sn teknik) | Karşıya Geç, Zıpla |
  | Tur penceresi | Jöle Kes (6→2,5 sn), Renk Hafızası (bakış 2→0,6, cevap 8→3 sn, skor 'puan') |

  Kalan ~30 oyun zaten sonsuz/tur pencereli. Canlı maç deadline'ı `maxTicks/60 + 60 sn` (`src/server/live.ts`, parti de aynı).
- **Canlı alt sayfa yeni düzen** ([[2026-10-13-canli-alt-sayfa-sekmeler-baslik-oldu]]): sekme şeridi başlık, ızgara ≥2 satır, ipucu 2 satır sabit, 88dvh; sezon çipi Android kenarı `rotate` özelliğiyle düzeldi.
- Önceki durum (2026-10-12): aşağıdaki maddeler yerinde (son yayın o gün `062408b`).
- **Denge turu yayında (`8214e9a`)**, [[2026-10-12-sure-baskisi-yerine-tur-penceresi]], [[2026-10-12-can-sistemi-kaldirildi-ilk-hata-bitirir]]: 7 sabit süreli oyun (Matematik, Terazi, Zincir, Farklı, Renk, Şeker Avı, Kart Çevir) tur penceresine geçti, skor doğal sayı; 12 oyunda canlar kalktı, ilk hata bitirir, başlangıç yumuşak (Fren tavanı 40 tur, Yüksek/Alçak skor = doğru). Hepsinin sürümü arttı; eski denemeler yeniden puanlanmadı (kural değişti). **Telefonda denenmedi**, bot ölçümü. Şüpheli sertlikler: Renk 1 sn taban, Ritim tek kaçırma (p10 ~7 sn), Fren açgözlü 1–3 tur, Şeker Avı tek kaçırma.
- **Sade sahne yayında (`062408b`)**, [[2026-10-12-oyun-sahnesi-sade]]: `docs/VISUAL.md` §2.1; Şeker Yağmuru'ndan Zikzak'a 30 oyunun view'ı yeniden çizildi (~22k→~14k satır), sim değişmedi. **Yusuf'un gözüyle bakılacaklar:** Piñata düz top, Vinç makine hissi, Şifre düz süre çubuğu, Çark 2 ton, Gecit 3 renkli kapı, Yılan damalı ızgara, Sepet yüzsüz iyi şekerler. Ajanlar için canvas yakalama aracı `scripts/canvas-shot/` ([[2026-10-12-denge-ve-tema-turu-dersleri]]).
- Önceki durum (2026-10-11): aşağıdaki maddeler yerinde.
- **Canlı kapışma (M1) yayında (`1ecfed0`)**: sohbette "Kapışma iste" (2026-10-11'den beri mesaj satırındaki ⚔) → süresiz canlı lobi kartı (2–4 kişi, oyun ya da Rastgele), dolunca ya da atan ≥2 ile Başlat; atan odadan 20 sn ayrılırsa iptal; aynı tohum + sunucu zamanlı başlangıç + sunucuda doğrulama; sonuç kartta, sezona/hakka sayılmaz; HUD altında yarış şeridi; ekran dışı kartlar için ⚔ rozeti. **Günlük oyunda da şerit** (`398b84d`): bugün oynayanların en iyileri sabit işaret (lider + 2 önde + 1 arkada), yalnız kendi noktan hareketli; geçince yazı yok, minik ✓ (kapışmada da). **Oyun içi üst düzen** (`bf3c248`, [[2026-10-11-oyun-ici-ust-duzen-ve-gunluk-serit]]): en üstte kapat düğmesinin yanında dolu şerit (simetrik, ortalı; yakın avatarlar yan yana grup + "+n"), altında durum etiketi (Puan sayılıyor / Deneme turu / Kapışma), altında ortalı %60 süre çubuğu (saniye yok, son 5 sn kırmızı + nabız; enerji çubuklarında yok), sonra skor satırı. Şerit varken oyunlar üstte yer ayırır (`Viewport.band`, sözleşme `docs/GAME-CONTRACT.md` §5); yalnız görünüm, sim/girdi/skor değişmedi. [[2026-10-10-canli-kapisma-lobi-karti]], plan `docs/M1-PLAN.md`.
- **Parti Gecesi yayında (`f22ed1a`)**, [[2026-10-11-parti-gecesi]]: yalnız oda sahibi açar ("Kapışma iste" penceresinin üstünden), odada tek parti, odadaki herkes katılır (≤16), oda sahibi Başlat; 3/5/7 oyun (seçim + Rastgele), art arda canlı maç; sıra puanı N−p+1, çıkan/kaçıran 0; ~9 sn ara sahne (kazanan, uçan +n, sayan toplamlar, yer değiştiren sıralama, fark, sıradaki oyun) ve kürsü + konfeti. Skorlar parti maçında 5 Hz toplu. Sözleşme `docs/PARTY-PLAN.md`, migration 13.
- **Canlı kapışmada koşu tek seferlik (`6507a23`)**, [[2026-10-11-canli-kapisma-tek-seferlik-kosu]]: çıkan/yenileyen/bağlantısı kopan/ikinci sekmede oynayan 10 sn sonra "çıktı" (sunucuda, migration 12); yeniden katılma, rövanş, maç geçmişi yok (Yusuf: kart anlık, öylesine).
- **Oda ekranı yeniden tasarlandı (F, `80fa7b0`/`d3e72fb`/`339f0ca`)**, [[2026-10-11-oda-ekrani-sezon-bandi-ve-canli-ilk-3]]: üst bar (oda adı → Üyeler), sarı sezon bandı (sıra, puan, lider, 14 gün kutusu = o günkü sıran; `SeasonInfo.myDays`), bugün kartı tek dokunma alanı (banner + ▶ → başlangıç kartı; bitince ince şerit) ve **her durumda canlı ilk 3** (dokununca yerinde tam liste). Haplar, skor alt sayfası, sekmeler kalktı. Tek sayfa kaydırma; kaydırınca üst barda sezon çipi ve altında bugün şeridi. Sohbette oyuncu günü tek skor kartı, küçük olaylar katlanmış, ⚔ mesaj satırında. Maketler `src/client/mockups/` (yalnız geliştirme).
- **Deneme turu** günde bir kez, yalnız ilk sayılan denemeden önce, başlangıç kartında ([[2026-10-11-deneme-turu-gunde-bir-baslangic-kartinda]]). Günlük şeritte "bugünkü en iyin" artık mavi flama.
- Havuz beceri öncelikli: anlık kontrol, sonuç oyuncunun elinde; şans/izleme oyunları `OFF_POOL`'da (linkle oynanır). [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]
- **Parti G+H yayında (`30532cf`)**: 14 yeni oyun (Kanat Çırp, Şeker Kes, Spiral Kule, Bambu Kes, Diken Duvar, Tuğla Kır, Jöle Kes, Tam Zamanı, Renk Hafızası, Havada Tut, Hedef Avı, Yörünge, Yılan, Zikzak) + kapakları; (o an 54 kayıtlı; 2026-10-10 silmeyle 50). Yeni skor birimleri: kesim, yuzde, vurus, tugla. İnceleme düzeltmeleri: bambu tempo sınırı, kes daire ovalama, yorunge dokunuş aralığı; tamzaman/renkhafiza şüpheli bayrakları. [[2026-10-09-tussle-parti-g-h]]
- Havuzdaki oyunların hepsinin çizimli kapağı var (D/E/F'nin 14'ü `2482f79`'da); havuz dışı 4 oyun silindi. Antrenman yalnız canlı havuzu listeler, ana sayfa satırında 4 küçük kapak.
- E+F oyunları tarayıcıda canlandırıldı (sahne, karakter, ödül anı). Görsel tarz: ilk oyunlar gibi devam; tüm oyunların teması sonra toptan düzenlenebilir (Yusuf, limit yenilenince).
- Şüpheli koşu bayrakları: refleks, hazine, sifre, katane, tamzaman, renkhafiza (saklanıyor, hiçbir yerde gösterilmiyor; kutu/yuksek/gecit/plinko oyunlarla silindi).
- Google/Apple girişi kodda hazır, env yok (`docs/AUTH-SETUP.md`).

**Telefonda hiç görülmedi:** Parti J'nin 3 oyunu (Köprü Kur, Ok Duvarı, Topla 10; Köprü Kur maskot kutusu ölçülmedi), 24 yeni şekersiz kapak, Dört Ok koyu tema, Parti I'in 4 oyunu (Basket, Jetpack, Şerit Kaç, Kargo Ayır), 13 oyunun yeni süre modeli ("+N sn" balonu dahil), Balon "+1 balon" yazısı, canlı alt sayfanın yeni düzeni (Yusuf gördü mü belirsiz, doğrulanmadı), sezon çipi Android düzeltmesi, Parti Gecesi (gerçek kişilerle de oynanmadı: sahne animasyonu/hızı, konfeti, ses/titreşim, koyu tema, 16 kişide şerit "+n" okunurluğu), tek seferlik kuralın iPhone arka plan davranışı, yeni oda ekranı (klavye açılınca bugün şeridi gizleniyor mu, mesaj satırı yeri, çip/şerit belirişi, skor kartları), rekor flaması, canlı kapışma ("Geçtin!" balonu gerçek maçta hiç görülmedi, eş zamanlı başlangıç, arka plandan dönüş), G+H'nin 14 oyunu, D, E, F partilerinin tamamı (yeni Vinç kuralı ve yeni kapaklar dahil) ve önceki turun listesi (hayalet el, 3-2-1, Android geri, outbox, şans hakkı, 120 Hz).

### Sıradaki işler
00-c. **Capacitor → telefon/mağaza EN ÖNCE** ([[2026-10-13-once-magaza-sonra-denge]], yol: [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]]; Yusuf'tan gerekecekler: Google Play 25 $ kayıt, test kullanıcı e-postaları; Apple Developer var; Yusuf: önce markete çıkalım, sonra herkes early access/test ile uygulamada direkt denesin).
00-d. **Dört Ok telefon geri bildirimi bekleniyor** (v3 `3fe3dc2`: uzun rampa, alt çubuk, beginPath düzeltmesi).
00-s. **Oyun içi şeker kalıntıları** (kapaklar şekersiz oldu, sahnelerde kaldı): Karşıya Geç şeker küp, Kart Çevir lolipop simgeleri, Köstebek bonbon; Kes kapağındaki dikenli tehlike oyundan.
00. **Denge turu telefon testi (sonraya; mağaza/early access sonrası)** (2026-10-12 tur penceresi + tek hata oyunları ve 2026-10-13 süre modeli 13 oyunu, `#/oyun/<id>`): sert gelenleri tek tek yumuşat; Renk tabanı 1,1–1,2 sn'ye, Şeker Avı tek kaçırma, Ritim pencere, Fren ilk turlar adaylar. Sonra kalan sonsuz oyunların rampaları.
00-k. ~~Kapak sorusu~~ kapandı: kapaklar şekersiz ([[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]]).
00-p. **Arkadaşlarla Parti Gecesi / canlı kapışma denemesi** (aşağıdaki 0a, 0a2).
00a. **Sade sahne göz turu** (30 oyun iki tema): yukarıdaki "bakılacaklar"; istenirse Piñata'ya kulak, Çark'a çok renk geri (tek satır: `WEDGE_CANDY`).
00b. Düşük bulgular (2026-10-13 kapandı: Vinç 8. renk eklendi, rescore tablosu "tarihsel" notu aldı, canlı deadline maxTicks'e bağlandı). Telefonda bakılacak: Vinç yeni marshmallow beyazı Gündüz'de ayrışıyor mu.
0. **Yeni oda ekranı telefon turu** (2026-10-12: Yusuf "Parti Gecesi hariç denedik, sorun yok" dedi; Parti Gecesi hâlâ denenmedi) (iOS + Android): klavye ve mesaj satırı, kaydırınca sezon çipi/bugün şeridi, canlı ilk 3 ve tam liste, skor kartları, başlangıç kartındaki deneme bağlantısı. Bilerek bırakılan düşükler: klavye açıkken ⚔ sıçrama payı, şerit eşikte "Önceki mesajlar"a biniyor.
0a. **Arkadaşlarla Parti Gecesi denemesi** (oda sahibi açar): sahneler anlaşılıyor mu, puanlar net mi, herkese aynı anda açılıyor mu, 9 sn sahne kısa/uzun mu, kürsü. Sonra 2. tur cila.
0a2. **Arkadaşlarla canlı kapışma + günlük oyun denemesi** (Yusuf: oyunları arkadaşlarla test edecekler, sonra ekle/çıkar). Bakılacaklar: geçme ✓'si, herkes aynı anda oyuna geçiyor mu, şerit/etiket/çubuk arası ferah mı, son 5 sn nabzı rahatsız ediyor mu, arka plandan dönüşte kart durumu.
1. **Telefon turu**: D/E/F oyunları + önceki liste; hak harcamadan `https://tussle.ziroo.net/#/oyun/<id>`. Bakılacaklar (Fırlat ve İp Atla silindi): Şeker Ritmi geniş şeker/sıçrama, Vinç bantları, Çizgi Takip zorluk.
2. **Kapaklara bakış**: 14 yeni kapak Yusuf onayı beklemeden yayında; beğenilmeyenleri varyantla daralt. Koyu temada ritim/gecit panel ayrışması kart içinde kontrol edilmedi; panel renk yakınlıkları (vinc~matematik, cark~renk, ritim~denge). 
3. **G+H telefon turu**: denge şüpheleri — Spiral 10–30. kat ekşi yoğunluğu, Zikzak 8 karo/sn tavanı, Yılan dönüş parmak kalkınca, Hedef küçük hedefte merkez, Yörünge erken çiviler kolay mı, Bambu 10/sn sınırı hissettiriyor mu. Sonra zayıflar `OFF_POOL`'a. G+H denge sonra. Ok Duvarı Parti J ile geldi.
4. **Canlı sonrası**: dolaylı etkileşim modu (Tetris tarzı rakibe engel) ve gerçek arena oyunları; önce tek prototip (öneri sumo, gecikmeye dayanıklı; deterministik sim → geri sarmalı ağ kodu). M1: rövanş, maç geçmişi, yeniden katılma Yusuf kararıyla yok; oyun başına kişi sayısı filtresi kalabalık/canlı oyunlar gelince; bildirim Capacitor ile.
5. Tema toptan düzenleme (Yusuf kararı, sonra).
6. Kit/teknik: seçim düğmeleri yardımcısı; bayrakları tabloda ayırma (istenirse); Capacitor → TestFlight → mağaza; ertelenenler (ID token nonce, CSP, sözlük tembel yükleme, tepki toggle idempotent, `GET me` 30 oda).

## Önemli kararlar
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
- [[2026-10-13-oyun-adlari-her-dilde-ortak]]
- [[2026-10-13-capacitor-gomulu-web-ve-canli-guncelleme]]

## Dersler
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

## Oturumlar
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

## İlgili
Aynı VPS ve Caddy: [[10-Projects/kapis/_overview|KAPIŞ]] (ws sunucu kalıbı buradan), [[10-Projects/diskort/_overview|Diskort]]. Çalışma kuralları: [[orkestrasyon]], [[karar-dagilimi]].
