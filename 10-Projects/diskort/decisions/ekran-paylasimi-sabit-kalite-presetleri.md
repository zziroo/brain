---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [yayin, kalite, bitrate]
source: C--dev-diskort 4b7b1382 (2026-09-27/28)
---

# Karar: Ekran paylaşımı sabit presetlerle çalışır; otomatik kalite ve özel bitrate kaldırıldı, en üst seçenek 1080p60 (12 Mbps).

## Bağlam
Dinamik/otomatik kalite modu yayında sık sık "bağlantı zayıf" ve donma yarattı; kullanıcı eski sistemde yayının akıcı olduğunu söyledi.

## Karar
Yayın boyunca çözünürlük, fps ve bitrate tavanı sabit. Presetler: 720p60 (6 Mbps), 1080p30 (8 Mbps), 1080p60 (12 Mbps, varsayılan). 1440p60 (18 Mbps) önce deneysel eklendi, sonra "sunucuya çok ağır" diye kaldırıldı. Otomatik/eski varsayılandakiler 1080p60'a taşındı.

## Neden
- Eski sabit sistem (1080p30/6 Mbps) iyi çalışmıştı; 1080p60/12 Mbps kare başına aynı veri, iki kat akıcılık.
- Yayın tek kalitede gider; bitrate artınca indirme hızı yetmeyen izleyicide sunucu yayını duraklatır (donma).
- 1440p sunucu yükünü artırıyor.

## Reddedilen alternatifler
- Otomatik mod: 2 sn'de bir kodlayıcı ayarı değişimi, anahtar kare yığılması ve yanlış "ağ kötü" algısı (ölçülmemiş varsayım, bkz. ders).
- Kullanıcı seçebilir bitrate (15 Mbps): kaldırıldı; gerekirse 12 -> 15 Mbps tek satır.

## Sonuçlar / riskler
Gerçek yayında doğrulama kullanıcı testine bırakıldı; sonucu oturumlarda açıkça yok.

## İlgili
- [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]]
- Aynı konuda memory kaynaklı not: [[ekran-paylasimi-sabit-presetler]]
