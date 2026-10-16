---
type: decision
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, binance, borsa]
source: ZZ oturumu "kripto-bot: proje başlangıcı" (2026-10-16)
---

# Karar: Bot Binance Global'de çalışır, Binance TR'de değil

## Bağlam
Yusuf "Binance TR mi Global mi, fark eder mi" diye sordu.

## Karar
Binance Global spot; testnet varsayılan. TL yatırma/çekme gerekirse Binance TR yalnız köprü olarak kullanılır (TL → USDT → Global).

## Neden
- Testnet yalnızca Global'de var; parayı riske atmadan bot çalıştırmanın tek yolu.
- ccxt gibi standart kütüphaneler Global API ile çalışır; TR'nin ayrı ve kısıtlı API'si var, kütüphane desteği zayıf.
- Global'de USDT pariteleri derin; TR'de hacim düşük ve çoğu parite TRY bazlı, spread ve kayma daha kötü.
- Backtest verisi zaten Global'den; aynı borsada işlem tutarlılık sağlar.

## Reddedilen alternatifler
- Binance TR: tek avantajı kolay TL giriş/çıkışı; bot için yukarıdaki eksikler ağır basıyor.

## Sonuçlar / riskler
- Transfer adımı (TR → Global) Yusuf'un işi; bot buna karışmaz.

## İlgili
- [[10-Projects/kripto-bot/_overview]]
