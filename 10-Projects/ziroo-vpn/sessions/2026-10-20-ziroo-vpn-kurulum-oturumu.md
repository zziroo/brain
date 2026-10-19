---
type: session
project: ziroo-vpn
date: 2026-10-20
status: done
tags: [vpn, kurulum, lightnode, 3x-ui, happ]
source: "ziroo-vpn: kurulum oturumu (proje klasörü, 2026-10-20)"
---

# Oturum: Frankfurt VPN sunucusunun kurulumu ve Mac + Android testi

## Ne yapıldı
- **Sunucu:** LightNode'da Yusuf'la birlikte (Chrome) açıldı: Frankfurt, CPU Shared 1 vCPU / 2 GB, 50 GB, Ubuntu 24.04, Pay-By-Traffic 1000 GB, ~7,71 $/ay.
  - Trafik paketi sonradan yükseltilebiliyor (sunucu durdurulur), düşürülemiyor. Kota dolarsa hız 10 kbps'e iniyor. Bu yüzden 1 TB ile başlandı.
- **SSH:** LightNode yalnız RSA açık anahtar dosyası kabul ediyor. Diskort sunucusunun anahtarını yeniden kullanmayı Mac'teki koruma engelledi (doğru). Ayrı anahtar oluşturuldu: `~/.ssh/ziroo_vpn` (RSA 4096). `~/.ssh/config`'e `Host vpn` eklendi.
- **Temel güvenlik:**
  - Tam güncelleme ve yeni kernel için yeniden başlatma.
  - unattended-upgrades açıldı. LightNode imajında yalnız servis değil, `apt-daily*.service` da maskeliydi.
  - ufw: 22, 80 (ACME), 443 tcp/udp ve abonelik portu açık.
  - SSH yalnız anahtarla. BBR + fq açık. Saat dilimi UTC.
- **3x-ui v3.10.2** etkileşimsiz kuruldu (`XUI_NONINTERACTIVE=1 XUI_SSL_MODE=ip`):
  - Let's Encrypt IP sertifikası (6 günlük, acme.sh cron yeniliyor; port 80 açık kalmalı).
  - Panel `127.0.0.1`'e bağlandı. Abonelik portu rastgele bir porta taşındı.
  - Bağlantılar, Xray sürümü ve Happ kuralları: [[2026-10-20-3x-ui-hysteria2-reality-happ-istemci]].
- **Reality uyumsuzluğu bulundu ve çözüldü:** [[2026-10-20-xray-26-9-reality-sing-box-istemcileri-reddediyor]].
- **İstemci denemeleri:** Hiddify iOS-on-Mac → Hiddify Mac (proxy) → Happ Mac (Xray TUN) + DNS düzeltmesi. Ayrıntı: [[2026-10-20-mac-vpn-istemcisi-tuzaklari]].
- **Eski kalıntı temizlendi:** Mac'te eskiden kurulu SplitWire'ın (ByeDPI + WARP) kalıntıları temizlendi. Geriye yalnız Wi-Fi DNS'i (1.1.1.1) ve tercih dosyası kalmıştı. Discord'un VPN'siz açılmasının sebebi o DNS'ti: TurkNet Discord'u DNS ile engelliyor.

## Doğrulananlar
- **Mac (Happ, Hysteria2 ve Reality ayrı ayrı):**
  - X/Twitter `loc=DE` (130.94.63.238), Trendyol `loc=TR` (Yusuf'un IP'si).
  - turkiye.gov.tr doğrudan, 0,2 sn. Discord yazışma ve ses çalışıyor.
  - STUN ile UDP tünelden geçiyor. Hız ~90 Mbit.
- **Android (Happ, mobil veri):** Discord çalışıyor. Sunucu bağlantıyı operatör IP'sinden görüyor. Trendyol açılıyor.
- **Dışarıdan bakınca:** 443/TCP geçerli sertifikalı intel.com gibi görünüyor. Panel portu kapalı.
- **Coğrafi konum:** ipinfo `DE`, ifconfig.co `US` (IP bloğu NTT'ye kayıtlı).

## Açık kalanlar
- Şimdilik tek kullanıcı (Yusuf). Arkadaşlar gelince kişi başı istemci ekle (overview'daki işletim notu).
- iPhone ve Windows'ta henüz denenmedi.
- sing-box #4520 kapanınca Xray'i en yeni sürüme al.
- İleride: ayrı bir alan adı (ziroo.net değil) → sunucu değişince link sabit kalır. Cloudflare arkasında üçüncü bir CDN yedeği.

## İlgili
- [[10-Projects/ziroo-vpn/_overview|ziroo-vpn]] · [[2026-10-20-kendi-vpn-fikri-ve-kararlar]]
