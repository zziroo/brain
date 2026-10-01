---
type: decision
project: diskort
date: 2026-10-01
status: active
tags: [diskort, sunucu, saglayici, udp, tasima]
source: Claude Code oturumu 2026-10-01 (bağlantı teşhisi + taşıma)
---

# Karar: sunucu isimkayit'ten LightNode İstanbul'a taşındı

## Bağlam
Yayında pencere hızlı oynatılınca herkesin sesi ve yayını duruyor, gösterge kırmızı oluyor, ping artmıyordu. Hat testiyle iki kez tekrarlandı (2026-10-01 14:55 ve 14:59 TSİ): eski sunucuya (185.92.0.242) gelen UDP saniyede ~1400 paketi geçince gelen TÜM UDP kesiliyor; TCP ve çıkan trafik etkilenmiyor; sunucunun ağ kartında düşüş yok. Ayrıntı: [[saglayici-udp-paket-siniri]].

## Karar
Sunucu LightNode "Istanbul II" bölgesine taşındı: KVM, CPU Shared 2 vCPU, 4 GB, 50 GB, Ubuntu 24.04, saatlik faturalı (~14 $/ay), trafik paketi 1000 GB. Yeni IP `38.60.208.88`. Üç DNS kaydı (diskort, lk, turn) Cloudflare'de yeni IP'ye çevrildi.

## Neden
- isimkayit desteği istisna tanımlamayı reddetti ("standart VDS'te IP/port bazlı eşik tanımlanmaz"), sınırı da doğrulamadı.
- Bir medya sunucusu doğası gereği yüksek sayıda UDP paketi alır; tek 1080p60 yayın ~1250 paket/sn.
- LightNode'da satın almadan önce saatlik açıp ölçtük: saniyede 10.000 pakete kadar ve 30 sn boyunca 6000 paket/sn, 295.000 paketin tamamı ulaştı. Gecikme 19 ms (eski 22 ms).

## Reddedilen alternatifler
- **Medyayı TCP'ye almak:** kayıpta tek paket her şeyi bekletir, gecikme birikir; yalnız yedek yol olarak kalmalı.
- **Yayın bit hızını düşürmek (12 → 8 Mbps):** sorunu seyreltir, iki yayında yine aşılır; kalite kararı Yusuf'ta.
- **Gcore İstanbul:** 2 vCPU/4 GB aylık ~35 €, kota başvurusu istiyor.
- **AWS Local Zone İstanbul:** çıkan trafik GB başına ücretli, ~800 GB/ay ile pahalı.
- **Yerli "DDoS korumalı VDS" paketleri:** aynı tür süzgeç, kapatılamıyor.

## Sonuçlar / riskler
- Paylaşımlı işlemci: komşu yükünde ses gecikmesi oynayabilir; telemetriden izlenecek, gerekirse "CPU Exclusive".
- Trafik: kullanım ~800 GB/ay, paket 1000 GB; aşılırsa 2000 GB'a çıkar.
- Yalnız gelen yön ve tek kaynak test edildi; çıkan 40 Mbps ve çok kullanıcılı gerçek yayın henüz denenmedi.
- LightNode görüntüsünde unattended-upgrades maskeli; otomatik güvenlik güncellemesi çalışmıyor.
- Eski sunucu: kapsayıcılar durduruldu, veri yerinde; birkaç gün sorunsuz kullanım sonrası Yusuf silecek.

## İlgili
- [[sunucu-vps]] · [[2026-10-01-baglanti-teshisi-sadelestirme]] · [[saglayici-udp-paket-siniri]] · [[ekran-paylasimi-sabit-presetler]]
