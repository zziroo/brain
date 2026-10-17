---
type: lesson
project: ziroo-edge
date: 2026-10-17
status: active
tags: [css, animasyon, ozgulluk]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa" (review ajanları üç kez yakaladı)
---

# Ders: Daha özgül bir `animation:` kısayolu, ayrı yazılmış `animation-play-state: paused` kuralını ezer

## Ne oldu
"Hikâye geçildi" (`.st-past`) durumunda animasyonları durduran genel bir kural vardı. Sonra yeni animasyonlar daha özgül seçicilerle ve `animation:` kısayoluyla eklendi (el sallama `.on-end .zr .z-wv`, `.st-grip #zFhR svg`). Kısayol `animation-play-state`'i `running`'e sıfırladığı için duraklatma kaybetti; animasyonlar ekran dışında çalışmaya devam etti. Aynı hata üç ayrı turda tekrarladı.

Bir seferinde de seçici yanlış yazıldı: `.st-past` `<html>`'de, `.st-grip` sahnede durduğu için `.st-past.st-grip` hiç eşleşmedi. Doğrusu boşluklu yazımdı: `.st-past .st-grip`.

## Nasıl uygulanır
- Yeni bir `animation:` kuralı eklerken duraklatma kuralını hemen arkasına, en az aynı özgüllükle ekle. Ya da başlatan kurala `:not(.st-past)` koşulu ekle.
- Sınıfların hangi öğede durduğuna bak (html mi, sahne mi): bileşik seçici mi boşluklu seçici mi gerektiğini bu belirler.
- Doğrula: `getComputedStyle(el).animationPlayState`.

## İlgili
- [[mobilde-buyuk-olceklenen-katman-ve-durmayan-dongu-kasar]]
