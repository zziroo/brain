---
title: "Arayüzde düğme sesi yok; yalnız oyuncunun bakmadığı anda olanı bildiren sesler kalır"
date: 2026-10-24
project: tussle
type: decision
status: active
tags: [tussle, ses, arayuz]
source: oturum 2026-10-24 ses yoğunluğu turu (commit e634db2)
---

# Arayüzde düğme sesi yok

**Karar (Yusuf, 24 Eki, "öneriyle devam"):** Arayüz düğmelerine basmak ses çıkarmaz; 41 `tap` çağrısı (oda, ana sayfa, sonuç kartı, profil, antrenman, parti paneli, giriş, ayarlar, Hazırım kendi dokunuşum) kalktı. Kalan arayüz sesleri oyuncunun bakmadığı anda olan bir şeyi bildirir: rakip hazır oldu (hit), hediye alındı (badge), parti sonucu (win / hit), VS açılışı (whoosh + thud), ses ayarı açıldı (hit). Geri sayım ve go oyunun parçası. `tap` adı palette kabuğun "Başla" düğmesi için duruyor. Bekçi: `tests/sfx-policy.test.ts` "UI: no button click sound".

**Neden:** Oyun içindeki "girdiye ses yok" ilkesinin arayüz karşılığı: düğmeye basmak bir olay değil. Telefon işletim sistemleri ve çoğu oyun uygulaması düğmeye ses vermez; parti ortamında dört telefonun menü tıkırtısı gürültüye ekleniyordu.

**Reddedilen alternatifler:**
- Daha yumuşak/kısık tap: tap zaten en sessiz katmandaydı (−27 dB, 36 ms); sorun seviye değil sayı ve anlamsızlık.
- Tap yalnız ana eylem düğmelerinde (Oyna/Başla/Hazırım): Oyna'nın hemen ardından geri sayım sesi geliyor, tap fazlalık.

İlgili: [[2026-10-24-bir-olay-bir-ses-dekor-sesi-yok]], [[2026-10-24-tussle-ses-yogunlugu-turu]].
