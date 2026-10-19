---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oyunlar, kimlik, db, rota]
source: oturum "tussle: oyun kimlikleri İngilizceye" (2026-10-19 akşam)
---

# Karar: oyun kimlikleri görünen addan İngilizce kebab-case, rota `#/game`

## Bağlam
Görünen adlar 19 Eki'de İngilizceye ortaklandı (Lane Dash, Four Arrows); kod kimlikleri, klasörler ve bağlantılar Türkçe kalmıştı (serit, dortok). Yusuf kimliklerin de İngilizce olmasını istedi, adlandırmayı Claude'a bıraktı ("isimlendirmeleri sana bırakıyorum, sen nasıl dersen").

## Karar
- 44 kimlik meta `name`'den kebab-case: serit → lane-dash, dortok → four-arrows, zincir → chain, denge → balance, kule → stack, refleks → reflex... (jetpack, spiral aynı). Tablo `src/shared/legacy-game-ids.ts` (donmuş).
- Görünen adlar değişmedi.
- Yalnız oyun rotası değişti: `#/oyun/<id>` → `#/game/<id>`; eski bağlantı yeni adrese yönlenir.
- DB göçü 22 kayıtlı her kimliği taşır (gün, maç, antrenman, parti seçimleri, odanın kapalı oyunları, sohbet akışı, girdi loglarının `g` alanı + log_hash).
- Commit `c81a8b7` (dal `claude/dazzling-mcclintock-a795fa`, main `fb9f2dd` üstünde); yayın bekliyor.

## Neden
- Ad ile kimlik aynı olunca raporda, geri bildirimde ve linkte eşleme gerekmiyor.
- Kebab-case URL'de okunur; doğrulayıcılar (`feed`, `checkMeta`, `new-game`, parite) tireyi kabul edecek şekilde genişletildi.
- Göç küçük ve ucuz (geliştirme DB kopyasında 3 ms), geri uyum gerekmiyor (hafıza kuralı "geri uyum gerekmez").

## Reddedilen alternatifler
- Tek kelime kimlik (lanedash): okunmuyor.
- Diğer rotaları da çevirmek (`oda`, `ayarlar`, `profil`): davet bağlantıları dışarıda dolaşıyor, kazancı küçük.
- Havuz etiketlerini (refleks/zeka/beceri/sans) ve skor birimlerini (bicak, cift, kopru) çevirmek: ayrı ad alanı, kapsam dışı.
- TS tip/fonksiyon adlarını (RefleksState) çevirmek: davranış değiştirmez, fark büyür.
- Görünen adları da değiştirmek (Yusuf izin verdi): adlar yeni ortaklandı, tekrar oynamak karışıklık yaratır.

## Sonuçlar / riskler
- Sunucu ve OTA birlikte yayınlanmalı. Eski istemcinin yeni kimlikli oyunda güncelleme ekranına düşmesi beklenir ama denenmedi (status: unverified).
- Cihaz başı "başlama sayısı" (`tussle.starts.v1`) tablo üzerinden taşınır.
- Eski log/geri bildirimde Türkçe kimlik görülürse tablodan eşlenir.

## İlgili
- [[2026-10-19-oyun-kimligi-yeniden-adlandirma-dersleri]]
- [[2026-10-19-tussle-oyun-kimlikleri-ingilizce]]
