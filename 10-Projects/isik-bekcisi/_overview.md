---
type: project
project: isik-bekcisi
date: 2026-10-24
status: active
tags: [isik-bekcisi, oyun, incremental, kosu-tabanli, canvas]
source: C:\Users\yusuf\ZZ\zProjects\incremantal-game (CLAUDE.md); oturumlar 2026-10-02 (6d8df6c2, 72fd0708), 2026-10-04 (9e4d0124), 2026-10-05 (53393f9a), 2026-10-06 (fb8e3060, iki tur), 2026-10-07 (e5a9fa92 / 5f403d52, akşam 1249d80e), 2026-10-07 gece → 10-08 (dd56e56a + a15a1fc5), 2026-10-08 (nöbet tavanı), 2026-10-12 → 10-13 (b89a4bee: tavan kalktı, Atılım silindi, İs), 2026-10-24 (hikâye rafta, yazısız öğretme)
---

# Işık Bekçisi: fenerle karanlık vadiye koşular yapılan koşu-tabanlı incremental oyun

## Amaç
Yusuf'un asıl istediği tür: belli bir süre aktif oynanan, kampa dönüp geliştirme alınan ve tekrar çıkılan döngü (Shelldiver, Rock Bottom; [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]). İlk deneme idle çıkmıştı ([[10-Projects/bal-vadisi/_overview|Bal Vadisi]], [[2026-10-02-idle-degil-kosu-tabanli-incremental-istendi]]). Analizden sonra Yusuf bu konsepti onayladı: "elinden gelenin en iyisini yap, en kaliteli şekilde tasarla". **Masaüstü oyunu** (klavye + fare, 2026-10-08'den beri gamepad de: [[2026-10-08-gamepad-destegi-omuz-tuslari]]); mobil yok.

## Oyun
- **Sefer:** bekçi WASD ile yürür; fener imlece bakar. Sol tuş (ya da F) basılı = odak ışını; Boşluk = parlama; Shift / Q / sağ tık = atılım. Fenerin ışığındaki ruhlar "dolar" ve yakalanır; kıvılcım bırakır. **Hale geceyi tutar, öldürmez** (en fazla %30'a kadar yakar); düşmanı ışın, Parlama, Atılım ve zincirleme ışıklar bitirir ([[2026-10-06-hale-tutar-bilincli-isik-bitirir]]). Seferi **fener yağı** sınırlar; derin bölgede ve odaklıyken daha hızlı yanar.
- **Işın → lazer:** Mercek hattı (Mercek → Hüzme → Işın → Yıldız Mızrağı) erken oyunda meşale, ortada spot; geç oyunda incelmez, prizmaları delip geçen kalın, parlak bir lazer bandına döner ([[2026-10-08-lazer-incelmez-prizmalari-deler]]); hedefte tutuldukça ısınır. Odaklanmak yağı 1,7–2,5 kat yakar (fitilde "×1,8" etiketi); Damıtık Yağ düşürür. Geç bölgeler lazer ister: kabuklu ruh, prizma (ışını böler), gece dikeni (yağ emen halka), açılan Kalp. Ayrıntı: [[2026-10-02-lazere-donusen-isin-yag-bedeli-ve-lazer-dusmanlari]].
- **Camın ısısı (2026-10-07, canlıda: `b14f502`):** ışın tutulunca fenerin camı ısınır; ısı bir kaynaktır.
  - Dolma süresi: 5,5 sn, Mercek hattıyla 8,5 sn. Son 2,5 sn kırmızı uyarıdır: ışın tekler ve zayıflar.
  - Bırakınca cam 1,2 sn'de soğur. Tekrar basınca ışın kalan ısıdan devam eder.
  - Cam dolarsa ışın söner. Cam %40'a soğuyana kadar kilitli kalır, sonra **yeniden basmak** gerekir.
  - Isı fenerin camında görünür; kesin değer sağ alttaki odak simgesinde. İmlece ve bekçinin üstüne gösterge çizilmez, çünkü gamepad planlanıyor.
  - Ayrıntı: [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]], [[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]].
