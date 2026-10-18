---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ios, testflight, apple, iap, otomasyon]
source: oturum 2026-10-18 "tussle: kalan işler" (mobil-playus, `ad1677f`)
---

# Karar: TestFlight dış test devri ve Apple ürün metadatası App Store Connect API ile scriptten yapılır

## Bağlam
Build 5 (1.1) yüklenmişti ama yalnız iç grupta duruyordu; Yusuf her yüklemede "What to Test" yazıp dış grubu elle eklemek zorunda kalıyordu. Hak paketleri (`tries_1/3/5`) "Missing Metadata" durumundaydı ve inceleme ekran görüntüsünün elle yükleneceği varsayılıyordu.

## Karar
- `scripts/testflight.mjs` (`npm run ios:testflight [build] [--notes dosya] [--dry-run]`): "What to Test" metnini `store/testflight-notes.txt`'ten yazar (tek yerel en-US, TR + EN metin), yapıyı `externalgroup`'a ekler, beta incelemesine gönderir. Her adım tekrar çalıştırmada atlanır; 409 "zaten gönderildi" sayılır. Build 5 böyle gönderildi.
- `scripts/apple-iap.mjs` ürünleri 175 bölgenin hepsinde (yeni bölgeler dahil) satışa açar ve inceleme görüntüsünü yükler (rezervasyon → parçalar → MD5 ile PATCH; MD5 değişirse eskisini siler). Görüntü `node store/make-graphics.mjs gift` ile üretilir (sahte mağaza, fiyatlar elle yazılır): `store/ios/iap-review-gift.png`. Üç ürün de Ready to Submit.

## Neden
- "Missing Metadata"nın iki sebebi vardı: inceleme görüntüsü **ve** satış bölgeleri (availability) hiç yoktu. İkisi de API'de var; konsolda elle 3 ürün tekrarı gereksiz.
- Cila sonrası görüntü yeniden üretilince tek komutla değişir.

## Reddedilen alternatifler
- Konsoldan elle (Yusuf): her yüklemede tekrar, unutulabilir; build 5 bu yüzden dış teste hiç gönderilmemişti.
- Dış grubu "tüm yapılara erişim" yapmak: dış gruplar için yok, her yapı ayrıca incelemeye gider.

## Sonuçlar / riskler
- `store/testflight-notes.txt` her yapıda güncellenmeli; eski metinle gönderilirse testçiye yanlış yönlendirme gider.
- İlk ürünler ilk App Store sürümüyle birlikte incelemeye gider.

## İlgili
- [[2026-10-18-hak-paketi-fiyatlari-ve-magaza-urunleri]]
- [[2026-10-18-testflight-yeni-surumun-ilk-yapisi-beta-incelemesine-gider]]
- [[2026-10-18-tussle-kalan-isler-testflight-urunler-play-konsol]]
