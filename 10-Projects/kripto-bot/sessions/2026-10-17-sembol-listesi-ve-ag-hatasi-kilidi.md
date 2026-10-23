---
type: session
project: kripto-bot
date: 2026-10-23
status: active
tags: [kripto-bot, session]
source: kripto-bot oturumu "sembol listesini genişletme / ağ hatası kilidi düzeltmesi" (2026-10-17..23)
---

# Oturum 2026-10-17..23: ilk 5 sembol, emir öncesi ağ hatası kilitlemez, ilk alım-satım

- 10-17: Yusuf daha çok sembol istedi. 20 coin araştırıldı → liste ilk 5'e çıktı ([[sembol-listesi-ilk-5]], `fa8fecd`). Bir sonraki turda testnet'teki ön yüklü SOL/XRP/BNB satıldı (raporda "+1.588 USDT / 24 saat" göründü; kâr değil).
- 10-19 19:05: tek `RequestTimeout` hata kilidini kurdu, bot ~27 saat durdu. 10-20: düzeltme ([[emir-oncesi-ag-hatasi-kilitlemez]], `d9a9aa2`), 163 test, inceleme temiz; Yusuf kilidi `error-clear` ile açtı.
- 10-21/22: ilk 4h alım: ~492 USDT BTC. 10-23 öncesi sinyal dönünce satıldı: komisyon dahil -9,37 USDT (ilk kapanan işlem). FIFO PnL raporda doğru çıktı.
- Testnet (`testnet.binance.vision` exchangeInfo) sık cevap vermiyor: günde 7-9 tur ağ hatasıyla atlanıyor; kilit yok, bot sonraki saatte devam ediyor.
- Rapor metni eksiği (açık): ağ atlamaları yüzünden bayatlayınca hâlâ "Bilgisayar/sunucu açık mı?" diyor; "testnet'e ulaşılamadı" demeli.

## İlgili
- [[10-Projects/kripto-bot/_overview]]
