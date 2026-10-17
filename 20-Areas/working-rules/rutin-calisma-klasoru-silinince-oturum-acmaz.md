---
type: lesson
project: genel
date: 2026-10-10
status: active
tags: [diskort, rutin, zamanlanmis-gorev, mac]
source: Claude Code oturumu 2026-10-10
---

# Zamanlanmış görevin çalışma klasörü yoksa zamanlayıcı "çalıştı" der ama oturum açılmaz

2026-10-05'ten beri iki rutin `lastRunAt` güncelliyordu ama `list_task_runs` tek çalışma gösteriyordu. Neden: görevlerin `cwd`'si Mac'e taşınırken kullanılan, sonra silinen `~/Downloads/mac-tasima` idi. Talimat dosyalarındaki yollar doğruydu.

- Çalışma klasörü masaüstü uygulamasının `~/Library/Application Support/Claude/claude-code-sessions/.../scheduled-tasks.json` dosyasında (`cwd`); scheduled-tasks araçları bu alanı değiştiremez, kullanıcı uygulamadaki rutin ayarlarından değiştirir.
- Teşhis: `list_scheduled_tasks` (lastRunAt) ile `list_task_runs` (gerçek oturumlar) karşılaştır, sonra `cwd`'nin var olup olmadığına bak.
