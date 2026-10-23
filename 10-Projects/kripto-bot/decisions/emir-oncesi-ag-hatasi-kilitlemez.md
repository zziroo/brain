---
type: decision
project: kripto-bot
date: 2026-10-20
status: active
tags: [kripto-bot, trader, hata-kilidi, fail-closed]
source: kripto-bot oturumu "ağ hatası kilidi düzeltmesi" (2026-10-20)
---

# Karar: Emir gönderilmeden önceki ccxt NetworkError hata kilidi yazmaz, tur atlanır

## Bağlam
2026-10-19 19:05'te tek bir `RequestTimeout` (`data-api.binance.vision` exchangeInfo, emir öncesi) hata kilidini kurdu; bot ~27 saat işlem yapmadı, Yusuf `kbot error-clear` ile açtı. [[faz2-emir-dongusu-guvenlik-tasarimi]] her hatayı kilitliyordu.

## Karar
O turda henüz emir isteği gönderilmemişse ccxt `NetworkError` (ve alt sınıfları: RequestTimeout, ExchangeNotAvailable, OnMaintenance, DDoSProtection, RateLimitExceeded…) → ERROR log, exit 1, kilit yok; sonraki saatlik tur yeniden dener. Emir isteği gönderildikten sonraki her hata ve ağ dışı tüm hatalar (AuthenticationError, InsufficientFunds, InvalidOrder, hata/bug) eskisi gibi kilitler. Ayrım: `ExchangeClient.order_requests` sayacı gerçek ccxt `create_order` çağrısından hemen önce artar; trader `PreOrderNetworkError` fırlatır. `kbot report` kilit varken doğru metni yazar, son 24 saatteki ağ atlamalarını ve kilit retlerini sayar. Commit `d9a9aa2`.

## Neden
- Emir öncesi hata borsada belirsiz durum bırakmaz; durmak koruma sağlamaz, sadece botu günlerce kapatır.
- Süreç içinde tekrar deneme yok; "no retry loops" kuralı korunur, zamanlayıcının bir sonraki turu yeterli.

## Reddedilen alternatifler
- **Her hatada kilit (eski):** tek ağ titremesi günlerce duruş.
- **Süreç içinde bekle-tekrar dene:** proje kuralı yasaklıyor, emir sonrası durumda tehlikeli.
- **Tüm NetworkError'ları kilitsiz geçmek:** emir gönderildikten sonra borsa durumu belirsiz; orada insan kontrolü gerekir.

## Sonuçlar / riskler
- Kalıcı ağ sorunları (saat kayması -1021, IP yasağı 418) kilit kurmadan her saat denenir; görünürlük rapordaki sayaca bağlı.
- Bilinen küçük eksik: rapor sayaçları ortak `logs/kbot.log`'u modsuz sayar; canlıya geçiş günü testnet satırları karışabilir.
- Live koruması, `dry_run=True` varsayılanı ve `price_hint` kuralı değişmedi (inceleme ajanı doğruladı).

## İlgili
- [[faz2-emir-dongusu-guvenlik-tasarimi]]
- [[binance-testnet-gozlemleri]]
- [[10-Projects/kripto-bot/_overview]]
