---
type: lesson
project: diskort
date: 2026-10-10
status: active
tags: [diskort, macos, electron-builder, ci, imzalama]
source: Claude Code oturumu 2026-10-10 (v0.10.2 macOS işi düştü)
---

# electron-builder 26 `CSC_LINK` yolu macOS 26 koşucusunda "passphrase not correct" ile düşer; sertifikayı kendin aktar

electron-builder 26.15.3 `.p12`'yi rastgele parolalı geçici anahtar zincirine doğru aktarıyor, ama ardından `security set-key-partition-list -k`'ya anahtar zinciri parolası yerine `.p12` parolasını veriyor (`app-builder-lib/out/codeSign/macCodeSign.js` `importCerts`). GitHub `macos-latest` (Darwin 25) üzerinde `SecKeychainUnlock: The user name or passphrase you entered is not correct` ile iş düşer.

Çözüm (`release.yml`): kendi anahtar zincirini bilinen rastgele parolayla oluştur, aç, `.p12`'yi `-T /usr/bin/codesign` ile aktar, `set-key-partition-list`'i o parolayla çalıştır, zinciri arama listesine ekle; `CSC_LINK` verme, electron-builder kimliği arama listesinden bulur. EXIT trap'te zinciri sil.

Tag'deki workflow dosyası kullanıldığı için düzeltme yeni bir etiket ister (0.10.2 taslağı silindi, 0.10.3 çıktı).
