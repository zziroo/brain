---
type: project
project: kul-tahti
date: 2026-10-03
status: active
tags: [kul-tahti, threejs, webgl, oyun, souls-like]
source: C:\Users\yusuf\ZZ\zProjects\web-boss-teaser (ARCHITECTURE.md, README.md); oturum 2026-10-02
---

# Kül Tahtı: tarayıcıda çalışan souls-like 3D boss savaşı demosu

## Amaç
Yusuf "yapabileceklerinin sınırını görmek istiyorum" diyerek istedi: kılıç kullanan bir karakter, açık dünya hissi veren fantastik bir vadi, 3D boss savaşı, mümkünse webde. Bu yüzden kapsam ve cila, minimal çözümden önce gelir.

## Teknoloji ve mimari
- Derleme adımı yok: düz ES modülleri + Three.js r170 (jsDelivr, import map). Model, doku, animasyon, efekt, ses ve müziğin tamamı kodla üretiliyor; dış dosya yok.
- Modüller: `src/world` + `src/render` (vadi, arena, gökyüzü, su, post-process), `src/player`, `src/boss` (Valdran, Kül Kralı; 2 faz), `src/fx` + `src/ui` + `src/audio`. Koordinatör `src/main.js` (durum makinesi, döngü) ve `src/core` (olay, girdi, zaman, savaş sözleşmesi, stub'lar). Sözleşme: projedeki `ARCHITECTURE.md`.
- Çalıştırma: `python serve.py` → http://localhost:5173/ (no-store başlığı, bkz. [[2026-10-02-python-http-server-eski-modul-onbellegi]]).
- Artifact yayını: depodaki `artifact.html` (index.html'in belge iskeleti olmayan hâli) + `style.css` ve `src/**` dosya eşlemesi.
- Yaklaşık 20 bin satır. Orta kalite, 1080p: ~150-170 draw call, ~1,1M üçgen, kare başına ~2 ms CPU.

## Güncel durum (2026-10-03)
| Parça | Durum |
|---|---|
| İskelet + sözleşme | bitti (commit f71cbac) |
| 4 modül + entegrasyon düzeltmeleri | bitti, inceleme kapısından geçti (commit ad3cc61) |
| Artifact sayfa sarmalayıcısı depoda | bitti (commit ee47c4e) |
| Uçtan uca akış (başlık → keşif → giriş → savaş → 2. faz → ölüm/zafer → tekrar) | koordinatör tarayıcıda scriptle doğruladı (kareler elle ilerletildi, gerçek zamanlı oynanmadı) |
| Artifact olarak yayın | yayınlandı (özel): https://claude.ai/artifact/4eeBeW1nWvxJ9imd6DjaDW. **Doğrulanmadı**: panelde claude.ai oturumu yoktu |
| Gerçek oynanış hissi (zorluk, animasyon akıcılığı, müzik) | **doğrulanmadı**, Yusuf'un denemesini bekliyor |

## Sıradaki işler
- [ ] Yusuf oynasın; zorluk, his ve görsel geri bildirimine göre ayar turu.
- [ ] Artifact bağlantısının açılıp oyunun çalıştığını doğrula (riskli nokta: import map'in sayfa iskeletine sarılınca çalışması).
- [ ] 2. fazdaki yoğun anlarda ses bütçesinin düşük öncelikli sesleri düşürmesi (düşük önem; kor/çatırtı tanelerini tek ses say).
- [ ] Bilinen küçük görsel sorunlar: sallanan ağaç/bayrak gölgeleri sallanmıyor, pelerin anlık olarak kollardan geçebiliyor, köprü altından geçilemiyor.
- [ ] İstenirse: dokunmatik/mobil kontrol.

## Kararlar
- [[2026-10-02-no-build-ve-sozlesmeli-paralel-moduller]]

## Dersler
- [[2026-10-02-paralel-ajanlarda-stub-ve-step-ile-test]]
- [[2026-10-02-python-http-server-eski-modul-onbellegi]]

## Oturumlar
- [[2026-10-02-ilk-surum]]
