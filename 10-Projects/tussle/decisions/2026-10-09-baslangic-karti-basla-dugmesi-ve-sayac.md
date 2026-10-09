---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, ui, baslangic, erisilebilirlik]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri)
---

# Karar: Oyun, nasıl oynanır kartındaki "Başla" düğmesiyle başlar; ardından sahanın üstünde 3-2-1 döner

## Bağlam
Eski otomatik 3-2-1 sırasında nasıl oynanır metni okunamıyordu. İlk çözüm (kart + "Dokun, başla", ekranın her yerine dokunma, 0,3 sn sonra başlama) telefonda denendi: Yusuf sahayı göremeden oyunun başladığını, ekranın her yerine dokununca başlamasının istenmediğini söyledi.

## Karar
- Kart: kapak üstünde oyunun hareketini (meta.gesture: tap, tap-target, hold, drag-x, drag, tap-swipe) gösteren CSS hayalet el, büyük nasıl oynanır cümlesi, tek düğme "Başla" (Boşluk/Enter da). Ekranın geri kalanı bir şey yapmaz.
- Basınca kart 0,24 sn'de söner, saha görünür, üstünde 3-2-1 (0,6 sn'lik adımlar, sesli); toplam ~2 sn; girdi kapalı. Aynısı "Devam et" kartında.
- Nasıl oynanır metnindeki hareket kelimeleri sözlükte `*işaretli*` ve kartta vurgu renginde ("Sağa sola *sürükle*").

## Neden
Okuma zamanı oyuncuda; sayaç başlamadan sahayı ve konumu gösterir; renkli fiil kuralı bir bakışta anlatır.

## Reddedilen alternatifler
- Ekranın her yerine dokunarak başlama: istenmeyen başlangıçlar (Yusuf).
- Dokunduktan hemen sonra başlama: saha görülmüyor (Yusuf).
- Kelimeleri meta.ts'de işaretlemek: diğer görünümlere yıldız sızar; işaret yalnız sözlükte, düz metin `stripMarks`.

## İlgili
- [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]
