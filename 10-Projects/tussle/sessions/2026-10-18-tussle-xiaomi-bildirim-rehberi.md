---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, oturum, android, xiaomi, bildirim, play, yayin]
source: yan oturum "Xiaomi bildirim rehberi" (2026-10-18 gece, mobil-playus; "tussle: Android bildirim dengesizliği" oturumundan başlatıldı)
---

# Oturum: Xiaomi bildirim rehberi, Play 1.7 (vc 11) yayını

## Yapılanlar
- Native `SystemInfo` eklentisi + Xiaomi / Redmi / POCO rehber kartı (`1e795a7`): Ayarlar > Bildirimler'de ve odadaki bildirim sorusundan sonra bir kez. Karar [[2026-10-18-xiaomi-bildirim-rehberi]].
- Yusuf "gerek var mıydı?" diye sordu; cevap: kendisi ve testçiler için şart değil, yayında faydalı. Sonuç: kalsın, yalnız Xiaomi, bildirim açılınca da gösterilsin.
- Dev APK Yusuf'un Xiaomi 17 Pro'sunda denendi: eklenti `Xiaomi / Xiaomi` döndü, "Ayarları aç" HyperOS uygulama bilgisi sayfasını açtı. Yusuf ayar adlarının farklı olduğunu yakaladı; `uiautomator dump` ile gerçek adlar okunup kart düzeltildi. Ders [[2026-10-18-hyperos-fcm-otomatik-baslatma-ve-ayar-adlari]].
- Oda sorusundaki `btn-sm` (CSS'te yok) kaldırıldı: "Şimdi değil" tek satır, "Aç" kalan genişlik.
- Yayın: `8c4a846` (Android 1.7 / vc 11 + Play notları) push; `release.sh` sunucu `8c4a846`, OTA 0.20261018.1955; Play 1.7 iç + kapalı test (alpha) `completed`, AAB içeriği doğrulandı. iOS derlemesi gerekmedi.
- İki salt-okunur inceleme: orta ve üstü bulgu yok.

## Doğrulanmayanlar
- Oda yolu cihazda (dev hesabın odası yoktu); İngilizce HyperOS adları ("Autostart", "Battery usage" → "No restrictions").
- Kartın Play'den kurulan 1.7'de görünmesi (Yusuf'un telefonunda Play sürümü o sırada vc 9'du).
- Yusuf'un Play uygulamasında otomatik başlatma hâlâ kapalı; ayarlar açılınca bildirimin kapalı uygulamaya geldiği henüz denenmedi.