- **Kamp (gezilebilir üs, hikâye anlatır):** bekçi ateşin başında uyanır. E istasyonu kullanır, **F konuşur** (sakine tıklamak da). Teleskop + Ülker → gökyüzü (beceri ağacı); kapı + Kandil → sefer (kapıdan W ile yürüyerek; Kandil'in fenerine tıklayınca yanan fenerlerden başlangıç); pano + Puhu (1. fenerden sonra) → istekler; kazan + Vırak (2. fenerden sonra) → iksir; kamp ateşi → defter (Günce + Kayıtlar). Yeni sözü olan sakinin başında soğuk renkte konuşma balonu, istasyonda bekleyen bir şey varsa sıcak renkte eşkenar dörtgen ([[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]); konuşmalar alttaki plakada akar; sefer sonrası bir sakin sefere tepki verir. Hikâyenin özü ve kuralları: [[2026-10-02-hikaye-kampi-f-ile-konusma-ve-yumusak-gecisler]]. Kamp ilerlemeyle büyür. **Yeni oyun:** bekçi fenersiz uyanır, Ülker teleskopa çağırır; Bekçi Feneri alınana kadar Kandil kapıdan geçirmez ([[2026-10-06-bekci-feneri-agacin-koku-kapi-kapali]]).
- **Beceri ağacı:** gece göğünde takımyıldızı (8 kol, 62 yıldız). Ortada kök yıldız **Bekçi Feneri** var ("0. yükseltme", 3 kıvılcım, etkisi yok); her kol ondan çıkar. Beş durum ilk bakışta ayrı (tamam / alınmış / şimdi alınabilir / pahalı / kilitli), sonraki kademenin soluk önizlemesi, satın alma "yıldız yakma" animasyonu, kör satın alma yok. Bilgi kutusu imlecin yanında, en az yıldızı örten tarafta. Altı **zincirleme yıldız** var (Işık Gölü, Nakarat, Tutuşma, Kor İzi, Kayan Yıldız, Akkor), dördü 0–1. kademede; birbirini tetikler, her halka yeni bir yakalama ister ([[2026-10-05-zincirleme-yildizlar]]).
- **Beceri işaretleri:**
  - **2026-10-07'ye kadar:** Parlama ve Atılım beklerken bekçinin üzerinde dolan bir halka görünür; Atılım'ınki imleçte ([[2026-10-05-beceri-hazir-halkasi-bekcinin-uzerinde]], [[2026-10-06-atilim-halkasi-imlecte]]).
  - **2026-10-07'den beri (canlıda, `b14f502`):** halkalar bekçiden kalktı. Bekçide yalnız "hazır" anı görünür: Parlama için fener bir an parlar, Atılım için ayakta toz kalkar; ikisinde de ses var. Bekleme süresinin ilerlemesi yalnız sağ alttaki köşede. Erken basılınca boğuk tık ve köşedeki simge iki kez yanıp söner ([[2026-10-07-beceri-halkalari-bekciden-kalkti-yalniz-hazir-ani]]).
- **Karanlık sürüsü (gecenin kendisi):** Karacık, Çayır'dan itibaren karanlıktan sürünüp gelir. Hale onu yavaşlatır ve yakar ama öldürmez, ışın eritir; çömelip sıçrar, yapışırsa bekçiyi yavaşlatır (her biri %10), yağ içer ve haleyi kısar ([[2026-10-06-yapisan-karacik-yavaslatir]]). Karabasan Bataklık'tan itibaren gelir ve yanınca bölünür. Sayıları oyuncunun gücüyle büyür; Mağara ve Harabeler'de ışınla süpürülecek yaylar hâlinde gelir. Pervane, gölge ve diken aynı aileden görünür ([[2026-10-05-karanlik-surusu-karacik-ve-karabasan]]). **Pervane** halenin kenarında döner, 0,4 sn hazırlanır ve düz dalar; yana çekilerek kaçılır ([[2026-10-06-pervane-doner-sonra-dalar]]). **Her bölgenin bir eliti** var: İri Karacık, Kurukafa Pervanesi, Karabasan, Işık Kemirgeni, Karakoncolos ([[2026-10-06-her-bolgeye-bir-elit]]). **Karanlık tehdidi gizlemez** (2026-10-06): gözler, soğuk parıltı ve ay ışığı kenarı yaklaştıkça güçlenir; pervanenin gözleri kırmızı kor gibi parlar, arkasında kanat tozu izi kalır ([[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]).
- **Derinlik:** 5 bölge: Çayır (karacıklar), Orman (pervaneler), Bataklık (ürkek ruhlar, sis, ilk kabuklular: kabuklu sürüsünü korur, kırılınca sürü bir anda yakalanır [[2026-10-06-kabuklu-surusunu-korur-kirilinca-patlar]]; karabasan), Kristal Mağara (patlayan kristaller, prizmalar), Harabeler (gölgeler, dikenler, prizmalar). Ürkek ruh haleden kaçar ama ışında donar; yorgunluğu görünür.
- **Fenerler (2026-10-08'den beri):** akış küçük (bölgeye varınca 1–3 seferde hazır); nöbetin **görünür güç tavanı** var: nöbet payı ancak fenerin gücüyle (Fitil yıldızları, iksir) orantılı yere kadar tutuşur, orada durur ("Alev daha güçlü bir ışık istiyor"), ilerleme kalır, güçlenince devam; oyunun uzunluğu kotadan ağaca (kademe maliyetleri) taşındı ([[2026-10-08-fener-zayif-isiga-direnir-nobet-tavani-uzunluk-agacta]]). 1.–4. fener yanınca sefer **sürer** (1,8 sn yağ yanmaz, dolum yok, kalan yağla sonraki bölgeye); 5. fener seferi bitirir, Kalp ancak kamptan sonra ([[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]]).
- **Geçişler:** kapıdan çıkış kesintisiz (fener 1 sn'de yakılır), fenerden başlama bir yolculuk kartı, yağ bitince sönen alev ve eve süzülen kor, kampta ateş başında uyanış, teleskopa iris. Sefer başına ~2 sn.
- **Final: Son Nöbet** (2026-10-08). Gecenin Kalbi'nin çevresindeki üç parçalı Şafak Çemberi (Tan, Şafak, Sabah) dolunca Kalp kırılır. Tek hedef Kalp: ışın onu çatlatır, saçılan ruhlar ve kabuklu sürüler çemberi doldurur. Her basamak bölgelerin elitlerini salar (Çayır+Orman, Bataklık+Mağara, Harabeler). Halkalar, açılma anı ve yağ çeken çevre sürer. Her deneme sıfırdan, ~2 dk ([[2026-10-08-son-nobet-safak-cemberi-tek-hedef-bes-bolge]]). Kazanınca şafak; kuzey alacakaranlık kalır, seferler sürer.
- **Arayüz ("gece atlası"):** serif, ince çift çerçeveli plakalar, çentikli düğmeler, kendi çizgi ikonları, fitil göstergesi. Bal Vadisi'nden bilinçli ayrı.

## Teknoloji
- Düz JS ES modülleri + Canvas 2D, derleme yok, dış dosya yok. ~11.000 satır JS.
- Klasör: Mac'te `/Users/ziroo/ZZ/zProjects/incremantal-game` (Windows'ta `C:\Users\yusuf\ZZ\zProjects\incremantal-game`). Çalıştırma: `node serve.mjs` → http://localhost:5174.
- Kural: oyun kuralları `run.js` / `camp.js` / `quests.js` / `talk.js` / `state.js` / `data.js` içinde, DOM'suz; hikâye metni `story.js`; her şey `emit` üzerinden. Bot başsız oynar.
- Test: `tools/dev.js` (`timerFrames` / `manualFrames` + `ev`, `campSweep`), `tools/sim.js` + `sim-node.mjs` (denge botu), `tools/story-check.mjs` (hikâye). **Sözdizimi: `node --input-type=module --check < dosya`** (`node --check` bu makinede ESM hatası yakalamıyor). Ayrıntı deponun `CLAUDE.md` dosyasında.
- **Canlı:** https://games.ziroo.net/isik-bekcisi · liste https://games.ziroo.net/ (2026-10-03'ten beri; eski adresler 301; oyun kayıtları yeni kökte sıfırdan başladı). Yayın: `bash deploy/deploy.sh`; liste sayfası ziroo-edge `www/games/`'te, `bash deploy-www.sh games` ile ([[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]). Kurallar: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] (eski: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]). Betik `/opt/ziroo-www/games/isik-bekcisi`e yayınlıyor (2026-10-03 geçişte kullanıldı). Yayın Yusuf'un kararı.
- Git: GitHub (özel) https://github.com/zziroo/isik-bekcisi, dal `main`.
- **Kod haritası:** `docs/kod-haritasi.md` (2026-10-20, `7cdfb56`, yerelde; push yok). Bakım: yapı değiştiren commit öncesi `node ~/.claude/skills/kod-haritasi/harita.mjs kontrol`.

## Güncel durum
_Son içerik güncellemesi: 2026-10-24; canlıdan doğrula. Eski tablo ve devir listeleri: [[10-Projects/isik-bekcisi/sessions/2026-10-17-isik-bekcisi-guncel-durum-arsivi|arşiv]]._
- **Canlı = main `0ec7042`** (2026-10-24 akşam: gece derinleşir; GitHub'a push edilmedi). Önceki canlı `4283dfd` (hikâye rafta + yazısız öğretme faz 1). Önceki canlı `9509943` (2026-10-13 gece): Parlama evrimi (Şok Dalgası, Yanan Halka, Gün Doğumu), Kırılan Dünya, Zincir Fırtına ([[2026-10-13-parlama-evrimi-sok-dalgasi-yanan-halka-gun-dogumu]], [[2026-10-13-kirilan-dunya-ve-zincir-firtina-yazildi]]). Bot: ana 35,4 / özensiz 44,5 sefer. Oturum: [[2026-10-13-kirilan-dunya-firtina-parlama-evrimi-yayin]].
- **2026-10-12/13'ten beri canlıda:** nöbet tavanı kalktı, Atılım silindi, her kademede sonsuz yıldızlar, İs yıldız tozunun yerini aldı, `?chapter=N` bölüm kaydı. Kayıt sürümü 7; eski kayıtlar sıfırlandı (Yusuf kabul etti). [[2026-10-12-kapi-yok-uzunluk-icerikten-atilim-silindi-sonsuz-yildizlar]], [[2026-10-12-is-yildiz-tozunun-yerine-tek-kaynak-gece]].
- **Yön:** içerik genişliği değil, güç ekranda görünsün ([[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]]).
- **2026-10-24:** hikâye rafta ([[2026-10-24-hikaye-rafta-tek-bayrak]]). Yusuf ilk biyomu oynadı: 4-5 seferde ilk fener dolmadı (kota ~8 sefer, çubuk %80'de nöbeti bekler), yazılı ipuçları okunmuyor → yazısız öğretme kararı: [[2026-10-24-yazisiz-ogretme-secenekleri]] (seçenek 1 seçildi, yazıldı ve 2026-10-24 canlıya yayınlandı, `4283dfd`: koç işaretleri yalnız tuş kapağı, bilgi işaretleri ve metin bantları silindi, hazır fenerin ve sönük yol lambasının yerde halkası; seçenek 2 Yusuf oynadıktan sonra, 3 hikâyeyle sonra).
- **Denge:** yalnız bot ölçümü var, gerçek oyuncu ölçümü yok. Kalp kolaylaştı (~2 deneme), sonra ayarlanacak. Hedef oyun uzunluğu Yusuf'un kararı ([[2026-10-05-devir-oyun-uzunlugu]]).
- **2026-10-24 (akşam), yazılıyor:** Yusuf bütün bölümleri oynadı: 1-5 eğlenceli, Çayır sıkıcı, "fenere her seferde varıyorum ama hiç dolmuyor". Karar: fener kotası kalkıyor, sınır ilerler ([[2026-10-24-gece-derinlesir-fener-kotasi-kalkti]]): duraklar (lamba + fener, hepsi başlangıç noktası), bölgeler uzar, yağ yakımı ve ürem derinlikle artar, Şok Dalgası kademe 0'a. Sözleşme: depo `docs/gece-derinlesir.md`. Yazıldı, main'e commit edildi ve canlıya yayınlandı (`0ec7042`, 2026-10-24 akşam); bot: ana 36,4 / özensiz 48,7 sefer, Kalp 2,2 / 3,6 deneme; geç fener nöbetleri uzun (40-95 s) çünkü Kalp ~2100 güç istiyor (`VIGIL.light` sonraki düğme). Yusuf'un `?chapter=0` ve `?chapter=2` ile oynaması bekleniyor. Kırılan Dünya rafa alınacak (ayrı iş).
- **Doğrulanmayanlar:** sesleri hiçbir ajan dinlemedi; 13 Ekim özelliklerini insan oynamadı; Son Nöbet'in son birleşik hâli oynanmadı; gamepad 2. dilimi yalnız sahte gamepad'le denendi; yazısız işaretler ve fener halkası Yusuf'la denenmedi (halka ajanlara soluk geldi); Kalp'in halka uyarısı artık yazısız (görsel + ses), denenmedi. Oturum: [[2026-10-24-hikaye-rafta-yazisiz-ogretme-yayin]].

## Sıradaki işler
0. **Yusuf "gece derinleşir"i oynasın** (canlıda `0ec7042`; `?chapter=0`, `?chapter=2`, `?chapter=4`): sınır hissi, Çayır temposu, lamba adları, üst kenar parıltısı, geç fener nöbetlerinin uzunluğu. Oturum: [[2026-10-24-gece-derinlesir-kota-kalkti-yayin]]. Dönüşe göre: `SOOT.deepen`, Kalp (`VIGIL.light`) ve geç fenerlerin tutuşması birlikte ayarlanır.
1. **Kırılan Dünya rafa** (`BREAK.off` true + yıldızları gizle): Yusuf fark etmedi, ağaçlar karanlıkta okunmuyor. Küçük iş.
2. **Yazısız öğretme, faz 2** (2026-10-24): faz 1 canlıda. Simgeli hâlin değerlendirmesi; sonra seçenek 2 (ilk sefer koreografisi) kararı. Hikâye rafta, yeni özellikte yazılmaz.
3. **Ağacın "+%" yıldızlarını fiil yıldızlarına kes.** İlke: basış → dünyada görünür olay; otomatik zincirler (Nakarat, Tutuşma, Akkor, havuzlar) azalır ya da tek gürültülü şeye katlanır.
4. **İsin kamp yapıları.** Çayır'da isin ilk alıcısı artık Şok Dalgası (kademe 0); gerisi açık.
5. **Genel denge** (Yusuf'un kararı): Kayıtlar'daki "Şafağa kadar" satırı veri olsun; kota tabanlı eski ölçümler tarih.
6. **Bekleyen eski oynama soruları** (pervane adil mi, kamp işaretleri, kalın lazer, odak simgesi, kamera ve nöbet): arşivde.
7. **Sonraya:** standart dışı gamepad eşleme tablosu, kayan yıldızlar ve bölge olayları, ışığı kesen harita; Son Nöbet'in son dilimi (ses, ipuçları, adlar).

## Bilinen küçük eksikler
- Pencere değiştirip geri gelince basılı tutulan tuş yeniden basılana kadar yürütmez (bilinçli: tekrar olayları basış sayılmıyor).
- Puhu'nun istek değişti cümlesi (`p_swap`) tekil; artık birden fazla istek aynı anda değişebiliyor.
- Fener başa yakınken Parlama halkası bekçinin yüzüne biniyor (okunurluğu bozmuyor). *Kapandı: halkalar `b14f502` ile kalktı (canlıda).*
- Botun saati sefer başına sabit 4 sn ve ~3,4 sn geçiş ekliyor; sabit 4 sn'nin neyi karşıladığı belirsiz.
- Kapanan eksikler (2026-10-05):
  - Kapı direkleri artık katı.
  - Kamp köşeleri dolgularla kapandı.
  - Kandil'in balonu ekranda kalıyor.
  - Yapılamayan istek panodan hemen kalkıyor.
  - Canlı zaten `Cache-Control: no-cache` + ETag gönderiyormuş (ziroo-edge `ziroo-static.caddy`).

## Kararlar
- [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]]
- [[2026-10-02-isik-bekcisi-tasarim-kararlari]]
- [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]]
- [[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]]
- [[2026-10-02-masaustu-oyun-wasd-hareket-fare-isik]]
- [[2026-10-02-lazere-donusen-isin-yag-bedeli-ve-lazer-dusmanlari]]
- [[2026-10-02-hikaye-kampi-f-ile-konusma-ve-yumusak-gecisler]]
- [[2026-10-04-yaparak-ogren-ipuclari-oyunu-durduran-kart-yerine]]
- [[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]]
- [[2026-10-05-beceri-hazir-halkasi-bekcinin-uzerinde]]
- [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]]
- [[2026-10-05-zincirleme-yildizlar]]
- [[2026-10-05-denge-tier-scale-ile-eski-tempoya-donus]]
- [[2026-10-06-bekci-feneri-agacin-koku-kapi-kapali]]
- [[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]
- [[2026-10-06-yapisan-karacik-yavaslatir]]
- [[2026-10-06-pervane-doner-sonra-dalar]]
- [[2026-10-06-atilim-halkasi-imlecte]]
- [[2026-10-06-hale-tutar-bilincli-isik-bitirir]]
- [[2026-10-06-kabuklu-surusunu-korur-kirilinca-patlar]]
- [[2026-10-06-her-bolgeye-bir-elit]]
- [[2026-10-06-kamera-yakin-bekci-buyuk-arayuz-kalin]]
- [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]]
- [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]]
- [[2026-10-07-isi-fenerde-ve-kosede-imlecte-gosterge-yok]]
- [[2026-10-07-beceri-halkalari-bekciden-kalkti-yalniz-hazir-ani]]
- [[2026-10-07-isi-isinin-solmasi-ve-hale-kenarinda-anlatilir]]
- [[2026-10-07-kilitte-hale-kuculur-kilit-dort-saniye]]
- [[2026-10-07-odakta-kamera-kaymaz-fener-sabitlenir]]
- [[2026-10-07-kuzey-yolu-ileri-gitmenin-isareti]]
- [[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]
- [[2026-10-07-kalp-son-nobet-olarak-yeniden-tasarlanacak]]
- [[2026-10-08-son-nobet-safak-cemberi-tek-hedef-bes-bolge]]
- [[2026-10-08-lazer-incelmez-prizmalari-deler]]
- [[2026-10-08-gamepad-destegi-omuz-tuslari]]
- [[2026-10-08-fener-zayif-isiga-direnir-nobet-tavani-uzunluk-agacta]] (geçersiz)
- [[2026-10-12-kapi-yok-uzunluk-icerikten-atilim-silindi-sonsuz-yildizlar]]
- [[2026-10-12-is-yildiz-tozunun-yerine-tek-kaynak-gece]]
- [[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]]
- [[2026-10-13-kirilan-dunya-ve-zincir-firtina-yazildi]]
- [[2026-10-13-parlama-evrimi-sok-dalgasi-yanan-halka-gun-dogumu]]

## Dersler
- [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]]
- [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]]
- [[2026-10-02-kamera-kayarken-imlecin-dunya-konumu-da-kayar]]
- [[2026-10-02-duran-imlec-geri-alinamayan-esigi-gecirmemeli]]
- [[2026-10-02-tikla-git-yuruyusu-koselerde-takilir-tum-alani-tara]]
- [[2026-10-02-bekleme-kapisi-yerine-avdan-dolan-kapi]]
- [[2026-10-02-birlesmeden-sonra-her-sahneye-bak]]
- [[2026-10-02-paralel-ajan-dallarini-main-ile-ajana-birlestirtmek]]
- [[2026-10-04-urun-hissi-kararinda-once-secenek-goster]]
- [[2026-10-04-zorunlu-donus-noktasi-hikaye-kapisi-olabilir]]
- [[2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]]
- [[2026-10-05-paralel-dallar-ayni-olay-adini-farkli-anlamda-kullanabilir]]
- [[2026-10-05-gizli-panelde-canvas-goruntusu-yerel-aliciyla]]
- [[2026-10-05-yakalama-basina-odul-sinerjiyi-carpana-cevirir]]
- [[2026-10-06-gorunum-birlestirme-okunurlugu-geriletebilir]]
- [[2026-10-06-buyuyen-isaret-en-yakin-nokta-tiklamasini-bozar]]
- [[2026-10-06-tehdidi-hic-karsilamayan-bot-onu-vergi-gibi-oder]]
- [[2026-10-06-kamera-kaymasi-tehdidi-ekran-disina-iter]]
- [[2026-10-06-angarya-sanilan-adim-gizli-gelir-olabilir]]
- [[2026-10-06-olayla-tiklenen-ipucu-kacabilir-durum-sorgula]]
- [[2026-10-07-baskin-stratejiyi-bot-varyantiyla-olc]]
- [[2026-10-07-sayidaki-zayiflama-hissedilmez]]
- [[2026-10-07-kilit-cezasi-mola-olabilir]]
- [[2026-10-07-isiga-duyarlilik-siniri-tek-yerde-sayilmali]]
- [[2026-10-07-kirmizi-isin-guclenme-gibi-okunur]]
- [[2026-10-07-ilk-gercek-olcum-kamp-suresi-botun-iki-kati]]
- [[2026-10-07-uzun-sefer-icin-yag-yetmez-av-yenilenmeli]]
- [[2026-10-08-iki-hedefli-boss-oyuncuyu-bir-noktaya-baglar]]
- [[2026-10-08-mac-te-gamepad-tarayiciya-yalniz-bluetooth-ile-gorunur]]
- [[2026-10-08-ajan-worktree-i-eski-commit-ten-acilabilir]]
- [[2026-10-08-kota-kapisi-agac-dolunca-olu-sefer-uretir]]
- [[2026-10-13-ayri-olculen-ozellikler-ust-uste-binince-kisaltir]]
- [[2026-10-13-ikinci-evre-ajani-birinci-evrenin-hatasini-bulur]]

