---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, iap, play, fiyat]
source: oturum "tussle: denge partisi, oda kilidi, tema düzeltmeleri" (2026-10-19), commit `66b035f`
---

# Karar: Play hak paketleri Türkiye'de 9,99 / 19,99 / 29,99 ₺

## Bağlam
Android'de "Satın alma başlatılamadı": istemci hata kaydı `Product not found`; Play API'de paketler yalnız ET, MN, US bölgelerindeydi, TR yoktu.

## Karar
- `scripts/play-iap.mjs` TR'yi lira olarak açıkça yazar: tries_1 9,99, tries_3 19,99, tries_5 29,99 ₺ (Yusuf: "biraz düşür, daha satın alınabilir"; ilk öneri 19,99/39,99/59,99 idi). USD/EUR 0,49/0,99/1,49 aynı. Komutu Yusuf çalıştırdı; API ile TR AVAILABLE doğrulandı.
- Play bölgesel fiyatı kurla kendiliğinden değiştirmez; lira değer kaybedince betikteki fiyat elle güncellenip yeniden çalıştırılır. Apple temel fiyattan diğer ülkeleri kendisi ayarlar.

## Neden
Türkiye ana pazar; düşük basamak alım gücüne uygun, 5'li paket hak başına belirgin ucuz.

## Reddedilen alternatifler
- 19,99/39,99/59,99 ₺: Yusuf pahalı buldu.
- Play'in kur çevirisine bırakmak: TR hiç listede değildi; açık fiyat daha öngörülebilir.

## İlgili
[[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]], [[2026-10-19-play-urunu-bolgede-yoksa-product-not-found]]
