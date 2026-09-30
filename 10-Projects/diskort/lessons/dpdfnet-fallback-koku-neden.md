---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, ses, gurultu-bastirma, 0-9-3]
source: memory diskort-handoff.md
---

# DPDFNet'in orta aramada DeepFilterNet'e düşmesinin kökü, serileştirilmemiş mikrofon yeniden yayınıydı

- Telemetri: 3 masaüstü kullanıcısı underrun patlamalarında (300-700 ms takılmalar, yük ~0.4) DPDFNet -> DeepFilterNet'e, sonra `model=null` ile sürekli ham gönderime düştü.
- Yerelde yeniden üretilen kök neden: serileştirilmemiş mikrofon yeniden yayını -> 2 mic yayını (yetim olan mute'u yok sayar), halkalar titrer, tarayıcı NS kapalı.
- Düzeltme (0.9.3): `micSequencer.ts`, `denoiserHealth.ts` (8'de 5 penceresi, takılma toleranslı; bekleme 5->30 dk sonra orta aramada yeniden yükseltme), arayüzde etkin mod, kehribar başlık çubuğu ikonu, telemetri `mic.effectiveNoise` / `mic.fallback`. DeepFilterNet 3 kaldırıldı (ayarlar deepfilter -> dpdfnet'e taşınır).
- Gerçek oyun altında doğrulanmadı: oyuncular oynadıktan sonra `mic.fallback` telemetrisi izlenecek.

## İlgili
- [[_overview]]
