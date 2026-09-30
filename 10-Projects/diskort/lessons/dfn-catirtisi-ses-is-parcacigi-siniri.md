---
type: lesson
project: diskort
date: 2026-09-28
status: active
tags: [ses, dfn, catirti]
source: C--dev-diskort 4b7b1382
---

# Ders: DeepFilterNet çatırtısı: ses iş parçacığına ayrılan ~2,7 ms süre tek tük yavaş karede aşılabiliyor; karşı taraf çatırtı duyar, konuşan duymaz.

- Kullanıcıya gelen dış analizin iddiaları kodla kontrol edildi: "jitter buffer 30 ms" yalnızca README satırıydı (kodda yoktu); "ana iş parçacığı sesi tıkıyor" yanlış (işlem ayrı worklet'te); "RNNoise'a geç" kaliteyi düşürür.
- Doğru kalan: model 10 ms'lik kareyi tek seferde işliyor, ortalama yük korumasına rağmen tek tük yavaş kareler mikrofon sesinde boşluk bırakır.
- Teşhis sorusu: çatırtıyı kim duyuyor? Başkası beni çatırtılı duyuyorsa kaynak benim filtrem; ben herkesi çatırtılı duyuyorsam ağ/çıkış aygıtı. "Standart" ile denendi: çatırtı kayboldu -> filtre sebep.
- Çözüm: [[gurultu-engelleme-dpdfnet-varsayilan]]; Android'de eşik hem ortalamaya hem aşım oranına bakar.

## İlgili
- [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]]
- [[dpdfnet-fallback-koku-neden]]
