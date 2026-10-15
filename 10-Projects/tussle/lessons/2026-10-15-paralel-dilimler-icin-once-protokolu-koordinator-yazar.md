---
type: lesson
project: tussle
date: 2026-10-15
status: active
tags: [tussle, ders, orkestrasyon, protokol, tarayici]
source: oturum 2026-10-15 (mobil-playus: Yayın 3 izleme)
---

# Paralel dilimler için ortak protokolü koordinatör önce yazar; sayaç tabanını (0/1) koddan doğrular

- Sunucu ve izleyici dilimleri aynı anda çalışsın diye `protocol.ts` tiplerini ve ayrıştırıcıyı koordinatör önce yazdı, plan belgesine (`docs/SPECTATE-PLAN.md`) dikişi koydu; iki opus ajan dosya çakışmadan paralel bitti, bağlama üçüncü dilimde yapıldı. İşe yaradı, tekrar kullan.
- Koordinatörün yazdığı protokol deneme sırasını 1 tabanlı varsaydı; sunucuda `tryIndex` 0 tabanlıydı, ilk deneme reddedilecekti. Ajan yakaladı. Ders: sayaç/indeks tabanını keşif ajanına açıkça sordur, tahmin etme.
- Aynı tarayıcıdaki sekmeler misafir kimliğini paylaşır; ikinci oyuncu için node bot (`scripts/dev/stream-bot.ts`: misafir girişi, odaya katıl, deneme başlat, bot günlüğünü gerçek zamanlı akıt, gönder) yeterli oldu. İki kişilik akışları böyle doğrula.
- Dev sunucu portları (8087, 5173) başka sohbetlerin oturumlarınca tutuluyordu ve 5 sunucu sınırı doluydu; ajan onların sunucusunu kullandı. Paralel sohbetlerde port/limit çatışmasını hesaba kat.
