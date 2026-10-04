---
type: lesson
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, test, tarayici, onizleme, canvas, arac]
source: oturum 53393f9a (incremantal-game): Yusuf pencerede değilken birleşmiş oyunun görsel denetimi
---

# Önizleme paneli gizliyken de canvas görülebilir: görüntü alanını taklit et, oyunun draw()'unu çağır, toDataURL'i yerel bir alıcıya gönder

## Ne oldu
- Oturum hiçbir pencerede açık değilken önizleme sekmesi 0×0 boyutundaydı. requestAnimationFrame çalışmıyor, ekran görüntüsü alınamıyordu.
- Ajanlar ve koordinatör canvas'ı yine de gördü. Yol:
  1. `resize_window` ile 1366×768 taklit edildi. Gizli sekmede de `innerWidth` dolar; ardından `resize` olayı tetiklendi.
  2. Simülasyon `tools/dev.js` ile adım adım yürütüldü, sonra `draw(dt, 'run')` birkaç kez çağrıldı. Seferin kamerası kare döngüsü olmadan izlemez, bu yüzden önce `snapCamera()` çağrıldı. Bir geçiş sürüyorsa zamanlayıcıyla bitmesi beklendi.
  3. `canvas.toDataURL()` (gerekirse küçültülmüş ya da kırpılmış), scratchpad'deki küçük bir node HTTP alıcısına (CORS açık) POST edildi. Alıcı PNG olarak yazdı, PNG `Read` ile okundu.
- Yerel `serve.mjs` CSP göndermiyor; canlıdaki CSP (`connect-src 'self'`) bu yolu engellerdi.

## Ders
- Gizli panel, görsel denetimi ertelemek için sebep değil. Bu yol DOM katmanlarını (HUD, ipucu plakası) göstermez, yalnız canvas'ı gösterir.
- Kırpılmış ve büyütülmüş görüntüler küçük çizimler (halka, göz, yapışma) için tam kareden daha çok şey söyler; tam kare için 0,5 ölçek yeter.
- Arka planda çalışan alıcı süre sınırında kapanır, gerekince yeniden başlat.

İlgili: [[10-Projects/bal-vadisi/lessons/2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
