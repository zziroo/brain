---
type: lesson
project: tussle
date: 2026-10-23
status: active
tags: [tussle, ses, uretim]
source: oturum "tussle: ses seçimi ad ad, kademe rozeti kalkıyor" (2026-10-23)
---

# Ders: WAV üretiminde reçetesi değişmeyen dosya da 1-2 bayt oynayabilir; commit öncesi geri al

`uret.mjs` OfflineAudioContext ile üretir; aynı reçete aynı sesi verir ama kompresör/yuvarlama yüzünden bazı dosyalar (badge, level) 2 baytlık fark gösterdi. `git show HEAD:<dosya> | cmp -l - <dosya> | wc -l` ile fark sayısına bak; birkaç bayt ise `git checkout -- <dosya>` ile geri al, böylece commit yalnız gerçekten değişen sesleri taşır ve SW önbelleği boşa büyümez. Üretimi tarayıcı bölmesinden (`preview_start` ile `demo.html?export=1`) yapmak sistem tarayıcısını açmadan çalışır. Oturum: [[2026-10-23-tussle-ses-secimi-ad-ad-kademe-ve-zorluk-etiketleri]].
