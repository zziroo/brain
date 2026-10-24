---
type: lesson
project: tussle
date: 2026-10-24
status: active
tags: [tussle, ders, kontrast, tema, test]
source: oturum "tussle: küçük açıklar (kombo, luck, kontrast)" (2026-10-24)
---
# Ders: token çifti testi kontrastı korumaya yetmez; sabit renk, gradyan ve yarı saydam zemin pikselden ölçülmeli

## Ne oldu
`tests/theme-contrast.test.ts` token çiftlerini (ör. `--card-text`/`--surface`) iki temada denetliyor ve geçiyordu; buna rağmen 19 Eki'den beri açık duran beş öğede 32 ölçüm eşiğin altındaydı (kilit kartı "1/2" beyaz/mercan 2.75, davet kartı 2.66, boş jeton 1.9, parti yıldızı 1.4). Hepsi testin görmediği durumlar: sabit `#fff`/`--ink` yazı, gradyan zemin, opaklıkla soluklaştırılmış ikon, inline `--hero` değişkeni.

## Kural
- Kontrastı gerçek sayfada ölç: `npm run kontrast` (`scripts/kontrast-kontrol.mjs`) arka planı pikselden okur (öğe gizlenip ekran görüntüsünden baskın renk), ön planı computed renk + alfa/opaklıkla harmanlar; `--css <dosya>` ile varyant enjekte edilir. Seed verisi `scripts/tasma-kontrol/seed-server.ts` (benim mesajım, açık parti kartı, tek kişilik kilitli oda eklendi).
- Yeni rozet/çıkartma yazarken: parlak sabit dolguda `--ink`, koyu dolguda `--on-accent`/`--sticker-white`; tema değişkeni olmayan `#fff` yazma. Gece'de opaklık düşürmek Gündüz'de beyaz zeminde ölür (jeton .3 → 1.9:1).
- Yayın öncesi untracked görüntü klasörü `release.sh`'yi durdurur; önce/sonra görüntüleri repoya değil vault'a (`gorsel-<tarih>-<konu>/`).

## İlgili
- [[2026-10-24-tussle-kucuk-aciklar-kombo-luck-kontrast]]
- [[2026-10-22-tussle-telefon-tasmalari-ve-tasma-denetimi]] (aynı altyapı, taşma denetimi)
