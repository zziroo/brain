---
name: diskort-server
description: "Production VPS for Diskort — IP, SSH key, domains, deploy/restart pitfalls, backups"
metadata:
  node_type: memory
  type: reference
  originSessionId: 0f563e3b-738e-42b9-899e-9826e3671029
  modified: 2026-10-03T01:47:12.568Z
---

Deeper runbook: vault `runbooks\sunucu-vps.md`, `runbooks\yedekler.md`, `lessons\caddy-bind-mount-restart.md`. Deploy/release steps: see [[diskort-workflow]]. Verify live state first; this file can be stale.

- **VPS (since 2026-10-01):** LightNode Istanbul II (KVM, 2 vCPU, 4 GB, Ubuntu 24.04, pay-by-traffic 1000 GB/month — raise if needed), IP `<VPS_IP>`. Two NICs: eth1 public, eth0 private. Moved from the isimkayit server (old IP 185.92.0.242) because it dropped inbound UDP above ~1400 pps (vault `decisions/sunucu-lightnode-istanbula-tasindi.md`). Old server: stopped, user deletes it.
- **SSH:** `ssh -i ~/.ssh/diskort_vps root@<VPS_IP>` (ed25519, used by all tooling; a second RSA key `diskort_lightnode` exists for the provider panel only). Never print key contents. Not yet re-applied on the new server: SSH hardening file (`/etc/ssh/sshd_config.d/00-diskort-hardening.conf`: no password login, root key-only) and unattended-upgrades auto-reboot (`52diskort-auto-reboot`). The provider panel has a web console as a recovery path. Safe-change pattern: systemd-run 5 min auto-rollback timer, test a new key session, then stop the timer.
- **Edge (since 2026-10-03):** 80/443 belong to the separate `ziroo-edge` project (`/opt/ziroo-edge`, container `ziroo-edge`, GitHub `zziroo/ziroo-edge` private, local `zProjects\ziroo-edge`, deployed by scp). It imports Diskort sites from `/opt/diskort/infra/caddy/diskort.caddy`, path snippets from `/opt/ziroo-sites/*.caddy` and other-domain sites from `/opt/ziroo-sites/hosts/*.caddy`. Apply any change with `bash /opt/ziroo-edge/reload.sh` (HTTP no downtime; open WebSockets survive 5 min via `stream_close_delay` since 2026-10-04, still prefer an empty voice channel). Diskort's compose `caddy` service is profile-gated and must NEVER be started on production: SO_REUSEPORT means it would silently share 443.
- **Stack:** repo at `/opt/diskort`, compose in `/opt/diskort/infra` (livekit, api; caddy only via profile, off in prod; host network; ufw open 22,80,443,7881/tcp,3478/udp,50000-60000/udp). Secrets in `/opt/diskort/infra/.env` (chmod 600) — never print.
- **Domains** (Cloudflare, ziroo.net, DNS only / grey cloud): `diskort.ziroo.net` → API/gateway/download page, `lk.ziroo.net` → LiveKit, `turn.ziroo.net` → TURN/TLS (443 via caddy-l4, SNI routed). Let's Encrypt via Caddy.
- **Restart pitfalls:** recreating `ziroo-edge` (compose/Dockerfile change) drops HTTPS, LiveKit signaling and TURN/TLS for a few seconds. Check first that no one is in voice (`curl -s 127.0.0.1:6789/metrics | grep livekit_participant_total`). Restarting livekit drops active calls (~6 s, clients reconnect). Back up the DB (`bash infra/backup-db.sh`) before schema migrations. SSH refuses connections ~90 s while openssh upgrades.
- **Backups:** `diskort-backup.timer` 04:00 Istanbul → `/var/backups/diskort/` (14 days; attachments/avatars hard-link snapshots, 30 days). Restore: `bash infra/restore-db.sh <file>`. PC task "Diskort veritabanı yedeği" daily 12:00 runs `scripts/pull-db-backups.ps1` → `OneDrive\Yedekler\Diskort`. Activity icons (`/data/activity-icons`) are not backed up (clients re-upload).
- **Misc:** UDP buffers in `/etc/sysctl.d/60-diskort-udp.conf`; DB inside the api container at `/data/diskort.db` (read via `docker compose exec -T api node -e ...` + node:sqlite); clients fetch updates from `https://diskort.ziroo.net/updates/*`; publishing a release = mandatory client update (`CLIENT_UPDATE_ENFORCE=0` in `.env` disables it in emergencies). Current DB schema: see the vault overview.

Related: [[diskort-project]], [[diskort-dev-environment]], [[diskort-workflow]]
