---
type: decision
project: kapis
date: 2026-10-03
status: unverified   # Caddy hazır (ziroo-edge), deploy henüz çalıştırılmadı
tags: [kapis, yayin, vps, caddy, docker]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa); repo deploy/ klasörü
---

# Karar: KAPIŞ paylaşılan VPS'te konteyner olarak `kapis.ziroo.net` altında yayınlanacak

## Bağlam
Oyun arkadaş grubu için; herkesin aynı ping'i alması isteniyor.

## Karar
LightNode İstanbul VPS'inde Docker konteyneri `127.0.0.1:8085` üzerinde, önünde Caddy; alan adı `kapis.ziroo.net`. DNS A kaydı eklendi (gri bulut). Repoda `deploy/`: compose host ağı, `TRUST_PROXY=1`, `ALLOWED_ORIGINS=https://kapis.ziroo.net`, `deploy/deploy.sh`. Henüz çalıştırılmadı.

**Açık nokta (2026-10-03'te çözüldü):** Caddy ayrı `ziroo-edge` projesine taşındı ve üst seviyede `/opt/ziroo-sites/hosts/*.caddy` içe aktarılıyor ([[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]). `deploy/deploy.sh` buna göre güncellendi (`SITES=/opt/ziroo-sites/hosts`, reload `bash /opt/ziroo-edge/reload.sh`); deploy henüz çalıştırılmadı.

## Neden
Yusuf tünel ya da kendi PC'sinden host etmeyi istemedi ("herkes aynı pingi alsın"). Mevcut sunucu ve Caddy yeniden kullanılıyor.

## Reddedilen alternatifler
- Kendi PC'sinden tünel ile host: Yusuf istemedi.

## Sonuçlar / riskler
Paylaşılan Caddy'yi değiştirmek Diskort'u etkileyebilir; import semantiği canlıda doğrulanmadı. Dockerfile build'i bu makinede (Docker yok) denenmedi.

## İlgili
- [[_overview]], [[diskort/_overview|Diskort]], [[2026-10-02-caddy-ortak-site-klasoru]], [[caddy-bind-mount-restart]]
