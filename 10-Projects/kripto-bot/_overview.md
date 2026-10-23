---
type: project
project: kripto-bot
date: 2026-10-23
status: active
tags: [kripto-bot, overview, binance, trading, bot]
source: ZZ oturumu "kripto-bot: proje başlangıcı" (2026-10-16)
---

# Kripto Bot: Binance Global'de otonom spot trading botu

> Not canlı gerçek değildir: klasörü ve repo durumunu işlem yapmadan önce doğrula.

## Nedir
Yusuf'un ~500 USD ile Binance Global'de tamamen otonom çalışmasını istediği spot trading botu. Yusuf emir girmez ve trading bilgisi yok; strateji seçimini ve gerekçesini (backtest) Claude yapar, Yusuf yalnızca bütçe ve kayıp limiti gibi üst düzey onayları verir. Parayı kaybetmeyi göze almış durumda ("test gibi"), ama risk motoru ve kill switch yine zorunlu.

Klasör: `~/ZZ/zProjects/kripto-bot` (yerel git repo, Faz 1 commit'li; README ve CLAUDE.md orada).

## Mimari (Faz 1'de kodlandı)
1. `data/`: Binance OHLCV indirici, Parquet/SQLite
2. `strategy/`: modüler strateji motoru (başlangıçta SMA/EMA crossover + RSI mean reversion)
3. `risk/`: pozisyon boyutu, günlük kayıp limiti, max drawdown kill switch (config'den)
4. `backtest/`: komisyon + slippage, metrikler (getiri, Sharpe, max DD, işlem sayısı, kazanma oranı), walk-forward
5. `exchange/`: ccxt sarmalayıcı, testnet/canlı tek bayrak, canlı emir başlangıçta dry-run'a zorlu
6. CLI: indir / backtest / paper-run; `config.yaml`
7. Sonraki fazlar: salt okunur gözetim görevi (log/PnL/hata raporu), web pano

Stack önerisi: Python 3.12 + ccxt, pandas, pytest, async (Yusuf'a sorulacak, cevap yoksa bu).

## Kurallar
- Claude canlı hesapta asla emir vermez/tetiklemez, al-sat kararı almaz, çalışan botun risk parametrelerini kendi başına değiştirmez; izin verilse de. Bkz. [[claude-rolu-kurucu-ve-gozetmen|Claude'un rolü]].
- API anahtarlarını Yusuf `.env`'e kendisi koyar; `.env.example` repoda, `.env` gitignore'da. Testnet anahtarı: testnet.binance.vision
- Canlıya geçişi yalnızca Yusuf yapar (bayrak + anahtar).

## Güncel durum

_Son güncelleme: 2026-10-23, ilk 5 sembol, 4h testnet'te, ilk alım-satım kapandı_

- Yerel repo (son: `d9a9aa2`), remote yok. uv + Python 3.12, 163 test, ruff temiz. Komutlar: `kbot download|backtest|paper-run|run|status|report [--json]|dashboard|risk-reset|error-clear|show-config`.
- Bot **Mac'te**, launchd `com.ziroo.kripto-bot.run` her saat :05. VPS kurulu ama kapalı (Binance bağlantı sıfırlaması, [[bot-macte-calisir-vps-binance-engeli]]). İki bot aynı anda çalışmamalı.
- Strateji: **4h** `trend_filter_cross` (20/50/200, min_hold 5, cooldown 3), kill switch %40. Semboller: **BTC, ETH, SOL, XRP, BNB** ([[sembol-listesi-ilk-5]]); statik `equity/N` dilim, sembol başına en fazla 500 USD.
- Hata kilidi: emir öncesi ccxt NetworkError artık kilitlemez, tur atlanır ([[emir-oncesi-ag-hatasi-kilitlemez]]); diğer her hata kilitler, insan `error-clear` ile açar.
- Testnet hesabı (~95.957 USDT, ön yüklü coinler satıldı): ilk 4h alım ~492 USDT BTC, satıldı: **-9,37 USDT** (ilk kapanan işlem). 2026-10-23'te hepsi nakitte. Testnet günde 7-9 turu ağ hatasıyla atlıyor.
- Gözetim: `kbot report` / `kbot dashboard`; global `gece-gozcusu` her gece 00:10 raporu okur ([[2026-10-18-global-gece-gozcusu]]).
- Bilinen sınırlar: sinyal mainnet mumundan, fiyat testnet ticker'ından; ön yüklü bakiye yüzünden risk yüzdeleri 500 USD planını temsil etmez; rapor ağ sayaçları modsuz (canlı geçişte karışabilir).

## Sıradaki işler
- [ ] 3-6 ay testnet gözlemi (4h, 5 sembol); yeni coinlerin alım-satımlarını raporda izle
- [ ] Rapor: ağ atlamaları yüzünden bayatlayınca "Bilgisayar açık mı?" yerine "testnet'e ulaşılamadı" desin; ağ sayaçlarını moda göre ayır (canlıdan önce)
- [ ] ETH DD'si kill switch %40'a yakın: eşik kalsın mı? (Yusuf)
- [ ] GitHub remote (özel) açılsın mı? (Yusuf)
- [ ] Canlıya geçiş kararı (Yusuf; ayrı hesap ya da `manage_existing_holdings`)

## Kararlar
- [[claude-rolu-kurucu-ve-gozetmen|Claude kurucu ve gözetmen, karar kodda]]
- [[binance-global-tr-degil|Binance Global, TR değil]]
- [[strateji-1d-trend-filtresi-ve-kill-switch-40|Varsayılan 1d trend_filter_cross, kill switch %40]] (zaman dilimi kısmı yerine geçti)
- [[faz2-emir-dongusu-guvenlik-tasarimi|Emir döngüsü: borsadan uzlaştırma, idempotent mum, hata kilidi]]
- [[bot-macte-calisir-vps-binance-engeli|Bot Mac'te, VPS kapalı (Binance engeli)]]
- [[zaman-dilimi-4h-yusuf-tercihi|Zaman dilimi 1d → 4h (Yusuf'un tercihi)]]
- [[sembol-listesi-ilk-5|Sembol listesi ilk 5 (BTC, ETH, SOL, XRP, BNB)]]
- [[emir-oncesi-ag-hatasi-kilitlemez|Emir öncesi ağ hatası kilitlemez]]

## Dersler
- [[start-session-otomatik-tur-reddi|start_session otomatik tur reddi]]
- [[vps-binance-baglanti-sifirlama|VPS'ten Binance bağlantı sıfırlama, ccxt spot-only, data-api]]
- [[binance-testnet-gozlemleri|Binance testnet gözlemleri]]
- [[zaman-dilimi-degisikligi-hemen-emir-tetikler|Zaman dilimi değişikliği hemen emir tetikler]]

## Oturumlar
- [[2026-10-16-proje-baslangici|2026-10-16 proje başlangıcı]]
- [[2026-10-16-faz1-faz2-faz3-ve-testnet|2026-10-16 Faz 1-2-3, testnet, günlük rapor]]
- [[2026-10-16-4h-gecisi|2026-10-16 4h geçişi, testnet'te ilk satışlar]]
- [[2026-10-17-sembol-listesi-ve-ag-hatasi-kilidi|2026-10-17..23 ilk 5 sembol, ağ hatası kilidi, ilk alım-satım]]
