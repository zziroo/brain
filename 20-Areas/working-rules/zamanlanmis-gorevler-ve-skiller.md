---
type: resource
project: altyapi
date: 2026-10-18
status: active
tags: [working-rules, zamanlanmis-gorev, skill]
source: /Users/ziroo/.claude/scheduled-tasks/*/SKILL.md (Mac, 2026-10-07); Windows dönemi: C:\Users\yusuf\.claude\scheduled-tasks\*\SKILL.md ve skills\synced
---

# Tek yerel zamanlanmış görev (Gece gözcüsü) bütün sistemleri tarar; senkronize skiller hesap skilleridir

## Zamanlanmış görevler (yerel masaüstü görevleri, bulut rutini değil)
Prompt'lar düzenlenebilir dosyalardır: `~/.claude/scheduled-tasks/<ad>/SKILL.md`. Cloud rutinleri (`/schedule` skill) için cloud environment tanımlı değil (2026-10-15).

### `gece-gozcusu` ("Gece gözcüsü", her gece 00:10, çalışma klasörü `~/ZZ`) — 2026-10-18'den beri tek görev
Karar ve ayrıntı: [[2026-10-18-global-gece-gozcusu]]. Kısaca:
- Sıra: 1 Diskort (geri bildirim → `incelendi`, panel hataları `hata-ozet.js` ile) → 2 Tussle (`feedback-cli.mjs list --all` ve `errors --tail 300`; **ack yok**) → 3 kripto-bot (`kbot report --mode testnet` + launchctl) → 4 Mac yedekleri (Diskort aynası, sunucu yedeği, iCloud kopyası) → rapor diske → 5 kod incelemesi (tussle, diskort, ziroo-edge, kripto-bot, Işık Bekçisi; toplam ~40 okuma) → 6 tek Sonnet skeptik (orta+ bulguda), özet, en fazla bir bildirim.
- Makine sağlığı (konteyner, site, disk, sunucu yedek yaşı, smoke) Uptime Kuma'da, gözcüde değil ([[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]]).
- Gelen kutusu `~/ZZ/gozcu/`: rapor `YYYY-MM-DD-HHmm-gozcu.md` (her gece yazılır), `durum.json`, `inceleme/<repo>.txt`, `araclar/hata-ozet.js`, okunanlar `okundu/`; açıklama `~/ZZ/gozcu/BENIOKU.md`. Akış: [[gelen-kutusu-ve-rutinler]].
- İzinler `~/ZZ/.claude/settings.local.json`'da (5 repo için izinli git alt komutları, kbot report, launchctl print, gozcu yolları); SSH yalnız `ssh vps "..."`, tek başına Bash çağrısında ([[izinler-ve-ayarlar]]). Dosya yazma yalnız Write/Edit.
- Görev kaydedilirken izin modu taşınmadı; genel `defaultMode: auto` geçerli. Model/efor uygulamanın rutin ayarından.

### Durdurulanlar (2026-10-18, silinmedi; yedek `~/Yedekler/eski-gorev-tanimlari/`)
- `diskort-geri-bildirim-kontrolu` ("Diskort gözcü"): 2026-10-15'te dört bölümlü tek göreve birleşmişti ([[2026-10-15-gozcu-birlesik-dort-bolum]]); bütün adımları global gözcüde aynen sürüyor. İlk deneme notu: `git grep` izni eksikti; global `permissions.defaultMode: auto` 2026-10-15'te açıldı.
- `kripto-bot-gunluk-rapor` (her sabah 09:00): global gözcünün kripto-bot bölümü oldu (Yusuf'un seçimi).
- Daha eski yedekler: `~/.claude/backups/scheduled-tasks-2026-10-15/`. 2026-10-15 öncesi rapor türleri (`-geri-bildirim`, `-hatalar`, `-kod-inceleme`) `~/ZZ/gozcu/okundu/` içinde.

**Windows:** iki görev de kapalı (2026-10-07'den beri); Windows yalnız Silksong için ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]).

## `skills/synced`
**Windows dönemi bilgisi:** Tek bir senkronizasyon klasörü (hesap kimliği adlı) vardı; içinde Anthropic hesap skilleri: built-in-browser, chrome-browser, computer-use, deep-research, docs, docx, google-workspace, import-memory, morning, pdf, pptx, setup-writing-style, skill-creator, xlsx, bir `manifest.json`. Mac'te `~/.claude/skills/synced` yok (2026-10-07); `~/.claude/skills/` altında kullanıcı skilleri: `kaydet`, `bitir`, `canli`, `pano` (2026-10-17; `basla` kaldırıldı, yerine SessionStart hook'u). Windows'ta kullanıcıya özgü skill burada görünmüyordu (içerikleri tek tek okunmadı, yalnız klasör adlarına bakıldı).

## İlgili
- [[inceleme-kapisi]], [[izinler-ve-ayarlar]], [[_index]]
