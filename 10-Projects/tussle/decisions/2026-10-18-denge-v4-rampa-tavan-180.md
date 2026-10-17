---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, oyun, denge, zorluk]
source: oturum 2026-10-17 gece (mobil-playus), YOSEF geri bildirimi
---

# Karar: Denge v4, rüzgâr tavandan sonra da artar, teknik tavan 180 sn

## Bağlam
YOSEF Denge'yi 90 saniyede (teknik tavan) bitirdi, "kolay" dedi. v3'te üst güç 40 s'de tavana ulaşıp sabit kalıyordu; sonrası yalnız gust kısalması ve wobble.

## Karar
rampSec sonrası üst güç her 20 s'de windCap'in %15'i kadar artar, en çok 2× (yaklaşık 173. sn); CAP_SEC 90 → 180; meta.version 4 (eski skorlar karşılaştırılmaz). 400 tohumlu bot tablosu: eğilime karşı bot medyan 53 s (en uzun 112), orta PD medyan 69 s ve hiç tavana ulaşmıyor, becerikli PD %10 tavan, mükemmel bot 180.

## Neden
Sonsuz his korunmalı ama gerçek oyuncu tavana ulaşmamalı; duvar yerine yavaş ikinci rampa.

## Reddedilen alternatifler
- Tavanı kaldırmak: kayıt boyu ve canlı kapışma bekleme süresi sınırsız olurdu.
- Rampayı sertleştirmek (rampSec kısaltmak): başlangıç zorlaşır, yeni oyuncuyu kaçırır.

## Sonuçlar / riskler
Canlı kapışmada eksik log beklemesi bu oyunda ~4 dk'ya çıkar (maxTicks'ten türüyor); kabul edildi. Telefonda "sonlara doğru zorlaşma" hissi henüz doğrulanmadı.
