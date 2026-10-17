---
type: decision
project: diskort
date: 2026-10-16
status: active
tags: [admin-paneli, altyapi, izleme, netdata, standart]
source: Claude Code yan oturumu 2026-10-16 "diskort: admin Altyapı sekmesi" (ops katmanı oturumundan açıldı)
---

# Karar: Admin panelinin "Makine" sekmesi "Altyapı" oldu; makine geneli grafikler panelden çıktı, Netdata'ya bağlantı verildi

## Bağlam
[[proje-altyapi-standardi|Proje altyapı standardı]]: her uygulamanın paneli yalnız kendi bilgisini gösterir, makinenin geneli (CPU, RAM, disk, ağ) tek yerde, Netdata'da ([[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]]). Diskort paneli bu standarttan önce yazılmıştı ve "Makine" sekmesinde ikisi karışıktı. Yusuf: "doğru olması gereken neyse o".

## Karar
- Sekme adı ve anahtarı `makine` → `altyapi` ("Altyapı"); eski `#makine` ve `#sunucu` hash'leri ile localStorage'daki eski sekme adı yeni sekmeye düşer (`TAB_ALIASES`).
- Sekmenin üstünde tek satır: "Makinenin geneli (CPU, RAM, disk, ağ): https://ops.ziroo.net/netdata/" (yeni sekmede açılır).
- **Çıkanlar:** makine yükü uzun geçmişi (24 sa / 7 gün grafikleri: `adm-machine-history`, `/api/admin/system-history`, `systemHistory.ts`, `SystemMonitor.longHistory/netRates`, `system-history.json`), `/api/admin/infra` cevabındaki `network` alanı ve "Makine ağı" kartı (`SecondSampler.history15`, `bucketRows`), sekmedeki İşlemci ve Bellek kartları.
- **Kalanlar (Diskort'a ait):** api/livekit/caddy konteyner kartları, LiveKit metrikleri, TURN/TLS yedek bağlantı, veritabanı yedeği, TLS sertifikaları, Disk (veri), aylık giden trafik kotası, çalışma süresi, push/indirme/güncelleme sayaçları.
- `systemStats.ts`, `netSeconds.ts` ve `config.systemStats` **kaldı**: aylık trafik kotası sayacı, bağlantı teşhisi (saniyelik ağ örnekleyici), `counters`/`activity` dosya yazımı bunlara bağlı.
- Commit `a22c0dc` (−688 satır), aynı gece sunucuda yayınlandı.

## Neden
- Makine geneli grafikler iki yerde tutulmasın; Netdata daha ayrıntılı ve bildirimli.
- Panel kodu küçülür (uzun geçmiş dosyası ve ucu, ağ kartı); bakım yükü azalır.
- Diskort'a ait ölçümler (konteyner CPU/bellek, kota, yedek, TLS) Netdata'da yok, panelde kalmalı.

## Reddedilen alternatifler
- Netdata'dan veri çekip panele gömmek: standart bunu yasaklıyor (bağlantı yeter, çift kaynak olmasın).
- Yalnız makine geçmişini kaldırıp "Makine ağı" kartını bırakmak: ham arayüz grafiği de makine geneli; saniyelik görünüm zaten Bağlantı teşhisi sekmesinde.
- `systemStats.ts` / `netSeconds.ts` dosyalarını da silmek: başka modüller kullanıyor (kota sayacı, teşhis, dosya yazımı).
- Aylık trafik kotası kartını da çıkarmak: Diskort'un sağlayıcı kotası, Diskort'a özgü; kaldı.

## Sonuçlar / riskler
- Sunucuda `/data/system-history.json` sahipsiz kaldı; silinebilir (zararsız).
- Adres çubuğu: eski `#makine`/`#sunucu` taze yüklemede ve aynı sayfada `#altyapi`ye yazılır (`cfeb160`).
- `SystemMonitor` hâlâ cpu/memUsed topluyor ve `/api/admin/dashboard` bunları gönderiyor; istemci yalnız `online`/`voice` serisini kullanıyor. Zararsız, istenirse sonra sadeleştirilir.

## İlgili
- [[proje-altyapi-standardi]] · [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]] · [[yonetim-paneli-web-uzerinden]]
- Runbook: [[admin-paneli-ve-loglar]]
- Oturum: [[2026-10-16-admin-altyapi-sekmesi]]
