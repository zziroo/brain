---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, gelen-kutusu, rutin]
source: memory diskort-workflow.md, diskort-baslangic.md
---

# Oturum başında gelen kutusundaki okunmamış dosyaları oku, özetle, eylem öner, `okundu\`ya taşı

Sıra: önce [[_overview]], sonra bu klasör, sonra kurallar. (Eski "handoffu al" tetikleyicisi aynı anlama gelir.)

1. `/Users/ziroo/ZZ/gozcu/` içindeki okunmamış `YYYY-MM-DD-HHmm-gozcu.md` raporlarının **`## Diskort`** bölümünü (ve `## Kod incelemesi` > diskort) oku. 2026-10-18'den beri rapor global: Tussle, kripto-bot, yedekler de aynı dosyada ([[2026-10-18-global-gece-gozcusu]]); eski yol `~/diskort-inbox/` artık yok.
2. Özetle, eylem öner. Dosyayı `okundu/` altına yalnız ZZ kökü oturumu ya da bütün bölümlerle ilgilenen oturum taşır; Diskort oturumu yalnız kendi bölümünü işler.
3. Özellik/UI önermeden önce [[urun-basit-tutma-reddedilen-fikirler]] ve ilgili karar notlarına bak.

Tek rutin "diskort feedback rutin" (gözcü, günde bir 00:10; gece incelemesi 2026-10-10'da kaldırıldı: [[2026-10-10-gozcu-gunluk-gece-incelemesi-kaldirildi]]) bu klasöre yazar. Çalışma klasörü yoksa oturum açılmaz: [[rutin-calisma-klasoru-silinince-oturum-acmaz]]. Ayrıca: [[zamanlanmis-gorevler-ve-skiller]]. Klasör `.claude` dışına taşındı çünkü orası izin sorar ([[claude-altina-yazma-izin-sorar]]). Rutin çalışmalarına bakmak için: scheduled-tasks `list_task_runs` + ccd_session_mgmt `list_events`; bir çalışmayla konuşmak için `send_message`.

## İlgili
- [[_overview]], [[admin-paneli-ve-loglar]]
