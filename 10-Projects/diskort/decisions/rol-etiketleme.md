---
type: decision
project: diskort
date: 2026-10-12
status: active
tags: [diskort, roller, mesaj, bildirim]
source: Claude Code oturumu 2026-10-12 (commit cb62d5a)
---

# Karar: Rol etiketleme (@rol) her üyeye açık, mesaj başına en fazla 3 rol

## Bağlam
Yusuf 2026-10-12'de "roller etiketlenemiyor" dedi. Kullanıcı, @everyone ve @here vardı; rol yoktu.

## Karar
- Mesajda gömülü biçim `<@&rolId>` (Discord ile aynı); kullanıcı etiketi düz `@kullanıcıadı` kaldı.
- Yazma kutusunda `@` ile roller de önerilir (rol rengi, "Rol" alt yazısı); kutuda `@Rol Adı` görünür, gönderirken çevrilir; URL içindeki `@ad` çevrilmez; Türkçe I/İ eşleşir.
- Sunucu: o role sahip, kanalı görebilen, yazar dışı üyeler mevcut `mentions.userIds` yoluna eklenir (sayaç + push); şema değişmedi. Mesaj başına en fazla 3 rol bildirim üretir (toplu bildirim sınırı). "everyone"/"here" adlı rol açılamaz.
- İstemci kendi rollerini bildiği için vurguyu kendisi yapar (rol sonradan verilirse eski mesajlar da vurgulanır, Discord gibi).
- DM'de rol yok. Mobil yalnız JS (OTA).

## Neden
Küçük arkadaş grubu; "basit tut": ayrı "etiketlenebilir" bayrağı ve yetki eklemedik, spam riski 3 rol sınırıyla kesildi.

## Reddedilen alternatifler
- Discord'daki rol başına `mentionable` bayrağı: ek UI ve yetki; gereksiz.
- Rol etiketini `MENTION_EVERYONE` yetkisine bağlamak: grubun çoğu kullanamazdı.
- Şemaya `mention_role_ids` eklemek: istemci rolleri zaten biliyor, gerek kalmadı.
