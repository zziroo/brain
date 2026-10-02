---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, test, kamp, yol-bulma, inceleme]
source: oturum 2026-10-02 (incremantal-game), 2. inceleme turu ve ardından yapılan düzeltmeler
---

# "Tıkla, oraya yürüsün" düz çizgide giderse köşelerde takılır; birkaç elle seçilmiş nokta yerine tüm alanı tara

## Ne oldu
Kampta bir yere dokununca bekçi oraya düz çizgide yürüyordu; engeller yuvarlak çarpışma alanlarıyla itiyordu. İnceleme ajanı kampı 600 noktadan örnekleyip gösterdi: kapıya yandan dokunulduğunda başlangıç noktalarının %8–12'sinde bekçi çit ile kapı direği arasındaki köşede 6 saniye yerinde sayıyordu. Benim testlerim "kamp ateşinin yanından kapıya" gibi 3–4 olağan konumdan yapıldığı için hepsi geçmişti.

Düzeltirken aynı şey üç kez daha çıktı, her seferinde tarama sayesinde: tam karşıdan gelince yuvarlak engelin etrafından kayılamıyor (kamp ateşinin tam güneyi), birbirine yakın iki engel arasında çıkmaz oluşuyor (kazan + Vırak, teleskop + Ülker), engel ile çit arasında 2 birimlik yarık kalıyor (Kandil).

## Ders
- Yuvarlak engele doğru itmek, hedef engelin tam arkasındaysa hiç kaydırmaz, neredeyse arkasındaysa çok yavaş kaydırır. Engelin **teğetinden** yürü ve hangi yandan dolaştığını hatırla (her karede yeniden seçilirse iki yan arasında gidip gelir).
- İçbükey köşeler (çit + direk, iki yakın engel) yerel yönlendirmeyle çözülmez. Ya ara nokta ver (kapıya giden yol kapı ağzından geçer, çite yakınken önce geri çekilir), ya da o yanın tıkalı olduğunu önceden yokla ve diğer yanı seç.
- Son çare olarak ilerleme bekçisi koy: 0,4 saniyede 8 birimden az yol alındıysa işi bırak. Altı saniye yerinde saymaktan iyidir.
- Yerleşimi olan her şeyde testi **ızgara taraması** olarak yaz: her başlangıç noktası × her hedef × birkaç kare hızı. Bu projede `tools/dev.js` içindeki `campSweep()` ~500 noktadan kapıya ve tüm istasyonlara gidişi 3 saniyede deniyor; yerleşim ya da yönlendirme değişince yeniden çalıştırılır.
- İnceleme ajanına kodu **çalıştırma** imkânı ver (gerçek modülleri Node'da sahte DOM ile sürdü). Yalnız okuyarak "takılabilir" denirdi; çalıştırınca oran ve koordinat geldi.

İlgili: [[2026-10-02-duran-imlec-geri-alinamayan-esigi-gecirmemeli]], [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
