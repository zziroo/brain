---
type: resource
project: genel
date: 2026-10-01
status: active
tags: [working-rules, izin, ayar]
source: C:\Users\yusuf\.claude\settings.json; C:\Users\yusuf\ZZ\zProjects\diskort\.claude\settings.local.json
---

# Global ayar neredeyse boştur; Diskort'un izinleri ssh, git, gh ve gelen kutusu yolları etrafında toplanır

Komut desenleri gruplanmış özettir; literal komutlar, SSH satırları ve hash'ler bilerek kopyalanmadı.

## `~/.claude/settings.json` (global)
`autoUpdatesChannel: latest` ve iki izin kuralı: `Bash(ssh -i ~/.ssh/diskort_vps *)` ve `Bash(scp -i ~/.ssh/diskort_vps *)` (scp kuralı 2026-10-05'te Yusuf'un onayıyla eklendi: sunucuya dosya kopyalama auto-mode'da engellenmişti). Kurallar önek eşleşir: `-i` anahtardan hemen sonra gelmeli (`scp -q -i ...` eşleşmez, `scp -i ~/.ssh/diskort_vps -q ...` eşleşir). Global olduğu için alt ajanlar da yararlanır; ajan brifinglerinde SSH/yayın yasağını açık yaz ([[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]]).

## `diskort/.claude/settings.local.json` (yalnız `permissions.allow`, 51 kural)
| Grup | Ne izinli |
|---|---|
| Production SSH | `ssh -i ~/.ssh/diskort_vps root@<vps> ...` biçimleri (isteğe bağlı `-o` bayraklarıyla). Auto-mode sınıflandırıcısı, bu kurallara uymayan production SSH'i engeller. |
| Git (okuma) | `git -C <diskort> log/diff/show/rev-parse/cat-file/fetch` hem Bash hem PowerShell için |
| Git (yazma) | `git branch *`, `git push *` |
| GitHub CLI | `gh release view/download`, `gh run *` |
| Ağ/arşiv | birkaç `curl` (iOS manifest, IPA indirme) ve `unzip` (IPA içindeki provisioning profili inceleme) |
| Dosya yolları | `Read/Write/Edit` için gelen kutusu (`C:\Users\yusuf\diskort-inbox\`) ve inceleme işaretçisi (`C:\Users\yusuf\diskort-review\`); ayrıca `Read` için eski `~/.claude/diskort-review/` yolu |

## Notlar
- Gelen kutusu `.claude` dışına taşındı çünkü `.claude` altına yazmak her seferinde izin sorar ve gözetimsiz çalışmaları durdurur ([[claude-altina-yazma-izin-sorar]]).
- Eskimiş kalıntı: `Read(//c/Users/yusuf/.claude/diskort-review/**)` kuralı eski konuma işaret ediyor; işaretçi artık `C:\Users\yusuf\diskort-review\` altında. Zararsız, ama temizlenebilir (doğrulanmadı).
- Bir kural satırı bir commit hash'ini içeren `echo` komutuna izin veriyor; tek seferlik birikmiş kalıntı gibi duruyor.
- Zamanlanmış görevler bu izinlere göre yazıldı: [[zamanlanmis-gorevler-ve-skiller]].

## İlgili
- [[_index]], [[sunucu-vps]]
