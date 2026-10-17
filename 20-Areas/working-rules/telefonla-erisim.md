---
type: resource
project: genel
date: 2026-10-07
status: active
tags: [diskort, runbook, claude-code, telefon, mac]
source: memory diskort-workflow.md; Mac'te komutlarla incelendi 2026-10-07
---

# Telefondan Mac'teki Claude oturumuna erişim: `claude rc`

**Mac (2026-10-07):** `claude` komutu PATH'te yok (`which claude` boş; `~/.local/bin` ve `~/.claude/local` yok, `/opt/homebrew/bin` altında da yok). Masaüstü uygulaması (`/Applications/Claude.app`) kendi Claude Code ikilisini sürüm klasörüne indiriyor: `~/Library/Application Support/Claude/claude-code/<sürüm>/<hash>/claude.app/Contents/MacOS/claude` (bu tarihte sürümler 2.1.286 ve 2.1.288; sürüm yükselince yol değişir). Ayrı terminalde `claude rc` çalıştırmak için CLI'nin ayrıca kurulup PATH'e eklenmesi gerekir; Mac'te bu yapılıp `claude rc` denenmedi (doğrulanmadı).

Akış (Windows'ta çalıştığı gibi): ayrı bir terminal penceresinde `/Users/ziroo/ZZ/zProjects/diskort` klasöründe `claude rc` (spawn modu same-dir); telefonda Code -> Devices Mac'i gösterir ve orada yeni oturum başlatabilir. Mac'in uyanık kalması gerekir. Aynı anda main üzerinde iki koordinatör oturumu çalıştırma.

**Windows dönemi:** CLI `C:\Users\yusuf\.local\bin\claude.exe` idi (PATH'e Yusuf kendi ekliyordu), terminal Windows Terminal'di: [[ortam-tuzaklari-windows]].

## İlgili
- [[10-Projects/diskort/_overview|diskort overview]]
