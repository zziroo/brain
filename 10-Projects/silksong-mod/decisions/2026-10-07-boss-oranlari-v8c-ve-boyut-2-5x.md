---
type: decision
project: silksong-mod
date: 2026-10-07
status: active
tags: [silksong, boss, tasarim, animasyon, boyut]
source: Windows oturumu 2026-10-07 (oyun içi karşılaştırmalar Room_Forge, tools/anim/make_variants.py, leg_shape.py)
---

# Karar: Scoria 2,5× Hornet boyunda, V8C oranlarıyla (kalın kavisli kısa bacak, sivri ayak, kızıl-pas pelerin, kor), kontur ekranda ~5 px

## Bağlam
İlk oyun içi testte karakter "korkuluk gibi" okundu: Hornet'ten 2,5 kat büyük ama bacak ve kolları Hornet'inki kadar ince, ağırlıksız. Pelerin Hornet'le aynı kırmızıydı, maşa ucundaki parıltı kalp gibi görünüyordu, sprite çevresinde ince açık gri bir hale vardı. Boyut da belirsizdi.

## Karar
1. **Boyut:** figür boyu Hornet collider'ının 2,5 katı (oyunda Room_Forge'da 2×/2,5×/3× yan yana denendi). Yusuf "2,5 iyi" dedi.
2. **Oranlar: V8C.** Bacaklar ~3,5× kalın, %35 kısa, kavisli (uyluk önde şişkin, baldır arkada), uçlar sivri böcek ayağı; ön kol ~4× (kolun en kalın yeri), üst kol 3×, maşa çeneleri ince kalır; pelerin ve omuz %12 geniş. Idle'da ayak uçları ileri, bir ayak önde (Walk'a geçişte ayak sıçramasın).
3. **Renk:** pelerin koyu kızıl-pas (kaynakta ~`#391915`; oyunun renk ayarı kırmızıyı parlatıyor), maşa ucunda kalp yerine düzensiz kor.
4. **Kontur kuralı:** oyundaki karakterlerin dış konturu 1080p'de ~5 px (Hornet ölçüldü). Boyut değişirse kontur yeniden çizilir, sprite ölçeklenmez. Ölçüm `D:\SilksongMod\work\size_test\line_weight3.py`.
5. Tasarım dokümanı §5 bu kararla güncellendi.

## Neden
- Yusuf V5 ile V6'nın arasını istedi, V8'i "iyi" buldu, kavisli bacakları düz olanlara tercih etti; Idle duruşunu Claude'a bıraktı.
- 3× ekranın %38'ini kaplıyor ve Dock_11'de tavana değdi; Faz 2'de lav yükselince hareket alanı kalmaz. 2× "düşman" gibi duruyor.
- Hornet'le aynı kırmızı savaşta okunabilirliği bozar (oyuncu kendi karakterini anında ayırmalı).
- 2,5×'te kontur tesadüfen Hornet'le eşleşti; kuralı buradan koyduk.

## Reddedilen alternatifler
- V0–V4 (1,6×–2× kalınlık): hâlâ ince; ince kaynak çizginin iki katı da ince.
- V6 (4× kalın, %40 kısa, yuvarlak ayak): fazla bodur, ayaklar çizgi film gibi.
- V7 (uzun cüppe, bacaklar gizli): başka karakter oldu (rahip havası).
- Düz çubuk bacaklar (ilk Walk): mekanik, robot gibi.
- Eski geniş Idle duruşu: Walk'a geçişte ayak sıçraması ya da ek "yürümeye başla" klibi gerekirdi.

## Sonuçlar / riskler
- Kask ve aletler kukla olarak sert kalır (metal); bacak ve kollar koddan kavisli çizilir.
- Önceki karakter kararı geçerli (silüet, kask, göz), yalnız oranlar ve renk bu notla değişti: [[2026-10-06-karakter-pelerinli-sovalye-kirmizi-goz]].
- Doğrulanmayan: Idle/Walk/zincir çekmenin savaş içinde hissi (henüz boss davranışı yok).

## İlgili
- [[2026-10-07-animasyon-hatti-kukla-kaba-poz-v8c-lora]]
- [[10-Projects/silksong-mod/design/boss-01-kilnwright-scoria|Boss 01 tasarımı §5]]
