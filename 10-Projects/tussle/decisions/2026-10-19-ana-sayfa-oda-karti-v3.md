---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ana-sayfa, oda-karti, tasarim, playus]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), commit `98c61ab`; mockup `src/client/mockups/oda-karti.*` (v3)
---

# Karar: ana sayfa oda kartı v3 — kapak + avatarlar + SEZON etiketi, tek eylem

## Bağlam
Kart oyun adı, "Önde: …", oynayan sayısı, "Oynadın" çipi ve yan etiketlerle doluydu; ne yapılacağı belli değildi. Playus'un oda kartıyla karşılaştırıldı.

## Karar
- Kapak + avatar yığını (ilki artık kırpılmıyor) + büyük "SEZON N." etiketi (1/2/3 altın/gümüş/bronz, 4+ beyaz, puansız "SEZON –"). Kartta gösterilen sıra **sezon sırası**, günün sırası değil.
- Oda adı tek başına. **Tek eylem:** "▶ Oyna | N hak" ("son hak"); dokununca odayı açar ve hazır karta atlar (sessionStorage tek seferlik bayrak, 30 sn geçerli). Oynayınca "✓ bugün N." (1.'ysen taç), bir şey kalmadıysa "Bitti".
- Hediye bir "+N 🎁" rozeti olarak eylemin üstünde; seri sağ altta küçük. "Odaya hak hediye et" yalnız odanın içinde.
- Kaldırılanlar: oyun adı, "Önde: …", oynayan sayısı, "Oynadın" çipi, yan etiketler. Kart `role=link` div, düğme ayrı durak.
- **Playus karşılaştırması:** bizde Oyna düğmesi fazladan; bilerek korundu, ana sayfadan tek dokunuşla oyuna girmek günlük alışkanlığı kısaltır.

## Neden
Kart tek soruya cevap vermeli: "bugün oynayacak mıyım, hakkım var mı". Sezon sırası kartın kimliği (oda sezonla yaşıyor); günün bilgisi odada. Kimin oynadığı ve oyun adı odada zaten görünür.

## Reddedilen alternatifler
- Mockup B (dilimli "oynayanlar" hapı): 20+ üyede dilimler okunmaz hale geliyor.
- Mockup C (yüzsüz, avatarsız): oda kimliğini ve sosyal bağı kaybettirir.
- Hediye düğmesini kartta tutmak: yanlış dokunma ve kalabalık; yalnız rozet.

Oturum: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]. İlgili: [[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]].
