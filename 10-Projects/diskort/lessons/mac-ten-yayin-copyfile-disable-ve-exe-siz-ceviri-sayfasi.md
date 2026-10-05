---
type: lesson
project: diskort
date: 2026-10-05
status: active
tags: [mac, yayin, tar, ceviri-araci, ortam]
source: oturum 2026-10-05 akşam (ZZ kökü), [[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]
---

# Mac'ten yayın: betikleri COPYFILE_DISABLE=1 ile çalıştır; Çeviri Aracı betiği .exe olmadan çalışmaz

- **`._*` dosyaları:** macOS `tar` (bsdtar) genişletilmiş öznitelikli dosyalar için arşive `._dosya` (AppleDouble) kopyaları ekleyebilir. Yayın betiklerinin çoğu `tar | ssh` ile statik klasöre açar; bu dosyalar sunucuda yayına düşebilir. Mac'te betikleri `COPYFILE_DISABLE=1 bash deploy/deploy.sh` ile çalıştır. Yalnız document-formatter'ın betiği bunu kendisi ayarlıyor. 2026-10-05'teki yayında sunucuda `._*` çıkmadı.
- **Zararsız uyarı:** Sunucudaki GNU tar `Ignoring unknown extended header keyword 'LIBARCHIVE.xattr.com.apple.provenance'` diyor. Yalnız uyarı, betiği durdurmuyor.
- **Çeviri Aracı (string-tool):** `deploy/deploy.sh` `release/` altındaki Windows `.exe`'leri ister, Mac'te yoklar ve betik baştan çıkar. Yalnız sayfa değişince: canlı sayfadan sürüm, dosya adı ve boyutları al, `deploy/page/index.html`'deki `__X__` yer tutucularını onlarla doldur, yalnız `index.html` + `page.css`'i `/opt/ziroo-www/tools/ceviri-araci/`'ye aç (`root:root`, `644`). `.exe`'lere dokunma. Sonra başlığı ve `.exe` boyutunu curl ile doğrula.
- **Ziroobank:** `deploy.sh` artık rsync değil `tar | ssh` kullanıyor; Mac'ten olduğu gibi çalıştı.
- SSH anahtarı Mac'te `~/.ssh/diskort_vps` (600) yerinde.
