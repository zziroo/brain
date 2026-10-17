---
type: lesson
project: genel
date: 2026-10-17
status: active
tags: [onizleme, tarayici, animasyon, test, claude-code]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa" (2026-10-16/17)
---

# Ders: Gizli önizleme panelinde rAF ve zamanlayıcılar durur, görüntü alanı 0×0 olur; animasyon ölçümleri yanlış çıkar

## Ne oldu
Masaüstü uygulamasının tarayıcı paneli kullanıcıya görünmezken sayfa arka planda sayıldı:
- `requestAnimationFrame` hiç çalışmadı, `setTimeout` çok yavaşladı.
- `document.hidden` true döndü; animasyon döngüsü bu yüzden hiç başlamadı.
- Bir aşamada `innerWidth/innerHeight` 0 çıktı, bütün bölüm merkezleri 0 hesaplandı.

Ziroo hareket etmiyormuş gibi ölçümler alındı ve bir ara "ekrandan taşmıyor" sonucu bu yüzden doğrulanamadı.

## Nasıl uygulanır
- Önce `resize_window` ile boyut ver (ör. 1440×900, 390×844), sonra sayfayı yenile.
- Hareketi elle sür. `.claude/onizleme/h.js` şunları yapar:
  - `document.hidden`'ı false yapar ve rAF'i bir kuyruğa alır.
  - `H.pump(n)` sahte zaman damgasıyla kare çalıştırır; `H.go(y)` kaydırıp 600 kare pompalar.
  - Zamana bağlı animasyonlar `performance.now()` değil, rAF'in verdiği `now`'ı kullanmalı; yoksa test edilemez.
- Ekran görüntüleri bu panelde eski kalabilir. Sonucu sayılarla doğrula (transform, opaklık, `getBoundingClientRect`).
- Gerçek akıcılık (fps) burada ölçülemez; telefonda kullanıcı denemeli.

## İlgili
- [[scratchpad-yeniden-baslatmada-silinir]]
- [[2026-10-16-ziroo-net-kaydirmali-2d-maskot]]
