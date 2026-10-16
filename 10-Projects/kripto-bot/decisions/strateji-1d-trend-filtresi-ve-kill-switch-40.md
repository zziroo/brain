---
type: decision
project: kripto-bot
date: 2026-10-16
status: superseded
tags: [kripto-bot, strateji, backtest, risk, kill-switch]
source: kripto-bot oturumu "Faz 1 iskelet / Faz 2 düzeltmeler ve strateji" (2026-10-16)
---

> **Kısmen yerine geçti (2026-10-16):** zaman dilimi 4h oldu, bkz. [[10-Projects/kripto-bot/decisions/zaman-dilimi-4h-yusuf-tercihi]]. Strateji, parametreler ve kill switch %40 hâlâ geçerli.

# Karar: Varsayılan strateji 1d `trend_filter_cross` (20/50/200, min_hold 5, cooldown 3), kill switch %40; yalnız paper/testnet için

## Bağlam
Faz 1'deki iki 1h strateji (SMA/EMA cross, RSI mean reversion) 2 yıllık BTC/ETH backtest'te buy&hold'u yenmedi; artı görünen tek getiri Ocak 2025'te %15 kill switch'in ateşleyip botu nakitte bırakmasından geliyordu. Kill switch'siz hepsi -19..-48%. Round-trip maliyet ~%0,30, 200+ işlem/2 yıl hesabı yiyor. Strateji araştırması (`reports/strategy-research-2026-10-16.md`) yapıldı: 4 yeni aday (trend_filter_cross, donchian_breakout, sma_band_trend, vol_adjusted_momentum), 1h/4h/1d, ham ve risk-on, walk-forward OOS, ±%20 parametre dayanıklılığı, 2019+ uzun tarih.

## Karar
- Varsayılan: `trend_filter_cross`, 1d, EMA20/EMA50 kesişimi + fiyat > SMA200 rejim filtresi, min_hold 5, cooldown 3. Parametreler ders kitabı değerleri; sonuç görülmeden sabitlendi, sonradan ayarlanmadı.
- `max_drawdown_pct` 15 → 40 (Yusuf kararı Claude'a bıraktı). 1d trend stratejisinin olağan düşüşü %25-40; eşik "strateji bozuldu" seviyesi.
- Bu bir "edge bulundu" kararı değil: hiçbir aday uzun vadede B&H'yi getiride yenmiyor; 1d trend kuralları max DD'yi yarıya indiriyor (2y: ~%25 vs %77-80), 2-4 işlem/yıl. Canlıya geçiş için yeterli kanıt yok; 3-6 ay testnet gözlemi yalnız botun davranışını doğrular.

## Neden
- Düşük frekans + rejim filtresi maliyeti ve kırbaçlanmayı azaltıyor; 1h/4h'de her şey sıfır civarı ya da eksi.
- Dayanıklılık: 1d trend_filter_cross ±%20 parametre taramasında 243 kombinasyonun %98-100'ünde işaret koruyor; RSI hiçbir yerde dayanıklı değil.
- %15 kill switch bu stratejide aylar içinde ateşler ve bot kalıcı durur; 2018+ veride %35-50 bile 2019-20'de ateşledi. %40 normal döngüde pek ateşlemez, çöküşte durdurur.

## Reddedilen alternatifler
- 1h/4h stratejiler: maliyet ve gürültü, hiçbiri çalışmıyor.
- RSI mean reversion: her zaman diliminde eksi ve dayanıksız.
- "Güzel görünene kadar tune etmek": örneklem küçük (8 işlem/2y), seçim yanlılığı zaten var; reddedildi.
- Kill switch %15'te bırakmak: düşük DD'li ama her birkaç ayda bir durup insan reset'i bekleyen bot; Yusuf'un "tamamen otonom" isteğiyle çelişiyor.

## Sonuçlar / riskler
- Güçlü boğa piyasasında B&H'nin çok gerisinde kalır; getiri birkaç büyük trende bağlı.
- Trend takibini "kriptoda çalıştığı bilinir" diye seçmek seçim yanlılığıdır; rapor bunu açıkça yazar.
- 1d'de %3 günlük kayıp limiti hiç ateşlemez (bar = gün).

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[10-Projects/kripto-bot/decisions/claude-rolu-kurucu-ve-gozetmen]]
- [[10-Projects/kripto-bot/decisions/bot-macte-calisir-vps-binance-engeli]]
