---
type: decision
project: tussle
date: 2026-10-09
status: superseded
tags: [tussle, sans-hakki, sosyal, sunucu]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri)
---

# Karar: Hakları biten oyuncu günde bir kez yazı tura atar; kazanırsa bir deneme daha

## Bağlam
Yusuf: hakları biten ya da tabloda geride kalan biri tekrar oynamak isterse yazı tura gibi şansla bir hak daha verilsin; daha iyi alternatif olursa o.

## Karar
- Günün hakları bitince odada "Şansını dene"; Yazı / Tura seçilir, sonucu sunucu `crypto.randomInt` ile belirler (%50). Kazanırsa o gün +1 normal sayılan deneme.
- Oda/gün/oyuncu başına tek atış (migrasyon 8, `luck` tablosu), requestId ile idempotent.
- Sonuç sohbet akışına otomatik satır olarak düşer. Host ayarı "Şans hakkı" (varsayılan açık).
- "Kötü skor / tabloda düştü" koşulu yok: hakkı biten herkes.

## Neden
Basit kural, %50 adil hissettirir, seçim yapmak oyuncuya sahiplik verir; akış satırı odada konuşma yaratır.

## Reddedilen alternatifler
- 3 kutudan biri: Kutu Seç zaten oyun olarak var; yazı tura daha adil hissettiriyor.
- Koşullu (kötü skor / düşen sıra): kuralı karmaşıklaştırır, öndekini risk almaktan alıkoyar.
- Bardak oyunu (Top Nerede) şans mekaniği olarak: beceri işi; ayrı oyun oldu.

## Sonuçlar / riskler
Host deneme sayısıyla oynayıp erken atma açığı vardı; günün kurallarının donmasıyla kapandı ([[2026-10-09-puanlama-sabit-gunun-kurallari-donar]]).

## İlgili
- [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]
