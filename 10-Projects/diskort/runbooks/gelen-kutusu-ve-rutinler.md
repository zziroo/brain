---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, gelen-kutusu, rutin]
source: memory diskort-workflow.md, diskort-handoff.md
---

# "Handoffu al": gelen kutusundaki okunmamış dosyaları oku, özetle, eylem öner, `okundu\`ya taşı

1. `C:\Users\yusuf\diskort-inbox\` içindeki okunmamış dosyaları oku (`YYYY-MM-DD-HHmm-<tür>.md`, `durum.json`, `hata-ozet.js`).
2. Özetle, eylem öner, dosyaları `okundu\` altına taşı.
3. Özellik/UI önermeden önce [[urun-basit-tutma-reddedilen-fikirler]] ve ilgili karar notlarına bak.

Rutinler ("Diskort gözcü" saatlik, "gece güvenlik ağı" 00:10) bu klasöre yazar: [[zamanlanmis-gorevler-ve-skiller]]. Klasör `.claude` dışına taşındı çünkü orası izin sorar ([[claude-altina-yazma-izin-sorar]]). Rutin çalışmalarına bakmak için: scheduled-tasks `list_task_runs` + ccd_session_mgmt `list_events`; bir çalışmayla konuşmak için `send_message`.

## İlgili
- [[_overview]], [[admin-paneli-ve-loglar]]
