---
type: decision
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, risk, exchange, testnet, fail-closed]
source: kripto-bot oturumu "Faz 2 testnet döngüsü" (2026-10-16)
---

# Karar: Gerçek emirli döngü borsadan uzlaştırır, mum başına bir kez işler, hata olunca kilitlenir ve insan açar

## Bağlam
Faz 2'de `kbot run` testnet'e (ve üç kapı açılırsa canlıya) gerçek market emirleri gönderir. İnceleme ajanı iki orta bulgu verdi: canlıda önceden var olan coinlerin satılması ve saatlik zamanlayıcı altında hata sonrası otomatik tekrar.

## Karar
- **Pozisyon ve eşitlik her turda borsadan** (`fetch_balance` + `fetch_ticker`); bellekteki duruma güvenilmez. Alış yalnız flat'ken, satış yalnız pozisyon varken.
- **Mum başına idempotent:** `state/trader_state_<mode>.json` içinde sembol başına son işlenen mum; aynı mumda ikinci çalıştırma "already". Deterministik `clientOrderId` yalnız iz sürmek için (Binance tekilliği yalnız açık emirlerde arar).
- **Toz kuralı:** bakiye × fiyat < min cost ise flat sayılır, satılmaz.
- **Hata kilidi:** dolmayan emir ya da beklenmeyen hata `state/trader_error_<mode>.json` yazar; sonraki turlar başlamaz; `kbot error-clear --loop` yalnız insan. Kill switch exit 2, ayrı mekanizma (`risk-reset`).
- **Önceden var olan coinler:** bot alışı kaydı yoksa satışta uyarı; canlıda `manage_existing_holdings: true` olmadan satılmaz.
- **Döngü başına ayrı risk dosyası:** `risk_state_{paper,testnet,live}.json`; paper zirvesi canlıya sızmaz.
- Girişte `OrderTooSmall` → atla ve mumu işlenmiş say; satışta fail-closed.
- Canlı üç kapı aynen: `mode: live` + `allow_live_orders` + süreç ortamında `KBOT_I_UNDERSTAND_LIVE_TRADING=yes` (`.env`'den okunmaz).

## Neden
- Market emri gönderildikten sonra çökme olsa bile bir sonraki tur borsadaki gerçek durumu görür; çift alış/satış olmaz.
- Zamanlayıcı saatte bir tekrar çağırır; kilit olmadan "fail closed" sözü boş kalır.
- Canlı hesapta kullanıcının kendi coinini botun satması kabul edilemez.

## Reddedilen alternatifler
- Bellekte pozisyon takibi: restart ve çökmede tutarsız.
- Hata sonrası otomatik retry: emir yolunda belirsizlik, retry fırtınası.
- clientOrderId'ye güvenerek dedupe: Binance dolmuş emirde reddetmiyor.

## Sonuçlar / riskler
- Kilitlenen bot insan müdahalesi bekler; sabah raporu uyarır.
- Kill switch satışı canlıda bot alışı kaydı yoksa reddedilir ve her saat loglanır.

## İlgili
- [[emir-oncesi-ag-hatasi-kilitlemez]] (2026-10-20: emir öncesi ağ hatası artık kilitlemez)
- [[10-Projects/kripto-bot/_overview]]
- [[claude-rolu-kurucu-ve-gozetmen]]
- [[binance-testnet-gozlemleri]]
