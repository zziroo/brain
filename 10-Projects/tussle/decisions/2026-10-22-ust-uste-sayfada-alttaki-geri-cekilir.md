---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, arayuz, sheet, animasyon]
source: oturum 2026-10-22 (sezon sayfası üstüne oyuncu kartı açılınca garip görünüyordu)
---

# Karar: Üst üste açılan sayfada alttaki sayfa kararıp geri çekilir (iOS kart yığını)

## Bağlam
Sezon sayfasının üstüne oyuncu kartı açılınca iki beyaz sayfa kenar kenara biniyordu. Yeni sayfanın karartması alttaki sayfanın arkasında kaldığı için alttaki hiç kararmıyordu (backdrop z 50, sheet z 51).

## Karar
Bir sayfanın üstüne yenisi açılınca alttaki `is-behind` alır: z-index 50 (yeni karartma DOM'da sonra geldiği için üstüne biner) ve alt kenarından `scale(0.93)`. Üstteki kapanınca geri döner. `transform-origin: 50% 100%` taban `.sheet` kuralında (dönüşte de alt kenar sabit kalsın). Kod: `src/client/ui/sheet.ts`, `theme.css` `.sheet.is-behind`. Oda ekranı küçülmez, yalnız kararır.

## Neden
- Yusuf "iOS gibi geri çekilme"yi denemek istedi; tanıdık bir yığın görünümü.
- Yalnız transform ve mevcut karartma: düşük donanımda ucuz (akıcılık bir numaralı kural).

## Reddedilen alternatifler
- Arka planı blurlamak: backdrop-filter düşük donanımda pahalı, akıcılık kuralına ters.
- Oyuncu kartını sezon sayfasının içinde ileri geçirmek (push): daha büyük değişiklik; Yusuf önce geri çekilmeyi seçti.
- Oda ekranını da küçültmek: ağır sayfayı her açılışta yeniden çizdirir.

## Sonuçlar / riskler
- Android'de de iOS tarzı görünür (bilinçli). Küçülme/karartma miktarı telefonda görülmedi (`status` açık: Yusuf'un teyidi bekleniyor).
- Oturum: [[2026-10-22-tussle-arena-kisi-once-sayfa-kaymasi-yigin]]
