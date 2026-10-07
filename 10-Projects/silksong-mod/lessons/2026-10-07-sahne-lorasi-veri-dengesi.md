---
type: lesson
project: silksong-mod
date: 2026-10-07
status: active
tags: [lora, sd-scripts, sahne, veri-seti]
source: Windows oturumu 2026-10-07 (silksong_scenery_v1/v2, tools/biome/prep_scenery.py, scenery_v2.toml)
---

# Sahne LoRA'sı veri setindeki baskın dokuyu varsayılan yapar; malzemeyi caption'a yaz, erken checkpoint seç

1. **Karakter veriyle eğitilen stil LoRA'sı sahne parçası bilmez:** "gri zemin üstünde nesne" öğrenmiş; parçalar temiz, düz, mobil oyun eşyası gibi çıktı. Gerçek sahne parçalarıyla ayrı LoRA şart.
2. **Baskın doku varsayılan olur:** v1 veri setinde taş/tuğla yığını fazlaydı; her yüzey (zemin, tavan, fırın, sütun) arnavut kaldırımı çıktı. v2'de taş parçaları sert azaltıldı, organik ve süslü bölgeler eklendi (253 parça, 6+ bölge), caption'a malzeme yazıldı ("carved ornament", "ornate metalwork", "glass", "rough stone"); doku tetikleyiciye değil sözcüğe bağlandı.
3. **Bölgeden kaçınılacak örnekleri çıkar:** benzemek istemediğimiz Mount Fay buz/kar parçaları veri setinden alındı.
4. **Erken checkpoint:** v1'de 600, v2'de 1200 en iyisi; sonrası prompt'u dinlemeyip eğitim motiflerine (kuyu, üçlü küme) ya da karanlık silüetlere çöküyor. Sabit prompt/seed ızgarasıyla seç.
5. **Düz metin prompt bazı şekilleri vermiyor** (zemin, fırın, taşma); elle kaba şekil kurup LoRA ile img2img (0,5–0,6) daha güvenilir.
6. Ayrıntı: Real-ESRGAN ile 4× büyütüp küçültmek mürekkep çizgilerini Lanczos'tan keskin tutuyor.

İlgili: [[2026-10-06-lora-tabani-sdxl-base]], [[2026-10-06-sd-scripts-onbellegi-modele-ozgu]], [[2026-10-07-biyom-cam-ocaklari-buz-mavisi]]
