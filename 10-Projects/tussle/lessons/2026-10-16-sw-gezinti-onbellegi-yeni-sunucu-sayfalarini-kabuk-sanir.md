---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, pwa, service-worker, ders]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli"
---

# Ders: SW gezinti önbelleği her HTML yanıtını `/` kabuğu olarak saklar; sunucudan eklenen yeni sayfalar (`/admin`, `/privacy`…) SW'de açıkça dışlanmalı

`sw.js` gezintilerde network-first çalışır ve `cache.put('/', res)` ile gelen HTML'i kabuk olarak yazar. Aynı tarayıcıda `/admin` açılsaydı çevrimdışı başlangıçta oyun yerine yönetim sayfası gelirdi. Kural: uygulama dışı her yeni yol `fetch` dinleyicisinin başında `/api/` gibi dışlanır ve `VERSION` artırılır. Mağaza hazırlığındaki `/privacy` sayfası için de geçerli.

İlgili: [[2026-10-16-admin-paneli-tek-sayfa-admin-token-kapaliysa-404]]
