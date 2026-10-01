---
type: decision
project: diskort
date: 2026-10-02
status: active
tags: [diskort, dm, gizlilik, yonetim-paneli]
source: Claude Code oturumu 2026-10-01/02 (DM arama + engelleme, 0.9.6)
---

# Karar: Yönetim panelinde DM aramaları "Özel arama" olarak, isimsiz görünür; teşhis verisi tutulur

## Bağlam
Ses kalitesi, donma teşhisi, olay kaydı ve hat testi gibi panel yüzeyleri kanal/katılımcı gösterir. DM aramaları bunlara girince kimin kimi aradığı görünecekti.

## Karar
- DM aramalarının kalite ve donma verisi tutulur, ama kayıt sırasında takma kimliklere (`ozel-…`) çevrilir. Takma kimlik konuşma + kullanıcıdan, süreç başına rastgele anahtarla üretilir; aynı kişi farklı DM'lerde farklı kimlik alır.
- Panelde oda "Özel arama", katılımcılar adsız; DM adı ve gerçek kanal kimliği yok. DM aramaları ses geçmişine yazılmaz; yönetici özel aramadan elle olay kaydı isteyemez (donma olayındaki otomatik istek sürer).
- Platform/sürüm/cihaz telemetrisi korunur (teşhis değeri).

## Neden
Yusuf'un seçimi ("teşhis var, isimler yok"): sorun çıkarsa veri olsun, ama özel konuşmalar panelde izlenmesin.

## Reddedilen alternatifler
- DM aramalarını hiç kaydetmemek: sorun çıkarsa veri olmaz.
- Sunucu kanalları gibi isimli göstermek: özel konuşmaları açığa çıkarır.
- Takma kimliği yalnız kullanıcıdan üretmek (ilk hâl): incelemede kişinin tüm DM aramalarını birbirine bağladığı görüldü, konuşmaya özgü yapıldı.

## Sonuçlar / riskler
- Sınırlı bir söz: çok küçük bir sunucuda yönetici zamanlama ve platformdan kişiyi tahmin edebilir (repo `docs/yonetim.md`'de not var).
- Sunucunun info düzeyi erişim günlüklerinde URL'ler DM kimliği içerir.

## İlgili
- [[dm-sesli-arama-ve-calma]], [[admin-paneli-ve-loglar]]
