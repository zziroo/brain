---
type: decision
project: diskort
date: 2026-10-10
status: active
tags: [diskort, rutin, otomasyon, code-review]
source: Claude Code oturumu 2026-10-10
---

# Karar: Yalnız gözcü (geri bildirim + hata) rutini kalır, günde bir kez 00:10'da; gece kod incelemesi rutini kaldırıldı

## Bağlam
Rutinler 2026-10-05'ten beri oturum açmıyordu ([[rutin-calisma-klasoru-silinince-oturum-acmaz]]). Yusuf gözcüyü zaten günde bire indirmişti; birçok projesi olduğu için kod incelemesini ileride tüm projeler için ortak bir düzenekle çözmek istiyor.

## Karar
- `diskort-main-kod-inceleme` silindi (talimatı `~/.claude/scheduled-tasks/diskort-main-kod-inceleme/SKILL.md` içinde duruyor).
- Gözcü ("diskort feedback rutin") `10 0 * * *`; talimat "günde bir" olarak düzeltildi, 20:00 özet penceresi kaldırıldı: bir şey yazdıysa tek bildirim, yoksa sessiz.
- Çalışma klasörü `/Users/ziroo/ZZ/zProjects/diskort`.

## Neden
Günde bir tarama yeterli; 20:00 penceresi 00:10 çalışmasıyla hiç tetiklenmezdi. Kod incelemesi proje başına rutin yerine ortak mekanizma.

## Reddedilen alternatifler
- Gözcüyü saatliğe döndürmek: Yusuf günlüğü bilerek seçti.
- Gece incelemesini Diskort'a özel tutmak: çok proje var, ortak çözüm tercih edildi.

## İlgili
- Önceki: [[gozcu-ve-gece-inceleme-rutinleri]] (superseded), [[gelen-kutusu-ve-rutinler]]
