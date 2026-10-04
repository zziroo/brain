---
type: decision
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, denge, tier-scale, kalp, bot]
source: oturum 53393f9a (incremantal-game), commit e636e29 (denge ajanı, 99 oyunluk bot ortalamaları)
---

# Zincirleme yıldızların kısalttığı tempo TIER_SCALE 2–4 artışıyla eski şekline döndü; bu bir uzatma değil, geri alma

## Karar
- `TIER_SCALE` kademe 2–4: 1300 / 31000 / 700000 → 2000 / 46000 / 1000000.
- Kalp: `BOSS.bounty` 12M → 18M, `BOSS.hp` 2,5M → 2,55M.
- Karacık sürüleri Mağara'da 6–9, Harabeler'de 7–9 kişilik. Çoğu yay hâlinde geliyor (`SOOT.arc`).
- Puhu'nun karacık isteğinin hedefleri büyüdü.
- Bot (istek ve iksirle) ~42,9 sefer / ~47 dk'da bitiriyor. Fenerler 5 · 13 · 22 · 30 · 39. seferde yanıyor, Kalp 3–4 denemede düşüyor (1–6 arası). İstek ve iksir olmadan ~51 sefer / ~55 dk.

## Neden
- Zincirleme yıldızlar oyunu ~38 sefere indirdi, Kalp 1–2 denemede düşüyordu.
- Yıldızları zayıflatmak bir seferden az etki etti. `BEACON_ENERGY` uzunluğu neredeyse oynatmıyor.
- Yalnız 3. ya da 4. kademeyi pahalılaştırmak sadece Kalp'i oynatıyor; fenerleri 2–4 birlikte oynatıyor.
- Ödül artışı olmasaydı istek yapmayan bir oyuncu Kalp'te ~6,6 denemede takılıyordu.

## Reddedilen alternatifler
- **Yıldız sayılarını kısmak:** etkisi yok denecek kadar azdı, yıldızların hissini de bozardı.
- **Fener enerjisini artırmak:** bot daha uzun avlanıp Kalp'e daha güçlü geliyor, uzunluk değişmiyor.
- **Yalnız `BOSS.hp`:** Kalp çok hassas (%6 daha fazla can yaklaşık +1,5 deneme), fener temposunu da düzeltmiyor.

## Not
- [[2026-10-05-devir-oyun-uzunlugu]] uzatma aracı olarak maliyet artışına karşı çıkıyor. Bu değişiklik oyunu uzatmadı, yeni yıldızların kısalttığını eski tempoya geri aldı.
- Asıl uzunluk kararı (seferlerin güçle uzaması, içerik, gerçek oyuncu ölçümü) Yusuf'ta.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-05-zincirleme-yildizlar]]
