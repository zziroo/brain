---
type: lesson
project: tussle
date: 2026-10-15
status: active
tags: [tussle, ders, orkestrasyon, tarayici, test]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Paralel ajanların dosya kayıtları Vite'ı yeniden yükletip tarayıcı testini bölüyor

- Aynı Vite sunucusunu kullanan paralel ajanlar dosya kaydettikçe sayfa yeniden yüklendi; diğer ajanların tarayıcı scriptleri yarıda kesildi. Tarayıcı ölçümünü kısa tut, kesilirse yeniden koş; mümkünse ajan başına ayrı Vite portu.
- `scripts/canvas-shot` alıcıları port çakışmasın diye ajan başına farklı port (ör. 5207).
- Tarayıcı bölmesi gizliyken screenshot alınamıyor; görsel denetim için canvas-shot gerekli.

İlgili: [[2026-10-09-ajanlar-tarayicida-oynar]], [[2026-10-12-denge-ve-tema-turu-dersleri]], [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].
