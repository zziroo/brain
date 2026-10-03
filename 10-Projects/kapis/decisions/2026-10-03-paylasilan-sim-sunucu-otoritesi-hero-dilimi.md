---
type: decision
project: kapis
date: 2026-10-03
status: active
tags: [kapis, mimari, simulasyon, ajan]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa); docs/ARCHITECTURE.md
---

# Karar: paylaşılan deterministik sim + sunucu otoritesi + kahraman başına dikey dilim

## Bağlam
Altı kahramanlı bir hero-shooter'ı paralel çalışan ajanlarla, dosya çakışması olmadan ve ağda tutarlı hissettirerek yazmak gerekiyordu.

## Karar
- Simülasyon istemci ve sunucuda aynı kodla çalışan deterministik 60 Hz paylaşılan modül. Sunucu otoriter; istemci tahmin + uzlaştırma yapar, sunucu lag telafisi uygular.
- Bir kahraman = `shared/heroes/<id>.ts` + `server/heroes/<id>.ts` + `client/heroes/<id>.ts` + birer kayıt satırı. Yeni kahraman yalnız kendi dosyalarına ve kayıt satırlarına dokunur.

## Neden
- Paylaşılan sim, tahmin hatasını (rubber-band) en aza indirir.
- Dikey dilim sayesinde paralel ajanlar dosya çakışmadan çalıştı.

## Reddedilen alternatifler
- Oyuncu-oyuncu çarpışması: istemci tahminini bozar.
- Fizik motoru: AABB + step-up yetti.
- İkili protokol: JSON 12 oyuncuda ~0,8 KB tuttu, gerek yok.

## Sonuçlar / riskler
Kayıt dosyaları küçük ortak dikiş noktası olarak kalıyor; çakışma riski orada (kurallar `docs/DESIGN.md` §3).

## İlgili
- [[_overview]], [[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]], [[2026-10-03-simulasyon-ve-guvenlik-kararlari]]
