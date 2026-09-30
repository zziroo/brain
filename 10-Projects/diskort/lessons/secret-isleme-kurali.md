---
type: lesson
project: diskort
date: 2026-09-29
status: active
tags: [diskort, guvenlik, secret]
source: memory diskort-ios.md, diskort-server.md
---

# Secret değerlerini Yusuf girer; Claude dosyadan okuyan komut verir ve içeriği asla yazdırmaz

- Her Diskort anahtar/secret dosyası ayrıca `OneDrive\Yedekler\Diskort\<kategori>` altına gider (android-imza, ota-imza, ios-imza, sunucu-ssh, uygulama-ayarlari); indeks `BENIOKU.txt`. `OneDrive\Yedekler` ASLA silinmez.
- Sunucu `.env` (chmod 600) içeriği yazdırılmaz. Sunucu `.env` değerleri Yusuf tarafından `/root/set-env.sh NAME < dosya` ile yazılır. Bu PC'de `cmd /c '... < dosya'` kullanılır.
- Bu vault'ta yalnız konum yazılır (anahtar `~/.ssh/diskort_vps` içinde vb.), içerik asla.

## İlgili
- [[sunucu-vps]], [[ios-cihaz-ekleme]]
