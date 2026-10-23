---
type: session
project: tussle
date: 2026-10-23
status: done
tags: [tussle, ses, hud, yayin]
source: Claude Code yan oturumu "tussle: ses F+A, girdi sesi, kademe rozeti yayını" (2026-10-23); önceki [[2026-10-22-tussle-ses-tasarimi-turu]]
---
# Oturum: seçilen ses seti (F + A puan merdiveni), oyun içi girdi sesleri kalktı, kademe yazısı HUD rozetinde

## Yapılan (tek commit `c25be1e`, OTA 0.20261023.856, sunucu c25be1e)
- **Ses seti:** Yusuf 23 Eki'de altı setli dinleme sayfasında (A eski birebir, B 22 Eki yayını, C tahta, D baloncuk, E 8-bit, F eski karakter yeniden) seçti: puan/kombo A, kalan 14 olay F. `scripts/ses/recete.js` bu birleşim; çekirdek (zincir, yapı taşları, ölçüm, WAV) `scripts/ses/cekirdek.js`'e ayrıldı; 22 Eki reçetesi `scripts/ses/setler/b.js`, deneme setleri depoda (`setler/`, `uret.mjs --recete` ile üretilir). 24 WAV yeniden üretildi, seviye katmanları aynı (tick −33, tap/urgent/whoosh −27, diğerleri −18, thud −14 dBFS rms; ölçüldü, hiçbiri tepe sınırına takılmadı). SW önbelleği v7.
- **Girdi sesleri:** oyun içinde girdiye ses yok, dokunuş olaysa olay sesi (22 oyun view'ı, arena pocket/puck/type-race, `_ornek`, GAME-CONTRACT §ses).
- **Kademe rozeti:** milestone/cheer yazısı oyun alanından HUD'daki altın rozete (`CheerBadge` + `reserveRow`, `ShellView.cheerLabel`), büyük konfeti kalktı; 7 oyun taşındı (jetpack, lane-dash, zigzag, chop, trace, quick-math, how-many). 32 oyun hâlâ metinsiz kademe yayıyor (yalnız kıvılcım).
- Taşma denetimi tohumu (`scripts/tasma-kontrol/seed-server.ts`) 22 Eki Hazırım beklemesinden beri kırıktı (409 not_started); iki `ready` çağrısı eklendi.
- Mağaza sürümü gerekmedi: native motorlar WAV'ı OTA kökünden okur.

## Açık
- Yusuf "tam emin değilim" dedi: telefonda dinleyip geri dönebilir; diğer setler `setler/` altında hazır.
- Ders: taşma denetimi her sunucu akış değişikliğinde (Hazırım gibi) tohumuyla birlikte güncellenmeli; yayın öncesi `npm run tasma` koşmak bunu yakalar.
