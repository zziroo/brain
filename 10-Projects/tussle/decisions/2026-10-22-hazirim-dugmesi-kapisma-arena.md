---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, kapisma, arena, baslama-akisi]
source: Claude Code oturumu "tussle: arena oyunları kısa ve etkileşimli"
---
# Karar: kapışma ve arena maçı dolunca kart "Hazırım" düğmesiyle bekler; parti gecesi otomatik kalır

## Bağlam
Maç dolunca 5 sn içinde başlıyordu; nasıl oynanır kartı 1–2 sn görünüp gidiyordu (Yusuf + Melih: oyunlar anlaşılmadan başlıyor).

## Karar
Maç dolunca `live` ama `go_at NULL`, `ready_until = now+20 sn`. Kart ekranda kalır, altında Hazırım düğmesi (basınca yanar, tekrar basınca söner), "Hazır n/m · s" satırı. Herkes hazır olunca ya da 20 sn dolunca sunucu `go_at = now + 3 sn` verir, 3-2-1 başlar. Beklemede ayrılan hükmen yenilmez; 2'den az kalırsa iptal. Parti gecesi akışı otomatik kalır. ⓘ yok.

## Neden
Kapışma/arena'da herkes zaten aynı anda bekliyor; düğme tempoyu oyuncuya bırakır. Zaman aşımı basmayan birine takılmayı önler (davetle gelen taraf uygulamadan çıkmış olabilir). Partide düğme en yavaş kişiyi bekletir, gece tempoyu kaybeder.

## Reddedilen alternatifler
- Düğme yok, kartı 8 sn'ye uzatmak: tecrübeli oyuncuya her seferinde bekleme.
- `open` durumunda beklemek: istemci oyun ekranını yalnız `live`'da açıyor, kart (nasıl oynanır) ekranın içinde; `live + go_at NULL` evresi daha az dokunuş.
- Parti'de ilk görülen oyunda uzun kart: rafta, gerekirse sonra.

## Sonuçlar / riskler
Beklemede ekranı kapatan koltuğunu korur, karttan "Oyna" ile döner; hiç dönmezse maç onunla başlar (ürün kararı açık). Eski istemci goAt'siz kartı açmaz, karttan Oyna gerekir (test aşaması).

## İlgili
- [[2026-10-22-tussle-hazirim-dugmesi-bekleme-evresi]]
