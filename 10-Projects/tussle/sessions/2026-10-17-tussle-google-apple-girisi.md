---
type: session
project: tussle
date: 2026-10-17
status: active
tags: [tussle, giris, google, apple]
source: Claude Code oturumu 2026-10-17 "tussle: Google ve Apple girişi"
---

# Oturum: Google ve Apple ile giriş canlıda açıldı

- Başlangıç: Yusuf giriş ekranında yalnız isim yazıldığını, Google/Apple ile kayıt olunamadığını sordu. Kod hazırdı, sunucuda kimlikler yoktu.
- Google: Chrome üzerinden GCP `tussle` projesinde branding tamamlandı, "Tussle web" istemcisi açıldı, Client ID `.env`'e yazıldı. In production onayını Yusuf tıkladı. Yusuf telefonda bağladı, kayıt doğrulandı.
- Apple: App ID'ye Sign in with Apple, Services ID `net.ziroo.tussle.web` kuruldu, `.env`'e yazıldı. Yusuf telefonda bağladı, kayıt doğrulandı. Apple cihazı gerekmedi.
- Sunucu kodu ve repo değişmedi; yalnız `/opt/tussle/.env` + konteyner yeniden oluşturma.
- Açık iş: iOS native Google + Apple (yan oturum kartı önerildi, yeni iOS build ister). `store/listing.md` notu Android için eskidi.
- Karar: [[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]] · Ders: [[2026-10-17-konsol-kurulumunda-onay-tiklamalari-kullanicida]]
