---
type: project
project: kripto-bot
date: 2026-10-17
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

## Güncel durum (2026-10-17 gece, Faz 2 kodlandı)
- Yerel repo, 5 commit (son: `811f129` Faz 2). Remote yok. uv + Python 3.12, 118 test, ruff temiz.
- Komutlar: `uv run kbot download|backtest|paper-run|run [--until-next-close|--loop]|status|risk-reset --loop paper|testnet|live|error-clear --loop testnet|live|show-config`.
- Faz 2 (`trader.py`): her turda borsadan bakiye+ticker ile uzlaştırma, mum başına idempotent işlem (`state/trader_state_<mode>.json`), toz kuralı (min cost altı = flat), market emri + `fetch_order` doğrulaması, kill switch'te düzleştirme ve exit 2, hata kilidi `state/trader_error_<mode>.json` (insan `error-clear` ile açar), canlıda önceden var olan coinler `manage_existing_holdings` olmadan satılmaz. Live üç kapı aynen duruyor.
- Zamanlama: bot **Mac'te** launchd ajanı `com.ziroo.kripto-bot.run` ile her saat :05'te çalışıyor (Mac hep açık). VPS'e taşıma denendi (2026-10-16): kod `/opt/kripto-bot`'ta, systemd timer kurulu ama **kapalı**; VPS'ten Binance'e isteklerin ~yarısı anında sıfırlanıyor, diğer siteler sorunsuz (Binance'e özgü filtre). Ayrıntı `deploy/README.md`. İki bot aynı anda çalışmamalı.
- İlk testnet turu 2026-10-16 atıldı: anahtar `.env`'de, `kbot status` ve `kbot run` çalıştı. Hesap ön yüklü (1 BTC, 1 ETH, 10.000 USDT; equity ~94.850 USDT), sinyal 1 → "hold", emir yok; ikinci tur "already" (idempotent). Emir yolu küçük al-sat ile doğrulandı: market emri hemen `closed`, `fetch_order` fee=None dönüyor (create yanıtında var; fallback eklendi). Not: ön yüklü bakiye yüzünden risk yüzdeleri 500 USD planını temsil etmiyor; testnet yalnız davranışı doğrular.
- Strateji: 1d `trend_filter_cross` (20/50/200, min_hold 5, cooldown 3), kill switch %40. Araştırma raporu: `reports/strategy-research-2026-10-16.md`.
- Bilinen sınırlar: sinyal mainnet mumundan, fiyat testnet ticker'ından; clientOrderId yalnız açık emirlerde tekil (asıl koruma uzlaştırma); kill switch satışı canlıda bot alışı kaydı yoksa reddedilir ve her saat loglanır.

## Sıradaki işler
- [ ] launchd kurulumu (Yusuf onayıyla) (`deploy/README.md`), 3-6 ay testnet gözlemi
- [ ] Faz 3: salt okunur gözetim görevi (zamanlanmış rapor: PnL, hata kilidi, kill switch) + web pano
- [ ] GitHub remote (özel) açılsın mı? (Yusuf)
- [ ] Canlıya geçiş kararı (Yusuf; ayrı hesap ya da `manage_existing_holdings`)

## Kararlar
- [[10-Projects/kripto-bot/decisions/claude-rolu-kurucu-ve-gozetmen|Claude kurucu ve gözetmen, karar kodda]]
- [[10-Projects/kripto-bot/decisions/binance-global-tr-degil|Binance Global, TR değil]]

## Oturumlar
- [[10-Projects/kripto-bot/sessions/2026-10-16-proje-baslangici|2026-10-16 proje başlangıcı]]
