---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [oyun, basket, denge]
source: oturum "tussle: Basket çekme menzili" (2026-10-18), dal basket-pull-range a010d20
---

# Karar: Basket v3'te çekme gücü 1,5 kat arttı, topdan alta çekiş her potaya yetişir

## Bağlam
Yusuf mini motorda Basket'te en alta kadar çekince bile potaya yetişemediğini söyledi. Motor değil, oyunun menzili: top alanın %83'ünde, parmak alanla sınırlı, topdan dibe en fazla ~0,30 genişlik çekiş; POWER 0,1 ile tepe ~0,58, ilk pota ~0,64, en yüksek ~0,93 istiyor. Yalnız yukarıdan başlayan çekişler ("her yerden çek") çalışıyordu. Web/iOS'ta da aynı.

## Karar
`POWER` 0,1 → 0,15, `MAX_PULL` 0,5 → 0,34 (en yüksek hız aynı ~0,05). `meta.version` 3. Topun ortasından alan dibine çekiş, 9 tohumda en yüksek çemberi 0,3+ genişlikle aşar. Nişan çizgisi `pull*POWER` kullandığı için view değişmedi. Testler: dibe çekiş her potayı aşar; seviye 0 ve en yüksek seviyede topdan dibe çekiş basket olur (eski değerlerle ikisi de düşer). 18 Eki akşam main'e birleşti (`1e2852d`, inceleme düzeltmeleri `c05e072`), `624c6e0` ile yayında; telefonda his testi hâlâ bekliyor (inceleme: bot hata ölçeği iyimser, sabit parmak hatasında orta oyuncu daha düşük).

## Neden
Tek düğme, oyunun görünümü ve yerleşimi aynı kalır; en yüksek hız değişmediği için "her yerden çek"en oyuncular için üst sınır aynı.

## Reddedilen alternatifler
- Topu yukarı taşımak (BALL_Y ~0,76): hassasiyet aynı kalırdı ama sahne yerleşimi değişir, potalar yaklaşır (oyun kolaylaşır).
- Parmağın alanın altına taşmasına izin vermek: girdi sıkıştırması tüm oyunlarda ortak (`src/client/input.ts`, kayıt 0..1); tek oyun için ortak katmanı değiştirmek gerekir, 16:9 ekranda alan altında yer yok.
- Doğrusal olmayan çekiş: karmaşık, uzun çekişte hassasiyet yine artar.

## Sonuçlar / riskler
- Aynı atış 1,5 kat kısa çekiş: piksel başına hassasiyet arttı. Bot hatası çekiş boyuyla ölçekli kabul edilince medyanlar v2'ye yakın (orta 14 → 11, iyi 40 → 41, ideal 103 → 101); hata piksel olarak sabit kalırsa orta 5'e, iyi 32'ye düşer. **Telefonda his testi gerekli** (doğrulanmadı).
- Parmak topun alt kenarından başlarsa en yüksek pota hâlâ sınırda.
- Android mini motor sim'i ayrı paketliyorsa o dal da bu sim'i almalı.

## İlgili
- [[2026-10-18-tussle-basket-cekme-menzili]]
- [[2026-10-18-tussle-mini-motor-faz-1]]
- [[2026-10-15-yayin-1-kural-ve-denge-turu-arkadas-geri-bildirimi]]
