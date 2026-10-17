---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [tussle, vps, docker, compose, env, runbook]
source: oturum 2026-10-17 (mobil-playus), PLAY_SERVICE_ACCOUNT_JSON eklenirken
---

# `/opt/tussle/.env` değişince `docker restart` yetmez, `compose up -d` gerekir

`docker restart tussle` ve `docker compose restart` konteyneri aynı yapılandırmayla yeniden başlatır; `env_file` yeniden okunmaz (yeni satır konteynere girmedi, sunucu "iap off" dedi). Doğrusu, deploy.sh'ın yaptığı gibi:

```bash
ssh vps 'cd /opt/tussle && TUSSLE_TAG=latest TUSSLE_REV=$(git rev-parse --short HEAD) docker compose -f deploy/compose.yml up -d'
```

(`/opt/tussle` kökünde compose dosyası yok; `-f deploy/compose.yml` şart.) Ayrıca `/opt/tussle/data` altına konan dosyalar konteyner kullanıcısı `node` (uid 1000) tarafından okunabilmeli: `chown 1000:1000`, mod 600.
