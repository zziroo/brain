---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, orkestrasyon, ajan, ders]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli"
---

# Ders: ajanın `pkill -f "tsx src/server/index.ts"` komutu aynı klasörde başka oturumun dev sunucusunu da öldürdü

Özellik ajanı duman testi için kendi `tsx` sürecini açıp desenle kapatınca, uygulamanın önizleme panosundan açılmış `tsx watch` (8087) de düştü; ajan `touch` ile yeniden başlattı. Kural: ajan briefine "kendi başlattığın süreci PID ile kapat, `pkill -f` desen kullanma; duman testi için ayrı port ve `DATA_DIR` kullan" yaz. Koordinatör tarayıcı kontrolünü `.claude/launch.json` yapılandırmasıyla (`tussle-admin`, 8089) yaptı; bu yol daha güvenli.

İlgili: [[2026-10-15-ajanlar-ortak-calisma-kopyasinda-git-stash-yasak]] · [[2026-10-16-admin-paneli-tek-sayfa-admin-token-kapaliysa-404]]
