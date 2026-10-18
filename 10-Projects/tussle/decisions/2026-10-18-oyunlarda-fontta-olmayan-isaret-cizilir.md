---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, oyun, mini-motor, font, parite]
source: oturum "tussle: durum ve sıradaki işler" (2026-10-18 akşam), commit `381eb4f`
---

# Karar: Oyunlarda Nunito'da olmayan işaretler yazı değil çizim (yol) olarak çizilir

## Bağlam
Renk (Color Match), Matematik (Quick Math) ve Işık (Lights) oyunları ✓ ✗ ✕ işaretlerini `fillText` ile yazıyordu. Web ve iki mini motor (Android Typeface, iOS CTFontManager) gömülü Nunito'yu kullanır; Nunito'da U+2713/2715/2717 yok, her platform başka sistem yazı tipine düşüyordu (Android paritesi 50/52). Yusuf: "simge yerine çizim gibi yapalım, sorun yaratacak böyle şeyleri elden geçirelim."

## Karar
- `src/games/view-kit.ts`'e `drawCheck` / `drawCross` (yuvarlak uçlu yol, ~0,15 em kalınlık, kare başına tahsis yok); üç oyun bunları kullanır.
- Kural: canvas'a yazılan bir karakter Nunito'nun karakter tablosunda yoksa çizilir. − × ÷ ± ° … · – ve Türkçe harfler Nunito'da var, yazı olarak kalır. `howTo` ve sonuç satırları DOM'da, kapsam dışı.
- Yan düzeltme: Işık'ta işaret gece temasında koyu zeminde koyuydu, `theme.text` oldu.

## Neden
- Her cihazda aynı görünüm; yedek yazı tipine bağımlılık yok.
- Yol çizimi mini motorların desteklediği alt kümeyle (lineCap/lineJoin/moveTo/lineTo/stroke) çalışır.

## Reddedilen alternatifler
- Nunito'ya glif eklemek / alt küme font: bakım yükü, iki motorda font yükleme yolu.
- ASCII karşılık (v/x): görsel olarak zayıf.

## Sonuçlar / riskler
- Parite emülatörde yeniden ölçülmedi (emülatör bağlı değildi): `npm run parity -- --serial <emu> --build --games renk,matematik,isik`.
- App Store Connect TestFlight "What to Test" metni de ✓/✗ kabul etmiyor: [[2026-10-18-magaza-derlemesi-ortam-tuzaklari-java-home-zsh]].

## İlgili
- [[2026-10-18-android-mini-oyun-motoru]], [[2026-10-18-canvas-textbaseline-os2-typo-metrikleri]], oturum [[2026-10-18-tussle-basket-glif-lobi-parti-kilidi-magaza]]
