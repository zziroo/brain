---
type: project
project: kul-tahti
date: 2026-10-02
status: active
tags: [kul-tahti, threejs, webgl, oyun, souls-like]
source: C:\Users\yusuf\ZZ\zProjects\web-boss-teaser (ARCHITECTURE.md, README.md); oturum 2026-10-02
---

# Kül Tahtı: tarayıcıda çalışan souls-like 3D boss savaşı demosu

## Amaç
Yusuf "yapabileceklerinin sınırını görmek istiyorum" diyerek istedi: kılıç kullanan bir karakter, açık dünya hissi veren fantastik bir vadi, 3D boss savaşı, mümkünse webde. Bu yüzden kapsam ve cila, minimal çözümden önce gelir.

## Teknoloji ve mimari
- Derleme adımı yok: düz ES modülleri + Three.js r170 (jsDelivr, import map). Model, doku, animasyon, efekt, ses ve müziğin tamamı kodla üretiliyor; dış dosya yok ([[2026-10-02-no-build-ve-sozlesmeli-paralel-moduller]]).
- Modüller: `src/world` + `src/render` (vadi, arena, gökyüzü, su, post-process), `src/player`, `src/boss` (Valdran, Kül Kralı; 2 faz), `src/fx` + `src/ui` + `src/audio`. Koordinatör `src/main.js` (durum makinesi, döngü) ve `src/core` (olay, girdi, zaman, savaş sözleşmesi, stub'lar). Sözleşme: projedeki `ARCHITECTURE.md`.
- Çalıştırma: `python serve.py` → http://localhost:5173/ (no-store başlığı, bkz. [[2026-10-02-python-http-server-eski-modul-onbellegi]]).
- Yaklaşık 20 bin satır. Orta kalite, 1080p: ~150-170 draw call, ~1,1M üçgen, kare başına ~2 ms CPU.

## Durum (2026-10-02)
| Parça | Durum |
|---|---|
| İskelet + sözleşme | bitti (commit f71cbac) |
| 4 modül + entegrasyon düzeltmeleri | bitti, inceleme kapısından geçti (commit ad3cc61) |
| Uçtan uca akış (başlık → keşif → giriş → savaş → 2. faz → ölüm/zafer → tekrar) | koordinatör tarayıcıda scriptle doğruladı |
| Artifact olarak yayın | yayınlandı: https://claude.ai/artifact/4eeBeW1nWvxJ9imd6DjaDW (özel); içinde çalıştığı doğrulanmadı |
| Gerçek oynanış hissi (zorluk, animasyon akıcılığı, müzik) | Yusuf'un denemesini bekliyor |

## Oturumlar
- [[2026-10-02-ilk-surum]]

## Dersler
- [[2026-10-02-paralel-ajanlarda-stub-ve-step-ile-test]]
- [[2026-10-02-python-http-server-eski-modul-onbellegi]]
