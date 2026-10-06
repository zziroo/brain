---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, karacik, oyun-hissi, ceza]
source: oturum fb8e3060 (incremantal-game), commit 1773c16; Yusuf'un 2026-10-06 oynama gözlemi
---

# Karar: yapışan karacık bekçiyi yavaşlatır; yağ içmesi fenerde görünür ve duyulur

## Bağlam
Yusuf: "Üzerime atlayan yaratıkların etkisi ışığımı daha hızlı tüketmesi, bu okey ama üst bara bakmadan hissedilmiyor. Ya bunu çözelim ya da bir yavaşlatma etkisi verebilirler."

## Karar
- Her yapışan karacık yürüyüşü %10 yavaşlatır, 4 karacıkta en fazla %40 (`SOOT.drag`). Atılım yavaşlamaz.
- Yağ içme yarıya iner (`SOOT.drink` 0,3 → 0,15). Kalan içme fenerde görünür: alev titrer, cam islenir, yağ damlar. Bir de içme sesi duyulur.
- Fitil göstergesindeki parlama aynen kalır.

## Neden
Oyunun ana fiili yürümek; en çabuk hissedilen ceza da yavaşlamak. Toplam ceza büyümesin diye yağ içme azaltıldı.

## Reddedilen alternatifler
- **Yalnız görsel ve ses eklemek:** ceza bedende hissedilmez, yine bakmak gerekir.
- **Yağ içmeyi aynı bırakıp yavaşlatma eklemek:** iki ceza üst üste biner.

## Sonuçlar / riskler
- Sonraki hale kuralıyla ([[2026-10-06-hale-tutar-bilincli-isik-bitirir]]) yapışan karacığı artık odaklanınca fener camından yakmak gerekiyor.
- İçme sesi kulakla dinlenmedi.

## İlgili
- [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]]
- [[2026-10-06-oynama-geri-bildirimi-hale-elitler]]
