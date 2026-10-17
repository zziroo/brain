---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, ikon, marka, magaza, gorsel]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli" (mağaza görselleri incelemesi, commit 9f32fa0)
---

# Karar: `icon.svg` üçlüsü %90 ölçekle kadraja alındı, yatıklık ve şapkanın hafif kayması korundu

## Bağlam
Yusuf mağaza ikonunda şapkanın tam ortalı olmadığını sordu. Kontrolde asıl sorun şapka değil çizimin kadrajıydı: `icon.svg`'de şapkanın ucu tuvali 2–3 birim aşıyordu (PWA, iOS 1024 ve Play 512 türevlerinin hepsinde kırpık), Play'in yuvarlak maskesi üstüne sol bloğun köşesini de yiyordu. Dört varyant yan yana gösterildi (A mevcut, B kadraj + yatık, C şapka bloğa düz, D hiç yatık değil).

## Karar
- B: üçlü `translate(50 50) scale(0.9) translate(-51.2 -46.5)` ile tuvalin ortasına alındı; `rotate(-4)` yatıklığı ve şapkanın `rotate(-3)` duruşu aynen kaldı.
- Türevler yeniden üretildi: PWA `icon-192/512`, `apple-touch-icon` (kare krem zemin, 8 bit palet), iOS `AppIcon-1024` (alfasız), Android 7 eski `ic_launcher.png` (saydam köşeli, 5 yoğunluk), `store/icon-512/1024`, özellik grafiği. Uyarlanabilir Android ön planı ve maskeli PWA ikonu zaten kendi kadrajındaydı, değişmedi.
- Uygulama içi logo (`brand-core.ts`) ayrı kodda, dokunulmadı.

## Neden
- Yatıklık markanın her yerinde var (özellik grafiği, uygulama içi logo); ikon dümdüz olursa mağazadaki ikon ile uygulamadaki logo farklı hissettirir. Şapkanın hafif kayması 48 px'te bile akılda kalan tek detay.
- Kaynak SVG'yi düzeltmek tek değişiklikle bütün türevleri tutarlı yapıyor; yalnız mağaza PNG'sini düzeltmek PWA ve iOS'ta kırpığı bırakırdı.

## Reddedilen alternatifler
- C / D (şapka düz, yatıklık yok): daha derli toplu ama karaktersiz; marka tutarlılığı bozulur.
- Yalnız `store/icon-512.png`'yi değiştirmek: kırpık diğer türevlerde kalırdı.
- %84 ölçek (ilk deneme): çok küçük kaldı; Play maskesi için %90 yeterli boşluk.

## Sonuçlar / riskler
- Türev üretim yolu: `qlmanage` saydam köşe veriyor, PWA ikonları `sips`+`png-palette` ile kare svg'den (rx=0), Android 7 ikonu Chrome headless `--default-background-color=00000000` ile; `scripts/png-palette.mjs` başındaki not geçerli.
- Telefondaki uyarlanabilir ikon zaten doğru görünüyordu (Yusuf ekran görüntüsü, 2026-10-16).

## İlgili
- [[_overview]] · [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]] · [[2026-10-16-play-ekran-orani-ve-32-bit-ikon]] · [[2026-10-16-tussle-magaza-yayini-ve-play-console]]
