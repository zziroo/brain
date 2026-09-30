---
type: session
project: diskort
date: 2026-09-26
status: done
tags: [diskort, metin-kanali, android, fcm]
source: C--dev-diskort 2736605c-3497-4a77-b98c-940a85ef9fe0.jsonl (ikinci yarı 2026-09-27'ye sarkar)
---

# Oturum: Metin kanalları, zorunlu güncelleme ve Android ilk sürüm

## Ne yapıldı
- Sunucu canlı izlendi (1 yayın, 2 kişi: LiveKit ~tek çekirdeğin %22'si, UDP hatası 0; UDP tampon sysctl'i sonraki yeniden başlatmada devreye girecek).
- Metin kanalları: SQLite migration 3 (messages, read_states), mesaj API'si, WebSocket olayları (MESSAGE_*, TYPING_START), okunmamış durumu; önce prod DB kopyasında migration denendi.
- Masaüstünde zorunlu güncelleme ve "update.exe" benzeri başlangıç kapısı; NSIS kurulum yapısı sıfırdan düşünüldü.
- Android planı: ortak çekirdek (packages/client-core) -> Android v1 -> uygulama içi özellikler. İndirme sayfasından APK. Bildirim için FCM.
- E-posta yönlendirmesi (Cloudflare) kuruldu. Android eksikleri: kapalıyken bahsetme bildirimi, uygulama içi APK güncelleme, ABI'ye göre küçük APK, telefondan ekran paylaşımı.
- Telefon ekran paylaşımı PC'de donuyordu: çözünürlük kısa kenar 720'ye, 24 fps'e indirildi (doğrulama sonraki oturumda).

## Alınan kararlar
- [[zorunlu-istemci-guncellemesi]]
- [[android-push-icin-fcm]]
- [[ios-ad-hoc-dagitim-dev-era]]

## Öğrenilenler
- [[sqlite-migration-once-prod-kopyasinda-dene]]
- [[apk-derleme-suresi-ve-hizli-test-yolu]]
- [[telefon-ekran-paylasimi-cozunurluk-siniri]]

## Açık kalanlar
- Android bildirim durumu o oturumun sonunda kullanıcı testindeydi; sonuç [[2026-09-27-ota-ses-filtresi-roller-dm]] notunda.
