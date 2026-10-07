---
type: lesson
project: silksong-mod
date: 2026-10-07
status: active
tags: [lora, controlnet, animasyon, yeniden-cizim]
source: Windows oturumu 2026-10-07 (tools/anim/redraw/, tools/train/char_v8c/, flicker_report.txt)
---

# Güçlü yeniden çizimde karakter LoRA'sı karakteri eğitildiği tasarıma çeker; tasarım değişince LoRA'yı yeniden eğit

- `kilnwright_char_v2` eski ince bacaklı şövalyeyle eğitilmişti. V8C'de denoise 0,8 ile yeniden çizim: kalın bacaklar inceldi, aletler kızardı (%6), gözler beyazladı, başıboş nesneler çıktı. Hafif rötuş (denoise 0,5) karakteri korudu ama kaba pozdan neredeyse farksızdı.
- V8C ile yeniden eğitilen `kilnwright_char_v8c` (47 görsel, yeni tetikleyici `kilnwright_v8c`): aynı ayarda aletler %0,1, titreme ~%30 az, eğitimde olmayan pozlarda da korunuyor.
- **Bedeli:** veri seti kukla görüntüsü olduğu için LoRA kukla görünümünü de öğrendi; yeniden çizim "elle çizilmiş" yorumunu az veriyor. Sonraki adım: iyi güçlü yeniden çizimleri seçip veri setine ekleyerek bir tur daha eğitmek.
- **Pratik:** metal parçaları (kask, aletler) yeniden çizimden sonra kukladan geri yapıştır; yeniden çizim gözü turuncuya, koru kırmızı kristale çeviriyor. Yeni tetikleyici kelime eski LoRA'nın öğrendiklerini taşımaz ve yan yana kıyası kolaylaştırır.

İlgili: [[2026-10-07-animasyon-hatti-kukla-kaba-poz-v8c-lora]], [[2026-10-06-karakter-lora-caption-ve-kukla]]
