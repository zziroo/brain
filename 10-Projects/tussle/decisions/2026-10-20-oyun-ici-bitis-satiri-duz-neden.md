---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, gorsel, metin, oyunlar]
source: Claude Code oturumu "tussle: geri bildirim turu" (geri bildirim #13)
---

# Oyun içi bitiş yazısı: tek ortak satır, düz, ünlemsiz, yalnız neden

**Karar:** Oyun bitiş anında ekranda tek tip bir satır: shell `endLine` (`src/games/shell/draw.ts`), `fonts.big`, `theme.text` rengi, eğik değil, çıkartma çerçevesi yok, ince 4u surface halo (okunurluk), varsayılan konum h×0.34, `end.ease` ile yumuşak beliriş, reduced-motion'da anında. Metin yalnız nedeni söyler, ünlemsiz: "Süre bitti" (ortak `game.end.timeUp`), "Ekşiye değdin", "Boşluğa düştün", "Arabaya çarptın", "Anahtar kalmadı". Süs metinleri ("Şeker bitti", "Ekşi!", "Efsane!", "Rüzgârı yendin!") kalktı; sonuç kartı zaten "Bitti!" diyor.

**Neden:** 19 oyunda üç ayrı stil (eğik sarı çıkartma / kırmızı büyük yazı / h×0.16–0.42 arası konum) ve temaya aykırı süslü metinler vardı. Yusuf: oyun içinde hatasını görsün ("süre bitti", "ıskaladın") ama "şeker, ekşi" gibi süsler gereksiz. Sade sahne ilkesi.

**Reddedilen alternatif:** oyun içi yazıyı tamamen kaldırıp yalnız sonuç kartına bırakmak: oyuncu neden bittiğini kartta değil sahnede görmeli.

**İstisnalar / konum:** View'lar `endLineY` ile konumu değiştirebilir: quick-math kart içi (cardY + 0,38·cardH, baykuşun altı), knife-toss çark altı (≥ h×0.66), snake baş h×0.34 bandındaysa h×0.66, crack-it geçmiş penceresinin ortası (pencere solar). ShellView'dan türemeyen knife-toss ve stack ile bitişi `done`'dan önce gelen crack-it ve spike-wall `endLine()`'ı doğrudan çağırır. Geçmeyenler (kendi arayüzüne gömülü): four-arrows, lights, stop-wheel, color-match; chain/odd-one-out/make-10 sonuç kartı satırları. Sonraki tur.
