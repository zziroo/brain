---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, urun, denge, varyant]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Karar: Varyantlar (modlar) kaldırıldı; her oyun tek ve sabit

## Bağlam
2026-10-09'da oda parametreleri kalkmış ama varyantlar "farklı oyun" sayılarak kalmıştı ([[2026-10-09-oda-parametreleri-kaldirildi-varyantlar-kalir]]). Yusuf: modlar "oyuna bakış açımızı her seferinde değiştiriyor"; oyunlar tek ve sabit olsun; birleştirilebiliyorsa ana oyun olarak yapılsın ama çok karıştırmaya gerek yok (rüzgâr modunu oyun içi adımlara koymaya gerek yok); oynanış basit ve etkili.

## Karar
- 12 oyunda yalnız ilk mod kaldı: bicak, cift, havada, isik, kapi, kule, matematik (toplama), refleks, renk, tamzaman, yilan, zipla. Ölü mod kodu silindi; hiçbir mod ana oyuna katılmadı (hepsi karmaşıklaştıran türdendi).
- Kalan modun simülasyonu birebir aynı: inceleme ajanı eski/yeni sim'i 12 oyun × 160 koşuda tıpatıp doğruladı; rng çekim sırası korunsun diye boş çekimler bırakıldı; sürüm artmadı.
- Altın tohum testleri eklendi (12 oyun): boş rng çekimi silinirse test kırılır, o zaman sürüm artışı gerekir.
- Altyapı (variants dizisi, `days.variant`) kaldı; her oyunda tek giriş.
- Sunucu: gün/maç satırındaki silinmiş mod id'si `effectiveVariantId` / `storedParamsFor` ile klasik + varsayılan parametreye çözülür; eski sekmeden gelen fazla parametre anahtarları yok sayılır (`sameSchemaParams`).
- `docs/GAME-CONTRACT.md`, `DESIGN.md`, `GAMES-ROADMAP.md` güncellendi.

## Neden
Oyun hissi sabit kalmalı; oyuncu her gün aynı oyunu aynı kurallarla tanır. Denge ve test tek mod üzerinde daha basit.

## Reddedilen alternatifler
- Modları oyun içi aşama yapmak (ör. rüzgârın sonradan gelmesi): Yusuf istemedi.
- Modları ana oyuna katmak: hepsi oyunu karmaşıklaştırıyordu.
- Varyant altyapısını da sökmek: gerek yok; eski gün satırlarının çözümü için kaldı.

## Sonuçlar / riskler
- Bilinen etki: deploy gününü kesen günlerde tablo eski mod ve klasik koşularını birlikte sıralar (tek günlük).
- İncelemede orta bulgu: gün satırı modun çözülmüş parametrelerini saklıyordu, silinmiş modla açılmış gün "melez" oyun olurdu; düzeltildi.

## İlgili
- [[2026-10-09-oda-parametreleri-kaldirildi-varyantlar-kalir]] (yerini aldı)
- [[2026-10-13-kapak-varyant-dort-ok-dersleri]]
