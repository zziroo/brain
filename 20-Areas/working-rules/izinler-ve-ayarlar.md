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
`autoUpdatesChannel: latest` ve iki izin kuralı: `Bash(ssh -i ~/.ssh/diskort_vps *)` ve `Bash(scp -i ~/.ssh/diskort_vps *)` (scp kuralı 2026-10-05'te Yusuf'un onayıyla eklendi: sunucuya dosya kopyalama auto-mode'da engellenmişti). Kurallar önek eşleşir: `-i` anahtardan hemen sonra gelmeli (`scp -q -i ...` eşleşmez, `scp -i ~/.ssh/diskort_vps -q ...` eşleşir). Global olduğu için alt ajanlar da yararlanır; ajan brifinglerinde SSH/yayın yasağını açık yaz ([[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]]).

## `diskort/.claude/settings.local.json` (yalnız `permissions.allow`)
**Mac'te (2026-10-07) 23 kural**; Windows'ta 51 kuraldı (Windows dönemi). Mac dosyası Windows'tan taşınmış ve temizlenmiş görünüyor, ama yol kuralları henüz Mac'e çevrilmedi (aşağıdaki Notlar).
| Grup | Ne izinli |
|---|---|
| Production SSH | `ssh -i ~/.ssh/diskort_vps root@<vps> ...` biçimleri (isteğe bağlı `-o` bayraklarıyla) ve tek seferlik bir `docker compose exec` komutu. Auto-mode sınıflandırıcısı, bu kurallara uymayan production SSH'i engeller. |
| Git (okuma) | `git -C <diskort> fetch/log/diff/show/rev-parse/cat-file` (yalnız Bash; PowerShell kuralları Mac'te yok) |
| Git (yazma) | `git branch *`, `git push *` |
| GitHub CLI | `gh release *`, `gh release view/download`, `gh run *` |
| MCP | `mcp__scheduled-tasks__list_scheduled_tasks` |
| Dosya yolları | `Read/Write/Edit` için gelen kutusu ve inceleme işaretçisi klasörleri (Windows biçiminde yazılı, bkz. Notlar) |

Windows dönemi satırları (artık Mac dosyasında yok): `curl` (iOS manifest, IPA indirme), `unzip`, PowerShell biçimli git okuma kuralları, `Read` için eski `~/.claude/diskort-review/` yolu.

## Notlar
- Gelen kutusu `.claude` dışına taşındı çünkü `.claude` altına yazmak her seferinde izin sorar ve gözetimsiz çalışmaları durdurur ([[claude-altina-yazma-izin-sorar]]).
- **Mac'te yol kuralları bayat (2026-10-07):** `git -C C:/Users/yusuf/ZZ/zProjects/diskort ...` kuralları ve `Read/Write/Edit(//c/Users/yusuf/diskort-inbox/**)` ile `.../diskort-review/**` kuralları Windows yollarına işaret ediyor. Mac'te gerçek yollar `/Users/ziroo/diskort-inbox/` ve `/Users/ziroo/diskort-review/` (ikisi de var) ve `/Users/ziroo/ZZ/zProjects/diskort`. Yani Mac'te bu klasörlere yazmak ve `git -C` okuması muhtemelen izin soracak; kurallar Mac yollarıyla güncellenmedi (karar Yusuf'un, doğrulanmadı).
- Windows dönemi kalıntısı: eski `~/.claude/diskort-review/` yolu Mac'te yok (`~/.claude/` altında `diskort-review` klasörü bulunmuyor).
- Mac dosyasında bir kural satırı tek seferlik bir `docker compose exec ... node - <sayı>` komutuna izin veriyor; birikmiş kalıntı gibi duruyor (Windows'taki hash'li `echo` satırı Mac'te yok).
- Global dosya Mac'te Windows ile aynı (`autoUpdatesChannel: latest` + iki ssh/scp kuralı), karşılaştırıldı.
- Zamanlanmış görevler bu izinlere göre yazıldı: [[zamanlanmis-gorevler-ve-skiller]].

## İlgili
- [[_index]], [[sunucu-vps]]
