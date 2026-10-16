---
type: lesson
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, vps, binance, ag, ccxt]
source: kripto-bot oturumu "VPS'e taşıma ve Faz 3" (2026-10-16)
---

# Ders: VPS'ten Binance'e istekler rastgele sıfırlanıyor; taşımadan önce curl probu yap, ccxt'yi spot'a kısıtla

- Belirti: `NetworkError ... exchangeInfo`, `ConnectionResetError`; curl ile aynı URL bazen 200, bazen 0,1 sn'de `000`. Büyük yanıtlar (exchangeInfo 2-7 MB) 20 sn'de bitmiyor. Diğer siteler sorunsuz, yani Binance'e özgü.
- `fapi.binance.com` (vadeli) VPS'ten 403; ccxt binance `load_markets` varsayılan olarak spot + vadeli piyasaları çeker ve orada patlar. Çözüm: `options: {"defaultType": "spot", "fetchMarkets": ["spot"]}`.
- Herkese açık mum verisi için `data-api.binance.vision` (resmi veri aynası): `ex.urls["api"]["public"] = "https://data-api.binance.vision/api/v3"`.
- Prob şablonu: 6 farklı siteye 6'şar `curl -4 -s -m 8 -o /dev/null -w "%{http_code}"`; yalnız Binance düşüyorsa ağ değil, filtre.
- VPS'te `cron` yok, systemd timer kullan (`OnCalendar=*-*-* *:05:00 UTC`, `Persistent=true`).
- Mac'ten tar ile taşırken `COPYFILE_DISABLE=1` koy; yoksa `._*` AppleDouble dosyaları ve "unknown extended header" uyarıları gelir. Çıkarınca `chown -R root:root`, yoksa git "dubious ownership" der.

## İlgili
- [[10-Projects/kripto-bot/decisions/bot-macte-calisir-vps-binance-engeli]]
