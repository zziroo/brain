---
type: decision
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong, lora, sdxl, gorsel-uretim]
source: Windows oturumu 2026-10-06, deneme eğitimi (D:\SilksongMod\ai\loras\sample\_karsilastirma_deneme.png)
---

# Stil LoRA'sının tabanı SDXL Base 1.0; veri HK + Silksong, kaynak etiketiyle ayrılmış

**Karar:** Team Cherry stil LoRA'sı SDXL Base 1.0 üzerinde eğitilir. Veri: Silksong (253 karakter + 47 ortam) ve Hollow Knight (125 karakter + 30 ortam) sprite'ları; her caption `silksong_style` ya da `hk_style` ile başlar, Silksong tekrarı 2, HK 1. Eğitim 768 çözünürlükte, kohya sd-scripts, dim 32 / alpha 16, AdamW8bit 1e-4.

**Neden:**
- Aynı veri, aynı ayar, 1000 adım deneme: SDXL Base 250. adımda gri zemin, kalın kontur ve düz gölgelemeyi aldı; 1000. adımda tanınır Silksong/HK figürleri çizdi. Illustrious-XL v2.0 stile direndi, parşömen/anime havasında kaldı ve yazı lekesi üretti.
- HK verisi aynı sanatçının dili; özellikle büyük boss gövdelerini artırıyor. Kaynak etiketi iki oyunun farkını (Silksong daha sıcak ve detaylı) model içinde ayrı tutuyor.
- 768: sprite'lar küçük (medyan 2,65x büyütme); 1024'te Lanczos bulanıklığı konturları yumuşatıyordu.

**Reddedilen alternatifler:**
- *Illustrious-XL v2.0:* deneme sonucu zayıf (yukarıda).
- *NoobAI-XL:* Illustrious ailesinden; denenmedi, aynı sorunu taşıması muhtemel.
- *Flux:* 12 GB'da ancak kuantize ve yavaş.
- *Yalnız Silksong verisi:* daha az veri, özellikle boss çeşitliliği düşük.

İlgili: [[2026-10-06-sd-scripts-onbellegi-modele-ozgu]]
