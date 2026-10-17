---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, magaza, giris, capacitor]
source: Claude Code yan oturumu 2026-10-16 "tussle: mağaza hazırlığı" (Yusuf: "olur nasıl istersen")
---

# Karar: native Google ve Apple girişi ayrı bir dilim, Play App Signing kurulduktan sonra; ikisi birlikte eklenir

## Bağlam
Native kabukta sağlayıcı düğmesi hiç yok (`src/client/ui/auth-providers.ts:93`, `if (isNative) return box;`); giriş yalnız web'de. Yusuf mağaza hazırlığı sırasında "hesabı Google ve Apple'a bağlama seçeneklerini de eklersek sorun olur mu" diye sordu.

## Karar
- Mağaza hazırlığı bu haliyle kapanır; formlar "e-posta isteğe bağlı" diye dolduruldu, gizlilik sayfası iki girişi de anlatıyor.
- Native giriş sonraki dilim: Capacitor eklentisi (aday `@capgo/capacitor-social-login`), Xcode'da Sign in with Apple yetkisi, iOS + Android OAuth istemcileri, sunucuda ID token `audience` listesine yeni kimlikler. Yeni native yapı gerekir (OTA yetmez).
- Zamanlama: Play App Signing kurulduktan sonra, çünkü Android Google istemcisi imza SHA-1'ine bağlı (upload ve Play imza anahtarı).
- Apple 4.8: Google girişi varsa Sign in with Apple şart; ikisi aynı yapıda gelir. Hesap silme zaten uygulamada.

## Neden
- Şimdi eklemek mağaza formlarını değiştirmez ama yeni yapı + SHA-1 işini iki kez yaptırır.
- Mağaza hazırlığı ile karışmasın; antrenman/profil değişikliği de önde.

## Reddedilen alternatifler
- Yalnız Google: Apple 4.8'e takılır.
- Web görünümünde sağlayıcı pencereleri: Google native WebView girişini engeller, Apple'da nonce/yönlendirme sorunu.

## Sonuçlar / riskler
- Gizlilik sayfasındaki "uygulamada sağlayıcı düğmesi yok" cümlesi ve `store/listing.md` Data safety e-posta satırı o zaman güncellenir.
- Koordinatöre not bırakıldı (yan oturum notları klasörü, `magaza-hazirlik-notlar.md`).

## Güncelleme (2026-10-17)
Android TWA'ya geçtiği için Android'de web girişi kullanılıyor; Android native Google istemcisi ve SHA-1 işi gereksiz. Bu kararın yalnız iOS kısmı geçerli: [[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]]. iOS kısmı aynı gün yapıldı: [[2026-10-17-ios-native-giris-capgo-social-login]].

## İlgili
- [[2026-10-16-gizlilik-sayfasi-sunucudan-statik-en-tr]] · [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]]
