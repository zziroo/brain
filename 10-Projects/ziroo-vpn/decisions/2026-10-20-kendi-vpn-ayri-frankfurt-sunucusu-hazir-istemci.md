---
type: decision
project: ziroo-vpn
date: 2026-10-20
status: active
tags: [vpn, sunucu, lightnode, frankfurt, sansur]
source: "ZZ kök oturumu 2026-10-19/20 (araştırma: kendi VPN'imiz)"
---

# Karar: VPN ayrı bir Frankfurt sunucusunda, hazır istemci ve abonelik linkiyle; kendi uygulama yazılmıyor

## Bağlam
Türkiye'de Discord engelli, kriz dönemlerinde Twitter gibi siteler engelleniyor ya da yavaşlatılıyor. Yusuf kendisi ve arkadaşları için Surfshark kalitesinde, genel kullanıma uygun kendi VPN'ini istedi.

## Karar
- **Sunucu:** ayrı LightNode VPS, Frankfurt, CPU Shared 1 vCPU / 2 GB, Ubuntu 24.04, SSH anahtarı. Yusuf'un mevcut LightNode hesabında saatlik faturalı.
- **Yazılım:** hazır sunucu paneli + hazır istemciler (Hiddify / sing-box / v2rayN), kişi başı abonelik linki. İki protokol: Reality (gizli, yedek) + hızlı UDP protokolü. Türk IP'leri VPN dışında.

## Neden
- **Frankfurt:** Discord'un Avrupa ses sunucuları Frankfurt/Amsterdam civarında; Sofia üzerinden de toplam gecikme ~50 ms, fark yok. Frankfurt büyük internet merkezi, siteler "normal" Batı içeriği gösterir. Genel kullanım (Twitter, YouTube) için en dengelisi.
- **Ayrı sunucu:** mevcut VPS İstanbul'da (çıkış Türkiye'den, engel aşılmaz) ve VPN IP'si işaretlenirse üzerindeki ziroo.net ve Diskort da gider.
- **Hazır istemci:** tünel çekirdeği zaten hazır (Xray, sing-box, WireGuard); asıl yük engelleme yöntemleri değiştikçe güncel kalmak, bunu topluluk yapıyor. Abonelik linkiyle sunucu tarafında yapılan değişiklik herkese kendiliğinden gider.
- **İki protokol:** kriz dönemlerinde bilinen VPN protokolleri de yavaşlatılıyor; Reality sıradan HTTPS gibi göründüğü için en sıkı dönemde bile genelde çalışır.

## Reddedilen alternatifler
- **Kendi uygulamamızı yazmak:** iOS'ta VPN uygulamasını App Store'a koymak şirket hesabı ister (bireysel olmaz), 99 $/yıl; dört platformda bakım. Ürün olarak satılacaksa yeniden düşünülür; ara yol Amnezia'yı (GPL) kendi markasıyla derlemek.
- **Mevcut İstanbul VPS'ine kurmak:** yukarıdaki iki sebep.
- **Sofia / Bucharest:** Discord için fark yok; bazı siteler Bulgarca/Romence içerik ve farklı katalog gösterir. Yalnız Türkiye'ye yakın oyun sunucularına ping önemliyse.
- **Yalnız Amnezia uygulaması:** kolay, ama Türk sitelerini doğrudan gönderme kuralı ve arkadaşlara dağıtım panel + abonelik linkinde daha rahat. Kurulumda yeniden karşılaştırılabilir.
- **Sunucusuz DPI atlatma (zapret, GoodbyeDPI, SpoofDPI):** Discord metni için çoğu zaman yeter, ses/mobil ve genel kullanım için zayıf. Acil yedek olarak akılda dursun.
- **Plain WireGuard tek başına:** hızlı ama imzası belli, yavaşlatılabilir.

## Sonuçlar / riskler
- Tek IP Yusuf'a ait: Surfshark'tan daha az anonim (amaç anonimlik değil, erişim).
- Trafik kotası birkaç kişide dolabilir; kotaya göre plan büyütülür.
- IP engellenirse yeni IP / yeni VPS gerekir; abonelik linki geçişi kolaylaştırır.

## İlgili
- [[10-Projects/ziroo-vpn/_overview|ziroo-vpn]] · [[vps-makinesi]] · [[sunucu-lightnode-istanbula-tasindi]]
