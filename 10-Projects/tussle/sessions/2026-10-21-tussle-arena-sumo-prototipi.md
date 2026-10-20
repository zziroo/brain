---
type: session
project: tussle
date: 2026-10-21
tags: [tussle, arena, sumo, oturum]
---

# Oturum: arena oyunları seçimi ve Sumo prototipi (`e9574bd`, yayında değil)

- Yusuf eski "aynı masada ama online" konuşmalarını sordu; DESIGN.md §5.2 ve 10 Ekim notundan bulundu. Pazar taraması + 4 oyun önerisi `docs/ARENA-GAMES.md`; Yusuf dörtlüyü onayladı, Sumo'yla başlandı.
- Koordinatör sözleşmeyi yazdı (`src/shared/arena/types.ts`, `registry.ts`, `sumo.ts` iskeleti, `protocol.ts` `ain`/`ast`, `docs/ARENA-PLAN.md`); sunucu (opus high) ve istemci (opus medium) ajanları paralel, dosyalar çakışmadı. Sunucu ajanı 24 test, istemci ajanı ekran + kart + i18n; iki uçtan uca deneme bot ile.
- İnceleme: sunucu 3 düşük (eşzamanlı kopmada kazanan slot sırası, push'ta ham kimlik, takılmada 6x hız), istemci 1 orta (iptal kartı kilit açmadan exit) + 3 düşük; şüpheci ortayı düşüğe indirdi (4 sn STALL emniyeti var). Hepsi düzeltildi.
- Denge: ajanın bulduğu "tek hamle 2 birim" sorunu sabitlerle çözüldü (0,035 / 0,93). Encode stride 5 oldu (rakibin kurulum oku görünsün).
- Commit yalnız arena hunk'larıyla atıldı; i18n ve kod haritasında başka oturumun hunk'ları dışarıda bırakıldı (`git apply --cached --unidiff-zero` ile süzülmüş yama). Stage'deki ağaç ayrı klasörde typecheck + 510 test ile doğrulandı.
- Ders: `crack-it` denge testi (9 sn) ajanlar çalışırken yük altında düşüyor, tek başına geçiyor; arena dışı.

**Doğrulanmadı:** telefonda iki cihaz; 3-4 oyuncu; daralmayla bitiş; `cancelled` yolu; rakibin kurulum oku son turda yakalanmadı (önceki turda görüldü).
**Sıradaki:** Yusuf telefon teyidi (iki cihaz: his, hamle gücü, ok okunabilirliği) → Trails (ızgara-yön motoru) → Crown, Paint → rozet yuvaları, izleme.
