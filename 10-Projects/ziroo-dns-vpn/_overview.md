---
type: project
project: ziroo-dns-vpn
date: 2026-10-20
status: active
tags: [ziroo-dns-vpn, overview, vpn, sansur, sunucu]
source: "ZZ kök oturumu 2026-10-19/20 (araştırma: kendi VPN'imiz)"
---

# ziroo-dns-vpn: Türkiye'deki engelleri aşmak için kendi VPN'imiz (Yusuf + arkadaşlar)

> Durum kaynağı bu sayfa; canlı gerçek değildir. Sunucu durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
Kendi sunucumuzda çalışan, birkaç kişilik özel VPN. Amaç: Discord (2024'ten beri engelli) ve kriz dönemlerinde engellenen ya da yavaşlatılan siteler (Twitter vb.); genel günlük kullanım. Surfshark gibi hazır servis yerine kendi sunucumuz: daha hızlı, IP'si bilinmediği için engellenmesi zor, sınırsız cihaz.

Kod klasörü `/Users/ziroo/ZZ/zProjects/ziroo-dns-vpn` (2026-10-05'te boş açılmıştı, geçmişte konuşması yok; 2026-10-20'de bu proje için kullanılmaya başlandı).

## Kararlar
- [[2026-10-20-kendi-vpn-ayri-frankfurt-sunucusu-hazir-istemci]]: ayrı LightNode VPS (Frankfurt), hazır istemci + abonelik linki, kendi uygulama yok

## Güncel durum
_Son güncelleme: 2026-10-20; canlıdan doğrula._
- **Sunucu henüz alınmadı.** Plan: LightNode, Frankfurt, CPU Shared 1 vCPU / 2 GB, Ubuntu 24.04, SSH anahtarıyla giriş. Yusuf satın alacak (ödeme ve hesap onun tarafında).
- Satın almadan önce bakılacak: planın aylık trafik kotası (birkaç kişi genel kullanımda kişi başı 100-300 GB/ay).
- Sunucu açılınca: `~/.ssh/config`'e `vpn` takma adı, güvenlik duvarı, otomatik güvenlik güncellemesi (LightNode imajında unattended-upgrades maskeli geliyor, bkz. [[sunucu-lightnode-istanbula-tasindi]]), sonra VPN kurulumu.

## Teknik yön (kurulumda netleşecek)
- **Protokoller:** biri gizlenmiş ve DPI'ye dayanıklı (VLESS + Reality, yedek), biri hızlı günlük (UDP tabanlı: Hysteria2, WireGuard ya da AmneziaWG). Hangi panelin hangisini desteklediği kurulumda doğrulanacak: 3x-ui Xray protokollerini sunar, AmneziaWG sunmaz; sing-box sunucu / Hiddify Manager / Amnezia seçenekleri karşılaştırılacak.
- **Dağıtım:** kişi başı abonelik linki; istemci Hiddify / sing-box (iOS'ta Streisand ya da Hiddify), Windows'ta v2rayN ya da Hiddify.
- **Split tunneling:** Türk IP'leri doğrudan (geoip:tr direct), gerisi VPN. Banka ve yerli platformlar yurt dışı IP görmesin.
- **Telefon:** her zaman açık VPN.

## Kısıtlar
- Mevcut paylaşılan VPS'e ([[vps-makinesi]], LightNode İstanbul II) VPN **kurulmaz**: çıkış Türkiye'de olur, engel aşılmaz; VPN IP'si işaretlenirse ziroo.net ve Diskort da Türkiye'den erişilemez hale gelebilir.
- VPN üzerinden torrent yok (Almanya'da telif şikâyeti, sağlayıcı sunucuyu kapatabilir).
