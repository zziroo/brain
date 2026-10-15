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
- **Eski alıcı tuzağı (Yayın 2 oturumu):** bitmiş bir oturumun `recv.mjs`'i 5199'da kalmıştı; yeni alıcı sessizce bağlanamadı ve görüntüler eski oturumun klasörüne gitti. Alıcıyı başlatmadan önce `lsof -nP -iTCP:5199 -sTCP:LISTEN` ile bak, eskisini kapat, sonra `ps -o command -p <pid>` ile klasörü doğrula.
- **Harness durdurma tuzağı:** `run.js`'in rAF pompası `window.__run=false` ile durunca `true` yapmak yetmez (MessageChannel döngüsü çıkmıştır); harness'i yeniden kur. Durmuş harness'te kare sayacı sabit kalır (`frames` artmıyorsa görüntü ilk kare olabilir).
- **İşe yarayan yöntem:** tek sayfada hash ile oyun oyun gezen `__shootAll(oyunlar, tema, önek)` döngüsü (tema `dataset.theme` + `#/` üzerinden geçiş) 8 oyun × 2 temayı iki çağrıda alıyor; önce/sonra montajı tarayıcı canvas'ında yapılıp alıcıya POST ediliyor (makinede PIL/ImageMagick yok). Paralel 7 ajan aynı Vite'ı paylaştı; her ajan kendi sekmesi + her kayıttan sonra harness'i yeniden kurdu, kesinti olmadı.

İlgili: [[2026-10-09-ajanlar-tarayicida-oynar]], [[2026-10-12-denge-ve-tema-turu-dersleri]], [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].
