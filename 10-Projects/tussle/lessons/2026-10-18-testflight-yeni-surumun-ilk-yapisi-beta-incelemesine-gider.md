---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ios, testflight, apple]
source: oturum 2026-10-18 "tussle: kalan işler" (ASC API `betaAppReviewSubmissions` okuması)
---

# Ders: TestFlight'ta her yeni sürüm numarasının ilk yapısı dış test için beta incelemesine gider

1.0'da yalnız build 1 incelendi (`submittedDate` dolu), build 2–4 dış gruba eklenince doğrudan APPROVED oldu. Build 5 `MARKETING_VERSION` 1.1 olduğu için `WAITING_FOR_BETA_REVIEW`'a düştü. Aynı sürümün sonraki yapıları yine genelde doğrudan geçer.

**Uygula:** Sürüm numarasını yalnız gerektiğinde artır (mağaza sürümü için); ara iOS yapılarında yalnız `CURRENT_PROJECT_VERSION`'ı artırmak dış testi bekletmez. İnceleme genelde bir gün içinde biter.

İlgili: [[2026-10-18-testflight-dis-test-ve-apple-urun-metadatasi-api-ile]]
