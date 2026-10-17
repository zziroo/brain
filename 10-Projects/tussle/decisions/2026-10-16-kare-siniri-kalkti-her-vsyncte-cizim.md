---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, performans, kare-hizi, android, oyun-dongusu]
source: oturum 2026-10-16 gece (mobil-playus) kare hızı turu; commit 11127a3, OTA 0.20261016.1948
---

# Karar: kare sınırı kalktı, oyun her vsync'te çizer, "Yüksek kare hızı" ayarı yok

## Bağlam
Yusuf Android'de (Xiaomi 17 Pro, OnePlus 15) oyunların 120 Hz'de takıldığını, 60 Hz'de daha iyi olduğunu söyledi. adb ile ölçüldü: Xiaomi'nin uyarlanabilir paneli (Android 16 ARR) oyun sırasında 60 ↔ 120 Hz gidip geliyor. Döngü rAF atlayarak 60'a sabitlediği için (`FrameLimiter`) her geçişte tökezleyip 33 ms boşluk bırakıyordu. "Yüksek kare hızı" anahtarı tek seferlik ölçülen hıza (60/90/120) kilitlendiği için daha da kötüydü.

## Karar
- Döngü her rAF'ta çizer; sim sabit 60 Hz adım + ara değer (alpha) olarak kalır, oyun hızı ve tekrarlar değişmez.
- `FrameLimiter`, `estimateHz`, `measureRefresh`, `highFps` / `measuredHz` ayarı ve i18n anahtarları silindi. Kare hızını telefon belirler (kullanıcı pil için telefonu 60 Hz'e alabilir).
- Görünüm animasyonları duvar saati ya da tick + alpha ile çalışır, çizim başına adım yok (GAME-CONTRACT §5). İki ortak hata düzeltildi: sarsıntı yönü artık 16,67 ms duvar saatinde değişiyor (120 Hz'de iki kat hızlı titriyordu), HUD süre çubuğu ara değeri saatin gerçek düşüş hızıyla ölçekleniyor (duran/dolan saat 120 Hz'de titriyordu, en belirgin Renk kart arası).
- Ölçüldü (Chrome'da): 120 Hz'de 100-120 fps, 33 ms boşluk yok, çizim kare başına 0,1-0,3 ms.

## Neden
- Çizim çok ucuz; her vsync'te çizmek, panel hızı nasıl değişirse değişsin kare aralığını düzenli tutuyor.
- 48 görünümden 42'si zaten ara değer kullanıyordu; geri kalan 6'sı (bambu, isik, farkli, hazine, onluk, renk) tur tabanlı, hareket yok.

## Reddedilen alternatifler
- Sabit 60 sınırı (eski hâl): uyarlanabilir panelde her hız geçişinde kare kaçırıyor.
- Ölçülen ekran hızına sınır (eski "Yüksek kare hızı"): ölçüm anlık, panel sonra başka hıza geçiyor.
- Telefonu oyunda 60 Hz'e kilitleyip 60 çizmek: OnePlus'ta 60 Hz'de de uygulama takıldı, sorunu çözmedi (bkz. [[2026-10-16-android-webview-parmak-kalkinca-takilma]]).

## İlgili
- [[2026-10-16-90-hz-ekranda-60-fps-siniri-duzensiz-kare]] (bu kararın çıkış hipotezi)
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]] (eski "varsayılan 60 kare sınırı")
- [[2026-10-16-tussle-kare-hizi-webview]]
