---
type: decision
project: genel
date: 2026-10-22
status: active
tags: [working-rules, claude, repo, kurulum]
source: "sistem: claude-kurulum reposu" oturumu (ZZ kökü)
---

# Karar: `~/.claude` düzeni brain'e değil, ayrı özel `claude-kurulum` reposuna taşındı

## Ne yapıldı
- Yeni repo: `~/ZZ/claude-kurulum`, uzak `zziroo/claude-kurulum` (özel). İçinde `claude/` altında global `CLAUDE.md`, `hooks/`, `agents/`, `skills/`, `orchestration-report/` ve kanca bağlantılarını içeren `settings.ornek.json`; kökte `kur.sh` ve Türkçe README (kurulum, brain ile ilişki, "kendine uyarlama").
- `kur.sh` bu Mac'te çalıştırıldı: `~/.claude/{CLAUDE.md,hooks,agents,skills,orchestration-report}` artık repoya symlink; eskiler `~/.claude/*.yedek-20261022-135026` altında. Başka makinede: clone + `./kur.sh` (`--kuru` önce gösterir, `--kaldir` geri alır).
- Repoya girmeyen kişisel veri: `orchestration-report/out/` (rapor çıktıları) ve `pano/yayin-maskeler.json` (Apple anahtar kimliği, arkadaş adları). `.gitignore`'da; kur.sh ilk kurulumda bunları eski klasörden yeni yere taşır.
- Markdown ve betiklerdeki sabit `/Users/ziroo/...` yolları `~/...` oldu (`gunluk-olcum.py` `expanduser`).

- Aynı gün `zziroo/brain` GitHub'da PUBLIC bulundu (kullanıcı başka makineden göstermek için açmıştı); vault özel varsayımıyla yazıldığından (runbook'larda sunucu IP'si var) yeniden PRIVATE yapıldı. Diğer makinede iki repoyu çekmek için `gh auth login` gerekir.

## Neden
- Brain bir not kasası ve public; çalışan kod, kanca ve kişisel ölçüm verisi oraya ait değil. İki depo paralel çalışır: brain kararı ve dersi tutar, claude-kurulum uygulanan düzeni.
- Symlink sayesinde `~/.claude` altındaki her düzenleme doğrudan repoda görünür; iki makine `git pull` ile aynı düzeni kullanır.
- Başkalarına dağıtılabilsin diye yollar genelleştirildi; kişiye özel kısımlar (plan, VPS, vault yolu) README'de "Kendine uyarlama" altında.

## Reddedilen alternatifler
- Brain içine `sistem/` klasörü: public depo, Obsidian'ı ve vault'u okuyan Claude'u bulandırır, `~/.claude`'a kurulumu elle gerektirir.
- Dosyaları kopyalayarak taşımak: iki makinede kopyalar ayrışır; symlink + git tek kaynak.

## Ders
- `pano/yayin-maskeler.json` gibi "maskeleme" dosyaları gizlenecek dizelerin kendisini içerir; paylaşıma açılan her klasörde böyle dosyalar ilk aranacak şey.
- İşleyiş: anlamlı bir kural/kanca değişikliğinden sonra `~/ZZ/claude-kurulum`'da commit + push (kullanıcı onayıyla). Ayrıntı: [[araclar-ve-raporlar]].

## İlgili
- [[orkestrasyon]], [[_index]], [[2026-10-22-gunluk-token-olcumu-ve-ajan-tavani-kancasi]]
