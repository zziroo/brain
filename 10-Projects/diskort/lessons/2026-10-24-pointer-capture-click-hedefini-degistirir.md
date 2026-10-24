---
type: lesson
project: diskort
date: 2026-10-24
status: unverified
tags: [masaustu, pointer-events, react]
source: "diskort: yayın yüzen pencere (PiP)" oturumu, inceleme bulgusu
---

# Ders: Dış sarmalayıcıda pointerdown'da setPointerCapture yapmak içteki öğenin click'ini sarmalayıcıya taşır

**Durum:** StreamPip taşıma hareketi için inceleme "pointerdown anında yakala" dedi. Ama pointer capture varken `click` olayının hedefi yakalayan öğe olur (tarayıcı click hedefini pointerdown ve pointerup hedeflerinin ortak atasından seçer; capture'da pointerup hedefi yakalayan öğedir). İçteki `StreamView`'ın kendi `onClick`'i (tıkla sahneye dön) çalışmazdı.

**Çözüm:** yakalamayı yalnız 4 px eşik aşılınca (gerçek sürükleme) yap; takılı kalan hareketi `pointermove` içinde `e.buttons === 0` ve `onLostPointerCapture` ile bitir; tamamlanmayan harekette de `dragPos`'u sıfırla. Boyutlandırma tutamaçları tıklanmadığı için orada pointerdown'da yakalamak sorun değil.

**Not:** Chrome davranışı belleğe dayanıyor, canlıda doğrulanmadı; tıkla-sahneye-dön çalışıyorsa kural doğru.

İlgili: [[2026-10-24-yayin-yuzen-pencere-pip]]
