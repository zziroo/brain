---
type: decision
project: diskort
date: 2026-09-27
status: active
tags: [diskort, ekran-paylasimi, livekit]
source: memory diskort-rules.md, diskurt-project.md, diskort-server.md
---

# Ekran paylaşımı sabit presetlerle yapılır; gerçek çok kullanıcılı test olmadan çalışma anında çözünürlük/fps değişmez

## Karar
Presetler: 720p60 / 1080p30 / 1080p60 (6/8/12 Mbps). 1440p preset'i vardı, sonradan kaldırıldı. Çalışma anında çözünürlük/fps geçişi yok.

## Neden
Kaynakta: "gerçek çok kullanıcılı test olmadan çalışma anında geçiş yok". VPS kotası ~5 TB/ay, sunucu ölçümü: 2 kullanıcı + bir yayın ~8.7 Mbps her yön, LiveKit tek çekirdeğin ~%22'si.

## Reddedilen alternatifler
- 1440p preset (kaldırıldı; 0.9.x belgelerinde de bu yok).
- Çalışma anında çözünürlük/fps değiştirme.

## Sonuçlar / riskler
GPU kodlama: Windows'ta Chromium H.264 Constrained Baseline'ı donanımda kodlamaz; H.264 High tercih edecek şekilde `addTransceiver` kancalandı (0.3.4). Telefondan yayın: H.264 HW kodlayıcı Yusuf'un Xiaomi'sinde 0 fps verdi, VP8'e geçildi (0.2.3; sonuç kayıtta doğrulanmamış). Telefon aşırı ısınma incelemesi [[_overview]] "Güncel durum"da.

## İlgili
- [[sunucu-vps]]
