---
type: lesson
project: tussle
date: 2026-10-21
tags: [tussle, orkestra, worktree, ders]
source: Claude Code oturumu "tussle: arena devam turu" (2026-10-21)
---

# Paralel worktree ajanları: taban dalını ajana doğrulat, kayıt dosyalarındaki ekleme çakışmalarını Sonnet'e ver

**Olay 1:** Dikiş commit'i bir özellik dalındayken (`arena/seam-crown`) açılan iki worktree ajanı `main`'den başladı; ikisi de kendileri fark edip `git reset --hard <dal>` yaptı. Üçüncü turda brief'e "ilk iş `git log -1` ile tabanı doğrula, değilse reset" yazıldı, sorun çıkmadı.

**Olay 2:** Aynı dala sırayla birleştirilen 4–5 dal hep aynı dosyalarda "iki taraf da ekledi" çakışması verdi: `registry.ts` (`arenaIds` dizisi), `views.ts`, `texts.ts` (blok kapanışı `},`), i18n blokları, `arena-bot.ts` (`if (card.gameId…)` blokları `}`), `server-arena.test.ts` (bir tarafın `it` gövdesine diğerinin satırı sızdı), `kod-haritasi.md` (aynı madde iki satır), `ARENA-PLAN.md` bölümleri. "İki tarafı da tut" + eksik kapanış/tekrar temizliği koordinatöre tur başına ~15k bağlam yiyordu; bir Sonnet ajanına net liste ile verince sıfır bağlamla çözüldü.

**Ders:** (1) Worktree ajanı brief'ine taban commit'i ve doğrulama satırını koy. (2) Paralel ajanların dokunduğu ortak kayıt dosyaları önceden belli; birleştirmeyi "beklenen çakışma listesi + doğrulama komutları" ile ucuz bir ajana devret, koordinatör yalnız test sonucunu okusun. (3) Birleştirmeden sonra tam test şart: sızan satır typecheck'i geçip testi kırdı.
