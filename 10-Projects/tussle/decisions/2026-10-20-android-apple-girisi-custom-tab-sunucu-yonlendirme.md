---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, android, apple, giris, auth, guvenlik]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi); repo commit'leri 348d725, e3771bd, 603da9f"
---

# Karar: Android'de Apple girişi Custom Tab + sunucu yönlendirme akışıyla (apple-redirect.ts), APPLE_ANDROID bayrağıyla açılır

## Bağlam
iPhone'da Apple'la açılan hesap Android'de açılamıyordu. Neden: Android TWA'dan Capacitor'a dönüşte (1.3) native düğmelere yalnız Google eklendi ("Play'de kural yok"). Apple'ın Android SDK'sı yok.

## Karar
- Uygulama Apple'ın web yetkilendirmesini Custom Tab'de açar (social-login eklentisinin `openSecureWindow`, mevcut mağaza yapısında var → OTA + sunucu yeterli).
- Sunucu `src/server/apple-redirect.ts`: `POST /api/auth/apple/start` (HMAC imzalı durumsuz state, nonce, uygulamada kalan verifier); Apple `form_post` ile zaten kayıtlı Return URL `/` üzerine POST eder (yalnız POST + form); sunucu state / ID token (aud = Services ID) / nonce doğrular, 303 ile Chrome intent → App Link `?apple_return=`; betiksiz yedek "Tussle'a dön" sayfası; `/api/auth/apple/redeem` tek kullanımlık 2 dk kod. Apple hesabı başına ≤ 3 açık cevap.
- Android Apple düğmesi iOS'la aynı görünüm; yalnız `/api/auth/providers` `apple.android: true` derse görünür. Açma bayrağı sunucu `.env`'de `APPLE_ANDROID=1` (tek satırla kapanır; 20 Eki'de açıldı). Kurulum: repo `docs/AUTH-SETUP.md` §5.1.
- Derin inceleme (high) iki tur: hesap ele geçirme yolu yok; orta DoS bulgusu (global akış sınırı) durumsuz state ile kapandı.

## Neden
- Native derleme gerektirmeden, mevcut 1.x mağaza yapısıyla açılabiliyor; durum doğrulaması sunucuda.

## Reddedilen alternatifler
- Eklentinin kendi Android Apple akışı: `MainActivity` değişikliği = native derleme, state doğrulaması yok, sekme kapanınca takılıyor.
- Yeni Return URL (`/auth/apple/callback`): Apple portalında ek adım gerektirirdi; zaten kayıtlı `/` kullanıldı.

## Sonuçlar / riskler
- Gerçek cihazda hiç denenmedi: Custom Tab'de 303 → intent dönüşü otomatik mi, yoksa yedek düğme mi çıkıyor bilinmiyor. (doğrulanmadı)

## İlgili
- [[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]] · [[2026-10-17-ios-native-giris-capgo-social-login]] · [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]]
