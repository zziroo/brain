---
type: decision
project: diskort
date: 2026-09-30
status: superseded
tags: [diskort, kozmetik, 0-9-2]
source: memory diskort-cosmetics-plan.md, diskort-rules.md
---

> Geçersiz (2026-10-23): kozmetikler tamamen kaldırıldı, bkz. [[2026-10-23-kozmetikler-tamamen-kaldirildi]].

# Profil kozmetikleri 0.9.2'den beri sunucudan dağıtılan önceden render edilmiş paketlerdir; gerçek zamanlı çizim yok

## Bağlam
Önceden istemci (masaüstü WebGL, mobil Skia) kozmetikleri gerçek zamanlı çiziyordu. 0.9.2'de bu motorlar silindi.

## Karar
- Ücretsiz "mağaza": yayınlanan her set herkese açık; dükkan, sahiplik, admin verme yok. Etki + `anim:<id>` süsü + isim plakası.
- Yeni temalar client release'i olmadan çıkmalı: aracıyla tasarla + render et, sunucuya yayınla ([[kozmetik-yayinlama]]).
- Kusursuz döngü, standart 6 sn, 30 fps ("30 çok iyi, burada kal"); görünür yeniden başlama yok.
- Kart tuvali 300x450 css (600x900 px), kart genişliğine ölçeklenir, üste hizalı, son %20'de solar, avatar deliği yok. Süs 264x264, plaka 446x80.
- Görünüm serbestçe değişebilir; kalite çıtası yüksek ("havalı"), soyut, asla Discord kopyası değil.
- Gerçek zamanlı çizime geri dönüş (fallback) YOK. Android minimum API 26 ([[android-min-api-26]]); kart videosu Android 10+ (API 29), altında poster.
- Profil teması/banner kalır. "Profil rengi" seçici 0.9.2'de kaldırıldı: avatar yedek rengi = profil teması birincil rengi, yoksa saklanan renk (sunucu tarafı).
- İstenen sıradaki: "buz"un ateş versiyonu (Yusuf en çok buzu sevdi).

## Neden
Yeni temaların client release gerektirmemesi; sunucu tarafı kill switch ile sorunlu platformda kapatabilmek.

## Reddedilen alternatifler
- İstemcide gerçek zamanlı çizim (WebGL/Skia) ve ona fallback.
- Mağaza / sahiplik / admin tarafından verme.

## Sonuçlar / riskler
Cihazlarda test edilmedi (0.9.2 sonrası): mobil oynatma, Android kart videosu (yamalı Skia), iOS kart videosu, çok satırda bellek. Bozulursa: `cosmetics-cli platforms <id> desktop` veya OTA ayarı `STACKED_VIDEO_PLATFORMS`. Devamı: [[kozmetik-sadece-hover]]. Teknik notlar: [[kozmetik-avif-tam-aralik]].

## İlgili
- [[_overview]]
