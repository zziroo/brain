---
type: decision
project: tussle
date: 2026-10-17
status: superseded
tags: [tussle, android, titresim, haptics, twa]
source: oturum 2026-10-16/17 (mobil-playus); Yusuf "hangisi normal bilmiyorum, sana bırakıyorum"
---

# Karar: oyun içi titreşim sistem ayarından bağımsız (MEDIA), arayüz tıkları ayara uyar (TOUCH)

## Bağlam
Android oyun titreşimlerini `TOUCH` sayıyor; sistemin dokunsal geri bildirimi kapalı olan telefonda hiç titremiyor ([[2026-10-17-titresim-sistem-dokunsal-geri-bildirim-kapaliysa-yok]]). Yusuf seçimi Claude'a bıraktı.

## Karar
- Oyun içi efekt titreşimleri (vuruş, hata, bitiş) `VibrationAttributes` `USAGE_MEDIA` ile gönderilir; sistemin dokunsal geri bildirim ayarından bağımsızdır. Kapatmak isteyen için Tussle'ın kendi Titreşim anahtarı var.
- Arayüz tıkları (ayar anahtarı, sohbet tepkisi) `TOUCH` kalır, sistem ayarına uyar.
- **Yalnız Capacitor'da kalınırsa uygulanır** (küçük bir eklenti yöntemi). Android TWA'ya geçilirse yapılamaz: titreşimi Chrome `TOUCH` olarak gönderir; kabul edilebilir bedel. iOS'ta sorun yok.
- Şu an kod değişikliği yok; TWA kararı bekleniyor ([[2026-10-17-android-twa-onerisi]]).

## Neden
Android'in tanımında `TOUCH` klavye ve düğme tıkları içindir; müzik, video ve oyun efektleri `MEDIA` türündedir. Uygulama kendi kapatma anahtarını zaten sunuyor.

## Reddedilen alternatifler
- Hepsi `TOUCH` (bugünkü hâl): dokunsal geri bildirimi kapatan kullanıcı oyunda hiç titreşim almaz, oyun hissi kaybolur.
- Hepsi `MEDIA`: sistem ayarını kapatan kullanıcıya arayüz tıkları da gelir, beklenmeyen davranış.

> **Yerine geçti (2026-10-18):** Android Capacitor'da titreşim artık sistem ayarını izliyor: [[2026-10-18-android-titresim-sistem-ayarini-izler]].
