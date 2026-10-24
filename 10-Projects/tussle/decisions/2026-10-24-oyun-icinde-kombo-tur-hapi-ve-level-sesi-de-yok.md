---
type: decision
project: tussle
date: 2026-10-24
status: active
tags: [tussle, karar, oyun-ici, hud, ses, denge]
source: oturum "tussle: küçük açıklar (kombo, luck, kontrast)" (2026-10-24)
---
# Karar: oyun içinde kombo çarpanı, n/toplam tur hapı ve tur geçişi level sesi de yok; yalnız oyun sonu çıkartmaları kalır

## Bağlam
[[2026-10-23-oyunda-tek-olcu-skor-kademe-ve-zorluk-etiketi-yok]] kararı kombo ×n, n/toplam sayacı ve `level` seslerini "bilinçli kalanlar" olarak bırakmıştı. Yusuf 24 Eki'de kalan oyun içi öğeleri de kaldırttı: "oyun sonu Usta gibi şeyler kalabilir, onun dışındaki oyun içindekileri kaldırabiliriz."

## Karar
- Kombo çarpanı kalktı; sim'den de (Bounce v5 emsali): Beat v5 puan düz 20/10, Target v5 halkalar 10/5/2 (streak yalnız sonuç satırı ve çıkartma için). Stack'te tuvaldeki "Seri xN" yazısı yok, sonuç satırı `bestCombo` duruyor.
- n/toplam tur hapı kalktı: split, fill-up, on-time, reflex, color-recall, brake. `hud.ts setRound` bileşeni duruyor (tek satırla geri gelir).
- Tur geçişi `level` sesi kalktı: split, color-recall, crack-it, keep-up, spiral; lights'ta "sıra sende" anı girdi işareti olduğu için `tick`. `level` adı palette duruyor, kullanılmıyor.
- Kalanlar: oyun sonu çıkartmaları ve sonuç satırları; skorun kendisi metre ise HUD'da (hop metre rozeti dokunulmadı); slice'ın anlık "{n} şeker birden!" olay çıkartması.

## Neden
Oyunda tek ölçü skor. Çarpanı göstermeyip puana sokmak sıçramaları açıklamasız bırakırdı, bu yüzden çarpan sim'den çıktı. Tur sayısı ve seviye sesi de oyun içi ilerleme göstergesi; Yusuf'un sadelik çizgisi (Claude hafızası "yusuf-sadelik-tercihi").

## Reddedilen alternatifler
- Çarpanı sim'de bırakıp yalnız rozeti gizlemek: açıklamasız +30'lar.
- Rescore göçü (Beat/Target 4→5): Bounce v5 de rescore'suz çıktı; test aşamasında geri uyum gerekmiyor. Yayın günü açık Beat/Target gününde eski denemeler kombolu puanla kalır (kabul edildi).
- Tur hapını yalnız süre çubuğu olmayan oyunlarda tutmak: hepsinden kalktı; bitiş ani gelirse geri alınır.

## Sonuçlar / riskler
- Yeni denge (ortalama): Beat casual 1489→584, skilled 7113→2052, expert 17503→4667; Target casual 1079→380, good 2774→887, expert 5713→1760 (`meta.ts` yorumları).
- on-time, reflex, color-recall'da HUD artık hiçbir şey çizmiyor; telefonda denenmedi.
- Uygulama: `61e5962`; yayın sunucu 4986df5, OTA 0.20261024.1327. GAME-CONTRACT ve ses-tasarimi güncel.

## İlgili
- [[2026-10-23-oyunda-tek-olcu-skor-kademe-ve-zorluk-etiketi-yok]] (bu kararın "Kalanlar" bölümünü geçersiz kılar)
- [[2026-10-24-tussle-kucuk-aciklar-kombo-luck-kontrast]]
