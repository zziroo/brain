---
type: lesson
project: diskort
date: 2026-09-29
status: active
tags: [diskort, guvenlik, secret]
source: memory diskort-ios.md, diskort-server.md
---

# Secret değerlerini Yusuf girer; Claude dosyadan okuyan komut verir ve içeriği asla yazdırmaz

- Her Diskort anahtar/secret dosyası ayrıca **kasaya** gider: şifreli disk görüntüsü `~/Kasa.sparsebundle` (açmak `bash ~/ZZ/zProjects/ziroo-edge/ops/yedek/kasa-ac.sh`), klasör `diskort/<kategori>` (android-imza, ota-imza, ios-imza, sunucu-ssh, uygulama-ayarlari; eski indeks `diskort/BENIOKU-onedrive.txt`). Kasaya ekledikten sonra `kasa-guncelle.sh` (ayırır, iCloud'a kopyalar). Kasa parolası Yusuf'un Şifreler uygulamasında. 2026-10-17'ye kadar bu yer Windows'ta `OneDrive\Yedekler\Diskort` idi ([[2026-10-17-felaket-kurtarma-yedegi]]).
- Sunucu `.env` (chmod 600) içeriği yazdırılmaz. Sunucu `.env` değerleri Yusuf tarafından `/root/set-env.sh NAME < dosya` ile yazılır. Bu PC'de `cmd /c '... < dosya'` kullanılır.
- Bu vault'ta yalnız konum yazılır (anahtar `~/.ssh/diskort_vps` içinde vb.), içerik asla.

## İlgili
- [[sunucu-vps]], [[ios-cihaz-ekleme]]
