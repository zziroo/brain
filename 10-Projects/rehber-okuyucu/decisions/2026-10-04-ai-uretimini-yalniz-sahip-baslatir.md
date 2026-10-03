---
type: decision
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, yetki, abonelik]
source: oturum 2026-10-04 (achievement-guide-formatter); Claude'un seçimi, Yusuf açıkça onaylamadı
---

# Karar: Rehber eklemek ve okumak herkese açık, AI üretimini yalnız parolayla giren sahip başlatır

## Karar
Girişsiz ziyaretçi rehber ekler ve okur (IP başına saatte 10 ekleme). AI düzenlemesi isteği, yeniden üretim ve dil değişimi `OWNER_PASSWORD` ile giriş ister. Üretilmiş belgeyi herkes görür. Ziyaretçinin "Yenile"si içerik değişse bile yeni üretim başlatmaz, yalnız "eski sürümden" işareti koyar. Parola 12 karakterden kısaysa giriş kapalı kalır.

## Neden
- Açık kuyruk Yusuf'un Max limitini yabancılara harcatır.
- Kişisel aboneliği herkese açık hizmetin motoru yapmak abonelik şartlarıyla sorunlu olabilir (kesin değil, doğrulanmadı).
- song-finder da parola arkasında.

## Reddedilen alternatifler
- Herkese açık kuyruk (en çok 25, günlük sınır): yukarıdaki iki neden.
- Ziyaretçi ister, sahip onaylar: ek durum ve arayüz; parolayı arkadaşlara vermek aynı işi görüyor.

## Not
Yusuf'a bu konu soruldu, soruyu yanıtlamadan mimariyi değiştirdi; bu seçim Claude'un varsayılanıdır, değiştirilebilir.

## İlgili
- [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]]
