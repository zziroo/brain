---
type: lesson
project: silksong-mod
date: 2026-10-06
status: active
tags: [lora, animasyon, sd-scripts, kukla]
source: Windows oturumu 2026-10-06 gece (kilnwright_char_v1/v2, tools/anim/puppet.py)
---

# Karakter LoRA'sında özellikleri caption'a yazma; küçük hareketlerde yeniden çizim yerine kukla

1. **Caption:** Karakter LoRA'sı eğitirken "crimson cloak, red eyes" gibi karakteri tanımlayan sözcükler caption'da olursa model bunları tetikleyici kelimeye değil o sözcüklere bağlar; tetikleyici tek başına pelerinsiz karakter üretir. Caption = tetikleyici + stil etiketi + yalnız poz/açı (`kilnwright_boss, silksong_style, side view, standing`). Değişmesini istediğin şeyleri yaz, sabit kalacakları yazma.
2. **Yeniden çizim kıtırdatır:** img2img ile her kareyi yeniden çizmek (denoise 0,25–0,35, sabit seed) kareler arasında küçük farklar bırakır; Idle gibi küçük hareketlerde göze batar. Çözüm: temiz tek görselden parçalı kukla (poligon + figür maskesi, pivot dönüşü, temiz zemin dolgusu). Yeniden çizim yalnızca büyük poz değişimlerinde.
3. **Kukla tuzakları:** üretilen görselin zemini düz değil (vinyet) → delikleri düz renkle değil "clean plate" (figür dışı normalize bulanık ortalama) ile doldur; delik maskesini kenar yumuşatma izini de silecek kadar genişlet, parça maskesini ise dar tut (zemin halesi taşınmasın).
4. **İterasyon körlüğü:** üç tur boyunca ittirilen A4 yerine kullanıcı, kontrol sütunundan çıkan görseli seçti. Her turda birkaç amaçsız/kontrol örneği bırak ve hepsini göster.
