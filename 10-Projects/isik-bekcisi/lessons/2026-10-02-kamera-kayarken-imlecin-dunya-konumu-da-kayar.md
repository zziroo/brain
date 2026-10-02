---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, girdi, kamera, test, onizleme]
source: oturum 2026-10-02 (incremantal-game), kamp/arayüz turu
---

# Kamera hareket ederken duran imlecin dünya konumu da değişir; "oyuncu fareyi oynattı mı" sorusunu ekran koordinatında sor

## Ne oldu
Kampta teleskoba tıklamak hiçbir şey yapmıyordu. Tıklama "oraya yürü ve kullan" işini başlatıyor, oyuncu fareyi oynatırsa iş iptal ediliyordu. İptal koşulu imlecin **dünya** konumunu tıklama anındakiyle karşılaştırıyordu. Kamera bekçiyi izlediği için, fare hiç kıpırdamasa da imlecin dünya konumu her karede kaydı ve iş bir-iki kare içinde kendi kendini iptal etti.

Simülasyonu doğrudan süren testte (`campStep` + dünya koordinatlı `tap`) hata görünmedi; ancak gerçek kare döngüsü + gerçek `PointerEvent` ile ortaya çıktı.

## Ders
- Oyuncunun niyetini ölçen eşikler (fareyi oynattı mı, sürükledi mi, tıklama mı) **ekran** pikselinde tutulur. Dünya koordinatı yalnızca hedefin kendisi için kullanılır.
- İmleçle işaret edilen bir sahnede kamera mümkünse dursun: kamp ekrana sığıyorsa kamera sabit, sığmıyorsa bekçiyi izliyor. İşaret edilen şey imlecin altından kaçmamalı.
- Önizleme panelinde gerçek döngüyü test etmek için: `requestAnimationFrame`'i zamanlayıcıya bağla (`tools/dev.js` → `timerFrames()`), bir ekran görüntüsüyle ilk kareyi tetikle, sonra olayları dispatch et (`ev.click`, `ev.tap`, `ev.key`). Girdi, sahne geçişi ya da kamp kodu değiştiyse bu yol şart.
- Panelde ekran görüntüsü sayfanın yalnızca sol üst 1/devicePixelRatio kısmını gösterebilir. Tam görünüm için yalnızca test sırasında `body`'yi `scale(1/devicePixelRatio)` ile küçült (köken `0 0`).

İlgili: [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]], [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]], [[10-Projects/bal-vadisi/lessons/2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]]
