---
type: lesson
project: genel
date: 2026-10-15
status: active
tags: [working-rules, orkestrasyon, masaustu-uygulamasi, yan-oturum]
source: Claude Code oturumu 2026-10-15 "ZZ: yeni oturum yapısı ve SSH izinleri" (Tussle yedek yan oturumu)
---

# Ders: Öneri kartı (own_initiative) her zaman mevcut klasörde açılır; proje işi ZZ kökünden kartla önerilmez

## Ne oldu
Tussle gece yedeği işi ZZ kökündeki oturumdan `start_session` kartı olarak önerildi. İlk deneme `preset: mobil-playus` ile reddedildi ("kart host/klasör/preset taşıyamaz"); preset'siz tekrar gönderilince kart bu oturumun klasöründe, yani ZZ'de açıldı. Yusuf fark etti: "tussle işi zz klasöründe açılmış ama". İş mutlak yollarla doğru yürüdü ama Tussle'ın CLAUDE.md'si ve izinleri yüklenmedi.

## Kural
- Kart yalnız mevcut proje klasöründe açılır. Başka klasör/preset isteyen iş için kart kullanma: tek satırla "bu projenin oturumunda yapılmalı" de, Yusuf "başlat" deyince `user_asked` + `preset` ile başlat.
- CLAUDE.md "Side sessions" maddesine yazıldı (2026-10-15).

## İlgili
- [[2026-10-15-yan-oturum-ssh-alias-auto-mod]], [[orkestrasyon]], [[2026-10-15-sunucuda-gece-yedegi-systemd|Tussle gece yedeği]]
