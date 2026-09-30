---
type: decision
project: diskort
date: 2026-09-27
status: unverified
tags: [ios, dagitim, apple]
source: C--dev-diskort 2736605c (2026-09-26/27), C--dev-diskort 4b7b1382 (2026-09-27/28), C--dev-diskort fed9b022 (2026-09-28)
---

# Karar: iOS dağıtımı Apple Developer hesabıyla Ad Hoc imzalı IPA ve kendi indirme sayfamızdan yapılır; TestFlight/App Store yok.

## Bağlam
Kullanıcı "iOS için APK tarzı bir yöntem yok mu" diye sordu; arkadaşlar iPhone kullanıyor.

## Karar
Kişisel Apple Developer hesabı (yıllık ücretli; kullanıcı lira cinsinden ~1.000 TL gösteren fiyatı sordu, sonra ödedi) alındı. Arkadaşların UDID'i kendi yaptığımız sayfadan toplanır, cihazlar Apple'a eklenir, Ad Hoc profil ve GitHub secret'ları ile CI'da IPA derlenir; 0.8.1'de ilk IPA, bir arkadaşın cihazı onaylandı. İmzalama bilgileri şifrelenerek saklanacak. Yılda 100 cihaz sınırı. iOS işi birkaç kez askıya alındı ve sürümleri bekletmiyor: CI'da secret yokken iOS adımı saniyeler içinde atlanıyor.

## Neden
- Ad Hoc: inceleme yok, "Discord'a benziyor" reddi riski yok, güncellemeler ve bildirimler (APNs) çalışır.
- 100 cihaz, 20 kişilik grup için yeterli.

## Reddedilen alternatifler
- AltStore/SideStore (ücretsiz): 7 günde bir yenileme, bildirim yok, her arkadaş kendi kurar; pratik değil.
- App Store/TestFlight: inceleme ve red riski.

## Sonuçlar / riskler
Durum: başlatıldı ama kesin çalışır durumda olduğu doğrulanmadı (son oturumda bir arkadaşın kurup kuramadığı sorusu ve derleme takibi sürüyordu). Hesap onayı bekleniyordu.

## İlgili
- [[2026-09-28-ios-davet-kurali-profil-suslemeleri-orkestrasyon]]
- [[2026-09-26-metin-kanallari-ve-android-baslangic]]
- Memory kaynaklı not: [[ios-ad-hoc-dagitim]]
