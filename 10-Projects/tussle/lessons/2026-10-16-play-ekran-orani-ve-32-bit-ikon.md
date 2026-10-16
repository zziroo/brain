---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, magaza, google-play, gorsel, ders]
source: Claude Code yan oturumu 2026-10-16 "tussle: mağaza hazırlığı"
---

# Ders: Play telefon ekranı için 375×812 (2,17:1) oran sınırını aşar; 360×640@3x = 1080×1920 kullan; ikon 32 bit PNG olmalı, paletli 512 kabul edilmez

Tarayıcı bölmesinin varsayılan mobil boyutu iPhone oranıdır ve Play'in ≤ 2:1 kuralını geçmez. 16:9 görünüm (360×640) 3x ile tam 1080×1920 verir; App Store için 430×932@3x = 1290×2796. Uygulamanın `icons/icon-512.png` dosyası boyut için paletli (8 bit) üretilmişti; Play 32 bit ister, mağaza için SVG'den yeniden ve köşeleri kare (Play maskeyi kendi uygular) render edildi. Alfa isteyen 512 için sayfa ekran görüntüsü yetmez (24 bit çıkar), canvas'tan `toDataURL` ile alındı.

İlgili: [[2026-10-16-magaza-ekran-goruntuleri-puppeteer-uretilebilir-gecici]]
