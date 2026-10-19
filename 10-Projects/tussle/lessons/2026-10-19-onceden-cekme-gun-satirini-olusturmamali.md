---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, akicilik, sunucu, gecis]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19/20)
---

# Ders: odayı önceden çekmek günün satırını oluşturmamalı (oyun seçimi donar)

- Belirti: uygulama açıldıktan sonra ilk oda girişinde kart dönüşmüyordu; ikinci girişte dönüşüyordu. Neden: oda verisi yalnız bellekte, yalnız odaya girince önbelleğe alınıyordu; paylaşılan öğe hedefi yakalama anında yoktu.
- Çözüm: ana sayfa boşta odaları önceden çeker, dokununca istek başlar, geçiş en çok 150 ms bekler.
- **Tuzak:** `GET rooms/:code/today` ve `GET iap/catalog` `daily.current()` çağırır, günün satırını oluşturur ve oyun seçimini dondurur (oda sahibi havuzu artık değiştiremez). İstenmemiş önceden çekme önce salt okunur `GET rooms/:code` alır; `today.picked` doğru ve `closesAt`'a 5 sn'den fazla varsa günlüğe dokunur. Kilitli oda hiç çekilmez (arkadaş katılmışsa 1. günü oluştururdu). Sunucu özetine `picked` eklendi.
- Gün dönümünde bayat ipucu: önbellekteki "gün açık" bilgisine güvenme, taze detayla doğrula. Hediye kataloğu gün başına önbelleğe alınır (yeni günde düşer); hesap değişince geç cevap yazılmaz (`accountGen`).

İlgili: [[2026-10-19-karttan-karta-gecis-bitmis-gun-afisi]], [[2026-10-19-gecis-olcumu-gizli-bolme-ve-view-transition-tuzaklari]].
