---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, ios, simulator, giris, xcode]
source: Claude Code yan oturumu 2026-10-17 "tussle: iOS native Google+Apple giriş"
---

# Ders: iOS native girişi simülatörde denerken imza, Apple hesabı ve uygulama adı tuzakları

- **İmzasız yapı yetkisizdir:** `CODE_SIGNING_ALLOWED=NO` (docs/CAPACITOR.md'deki eski komut) entitlement'ları atar, Sign in with Apple hata verir. Simülatör yapısını imzayla al (otomatik imza, "-" ile yerel imza `App.app-Simulated.xcent` içine `applesignin` koyar).
- **Simülatörde Apple hesabı yoksa** Apple düğmesi uygulamayı Ayarlar'a atar; kod hatası değil. Kullanıcı simülatör Ayarlar'ından kendi Apple hesabıyla oturum açmalı (şifreyi o girer).
- **"App giriş yapmak için şunu kullanmak istiyor"** uyarısı `CFBundleName`'i gösterir (`$(PRODUCT_NAME)` = App). `CFBundleName` = Tussle yapıldı.
- **Yerel test, üretim hesabı değil:** simülatör yerel sunucuya (8088, `data/app-dev`) bağlıyken Android'deki hesap gelmez; aynı hesaba düşeceği üretim kimliklerinin `sub` önekiyle doğrulandı.
- Simülatöre dokunuş auto mode sınıflandırıcısına takılabilir (üretim okumasından hemen sonra reddedildi); o zaman dokunuşu kullanıcı yapar.

## İlgili
- [[2026-10-17-ios-native-giris-capgo-social-login]]
