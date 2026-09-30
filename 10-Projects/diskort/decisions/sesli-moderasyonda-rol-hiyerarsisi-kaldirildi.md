---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [moderasyon, roller, guvenlik]
source: C--dev-diskort 4b7b1382 (2026-09-27/28)
---

# Karar: Sesli moderasyon (taşı, sustur, sağırlaştır, bağlantıyı kes) rol hiyerarşisine bakmaz; at/yasakla/rol hâlâ bakar.

## Bağlam
Sunucu sahibi sürüklenerek taşınabilsin, Discord gibi davranılsın istendi.

## Karar
Sunucuda `permissions.outranks` kontrolü ses üyesi güncelleme uç noktasından kaldırıldı; istemci tarafı `above` şartı kalktı; testler 403 -> 204 olacak şekilde güncellendi. Kullanıcı açıkça onayladı ("onaylıyorum, discord gibi yap").

## Neden
- Discord'un davranışı; kullanıcı onayı verdi.

## Reddedilen alternatifler
- Hiyerarşiyi korumak: sahip taşınamıyor, Discord'dan farklı.

## Sonuçlar / riskler
Güvenlik testlerinin beklentisini değiştirmek kullanıcı onayı gerektirdi; otomatik mod önce engelledi.

## İlgili
- [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]]
