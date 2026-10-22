---
type: lesson
project: tussle
date: 2026-10-22
status: active
tags: [tussle, gorsel, test, yontem]
source: Claude Code oturumu "tussle: telefon ekran taşmaları ve kök neden" ([[2026-10-22-tussle-telefon-tasmalari-ve-tasma-denetimi]])
---

# Dev verisi üretimden kısaysa taşma dev'de görünmez; ekran kontrolü otomatik olmalı

**Ders:** Sahibin telefonunda (407 CSS px, textZoom 100) üç ekranda yatay taşma çıktı: Ayarlar'da sürüm satırı (`white-space: nowrap`) kutuyu ekrandan geniş yapıp lisans satırının okunu kesti; bitmiş 1v1 kartında "36,9 sn" skoru iki satıra kırıldı; kendi açık kartta Davet et + İptal + not sığmadı. Hiçbiri dev'de görünmüyordu, çünkü dev sunucusu "sürüm dev" ve package.json'un 0.1.0'ını gösteriyordu (üretim: "Tussle 0.20261022.1306 · sürüm 1a459eb"), bitmiş kart ve birimli skor ("sn") dev'de denenmemişti. Kural ("her ekran 375 px'te iki temada") vardı ama elleydi; genişlik de sorun değildi (telefon 407 px).

**Uygulama:**
- Dev, üretim uzunluğunda veri gösterir: `vite.config.ts` `DEV_REV = 'dev0000'`, dev'de de OTA bundle sürümü (`settings-screen.ts` `import.meta.env.DEV`).
- `npm run tasma` (`scripts/tasma-kontrol.mjs` + `scripts/tasma-kontrol/seed-server.ts`): üretim derlemesi + geçici veri klasöründe gerçek sunucu (`createTussleServer`, 127.0.0.1), uzun ad/oda adı, bitmiş ve açık 1v1 kartları, uzun link; Chrome CDP ile 11 ekran × 360/375/393/412 × iki tema; TAŞMA (belge/eleman ekran dışı), KIRPILMA (nowrap + scrollWidth > clientWidth, ellipsis hariç), KIRILMA (`.btn` içinde ya da sayıda satır kırılması). Bulgu varsa çıkış 1. ~100 sn. `docs/VISUAL.md` ekran işini buna bağlıyor.
- Kapsam dışı: dokunmayla açılan alt sayfalar, canlı maç/parti/arena kartları, İngilizce, üst üste binme. `::before` dokunma alanı yatayda taşarsa script bunu +2 px KIRPILMA sayar; dokunma alanı yalnız dikeyde büyütülür.
- CSS kuralları: `.live-rows` `minmax(0,1fr)` + `.live-row > * { min-width: 0 }`; `.duel-score` `nowrap` + container query ile `--len`'e göre küçülme; `.duel-foot` düğmeler `nowrap`, iki düğmede not alta.
