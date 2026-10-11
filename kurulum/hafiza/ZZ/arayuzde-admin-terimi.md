---
name: arayuzde-admin-terimi
description: "Araç arayüzlerinde yetkili kullanıcı için \"sahip\" değil \"admin\" denir"
metadata:
  node_type: memory
  type: feedback
  originSessionId: e3ba9b53-e939-466c-806b-ae5cf19677e3
  modified: 2026-10-05T19:36:55.953Z
---

Araçların kullanıcıya görünen metinlerinde yetkili giriş için "sahip" yerine "admin" kullan ("Admin parolası", "Admin" rozeti, "yalnız admin içindir").

**Why:** Yusuf 2026-10-05'te Rehber Okuyucu'daki "sahip girişi" ifadelerini "admin girişi" yaptırdı.

**How to apply:** Yeni araç ya da giriş ekranı yazarken "admin" de. Koddaki adlara (`OWNER_PASSWORD`, `owner_only`) ve Steam'deki "API anahtarının sahibi" gibi gerçekten sahipliği anlatan metinlere dokunma. İlgili: [[proje-isi-proje-oturumunda]].
