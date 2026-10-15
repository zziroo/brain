---
type: decision
project: diskort
date: 2026-10-15
status: active
tags: [diskort, rutin, otomasyon, code-review, yedek]
source: Claude Code oturumu 2026-10-15 "ZZ: yeni oturum yapısı ve SSH izinleri"
---

# Karar: Tek gece gözcüsü dört bölüm çalıştırır: geri bildirim, panel hataları, sunucu sağlığı, main kod incelemesi

## Bağlam
Masaüstü uygulaması güncellenince zamanlanmış görevler ve şablonlar yeniden ele alındı. Kayıtlı tek görev günlük geri bildirim/hata rutiniydi; gece kod incelemesi 2026-10-10'da kaldırılmış, SKILL.md'si duruyordu ([[2026-10-10-gozcu-gunluk-gece-incelemesi-kaldirildi]]). Yusuf "hem hatalara, hem geri bildirimlere baksın, hem code review yapsın, birleştirsek uygun olur mu" diye sordu.

## Karar
- Tek görev `diskort-geri-bildirim-kontrolu` ("Diskort gözcü"), her gece 00:10, sıra: A geri bildirim → B panel hataları → C sunucu sağlığı → rapor yazılır → D kod incelemesi eklenir → E bildirim.
- C sunucu sağlığı yeni: konteyner durumları, kök disk (%80 uyarı, %90 acil), ziroo-edge smoke testi, yedek yaşı (Diskort ve Tussle `latest.db.gz` 26 saat, 50 saatte acil), veri/log boyutları (`client-errors.jsonl` 20 MB+), Mac yedek aynası günlüğü (2 gün).
- D kod incelemesi: `last-reviewed.txt` SHA'sından origin/main'e; doğrudan commit'ler tam, merge'lerde güvenlik alanları; en çok ~25 dosya okuma; orta+ bulguda tek Sonnet skeptik.
- Tek rapor dosyası `diskort-inbox/YYYY-MM-DD-HHmm-gozcu.md`, dört bölüm; dördü de boşsa dosya yok. Çalıştırma başına en fazla bir bildirim (ACİL → açık geri bildirimli çökme → günlük özet).
- Sunucuya yalnız `ssh vps "..."` alias'ıyla, ssh çağrısı tek başına; git yalnız `git -C <repo> fetch|log|diff|show|rev-parse|cat-file|grep|ls-tree`.
- Ayrı kod inceleme SKILL.md'si kaldırıldı (yedek `~/.claude/backups/scheduled-tasks-2026-10-15/`).

## Neden
- Üç iş de salt okunur, aynı saat, aynı proje, aynı gelen kutusu: tek oturum, tek SSH, tek rapor, tek bildirim kuralı.
- Ucuz adımlar önce gelince inceleme uzasa bile diğer bulgular diskte olur.
- Sağlık adımı var olan SSH oturumuna 5 komut ekliyor; ayrı "system health" görevi gereksiz.

## Reddedilen alternatifler
- Uygulamanın şablonları (PR review digest, release notes, issue triage, flaky test): üç projede PR akışı yok, doğrudan main'e commit.
- Ayrı Tussle gözcüsü: Tussle'da istemci hata toplama ve geri bildirim kanalı yok; önce o özellikler, sonra gözcüye beşinci bölüm ([[10-Projects/tussle/_overview|Tussle]]).
- Gün içi kesinti için Claude rutini: token harcar ve yine aralıklı bakar; doğru araç dış ping servisi (healthchecks.io / UptimeRobot), henüz açılmadı.
- Uygulamanın SSH bağlantısıyla VPS'te oturum: root ile production'da oturum, güvenlik sınırı Yusuf'un; alias yetti.

## Sonuçlar / riskler
- İlk deneme 2026-10-15 12:00: 19 commit / 144 dosya tarandı, önemli bulgu yok, sunucu sağlam, ~10 dk, Fable high. Rutinin modeli uygulamanın rutin ayarından düşürülebilir (Opus medium yeter); henüz yapılmadı.
- `git grep` izni eksikti, iki kez sordu; diskort `settings.local.json`'a `git -C <repo> grep *` ve `ls-tree *` eklendi.
- Global `permissions.defaultMode: auto` açıldı; rutinler ve yeni oturumlar auto başlar ([[20-Areas/working-rules/izinler-ve-ayarlar|izinler-ve-ayarlar]]).

## İlgili
- Önceki: [[2026-10-10-gozcu-gunluk-gece-incelemesi-kaldirildi]] (superseded), [[gozcu-ve-gece-inceleme-rutinleri]]
- [[20-Areas/working-rules/zamanlanmis-gorevler-ve-skiller|zamanlanmis-gorevler-ve-skiller]], [[gelen-kutusu-ve-rutinler]], [[yedekler]]
