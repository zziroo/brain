---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, capacitor, magaza, deploy]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Karar: Capacitor kabuğu gömülü web + imzalı canlı güncelleme

## Bağlam
Yusuf: "yolu yordamı ben bilmiyorum; mağazalarda sorun yaratmayacak en mantıklı yolu sen seç; güncellemeleri direkt uygulayabileceksek çok iyi, öteki türlü bir hafta bekleriz". Güvenlik sorusu: "uygulama bir URL'yi açsa güvenlik açığı olmaz mı?"

## Karar
- Web dosyaları (Vite build) uygulamaya gömülü gider; üstüne imzalı canlı güncelleme (Capgo tarzı OTA) ile web katmanı sunucudan güncellenir. Saf "URL açan kabuk" yapılmaz.
- Oyun, kapak, isim, denge değişiklikleri mağaza beklemeden dakikalar içinde telefona iner; yalnız native kabuk (izin, eklenti, platform sürümü) değişince mağaza onayı.
- Kabuk yalnız kendi alan adına bağlanır; native izinler en az (titreşim dışında yok).

## Neden
- Güvenlik: URL-kabuk hali bugünkü PWA ile eşdeğer yüzey; hassas native eklenti olmadığı için kabuk ek kapı açmaz. Gömülü + imzalı paketle araya giren biri sahte kod itemez.
- Mağaza: Apple "sitenin içini açan kabuk" uygulamalarını reddedebiliyor (4.2 asgari işlevsellik); gömülü web + WebKit içinde OTA JS izinli ve yaygın.
- Hile: skor sunucuda tekrar oynatılarak doğrulanıyor, istemci türünden bağımsız.

## Reddedilen alternatifler
- Uzaktan URL yükleyen kabuk (`server.url`): mağaza inceleme riski.
- Yalnız gömülü, OTA yok: her değişiklik 1–2 gün (iOS) mağaza onayı; eski uygulama ile yeni sunucu uyumsuz kalabilir (oyun sürümü/verify).

## İlgili
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]]
- [[2026-10-13-once-magaza-sonra-denge]]
