---
type: lesson
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, ders, claude-cli]
source: oturum 2026-10-05, canlı konteynerde CLI 2.1.284 denemeleri
---

# Claude CLI 2.1.284: `--max-turns` yardımda yok ama kabul ediliyor; bayrak denemesi `--version` ile yapılamaz

- `claude --help` çıktısında `--max-turns` görünmüyor, ama `-p` ile tek turluk gerçek çağrıda hatasız çalıştı.
- `claude --bogus --version` hata vermez: `--version` bayrakları ayrıştırmadan önce çıkar. Bayrak geçerliliğini `-p` ile dene; bilinmeyen bayrak `error: unknown option` verir ve token harcamaz.
- Başsız `claude -p` abonelik token'ıyla `WebSearch`/`WebFetch` kullanabiliyor (Haiku ile doğrulandı; `server_tool_use` sayaçları 0 gösterdi).
- `@yol` stdin genişletmesi bu projede de doğrulandı: [[10-Projects/song-finder/lessons/2026-10-04-bassiz-claude-at-dosya-anmalarini-acar]].

Bağlantı: [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
