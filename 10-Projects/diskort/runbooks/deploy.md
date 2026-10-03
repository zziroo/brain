---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, deploy]
source: memory diskort-workflow.md, diskort-server.md
---

# Sunucu deploy: yedek al, git pull --ff-only, yalnız api'yi yeniden kur, kontrol et

1. Şema değişiyorsa önce `bash infra/backup-db.sh`.
2. `cd /opt/diskort && git pull --ff-only`
3. `cd infra && docker compose up -d --no-deps --build api` (hepsi için `docker compose up -d --build`).
4. `PRAGMA user_version` / bütünlük kontrolü (`docker compose exec -T api node -e ...`) ve loglarda hata sayısı.
5. `apps/web` yalnız git pull ister.
- `infra/caddy/diskort.caddy` değiştiyse: `git pull` + `bash /opt/ziroo-edge/reload.sh` (kesintisiz). Üretimde asla `docker compose ... caddy` yok ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]).
- Client gerektiren sunucu değişikliğinde: sunucuyu ÖNCE deploy et, sonra client'ı yayınla.
- Komut biçimi: `ssh -i ~/.ssh/diskort_vps root@38.60.208.88 'cd /opt/diskort/infra && ...'`.
- Yönetici kuralı: sunucu-only düzeltmeler release beklemeden deploy edilebilir ([[surum-cikarma-kurali]]).

## İlgili
- [[sunucu-vps]], [[surum-cikarma]]
