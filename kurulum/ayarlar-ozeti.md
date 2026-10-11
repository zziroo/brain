---
type: resource
project: genel
date: 2026-10-12
status: active
tags: [claude, kurulum, ayarlar]
source: ~/.claude/settings.json, ~/ZZ/.claude/settings.local.json, diskort/.claude/settings.local.json
---

# Claude Code ayarları (özet)

Ham ayar dosyaları pakete konmadı. Burada yalnızca yapıları ve sistem açısından anlamlı izin kuralları var; tek seferlik izin satırları atlandı, sunucu IP'si `<VPS_IP>` ile maskelendi.

## Global: `~/.claude/settings.json`
- `cleanupPeriodDays: 3650`: transkriptler ~10 yıl saklanır (pano/rapor araçları bunları okur).
- `autoUpdatesChannel: latest`, `agentPushNotifEnabled: true`.
- İzinler: `ssh -i ~/.ssh/diskort_vps *` ve `scp -i ~/.ssh/diskort_vps *` (yalnızca Diskort sunucusu anahtarı).
- Global hook yok. Davranış kuralları `global/global-claude-md.md` içinde, hook tabanlı tek eklenti `mod-orkestra/`.

## Kök çalışma alanı: `~/ZZ/.claude/settings.local.json`
- 7 izin; çoğu tek seferlik (görsel kırpma, arşiv listesi). Kalıcı anlamı olanlar: Chrome uygulama klasörünü ve `~/Library/Caches` okuma, `python3 -` (stdin'den betik).

## Diskort projesi: `diskort/.claude/settings.local.json` (24 izin)
- **SSH:** `ssh ... root@<VPS_IP> *` üç varyant. Salt okunur zamanlanmış rutinler (gözcü) bunu kullanır.
- **Git:** `git branch *`, `git push *`, `git -C <diskort> fetch/log/diff/show/rev-parse/cat-file *` (inceleme ajanlarının salt okunur diff erişimi).
- **GitHub:** `gh release *`, `gh run *` (yayın ve CI takibi).
- **Dosya:** `~/diskort-inbox/**` ve `~/diskort-review/**` için Read/Write/Edit (geri bildirim ve gece inceleme rutinlerinin çıktı klasörleri).
- `mcp__scheduled-tasks__list_scheduled_tasks`.

Bağlantılı vault notları: `20-Areas/working-rules/izinler-ve-ayarlar.md`, `10-Projects/diskort/decisions/ssh-izni-yalnizca-diskort-sunucusu.md`.
