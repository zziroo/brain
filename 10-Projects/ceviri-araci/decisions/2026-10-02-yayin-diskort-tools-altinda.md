---
type: decision
project: ceviri-araci
date: 2026-10-02
status: superseded
tags: [ceviri-araci, yayin, sunucu]
source: 2026-10-02 oturumu (string-tool), Yusuf "bizim servere yükler misin, linkle indirebilsin"
---

> **Güncel değil (2026-10-03):** adres ve sunucu yapısı için yerini [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] aldı. Aşağısı o günkü bağlam olarak duruyor.

# Karar: Çeviri Aracı Diskort sunucusunda diskort.ziroo.net/tools/ceviri-araci altında statik dosya olarak yayınlanır

## Bağlam
Yusuf, çevirmen arkadaşının aracı bir linkten indirebilmesini istedi. Elde yalnızca Diskort VPS'i var.

## Karar
`npm run dist` çıktısı (taşınabilir + kurulum `.exe`) ve küçük bir indirme sayfası `/opt/diskort/apps/web/tools/ceviri-araci/` altına kopyalanır. Betik: `string-tool/deploy/deploy.sh`. Sunucuda yalnız son sürüm durur (eski `.exe`'ler silinir). Sayfa üç kopya yayınlanır (`ceviri-araci.html`, `ceviri-araci/.html`, `ceviri-araci/index.html`) ve `<base>` etiketi taşır.

## Neden
- [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]] ile aynı yöntem: Caddy `apps/web`'i klasör olarak bağlıyor, ayar değişikliği ve yeniden başlatma yok, canlı sesli sohbete risk yok.
- Dosya adları boşluksuz ve sürümlü (`ceviri-araci-0.2.0-portable.exe`).

## Reddedilen alternatifler
- `/download/...`: Caddy bu yolu Diskort API'sine yolluyor.
- GitHub Releases: projenin uzak deposu yok; arkadaş için de ek adım olurdu.
- Ayrı alt alan adı: DNS + Caddy değişikliği gerekir.

## Sonuçlar / riskler
- `tools/` klasörü başka projelerle ortak (Ziroobank, Steam paneli). Betik yalnız kendi yollarına dokunmalı: [[paylasilan-web-kokunde-yalniz-kendi-yollarina-dokun]].
- `.exe` imzasız; Windows SmartScreen uyarısı sayfada anlatılıyor.
- Sunucu yeniden kurulursa dosyalar gider; betik yeniden çalıştırılır.

## İlgili
- [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]], [[vps-makinesi]]
