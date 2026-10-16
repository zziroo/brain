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

## Güncel durum (2026-10-16, gece)
- Yerel repo, 3 commit (`ecf98b8` Faz 1, `45eee48` inceleme düzeltmeleri, `bdb5a89` strateji araştırması). Remote yok. uv + Python 3.12, 86 test, ruff temiz.
- Paket `src/kripto_bot/`: data, strategy (6 strateji), risk, backtest (+walk-forward), exchange, cli, paper. Komutlar: `uv run kbot download|backtest|paper-run|risk-reset --loop paper|show-config`.
- Faz 2 ön koşul düzeltmeleri yapıldı: ayrı `state/risk_state_<paper|live>.json`, reset gün alanlarını korur, günlük taban önceki bar eşitliği, backtest gün devri, her fill'de state kaydı, `OrderTooSmall`, `SecretStr`.
- Strateji araştırması (`reports/strategy-research-2026-10-16.md`): 1h/4h'de hiçbir şey çalışmıyor; 1d trend kuralları (özellikle `trend_filter_cross` 20/50/200, min_hold 5, cooldown 3) uzun vadede B&H'yi getiride yenmiyor ama max DD'yi yarıya indiriyor (2y: ~%25 vs %77-80), 2-4 işlem/yıl, ±%20 parametrede %98+ işaret korunuyor. Örneklem küçük (8 işlem/2y). Varsayılan config buna çekildi, **yalnız paper için**.
- Açık ürün kararı (Yusuf): %15 kill switch bu stratejilere uymuyor (normal DD %25-60, aylar içinde ateşler ve bot kalıcı durur). Limit yükseltilsin mi, yoksa düşük DD'li ama sık duran bot mu?
- Düşük/ileriye dönük notlar: toz (dust) satışları `OrderTooSmall` ile döngüyü durdurur (canlı öncesi çözülmeli); `price_hint` yoksa min-cost kontrolü atlanır; 1d'de %3 günlük limit hiç ateşlemez (bar=gün).

## Sıradaki işler
- [ ] Yusuf kararı: kill switch yüzdesi (öneri: 1d trend için %35-50 ya da strateji seçimine göre) ve 3-6 ay paper dönemi
- [ ] Faz 2: risk motorunu testnet'te gerçek emirli döngüye bağla; dust satışı ve `price_hint` zorunluluğu burada çözülür; 1d döngüsü için zamanlanmış çalıştırma (launchd/cron) tasarımı
- [ ] Faz 3: salt okunur gözetim görevi (zamanlanmış), web pano
- [ ] GitHub remote (özel) açılsın mı? (Yusuf)
- [ ] Canlıya geçiş kararı (Yusuf)

## Kararlar
- [[10-Projects/kripto-bot/decisions/claude-rolu-kurucu-ve-gozetmen|Claude kurucu ve gözetmen, karar kodda]]
- [[10-Projects/kripto-bot/decisions/binance-global-tr-degil|Binance Global, TR değil]]

## Oturumlar
- [[10-Projects/kripto-bot/sessions/2026-10-16-proje-baslangici|2026-10-16 proje başlangıcı]]
