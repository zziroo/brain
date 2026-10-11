---
name: koordinator-eforu-kullanicida
description: Koordinatör (ana oturum) eforunu kullanıcı seçer; Claude kendi eforunu değiştirmez, CLAUDE.md'ye kural yazılmaz
metadata:
  type: feedback
---

Koordinatörün efor seviyesi kullanıcının ayarıdır; Claude kendi oturumunun eforunu (ör. `set_session_effort`) kendiliğinden değiştirmez. Ajanların eforu ise CLAUDE.md kuralına göre her ajanda açıkça verilir.

**Why:** 2026-10-10'da kullanıcı "koordinatör ben ne yaparsam o ayar, böyle kalsın" dedi; koordinatör eforu için kural eklenmesini istemedi.

**How to apply:** Efor önerisi gerekiyorsa söyle (plan/tasarımda high–xhigh, rutin işte medium, max yalnız tıkanmada), ama ayarı kullanıcıya bırak. Bkz. vault `20-Areas/working-rules/2026-10-10-ajan-boyutu-ve-yalin-baglam.md`.