## Oturumlar
- [[10-Projects/isik-bekcisi/sessions/2026-10-17-isik-bekcisi-guncel-durum-arsivi|2026-10-17 güncel durum arşivi]]: overview'un kısaltma öncesi durum tablosu ve devir listeleri, olduğu gibi
- [[2026-10-02-iki-oyun-yayin-ve-kamp-yenilemesi]]
- [[2026-10-02-ikinci-geri-bildirim-turu-lazer-hikaye-gecisler]]
- [[2026-10-04-ses-ayarlari-ve-yaparak-ogren-ipuclari]]
- [[2026-10-04-fener-seferi-bitirmez]]
- [[2026-10-04-devir-zorluk-ve-his-bulgulari]] (ZZ kökündeki tasarım dersinden devir)
- [[2026-10-05-devir-oyun-uzunlugu]] (ZZ kökündeki tasarım dersinden devir)
- [[2026-10-05-karanlik-surusu-zincirleme-yildizlar-beceri-halkasi]]
- [[2026-10-06-bekci-feneri-ve-okunurluk]]
- [[2026-10-06-oynama-geri-bildirimi-hale-elitler]]
- [[2026-10-06-devir-genex-dogrulama-fikirleri]] (ZZ kökündeki Genex incelemesinden devir; tartışılacak)
- [[2026-10-06-kamera-ve-fener-nobeti]]
- [[2026-10-07-cam-isinir-ve-isi-gostergesi]]
- [[2026-10-07-oynama-turu-cam-yon-uzunluk-kalp]]
- [[2026-10-08-son-nobet-gamepad-lazer-yayin]]
- [[2026-10-08-nobet-tavani-ve-uzunluk-agacta]]
- [[2026-10-12-tavan-kalkti-atilim-silindi-is-geldi]]
- [[2026-10-13-kirilan-dunya-firtina-parlama-evrimi-yayin]]
