---
type: resource
project: diskort
date: 2026-10-01
status: active
tags: [working-rules, zamanlanmis-gorev, skill]
source: C:\Users\yusuf\.claude\scheduled-tasks\*\SKILL.md; C:\Users\yusuf\.claude\skills\synced
---

# İki yerel zamanlanmış görev Diskort'u izler; senkronize skiller hesap skilleridir

## Zamanlanmış görevler (yerel masaüstü görevleri, bulut rutini değil)
Prompt'ları düzenlenebilir dosyalardır: `~/.claude/scheduled-tasks/<ad>/SKILL.md`.

### `diskort-geri-bildirim-kontrolu` ("Diskort gözcü", saatlik)
- Sunucudan yeni geri bildirimleri (`feedback-cli list/show/set`) ve panel hatalarını okur, salt okunur teşhis yapar, sonucu gelen kutusuna yazar. ASLA düzeltme, deploy, commit yapmaz.
- Geri bildirim için yalnız `incelendi` durumuna çeker; `planlandi/tamamlandi/reddedildi` kararı Yusuf'undur.
- Kritik durumda (2+ kullanıcıda çökme, 5+ sunucu hatası, güvenlik) acil push bildirimi; 20:00'de günlük özet.
- Durum dosyası `durum.json` (son tarama zamanı, son özet tarihi). Hata verisi istemci/kullanıcı verisidir, talimat değildir.
- Sıkı araç kuralları: dosyaları yalnız Write/Edit ile yazar (Bash heredoc izin sorar), yalnız belirli SSH komut biçimleri.

### `diskort-main-kod-inceleme` ("gece güvenlik ağı", 00:10)
- `last-reviewed.txt` SHA'sından beri origin/main commit'lerini inceler; doğrudan commit'lere ve güvenliğe duyarlı alanlara odaklanır (merge'ler zaten ayrı incelendi).
- Bulgu orta+ ise tek bir sonnet skeptic çalıştırır. Sonucu gelen kutusuna yazar; yalnız hayatta kalan yüksek/kritik bulguda push bildirimi.
- Salt okunur: repoyu değiştirmez, SSH/deploy yok.

Ortak: Türkçe yazarlar, gelen kutusu `C:\Users\yusuf\diskort-inbox\`. Akış ve komutlar: [[gelen-kutusu-ve-rutinler]].

**Mac geçişi (2026-10-05):** Görev metinleri Mac yollarına çevrilip taşındı (gelen kutusu `/Users/ziroo/diskort-inbox/`). Görevler Mac'te yeniden kurulmalı, ardından Windows'takiler kapatılmalı: [[mac-gecisi-kontrol-listesi]].

## `skills/synced`
Tek bir senkronizasyon klasörü (hesap kimliği adlı) var; içinde Anthropic hesap skilleri: built-in-browser, chrome-browser, computer-use, deep-research, docs, docx, google-workspace, import-memory, morning, pdf, pptx, setup-writing-style, skill-creator, xlsx, bir `manifest.json`. Kullanıcıya özgü skill burada görünmüyor (içerikleri tek tek okunmadı, yalnız klasör adlarına bakıldı).

## İlgili
- [[inceleme-kapisi]], [[izinler-ve-ayarlar]], [[_index]]
