---
type: lesson
project: ziroo-edge
date: 2026-10-17
status: active
tags: [css, tipografi, turkce]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa" (HADİ'deki İ'nin noktası renksiz)
---

# Ders: Harf başına `background-clip: text` dolgusu, harf kutusunun dışına taşan nokta ve çengelleri boyamaz

## Ne oldu
Başlıklar harf harf span'lere bölünüp her birine renk geçişli dolgu verildi. İ'nin noktası büyük harf yüksekliğinin üstünde, Ş ve Ç'nin çengeli taban çizgisinin altında kaldığı için bu parçalar arka plan kutusunun dışına düştü. Nokta yalnız dış çizgi çizilirken göründü, sonra renksiz kayboldu.

## Nasıl uygulanır
- Harf span'ine `padding-block: .3em; margin-block: -.3em` ver: kutu büyür, yerleşim değişmez.
- Renk geçişinin konumu (`--bx`, `--hw`) yatayda olduğu gibi kalır; kontrol et.
- Türkçe büyük harf başlıklarda İ, Ş, Ç, Ğ'yi mutlaka ekranda gör. Ayrıca [[turkce-sayfada-css-buyuk-harf-noktali-i]] (DISKORT → DİSKORT tuzağı).

## İlgili
- [[decisions/2026-10-16-ziroo-net-kaydirmali-2d-maskot]]
