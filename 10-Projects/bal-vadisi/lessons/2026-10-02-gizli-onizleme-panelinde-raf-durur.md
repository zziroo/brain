---
type: lesson
project: bal-vadisi
date: 2026-10-02
status: active
tags: [bal-vadisi, test, onizleme, requestanimationframe]
source: oturum 2026-10-02 (incremantal-game)
---

# Gizli önizleme panelinde requestAnimationFrame neredeyse durur; simülasyonu elle sür

## Ne oldu
Claude'un yerleşik tarayıcı paneli görünür değilken `requestAnimationFrame` saniyeler içinde yalnızca birkaç kez çalıştı (`document.hidden` yine de `false`). Oyun donmuş göründü, tıklamalar sayılmadı, ekran görüntüleri bir adım geriden geldi.

## Ders
- rAF döngülü bir oyunu panelde test ederken döngüyü bekleme: `updateWorld(dt)`'yi JS ile döngüde çağır, sonra `draw()` ve ekran görüntüsü al. Durumu ekran görüntüsünden değil JS'ten oku.
- Bu durum gerçek bir hatayı da ortaya çıkardı: tıklama yalnızca kare döngüsünde işleniyordu, iki kare arasına sığan hızlı dokunuş kayboluyordu. Girdi olayında hemen işlemek gerekir.
- Denge için oyunu oynamak yerine sayfada bot simülasyonu koşturmak (1 saatlik oyun birkaç saniye) çok daha hızlı sonuç verdi.

İlgili: [[10-Projects/bal-vadisi/_overview|Bal Vadisi]]
