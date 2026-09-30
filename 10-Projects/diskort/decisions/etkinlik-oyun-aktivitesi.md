---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, etkinlik, presence]
source: memory diskort-rules.md, diskort-handoff.md
---

# Etkinlik (oynanan oyunu gösterme) eski reddin tersine istendi; Windows'ta otomatik algılanır, varsayılan açık

## Bağlam
Daha önce reddedilen özellik Yusuf tarafından 2026-09-30'da geri istendi (0.9.0'ın ana özelliği).

## Karar
- Masaüstü (Windows) oynanan oyunu algılar: başlatıcı kütüphane klasörlerinden otomatik (Steam/Epic/Battle.net) + elle ekle/gizle.
- Paylaşım varsayılan AÇIK, ayarlarda anahtar var.
- İkon = exe'nin kendi ikonu, bizim sunucuya yüklenir.
- Gösterim: üye listesi alt metni, profilde "Oynuyor" kartı, DM listesi/başlığı, sesli üye hover kartı. Mobil yalnız gösterir.
- Rich presence (seviye, katıl butonları) ve Discord oyun listesi YOK. Tarayıcı yalnız giriş yapılmışken ve anahtar açıkken çalışır.
- Sonra: aynı kartta Spotify tarzı `listening` (açık öneri).

## Neden
Yusuf bu sefer açıkça istedi. Kapsam bilerek dar tutuldu ([[urun-basit-tutma-reddedilen-fikirler]]).

## Reddedilen alternatifler
- Rich presence, Discord oyun listesi.
- Üye listesinde ayrı Etkinlik grubu ve hızlı mesaj butonu.

## Sonuçlar / riskler
Gerçek hayatta test edilmedi: gerçek oyunlar, anti-cheat'li oyunlar (Valorant), Battle.net oyunu, cihazda mobil. E2E yalnız yerelde (9/9). Yusuf 4 kartlı profil kaydırmasını gerçek kullanımdan sonra değerlendirecek. Kod haritası için [[_overview]] "Güncel durum".

## İlgili
- [[kozmetik-sadece-hover]]
