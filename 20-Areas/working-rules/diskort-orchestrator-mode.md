---
type: resource
project: diskort
date: 2026-10-01
status: active
tags: [working-rules, diskort, orkestrasyon]
source: memory orchestrator-mode.md (diskort proje hafızası, 2026-09-30)
---

# Diskort'ta orkestrasyon kuralları global kurallara şu eklemelerle uygulanır

Genel orkestrasyon, inceleme kapısı, skeptic, bütçe ve model kuralları 2026-09-28'de Yusuf'un isteğiyle global CLAUDE.md'ye taşındı ([[orkestrasyon]], [[inceleme-kapisi]]).

- **Ajan sonrası kontrol:** koordinatör ajanın değişikliklerinde `pnpm -r typecheck` + `pnpm -r test` çalıştırır. UI kontrolü production'da değil, yerel test sunucusunda ve izole dev profiliyle yapılır ([[yerel-ui-test-ortami]]).
- **Merge sonrası:** main'e push ([[git-push-autonomy]]); gerekirse sunucu deploy; client release yalnız "sürüm çıkar" denince ([[surum-cikarma-kurali]]).
- **Windows worktree temizliği (yalnızca worktree kullanıldıysa):** `git worktree remove` "Filename too long" verir; klasör `cmd /c "rmdir /s /q \\?\<yol>"` ile silinir, sonra `git branch -d` ([[worktree-silme-windows]]).
- **Gece incelemesi (`diskort-main-kod-inceleme`, 00:10):** `last-reviewed.txt` içindeki SHA'dan beri origin/main commit'lerini inceler, bulgu varsa sonnet skeptic çalıştırır, yalnız hayatta kalan yüksek/kritik bulguda push bildirimi gönderir. Prompt'ta repo yolu sabit; proje taşınırsa güncellenmeli ([[zamanlanmis-gorevler-ve-skiller]]).
- **Taşıma (2026-09-28):** proje `C:\dev\diskort` yolundan `C:\Users\yusuf\ZZ\zProjects\diskort` yoluna taşındı. Güncellenenler: zamanlanmış görev prompt'u, `.claude/settings.local.json`, Windows görevi "Diskort veritabanı yedeği", hafıza. Eski klasör silindi. `OneDrive\Yedekler\Diskort` bilerek tutulan offsite yedek; SİLME.

## Neden
Yusuf tek bir koordinatör sohbet ve işi yapan ajanlar istiyor; main'e giren her şeyin bağımsız (düşmanca dahil) incelenmesini istiyor.

## İlgili
- [[_index]]
