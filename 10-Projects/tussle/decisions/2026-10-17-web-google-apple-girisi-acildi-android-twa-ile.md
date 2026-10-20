---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [tussle, giris, google, apple, twa]
source: Claude Code oturumu 2026-10-17 "tussle: Google ve Apple girişi" (Yusuf: "önce Google girişini açalım", "olur hangisi uygunsa yapalım")
---

# Karar: Google ve Apple girişi web'de açıldı; Android TWA bunu web akışıyla kullanır, native iş yalnız iOS'ta kaldı

## Bağlam
Giriş ekranı yalnız takma adla misafir hesap açıyordu. Google/Apple kodu hazırdı ama sunucuda kimlikler tanımlı olmadığı için düğmeler gizliydi (`GET /api/auth/providers` iki sağlayıcıyı da `null` veriyordu).

## Karar
- **Google:** GCP projesi `tussle`'da web istemcisi "Tussle web" (origin'ler: `https://tussle.ziroo.net`, `http://localhost:5173`, `http://localhost`; redirect yok). Branding'e ana sayfa, `/privacy` bağlantısı ve yetkili alan `ziroo.net` eklendi. Yayın durumu In production (onayı Yusuf tıkladı). `GOOGLE_CLIENT_ID` sunucu `.env`'de.
- **Apple:** App ID `net.ziroo.tussle`'a Sign in with Apple yeteneği eklendi (primary). Services ID `net.ziroo.tussle.web`, alan `tussle.ziroo.net`, dönüş `https://tussle.ziroo.net/`. `.p8` anahtarı yok (yalnız ID token doğrulanıyor). `APPLE_CLIENT_ID` ve `APPLE_REDIRECT_URI` sunucu `.env`'de.
- Sunucu kodu değişmedi; yalnız `.env` + konteyner yeniden oluşturma. İki giriş Yusuf'un telefonunda denendi ve `identities` tablosunda kayıtları görüldü.
- Android uygulaması TWA (Chrome) olduğu için web düğmeleri orada da var; Android için native Google istemcisi ve SHA-1 işi artık gerekmiyor.
- iOS (Capacitor) düğmeleri gizli kalır (`auth-providers.ts:93`). Native Google + Apple ayrı dilim, ikisi birlikte (Apple 4.8), yeni iOS build ister. Yan oturum kartı önerildi.

## Neden
- Web akışı için hiçbir sır gerekmiyordu ve kod hazırdı; tek eksik konsol kurulumuydu.
- TWA geçişi Android'in native giriş ihtiyacını ortadan kaldırdı.
- Apple ID için Apple cihazı gerekmiyor: kurulum tarayıcıdan, deneme web/Android'den yapılabiliyor.

## Reddedilen alternatifler
- Önce native dilimi bekleyip ikisini birlikte açmak: web ve Android kullanıcıları gereksiz yere bekleyecekti.
- Yalnız Google'ı açmak: iPhone'lu arkadaşlar web'de Apple ile giremeyecekti; Apple kurulumu ucuzdu.

## Sonuçlar / riskler
- App ID'ye yetenek eklemek mevcut provisioning profillerini geçersiz kılar; sonraki iOS yapısında Xcode otomatik imza yeniler.
- `store/listing.md`'deki "uygulama kabuğunda Google / Apple düğmeleri şu an yok" notu Android için eskidi (beyan zaten "isteğe bağlı e-posta", değişmesi gerekmiyor).
- [[2026-10-16-native-google-apple-giris-play-imzasindan-sonra]] kararının Android kısmı bununla geçersiz; iOS kısmı geçerli.

## İlgili
- [[2026-10-17-android-twa-onerisi]] · [[2026-10-17-tussle-google-apple-girisi]] · [[2026-10-17-konsol-kurulumunda-onay-tiklamalari-kullanicida]]

- 20 Eki: Android Capacitor uygulamasında Apple girişi Custom Tab + sunucu yönlendirmesiyle geri geldi: [[2026-10-20-android-apple-girisi-custom-tab-sunucu-yonlendirme]].
