---
type: resource
project: diskort
date: 2026-10-07
status: active
tags: [working-rules, zamanlanmis-gorev, skill]
source: /Users/ziroo/.claude/scheduled-tasks/*/SKILL.md (Mac, 2026-10-07); Windows dönemi: C:\Users\yusuf\.claude\scheduled-tasks\*\SKILL.md ve skills\synced
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

Ortak: Türkçe yazarlar, gelen kutusu Mac'te `/Users/ziroo/diskort-inbox/` (var, eski raporlar içinde; inceleme işaretçisi `/Users/ziroo/diskort-review/`). Windows dönemi: `C:\Users\yusuf\diskort-inbox\`. Akış ve komutlar: [[gelen-kutusu-ve-rutinler]].

**Mac durumu (2026-10-07):** Görev metinleri (`SKILL.md`) Mac yollarına çevrilip `/Users/ziroo/.claude/scheduled-tasks/diskort-geri-bildirim-kontrolu/` ve `diskort-main-kod-inceleme/` altında duruyor (içlerinde `/Users/ziroo/diskort-inbox/` yolu doğrulandı). **Zamanlanmış görevler Mac'te bilerek henüz kurulmadı** (Yusuf ertelemeye karar verdi); SKILL.md dosyaları duruyor; zamanlayıcıya kayıt yapılmadı (Yusuf'un kararı; zamanlayıcıdaki durum ayrıca listelenmedi). Kurulum ve Windows'takileri kapatma sırası: [[mac-gecisi-kontrol-listesi]].

**Windows durumu (2026-10-07):** iki görev de kapalı (`enabled: false`; gözcünün son çalışması 2026-10-06, gece incelemesininki 2026-10-05). Eski çalıştırma oturumları arşivlendi. Windows artık yalnız Silksong için: [[2026-10-07-windows-makinesi-yalniz-silksong-icin]].

## `skills/synced`
**Windows dönemi bilgisi:** Tek bir senkronizasyon klasörü (hesap kimliği adlı) vardı; içinde Anthropic hesap skilleri: built-in-browser, chrome-browser, computer-use, deep-research, docs, docx, google-workspace, import-memory, morning, pdf, pptx, setup-writing-style, skill-creator, xlsx, bir `manifest.json`. Mac'te `~/.claude/skills/synced` yok (2026-10-07); `~/.claude/skills/` altında kullanıcı skilleri `basla` ve `kaydet` var. Windows'ta kullanıcıya özgü skill burada görünmüyordu (içerikleri tek tek okunmadı, yalnız klasör adlarına bakıldı).

## İlgili
- [[inceleme-kapisi]], [[izinler-ve-ayarlar]], [[_index]]
