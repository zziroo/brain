---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ders, play, iap]
source: oturum "tussle: denge partisi, oda kilidi, tema düzeltmeleri" (2026-10-19)
---

# Play'de ürün kullanıcının bölgesinde satışta değilse satın alma "Product not found" der

- Belirti: Android'de "Satın alma başlatılamadı"; ürünler konsolda ACTIVE görünüyordu. İstemci mağaza hatasını raporlamıyordu, bu yüzden iz yoktu.
- Neden: one-time product'ın `regionalPricingAndAvailabilityConfigs`'inde TR yoktu (yalnız ET, MN, US). Ürün ACTIVE olsa da o bölgedeki hesap ürünü bulamaz.
- Teşhis: Play API `GET oneTimeProducts/<id>` ile bölge listesine bak (salt okuma betik `scripts/play-iap.mjs`'in kimlik doğrulama başını kullanır).
- Kalıcı: `iap.ts` artık başarısız mağaza akışını `iap.purchase <store> <ürün> <kod>` olarak client-errors.jsonl'a yazar; `feedback-cli.mjs errors` ile okunur.

İlgili: [[2026-10-19-play-hak-paketleri-tr-fiyati]]
