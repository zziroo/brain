---
type: lesson
project: tussle
date: 2026-10-24
status: active
tags: [tussle, app-store-connect, api, magaza]
source: Claude Code oturumu 2026-10-24 "tussle: mağaza durum kontrolü" (mobil-playus)
---

# App Store Connect API ile mağaza doldurma ve gönderme: tuzaklar

- İlk sürümde `whatsNew` yazılamaz (409); sürüm dizesi build'in pazarlama sürümüne eşit olmalı (1.0 kaydı build 1.4'ü almaz) → `scripts/asc-metadata.mjs` sürümü build'e göre düzeltir.
- Universal derleme App Store'da iPad görselini zorunlu kılar ([[2026-10-24-ios-yalniz-iphone-ipad-sonra]]). Content Rights beyanı `PATCH /v1/apps` `contentRightsDeclaration` ile.
- Gönderim: `reviewSubmissions` + `reviewSubmissionItems` sürüm için çalışır (`scripts/asc-submit.mjs`); taslak (READY_FOR_REVIEW) iptal edilemez, yeniden kullanılır; bekleyen gönderim geri çekilince sürüm DEVELOPER_REJECTED olur, yeniden gönderilebilir.
- Ürünler API ile gönderime eklenemedi: `reviewSubmissionItems` IAP ilişkisi tanımıyor, `inAppPurchaseSubmissions` "pending version yok" dedi; ilk tüketilebilir ürün sürümle gitmeli. Yol: ASC'de her ürün sayfasında "Add for Review" → Draft Submissions → Submit for Review.
- App Privacy etiketinin API'si yok; sınıflandırıcı ASC form tıklamasını engelliyor, Yusuf tıklar, Claude okur.
- Ekran görüntüleri: `sourceFileChecksum` (MD5) ile değişen görsel algılanır, aynı set yeniden yüklenmez; Play tarafında `images[].sha1`.
