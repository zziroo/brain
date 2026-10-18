---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, ajanlar, puppeteer, gorsel, cila]
source: oturum 2026-10-18 "tussle: cila turu (tema, ekranlar)"
---

# Ders: ekran ekran görsel keşif için başsız puppeteer + ajan başına tohumlu ortam

## Ne işe yaradı
- Tarayıcı bölmesi yerine başsız Chrome (puppeteer-core, scratch klasörüne kurulu) ile her ajan kendi API + Vite portunda, `store/seed-room.ts` ile tohumlanmış ortamda çalıştı. Tema başına ayrı tarayıcı bağlamı (`tussle.settings.v1` ile gece/gündüz), localStorage çakışması yok. Ortamı açan küçük yardımcı (`env.mjs <apiPort> <webPort> <outDir>`) seed.json yazar ve açık kalır.
- Renk kararları göz kararı değil `getComputedStyle` + WCAG oranıyla ölçüldü; ekran görüntüsü yalnız gece|gündüz yan yana çiftler ve önce/sonra 2x2 sayfalar olarak. Yusuf'a seçimi bu sayfalarla sunmak hızlı karar getirdi (13 başlığın hepsi seçildi).
- Keşif üç ajana bölündü: statik (token kontrastı, sabit renkler, çubuk tutarlılığı, Android araştırması) + oda dışı + oda/parti/oyun. Düzeltme iki ajana dosya sahipliğiyle bölündü (CSS/arayüz vs. oyun view + theme-color), çakışma olmadı.

## Tuzaklar
- Vite (`host: 'localhost'`) Mac'te yalnız IPv6 `::1`'de dinler: `http://127.0.0.1:<port>` yanıt vermez, `localhost` kullan (API sunucusu 127.0.0.1'de çalışır).
- API sağlık ucu `/healthz` (`/api/health` yok).
- Alt ajanlar rapor dosyası yazamadı (Write: "subagents should return findings as text"); raporu son mesajda verdiler, koordinatör notlar klasörüne kaydetti. Ekran görüntüsü dosyalarını script ile yazabildiler.
- Tohumda Deniz oturum açar, kurucu Mert: parti lobisi ve host paneline ulaşılamaz; bunlar için seed'e kurucu token'ı eklenmeli.
- Chrome 1,5 px kenarlığı her DPR'de 1 px'e yuvarlar; konturun her platformda aynı görünmesi gerekiyorsa 2 px.
- `release.sh` takipsiz dosya da olsa durur; derlemeye girmeyen başka bir oturumun klasörü varsa `--allow-dirty` (OTA zip çalışma ağacından derlenir, `src` temiz olmalı).

## İlgili
- [[2026-10-18-cila-turu-kontrol-konturu-ters-bildirim-gece-cubugu-bekler]]
- [[2026-10-12-denge-ve-tema-turu-dersleri]]
