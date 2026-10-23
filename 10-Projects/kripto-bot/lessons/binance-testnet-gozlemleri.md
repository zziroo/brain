---
type: lesson
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, binance, testnet, ccxt]
source: kripto-bot oturumu "Faz 2 testnet döngüsü" (2026-10-16)
---

# Ders: Binance spot testnet gözlemleri (ön yüklü hesap, fee alanı, clientOrderId)

- testnet.binance.vision anahtarı GitHub girişiyle alınır; hangi GitHub hesabı olduğu önemsiz, yalnız anahtarı yenilemek için aynı hesap gerekir. `.env` dosyası noktayla başladığı için Finder'da gizli; `open -a TextEdit <yol>` ile açtırmak en kolayı.
- Hesap ön yüklü gelir (1 BTC, 1 ETH, 10.000 USDT, ~95k USDT eşitlik). Bot bunları pozisyon sayar; risk yüzdeleri 500 USD planını temsil etmez. Testnet yalnız davranışı doğrular.
- ccxt 4.5.88: `set_sandbox_mode(True)` spot için doğru URL'ye gider; market emri hemen `status: "closed"`. `fetch_order` yanıtında `fee: None`, ücret yalnız `create_order` yanıtında (`fee: {currency: BTC, cost: 0.0}`); kodda fallback var.
- `newClientOrderId` tekilliği yalnız açık emirler arasında; dolmuş emirden sonra aynı id reddedilmez. Dedupe için güvenme, borsadan uzlaştır.
- Anahtar kontrolü yaparken değeri yazdırma: `grep -cE "^BINANCE_TESTNET_API_(KEY|SECRET)=.{10,}" .env` yeter.
- Claude uygulamasının zamanlanmış görevi cron saatine birkaç dakika sabit gecikme ekler (09:00 → 09:13); bu normal.
- `testnet.binance.vision` sık cevap vermiyor: 2026-10-22/23'te günde 7-9 saatlik tur exchangeInfo'da NetworkError ile atlandı. Emir öncesi olduğu için kilit yok ([[emir-oncesi-ag-hatasi-kilitlemez]]); rapordaki "N saat çalışmadı" uyarısı bu yüzden yanıltıcı olabilir.

## İlgili
- [[faz2-emir-dongusu-guvenlik-tasarimi]]
