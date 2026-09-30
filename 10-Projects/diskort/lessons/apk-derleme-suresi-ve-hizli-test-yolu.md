---
type: lesson
project: diskort
date: 2026-09-27
status: active
tags: [android, derleme, ota]
source: C--dev-diskort 2736605c, 126a55f0
---

# Ders: APK derlemesi her seferinde sıfırdan çalışıyordu; JS değişiklikleri OTA ile, test derlemeleri ayrı hızlı yolla gitmeli.

- Ölçüm: derlemenin ~9,5 dakikası tek Android adımında; 751 derleme işinin 751'i yeniden çalışıyordu çünkü android klasörü her seferinde baştan üretiliyordu (önceki derlemeden hiçbir şey yeniden kullanılmıyordu).
- Çözüm yönü: JS için OTA ([[mobil-ota-guncelleme-kendi-sunucuda]]) ve hızlı test derlemesi; native parmak izi değişmediyse CI önceki APK'ları yeniden kullanır.
- Kendi PC'mizde derleme fikri denendi, kullanıcı vazgeçti.

## İlgili
- [[2026-09-27-ota-ses-filtresi-roller-dm]]
