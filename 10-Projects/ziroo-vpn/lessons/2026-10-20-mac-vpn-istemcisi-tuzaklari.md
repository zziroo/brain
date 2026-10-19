---
type: lesson
project: ziroo-vpn
date: 2026-10-20
status: active
tags: [vpn, macos, dns, hiddify, happ, tun]
source: "ziroo-vpn: kurulum oturumu (proje klasörü, 2026-10-20)"
---

# Mac'te VPN istemcisi: iPhone sürümü, sudo isteyen TUN ve yerel DNS'in tüneli atlaması

## Ne oldu (sırayla)
1. **iPhone sürümü Mac'te:** Hiddify App Store'dan kurulunca Apple Silicon Mac'e iPhone uygulaması gelmiş (`Runner.app`, `DTPlatformName=iphoneos`).
   - Tünel çalıştı, ama "doğrudan" yol çalışmadı: Türk IP'li siteler 0,08 sn'de reddedildi.
   - Tarayıcıda siteler açılmadı, Discord sesi bağlanmadı.
2. **Hiddify'ın Mac sürümü (DMG 4.1.1):**
   - Varsayılan mod sistem proxy'si. Discord sesi bu modda da çalıştı: ses UDP'si doğrudan gidiyor, Discord ses sunucuları engelli değil.
   - VPN (TUN) modu `configure tun interface: operation not permitted` ile çöktü; yalnız sudo ile açılıyor ([#2058](https://github.com/hiddify/hiddify-app/issues/2058)).
   - Proxy modunda doğrudan bağlantılarda IPv6 önce deneniyor, IPv6 yolu olmayan hatta 10 sn takılıyor. "IPv6 rotası: devre dışı" bunu düzeltmiyor.
   - Hiddify kapanınca sistem proxy ayarı (127.0.0.1:12334) açık kalıyor, tarayıcıda internet kesiliyor.
3. **Happ masaüstü (DMG 4.5.4), Xray TUN modu:** sudo istemeden çalıştı. Ama `dig discord.com` hâlâ engel IP'sini (195.175.254.2) döndürdü.
   - Sebep: Mac'in DNS'i modemdi (192.168.1.1). Yerel ağdaki adres TUN rotasının dışında kalıyor, sorgular tünele hiç girmiyor.

## Çözüm
- Mac'te ve Windows'ta istemcinin **masaüstü sürümü** kurulmalı, App Store'daki iPhone/Catalyst sürümü değil.
- DNS'i internetteki bir sunucuya çevir, sonra önbelleği temizle:
  ```bash
  networksetup -setdnsservers Wi-Fi 1.1.1.1 8.8.8.8
  ```
  ```bash
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
  ```
  Böylece sorgular tünele girer, Happ yönlendirir. Telefonda gerek yok: iOS ve Android VPN profili DNS'i kendisi yakalıyor.

## Test yöntemi (işe yarayanlar)
- **Sitenin seni nereden gördüğü:** `https://<cloudflare-sitesi>/cdn-cgi/trace` `ip=` ve `loc=` verir. Trendyol (TR) ve x.com (DE) ile bölünmüş tünel tek komutla doğrulanır.
- **UDP gerçekten tünelden mi:** STUN isteği (stun.cloudflare.com:3478). Cevaptaki adres sunucu IP'si olmalı. `dig` testi yanıltır, çünkü istemci DNS'i yakalar.
- **Ağ arayüzünü atlayarak doğrudan test:** `curl --interface en1 …`
- **TUN açıkken ping ve TCP-connect süreleri sahte:** ~0,2 ms. Gerçek gecikmeyi bunlarla ölçme.
- **zsh tuzağı:** `X="-x http://…"; curl $X` kelimelere bölünmez, curl'e tek argüman gider. Proxy'yi değişkenle değil, doğrudan `-x` ile ver.

## İlgili
- [[2026-10-20-3x-ui-hysteria2-reality-happ-istemci]] · [[10-Projects/ziroo-vpn/_overview|ziroo-vpn]]
