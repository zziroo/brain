---
type: project
project: isik-bekcisi
date: 2026-10-13
status: active
tags: [isik-bekcisi, oyun, incremental, kosu-tabanli, canvas]
source: C:\Users\yusuf\ZZ\zProjects\incremantal-game (CLAUDE.md); oturumlar 2026-10-02 (6d8df6c2, 72fd0708), 2026-10-04 (9e4d0124), 2026-10-05 (53393f9a), 2026-10-06 (fb8e3060, iki tur), 2026-10-07 (e5a9fa92 / 5f403d52, akşam 1249d80e), 2026-10-07 gece → 10-08 (dd56e56a + a15a1fc5), 2026-10-08 (nöbet tavanı), 2026-10-12 → 10-13 (b89a4bee: tavan kalktı, Atılım silindi, İs)
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

## Durum (2026-10-13)
| Parça | Durum |
|---|---|
| **main `9509943`, canlı = main (2026-10-13 gece)** | **Parlama evrimi** (Şok Dalgası, Yanan Halka, Gün Doğumu; [[2026-10-13-parlama-evrimi-sok-dalgasi-yanan-halka-gun-dogumu]]) yazıldı, incelendi, **yayında**; bot ana 35,4 / özensiz 44,5 (günün üçü birlikte ~1,4 / ~2,7 sefer kısalttı, ağaç kesiminde geri verilecek). Canlıda: **Kırılan Dünya** (ağaç yanar, kaya çatlar, sütun/duvar devrilir; 5 fiil yıldızı) ve **Zincir Fırtına** (Çatal, Fırtına, Gök Gürlemesi) yazıldı, incelendi, dengelendi, birleşti ([[2026-10-13-kirilan-dunya-ve-zincir-firtina-yazildi]]). Bot: ana 37,5 / özensiz 46,8 sefer (önce 36,8 / 47,2). İnsan oynamadı, ses dinlenmedi |
| main `7fd304a` (2026-10-12/13) | Nöbet tavanı **kaldırıldı**, fenerler normal dolar; Atılım (Kor İzi, Kayan Yıldız) **silindi**; her kademede **sonsuz yıldızlar** (Sönmez Fitil, Dipsiz Hazne, Taşkın Bereket; mühür yok); `?chapter=N` / `?chapter=new` bölüm kaydı (onay + yedek); **İs** yıldız tozunun yerini aldı (tek kaynak: yakılan gece). Kayıt sürümü 7: yayınlanınca eski kayıtlar sıfırlanır (Yusuf kabul etti). İki dilim ayrı incelendi, orta bulgular düzeltildi. Bot: özensiz ~48 sefer / ~117 dk, insan ~162 dk; Kalp kolaylaştı (~2 deneme), sonra ayarlanacak. İnsan oynamadı ([[2026-10-12-kapi-yok-uzunluk-icerikten-atilim-silindi-sonsuz-yildizlar]], [[2026-10-12-is-yildiz-tozunun-yerine-tek-kaynak-gece]]) |
| Yayın | **canlı = `9509943`** (2026-10-13 gece: Parlama evrimi de). Önceki: `a8264f4` (Kırılan Dünya + Zincir Fırtına). Önceki: `7fd304a` (2026-10-13; İs, sonsuz yıldızlar, tavan yok; eski kayıtlar sıfırlandı). Önceki: `ec77919` (2026-10-08 akşam; Yusuf "pushla canlıya al"; `deploy.sh`, dört ana dosya canlıyla birebir). İçinde: nöbet tavanı + uzun ilk seferler. Önceki canlılar: `b2bedf1` (uzun seferler, Son Nöbet, kalın lazer, gamepad), `a8bebee`, `a67e9cb`, `b14f502` |
| Nöbet tavanı + uzunluk ağaçta (2026-10-08) | **canlıda, main'de kaldırıldı** (2026-10-12). İncelendi (0 orta+, 10 düşük düzeltildi), koordinatör sayfada duman testi yaptı (tavan, v4 kayıt göçü). Botta ana ~37–38 sefer / ~82–86 dk, özensiz ~47–48 / ~94–98 dk, ölü sefer 0; Kalp aynı. Harabeler 5,7–6,6 sefer (hedef 7–9) ve özensiz botta Orman ~9,5 açık. İnsan oynamadı, ses dinlenmedi ([[2026-10-08-fener-zayif-isiga-direnir-nobet-tavani-uzunluk-agacta]]) |
| Isının okunması (2026-10-07 akşam) | **canlıda.** Köşedeki simge boşalıyor; kırmızıda ışın solup daralıyor, kızıllık fenerin yanında, bekçinin yüzü temiz; halenin kenarında ışın yönünde iki yandan azalan kor yay (H1b); kilitte hale küçük, kilit 4 sn; `outDip` kaldırıldı. Odaklanınca kamera kaymıyor, fener sabitleniyor. İncelendi (1 orta, şüpheci doğruladı, düzeltildi). Sesler dinlenmedi ([[2026-10-07-isi-isinin-solmasi-ve-hale-kenarinda-anlatilir]], [[2026-10-07-kilitte-hale-kuculur-kilit-dort-saniye]], [[2026-10-07-odakta-kamera-kaymaz-fener-sabitlenir]]) |
| Kuzey Yolu (yön) | **canlıda** (`a67e9cb`'den beri): yol, kuzeye akan ışık, kararan yanlar, ilk üç seferde ipucu, Kandil'in cümlesi; bot aynı. İki inceleme, 0 orta+ ([[2026-10-07-kuzey-yolu-ileri-gitmenin-isareti]]) |
| Uzun seferler + Yol Fenerleri + ruh yenilenmesi | **canlıda** (2026-10-08). İncelendi (1 orta: gerideki yol feneri de dolduruyordu, düzeltildi; 5 düşük). Botta ana ~37,5 sefer / ~84 dk, özensiz ~48 / ~96 dk; insan tahmini ~135–139 dk ([[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]) |
| Son Nöbet (Kalp) | **canlıda** (2026-10-08). Üç tur Yusuf oynadı (Şafak Feneri → Şafak Çemberi → elitler); son birleşik hâli (beş bölge, basamak geçişi, duvar kırma) oynanmadı. Özensiz bot ~5,6, ana ~2,8 deneme. Her tur incelendi (orta bulgular şüpheciyle, hepsi düzeltildi). Sesler dinlenmedi ([[2026-10-08-son-nobet-safak-cemberi-tek-hedef-bes-bolge]]) |
| Lazer | **canlıda** (2026-10-08): incelmiyor, prizmaları deliyor; Yusuf oynamadı ([[2026-10-08-lazer-incelmez-prizmalari-deler]]) |
| Gamepad | **canlıda**: 1. dilim (sefer, kamp, konuşma) Yusuf'un Flydigi'siyle Bluetooth üzerinden görüldü; 2. dilim (gökyüzü, paneller, ayarlar) yalnız sahte gamepad'le test edildi ([[2026-10-08-gamepad-destegi-omuz-tuslari]]) |
| Camın ısısı (ilk sürüm, `b14f502`) | yerini "Isının okunması" satırı aldı; açık bulguların hepsi `cf358c1` ile kapandı ([[2026-10-07-cam-isinir-ve-isi-gostergesi]]) |
| Oynama turu 2026-10-06 (yapışma yavaşlatır, pervane döner-dalar, Atılım imleçte, hale tutar, kabuklu sürüsü, elitler) | hepsi yazıldı, incelendi (kritik/yüksek yok; 3 orta, şüpheci ile), canlıda. Sesler dinlenmedi, 60 karede izlenmedi, insan oynamadı ([[2026-10-06-oynama-geri-bildirimi-hale-elitler]]) |
| Kamera yakın + bekçi 1,2× + kalın HUD; **Fener Nöbeti** (fenerin son beşte biri kuşatma) | main'de ve **canlıda** (`a352450`, `8b10c02`→`74dc1f7`). İkisi de incelendi (0 orta+; 7 + 7 düşük, hepsi düzeltildi), koordinatör main'de duman testi yaptı. Botta uzunluk aynı, şekil değişti: 3.–5. fener erken, Kalp ~7–8 deneme (Yusuf'un onayı bekleniyor). İnsan oynamadı, ses dinlenmedi ([[2026-10-06-kamera-yakin-bekci-buyuk-arayuz-kalin]], [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]]) |
| Bekçi Feneri (ilk yükseltme, kapalı kapı) | yazıldı, incelendi (0 kritik/yüksek/orta, 7 düşük, hepsi düzeltildi), canlıda; ilk ziyaret gerçek olaylarla oynatıldı, insan oynamadı ([[2026-10-06-bekci-feneri-agacin-koku-kapi-kapali]]) |
| Okunurluk (kamp işaretleri S3, gece E3, pervane) | 4+4 seçenek gerçek ekran görüntüleriyle karşılaştırıldı, Yusuf S3 ve E3'ü seçti; incelendi (1 orta → şüpheci düşüğe indirdi, düzeltildi), canlıda. Hareket hâli 60 karede görülmedi ([[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]) |
| Süre ölçümü | `S.totalTime` (kamp dahil; başlıktan sonra, sayfa görünürken, 60 sn dokunulmazsa durur) ve ilk şafak (`S.stat.winRuns / winRoad / winTotal`). Günlükteki Kayıtlar'da ("Şafağa kadar: N sefer · süre") ve oyun sonu ekranında görünür. Eski kayıtlarda toplam süre 0'dan başlar |
| Beceri halkası, karacık ailesi, zincirleme yıldızlar | yazıldı, incelendi (3 dal incelemesi: 0 kritik/yüksek, 1 orta, 9 düşük; hepsi düzeltildi), birleşti; görsel denetim canvas görüntüleriyle yapıldı. Gerçek kare döngüsüyle oynanmadı, sesler dinlenmedi ([[2026-10-05-karanlik-surusu-zincirleme-yildizlar-beceri-halkasi]]) |
| Fener ve sefer | 1.–4. fener seferi bitirmez, 5. bitirir ([[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]]); iki inceleme + şüpheci; tek seferde iki fener tarayıcıda denenmedi |
| Öğretici ipuçları | "yaparak öğren": oyunu durdurmaz, şeyin yanında çıkar, yapınca tik alır ([[2026-10-04-yaparak-ogren-ipuclari-oyunu-durduran-kart-yerine]]); insan oyuncuyla denenmedi. **Yusuf: tamamen değiştirilebilir** |
| Ses ayarları | Genel / Müzik / Efektler / Ortam kaydırıcıları + sessiz düğmesi; kulakla dinlenmedi |
| Kontroller / masaüstü | yazıldı, incelendi, birleşti ([[2026-10-02-masaustu-oyun-wasd-hareket-fare-isik]]) |
| Lazer, yağ bedeli, kabuklu / prizma / diken, açılan Kalp | yazıldı, incelendi, birleşti; botla dengelendi |
| Gökyüzü ekranı | yeniden yazıldı, incelendi, birleşti |
| Hikâye (metin + bağlama) | 29 konuşma, 82 ara söz, 48 tepki, 7 günce sayfası (karacık satırları eklendi); incelendi, birleşti; Türkçeyi Yusuf'tan başka ana dili konuşan okumadı |
| Geçişler | yazıldı, incelendi, birleşti; hareket kare kare değerlendirildi, 60 karede izlenmedi |
| Denge | **2026-10-08:** uzunluk artık kotada değil kademe maliyetlerinde (`TIER_SCALE` [2,1, 110, 5800, 97000, 1,8M]); temel yağ 40, ilk sefer 40 sn, Çayır ~70, Bataklık ~100, Mağara ~130, Harabeler ~135 sn. **Eski ara durum (2026-10-06):** özensiz (insana yakın) bot ~40–41 sefer, ana bot ~37; genel ayar bilerek yapılmadı, hedef uzunluk Yusuf'ta. Hissi değiştiren ayarlar özensiz bota göre ([[2026-10-06-tehdidi-hic-karsilamayan-bot-onu-vergi-gibi-oder]]). Önceki: bot ~43 sefer / ~47 dk istek ve iksirle, ~51 / ~55 onlarsız; Kalp 3–4 deneme (1–6). Yıldızların kısalttığı tempo `TIER_SCALE` 2–4 ile eski hâline döndü ([[2026-10-05-denge-tier-scale-ile-eski-tempoya-donus]]). Botun nişanı mükemmel; özensiz bot varyantı da var (`"bot":"sloppy"`). Gerçek oyuncu ölçümü yok |
| Ses | hiçbir ajan dinlemedi: ışın uğultusu, kamp ateşi ve rüzgâr yatağı, konuşma sesleri, geçiş sesleri seviyeleri tahmin |
| Eski kayıtlar | yüklenir; yıldız fiyatları 2.–4. kademede yine arttı (2026-10-05, eski oyuncu da öder); `S.story` göçü var; yeni istek türü `soot` eski kayıtta sorunsuz |
| İnceleme kapısı | 2026-10-06: iki opus incelemesi + bir sonnet şüpheci. 2026-10-05: 3 dal incelemesi (sonnet + 2 opus; 1 orta, 9 düşük), şüpheci gerekmedi; denge diff'ini koordinatör okudu |

## Sıradaki işler
-6. **Sıradaki oturum (2026-10-13 akşam devri):** Yusuf yerelde (`?chapter=N`) ya da yayınlanınca canlıda oynasın: ağaç tutuşturma hissi, alevlerin görünüşü, kaya kırmanın boş gelip gelmediği, fırtına ve gök yıldırımı, sesler. Sonra sırayla: **Parlama evrimi** (şok dalgası → yanan halka → gün doğumu), ağacın "+%" yıldızlarının fiil yıldızlarına kesimi, isin kamp yapıları, Kalp ayarı (`VIGIL.light`). Hepsi canlıda (`9509943`); Yusuf oynayıp genel yorum verecek (alevler ekran görüntüsünde garip geldi).
-5. **Sıradaki oturum (2026-10-13 devri):** yön kararı [[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]]: içerik genişliği değil, güçlenme ekranda görünsün. Önerilen sıra: **dünya kırılır** (ağaç/kaya/sütun/prizma hedef, lazer süpürür) → Parlama evrimi (şok dalgası → yanan halka → gün doğumu) → zincir fırtına; ağaç "+%" yıldızlarından arındırılıp fiil açan yıldızlara kesilir; isin kamp yapıları; sonra Kalp'in ayarı (`VIGIL.light`). Yusuf yerelde `?chapter=N` ile oynayabilir; yayın onun kararı. Açık: Çayır'da is birikiyor (ilk is yıldızı 1. fenerden sonra); gece hâlâ az kıvılcım bırakıyor.
-4. **Sıradaki oturum (2026-10-08 akşamından devir):**
   1. **Yusuf canlıda sıfırdan oynayacak (nöbet tavanı):** her sefer sonunda fenere uğrayıp "biraz daha ileri" görmek eğlenceli mi, tekdüze mi; "Fitil al" cevabı açık mı (tavan yalnız Fitil'den: dar gelirse ölçü genişletilir); nöbet dalgaları fazla kolay mı (bota görünmüyor, elle sertleştirilir); 40 sn'lik ilk sefer ve ~70 sn'lik Çayır seferleri; iki notalı "henüz değil" sesi. Kayıtlar'daki "N. Fener: ağaç X. seferde doldu · Y. seferde yandı" satırları veri.
   2. Açık denge: Harabeler 5,7–6,6 sefer (hedef 7–9; kısa sefer ister, 135 sn uzlaşma), özensiz botta Orman 9,3–9,8.
-3. **Önceki devir (2026-10-08 sabah):**
   1. **Yusuf canlıda oynayacak:** kalın lazer ("delme" yalnız prizmalarda; yeterli mi; genişlik 30 iyi mi), Kalp'in son hâli (beş bölge, basamak geçişi, duvar kırma, tam build'de yoğunluk), gamepad'in 2. dilimi (gökyüzü, paneller), arena yağı 3,2 farklı hissettiriyor mu.
   2. **Son Nöbet son dilimi:** ses (kulakla), ipuçları, Kalp'e kaybetme sonrası iki eski hikâye cümlesi (`r.heart.low1`, `high1`), adlar (Yusuf: "sonradan değiştiririz").
   3. **Atılımı kaldırmayı incele** (Yusuf: "fazladan bir mekanik gibi"; karar yok). Bot zaten atılmıyor; Atılım, Kor İzi ve Kayan Yıldız yerine yıldız seçenekleri gösterilecek, sahiplerine iade, Kurukafa'nın çift dalışı yürüyerek ölçülecek.
   4. **Arayüz ve kamera turu:** odak simgesi büyük olsun (Yusuf).
   5. Sonraya: standart olmayan gamepad'ler için eşleme tablosu; yalnız gamepad'li cihazlar (başlıkta "bilgisayar oyunu" notu); kayan yıldızlar / eski bekçi fenerleri / bölge olayları; ışığı kesen harita.
-1. **Kamera + Fener Nöbeti canlıda** (2026-10-06 akşam). Yusuf oynarken bakılacak: bekçi artık yeterince büyük mü, Mağara'da gece hâlâ okunuyor mu, nöbet 12–18 s iyi mi, Kalp'te takılma hissi var mı (bot 7–8 deneme; ilk kaldıraç `BOSS.bounty`).
-0.5. **İs ekonomisi** (Yusuf'un fikri, "şimdilik bekle"): yanan karanlık **is** bırakır, kampta arıtılır; A kamp yapıları (öneri) / B mürekkep-atlas / C iksir bedeli. Nöbet ve kamera oynandıktan sonra A için tasarım notu ([[2026-10-06-kamera-ve-fener-nobeti]]).
0. **Genel denge hedefi (Yusuf'un kararı):** eski tempo mu (özensiz bot ~46 sefer), daha uzun mu? Öneri: önce yeni hale, kabuklu ve elitleri birkaç sefer oynasın; günlükteki "Şafağa kadar" satırı ve yolda geçen süre veri olsun. Sonra `TIER_SCALE` ile tek seferde ayar.
   - Oynayınca bakılacaklar (2026-10-06 turu): yanmış karacık halkası zorluyor mu sıkıyor mu; odaklanıp camdan yakmak hissediliyor mu; kabuk kırmak tatmin edici mi; pervaneden kaçmak adil mi (hazırlık 0,4 sn); elitler direnç veriyor mu, Kurukafa haksız mı.
0b. **Daha önce:** Yusuf canlıda kendisi oynuyor (2026-10-06). Ondan beklenen geri bildirim:
   - Ormanda pervaneler artık zamanında fark ediliyor mu? Hâlâ haksız geliyorsa sıradakiler: yaklaşan kanat çırpma sesi ve halenin kenarında bir tur dönüp öyle dalma (bu davranış dengeyi değiştirir).
   - İlk açılışta fener alma adımı akıcı mı, kapı gereksiz yere bekletiyor mu?
   - Kamp işaretleri artık yeterince belirgin mi?
1. **Onaylı sıranın üçü de yerelde bitti** (2026-10-05; Yusuf "hepsini sen yap" dedi, seçimleri Claude yaptı): beceri halkası, karacık ailesi, zincirleme yıldızlar, küçük düzeltmeler, denge ([[2026-10-04-devir-zorluk-ve-his-bulgulari]] → [[2026-10-05-karanlik-surusu-zincirleme-yildizlar-beceri-halkasi]]). **Yayınlandı** (2026-10-05, `42fc571`). Sırada Yusuf ve arkadaşları oynasın. Bitirenler günlüğün Kayıtlar sayfasındaki "Şafağa kadar" satırını (sefer, toplam süre) ve "Yolda geçen süre"yi söylesin. Bunlar botla ve uzunluk sorusuyla karşılaştırılacak ([[2026-10-05-devir-oyun-uzunlugu]]).
   - Oynayınca bakılacaklar:
     - Karacık Çayır'da yeterince direnç veriyor mu, geç oyunda neredeyse zararsız olması iyi mi?
     - Fener başındaki kuşatma nasıl hissettiriyor?
     - Güçlü kayıtla Bataklık'ta ekran çok mu kalabalık?
     - Halka ve sesler yerinde mi?
     - Ürkek ruh artık iyi hissettiriyor mu?
   - **Öğretici baştan tasarlanabilir** (Yusuf, 2026-10-04): durdurmayan 2–3 yeni yaklaşım seçenek olarak gösterilsin. Tek vuruşta kabuklu, tıkla-git ve kalabalıkta taraf değiştirme sorunları 2026-10-05'te düzeltildi. Kabuk / prizma / diken / Kalp için canlandırma hâlâ açık.
   - **Oyun uzunluğu** (Yusuf, 2026-10-05: "bu tür oyunları 3–4 saatte bitiriyorum, bizimki kısa mı?"). İnsan için tahmin ~1–1,5 saat; seferler baştan sona ~40 sn. Öneri: maliyet değil, sefer uzaması + içerik; hedef ~2–2,5 saat; önce gerçek oyuncu ölç. Hedef süre Yusuf'un kararı: [[2026-10-05-devir-oyun-uzunlugu]].
2. Oynama geri bildirimi: WASD + fare iyi geldi mi; lazer ve yağ bedeli hissediliyor mu; kabuklu / prizma / diken okunuyor mu; konuşmalar fazla mı az mı; geçişler yavaş mı.
3. İnsan temposu ölçülünce denge; istek ödülleri ve iksir bekleme süresi hâlâ insan tarafından denenmedi.

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
