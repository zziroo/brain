---
type: decision
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, overwatch, ekran-modu, overlay]
source: oturum 25d1d08a (plan incelemesi, Yusuf'un cevapları)
---

# Overwatch kenarlıksız pencereli modda oynanır; ekran çerçevesi ana uyarı kanalı olarak kalır

## Bağlam
Normal bir pencere, oyun özel tam ekran modundayken oyunun üstünde görünmez. Yusuf Overwatch'ı tam ekranda oynuyordu; ana ekrandaki çerçeve büyük ihtimalle görünmeyecekti.

## Karar
Yusuf oyunu **Kenarlıksız Pencereli** moda alır. Uyarı tasarımı (ana ekranda çerçeve) olduğu gibi kalır. Overlay pencereleri yalnız uyarı anında görünür ki uyarı yokken oyunun sunum modu etkilenmesin ([[overlay-dort-serit-yalniz-uyarida-gorunur]]).

## Neden
Windows 11'de flip-model sayesinde kenarlıksızın gecikme farkı çok küçük. Çerçeve göz ucuyla fark edilen, oyun sırasında en az dikkat dağıtan kanal. Yusuf'un tercihi bu oldu. Sonra oyunda denendi: çerçeve oyunun üstünde görünüyor.

## Reddedilen alternatifler
- Önce tam ekranda test edip sonra karar vermek (önerilen seçenekti): Yusuf doğrudan kenarlıksıza geçmeyi seçti.
- Kulaklığa bip ana kanal: ekran modundan bağımsız ama sesli uyarı; "sonra eklenebilecekler" listesinde kaldı.
- Yalnız yan ekranda uyarı: yan ekran ana ekranın altında, göz ucuyla görülüp görülmeyeceği belirsiz.

## Sonuçlar / riskler
Tam ekrana geri dönülürse ana ekran uyarısı görünmez; o durumda yan ekran seçeneği (Aşama 5) yedek olur. Uyarı açıkken oyun DWM "composed" moda düşebilir (~1 kare); bunun FPS/gecikme etkisi Aşama 6 listesinde (B1–B3) ölçülecek, henüz ölçülmedi.

## İlgili
- [[_overview]], [[overlay-dort-serit-yalniz-uyarida-gorunur]], [[wpf-secimi]]
