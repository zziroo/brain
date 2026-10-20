---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, oyun-tasarimi, lane-dash, gorsel]
source: Claude Code oturumu "tussle: mevcut durum kapsamlı çalışma" (geri bildirim turu 2); oturum notu [[2026-10-21-tussle-geri-bildirim-turu-2-ve-gorsel-analiz]]
---

# Lane-dash: yakın görüş (18 m), engeller anlık refleksle okunur

**Karar:** Lane-dash v6'da görüş mesafesi `FAR` 42→18 m, `FADE` 5; sis şeridi `layoutGame`'de pişirilir, kaçış noktası alanın üstüne alındı. `SPAWN_AHEAD` 44→24: yol aynı kaldı (60 tohumda birebir). Hız rampası değişmedi. 12 m/sn'de bir engel ilk 1,5 sn önce görünür; tepki + şerit değiştirme 0,33 sn.

**Neden:** Yusuf: "çok ilerisi gözüküyor, anlık refleks olsun." Uzaktan görünen yol planlama oyununa çeviriyordu; oyunun vaadi hızlı tepkidir.

**Reddedilen alternatifler:**
- `FAR`'ı hızla ölçeklemek: sis dünyaya bağlı olsun, her an aynı görünsün (hızlanınca görüş de uzarsa refleks hissi kaybolur).
- Sim hız/aralık değişikliği: denge turu ayrı iş; şimdilik yalnız görüş, böylece mevcut skorlar karşılaştırılabilir kalır.

**Uygulama:** `src/games/lane-dash/view.ts` (FAR/FADE, sis bandı `layoutGame`), `sim.ts` (`SPAWN_AHEAD`), sürüm v6. Telefon teyidi bekliyor (görüş).
