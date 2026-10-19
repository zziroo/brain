---
type: project
project: ziroo-vpn
date: 2026-10-20
status: active
tags: [ziroo-vpn, overview, vpn, sansur, sunucu]
source: "ZZ kök oturumu 2026-10-19/20 (araştırma) + ziroo-vpn: kurulum oturumu 2026-10-20"
---

# ziroo-vpn: Türkiye'deki engelleri aşmak için kendi VPN'imiz (Yusuf + arkadaşlar)

> Durum kaynağı bu sayfa; canlı gerçek değildir. Sunucu durumunu işlem yapmadan önce canlıdan doğrula.

## Nedir
Kendi sunucumuzda çalışan, birkaç kişilik özel VPN. Amaç: Discord (2024'ten beri engelli) ve kriz dönemlerinde engellenen ya da yavaşlatılan siteler (Twitter vb.); genel günlük kullanım. Surfshark gibi hazır servis yerine kendi sunucumuz: daha hızlı, IP'si bilinmediği için engellenmesi zor, sınırsız cihaz.

Kod klasörü `/Users/ziroo/ZZ/zProjects/ziroo-vpn` (2026-10-05'te boş açılan `ziroo-dns-vpn` klasörü 2026-10-20'de bu adla yeniden adlandırıldı). Klasörde yalnız README var; git deposu değil.

## Kararlar
- [[2026-10-20-kendi-vpn-ayri-frankfurt-sunucusu-hazir-istemci]]: ayrı LightNode VPS (Frankfurt), hazır istemci + abonelik linki, kendi uygulama yok
- [[2026-10-20-3x-ui-hysteria2-reality-happ-istemci]]: 3x-ui (Hysteria2 + Reality), istemci Happ, Türk siteleri kuralı sunucudan

## Dersler
- [[2026-10-20-xray-26-9-reality-sing-box-istemcileri-reddediyor]]: Xray ≥ 26.9.8 Reality, sing-box/Hiddify'ı reddediyor → sunucu Xray v26.7.28'de sabit
- [[2026-10-20-mac-vpn-istemcisi-tuzaklari]]: Mac'te iPhone sürümü, sudo isteyen TUN, modem DNS'inin tüneli atlaması

## Güncel durum
_Son güncelleme: 2026-10-20; canlıdan doğrula._
- **Çalışıyor:** tek kullanıcı (Yusuf). Mac (Happ masaüstü, Xray TUN) ve Android (Happ, mobil veri) doğrulandı. Discord yazışma ve ses çalışıyor, Türk siteleri Türk IP'siyle, gerisi Almanya'dan. Reality yedeği ayrıca test edildi.
- **Sunucu:**
  - LightNode Frankfurt, `ziroo-vpn-fra`, 1 vCPU / 2 GB, Ubuntu 24.04, IP 130.94.63.238.
  - Pay-By-Traffic 1000 GB/ay, ≈7,71 $/ay. Kota dolunca 10 kbps; yükseltme var (sunucu durdurulur), düşürme yok.
  - Hat ~100 Mbit (VPN üzerinden ~90 Mbit ölçüldü).
- **Erişim:** `ssh vpn` (`~/.ssh/config`, anahtar `~/.ssh/ziroo_vpn`). Root, yalnız anahtarla.
- Oturum özeti: [[2026-10-20-ziroo-vpn-kurulum-oturumu]].

## Teknik yapı
- **3x-ui v3.10.2**, Xray **v26.7.28 (sabit, güncelleme!)**.
  - Panel yalnız `127.0.0.1:34520`'de. Panel yolu, kullanıcı adı, şifre ve API token'ı sunucuda `/etc/x-ui/install-result.env` içinde (root, 600).
  - API yardımcısı `/root/xapi.sh METHOD path [curl args]`.
- **Bağlantılar:**
  - Hysteria2 UDP 443 (Let's Encrypt IP sertifikası, intel.com masquerade).
  - VLESS + Reality + Vision TCP 443 (hedef `www.intel.com`, `minClientVer 1.0.0`).
- **Abonelik:** HTTPS, rastgele port (ufw'de açık), rastgele yol. Her istemci kendi `subId`'si. Linkler yalnız sohbette verilir, hiçbir yere yazılmaz.
- **Yönlendirme (Happ):**
  - Kaynak `/root/routing-profile.json`. Panelde `subRoutingRules` = `happ://routing/onadd/<base64>`, `subEnableRouting` açık.
  - Sıra block → proxy → direct: engellenen servisler VPN, Türk siteleri, YouTube ve `geoip:tr` doğrudan, gerisi VPN.
- **Güvenlik:**
  - ufw: 22, 80 (ACME yenileme için açık kalmalı), 443 tcp/udp, abonelik portu.
  - fail2ban, unattended-upgrades açık (LightNode imajında servisler maskeliydi). BBR + fq.

## İşletim (runbook)
- **Panele giriş:** `ssh -N -L 2222:127.0.0.1:34520 vpn`, sonra `https://localhost:2222/<yol>` (sertifika uyarısını geç).
- **Yeni kullanıcı:** panelde iki bağlantıya da aynı `subId` ile istemci ekle (Reality'de flow `xtls-rprx-vision`). Link `https://130.94.63.238:<abonelik portu>/<subPath>/<subId>`; port ve yol paneldeki abonelik ayarlarında.
- **Kural listesi değişince:** `/root/routing-profile.json`'u düzenle, base64'le `happ://routing/onadd/`'a çevirip `subRoutingRules`'a yaz, paneli yeniden başlat. İstemciler aboneliği 12 saatte bir yeniliyor; elle yenilemek de olur.
- **Kriz anında:** yeni engellenen siteyi `ProxySites`'a ekle; YouTube yavaşlatılırsa `geosite:youtube`'u Direct'ten Proxy'ye taşı.
- **Kullanıcıya kurulum:**
  - Happ. iOS App Store, Android Play, Mac ve Windows için GitHub'daki **masaüstü** DMG/EXE (App Store'daki Mac sürümü değil).
  - Mac'te TUN modu "Xray TUN".
  - Mac ve Windows'ta DNS'i `1.1.1.1 8.8.8.8` yap.
  - Ayrıntı: [[2026-10-20-mac-vpn-istemcisi-tuzaklari]].
- **Xray güncelleme:** [sing-box #4520](https://github.com/SagerNet/sing-box/issues/4520) kapanana kadar yapma. `x-ui update` sonrası Xray sürümünü kontrol et.

## Sıradaki işler
- Arkadaşlar katılınca kişi başı istemci ve link (şimdilik yalnız Yusuf).
- iPhone ve Windows'ta Happ testi.
- Trafiği izle: toplam ~%70'e gelince LightNode'da paketi yükselt.
- İsteğe bağlı:
  - Ayrı bir alan adı (ziroo.net değil): sunucu değişince linkler sabit kalır.
  - Cloudflare arkasında üçüncü bir CDN yedeği.
  - AmneziaWG.

## Kısıtlar
- Mevcut paylaşılan VPS'e ([[vps-makinesi]], LightNode İstanbul II) VPN **kurulmaz**: çıkış Türkiye'de olur, engel aşılmaz; VPN IP'si işaretlenirse ziroo.net ve Diskort da Türkiye'den erişilemez hale gelebilir. İki sunucu ayrı SSH anahtarı kullanır.
- VPN üzerinden torrent yok (Almanya'da telif şikâyeti, sağlayıcı sunucuyu kapatabilir).
