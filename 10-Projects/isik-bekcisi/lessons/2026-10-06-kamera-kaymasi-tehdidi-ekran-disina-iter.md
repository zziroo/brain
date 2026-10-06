---
type: lesson
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, kamera, okunurluk, inceleme]
source: oturum fb8e3060 (incremantal-game); inceleme + şüpheci, commit 1773c16 (js/view.js)
---

# Ders: odakta kamera ileri kayınca arkadaki tehdit ekran dışında kalabilir; oyun kuralı "görünüyor mu?" sorusunu çizimle aynı hesaptan sormalı

## Ne oldu
Işın tutarken kamera ışının yönüne doğru kayıyor; Harabeler'de ekran yüksekliğinin %42'si kadar. Pervanenin döndüğü halka ise Mağara ve Harabeler'de ekranın alt kenarını geçiyordu.

Sonuç olarak dalışa hazırlanmaların ~%8'i ekran dışında oluyordu. Hazırlanma sesi yalnız sağ-sol ayırıyordu, arkadan geleni belli etmiyordu. Bu durum "karanlık tehdidi gizlemez" kuralını bozuyordu.

İnceleme ajanı bunu kamera formülünü bot benzetimine ekleyerek buldu. Şüpheci ajan da bağımsız olarak doğruladı. Bot hiçbir şey fark etmemişti, çünkü kendi "ekranda mı" hesabı kamera kaymasını hesaba katmıyor.

## Ders
- Kameranın nereyi gösterdiğinin hesabı tek bir yerde durmalı. Bu oyunda o yer `js/view.js`: hem render.js hem run.js kullanıyor. Çizim ile kural ayrı formüller kullanırsa sessizce birbirinden kayar.
- Pervane görünmeyen yerdeyken dalışa geçmiyor, bekliyor ve görünür tarafa doğru dönüyor. Ekran dışından dalışlar %8'den %1'in altına indi, denge değişmedi.
- Şüphecinin ölçümü, ilk akla gelen kestirmenin ("odaktaysa ve nişanın arkasındaysa beklet") yanlış olduğunu gösterdi. Bu kural odak bırakıldıktan sonra da süren kaymayı kaçırıyor, gerekmeyen yerlerde de bekletiyordu. Bunun yerine geometrik test kullanıldı.
- Botun `onScreen()` hesabı kamera kaymasını hâlâ yok sayıyor. Bunu değiştirmek yeni bir taban ölçüm gerektiriyor; bu not CLAUDE.md'de de var.

## İlgili
- [[2026-10-06-pervane-doner-sonra-dalar]]
- [[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]
- [[2026-10-02-kamera-kayarken-imlecin-dunya-konumu-da-kayar]]
