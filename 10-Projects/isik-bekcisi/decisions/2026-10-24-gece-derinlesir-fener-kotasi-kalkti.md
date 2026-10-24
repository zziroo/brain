---
type: decision
project: isik-bekcisi
date: 2026-10-24
status: active
tags: [denge, fener, akis, bolge, duraklar]
source: Claude Code oturumu "ışık bekçisi: akış ve fener dolumu değerlendirmesi", 2026-10-24; tasarım notu depo `docs/gece-derinlesir.md`
---

# Karar: fener kotası kalktı, sınır ilerler ("Gece derinleşir")

## Bağlam
Yusuf bütün bölümleri (`?chapter=N`) oynadı: 1-5 eğlenceli (kargaşa, fiiller), 0 sıkıcı; ve her bölgede "fenere her seferde
varıyorum ama hiç dolmuyor, güçsüz kaldığım tek yer doldurmak". Sayılar aynı şeyi söyledi: Çayır 1800 birim, bekçi 100
birim/s, temel yağ 40 s → ilk fener 18 s yürüyüş, yağın yarısı elde; 4. fenerden 5.'ye 28 s yol, 200 s yağ. Yağ hiçbir
zaman mesafeyi sınırlamıyordu, yalnız bölgede geçirilen zamanı. Bölge içinde sınır hiç hareket etmiyordu; hareket eden
tek şey ~8 seferlik kota çubuğuydu. Aksiyon oyununun altındaki idle iskeleti buydu ve boş hissettiren de bu.

## Karar (A seçeneği)
- **Kota yok.** `BEACON_ENERGY`, `BEACON_REMOTE`, akış (`flowTo`), `S.charge`, erken çağrı, akış motları ve fenerin
  çağrı parıltısı siliniyor. Fener **tek tutulan nöbette** yanar (nöbet 0→1; kırılınca o seferde kaldığı yerden; hiçbir
  şey kaydedilmez).
- **Duraklar.** Her bölgede yol lambaları (Çayır'da 1, diğerlerinde 2) ve sonda fener; hepsi birer nöbetle yanar ve
  yanan her durak **başlangıç noktası** (Kandil'in listesi). 14 durak. Bölgeler uzar: 2700 / 4400 / 4800 / 5200 / 5600.
  Lamba yerleri ve arena bölge geometrisinden türetilir.
- **Derinlik kapısı.** Yağ yakımı bölge içinde derinlikle sürekli artar (`burnAt(depth)` = `ZONE_BURN[z]` ×
  lerp(1, `ZONE_RAMP[z]`, bölge içi konum)); ürem ve büyükler de derinlikle sıklaşır (sayı, dayanıklılık değil). İlk
  sefer bir sonraki durağa varamadan biter; durak 2-4 sefer sonra yanar (Çayır 1-2). Oyunun toplam uzunluğu şimdilik
  bot için aynı (~37 ana / ~45 özensiz); nihai uzunluk Yusuf'un.
- **Kademe 0'a fiil.** Şok Dalgası (`soka`) kademe 0'a iner (is 80): Yusuf'un en beğendiği etki ilk seferlerde gelir ve
  Çayır'daki isin alacak bir şeyi olur. Çayır üremi daha erken ve çift çift.
- Kayıt sürümü 8; `?chapter=N` bütün geride kalan durakları yakar ve en uzak duraktan başlatır.
- Kod: depo `docs/gece-derinlesir.md` sözleşme; iki fazda ajanla yazılıyor (kurallar+dünya+kayıt+bot; sonra HUD, Kandil
  listesi, yolculuk kartı, durak parıltısı).

## Neden
Türün (Shelldiver, Rock Bottom) ilerlemesi sınırdır: "bu sefer daha ileri gittim". Oyuncuyu durduran seferin kaynağıdır,
kota değil. Yağ her yere yettiği için güç hayatta kalmaya değil yalnız çubuğa yarıyordu. Gece derinleştiğinde sönen fener
görülen ve hissedilen bir kapıdır; oyuncu ne kadar iteceğini seçer. Çayır'ın sıkıcılığı da aynı kökten: 8 sefer boyunca
fiilsiz aynı tarla.

## Reddedilen alternatifler
- **B, kısa bölgeler:** kota 2-3 sefere insin, lambalar durak olsun. Ucuz ama "çubuk doldurma" hissi kalır, yalnız
  kısalır. Yusuf A'yı seçti.
- **C, kazanılan/kaybedilen nöbet:** kota kalkar, fener tek nöbette ama nöbet kaybedilebilir. Eski "tavan" denemesinin
  "kampa geri yolladı" hissi; A'nın içinde fenerin kapanış dövüşü olarak zaten yaşıyor.
- **Tavan** (2026-10-12'de reddedilmişti): görünmez bir güç sayısı. Derinlik kapısı görünür ve seçimli; aynı şey değil.

## Yan kararlar (aynı oturum)
- Kırılan Dünya (ağaç yakma, kaya kırma) rafa: Yusuf fark etmedi, ağaçlar karanlıkta okunmuyor; `BREAK.off` bayrağı var,
  yıldızları gizlemek ayrı küçük iş. Silme ağaç yeniden kesilirken.
- Fark edilmeyen etkileşimlerin ortak noktası kendiliğinden olmaları (Nakarat, Tutuşma, Akkor, havuzlar, fırtına).
  Ağaç kesimi ilkesi: **basış → dünyada görünür olay**; otomatik zincirler azalır ya da tek gürültülü şeye katlanır.
  Bkz. [[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]].

## Eskiyen notlar
- CLAUDE.md Balance bölümündeki kota tabanlı bütün ölçümler tarih oldu; "akış kotası bölge uzunluğunu belirler" cümlesi
  geçersiz. [[2026-10-12-kapi-yok-uzunluk-icerikten-atilim-silindi-sonsuz-yildizlar]] içindeki "uzunluk içerikten"
  ilkesi duruyor; kota aracı gitti.
