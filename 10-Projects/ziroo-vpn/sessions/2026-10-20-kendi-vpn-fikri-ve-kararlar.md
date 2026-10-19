---
type: session
project: ziroo-vpn
date: 2026-10-20
status: done
tags: [vpn, sunucu, lightnode, karar]
source: "ZZ kök oturumu 2026-10-19/20 (araştırma: kendi VPN'imiz)"
---

# Oturum: kendi VPN'imiz fikri, yön kararları ve proje açılışı

## Ne yapıldı
- VPN'in nasıl çalıştığı, Türkiye'deki engelin iki katmanı (DNS zehirleme + SNI/DPI), statik IP'nin artısı ve eksisi konuşuldu.
- Kendi istemci uygulaması mı, hazır istemci mi tartışıldı: hazır istemci seçildi.
- LightNode'da konum seçimi: Sofia önerildi, sonra genel kullanım (Twitter vb.) gereği Frankfurt'ta karar kılındı.
- Boş duran `zProjects/ziroo-dns-vpn` klasörü bulundu. Mac ve Windows arşivlerinde hiçbir konuşması yok; büyük ihtimalle Yusuf'un açıp unuttuğu bir yer tutucu. Önce bu adla vault projesi açıldı, sonra Yusuf'un isteğiyle `ziroo-vpn` olarak yeniden adlandırıldı (vault `bd75f23`, `5f52d37`).
- İlk kurulum oturumu (ziroo-dns-vpn adıyla) yalnız okuma ve web araması yapmışken durdurulup arşivlendi. Temiz oturum "ziroo-vpn: kurulum" proje klasöründe başlatıldı.

## Alınan kararlar
- [[2026-10-20-kendi-vpn-ayri-frankfurt-sunucusu-hazir-istemci]]

## Öğrenilenler
- Mevcut sunucu LightNode İstanbul'da; VPN gibi IP'si işaretlenebilecek bir servis ona kurulursa ziroo.net ve Diskort'un Türkiye'den erişimi riske girer. Karar notunda işlendi.
- Bu oturumda "3x-ui + Hiddify iki protokolü (AmneziaWG + Reality) de destekler" denmişti; 3x-ui AmneziaWG sunmuyor gibi görünüyor. Doğrulanmadı, kurulum oturumuna doğrulatma görevi verildi.

## Açık kalanlar
- Sunucu satın alınmadı; trafik kotası kontrol edilmedi.
- Sunucu yığını ve hızlı UDP protokolü seçilmedi.
