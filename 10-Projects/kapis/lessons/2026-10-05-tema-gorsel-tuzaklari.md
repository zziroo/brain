---
type: lesson
project: kapis
date: 2026-10-05
status: active
tags: [kapis, tema, three-js, glsl, render]
source: oturum 2026-10-04/05 (web-fps-game, dünya temaları), inceleme ve şüpheci raporları
---

# Prosedürel temalarda tekrar eden görsel tuzaklar: pow NaN, 400 m uzak düzlem, sınırsız sürüklenme

## Ne oldu
- **`pow(x<0, y)` NaN:** neon pad sütununda `pow(1.0 - vUv.y, 1.5)` yüksek kalitede (4× MSAA kenarın biraz dışını örnekliyor) siyah çizgiler çizdi. Tamsayı üs sabitini (2.0) ANGLE açıyor, 1.5 ya da uniform üs NaN veriyor. **Çözüm:** tabanı `max(…, 0.0)` ile sıkıştır ya da `x*x` yaz.
- **Uzak düzlem 400 m:** kar dağları, piramitler ve yanardağ 400 m'nin ötesindeydi; tepeleri kesildi, lav fıskiyesi hiç çizilmedi. Ajanların kendi ekran görüntülerinde duvar kesiği gizledi. **Çözüm:** her nirengi ≤ 380 − hypot(yarı boyut), açısal boyutu koruyarak ölçekle.
- **Sınırsız sürüklenme:** `uTime` sayfa açılışından beri geçen süre (tema ya da maçla sıfırlanmıyor). Lav külü `xz += rüzgâr * zaman` ile 10. dakikada %19'a düştü. **Çözüm:** döngü içi mesafe kullan ya da `mod` ile hacme sar.
- three r186 `PCFSoftShadowMap`'i kaldırmış; ilk gölgede tip değişip ön derleme boşa gidiyordu → `PCFShadowMap`. Ön derleme de çizilecek render hedefine (HDR hedef) bağlanmalı, yoksa ilk karede yeniden derleniyor.
- `GeoBuilder.sphere/cylinder` her çağrıda yeni geometri kuruyor; yüzlerce dekorda yapım süresini patlattı. Paylaşılan birim ilkel önbelleği işe yaradı.
- Paralel ajanlar aynı vite HMR'ı tetikleyince tezgâh sekmesi ölçüm ortasında yenilendi → `KAPIS_NO_HMR=1`.

## Çıkarım
Yeni tema ya da harita işinde bu altı maddeyi kontrol listesi yap; inceleme ajanına özellikle sor. Ajanın kendi ekran görüntüsü "her açıdan iyi" kanıtı değildir: yükseltilmiş kamera ve köşelerden bakılmalı.

## İlgili
- [[2026-10-05-tema-altyapisi-themedef-ve-arka-plan-insa]], [[2026-10-03-kapis-dev-ortami-tuzaklari]], [[_overview]]
