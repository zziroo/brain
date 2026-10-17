---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, giris, chrome, tarayici, auto-mode]
source: Claude Code oturumu 2026-10-17 "tussle: Google ve Apple girişi"
---

# Ders: geliştirici konsollarını Chrome'dan kurarken yayın onayı kullanıcıda kalır, tıklamalar JS ile doğrulanmalı

- **Yayın onayı engellenir:** Google Auth Platform'da "Push to production? → Confirm" tıklamasını auto mode sınıflandırıcısı reddetti. Pencereyi açık bırakıp Yusuf'a bastırmak yetti. Bu tür onayları baştan kullanıcıya bırak, tekrar deneme.
- **Apple portalında ref ile tıklama kayabilir:** App ID yetenek listesinde `find` ref'iyle tıklanan kutu bir alttakini (SIM Inserted) işaretledi. Kaydetmeden önce `input[type=checkbox]:checked` listesini JS ile oku; Services ID formunda da aynı yöntem işe yaradı.
- **Google düğmesi iframe içinde:** GSI düğmesi `find`/`read_page` ile görünmez, koordinatla tıklanır. Yerleşik tarayıcı bölmesi Claude'un tıklamasıyla açılan açılır pencereyi engeller; gerçek girişi kullanıcı yapar.
- **Girişin tuttuğunu doğrulamak:** konteyner içinde `node:sqlite` (better-sqlite3 yok) ile salt okunur `identities` sorgusu; `docker logs tussle | grep listening` "google on, apple on" verir.

İlgili: [[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]]
