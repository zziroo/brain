---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, twa, capacitor, splash, acilis, animasyon, teshis]
source: Claude Code oturumu 2026-10-17 gece "tussle: oda başlığı ve kapak sadeleştirme" (Yusuf: "yine direkt login ekranı geldi", üç deneme)
---

# Ders: uygulama kabuğunun açılış perdesi `load` olayına kadar sayfayı örter; sayfa içi açılış hareketi `load`'dan sonra başlamalı

## Ne oldu
Açılış ikonu animasyonu üç yayında da telefonda görünmedi (Android TWA, iki telefon). Önce ilk boyanan kareden saymayı, sonra "uygulama hazır olunca" oynatmayı denedik; ikisi de perdenin altında kaldı. Tahminle üç tur gitti. İstemci hata kanalına geçici bir teşhis satırı ekleyince (`reportError` ile karar girdileri + zaman) cevap tek açılışta çıktı: hareket azaltma kapalı, hareket 257 ms'de başlamış ve 1,3 sn'de bitmiş; kullanıcı o sırada hâlâ Android perdesini görüyor. Perde, pencerenin `load` olayı (paket, yazı tipleri) bitene kadar kalkmıyor; modül betiği `load`'dan önce çalıştığı için "hazır olunca" bile erken.

## Çözüm
`endBoot` açılış hareketini `window.load` + 350 ms (perdenin solması) sonra başlatır, en geç 4 sn'de (`OPEN_CAP_MS`). Teşhiste hareket 450 ms'de başladı ve Yusuf gördü. Girişli kullanıcı ve azaltılmış hareket: hareket yok, hemen solar.

## Uygulama
- Kabuk içinde (TWA, Capacitor) "ilk kare", "sayfa görünür" ve `performance.now()` perdeyi anlatmaz; görünür olmanın güvenilir alt sınırı `load`.
- İki tahmin tutmazsa üçüncüyü tahmin etme: cihazdan veri al. Geçici teşhis için `reportError` kanalı (anonim kabul ediyor, `feedback-cli.mjs errors` ile okunur) yeterli; işi bitince kaldır.
- Masaüstü/puppeteer bu sınıfı asla göstermez; kabuk davranışı yalnız cihazda doğrulanır.

Bkz. [[2026-10-17-acilis-tek-akis-ikon-yukleme-giris-formu-oda-sihirbazi-qr]], [[2026-10-17-bildirimden-acilan-pencere-referrer-ve-sessionstorage-tasimaz]].
