---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, ota, capacitor, google-play, ilk-acilis]
source: "oturum 2026-10-16 (mobil-playus): tussle Play kapalı test durumu, Yusuf Play'den kurdu"
---

# Ders: ilk açılışı değiştiren web değişikliği OTA ile yetmez; mağaza yapısı da yeniden üretilmeli

Yusuf kapalı testten kurdu: ilk açılışta tanıtım akışı yerine eski isim ekranı geldi, kapatıp açınca tanıtım. Play'deki `versionCode 2` AAB'si 11:40'ta üretilmişti, tanıtım (`114db8f`) 14:19'da geldi. Gömülü web eskiydi; OTA ilk açılışta iner, **bir sonraki açılışta** geçer ([[2026-10-15-ota-web-paketi-self-hosted-capgo]]).

- OTA yalnız ikinci açılıştan itibaren görünen değişiklikler için yeter. İlk açılış ekranı (giriş, tanıtım, izinler) değiştiyse yeni kurulumlar için AAB/IPA'yı güncel webi gömerek yeniden üret ve yükle (çözüm: `versionCode 3`, Tussle `7131e08`).
- Kontrol: `ls -la dist/tussle-release.aab` zamanını ilgili commit'le karşılaştır; gömülü pakette özelliğin anahtarını ara (`grep -rl introSeen android/app/src/main/assets/public/`).
- "Eski veri geri geldi" şüphesinde: `AndroidManifest.xml` `allowBackup="false"`, Android silinen uygulamanın verisini geri yüklemez; kimlik dönseydi isim de sorulmazdı.
- Davet dalgasından önce mağazadaki yapının en son ilk açılış deneyimini taşıdığını doğrula.
- Yapı numaraları yalnız artmalı; atlama serbest (iOS 2'den 4'e geçebilir). İki platformu eşit tutmak `otaMinNative` için kolaylık, zorunluluk değil.
