---
type: lesson
project: song-finder
date: 2026-10-04
status: active
tags: [song-finder, ders, guvenlik, claude-cli, prompt-injection]
source: oturum 2026-10-04 (song-finder), deneme dosyasıyla doğrulandı (CLI 2.1.284)
---

# Başsız `claude -p`, stdin'deki `@dosya/yolu` anmalarını araçlar kapalıyken bile dosya içeriğiyle doldurur

`--restricted --tools ""` ile bile, prompt metnindeki `@<mutlak yol>` dosyanın içeriğini modele ekler. Prompt'a güvenilmeyen metin (web sayfası, katalog başlığı, başka modelin çıktısı) giriyorsa, biri `@/proc/self/environ` yazarak süreç ortamındaki token'ı model bağlamına çekebilir; WebFetch'i olan bir işçi bunu dışarı sızdırabilir.

**Çözüm:** CLI'ye giden tüm metinde `@` karakterini tam genişlikli `＠` (U+FF20) ile değiştir (`song-finder/app/lib/claude.js`, `noMentions`). Düzeltme sonrası aynı denemede içerik gelmedi.

**Ayrıca:** `--restricted` + `--system-prompt` ile kullanıcı `CLAUDE.md`'si yüklenmiyor, ama işçi bağlamında hesap e-postası ve ortam bilgisi duruyor.

Bağlantı: [[10-Projects/song-finder/_overview|Song Finder]]
