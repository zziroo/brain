---
type: lesson
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, okunurluk, gorsel, inceleme]
source: oturum fb8e3060 (incremantal-game); e19451e ile e19451e^ karşılaştırması
---

# Ders: düşmanların görünüşünü "tek aile" diye birleştirmek, birinin okunurluğunu sessizce geriletebilir; her düşmanı kendi hızı ve doğduğu mesafeyle tart

## Ne oldu
Karacık güncellemesi (`e19451e`) pervane, gölge ve dikene sürüyle aynı görünüşü verdi: mürekkep gövde, solgun gözler, dumanlı kenar. Karar notu "kuralları değişmedi" diyordu, inceleme de bunu doğruladı.

Ama pervanenin karanlıktaki kırmızımsı parıltısı da bu sırada kaldırıldı. Pervane ormanın ana tehdidi ve en hızlı düşmanı: halenin ~330 birim dışında doğuyor, 160 birim/sn ile geliyor. Parıltı gidince karanlıkta yalnız ~2 piksellik gözleri kaldı. Yusuf ertesi gün oynarken "halka dışında seçilemiyor" dedi.

Ne inceleme ne bot bunu yakaladı. Bot zaten her şeyi görüyor.

## Ders
- Bir görünüm değişikliği kuralları değiştirmese de oyunu değiştirebilir.
- Her düşman için şu hesap yapılmalı: oyuncunun onu ne kadar süre göreceği (doğduğu mesafe ÷ hız) ve bu sürenin ne kadarında ekranda gerçekten seçilebildiği. Hızlı ve uzaktan gelen düşman, yavaş olandan daha fazla işaret ister.
- Görsel bir değişiklikten sonra halenin dışındaki her düşmanı, en koyu zeminde (Mağara) ve en uzak kamerada (Harabeler) ekran görüntüsüyle karşılaştır. Eski ve yeni yan yana konunca gerileme hemen görünüyor.
- İnceleme ajanına açıkça "bu değişiklik neyin okunurluğunu azalttı?" diye sor.

## İlgili
- [[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]
- [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]]
- [[2026-10-04-zorunlu-donus-noktasi-hikaye-kapisi-olabilir]] (benzer: değişiklik, kimsenin yazmadığı bir varsayımı bozdu)
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
