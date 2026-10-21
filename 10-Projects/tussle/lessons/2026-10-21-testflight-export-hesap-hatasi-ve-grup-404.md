---
type: lesson
project: tussle
date: 2026-10-21
status: active
tags: [tussle, ios, testflight, magaza]
source: "oturum 2026-10-21 akşam (iOS 1.4 build 10 yüklemesi)"
---

# Ders: xcodebuild export "Failed to Use Accounts" der, API anahtarıyla geç; taze build gruba build tarafından eklenir

- Arşiv geçti ama `xcodebuild -exportArchive` (destination upload) "Failed to Use Accounts" ile düştü: Xcode'da hesap oturumu yok. Çözüm: aynı komuta `-authenticationKeyPath ~/.config/tussle/AuthKey_<KEY_ID>.p8 -authenticationKeyID <KEY_ID> -authenticationKeyIssuerID <issuer>` eklemek (değerler `scripts/testflight.mjs` başında ve `docs/STORE.md` §3'te).
- Yüklemeden sonra build ASC'de birkaç dakika görünmez (`build N not found`), sonra `VALID` olur; `testflight.mjs` beklemez, döngüyle tekrar çalıştır.
- `POST /v1/betaGroups/{id}/relationships/builds` taze build için 404 verdi (build VALID, `READY_FOR_BETA_SUBMISSION` iken). `POST /v1/builds/{id}/relationships/betaGroups` çalıştı; betik buna çevrildi (`57b57e8`).

İlgili: [[2026-10-18-testflight-yeni-surumun-ilk-yapisi-beta-incelemesine-gider]], [[2026-10-18-magaza-derlemesi-ortam-tuzaklari-java-home-zsh]].
