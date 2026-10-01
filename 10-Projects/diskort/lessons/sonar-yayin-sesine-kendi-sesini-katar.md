---
type: lesson
project: diskort
date: 2026-10-01
status: unverified
tags: [diskort, yayin, ses, sonar, teshis]
source: Claude Code oturumu 2026-10-01 (sinanse boğuk ses)
---

# SteelSeries Sonar kullanan yayıncının kendi sesi sistem sesli yayına karışır; halka yanmadan boğuk duyulur

- **Belirti:** bir kişinin sesi ara ara boğuk ve uzaktan geliyor, o sırada onun yeşil halkası yanmıyor.
- **İlk ayırt edici soru:** halka yanmıyorsa ses o kişinin mikrofon izinden değil, başka bir izden geliyordur; çoğunlukla yayın sesinden.
- **Olay:** sinanse sistem sesiyle ekran paylaşıyordu. İzleyenler onun kendi sesini yayından da duydu. Yusuf'un tahmini: SteelSeries Sonar, çünkü ses farklı bir kaynaktan çıkıyor.
- **Olası mekanizma (doğrulanmadı):**
  - Sonar, sesleri kendi sanal cihazlarına alıp kendi süreciyle yeniden çalar.
  - `restrictOwnAudio` yalnızca Diskort'un sürecini hariç tutar; bu yüzden Sonar'ın çaldığı ses yayına yakalanır.
  - Sonar'da mikrofon dinlemesi (sidetone) açıksa kullanıcının kendi sesi de yayına girer. Bu ses iki kez kodlanır, gecikmeli ve boğuk gelir.
  - Ayrıca güvenlik kontrolü yayın sesini yalnızca `restrictOwnAudio === false` olduğunda kapatıyor; değer `undefined` gelirse kontrolden geçiyor.
- **Kullanıcı tarafında geçici çözüm:** Sonar'da mikrofon dinlemesini kapat, Diskort'un çıkışını doğrudan kulaklığa ver ya da yayını sistem sesi kapalı aç.
- Telemetri, yayında sistem sesinin açık olup olmadığını kaydetmiyor.

İlgili: [[uygulamaya-ozel-yayin-sesi-ertelendi]] · [[2026-10-01-sinanse-boguk-ses-ve-0-9-5]]
