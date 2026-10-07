---
type: decision
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, animasyon, lora, controlnet, kukla]
source: Windows oturumu 2026-10-07 (tools/anim/make_walk.py, make_chainpull.py, tools/anim/redraw/, tools/train/char_v8c/)
---

# Karar: animasyon parça türüne göre karışık hat; sert parçalar kukla, uzuvlar koddan kavisli, büyük pozlar kaba poz + V8C karakter LoRA'sıyla yeniden çizim

## Bağlam
Yusuf sordu: "sprite'ı keserek oynatıyorsun, sonunda böyle mi olacak?" Team Cherry her kareyi elle çiziyor; saf kukla hızlı ve büyük hareketlerde Flash gibi sert durur. Zincir çekmenin kukla hali "hafif bir çekiştirme" gibi okundu, dev şahmerdanı kaldırmak gibi değil.

## Karar
1. **Kask ve aletler:** kukla, sert parça (metal; dönmeleri fiziksel olarak doğru). Yeniden çizimde de kaskı ve aletleri kukladan geri yapıştır.
2. **Bacak ve kollar:** her kare koddan kavisli çizilir (`tools/anim/leg_shape.py`; Idle, Walk, zincir çekme ortak).
3. **Büyük pozlar:** önce kuklayla abartılı kaba poz (derin çömelme, sırt bükme, pelerin savrulması), sonra ControlNet Union (xinsir promax, Yusuf onayıyla indirildi) + karakter LoRA'sı ile yeniden çizim, palet kilidi ve kontur temizliği.
4. **Karakter LoRA'sı `kilnwright_char_v8c` (adım 1500):** V8C tasarımıyla (47 görsel: Idle, Walk, kaba pozlar, 23 yeni kukla pozu) yeniden eğitildi; eski `kilnwright_char_v2` güçlü yeniden çizimde karakteri eski ince tasarıma çekiyordu.
5. Mevcut klipler: Idle 12 kare, Walk 10 kare (ayak kaymasız hız 2,11 birim/s), zincir çekme 6 kare ('Çek' kare 2, 'Bırak' kare 4; oynatma [0,1,2,3,3,3,3,4,5,5,5] @ 12 fps).

## Neden
- Drama yeniden çizimden değil kaba pozdan geliyor (hafif rötuş A ≈ kaba poz).
- Eski LoRA ile güçlü yeniden çizim (denoise 0,8): bacaklar inceliyor, aletler kızarıyor (%6), gözler beyazlıyor. V8C LoRA ile aletler %0,1, titreme ~%30 az, eğitimde olmayan 6 pozda da karakter korunuyor.

## Reddedilen alternatifler
- Saf kukla her şey için: büyük pozlarda sert.
- Her kareyi yeniden çizmek (Idle dahil): kareler arası titreme.
- Eski karakter LoRA'sıyla devam: karakteri bozuyor.

## Sonuçlar / riskler
- V8C LoRA kukla görüntülerinden öğrendiği için yeniden çizimler de kukla gibi; "elle çizilmiş" yorum az. Sonraki adım: en iyi güçlü yeniden çizimleri veri setine katıp bir tur daha eğitmek (bootstrapping).
- Ayıklama adımında bazı karelerde açık kahve lekeler kalıyor (LoRA'dan değil).
- B3 için diğer kolla zincir çekme (ayna) yapılmadı; yeni rig dosyası gerekiyor.

## İlgili
- [[2026-10-07-boss-oranlari-v8c-ve-boyut-2-5x]]
- [[2026-10-07-karakter-lorasi-egitildigi-tasarima-ceker]]
- [[2026-10-06-karakter-lora-caption-ve-kukla]]
