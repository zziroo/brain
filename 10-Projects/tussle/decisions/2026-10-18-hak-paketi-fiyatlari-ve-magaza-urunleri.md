---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, iap, play, apple, fiyat]
source: oturum 2026-10-18 "tussle: durum özeti" (mağaza kurulumu)
---

# Karar: hak paketleri 0,49 / 0,99 / 1,49 $ (1 / 3 / 5 hak), iki mağazada da scriptle kurulur

## Bağlam
Play ödeme profili ve Apple Paid Apps anlaşması aynı gece açıldı; ürünler oluşturulacaktı. Fiyat kararı Yusuf'tan Claude'a bırakıldı ("genel kullanıcıyı ne mutlu eder sen karar ver").

## Karar
`tries_1` 0,49 $, `tries_3` 0,99 $, `tries_5` 1,49 $; USD/EUR tabanlı, diğer ülkeler mağaza kurundan türetilir. Play: `scripts/play-iap.mjs` (yeni one-time products API). Apple: `scripts/apple-iap.mjs` (ASC API; tüketilebilir, en-US + tr, USD fiyat takvimi). İkisi de tekrar çalıştırılabilir.

## Neden
- Paket odaya hediye; dürtüsel, küçük alım. Pahalı olursa hiç alınmaz.
- Üç kademe arası oran (1→3 hak iki katı fiyat, 5 hak üç katı) büyük paketi mantıklı kılar.
- Scriptle kurulum: Play Console'un eski ürün sayfası bu hesaba kapalı; API tek yol. Apple'da da elle 3 ürün × 2 dil hata açık.

## Reddedilen alternatifler
- 0,99 / 1,99 / 2,99 $: "genel kullanıcı" için pahalı bulundu.
- Capacitor'a dönüş ihtimali nedeniyle beklemek: mağaza tarafı (ürün, fiyat, anlaşma, sunucu doğrulaması) platform kabuğundan bağımsız; yalnız Android istemci yolu değişirdi.

## Sonuçlar / riskler
- Apple ürünleri "Missing metadata": inceleme ekran görüntüsü build 5 gönderiminde elle.
- Play'de fiyat alt sınırı 0,49 $'ı kabul etti; bazı ülkelerde Play asgariye çeker.

## İlgili
- [[2026-10-17-hak-paketleri-odaya-hediye-reklam-yok]]
- [[2026-10-18-magaza-formlari-ve-urun-olusturma-siniflandiriciya-takilir-script-yusuf-kosturur]]
