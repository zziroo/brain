---
type: decision
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, overlay, wpf, dpi, cok-monitor]
source: oturum 25d1d08a (Aşama 3 ve 5), PLAN.md bölüm 4.4
---

# Uyarı çerçevesi ekran başına 4 ince şerit penceresidir, yalnız uyarıda görünür, renkler turuncu/mor

## Bağlam
Uyarı oyunun üstünde görünmeli, tıklamaları engellememeli, odak çalmamalı ve uyarı yokken oyunun performansına dokunmamalı. Ana ekran 4K %150, yan ekran 2560x1440 %200: ölçekler farklı.

## Karar
- Hedef ekran başına 4 kenar şeridi (üst/alt/sol/sağ; sol ve sağ üst/alt şeritlerin arasında, köşeler üst üste binmez) + isteğe bağlı sol üst rozet.
- WPF `AllowsTransparency` + Win32 `WS_EX_LAYERED | TRANSPARENT | TOOLWINDOW | NOACTIVATE`, topmost. Konum ve boyut fiziksel pikselle `SetWindowPos` ile verilir; kalınlık 10 DIP x ekran ölçeği (15 px / 20 px).
- **Normal durumda pencereler tamamen gizlenir** (`Hide`); 150 ms solarak açılır/kapanır. Görünürken her saniye topmost yeniden alınır.
- Renkler: Yüksek turuncu `#FFA51F`, Çok yüksek mor `#C83CFF` (ayarlardan 8 hazır renk).
- Ekran seçimi: Ana / Yan / Tüm ekranlar. Yan ekran seçili ama bağlı değilse ana ekrana düşer. Ekran takılıp çıkarılınca pencereler yeniden kurulur.
- "Yayında/kayıtta gizle" (`WDA_EXCLUDEFROMCAPTURE`) isteğe bağlı, varsayılan kapalı.

## Neden
- Tam ekran tek saydam pencere 4K'da her animasyon karesinde ~33 MB'lık yazılım çizimi demek; ince şeritler ucuz ve oyunun çok küçük kısmını kaplar.
- Oyunun üstünde görünür pencere olduğu sürece DWM oyunu "independent flip"ten "composed" moda düşürebilir; gizlemek bu etkiyi uyarı anlarıyla sınırlar.
- Kırmızı, Overwatch'taki hasar efektiyle karışabilir.
- Uyarının hiç görünmemesi yanlış ekranda görünmesinden kötü (yan ekran fallback'i).
- Yayında gizleme varsayılan kapalı: açıkken ekran görüntüsüyle doğrulama da overlay'i göremez.

## Reddedilen alternatifler
- Tek tam ekran saydam pencere: yukarıdaki çizim maliyeti.
- Overlay penceresini sürekli açık tutup yalnız içeriği değiştirmek: uyarı yokken de oyunun sunum modunu etkileyebilir.
- Kırmızı / sarı-kırmızı renkler: hasar efektiyle karışma.
- Yan ekran yoksa hiç göstermemek: uyarı kaybolur.

## Sonuçlar / riskler
UI Automation ile doğrulandı: şeritler her iki ölçekte piksel piksel oturuyor, tıklamalar geçiyor, odak değişmiyor, Normal'de görünür pencere 0. Yusuf oyunda denedi. FPS/gecikme etkisi ölçülmedi (Aşama 6).

## İlgili
- [[_overview]], [[kenarliksiz-pencereli-mod]], [[tetik-seviyesi-500ms-penceresi]], [[wpf-masaustu-tuzaklari]]
