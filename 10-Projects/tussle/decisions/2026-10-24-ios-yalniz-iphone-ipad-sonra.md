---
type: decision
project: tussle
date: 2026-10-24
status: active
tags: [tussle, ios, app-store, ipad]
source: Claude Code oturumu 2026-10-24 "tussle: mağaza durum kontrolü" (mobil-playus)
---

# iOS derlemesi yalnız iPhone; iPad desteği ayrı bir geniş-ekran turuyla sonra

## Karar
`TARGETED_DEVICE_FAMILY = 1` (build 12'den itibaren, commit 5ff2e1d). App Store'da iPad görseli istenmez, inceleme iPad'de yapılmaz.

## Neden
- Add for Review "13-inch iPad ekran görüntüsü" istedi; derleme universal'dı (Capacitor varsayılanı).
- Arayüz 430 px telefon dikey düzeni; iPad'de denenmedi, elde iPad yok; Apple iPad'de inceler ve dört yön bekler. Bozuk yerleşim red sebebi.

## Reddedilen alternatifler
- Universal kalıp iPad görselleri (2048×2732) çekmek: büyütülmüş telefon görünümü, inceleme riski.

## Sonrası
iPad için ayrı tur: geniş ekran düzeni + iPad görselleri + hedef aileyi "1,2" yapmak. Play'de tablet desteği zaten açık, engel değil.
