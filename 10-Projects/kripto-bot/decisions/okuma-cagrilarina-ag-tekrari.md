---
type: decision
project: kripto-bot
date: 2026-10-23
status: active
tags: [kripto-bot, exchange, ağ, fail-closed, rapor]
source: kripto-bot oturumu "Binance ağ kesintisi teşhisi" (2026-10-23)
---

# Salt okunur borsa çağrılarına sınırlı ağ tekrarı

**Karar:** `ExchangeClient.load_markets / fetch_balance / fetch_ticker` bir ccxt `NetworkError`'da aynı tur içinde en fazla 3 kez denenir (2 s, 5 s ara; `retry_read`). `create_order` ve emir sonrası `fetch_order` hiç tekrar denenmez. `DDoSProtection` ve `RateLimitExceeded` (418/429) de tekrar denenmez: Binance geri çekilme ister, tekrar ban uzatır. Son hata orijinal tipiyle yükselir, böylece "emir öncesi ağ hatası kilitlemez" yolu ([[emir-oncesi-ag-hatasi-kilitlemez]]) aynen kalır. Commit `b21bc0f`.

**Neden:** 21-23 Ekim'de Mac'ten Binance'e (testnet ve mainnet) TLS el sıkışması sırasında bağlantı sıfırlanıyor; denemelerin yaklaşık yarısı anında düşüyor, Google sorunsuz. Günlük atlanan tur 5 → 8 → 9. Tek seferlik `exchangeInfo` çağrısı bütün turu götürüyordu; birkaç saniye sonra ikinci deneme çoğunlukla geçiyor.

**Reddedilen:** mum çekimine (mainnet OHLCV) de tekrar eklemek: bugün çalışıyordu, kapsam dar tutuldu. Tekrar sayısını config'e taşımak: gereksiz ayar yüzeyi. Emir çağrılarına tekrar: fail-closed kuralını bozar, çift emir riski.

**Rapor tarafı:** log kuyruğundaki son ağ atlaması son turdan yeniyse `kbot report` / dashboard "Bilgisayar/sunucu açık mı?" yerine "bot çalışıyor ama X saattir borsaya ulaşamıyor (son tur, son deneme)" der.

**Açık soru:** tekrar yetmezse Mac'in ağ yolu (utun225 169.254.10.2 tüneli, ISS) incelenmeli.
