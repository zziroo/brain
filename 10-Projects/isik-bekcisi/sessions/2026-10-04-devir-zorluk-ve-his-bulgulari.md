---
type: session
project: isik-bekcisi
date: 2026-10-04
status: active
tags: [isik-bekcisi, devir, zorluk, oyun-hissi, beceri-gostergesi, niteliksel-yukseltme]
source: Claude Code oturumu 82134d2a (ZZ kökü, oyun tasarımı dersi); kod 071332d üzerinden okundu
---

# Devir: Yusuf'un oynama gözlemleri, koddaki karşılıkları ve onaylanan iş sırası (beceri işareti → karanlık düşmanlar → niteliksel yükseltmeler)

Bu not, ZZ kökündeki tasarım dersi oturumunun bulgularını oyun klasöründe (`C:\Users\yusuf\ZZ\zProjects\incremantal-game`) açılacak oturuma devreder. Yusuf: "iş yapacaksan burada yapmayalım", iş o oturumda yapılır. Satır numaraları 071332d içindir, kayabilir.

## Yusuf'un gözlemleri (2026-10-04, canlı sürümü oynadıktan sonra)
1. Genel yapı, animasyonlar ve oynanış iyi; ama ilk bölgelerde zorluk yok: ışın bir düşmanı öldürmüyor, Çayır'da düşman hiç yok.
2. Bataklık'taki kaçan ruhlar iyi hissettirmedi ("belki animasyondan, emin değilim").
3. Geç oyunda güçlenme hissi iyi ama ekran anında siliniyor, bütün ruhlar bitiyor.
4. Zincir gibi zincirleme etkili yükseltmeler oyunu sıkıcı olmaktan kurtarır; daha çok olmalı.
5. Becerilerin dolduğu anlaşılmıyor; sağ alta bakmak gerekiyor.

"Ne kadar cozy desem de eğlenceli olmalı."

## Koddaki karşılıkları
- **Tehdit takvimi:** Çayır'da hiçbir şey yok. `MOTH_EVERY = [0, 2.6, 4.2, 4.8, 4.8]` ve `SHELL_CHANCE = [0, 0, .045, .1, .12]` (`data.js`); ürkek ruh Bataklık'tan (`run.js` ~189); gölge yalnız Harabeler (`world.js` ~144); diken Harabeler.
- **Ürkek ruh** (`run.js` ~490–497): halenin ×1,15'inde kaçmaya başlar, yani ışığın hemen kenarında oyalanır; 120 hızla kaçar, 2,2 sn sonra 1,3 sn yorulur. `tired` hiçbir yerde çizilmiyor. Bekçinin temel hızı 100; Adım halkaları kademe başına +40'a kadar (Bataklık'a kadar en çok +120); ışın tutarken ×0,62 (`BEAM.slow`). Yani yürüyerek çoğu zaman yetişilir ama yavaş; ışın tutarken ruhtan yavaşsın. Altın ruh da kaçar (daha hızlı, 11 sn'de kaybolur).
- **Yoğunluk sabit:** `BASE_COUNT = [16, 17, 15, 14, 15]` parça başına. Güç üstel büyürken ekrandaki kalabalık büyümüyor, geç oyunda ekran silinir.
- **Niteliksel yıldızlar az ve geç:** 55 yıldızın ~10'u oynayışı değiştiriyor, gerisi sayı halkası. Kademe 0: Parlama, Atılım. Kademe 1: Zincir (yakalanan ışık 2 hedefe sıçrar), Ateş böcekleri. Kademe 2: Rüzgâr adımı (kombo ≥ 8 iken +%25 hız), Son nefes. Kademe 3: Dağlama, Yankı (parlama), Zincir II. Kademe 4: Kırılma. Kademe N, N fener yanınca görünür; ilk ~5 seferde yalnız Parlama ve Atılım var.
- **Beceri göstergesi:** yalnız sağ altta (`ui.js` ~293–298 `.ready` sınıfı, `style.css` ~310–316 halka). Hazır olunca ses yok, bekçinin üzerinde işaret yok. Bekleme: Parlama 8 sn (yıldızla seviye başına −0,5), Atılım 6 sn.

## Çerçeve
[[ders-02-zorluk-dusmandan-gelmez]] ve [[ders-03-guc-ancak-direncle-hissedilir]]:
- Zorluk = direnç + bedel + ustalık farkı.
- Zorluk ile hayal kırıklığı farklı şeylerdir.
- Güç ancak dirençle karşılaştırınca hissedilir. Çayır'ın kolaylığı ile geç oyunda ekranın silinmesi aynı kökten geliyor: direnç oyuncunun gücüyle birlikte büyümüyor.

