---
type: resource
project: genel
date: 2026-10-07
status: active
tags: [working-rules, izin, ayar]
source: /Users/ziroo/.claude/settings.json; /Users/ziroo/ZZ/zProjects/diskort/.claude/settings.local.json (Mac, 2026-10-07 okundu); Windows dönemi: C:\Users\yusuf\.claude\settings.json ve diskort\.claude\settings.local.json (2026-10-01)
---

# Global ayar neredeyse boştur; Diskort'un izinleri ssh, git, gh ve gelen kutusu yolları etrafında toplanır

Komut desenleri gruplanmış özettir; literal komutlar, SSH satırları ve hash'ler bilerek kopyalanmadı.

## `~/.claude/settings.json` (global)
**2026-10-15 güncellemesi:** `~/.ssh/config`'e `vps` alias'ı eklendi (anahtar, root, ConnectTimeout, ServerAliveInterval orada). Global izne üç kural daha: `Bash(ssh vps *)`, `Bash(scp * vps:*)`, `Bash(scp vps:* *)`. Kural: sunucuya her zaman `ssh vps '...'`, bayrak ve IP yazılmaz; ssh/scp çağrısı yerel komutlarla zincirlenmez (bileşik komutta her parça bir kurala uymalı, yoksa sınıflandırıcı engeller). Neden: son 10 günde 101 oturumda SSH geçti, en sık biçim `ssh -o ConnectTimeout=15 -i ...` olduğu için önek kuralı tutmuyor, `find … ; ssh …` gibi zincirler de reddediliyordu. Aynı turda `ssh vps 'hostname'` izin sorusu çıkmadan çalıştı. Eski `-i` kuralları geriye uyumluluk için duruyor.

`autoUpdatesChannel: latest` ve iki izin kuralı: `Bash(ssh -i ~/.ssh/diskort_vps *)` ve `Bash(scp -i ~/.ssh/diskort_vps *)` (scp kuralı 2026-10-05'te Yusuf'un onayıyla eklendi: sunucuya dosya kopyalama auto-mode'da engellenmişti). Kurallar önek eşleşir: `-i` anahtardan hemen sonra gelmeli (`scp -q -i ...` eşleşmez, `scp -i ~/.ssh/diskort_vps -q ...` eşleşir). Global olduğu için alt ajanlar da yararlanır; ajan brifinglerinde SSH/yayın yasağını açık yaz ([[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]]).

## `diskort/.claude/settings.local.json` (yalnız `permissions.allow`)
**Mac'te (2026-10-07) 22 kural**; Windows'ta 51 kuraldı (Windows dönemi). Yol kuralları 2026-10-07'de Mac'e çevrildi.
| Grup | Ne izinli |
|---|---|
| Production SSH | `ssh -i ~/.ssh/diskort_vps root@<vps> ...` biçimleri (isteğe bağlı `-o` bayraklarıyla). Auto-mode sınıflandırıcısı, bu kurallara uymayan production SSH'i engeller. |
| Git (okuma) | `git -C <diskort> fetch/log/diff/show/rev-parse/cat-file` (yalnız Bash; PowerShell kuralları Mac'te yok) |
| Git (yazma) | `git branch *`, `git push *` |
| GitHub CLI | `gh release *`, `gh release view/download`, `gh run *` |
| MCP | `mcp__scheduled-tasks__list_scheduled_tasks` |
| Dosya yolları | `Read/Write/Edit` için gelen kutusu `//Users/ziroo/diskort-inbox/**` ve inceleme işaretçisi `//Users/ziroo/diskort-review/**`; `git -C /Users/ziroo/ZZ/zProjects/diskort ...` okuma kuralları |

Windows dönemi satırları (artık Mac dosyasında yok): `curl` (iOS manifest, IPA indirme), `unzip`, PowerShell biçimli git okuma kuralları, `Read` için eski `~/.claude/diskort-review/` yolu.

## Notlar
- Gelen kutusu `.claude` dışına taşındı çünkü `.claude` altına yazmak her seferinde izin sorar ve gözetimsiz çalışmaları durdurur ([[claude-altina-yazma-izin-sorar]]).
- **Mac yolları (2026-10-07):** `git -C C:/Users/yusuf/...` ve `//c/Users/yusuf/diskort-inbox|review/**` kuralları Yusuf'un onayıyla `/Users/ziroo/...` yollarına çevrildi.
- Windows dönemi kalıntısı: eski `~/.claude/diskort-review/` yolu Mac'te yok (`~/.claude/` altında `diskort-review` klasörü bulunmuyor).
- Tek seferlik `docker compose exec -T api node - <sayı>` kalıntı kuralı 2026-10-07'de silindi.
- Global dosya Mac'te Windows ile aynı (`autoUpdatesChannel: latest` + iki ssh/scp kuralı), karşılaştırıldı. **2026-10-07'den beri fark var:** Windows'ta `"cleanupPeriodDays": 3650` eklendi (kayıtlar 30 yerine 10 yıl tutulur), Mac'te henüz yok ([[2026-10-07-windows-makinesi-yalniz-silksong-icin]]).
- Zamanlanmış görevler bu izinlere göre yazıldı: [[zamanlanmis-gorevler-ve-skiller]].

## İlgili
- [[_index]], [[sunucu-vps]]
