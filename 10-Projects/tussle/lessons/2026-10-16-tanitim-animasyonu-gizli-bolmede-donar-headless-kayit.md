---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, tarayici, animasyon, kayit, puppeteer]
source: "oturum 2026-10-16 (mobil-playus): tussle animasyonlu tanıtım akışı"
---

# Ders: gizli tarayıcı bölmesinde CSS animasyonu donar; hareketi headless Chrome kaydıyla gör

- Masaüstü uygulamanın tarayıcı bölmesi gizliyken menü CSS animasyonlarının saati 0'da kalır (oyunun "Duraklatıldı" demesiyle aynı kök: [[2026-10-13-kapak-varyant-dort-ok-dersleri]]). Ajan hareketi göremedi, yalnız düzeni doğrulayabildi.
- İşe yarayan: scratchpad'e `npm i puppeteer-core`, sistem Chrome'u headless, `isMobile`/`hasTouch` 390×844, `page.screencast()` ile webm; `ffmpeg` ile mp4 (`libx264`, `yuv420p`, `faststart`) telefonda açılır, `select=eq(n\,K)+…` + `tile=6x1` ile tek görselde kare örneği hareketi okumak için ucuz.
- Dokunarak kaydırma testi: CDP `Input.dispatchTouchEvent` (touchStart/Move/End). Fazladan bir tıklama etkisiz düğmeye gelirse odak `BODY`'ye kayar; odak testini yanıltır.
- Uzaktan (Remote Control) izleyen Yusuf'a mp4 + döşeme görsel `SendUserFile` ile gider; ekran görüntüsünden çok daha iyi karar verdirir.
- Dev sunucusu başka oturumun olabilir (aynı klasör, 5173/8087): kullan, durdurma.

İlgili: [[2026-10-16-animasyonlu-tanitim-akisi-herkes-bir-kez-gorur]]
