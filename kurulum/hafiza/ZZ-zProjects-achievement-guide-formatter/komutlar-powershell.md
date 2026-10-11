---
name: komutlar-powershell
description: "Yusuf'a verilen komutlar: 2026-10-05'ten beri macOS (zsh) sözdizimi; gizli değer içeren komutlarda ekran görüntüsü riski"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 4e4413d6-9eb0-4d0e-8978-f39426e5338b
  modified: 2026-10-03T22:56:03.154Z
---

Yusuf 2026-10-05'te Windows'tan macOS'a geçti. Kendi çalıştıracağı komutları zsh uyumlu ver (`bash` etiketli kod bloğu). Önceki "PowerShell 5.1 sözdizimi" kuralı Windows makinesine aitti, artık geçersiz.

**Why:** 2026-10-04'te bash sözdizimiyle verilen token ekleme komutu PowerShell'de hata verdi; Yusuf hatayı ekran görüntüsüyle paylaşınca abonelik token'ı sohbete düştü. (Yorumum: komut gizli değer içeriyorsa hata çıktısı da gizli değeri taşır.)

**How to apply:** Kod bloğunu `bash` etiketiyle ver. Gizli değer isteyen adımda değeri komut satırına yazdırma, `read -rs` ile sor ve "hata olursa ekran görüntüsü yerine yalnız hata metnini gönder" de.
