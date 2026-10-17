---
type: lesson
project: ziroo-edge
date: 2026-10-17
status: active
tags: [performans, mobil, css, animasyon]
source: oturum "ziroo-edge: 2D kaydırmalı Ziroo ana sayfa" (2026-10-16, "mobilde Diskort ve sonrası kasıyor")
---

# Ders: Telefonda dev katmanlar, `scale(4)` ile büyütülen katman ve hiç durmayan rAF döngüsü takılma yapar

## Ne oldu
Kaydırmalı hikâyede telefonda Diskort'tan sonrası takılıyordu. Nedenler:
- Üç adet 120vmax ses halkası sonsuz ölçeklenerek dönüyordu; her harf ayrı ayrı sallanıyordu.
- Fener ışığı 70vmax çizilip `scale(4)` ile yaklaşık 2363 piksele büyütülüyordu.
- Araçlar ve son bölümde JS döngüsü kaydırma durunca da her karede SVG özniteliği yazıyordu. Bu yüzden maskot sürekli yeniden boyanıyordu.

Düzeltme:
- Döngü her bölümde kaydırma oturunca duruyor; sürekli küçük hareketler CSS'e taşındı.
- Halkalar 2 tane ve yaklaşık 500 piksel.
- Işık ölçeksiz, yalnız kaydırılıyor.
- Telefonda harf harf sallanma ve bir parçacık katmanı kapalı.
- Kullanıcı sonra takılmadan şikâyet etmedi.

## Nasıl uygulanır
- Hiçbir katman ekranın yaklaşık 1,5 katını geçmesin; büyük katmana `scale > 1` verme.
- Döngünün "meşgul" koşulu yalnız gerçekten hareket varken true dönsün. Durunca kaç kare çizildiğini say: 2 saniyede 0 kare olmalı.
- Durgun hâlde sürekli dönen JS animasyonu yerine CSS animasyonu kullan. Bölüm ekran dışındayken durdur (`IntersectionObserver` + sınıf).
- `will-change` yalnız hareket sırasında: ölçeklenmiş katman durunca son boyunda keskin çizilsin, yoksa büyük hâli bulanık kalır (Ziroo'nun eli tırtıklı görünüyordu).

## İlgili
- [[animation-kisayolu-duraklatma-kuralini-ezer]]
- [[decisions/2026-10-16-ziroo-net-kaydirmali-2d-maskot]]
