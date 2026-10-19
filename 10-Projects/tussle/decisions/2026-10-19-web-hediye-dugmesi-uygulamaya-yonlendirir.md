---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, hediye, iap, web, gelir]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), commit `98c61ab`
---

# Karar: web'de hediye düğmesi görünür, "Hak paketi uygulamada" sayfasına götürür

## Bağlam
Arkadaşların çoğu web'den giriyor; web'de hediye düğmesi yoktu, özellik görünmüyordu. Satın alma yalnız mağaza uygulamalarında (Play Billing, StoreKit 2) mümkün ([[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]]).

## Karar
- Düz web ziyaretçisi için düğme görünür; dokununca "Hak paketi uygulamada" sayfası mağaza kurulum adımlarıyla açılır.
- **Yalnız düz web.** Mağazası olmayan native derlemede (mağaza bilgisi yok) eski "kullanılamıyor" sayfası kalır; native davranış değişmedi. İnceleme bu orta bulguyu yakaladı ve düzeltildi.

## Neden
Özelliği görünür kılar ve web kullanıcısını uygulamaya yönlendirir; ödemeyi webe taşımak mağaza kurallarına ve doğrulama yüküne girer.

## Reddedilen alternatifler
- Web'de düğmeyi gizli tutmak: özellik fark edilmez, uygulamaya geçiş teşviki olmaz.
- Web ödemesi: mağaza dışı ödeme ve ayrı doğrulama gerekir, bu aşamada kapsam dışı.
- Mağazasız native derlemede de web sayfasını göstermek: yanlış yönlendirme (kullanıcı zaten uygulamada).

Oturum: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]. İlgili: [[2026-10-19-odada-kim-var-rozeti-ve-serit-v3]] (katalog mağazaya göre).
