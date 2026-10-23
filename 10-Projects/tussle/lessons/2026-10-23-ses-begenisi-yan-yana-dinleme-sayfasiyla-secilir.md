---
type: lesson
project: tussle
date: 2026-10-23
status: active
tags: [tussle, ses, yontem]
source: Claude Code oturumu "tussle: dokunma sesi ve kademe animasyonu kararı" (2026-10-23)
---

# Ders: ses gibi beğeni işlerinde tek set üretip yayınlama; yan yana dinleme sayfasıyla seçtir

## Ne oldu
22 Eki ses turu bir set üretip yayınladı; Yusuf dinleyince "iç açıcı değil, eskiler daha iyiydi, alıştım mı bilmiyorum" dedi. 23 Eki'de artifact olarak yayımlanan tek sayfalık dinleme sayfası (olay başına A–F düğmeleri, "oyun akışı", seçim radyoları, kopyala) soruyu bir turda kapattı: 14 olay F (eski karakter yeniden), puan/kombo A (eski birebir).

## Çıkarımlar
- Yusuf'un kulağı **net, keskin ataklı, saf tonları** (sine/üçgen "bip-bop", eski arcade dili) tercih ediyor; "enstrüman" karakterli (marimba, baloncuk, 8-bit filtreli) setlerin hiçbirini beğenmedi. Yeni ses tasarlarken bu dilde kal.
- Karşılaştırmaya **mevcut ve eski hâli de** koy (ilk sayfada A yoktu; Yusuf hafızadan değerlendirip "A'yı beğenmedim" demişti, birebir dinleyince seçti). "Alıştım mı" sorusunun cevabı ancak yan yana çıkar.
- Reçete → WAV sistemi sayesinde set değiştirmek tek reçete + OTA; deneme setleri `scripts/ses/setler/` altında duruyor, sayfa `uret.mjs --recete` ile yeniden üretilir.
- Artifact, telefonda dinleme için sunucuya dokunmadan iş görür (96–144 WAV dosya olarak yüklenebildi).

## İlgili
- [[2026-10-23-tussle-ses-seti-f-girdi-sesi-kademe-rozeti]]
- [[2026-10-22-ses-paleti-recete-wav-motorlar-ornek-calici]]
