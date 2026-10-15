---
type: resource
project: altyapi
date: 2026-10-16
status: active
tags: [altyapi, standart, ops, admin-panel, healthz, kuma, ziroo-edge]
source: Claude Code oturumu 2026-10-16 "ziroo-edge: ops katmanı (Kuma + Netdata)"
---

# Proje altyapı standardı: her uygulama ne sunar, nereye kaydedilir, panelinde ne olur

Yeni bir uygulama (oyun, araç, servis) yayına girerken bu kalıba uyar; var olanlar da zamanla buna çekilir. Üç katman: **uygulama** (projenin kendisi), **makine** (ziroo-edge `ops/`, ops.ziroo.net), **rapor** (gece gözcüsü). Karar: [[10-Projects/tussle/decisions/2026-10-16-izleme-katmanlari-uygulama-paneli-ve-makine-izleme]], [[10-Projects/diskort/decisions/2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]], [[10-Projects/diskort/decisions/2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]].

## 1. Uygulamanın sunduğu (proje sözleşmesi)
- **Sağlık ucu:** `GET /healthz` → `200`, `text/plain`, gövde `ok`; sürecin kendisi cevaplar (statik dosya ya da Caddy yedeği değil). Kendi alan adında `https://<ad>.ziroo.net/healthz`, tools altında `https://tools.ziroo.net/<ad>/healthz`. Uygulamanın başka ad kullanması gerekiyorsa (`/api/health` gibi) `/healthz` da sunulur.
- **Konteyner:** adı proje adı (`tussle`, `kapis`, `rehber`); `127.0.0.1:<port>`'ta dinler; Caddy dosyası `/opt/ziroo-sites/hosts/<ad>.caddy` ya da `tools|games/<ad>.caddy` (ziroo-edge README "Yeni proje eklemek"). Diskort'un `infra-api-1` / `infra-livekit-1` adları tarihsel istisna.
- **Yerleşim:** kod `/opt/<ad>`, veri `/opt/<ad>/data`, sırlar `/opt/<ad>/.env` (600). Loglar `data/logs/*.jsonl`, döndürmeli (20 MB), yedeğe girmez.
- **Yedek (veritabanı varsa):** gece systemd timer → `/var/backups/<ad>/latest.db.gz` (+ tarihli kopyalar, 14 gün). Kuma 26 saatte bir sinyal bekler.
- **Geri bildirim ve istemci hataları (kullanıcısı olan uygulamalar):** `POST /api/feedback` (girişli, kota) ve `POST /api/client-error` (kimliksiz, IP kotası, maskeli) — Tussle örneği [[10-Projects/tussle/decisions/2026-10-15-istemci-hata-toplama-jsonl-geri-bildirim-sqlite]].

## 2. Admin paneli (yalnız uygulamanın kendi bilgisi)
- Adres `/admin` (kendi alan adında) ya da `/<ad>/admin`; `.env`'de `ADMIN_TOKEN`; salt okunur + "incelendi" işareti. Tek sayfa DOM, dış kütüphane yok.
- Bölümler, bu sırayla ve bu adlarla: **Geri bildirim** (listele/ack), **Hatalar** (gruplu istemci hataları: mesaj, sayı, sürüm/platform, son görülme; 24 sa / 7 gün), **Kullanım** (uygulamaya özgü sayılar, 14 günlük çizgi), **Altyapı** (uygulamanın *kendi* parçaları: süreç/konteyner CPU-RAM, kendi bileşenleri (ör. LiveKit), DB boyutu, son yedek, TLS, bağlı istemci, sürüm/OTA dağılımı).
- **Makine geneli yok:** bütün makinenin CPU/RAM/disk/ağ grafiği, diğer konteynerler, disk doluluğu panelde gösterilmez; "Makine: https://ops.ziroo.net/netdata/" bağlantısı verilir. Netdata'dan veri çekip gömme (bağımlılık, çifte kimlik, çifte grafik).
- Bildirim göndermez; alarm Kuma'nın işi.

## 3. Makine katmanına kayıt (ziroo-edge ops, Kuma)
- Kuma **Siteler** grubuna adresle (`tussle.ziroo.net`, `tools/<ad>`), HTTP monitörü `/healthz`, 60 sn. Ürün adı yazılmaz (değişebilir).
- **Konteynerler** grubuna konteyner adıyla (Docker Container türü, host "VPS Docker (soket)").
- Yedeği varsa **Makine** grubuna push monitörü `yedek <ad>` + `ops/check.sh`'e bir `backup` satırı + `/opt/ziroo-ops/check.env`'e jeton.
- Smoke: ziroo-edge `test/smoke.sh`'e `/healthz` satırı (saatlik betik koşturur).

## 4. Rapor katmanı (gece gözcüsü)
- Projeye özgü bölüm (geri bildirim, hata grupları, kod incelemesi) gözcüye eklenir; makine sağlığı eklenmez (Kuma'da).

## Mevcut durum (2026-10-16)
| Proje | /healthz | Kuma | Yedek push | Panel | Not |
|---|---|---|---|---|---|
| Diskort | var (API, `a22c0dc`) | site + 2 konteyner | var | var (`/admin`) | standarda uygun: "Altyapı" sekmesi yalnız Diskort bileşenleri + Netdata bağlantısı (`a22c0dc`, 2026-10-16, yayında) |
| Tussle | var | site + konteyner | var | yok | panel sırada (geri bildirim/hata uçları hazır) |
| KAPIŞ | var | site + konteyner | — | yok | kullanıcı verisi yok, panel gerekmez |
| Araçlar (steam-avgr, rehber, song-finder, pdf-ceviri, ziroobank) | var (ziroobank `/`) | site; ziroobank konteyner | — | yok | ziroobank'a `/healthz` eklenebilir |

## İlgili
- ziroo-edge README "Makine izleme" ve "Yeni proje eklemek" · [[10-Projects/diskort/runbooks/sunucu-vps|sunucu-vps]]
