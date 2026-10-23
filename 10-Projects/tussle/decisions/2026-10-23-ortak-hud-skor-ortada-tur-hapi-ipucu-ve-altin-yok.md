---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, karar, hud, oyun-ici]
source: oturum [[2026-10-23-tussle-oyun-ici-duzenleme-turu-telefon-notlari]]
---
# Karar: ortak HUD (skor üst ortada, tek tur hapı), oyun içi ipucu yok, altın toplama yok

## Karar
- Skor bütün oyunlarda üst ortada: sayı büyük kalın, birim ("şeker", "m") küçük ve soluk. Artışta hafif zıplama (1.11×), reduced motion'da yok.
- n/toplam tur göstergesi tek API (`hud.setRound`), sağ üstte hap; oyunlar kendi tur noktası/yazısı çizmez. Kombo ×n aynı sırada, tur hapının solunda.
- Oyun boyunca görünen "nasıl oynanır" öğesi (slider, ok, ipucu satırı) yok; yalnız ilk girdiye kadar görünen ipucu serbest.
- Skora katkı veren altın/para toplama yok; skor oyunun tek doğal ölçüsü (mesafe, sayı).
- `level` sesi yalnız ekranda görünür tur/aşama geçişinde.

## Neden
Yusuf (telefon notları): "50 şeker" aynı fontla sol üstte okunmuyor, sayıyı birimden ayıramıyor; Brake'te kaçıncı tur olduğu belli değil; altın toplamak ne kazandırdığı anlaşılmayan ikinci bir ölçü; kademe sesi ne için geldiği anlaşılmıyor; oyun içi slider zaten oyun öncesi ekranda anlatılıyor. Hepsi [[2026-10-23-oyunda-tek-olcu-skor-kademe-ve-zorluk-etiketi-yok]] kuralının devamı.

## Reddedilen alternatifler
- Skoru sol üstte bırakıp yalnız fontu büyütmek: birim yine aynı satırda okunurluğu bozuyor; ortalama + iki font seçildi.
- Altınları kaldırmayıp puan payını düşürmek: ikinci ölçü yine kalıyor.
- Chain'de geri sayımda ilk turun tüm sayılarını göstermek: ilk turu bedava ezber yapar, sonraki turlarla tutarsız; tahta boş başlıyor.
- Hop'un kimliğini değiştirmek: yalnız görünen ad Leap oldu, id `hop` kaldı (legacy tablo gerekmedi).
