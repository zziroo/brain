---
type: lesson
project: ziroo-vpn
date: 2026-10-20
status: active
tags: [xray, reality, sing-box, hiddify, ml-kem, uyumluluk]
source: "ziroo-vpn: kurulum oturumu (proje klasörü, 2026-10-20)"
---

# Xray v26.9.8 ve sonrası Reality sunucusu sing-box/Hiddify istemcilerini sessizce reddediyor

## Ne oldu
3x-ui v3.10.2 sunucuya Xray 26.10.10 kurdu. Mac'ten sing-box 1.14.3 ile Reality denenince her seferinde `reality verification failed` çıktı. Hysteria2 çalışıyordu, Xray istemcisiyle Reality de çalışıyordu.

## Sebep
- Xray v26.9.8, REALITY kütüphanesinde ClientHello'da `X25519MLKEM768` anahtar paylaşımı istemeye başladı. Bu paylaşım düz X25519'dan önce gelmeli.
- sing-box, Reality istemcisinde bu paylaşımı göndermeden önce siliyor. Sunucu el sıkışmayı yetkisiz sayıp sessizce hedef siteye (intel.com) yönlendiriyor; istemci de doğrulama hatası veriyor.
- Kaynak: [sing-box #4520](https://github.com/SagerNet/sing-box/issues/4520) (açık, düzeltme bir fork'ta hazır, birleştirilmedi).
- Ayrıca v26.7.11'den beri `minClientVer` boşsa sunucu kendiliğinden 26.3.27 istiyor; eski sürüm bildiren istemciler (mihomo 1.8.2) düşüyor.

## Ne yaptık
- Sunucu Xray'i panel API'siyle **v26.7.28**'e indirildi (`installXray/v26.7.28`). ML-KEM kontrolünden önceki son sürüm. Hem sing-box hem Xray istemcisi bağlandı.
- Reality ayarında `minClientVer: "1.0.0"`. Tek başına ML-KEM sorununu çözmüyor, ama v26.7.11+ sürüm kontrolünü etkisiz bırakıyor.
- Bedeli: 26.9.8'deki Reality bellek sızıntısı düzeltmesi yok.

## Ders
- Reality'yi yeni Xray'le kurunca **sing-box tabanlı bir istemciyle de** test et (Hiddify, sing-box, Karing). Xray istemcisiyle geçmesi yetmez.
- **3x-ui panelinden Xray'i güncelleme;** `x-ui update` sonrası Xray sürümünü kontrol et. sing-box #4520 kapanınca Xray tekrar en yeni sürüme alınabilir. İstemci artık Happ (Xray çekirdekli) olduğu için risk düştü, ama sing-box kullanan biri kalırsa kırılır.
- Hata ayıklarken: istemci tarafındaki `reality verification failed`, sunucunun el sıkışmayı reddettiği anlamına gelir. Anahtar ve short ID eşleşiyorsa sebep sürüm ya da ClientHello uyumsuzluğudur.

## İlgili
- [[2026-10-20-3x-ui-hysteria2-reality-happ-istemci]] · [[10-Projects/ziroo-vpn/_overview|ziroo-vpn]]
