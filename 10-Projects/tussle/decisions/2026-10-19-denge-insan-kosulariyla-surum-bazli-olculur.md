---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oyun, denge, veri, bot]
source: oturum 2026-10-19 "tussle: insan verisiyle denge raporu" (mobil-playus, dal claude/heuristic-dirac-c207c7, c98f940)
---

# Karar: Oyun dengesi gerçek oyuncu koşularıyla, oyun ve sürüm ayrı ölçülür; bot tabloları buna göre kalibre edilir

## Bağlam
Arkadaş geri bildirimi bazı oyunları kolay (Denge, Şerit), bazılarını haksız buluyordu; denge şimdiye kadar yalnız bot tablolarıyla (meta.ts başı) yapılıyordu. Sunucu her günlük denemeyi ve her canlı maç / Parti Gecesi koşusunu girdi loguyla saklıyor (deneme/pratik saklanmıyor).

## Karar
- `scripts/balance-report.mjs` (salt okunur, yayına girmez): konteynerde `ssh vps 'docker exec -i tussle node --input-type=module -' < scripts/balance-report.mjs > runs.jsonl`, sonra Mac'te `npx tsx scripts/balance-report.mjs runs.jsonl --current`. Gruplama oyun **ve** `game_version`; özel parametreli günlükler ayrı. Sütunlar: koşu, oyuncu, süre ve skor p25/med/p75, oyuncu medyanı, 5 sn altı oranı, tavanda biten oran, ilk koşu / 3.+ koşu, dokunuş/sn, en iyi oyuncunun medyanı. `LOGS=<id,...>` ile tohum + olaylar da gelir; koşu yerelde `createSim` ile yeniden oynatılabilir (Denge ve Köprü'de skorlar birebir tuttu).
- Hedefle karşılaştırma: insan medyanı ÷ "ortalama" botun süresi (yoksa `typicalSec`), tavan oranı > %10 ve 90 sn üstü medyan ceza. Süre modeli [[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]].
- Ayar yapılacak her oyunda bot tablosu insan verisine göre kalibre edilir ([[2026-10-19-ilk-kosu-ucurumu-ve-insan-tepki-sureleri]]).

## İlk rapor (19 Eki, 1.282 koşu, 40 oyuncu, güncel sürümler, ≥10 koşu ve ≥5 oyuncu)
Çok zor / anlaşılmıyor (koşu çok kısa): Köprü v1 (med 7 sn, medyan 1 köprü; hedef 25-35 sn), Kargo v2 (7 sn, 8 paket; ok 30-50), Bambu v2 (8 sn), Bıçak v2 (13 sn, bot tablosu yok), Ritim v3 (8 sn, skor botun %7'si), Yörünge v3 (6 sn, 5 m; ok 30-70 m), Katane v3 (10 sn, 3 doğru; ok 7-12).
Çok uzun / kolay: Bardak v5 (med 129 sn, bot 19 sn; yalnız 7 koşu ama en kısası ~98 sn, 90 sn kuralını aşıyor), Çizgi v1 (61 sn, %33 tavanda, skor botun 4 katı), Hedef v3 (79 sn, tipik 55), Çift v4 (84 sn, %33 tavanda), Zincir v4 (64 sn, bot 40), Basket v3 (77 sn, %23 tavanda).
Hedefte: Denge v4 (med 29 sn, tavan yok, en uzun 104 sn: v4 "kolay" sorununu çözmüş; sorun yalnız açılış), Refleks, Fren, Diken, Yılan, Kanat, Kapı, Hafıza, Işık, Okduvar, Jöle, Hazine, Karşıya, Zıpla, Zikzak, Çark, Farklı, Jetpack, Şifre, Renk Hafızası, Sekme, Tam Zamanı. Hafif kısa: Kes, Pinyata, Kule, Spiral; Dörtok, Matematik, Onluk skorda hedefte, yalnız süre kısa.
Az veri: Şerit v2 (6 koşu, med 37 sn = ortalama bot; v3 ayrı geliyor), Doldur v2 (8), Havada v1 (4 koşu, 1 oyuncu).
Tam tablo: dal üzerindeki script ile yeniden üretilir (veri büyüdükçe değişir).

## Neden
Bot tabloları iki yönde de kayıyor: takip/ezber oyunlarında bot insandan 2-6 kat kötü (Bardak, Çizgi, Hedef, Zincir), algı/tepki oyunlarında 3-14 kat iyi (Ritim, Yörünge, Kargo, Katane). Sürümleri karıştırmak eski dengeyi yeni sürüme yazar (Denge v3'te tavana gelenler v4'ü "kolay" gösterirdi).

## Reddedilen alternatifler
- Yalnız bot tablolarıyla devam: yukarıdaki kayma.
- Tüm sürümleri birlikte ölçmek (19 Eki ilk sayılar böyleydi): sürüm atlayan oyunları yanlış gösterir.
- Analizi sunucuya uç nokta olarak koymak: tek seferlik okuma için yayın ve bakım yükü; script yeterli.
- Pratik koşularını saklamaya başlamak: şimdilik gereksiz, günlük + canlı yeterince veri veriyor.

## Yusuf'un kararı (19 Eki)
- **Kısa koşulu oyunlar şimdilik ellenmiyor:** kısa süre oyunu keşfedememekten olabilir. Yusuf YOSEF'le konuşacak; benzer şikâyet gelirse ele alınır.
- **Uzunlarda ölçüt "bitiyor mu":** belli bir sonu olan oyun (sabit tur, taban + bonus + 90 sn tavan) uzun da olsa kalır; zorluğu bir yerde durduğu için iyi oyuncuda bitmeyen oyun düzeltilir. Bu ayrımla:
  - Bitmeyen: **Bardak** v5 (hız 19. turda 233 ms tabanına oturuyor, sonrası zorlaşmıyor; oyuncular 16-28 top, 78-145 sn) paralel oturumda **v6 ile zaten çözüldü** (90 sn tavan, sonrası eşzamanlı hamle/aldatma, `dd51c0d`, [[2026-10-19-serit-ve-bardak-90-sn-tavan]]). Kalan aday **Çizgi** v1 (zorluk bir sınıra yaklaşıp duruyor; 15 koşunun 5'i log boyutu için konmuş 80 sn teknik tavanda bitti).
  - Tasarım gereği uzun, biter: Basket (taban 60 sn, en kötü koşu 62 sn; %23 tavanda), Çift (taban 50; %33 tavanda), Hedef (taban 45; koşular ~80 sn'de kendiliğinden bitiyor). Bonus cömert ama kalabilir.
  - Kendiliğinden biten: Zincir (pencere yetişiyor), Tam Zamanı (7 tur), Işık (20 tur).
- Ayar normal akışla (oyun başına ajan, botlar + tarayıcıda oynama, inceleme ajanı, meta.version artışı), partiler halinde ([[2026-10-13-once-magaza-sonra-denge]]).
