---
type: decision
project: diskort
date: 2026-10-10
status: active
tags: [diskort, presence, mobil, ui]
source: Claude Code oturumu 2026-10-10 (0.10.3)
---

# Karar: Yalnız telefondan bağlı kullanıcının durum noktası telefon simgesi olur

## Bağlam
Yusuf Discord'daki "telefondan bağlı" göstergesini istedi.

## Karar
- Sunucu `presenceOf()`: kullanıcının tüm canlı gateway oturumları android/ios ise presence'a `mobile: true` (yalnız true iken gönderilir). Görünmez/çevrimdışında yok. Şema değişikliği yok; platform IDENTIFY'dan, gelmezse masaüstü sayılır.
- client-core `onMobileOf` / `useOnMobile`; masaüstü `StatusIcon`/`Avatar`, mobil `StatusDot`/`Avatar` telefon rozeti (çevrimiçi/boşta/rahatsız etme renginde). Üye listesi, DM listesi/başlığı, profil, arkadaşlar; mobilde kendi avatarı da.
- Ayar yok (basit tut).

## Neden
Eski istemciler alanı yok sayar, karışık oturumda yük aynı kalır; geriye uyumlu, deploy kimseyi etkilemez.

## Reddedilen alternatifler
- Platform listesini olduğu gibi göndermek: gereğinden fazla bilgi; tek boolean yeterli.

## Sonuçlar / riskler
- Telefon simgesi noktadan ~1,5 kat uzun; canlı üye listesinde ve 80 px profil kartında görüntü doğrulanmadı. (unverified)
- "boşta + telefon" fiilen "uygulama arka planda" bilgisini verir (ürün tercihi).

## İlgili
- [[arkadaslik-sistemi]], [[sessions/2026-10-10-macos-imza-telefon-gostergesi-0-10-3]]