## Onaylanan sıra (Yusuf, 2026-10-04)
1. **Beceri hazır işareti** (küçük, hemen hissedilir)
2. **Karanlık düşman ailesi ve güçle büyüyen yoğunluk** (asıl büyük iş)
3. **Erken gelen, birbirini tetikleyen niteliksel yükseltmeler**

Üçü de oyunun hissini değiştirir. Her birinde önce 2–3 seçeneği hareketli taslakla göster, Yusuf seçsin, sonra yaz ([[2026-10-04-urun-hissi-kararinda-once-secenek-goster]]).

### 1. Beceri hazır işareti: hazırlanan seçenekler (Yusuf'a henüz gösterilmedi)
- **A. Parıltı (yalnız an):** Beceri dolduğu an fenerde yıldız parıltısı, ince genişleyen bir halka ve kısa bir çan sesi. Atılım için ayak dibinde kıvılcım savrulması ve daha pes bir ses. Sürekli bilgi yok. Eksisi: an kaçarsa yine köşeye bakılır.
- **B. Bekçi halkası (BotW dayanıklılık çarkı gibi, yalnız beklemedeyken görünür):** Parlama fenerin çevresinde küçük bir yay, Atılım ayakların altında zemine yatık bir elips. Kullanınca belirir, dolar; dolunca parlar, ses verir ve söner. Hepsi hazırken ekranda hiçbir şey yok. Kalan süre de görünür. Halenin kenarıyla karışmasın diye küçük tutulmalı (hale ~95+ px, halkalar 10–20 px).
- **C. Fenerin kendisi (arayüzsüz):** Parlama hazırken fenerde sürekli hafif bir pırıltı, Atılım hazırken atkının ucundan kıvılcım. En "oyunun içinden" olanı, ama sinyali en ince olan ve kalan süreyi göstermiyor.
- **Hepsinde ortak:**
  - Hazır olunca ses; iki beceri için iki ayrı perde.
  - Hazır değilken basılınca boğuk bir tık; B'de halka da yanıp söner.
  - Köşedeki gösterge yedek olarak kalır.
- Claude'un önerisi **B**. Arayüz kuralı: sıcak renk ışığa ayrılmış (repodaki `CLAUDE.md`).

### 2. Karanlık düşman ailesi: yön (taslak yok)
- Düşman "gece"nin kendisi: karanlıktan sürünüp haleyi ve yağı kemiren şeyler. Hale onları yavaşlatır, ışın eritir; böylece ışının ilk dakikadan bir amacı olur.
- Çayır'da az ve yavaş olurlar (öğretme bölgesi, Mario 1-1), derinde hızlı ve kalabalık. Geç oyunda biçilecek bir sele dönüşürler (Vampire Survivors).
- Pervane, diken ve gölge de bu ailenin üyeleri gibi okunmalı.
- Kaçan ruh üzerine kurulu "avlanma" seçeneği düştü.
- Ayrı açık soru, Yusuf'a sorulacak: mevcut ürkek ruh kaldırılsın mı, düzeltilsin mi? Düzeltme şunlar olabilir: görünür yorgunluk, halenin kenarında oyalanmaması, ışın tutarken de yetişilebilmesi.
- Kayıp cezası önerilmedi (cozy kararıyla çelişiyor).
- Denge botla ayarlanacak: şu an ~43 sefer / ~46 dk; yeni tehdit seferleri kısaltır.

### 3. Niteliksel yükseltmeler: yön
- Kademe 0–1'e daha çok niteliksel yıldız eklenmeli.
- Zincir, kristal patlaması, Kırılma ve Dağlama birbirini tetiklemeli; amaç sinerji ve "yapı kuruyorum" hissi.
- Gösteri büyük, ham çarpan sınırlı olmalı; botla ölçülmeli ([[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]]).

## Düzeltme
Tasarım dersinde Yusuf'a "ürkek ruh 120, bekçi 100, yürüyerek kazanamazsın" denmişti. Bu yalnız temel hızda ve ışın tutarken doğru; Bataklık'a gelen oyuncu Adım yıldızlarıyla genelde hızlanmış olur. Asıl sorunlar büyük ihtimalle şunlar: ruh kenarda oyalanıyor, yorgunluğu görünmüyor ve ışın tutarken ondan yavaşsın. Oynayarak doğrulanmadı.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
