---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, test, birlestirme, inceleme, arac]
source: Claude Code oturumu 72fd0708 (incremantal-game); geçiş ve hikâye ajanlarının bağımsız bulguları
---

# Bir dal birleşince yalnız değişen sahneye değil her sahneye bak; `node --check` burada ESM hatası yakalamıyor

## Ne oldu
1. Lazer dalı `main`'e birleşti. Koordinatör tarayıcıda yalnız bir seferi (harabelerde lazer) denedi ve geçti. Oysa dal, prizmaları çizim listesine kampın dekorunun kullandığı "6" türüyle eklemişti: başlıkta, kampta ve son ekranda ağaç, çadır, istasyon, sakin ve kapı çizilmiyordu. Konsolda hata yoktu. Hatayı iki ayrı ajan (geçiş ve hikâye) kendi dallarına `main`'i birleştirirken bağımsız olarak buldu; biri hikâye ajanıydı ve tarayıcı paneli ona kapalı olduğu için ilk turda göremedi. Lazer dalının incelemecisi de sefer odaklı baktığı için kaçırdı.
2. Geçiş ajanı birleştirme sırasında `audio.js`'de kalmış bir `=======` çakışma işaretini yakaladı: `node --check js/audio.js` 0 dönüyordu. Bu makinede `node --check`, bu ES modülü dosyalarındaki sözdizimi hatalarını yakalamıyor; `node --input-type=module --check < dosya` yakalıyor. Koordinatörün bütün "sözdizimi geçti" denetimleri o ana kadar boştu (bot ve tarayıcı yüklemesi dolaylı olarak kurtarıyordu).

## Ders
- Birleştirmeden sonra asgari tur: başlık, kamp, sefer (bir kez odaklı), özet, gökyüzü. Değişikliğin "dokunmadığı" sahneler tam da paylaşılan listeler, numaralı türler ve z-sıraları yüzünden bozulur. Konsolun sessiz olması çizimin doğru olduğunu söylemez.
- Paylaşılan bir listede tür için çıplak sayı kullanma; en azından başka dosyanın kullandığı aralığı yorumla belirt ya da kelime kullan (kamp dekoru artık `'camp'`).
- Bir aracın "geçti" demesine güvenmeden önce bir kez kasıtlı hatayla sına. Kurallı denetim artık depo `CLAUDE.md`'sinde (Testing).
- Birleştirmeyi dalın sahibine yaptırmak ([[2026-10-02-paralel-ajan-dallarini-main-ile-ajana-birlestirtmek]]) ikinci bir göz oluyor: iki ajan da birleştirirken `main`'in hatasını buldu.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]]
