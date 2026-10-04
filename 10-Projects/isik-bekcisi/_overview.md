---
type: project
project: isik-bekcisi
date: 2026-10-04
status: active
tags: [isik-bekcisi, oyun, incremental, kosu-tabanli, canvas]
source: C:\Users\yusuf\ZZ\zProjects\incremantal-game (CLAUDE.md); oturumlar 2026-10-02 (6d8df6c2, 72fd0708), 2026-10-04 (9e4d0124)
---

# Işık Bekçisi: fenerle karanlık vadiye koşular yapılan koşu-tabanlı incremental oyun

## Amaç
Yusuf'un asıl istediği tür: belli bir süre aktif oynanan, kampa dönüp geliştirme alınan ve tekrar çıkılan döngü (Shelldiver, Rock Bottom; [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]). İlk deneme idle çıkmıştı ([[10-Projects/bal-vadisi/_overview|Bal Vadisi]], [[2026-10-02-idle-degil-kosu-tabanli-incremental-istendi]]). Analizden sonra Yusuf bu konsepti onayladı: "elinden gelenin en iyisini yap, en kaliteli şekilde tasarla". **Masaüstü oyunu** (klavye + fare); mobil yok.

## Oyun
- **Sefer:** bekçi WASD ile yürür; fener imlece bakar. Sol tuş (ya da F) basılı = odak ışını; Boşluk = parlama; Shift / Q / sağ tık = atılım. Fenerin ışığındaki ruhlar "dolar" ve yakalanır; kıvılcım bırakır. Seferi **fener yağı** sınırlar; derin bölgede ve odaklıyken daha hızlı yanar.
- **Işın → lazer:** Mercek hattı (Mercek → Hüzme → Işın → Yıldız Mızrağı) koniyi daraltıp uzatır: erken oyunda meşale, ortada spot, harabelerde lazer çizgisi; hedefte tutuldukça ısınır. Odaklanmak yağı 1,7–2,5 kat yakar (fitilde "×1,8" etiketi); Damıtık Yağ düşürür. Geç bölgeler lazer ister: kabuklu ruh, prizma (ışını böler), gece dikeni (yağ emen halka), açılan Kalp. Ayrıntı: [[2026-10-02-lazere-donusen-isin-yag-bedeli-ve-lazer-dusmanlari]].
- **Kamp (gezilebilir üs, hikâye anlatır):** bekçi ateşin başında uyanır. E istasyonu kullanır, **F konuşur** (sakine tıklamak da). Teleskop + Ülker → gökyüzü (beceri ağacı); kapı + Kandil → sefer (kapıdan W ile yürüyerek; Kandil'in fenerine tıklayınca yanan fenerlerden başlangıç); pano + Puhu (1. fenerden sonra) → istekler; kazan + Vırak (2. fenerden sonra) → iksir; kamp ateşi → defter (Günce + Kayıtlar). Yeni sözü olan sakinin başında konuşma işareti; konuşmalar alttaki plakada akar; sefer sonrası bir sakin sefere tepki verir. Hikâyenin özü ve kuralları: [[2026-10-02-hikaye-kampi-f-ile-konusma-ve-yumusak-gecisler]]. Kamp ilerlemeyle büyür.
- **Beceri ağacı:** gece göğünde takımyıldızı (8 kol, 55 yıldız). Beş durum ilk bakışta ayrı (tamam / alınmış / şimdi alınabilir / pahalı / kilitli), sonraki kademenin soluk önizlemesi, satın alma "yıldız yakma" animasyonu, kör satın alma yok. Bilgi kutusu imlecin yanında, en az yıldızı örten tarafta.
- **Derinlik:** 5 bölge: Çayır, Orman (pervaneler), Bataklık (ürkek ruhlar, sis, ilk kabuklular), Kristal Mağara (patlayan kristaller, prizmalar), Harabeler (gölgeler, dikenler, prizmalar).
- **Fenerler:** bölgedeki avın ışığı fenere kendiliğinden akar (%80'e kadar), son kısmı başında tamamlanır. 1.–4. fener yanınca sefer **sürer** (1,8 sn yağ yanmaz, dolum yok, kalan yağla sonraki bölgeye); 5. fener seferi bitirir, Kalp ancak kamptan sonra ([[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]]).
- **Geçişler:** kapıdan çıkış kesintisiz (fener 1 sn'de yakılır), fenerden başlama bir yolculuk kartı, yağ bitince sönen alev ve eve süzülen kor, kampta ateş başında uyanış, teleskopa iris. Sefer başına ~2 sn.
- **Final:** Gecenin Kalbi (3 fazlı; gölge çağırır, boşluklu karanlık halkalar atar; gölge çağırınca 3,2 sn açılır ve ışın iki kat işler). Kazanınca şafak; kuzey alacakaranlık kalır, seferler sürer.
- **Arayüz ("gece atlası"):** serif, ince çift çerçeveli plakalar, çentikli düğmeler, kendi çizgi ikonları, fitil göstergesi. Bal Vadisi'nden bilinçli ayrı.

## Teknoloji
- Düz JS ES modülleri + Canvas 2D, derleme yok, dış dosya yok. ~9.000 satır JS.
- Klasör: `C:\Users\yusuf\ZZ\zProjects\incremantal-game`. Çalıştırma: `node serve.mjs` → http://localhost:5174.
- Kural: oyun kuralları `run.js` / `camp.js` / `quests.js` / `talk.js` / `state.js` / `data.js` içinde, DOM'suz; hikâye metni `story.js`; her şey `emit` üzerinden. Bot başsız oynar.
- Test: `tools/dev.js` (`timerFrames` / `manualFrames` + `ev`, `campSweep`), `tools/sim.js` + `sim-node.mjs` (denge botu), `tools/story-check.mjs` (hikâye). **Sözdizimi: `node --input-type=module --check < dosya`** (`node --check` bu makinede ESM hatası yakalamıyor). Ayrıntı deponun `CLAUDE.md` dosyasında.
- **Canlı:** https://games.ziroo.net/isik-bekcisi · liste https://games.ziroo.net/ (2026-10-03'ten beri; eski adresler 301; oyun kayıtları yeni kökte sıfırdan başladı). Yayın: `bash deploy/deploy.sh`; liste sayfası `bal-vadisi` deposundaki `deploy/deploy.sh` ile. Kurallar: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] (eski: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]). Betik `/opt/ziroo-www/games/isik-bekcisi`e yayınlıyor (2026-10-03 geçişte kullanıldı). Yayın Yusuf'un kararı.
- Git: GitHub (özel) https://github.com/yusufholat/isik-bekcisi, dal `main`.

## Durum (2026-10-04)
| Parça | Durum |
|---|---|
| Yayın | **canlı = `071332d`** (2026-10-04, Yusuf'un onayıyla `deploy/deploy.sh`; canlı dosyalarda yeni kod görüldü). GitHub'a push edildi; yerel ve uzak `main` eşit |
| Fener ve sefer | 1.–4. fener seferi bitirmez, 5. bitirir ([[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]]); iki inceleme + şüpheci; tek seferde iki fener tarayıcıda denenmedi |
| Öğretici ipuçları | "yaparak öğren": oyunu durdurmaz, şeyin yanında çıkar, yapınca tik alır ([[2026-10-04-yaparak-ogren-ipuclari-oyunu-durduran-kart-yerine]]); insan oyuncuyla denenmedi. **Yusuf: tamamen değiştirilebilir** |
| Ses ayarları | Genel / Müzik / Efektler / Ortam kaydırıcıları + sessiz düğmesi; kulakla dinlenmedi |
| Kontroller / masaüstü | yazıldı, incelendi, birleşti ([[2026-10-02-masaustu-oyun-wasd-hareket-fare-isik]]) |
| Lazer, yağ bedeli, kabuklu / prizma / diken, açılan Kalp | yazıldı, incelendi, birleşti; botla dengelendi |
| Gökyüzü ekranı | yeniden yazıldı, incelendi, birleşti |
| Hikâye (metin + bağlama) | 29 konuşma, 79 ara söz, 46 tepki, 7 günce sayfası; incelendi, birleşti; Türkçeyi Yusuf'tan başka ana dili konuşan okumadı |
| Geçişler | yazıldı, incelendi, birleşti; hareket kare kare değerlendirildi, 60 karede izlenmedi |
| Denge | bot (fener değişikliğinden sonra): ~43 sefer / ~46 dk istek ve iksirle, ~50 / ~53 onlarsız; Kalp ~3,4 deneme. Botun nişanı mükemmel, geç oyun sayıları insana göre iyimser. Gerçek oyuncu ölçümü yok |
| Ses | hiçbir ajan dinlemedi: ışın uğultusu, kamp ateşi ve rüzgâr yatağı, konuşma sesleri, geçiş sesleri seviyeleri tahmin |
| Eski kayıtlar | yüklenir; yıldız fiyatları 2.–4. kademede arttı (eski oyuncu da öder); `S.story` göçü var |
| İnceleme kapısı | bu tur 5 dal incelemesi (0 kritik/yüksek, 6 orta, ~27 düşük; hepsi düzeltildi), 1 şüpheci, 1 düzeltme doğrulayıcısı |

## Sıradaki işler
0. Yayınlandı. Yusuf ve arkadaşları oynasın: fenerden sonra yürümeye devam hissi, lazer hissi, geçiş temposu, ses seviyeleri, hikâyenin Türkçesi.
   - **Öğretici baştan tasarlanabilir** (Yusuf, 2026-10-04): durdurmayan 2–3 yeni yaklaşım seçenek olarak gösterilsin. Eski açık sorular (kabuk / prizma / diken / Kalp için canlandırma; tek vuruşta kabuklu tik yok, tıkla-git "yürü"yü tikliyor, kalabalıkta kutu taraf değiştiriyor) bu tasarıma girdi.
   - **Erken bölgelerde zorluk yok** (Yusuf, 2026-10-04): Çayır'da hiçbir tehdit yok, ışın bir şeyi "öldürmüyor". Seçenekler (karanlığın kendisi düşman / kaçan ruhlar / ustalık ödülü) [[ders-02-zorluk-dusmandan-gelmez]] içinde; karar bekliyor.
1. Oynama geri bildirimi: WASD + fare iyi geldi mi; lazer ve yağ bedeli hissediliyor mu; kabuklu / prizma / diken okunuyor mu; konuşmalar fazla mı az mı; geçişler yavaş mı.
2. Küçük yerleşim: Kandil'in balonu kapıda ekranın üst kenarına taşabiliyor (1366×768).
3. 5. fenerden sonra gölge / pervane / ürkek / yaşlı istekleri de yapılamaz olunca panodan çekilsin (şu an 4 boş seferde değişiyor).
4. İnsan temposu ölçülünce denge; istek ödülleri ve iksir bekleme süresi hâlâ insan tarafından denenmedi.

## Bilinen küçük eksikler
- Sefer sırasında kapı direkleri katı değil (yalnız görsel).
- Kampta klavyeyle iki köşeye (Kandil'in doğusundaki çit dibi, kazan ile Vırak arası) girilebilir; yön değiştirmek yeter.
- Sunucuda `Cache-Control` yok: yüklemeden sonra eski sürüm bir süre görünebilir.
- Pencere değiştirip geri gelince basılı tutulan tuş yeniden basılana kadar yürütmez (bilinçli: tekrar olayları basış sayılmıyor).
- Bot fazladan ~2 sn'lik geçiş süresini saymıyor (sabit 4 sn/sefer ekliyor).

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
- [[10-Projects/bal-vadisi/lessons/2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]]

## Oturumlar
- [[2026-10-02-iki-oyun-yayin-ve-kamp-yenilemesi]]
- [[2026-10-02-ikinci-geri-bildirim-turu-lazer-hikaye-gecisler]]
- [[2026-10-04-ses-ayarlari-ve-yaparak-ogren-ipuclari]]
- [[2026-10-04-fener-seferi-bitirmez]]
