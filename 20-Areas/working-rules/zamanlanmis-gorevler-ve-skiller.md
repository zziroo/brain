---
type: resource
project: diskort
date: 2026-10-15
status: active
tags: [working-rules, zamanlanmis-gorev, skill]
source: /Users/ziroo/.claude/scheduled-tasks/*/SKILL.md (Mac, 2026-10-07); Windows dönemi: C:\Users\yusuf\.claude\scheduled-tasks\*\SKILL.md ve skills\synced
---

# Tek yerel zamanlanmış görev (Diskort gözcü) geri bildirim, hata, sağlık ve kod incelemesini birlikte yapar; senkronize skiller hesap skilleridir

## Zamanlanmış görevler (yerel masaüstü görevleri, bulut rutini değil)
Prompt'lar düzenlenebilir dosyalardır: `~/.claude/scheduled-tasks/<ad>/SKILL.md`. Cloud rutinleri (`/schedule` skill) için cloud environment tanımlı değil (2026-10-15).

### `diskort-geri-bildirim-kontrolu` ("Diskort gözcü", her gece 00:10, tek görev)
**2026-10-15'te birleştirildi:** eski günlük geri bildirim/hata rutini ile hiç kaydedilmemiş gece kod incelemesi tek göreve katıldı. Neden: üçü de salt okunur, aynı saat, aynı proje, aynı gelen kutusu; tek oturum, tek SSH, tek rapor, tek bildirim. Yusuf'un isteği.
Sıra ve bütçe: ucuz adımlar önce, rapor yazılır, kod incelemesi en sonda eklenir.
- **A Geri bildirim:** `feedback-cli list/show`, yalnız `incelendi`ye çeker (planlandi/tamamlandi/reddedildi Yusuf'un).
- **B Panel hataları:** `hata-ozet.js` ile `lastErrorScanAt`'tan beri gruplar; zararsız LiveKit grupları elenir; ölümcül / yerel-çökme / sunucu hatası öne çıkar.
- **C Sunucu sağlığı (yeni):** `docker ps` durumları, kök disk (%80 uyarı, %90 acil), `bash /opt/ziroo-edge/test/smoke.sh live`; **yedek yaşı** (`/var/backups/diskort/latest.db.gz` 26 saatten eskiyse "yedek durmuş", 50+ saat acil; Tussle için `/var/backups/tussle/latest.db.gz` aynı 26/50 saat kuralı; `tussle-backup.timer` 04:20, kuruldu 2026-10-15); **boyutlar** (`client-errors.jsonl` 20 MB+ uyarı, bir dizin önceki rapora göre 2 katına çıkarsa uyarı). Eklendi 2026-10-15, iki komut `ssh vps` ile sorusuz doğrulandı. Ayrıca SSH'sız: Mac yedek aynasının günlüğü (`~/Yedekler/Diskort/yedek-gunlugu.txt`) son satırı HATA ya da 2 günden eskiyse "Mac yedek aynası durmuş" ([[yedekler]]).
- **D Kod incelemesi:** `last-reviewed.txt` SHA'sından origin/main'e; doğrudan commit'ler tam, merge'lerde güvenlik alanları; en çok ~25 dosya okuma; orta+ bulguda tek Sonnet skeptik (≤20 çağrı). Bitince marker güncellenir.
- **E Bildirim:** çalıştırma başına en fazla bir; ACİL (2+ kullanıcıda çökme, 5+ sunucu hatası, güvenlik, konteyner düşük, disk %90+, smoke başarısız, yüksek/kritik inceleme bulgusu) → açık geri bildirimli çökme → günlük özet (`lastDigestDate`).
- Rapor: çalıştırma başına tek dosya `diskort-inbox/YYYY-MM-DD-HHmm-gozcu.md`, dört bölüm; dördü de boşsa dosya yazılmaz.
- SSH yalnız `ssh vps "..."` alias'ıyla, tek başına Bash çağrısında ([[izinler-ve-ayarlar]]). Git yalnız `git -C <repo> fetch|log|diff|show|rev-parse|cat-file`. Dosya yazma yalnız Write/Edit.
- Durum dosyaları: `diskort-inbox/durum.json` (`lastErrorScanAt`, `lastDigestDate`), `diskort-review/last-reviewed.txt`.
- İlk deneme (2026-10-15 12:00, Fable high, ~10 dk): 19 commit/144 dosya tarandı, önemli bulgu yok, sunucu sağlam; `git grep` izni eksikti, diskort `settings.local.json`'a `git -C <repo> grep *` ve `ls-tree *` eklendi. Global `permissions.defaultMode: auto` aynı gün açıldı (yeni oturumlar ve rutinler auto başlar). Rutinin model/eforu uygulamanın rutin ayarından seçilir; Opus medium yeterli olur.
- Eski iki SKILL.md yedeği: `~/.claude/backups/scheduled-tasks-2026-10-15/`.

Gelen kutusu Mac'te `/Users/ziroo/diskort-inbox/` (okunanlar `okundu/`), akış: [[gelen-kutusu-ve-rutinler]]. Eski rapor türleri (`-geri-bildirim`, `-hatalar`, `-kod-inceleme`) 2026-10-15 öncesi dosyalarda kalır.

**Windows:** iki görev de kapalı (2026-10-07'den beri); Windows yalnız Silksong için ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]).

## `skills/synced`
**Windows dönemi bilgisi:** Tek bir senkronizasyon klasörü (hesap kimliği adlı) vardı; içinde Anthropic hesap skilleri: built-in-browser, chrome-browser, computer-use, deep-research, docs, docx, google-workspace, import-memory, morning, pdf, pptx, setup-writing-style, skill-creator, xlsx, bir `manifest.json`. Mac'te `~/.claude/skills/synced` yok (2026-10-07); `~/.claude/skills/` altında kullanıcı skilleri: `kaydet`, `bitir`, `canli`, `pano` (2026-10-17; `basla` kaldırıldı, yerine SessionStart hook'u). Windows'ta kullanıcıya özgü skill burada görünmüyordu (içerikleri tek tek okunmadı, yalnız klasör adlarına bakıldı).

## İlgili
- [[inceleme-kapisi]], [[izinler-ve-ayarlar]], [[_index]]
