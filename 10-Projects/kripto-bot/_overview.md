---
type: project
project: kripto-bot
date: 2026-10-16
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
- Claude canlı hesapta asla emir vermez/tetiklemez, al-sat kararı almaz, çalışan botun risk parametrelerini kendi başına değiştirmez; izin verilse de. Bkz. [[10-Projects/kripto-bot/decisions/claude-rolu-kurucu-ve-gozetmen|Claude'un rolü]].
- API anahtarlarını Yusuf `.env`'e kendisi koyar; `.env.example` repoda, `.env` gitignore'da. Testnet anahtarı: testnet.binance.vision
- Canlıya geçişi yalnızca Yusuf yapar (bayrak + anahtar).

## Güncel durum (2026-10-16, akşam)
- Faz 1 tamam ve commit'li (`ecf98b8`, yerel repo, remote yok). uv + Python 3.12, 58 test geçiyor, ruff temiz.
- Paket `src/kripto_bot/`: data, strategy (sma_ema_cross, rsi_mean_reversion), risk, backtest (+walk-forward), exchange, cli, paper. Komutlar: `uv run kbot download|backtest|paper-run|risk-reset|show-config`.
- Backtest (BTC/ETH 1h, 2024-10-16..2026-10-16, `reports/backtest-2026-10-16.md`): stratejiler B&H'yi yenmiyor; SMA'nın artı görünen getirisi Ocak 2025'te kill switch'in ateşleyip nakitte kalmasından geliyor. Kill switch'siz hepsi eksi (-19..-48%). Walk-forward OOS da zayıf. Strateji henüz canlıya uygun değil.
- İnceleme (opus) + şüpheci (sonnet): kritik/yüksek yok. Not alınan düşük bulgular Faz 2 öncesi yapılacak (aşağıda).
- paper-run yalnız dry-run; piyasa verisi hep mainnet public, testnet yalnız emir için. Canlı emir üç kapı: `mode: live` + `allow_live_orders: true` + env `KBOT_I_UNDERSTAND_LIVE_TRADING=yes`; hiçbir çağıran `dry_run=False` geçmiyor.

## Sıradaki işler
- [ ] Faz 2 ön koşul küçük düzeltmeler (inceleme bulguları): paper/canlı için ayrı risk state dosyası (`state/risk_state_paper.json` vs `_live`); `reset_kill_switch` gün alanlarını silmesin; günlük limit gün sınırında bir bar gecikiyor ve ilk barın kaybı sayılmıyor; paper döngüsünde her fill sonrası state kaydet; `amount_to_precision` sonrası qty>0 ve min cost kontrolü; config'de anahtarlar `SecretStr`.
- [ ] Strateji çalışması: mevcut iki strateji edge vermiyor; daha düşük işlem sıklığı / trend filtresi / 4h zaman dilimi denenmeli, walk-forward ile dürüst raporlanmalı. Canlıya geçiş kararı bundan önce verilmez.
- [ ] Faz 2: risk motorunu testnet'te gerçek emirli döngüye bağla
- [ ] Faz 3: salt okunur gözetim görevi (zamanlanmış), web pano
- [ ] GitHub remote (özel) açılsın mı? (Yusuf)
- [ ] Canlıya geçiş kararı (Yusuf)

## Kararlar
- [[10-Projects/kripto-bot/decisions/claude-rolu-kurucu-ve-gozetmen|Claude kurucu ve gözetmen, karar kodda]]
- [[10-Projects/kripto-bot/decisions/binance-global-tr-degil|Binance Global, TR değil]]

## Oturumlar
- [[10-Projects/kripto-bot/sessions/2026-10-16-proje-baslangici|2026-10-16 proje başlangıcı]]
