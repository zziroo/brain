---
type: decision
project: bal-vadisi
date: 2026-10-02
status: active
tags: [bal-vadisi, konsept, oyun-tasarimi]
source: oturum 2026-10-02 (incremantal-game)
---

# Incremental oyunun teması arı kolonisi ve çiçekli çayır oldu

## Karar
Oyun, kovandan çiçeklere gidip gelen ve gözle görülür şekilde büyüyen bir arı sürüsü üzerine kuruldu. Derleme adımı olmayan düz JS + Canvas 2D, tüm görseller kodla üretiliyor. İlk sürümü koordinatör tek başına yazdı (ajan dağıtılmadı).

## Neden
- "Herkesin görüp oynamak isteyeceği" şartı: 1 arıdan ~100 arıya büyüyen sürü ve renkli çayır tek ekran görüntüsünde kendini anlatıyor; şiddetsiz, her yaşa uygun.
- Görünür işçiler (arılar) idle üretimi soyut bir sayı olmaktan çıkarıyor; arı sayısı ile çiçek arzı arasındaki darboğaz doğal bir karar mekaniği veriyor.
- Kodla çizilen çiçek/arı/kovan basit şekillerle iyi görünüyor; dış varlık gerekmiyor.
- Sıfırdan, tutarlılığı önemli tek parça bir tasarım olduğu ve öncelik hız olduğu için paralel ajan yerine satır içi yazıldı.

## Reddedilen alternatifler
- Neon uzay madencisi: canvas'ta kolay parlıyor ama klişe.
- Tuğla kıran toplar (Idle Breakout tarzı): tatmin edici ama türev.
- Kara delik besleme: 2025'te bilinen bir oyun var.
- Tema için Yusuf'a soru sormak: kararı açıkça devrettiği ve hızlı ürün istediği için sorulmadı; konsept onayı ürün üzerinden alınacak.
- ES modülleri: `index.html` çift tıkla açılabilsin diye klasik script'ler seçildi.
