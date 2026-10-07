---
type: lesson
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, erisilebilirlik, isiga-duyarlilik, inceleme, test]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); iki inceleme turu ve şüpheci ajanın başsız denemeleri
---

# Ders: ışığa duyarlılık sınırı (saniyede en fazla 3 kararma) tek bir yerde, bütün kararmalar sayılarak korunmalı; basma düzenleri başsız taranmalı

## Ne oldu
Işın ısınınca tekliyor. Bir kararma, ışının tamamını ve karanlıktaki açıklığını kısa süre %38'e indiriyor. Erken oyunda koni ekranın büyük kısmını kaplıyor. Kural: saniyede en fazla 3 kararma.

Üç ayrı açık bulundu:
1. **Titreşim:** ilk sürümde 1,2 + 3,1 + 5 Hz'lik titreşim karanlıktaki açıklığı %33'e kadar indiriyordu. İnceleme yakaladı. Açıklık sabit bırakıldı, yalnız parıltı hafifçe titredi.
2. **Hızlı basış:** sonra kararmalar arası 0,5 sn kuralı eklendi. Ama bırakınca sayaç sıfırlanıyordu (`R.dipNext = 0.2`). Saniyede 3–4 kez basan biri her basıştan 0,2 sn sonra bir kararma alıyor, saniyede 4–5 kararma oluyordu. İnceleme ajanı bunu bir betikle yeniden üretti. Şüpheci ajan ayrıca, son saniyedeki iki "tekleme"nin basma düzeniyle pompalanarak sınırı tek başına aşabildiğini, önerilen tek satırlık düzeltmenin yetmediğini gösterdi.
3. **Görsel efekt:** düzeltmeden sonra bile aşırı ısınma anında halenin 0,3 sn kısılması sayaca girmiyordu; bir saniyede 4 kararma yine mümkündü. Bu bulgunun şüpheci kontrolü oturum kesilince yarım kaldı.

## Ders
- Işığa duyarlılık sınırını tek bir yerde uygula. Son üç kararmanın zamanını tutan kayan bir pencere işe yarıyor (`R.dipAt`, `room()`). Teklemeler, kısılmalar ve görsel efektler dahil her kararma o pencereden geçmeli. "Çizim kendi başına kararma eklemez" iddiasını kodla doğrula.
- Bir aralık kuralı bırakınca sıfırlanıyorsa, hızlı basan oyuncu onu aşar. Kuralları yalnız sürekli basılı tutma için değil, bas-bırak düzenleri için de test et.
- Test yöntemi: oyunun modülleriyle başsız bir betik yaz. 30/60/90/144 fps'te tutma ve bırakma sürelerinden bir ızgara tara ve "herhangi bir saniyede en çok kaç kararma" say. Elle oynayarak bu bulunmaz.

## İlgili
- [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]]
