---
type: decision
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, dusman, zorluk, karanlik-surusu, isin, denge]
source: oturum 53393f9a (incremantal-game), commit e19451e, aa8f31f, e636e29; Yusuf'un 2026-10-04 oynama gözlemleri ([[2026-10-04-devir-zorluk-ve-his-bulgulari]])
---

# Gecenin kendisi düşman: karacık ve karabasan Çayır'dan başlar, hale yavaşlatır, ışın eritir, sayıları güçle büyür

## Karar
- **Karacık** (en: sootling): Karanlıktan kopup fenere sürünen küçük is topu. Hale onu yavaşlatır ve ışığın yalnız %15'ini geçirir; ışın eritir.
  - Bekçiye 70 birim yaklaşınca 0,25 sn çömelir (gözleri açılır), sonra sıçrar. Işın sıçrayışı düşürür.
  - Yapışırsa bölgenin normal yanışının 0,3 katı yağ içer ve haleyi %7 kısar (en çok 4 tane sayılır). Hale onu yavaş yakar, Parlama ve Atılım söker.
  - Ölünce `'burn'` olayı çıkar, `'capture'` değil. Kombo, zincir, Kırılma ve Tutuşma tetiklenmez, fenere ışık akmaz. Değeri bir ruhun yalnız 0,06 katı.
- **Karabasan:** Bataklıktan itibaren gelen iri karacık. Yanınca 3–4 sersem karacığa bölünür.
- **Bölgeye göre:** Çayır'da öğretme alanı gibi tek tek ve yavaş gelir; ilk karacık 5. saniyede tam karşıdan, ipucuyla çıkar. Mağara ve Harabeler'de 6–9'luk sürüler, çoğu ışınla süpürülecek yay hattı hâlinde. Bot Mağara'da ortalama 8, Harabeler'de 13 görüyor, zirvede 20–30.
- **Sayı güçle büyür, dayanıklılık büyümez.** Çarpan m = clamp(1 + 0,5·log2(güç / bölge eşiği), 1, 3). Gelme aralığı √m'ye bölünür, sürü √m ile çarpılır.
- **Mevcut gece varlıkları:** Pervane, gölge ve diken aynı görünüşü aldı (mürekkep gövde, solgun gözler, dumanlı kenar, aynı is bulutu), kuralları değişmedi. *Görünüş 2026-10-06'da güncellendi: bu birleştirme pervanenin karanlıktaki parıltısını da kaldırmıştı. Yerine gözler, ay ışığı kenarı ve pervaneye özgü kor gözler geldi ([[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]).*
- **Ürkek ruh** kaldırılmadı, düzeltildi:
  - Hale onu ürkütür; halenin kenarında oyalanmadan ışıktan kaçar.
  - Işık onu yerinde dondurur (far ışığındaki geyik gibi).
  - Yorgunluğu çizilir ve 2,6 sn'lik gerçek bir yakalama penceresi verir.
  - Altın ruh ışında yalnız yavaşlar.

## Neden
- Yusuf: ilk bölgelerde zorluk yoktu, ışının öldüreceği bir düşman yoktu, geç oyunda ekran anında siliniyordu. İkisinin kökü aynı: direnç oyuncunun gücüyle büyümüyordu ([[ders-03-guc-ancak-direncle-hissedilir]]).
- Işığın ilk dakikadan bir amacı olsun diye halo zayıf, ışın güçlü tutuldu.
- Sayı büyüyor, dayanıklılık büyümüyor; böylece güç hissedilir. Can güçle büyüseydi güç hiç hissedilmezdi.
- Karacığın ölümü zinciri sürdürmüyor. Sürdürseydi tek bir zincir sürüyü silerdi ve "ekran anında siliniyor" sorunu geri gelirdi. Zincir kıvılcımları karacığı yine yakıyor.
- Ceza yalnız yağ; ölüm ya da kayıp yok (cozy kararı).

## Reddedilen alternatifler
- **Kaçan ruh üzerine kurulu "avlanma":** devir notunda zaten düşmüştü.
- **Kayıp cezası** (kıvılcım kaybı, ölüm): cozy kararıyla çelişir.
- **Karacık ölümünün kombo ve zincir tetiklemesi:** ekranı yine silerdi.
- **Fenere ışık akıtması:** sürü güçle büyüdüğü için fenerleri hızlandırır ve oyunu kısaltırdı.
- **Ürkek ruhu kaldırmak:** düzeltmesi ucuzdu; Puhu'nun isteği ve hikâye ona bağlı.

## Açık
- Geç oyunda sürü neredeyse zararsız. "Özensiz bot" Mağara ve Harabeler'de yağın %1–2'sini kaybediyor, hiç Parlama yapmayan bir oyuncu %8–11'ini. Sürünün daha çok ısırması bir ürün kararı: yapışana zincir/ateş böceği işlemesin gibi bir kural değişikliği gerekir.
- Bekçi yanmamış bir fenerin başında beklerken sürü yanlardan yığılıyor (Harabeler'de zirvede 30'dan fazla). Bir kuşatma gibi okunuyor, oynanarak bakılmalı.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-05-zincirleme-yildizlar]], [[2026-10-05-karanlik-surusu-zincirleme-yildizlar-beceri-halkasi]]
