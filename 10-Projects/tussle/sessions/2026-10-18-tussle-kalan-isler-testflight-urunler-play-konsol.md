---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, testflight, iap, play, iarc, magaza]
source: Claude Code oturumu 2026-10-18 öğlen "tussle: kalan işler" (mobil-playus, `ad1677f`)
---

# Oturum: kalan işler, TestFlight dış test scripti, Apple ürünleri hazır, Play konsol işleri

## Yapılan
- **TestFlight:** build 5 (1.1) dış gruba eklenip beta incelemesine gönderildi; artık `npm run ios:testflight` ([[2026-10-18-testflight-dis-test-ve-apple-urun-metadatasi-api-ile]]). 1.1 olduğu için incelemeye düştü ([[2026-10-18-testflight-yeni-surumun-ilk-yapisi-beta-incelemesine-gider]]).
- **Apple ürünleri:** bölgeler + inceleme görüntüsü API ile; `tries_1/3/5` Ready to Submit.
- **Konsol kontrolü (Chrome):** Apple Paid Apps + Free Apps anlaşmaları, banka (Garanti), W-8BEN + Certificate of Foreign Status, DSA aktif; adres mahalleli (daire no yok, sorun değil). Apple sandbox testçi yok (API). Play: hesap ve Android geliştirici doğrulaması tamam, 10 beyan tamam, kapalı testte 3/12 testçi.
- **Play:** lisans testi "Tussle test" listesi işaretlendi (1 kişi). IARC yeniden gönderildi (ajan): dijital satın alma evet, rastgele öğe/takas hayır, sohbet denetimi "hayır" (yalnız bildir/engelle); sonuç Brezilya L → 14+, diğerleri aynı, her bölgede "In-App Purchases" etiketi. Yayın özetinden incelemeye gönderildi. Hesap grubu kuruldu (yalnız Ziroo) ama %15 şart kabul düğmesi Ödeme profilinde henüz çıkmadı.
- **Bildirim sorusu:** Yusuf'a öğlen gelen bildirimler gerçek `day` bildirimiydi (oda saati varsayılanı 12:00; üç odanın günü açıldı). Sunucu 11:48'de sabahki yayınla yeniden başlamıştı.
- Slaytlar bitti (Yusuf beğendi). Kapsamlı cila turu ayrı oturumda başlatıldı ("tussle: kapsamlı cila turu").

## Doğrulanmayan
- %15 programına kayıt tamamlanmadı/görünmüyor; Ödeme profili tekrar kontrol edilmeli.
- IARC "sohbet denetleniyor mu" yanıtı tahmin; derecelendirmeyi değiştirmiyor.
- Lisans test listesindeki tek hesabın kim olduğu okunamadı.
- Play ödeme profilindeki IBAN durumu iframe içinde, okunamadı.
