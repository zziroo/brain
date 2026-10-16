---
type: decision
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, strateji, zaman-dilimi, testnet]
source: kripto-bot oturumu "4 saatlik mumlara geçiş" (2026-10-16)
---

# Karar: Zaman dilimi 1d → 4h (Yusuf'un tercihi); strateji ve kill switch %40 aynen

## Bağlam
Yusuf botun kısa vadeli, sık al-sat yapacağını sanıyordu; 1d stratejide ilk gün hiç emir çıkmayınca "anlık al-sat, belki kaldıraç" diye sordu. 1h'in maliyet yüzünden zararda olduğu ([[10-Projects/kripto-bot/decisions/strateji-1d-trend-filtresi-ve-kill-switch-40|1d kararı]]) ve kaldıracın proje kuralıyla yasak olduğu anlatıldı; ara seçenek olarak 4h sunuldu. Yusuf "daha riskli işlemlere okeyim" dedi.

## Karar
- `config.yaml`: `timeframe: 4h`, walk-forward `train_bars: 2190`, `test_bars: 540` (commit `9c16fde`). Strateji `trend_filter_cross` 20/50/200, min_hold 5, cooldown 3 aynen (bar cinsinden: 20 saat elde tut, 12 saat bekle).
- `risk:` bölümüne dokunulmadı; kill switch %40 duruyor.
- Yalnız testnet. Canlıya geçiş ayrı karar.

## Neden
- Yusuf hareket görmek istiyor ve daha yüksek düşüşü kabul ediyor; testnet'te para riski yok.
- 4h'te iki sembolde de artıda kalan tek strateji `trend_filter_cross`; ±%20 parametre taramasında %99-100 kombinasyon pozitif.

## Reddedilen alternatifler
- 1h: 2 yıllık backtest'te BTC/ETH -19..-48%, yılda 55-110 işlemle maliyet getiriyi yiyor.
- Kaldıraç / vadeli: proje sert kuralı (spot, long/flat); 500 USD'de tasfiye riski, kill switch bunu durduramaz.
- 1d'de kalmak (Claude'un önerisiydi): OOS'ta daha iyi (BTC +83%, ETH +90%, DD %19-23) ama ayda bir işlem bile çıkmayabiliyor; Yusuf 4h'i seçti.

## Sonuçlar / riskler
- 2 yıllık walk-forward OOS: BTC +8% (B&H +31%), ETH +41% (B&H +4%), max DD %33 / %39. BTC'de B&H'ın açıkça gerisinde.
- ETH OOS DD'si (%39) kill switch eşiğine (%40) çok yakın; ateşlerse bot düzleşir ve `kbot risk-reset` (yalnız Yusuf) bekler. Eşiği değiştirmek Yusuf'un kararı.
- Geçiş anında 4h sinyali 0'dı: 16:05 turunda bot testnet'teki ön yüklü 1 BTC ve 1 ETH'yi sattı; hesap nakitte, sonraki alımlar sembol başına en fazla 500 USD (`max_position_usd`). Testnet artık 500 USD planına daha yakın.

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[10-Projects/kripto-bot/decisions/strateji-1d-trend-filtresi-ve-kill-switch-40]]
- [[10-Projects/kripto-bot/lessons/zaman-dilimi-degisikligi-hemen-emir-tetikler]]
