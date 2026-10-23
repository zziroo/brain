---
type: decision
project: diskort
date: 2026-09-30
status: superseded
tags: [diskort, kozmetik, performans, mobil]
source: 54dc3a33-8a43-4d66-8774-07b1dfa4d58f.jsonl
---

> Geçersiz (2026-10-23): kozmetikler tamamen kaldırıldı, bkz. [[2026-10-23-kozmetikler-tamamen-kaldirildi]].

# Karar: Kozmetikler yalnızca üzerine gelince (masaüstü) ya da açılmış profilde (telefon) oynar, diğer her yerde sabit poster

## Bağlam
0.9.2'de telefon takılıyor ve kalitesizdi; kayıtta "aynı anda çok fazla dosya oynuyor" uyarısı (yük koruması) vardı, en çok üye listesinde.

## Karar
- Masaüstü: üye listesi, DM, ses sahnesi satırlarında fare/klavye odağıyla; mesajlar/alt panel avatara gelince; açık profil kartında kart efekti ve büyük avatar oynar.
- Telefon: yalnız açılmış profilde (kart efekti + büyük avatar süsü) ve ayarlardaki seçili önizleme; listeler, mesajlar, sesli kutucuklar ve paneller yalnız poster, oynatıcı bile kurulmaz.
- Native parmak izi değişmediği için OTA yeter; 0.9.3 bu iş + DPDFNet düzeltmesiyle çıkacak.

## Neden
Kullanıcı: Discord böyle yapıyor, en mantıklısı bu.

## Reddedilen alternatifler
- Önce yalnız üye listesinde azaltmak (asistanın adım 1'i): kullanıcı tüm platformlarda komple çözüm istedi.
- Sunucudan telefon oynatmayı kapatmak: geçici çare olarak önerildi, yapılmadı.

## İlgili
- [[kozmetik-paketleri-sunucudan-on-render]]

Benzer/ilgili not (başka ajan): [[kozmetik-sadece-hover]]
