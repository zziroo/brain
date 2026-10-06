---
type: lesson
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, denge, bot, test]
source: oturum fb8e3060 (incremantal-game); pervane ayarı, commit 1773c16
---

# Ders: bir tehdidi hiç karşılamayan bot onu vergi gibi öder; tehdit kaçılabilir olunca kusursuz bot büyük kazanır. Dengeyi insana yakın bota göre kur

## Ne oldu
Eski pervane güdümlüydü. Kusursuz bot onunla hiç uğraşmıyordu; yağının ~%12'sini sabit bir vergi gibi ödüyordu.

Pervane kaçılabilir hâle gelince kusursuz bot onu ya yaktı ya kaçtı. Oyunu 3 sefer kısaldı, özensiz botunki ise neredeyse hiç değişmedi.

Uygulama ajanı kusursuz botu eski uzunluğa geri çekmek için pervaneyi sertleştirdi: can ×1,2, ısırık %8. Bu sefer özensiz bot ormanda daha fazla yağ kaybetti (%23 → %27). Bu, Yusuf'un "pervane fazla güçlü" şikâyetinin tam tersiydi.

## Ders
- Bir mekaniği beceriye açınca kusursuz bot ile insan arasındaki fark büyür. Kusursuz botun toplam uzunluğunu sabit tutmaya çalışmak, insanı cezalandırır.
- Oyuncunun hissine dokunan ayarları özensiz bota (`"bot":"sloppy"`) göre yap. Hedefi bölge bölge koy, örneğin "özensiz bot ormanda yağının %10–15'ini pervaneye kaybetsin". Toplam uzunluk ise genel ayarla (`TIER_SCALE`) sonra düzeltilir.
- Ajan rapor ettiğinde iki botun sayılarını yan yana iste. Tek bir ortalamaya bakmak yanıltıcı.
- Aynı yöntem Kurukafa'da da işe yaradı: özensiz botun orman kaybı %19'dan %15'e indi.

## İlgili
- [[2026-10-06-pervane-doner-sonra-dalar]]
- [[2026-10-05-denge-tier-scale-ile-eski-tempoya-donus]]
