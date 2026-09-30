---
type: decision
project: diskort
date: 2026-09-26
status: active
tags: [mimari, livekit, vps]
source: C--dev-diskort f0d5fe07/0f563e3b/3034bff9 (2026-09-26), C--dev-diskort 2736605c (2026-09-26/27)
---

# Karar: Ses ve ekran paylaşımı için kendi VPS'imizde LiveKit SFU, hesap + davet koduyla giriş.

## Bağlam
10-20 kişilik kapalı bir grup için Discord hızında sesli + ekran paylaşımlı uygulama gerekiyordu; uzun vadede metin, roller, DM eklenecek.

## Karar
Kiralık VPS üzerinde self-hosted LiveKit (docker compose: livekit, api, caddy), Fastify API, Electron masaüstü. Giriş: davet kodu + hesap. Platform önceliği Windows, sonra Linux, sonra macOS (ekran paylaşımı gibi bazı özellikler her platformda olmayabilir). TURN, 443 üzerinden TLS ile yedek bağlantı.

## Neden
- Masaüstü, Android ve ileride iOS için hazır kütüphaneler var.
- Zayıf izleyiciye düşük kalite gönderme ve bağlantıya göre ayarlama hazır; TURN gömülü.
- Ücretsiz, açık kaynak; kaynak tüketimi düşük (2 kişi + 1080p yayında ~tek çekirdeğin %22'si).
- Ses kalitesini sunucu değil istemci belirliyor (gürültü engelleme, yankı, bitrate), o yüzden başka SFU'ya geçmek sesi iyileştirmezdi.

## Reddedilen alternatifler
- mediasoup: yalnızca yapı taşı; oda, mobil kütüphane ve TURN'ü kendimiz yazmak aylarca iş.
- Janus / Jitsi: arkadaş grubu sesi için hantal, mobil taraf zayıf.
- Cloudflare Calls: kendi sunucumuz olmaz, trafik başına ücret.
- Bulut (Krisp gibi özellikler yalnızca LiveKit Cloud'da): fiyat ve bağımlılık nedeniyle seçilmedi.

## Sonuçlar / riskler
Krisp gibi bazı özellikler self-hosted sürümde yok (bkz. [[gurultu-engelleme-dpdfnet-varsayilan]]). Sunucu trafik kotası kullanıcı tarafından "5 TB gibi bir şey" diye aktarıldı (doğrulanmadı); yayın bitrate kararlarında sınır sayıldı.

## İlgili
- [[2026-09-26-kurulum-ve-yayina-alma]]
- Proje hedefleri: [[proje-hedefleri-ve-platformlar]]
