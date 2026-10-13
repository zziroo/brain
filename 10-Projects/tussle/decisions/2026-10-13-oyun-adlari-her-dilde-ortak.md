---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, urun, i18n, isim]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Karar: Oyun adları her dilde ortak (tek, kısa, İngilizce kökenli)

## Bağlam
Yusuf oyun adlarını değiştirmek istedi; "her dilde ortak bir şey mi yapsak, yoksa çevirmekle uğraşacağız" diye sordu ve seçimi Claude'a bıraktı ("sen isimleri ayarla").

## Karar
- 51 oyunun adı her dilde aynı: kısa, ASCII (ş/ğ/ı yok), ≤ 12 karakter, telifli oyun adlarına birebir benzemeyen (örn. Stick Hero değil Bridge, Knife Hit değil Knife Toss). Açıklama ve howTo çevrili kalır; anlam orada taşınır.
- Teknik: `meta.name`, tr ve en `games.<id>.name` aynı dize (tests/i18n.test.ts tr == meta kuralı korunur). Eski Türkçe adlar `docs/GAMES-ROADMAP.md` sonundaki tabloda tarihsel.
- Yayın `a2865d0` (2026-10-13). Örnekler: Reflex, Stack, Quick Math, Knife Toss, Color Match, Double Tap, Lights, Hop, Bounce, Road Rush, Chain, Odd One Out, Brake, Cups, Flip Match, Bop, Pop or Stop, Catch, Balance, Right Door, Stop Wheel, Treasure, Claw, Pinata, Crack It, How Many, Trace, Fill Up, Beat, Flutter, Slice, Spiral, Chop, Spike Wall, Brick Break, Split, On Time, Color Recall, Keep Up, Target, Swing, Snake, Zigzag, Hoop, Lane Dash, Sort It, Jetpack, Bridge, Arrow Wall, Make 10, Four Arrows.

## Neden
Hyper-casual pazar pratiği (Playus da Türkçe arayüzde "SWIPE FAST!" yazıyor); üçüncü dil gelince 51 ad daha çevrilmez; arkadaşlar arasında oyun adı tek olur, oyun "marka" gibi anılır.

## Reddedilen alternatifler
- Dile göre çevrilmiş adlar (eski durum): çeviri yükü ve mağaza metinlerinde tutarsızlık.
- Uydurma marka sözcükleri (Zıpzıp gibi): anlaşılırlık düşer.

## İlgili
- [[2026-10-09-dil-altyapisi-tr-en]]
- [[2026-10-13-tussle-kapaklar-parti-j-varyantlar-dort-ok]]
