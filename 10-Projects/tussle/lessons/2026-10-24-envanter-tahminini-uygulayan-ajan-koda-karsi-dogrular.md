---
title: "Keşif envanterinin tetik/sıklık tahmini spesifikasyon değildir; uygulayan ajan koda karşı doğrular, sapmayı bildirir"
date: 2026-10-24
project: tussle
type: lesson
status: active
tags: [tussle, orkestra, ses]
source: oturum 2026-10-24 ses yoğunluğu turu
---

# Envanter tahmini uygulayan ajanda doğrulanır

**Olay:** Ses envanterini çıkaran sonnet ajanı treasure için "kazı pop'u hazine hit'iyle aynı anda çalıyor" dedi; tablo bu yüzden pop'u kaldırdı. Uygulayan ajan sim'e bakıp EV_DIG'in yalnız boş kazıda basıldığını gördü, pop'u bıraktı ve sapmayı raporladı; karar koordinatörde kaldı. Benzer biçimde knife-toss'ta envanterin "ikisi kalır" dediği pop + hit aynı tick'te geliyordu; ajan "aynı olayda tek ses" kuralıyla çözdü.

**Ders:** Salt okunur keşif ajanının satır ±15 okumayla yaptığı tetik/sıklık tahmini tabloya girer ama spesifikasyon değildir. Uygulayan ajanın brief'ine "tablo satırı koda uymuyorsa ilkeye göre karar ver, sapmayı raporla" cümlesi girer; koordinatör sapmaları tabloya işler. Sayısal doğrulama için aynı rastgele girdiyle önce/sonra ölçümü (`SES_RAPOR`, HEAD'i geçici worktree'de koşturarak) tahminden daha güvenilir.

İlgili: [[2026-10-24-tussle-ses-yogunlugu-turu]], [[2026-10-23-paralel-ajanlar-tek-vite-sunucusu-hmr-ve-paylasilan-sozluk]].
