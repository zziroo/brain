---
type: session
project: tussle
date: 2026-10-18
status: done
tags: [tussle, android, mini-motor, faz-1]
source: oturum 2026-10-18 "tussle: mini motor Faz 1" (Faz 3 oturumundan başlatılan yan oturum)
---

# Oturum: mini motor Faz 1 bitti (46 oyun, tam canvas API, görsel karşılaştırma, ses, titreşim, gece)

Dal `android-mini-motor`, commit'ler `fb93ec1` (spike temeli), `4e3dc1d`, `05e08a9`; main'e birleştirilmedi, push yok. Ayrıntı ve Faz 2'ye notlar: [[2026-10-18-mini-motor-faz-devir-notu]] ("Faz 1 sonucu"). Karar: [[2026-10-18-android-mini-oyun-motoru]].

## Yapılan
- 46 oyun tek pakette (`games.js` 891 KB, sürüm APK 1,78 MB), yerel oyun seçici (seed, gece anahtarı), intent ekstraları.
- Kaydedici + ressam bütün canvas kullanımını kapsıyor; sıkı mod testte atar. STR_FREE / GRAD_FREE / PATH_XFORM.
- Görsel karşılaştırma `npm run parity`: emülatör ve telefonda 50/52 (renk'te ✓/✗ yedek glif farkı bilinen). Ders: [[2026-10-18-canvas-textbaseline-os2-typo-metrikleri]].
- 7 prosedürel ses yerel (`Sfx.kt`), titreşim sistem dokunma geri bildirimiyle, Faz 3 tablosu ([[2026-10-18-android-titresim-sistem-ayarini-izler]]).
- Lisanslar: QuickJS MIT, quickjs-kt Apache-2.0, Nunito OFL (PROTOCOL.md §6).
- İş akışı: koordinatör + arka plan ajanları (API, paket+seçici, ses paralel; sonra karşılaştırma), her commit öncesi inceleme ajanı.

## Yusuf'un his testi
"Gerisi okey." Basket'te en alta çekince potaya yetişememe: motordan değil, oyunun menzili (toptan aşağı çekme en fazla ~0,30 genişlik çekişi; ilk pota ~0,32, en yüksek ~0,39 ister), web'de de aynı. Ayrı oturum "Basket: toptan çekince potaya yetişsin" başlatıldı (sonraki oyun partisine).

## Doğrulanmayanlar
- Sesler kulakla karşılaştırılmadı (yalnız AudioTrack açıldı: 48 kHz, ~6 ms tampon).
- Sfx yeniden kurma ve boyama hatasında yeniden başlatma yolları cihazda tetiklenmedi.

## Ders
- [[2026-10-18-paylasilan-telefonda-am-start-baska-oturumun-testini-boler]]
- `src/games`'i içe aktaran testler `*.dom.test.ts` adını almalı: kök tsconfig'te DOM kitaplığı yok (typecheck kırılır).
