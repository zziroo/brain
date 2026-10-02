---
type: decision
project: ceviri-araci
date: 2026-10-02
status: accepted
tags: [ceviri-araci, urun]
source: 2026-10-02 oturumu, Yusuf'un yönlendirmesi
---

# Aynı cümleler birleştirilmez; dil kodu değişimi kullanıcının seçimidir

- Excel'de her metin kendi satırı; aynı kaynak cümle iki yerde geçse de ayrı çevrilir. Eski çevirilerden doldurma yalnızca anahtara göre.
- Dosya adındaki dil kodu (`Perks-en.json` → `Perks-tr.json`) ve `langname: "en"` gibi alanlar varsayılan olarak değişmez; "Dosyaları Oluştur" diyaloğunda iki işaretsiz kutu ve önizleme var. Bu seçimler kalıcı saklanmaz, Excel'den de alınmaz.

**Neden:** Yusuf: aynı cümle farklı yerde farklı çevrilebilir. Dil kodu davranışı oyuna göre değişir, karar kullanıcıda olmalı.

**Reddedilen alternatifler:** Excel'de tekrarları tek satırda toplayıp çeviriyi hepsine yaymak (ilk tasarım, iptal edildi); dil kodunu otomatik değiştirmek.

Bağlam: [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]
