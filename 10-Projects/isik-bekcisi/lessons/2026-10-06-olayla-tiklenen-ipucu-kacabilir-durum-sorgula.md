---
type: lesson
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, ogretici, ipuclari, inceleme]
source: oturum 2026-10-06 (incremantal-game, kamera + fener nöbeti), Fener Nöbeti inceleme bulgusu
---

# Olayla tiklenen ipucu, ipucu açılmadan olay geçerse hiç öğrenilmez; başlangıç durumunu sorgula

## Ne oldu
Nöbet ipucunun ilk satırı `siegeStart` olayıyla tikleniyordu. Fener N. karede hazır oluyor, ipucu o karede kuyruğa giriyor, nöbet N+1. karede başlıyor. Araya başka bir ipucu, dinlenme süresi ya da bekletme girerse olay ipucu açılmadan geçiyor; satır asla tiklenmiyor, ipucu 15 sn sonra sönüp üç denemede "görüldü" sayılıyor. İnceleme ajanı yakaladı; düzeltme ilk satırı duruma bakan bir poll yapmak (`() => !!R.siege`). İkinci satır da fenerin kendi patlamasının ürettiği olayla tikleniyordu (oyuncu bir şey yapmadan öğrenilmiş sayılıyordu); olayın kaynağı süzüldü.

## Ders
- Bir ipucunun ilk adımı "X başladı" ise onu olayla değil durumla tikle: olay bir kez geçer, durum okunabilir kalır.
- Olayla tiklenen satırda olayın kaynağına bak: aynı olayı oyun kendi de üretebilir (otomatik patlama, zincir), o zaman "yaparak öğrenme" boşa çıkar.
- İnceleme ajanına ipuçları için "bu olay ipucu açılmadan önce geçebilir mi, oyun bu olayı kendi üretebilir mi" sorusunu açıkça sor.

İlgili: [[2026-10-04-yaparak-ogren-ipuclari-oyunu-durduran-kart-yerine]], [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
