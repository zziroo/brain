---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, log, admin]
source: memory diskort-workflow.md
---

# Admin paneli ve sunucu logları

- **Panel:** https://diskort.ziroo.net/admin (geri bildirim, güvenlik, ses kalitesi + "İzlenen yayın" grafikleri, altyapı, API sağlığı, sunucular, iPhone cihazları).
- **Loglar (api konteynerinde):** `/data/client-errors.jsonl` (zararsız gürültü `apps/server/src/routes/clientErrors.ts` içinde süzülür), `/data/server-errors.jsonl`, `/data/telemetry/*.jsonl` (+ `incidents.jsonl`), `auth-log.jsonl`.
- **Okuma:** `ssh -i ~/.ssh/diskort_vps root@38.60.208.88 'cd /opt/diskort/infra && docker compose exec -T api ...'`. scp yok; indirmek için `ssh ... cat dosya > yerel`. Gruplanmış hata özeti: `docker compose exec -T api node - <sinceMs>` komutuna `C:/Users/yusuf/diskort-inbox/hata-ozet.js` verilir.
- Telefon ısınma incelemesi örneği: `grep '"watch":{' /data/telemetry/<tarih>.jsonl`.

## İlgili
- [[gelen-kutusu-ve-rutinler]], [[geri-bildirim-inceleme]]
