---
type: decision
project: ziroo-vpn
date: 2026-10-20
status: active
tags: [vpn, 3x-ui, xray, hysteria2, reality, happ, split-tunneling]
source: "ziroo-vpn: kurulum oturumu (proje klasörü, 2026-10-20)"
---

# Karar: sunucuda 3x-ui (Hysteria2 + Reality), istemci Happ; Türk siteleri yönlendirmesi sunucudan gönderiliyor

## Bağlam
Frankfurt sunucusu açıldı ([[2026-10-20-kendi-vpn-ayri-frankfurt-sunucusu-hazir-istemci]]). Yığın ve istemci seçilecekti: gizli bir yedek protokol, hızlı bir UDP protokolü, kişi başı abonelik linki, Türk sitelerinin VPN dışında kalması, dört platformda hazır istemci.

## Karar
- **Sunucu:** 3x-ui v3.10.2 (Xray-core). İki bağlantı:
  - **Hysteria2:** UDP 443, günlük kullanım. Let's Encrypt IP sertifikası; probe edilince intel.com'u gösteren masquerade.
  - **VLESS + Reality:** TCP 443, yedek, kılık hedefi `www.intel.com`.
- **İstemci:** Happ (iOS, Android, macOS masaüstü DMG, Windows). Hiddify'dan Happ'e geçildi.
- **Yönlendirme sunucudan:** 3x-ui `subEnableRouting` + `subRoutingRules`, abonelik yanıtında `Routing: happ://routing/onadd/<base64>` başlığı.
  - Profil adı `ziroo-tr`. Sıra block → proxy → direct.
  - Engellenen servisler (Discord, X, Instagram, WhatsApp, Telegram, Reddit…) her zaman VPN'den.
  - Türk siteleri (.tr, Trendyol, Hepsiburada, Getir…) ve `geoip:tr` doğrudan.
  - YouTube doğrudan: engelsiz, Türkiye'deki önbellekten hızlı, kota yemiyor. Kriz döneminde proxy listesine alınır.
  - Kalan her şey VPN'den.
- **Xray sürümü sabit: v26.7.28.** Bkz. [[2026-10-20-xray-26-9-reality-sing-box-istemcileri-reddediyor]].

## Neden
- **3x-ui:** Dört aday içinde en aktif proje (48k yıldız, haftalık sürüm, GPL-3.0). Hysteria2, TUIC, AmneziaWG (v3.7.0'dan beri) ve Reality'nin hepsi tek panelde, kişi başı abonelik var. Happ için yönlendirme başlığını doğrudan destekliyor. "3x-ui AmneziaWG sunmuyor" bilgisi eskimişti.
- **Happ:** Hiddify'a kendi kural listemizi vermek mümkün değil ([hiddify-app #2067](https://github.com/hiddify/hiddify-app/issues/2067), "not planned").
  - Hiddify'ın `tr` bölge listesi 145 alan adı. Trendyol, Hepsiburada, bankalar yok; Cloudflare'deki Türk siteleri VPN'den çıkıyordu.
  - Happ'te listeyi biz yönetiyoruz, herkese abonelik güncellemesiyle kendiliğinden gidiyor.
  - Happ Xray çekirdekli, Reality ML-KEM sorunu yok. Mac masaüstü sürümünde Xray TUN sudo istemeden çalışıyor.
- **Hysteria2 günlük:** Discord sesi ve görüntülü görüşme UDP'yi seviyor. Reality'yle hız aynı (~90 Mbit, sunucu hattı ~100 Mbit sınırlı).

## Reddedilen alternatifler
- **Hiddify (istemci):** Özel kural yok. Mac sürümünde VPN (TUN) modu ancak sudo ile açılıyor ([#2058](https://github.com/hiddify/hiddify-app/issues/2058)). Proxy modunda doğrudan bağlantılarda IPv6'yı önce deniyor, turkiye.gov.tr 10 sn takılıyor. iOS sürümü Mac'te çalıştırılınca doğrudan yol hiç çalışmıyor.
- **Hiddify Manager:** Daha ağır, çoğu özelliği alan adı istiyor.
- **s-ui (sing-box paneli):** Daha küçük topluluk; Happ yönlendirme entegrasyonu yok.
- **Amnezia:** Panel ve kişi başı abonelik yok, Türk sitesi kuralı zor.
- **Clash Verge Rev / FlClash (mihomo, açık kaynak):** Mac, Windows ve Android'de iyi. iOS'ta ücretsiz iyi karşılığı yok. Tek uygulama tercih edildi.
- **AmneziaWG üçüncü protokol:** Şimdilik yok. Happ'in ortak linki taşımıyor, ayrı Amnezia uygulaması gerekir.

## Sonuçlar / riskler
- Happ kapalı kaynak (Flyfrog LLC), ama ücretsiz ve aktif (Ekim 2026'da haftalık sürüm). İleride sorun çıkarsa mihomo istemcileri yedek.
- Mac ve Windows'ta DNS yerel modeme ayarlıysa sorgular tünele girmiyor. Bkz. [[2026-10-20-mac-vpn-istemcisi-tuzaklari]].
- Kural listesinin kaynağı sunucuda `/root/routing-profile.json`. Değişince base64 deeplink olarak `subRoutingRules`'a yeniden yazılır.

## İlgili
- [[10-Projects/ziroo-vpn/_overview|ziroo-vpn]] · [[2026-10-20-ziroo-vpn-kurulum-oturumu]]
