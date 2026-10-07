---
type: lesson
project: silksong-mod
date: 2026-10-07
status: active
tags: [sprite, rgba, alfa, cam]
source: Windows oturumu 2026-10-07 (tools/anim/puppet.py, tools/biome/make_kit.py, gen_kit5.py)
---

# Zemin ayıklamada alfa maskesini genişletme, kenar rengini içe çek; soluk camı renkle ayıklama

1. **Kenar halesi:** `puppet.py` alfa maskesini `MaxFilter(3)` ile 1 piksel genişletiyordu; siyah konturun dışındaki açık gri zemin halkası opak kaldı ve oyunda ince parlak hale olarak göründü (Yusuf fark etti). Çözüm: genişletme yok, yumuşak rampa + kenar renk arındırma (opak olmayan her pikselin rengi en yakın tam opak iç piksele, yani çoğunlukla siyah kontura çekilir). Doğrulama: yarı saydam kenar piksellerinin ortalaması 113 → 1.
2. **Parça kesiminde de aynı tuzak:** kukla parçalarının saydam piksellerinin RGB'si siyahsa döndürülen parçaların kenarları koyulaşıp konturu kalınlaştırıyor ve dikiş izi bırakıyordu; parça kaynağın kendi RGB'sini korumalı (+ `seam_overlap`).
3. **Soluk cam siliniyor:** düz gri zemin üstünde üretilen soluk cam, renk ayıklamada (`key_flat`) zeminle karıştırılıp siliniyor; kristaller ve donmuş akıntı "ince soluk bıçak" gibi kalıyordu. Çözüm: alfayı kaba pozun kendi şeklinden al (`key_from_rough`).
4. **Kontur ölçümü:** koyu piksel maskesi kollar/bacaklar gibi düz siyah dolguları da sayar; dış konturu ölçmek için koyu banda değen ilk dolgu pikselinin saydam bölgeye uzaklığına bak (`line_weight3.py`).

İlgili: [[2026-10-06-karakter-lora-caption-ve-kukla]], [[2026-10-07-boss-oranlari-v8c-ve-boyut-2-5x]]
