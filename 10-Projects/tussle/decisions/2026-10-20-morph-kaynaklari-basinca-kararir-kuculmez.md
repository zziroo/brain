---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, gecis, basma, kart, gorsel]
source: "oturum 2026-10-20 akşam (mobil-playus: ilk açılış takılması ve geçiş düzeltmeleri)"
---

# Karar: ekrana/sheet'e dönüşen öğeler basınca küçülmez, hafifçe kararır

## Bağlam
Oda kartına dokununca kart `.97` ölçeğe küçülüyor, karttan odaya ortak öğe geçişi bu küçülmüş hâlden yakalanıyordu: kontur 2 px yerine 1,94 px uçuyor, kapak ölçeği iki kez uygulanıyor, ilk dokunuşta (açılış yavaşken kart uzun süre basılı kaldığı için) geçiş "kasıyormuş gibi" görünüyordu. Yusuf'un sezgisi ("belki de tüm sebep başından beri buydu") ölçümle doğrulandı.

## Karar
- Bir ekrana ya da sheet'e morph olan her kaynak (`press-tint`): ana sayfa oda kartı ve Oyna düğmesi, üst çubuk avatarı, bugün bandının ▶'ı, podium ve üye satırları, profil rekor kapağı → basınca `filter: brightness(.92)` (`--press-dim`), transform yok.
- Morph yapmayan sıradan düğmeler ölçekle basmaya devam eder.
- `settlePress` (yakalamadan önce transform'u sıfırlama) yedek olarak kalır.
- Kural `docs/VISUAL.md` basma bölümünde.

## Reddedilen alternatifler
- Yalnız yakalamadan önce ölçeği sıfırlamak (`settlePress`): geometri düzeldi ama ilk karede ~3 px görünür dönüş kaldı.
- Basılı geometriden morph başlatmak: kapak ölçeği ve kontur kalınlığı hedefle eşleşmiyor.

## İlgili
- [[2026-10-20-tussle-ilk-acilis-takilmasi-gecisler]] · [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]]
