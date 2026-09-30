---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [admin, web, guvenlik]
source: C--dev-diskort 4b7b1382 (2026-09-27/28)
---

# Karar: Yönetim paneli uygulama içinde değil, sitede (/admin) sunulur; yalnızca hesap yöneticileri girer.

## Bağlam
Kullanıcı admin panelini siteden sunmanın daha iyi olup olmadığını sordu; veriyi olabildiğince ayrıntılı görmek istiyor.

## Karar
Panel diskort.ziroo.net/admin altında, Diskort kullanıcı adı ve şifresiyle giriş, yalnızca yönetici hesaplar. Arama motoruna kapalı, ana sayfada bağlantı yok. Telefonda ve PC'de düzgün görünür; sonradan "eksik gördüğün her şeyi ekle, veri olarak her şeyi göreyim" denerek genişletildi.

## Neden
- Her yerden (telefon dahil) erişim.
- Panele ekleme için istemci sürümü çıkarmak ve herkesi güncellemeye zorlamak gerekmez; sunucuyu güncellemek yeter.

## Reddedilen alternatifler
- Uygulama içi panel: her değişiklik sürüm gerektirir.

## Sonuçlar / riskler
Tek savunma katmanı hesap yöneticisi yetkisi; yönetici bir hesap ele geçirilirse panel risk. Güvenlik incelemesi bulguları ayrı işlendi.

## İlgili
- [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]]
