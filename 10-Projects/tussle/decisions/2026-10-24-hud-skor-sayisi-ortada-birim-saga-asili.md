---
title: "HUD skor: sayı merkeze sabit, birim sağa asılı; yer yoksa birim gizlenir"
date: 2026-10-24
project: tussle
type: decision
tags: [tussle, hud, gorsel]
---

# HUD skor: sayı merkeze sabit, birim sağa asılı

**Karar:** Oyun içi HUD'da skor SAYISI ekranın yatay merkezine sabitlenir; birim sözcüğü ("şeker", "kat") küçük ve soluk olarak sayının sağına asılır. Sayı+birim grubu birlikte ortalanmaz. Haplar ya da X düğmesi yer daraltırsa grup küçülür; küçülme %80'in altına inecekse birim gizlenir ve yalnız sayı (gerekirse) küçülür (`UNIT_MIN_FIT`, `src/games/shell/hud.ts`).

**Neden:** Yusuf telefonda "10 şeker"de sayının sola kaydığını gördü (24 Eki). Göz sayıyı arıyor; birim ikincil bilgi. Grubun birlikte ortalanması uzun birimde sayıyı belirgin kaydırıyordu.

**Reddedilenler:**
- Birimi alt satıra almak: HUD yükseklik alır, oyun alanı küçülür; Yusuf'un "içerik kaymasın" tercihine ters.
- Birimi hiç göstermemek: "sn", "ms", "kat" gibi birimler skorun ne olduğunu söylüyor; yalnız yer darlığında gizlenir.
- Birim için sayıyı yarıya küçültmek (ilk uygulama): iki hap açıkken skor yarı boyuta iniyordu; tarayıcı denetimi yakaladı.
