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

Klasör: `~/ZZ/zProjects/kripto-bot` (henüz boş, yalnız `BASLANGIC-NOTU.md`).

## Mimari (karar verildi, kod yok)
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

## Güncel durum (2026-10-16)
- Proje klasörü açıldı, başlangıç notu yazıldı. Kod, repo, test yok.
- Faz 1 oturumu ZZ kökünden **başlatılamadı** (uygulama turu otomatik saydı, bkz. [[10-Projects/kripto-bot/lessons/start-session-otomatik-tur-reddi|ders]]). Yusuf "başlat" deyince `cwd` ile `kripto-bot` klasöründe açılacak.

## Sıradaki işler
- [ ] Faz 1: iskelet (data, 2 strateji, risk, backtest, exchange, CLI, testler), BTC/ETH 1h 2 yıl backtest tablosu, README + CLAUDE.md, ilk commit
- [ ] Faz 2: risk motorunu testnet'te canlı döngüye bağla (paper-run)
- [ ] Faz 3: salt okunur gözetim görevi (zamanlanmış), web pano
- [ ] Canlıya geçiş kararı (Yusuf)

## Kararlar
- [[10-Projects/kripto-bot/decisions/claude-rolu-kurucu-ve-gozetmen|Claude kurucu ve gözetmen, karar kodda]]
- [[10-Projects/kripto-bot/decisions/binance-global-tr-degil|Binance Global, TR değil]]

## Oturumlar
- [[10-Projects/kripto-bot/sessions/2026-10-16-proje-baslangici|2026-10-16 proje başlangıcı]]
