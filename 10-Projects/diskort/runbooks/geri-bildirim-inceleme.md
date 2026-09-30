---
type: resource
project: diskort
date: 2026-09-27
status: active
tags: [diskort, runbook, geri-bildirim]
source: memory diskort-feedback-workflow.md
---

# "Geri bildirimleri incele" denince sunucudan okunur, Yusuf'la göreve dönüştürülür

0.5.1'den (2026-09-27) beri arkadaşlar uygulama içinden geri bildirim gönderir (Hata/Öneri/Diğer + en çok 3 ekran görüntüsü, yalnız girişli). Web: https://diskort.ziroo.net/admin içinde geri bildirim sekmesi de var.

CLI (`/opt/diskort/infra` içinden, `ssh -i ~/.ssh/diskort_vps root@185.92.0.242`):
- `docker compose exec api node dist/feedback-cli.js list --status yeni [--type hata] [--json]`
- `... show <id> [--json]` (ekran görüntüleri `/data/feedback/<id>.webp`, `docker compose cp api:<yol> .`)
- `... set <id> <yeni|incelendi|planlandi|tamamlandi|reddedildi> [not]`, `note <id> "<not>"`, `stats`

**Nasıl uygulanır:** yeni kayıtları özetle, yapılacakları öner; anlaşınca `incelendi`/`planlandi`; yayınlanınca not ile `tamamlandi` (gönderen durumu ve notu canlı görür). CLI değişiklikleri gateway olayı yaymaz. Saatlik gözcü yalnız `incelendi` işaretler ([[zamanlanmis-gorevler-ve-skiller]]).

## Neden
Yusuf neyin göreve dönüşeceğine kendisi karar vermek istedi.

## İlgili
- [[admin-paneli-ve-loglar]], [[gelen-kutusu-ve-rutinler]]
