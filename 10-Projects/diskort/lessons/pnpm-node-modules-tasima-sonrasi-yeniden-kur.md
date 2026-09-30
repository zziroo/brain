---
type: lesson
project: diskort
date: 2026-09-28
status: active
tags: [pnpm, tasima]
source: C--dev-diskort 2736605c, 72824d08
---

# Ders: Proje klasörü taşınınca pnpm bağlantıları (junction) bozulur: node_modules silinip yeniden kurulur.

- Klasör yeniden adlandırılınca junction'lar mutlak yolda kalır.
- Taşıma kontrol listesi: node_modules yeniden kur, proje hafızası klasörünü yeni yola kopyala (hafıza yola bağlı), `.claude/settings.local.json` içindeki yol izinlerini güncelle, zamanlanmış görev yollarını güncelle, yeni yerde typecheck+test, git remote/dal durumu, devir notu.

## İlgili
- [[2026-09-28-kod-inceleme-ajani-ve-dizin-tasima]]
