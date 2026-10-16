---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, google-play, tarayici-otomasyon, ders]
source: Claude Code oturumu 2026-10-16 "tussle: Play kapalı test" (Claude in Chrome)
---

# Ders: Kapalı test kurulumunda üç durak var: herkese açık grup ve incelemeye gönderme açık onay ister, grup oluşturmada CAPTCHA çıkar, gönderimi reklam kimliği beyanı keser

- **Oto mod sınıflandırıcısı** iki tıklamayı durdurdu: grupta "Herkes katılabilir" (yetki verme sayıldı) ve sürüm hazırlamada "İleri" (incelemeye giden yol). Genel "halledelim" yetmedi; tek cümlelik açık onay ("herkes katılabilir olarak açabilirsin", "incelemeye gönder") gelince geçti. Bu adımlardan önce onayı baştan iste.
- **Google Groups "Grup oluştur" son adımda reCAPTCHA** açıyor; Claude geçemez, Yusuf tıklar. Formu doldurup CAPTCHA'da bırak, beklerken Play tarafına geç.
- **Reklam kimliği beyanı** (Android 13+ hedef) eksikse "16 değişikliği incelemeye gönder" kilitli kalır. Önce `android/app/build/intermediates/merged_manifest/release/.../AndroidManifest.xml` içinde `com.google.android.gms.permission.AD_ID` var mı bak; yoksa "Hayır".
- Hızlı kontroller "en fazla 14 dakika" sürüyor ama düğme sorun düzelince hemen açıldı; beklemek gerekmedi.
- Play Console'da uygulama içi menü tıklaması bir kez uygulama listesine geri attı; **doğrudan URL** `.../app/<appId>/closed-testing` ve `.../tracks/<trackId>?tab=testers|countryAvailability` çalıştı (önceki derste "URL tahmin etme" yazıyor: yanlış tahmin atıyor, Console'un kendi verdiği yollar sorunsuz).
- Kitaplıktan AAB eklemek yeni yükleme ve imza gerektirmiyor; iç testteki paket kapalı teste aynen gider.
- "Kod gösterme (deobfuscation) dosyası yok" uyarısı gönderimi engellemez.

İlgili: [[2026-10-16-kapali-test-google-grubuyla-acildi-mail-toplanmaz]] · [[2026-10-16-play-veri-guvenligi-formu-taslak-kaydet-diyalog-yigini]]
