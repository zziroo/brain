---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, karar, tasarim, sayfa-dili, live-kit]
source: oturum 2026-10-22 (mobil-playus), [[2026-10-22-tussle-gecis-cubugu-sezon-oyuncu-karti-kilic-dili]]
---

# Karar: ⚔ sayfasının dili uygulamanın genel sayfa şablonu olur

## Karar
Her sheet/sayfa aynı kalıpta: başlık + X, altında lede satırı (chip + kısa bilgi), onun altında `.live-rows` kutuları. Bir alt sayfaya gidiş: listelerde chevron'lu satır (`liveLink`), tek bağlantıda lede ucunda pill (34 px, dokunma alanı 44 px). Ortak parçalar `src/client/ui/live-kit.ts` (`liveLede/liveRow/liveFold/liveLink/liveSend`). Uygulananlar: ⚔ (Kapışma/Arena/Parti), sezon sayfası, oyuncu kartı.

Sıradaki ekranlar: ayarlar → oda ayarları → profil. Ana ekran ve oda ekranının kart yapısı kimlik; dokunulmaz.

## Neden
Yusuf "her ekran bir yerden çıkmış gibi kompakt ve uyumlu" olsun istedi ve ⚔ sayfasını beğendi. Tek kalıp hem tutarlılık hem kompaktlık verir (oyuncu kartı 470 → 431 px, sezon üstü kısaldı), ortak kit yeni ekranı ucuzlatır.

## Reddedilen alternatifler
- **Geçmiş bağlantısı sağ üstte X'in yanında:** X ile yarışır, padding hilesi gerekiyordu.
- **A varyantı (Geçmiş için `liveLink` satırı, kutu 137 px):** tek bağlantı için fazla yer; satır dili uzun listelerde değerli. Yusuf ikisini de beğendi, Claude B'yi (pill, kutu 64 px) seçti.
- **Ana ekran / oda ekranını da aynı kalıba çekmek:** kart yapısı kimlik, dokunulmadı.

**Ek (22 Eki, profil):** sayısal "bir bakışta" bilgi (istatistikler) karo ızgarası olarak kalır, satır dili ayar/eylem/bağlantı listeleri içindir; karo ızgarası şablona kutu içinde `.live-block` olarak girer (rozet ızgarası gibi). Yusuf satır sürümünü görünce karoları geri istedi.
