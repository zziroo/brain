---
type: lesson
project: ziroo-edge
date: 2026-10-18
status: active
tags: [ziroo-edge, css, duzen, zoom]
source: "oturum 2026-10-18 (ziroo-edge): kapı ekranı tek ekrana sığdırma, 2a60886"
---

# "Tek ekrana sığsın" ölçütü sayfanın en dibinde ölçülür; tarayıcı zoom'u yalnız daha küçük bir görünüm alanıdır

- İlk sığdırma "başlık tepedeyken" ölçüldü ve geçti; ama kullanıcı sonuna kadar kaydırıyor, alt bilgi payı başlığı 155px yukarı itti. Son ekran ise ölçüt: sayfa en dipteyken başlık üstü ≥ 0, alt bilgi ekranda; alt bilgi ve paylar da bütçeye girer.
- Zoom için ayrı kod gerekmez: %125'te 1440×790 iç alan CSS'te 1152×632 olur. Boyutu `vw` ile `vh`'nin küçüğüne bağla (`clamp(min, min(a·vw, b·vh), max)`), okunurluk için alt sınır koy, altında kaydırmaya izin ver.
- Ölçüm listesi: 1280×650, 1440×790, 1600×878 (%90), 1920×960, 1152×632 (%125), 960×527 (%150).
- İlgili: [[2026-10-18-ziroo-net-iki-sira-kapi-bolumler-ve-urunler]].
