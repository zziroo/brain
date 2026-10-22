---
type: lesson
project: diskort
date: 2026-10-01
status: active
tags: [diskort, ses, yayin, udp, saglayici, teshis]
source: Claude Code oturumu 2026-10-01; hat testi kayıtları (line-tests.jsonl, netsec)
---

# Sağlayıcı gelen UDP'yi paket sayısına göre kesiyordu; "herkes kırmızı ama ping normal" bunun imzası

## Belirti
Yayıncı pencereyi hızlı oynatınca herkesin yayını donuyor, sesler duruyor, bağlantı göstergesi kırmızı, ms artmıyor. Bazen hiç olmuyor.

## Kök neden
isimkayit VDS'inde sunucuya gelen UDP ~1400 paket/sn'yi geçince gelen bütün UDP düşürülüyor (kaynaktan bağımsız; DNS yanıtları dahil). TCP ve çıkan trafik sağlam. Trafik düşünce 1–2 sn'de düzeliyor. Eşik paket sayısına göre: 12 Mbps / 1250 pk/sn geçti, 4 Mbps / 2000 pk/sn kesildi. 1080p60 yayın tek başına ~1250 pk/sn; hareket sıçraması + sesler eşiği aşıyor.

## Nasıl bulundu
1. Saniyelik sunucu ağ kaydı: çöküşten önceki saniyelerde gelen 1385–1494 pk/sn, sonra tek haneye düşüş; ağ kartı düşüşü 0.
2. Hat testi paket hızı profili (`tools/udp-probe`, 250→6000 pk/sn): 2000 adımında yükleme %100 kayıp; aynı saniyelerde sunucunun UDP sondaları kayıp, TCP sondaları sağlam. İki koşuda aynı.

## Dersler
- **Gösterge yalnız giden kayba ve pinge bakar;** ping, yanıt alınan son STUN ölçümünde takılı kalır. Kayıp + sabit ping = paketler gecikmiyor, düşürülüyor (kuyruk değil süzgeç).
- **Sunucu sayaçları temizse ve herkes aynı anda etkileniyorsa** sorun sanal makinenin önündedir; içeriden düzeltilemez.
- **Sağlayıcı seçerken sormak yetmez, ölçmek gerekir.** Saatlik sunucu aç, paket hızı testini çalıştır, sonra karar ver. Basit yol: sunucuda saniyelik UDP sayacı, istemciden kademeli gönderim.
- **Yalnız UDP'yi etkileyen kesinti sonda motorundan kaçabiliyor:** araya giren TCP sondaları art arda kayıp serisini bozuyor (2. koşu kayda geçmedi). UDP ve TCP serileri ayrı sayılmalı — 2026-10-22'de yapıldı (`probe.proto`, [[2026-10-22-sonda-serisi-sinirsiz-buyume-ve-yeniden-oynatma-sira-yapayligi]]).
- Yerel DNS vekili (dnscrypt-proxy) taşıma sonrası eski adresi önbellekte tutabilir; sorun sunucuda değildir.

## Açıklanmayan
2026-10-01 03:18'de sunucu boştayken 4 sn hem UDP hem TCP kesildi; bu eşikle açıklanmıyor.

## İlgili
- [[sunucu-lightnode-istanbula-tasindi]] · [[ses-kalitesi-udp-kayiplari]] · [[2026-10-01-baglanti-teshisi-sadelestirme]]
