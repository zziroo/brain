---
type: session
project: ziroo-edge
date: 2026-10-17
status: done
tags: [maskot, ziroo-net, ana-sayfa, animasyon]
source: oturum "ziroo-edge: ana sayfa kapı ekranı turu" (2026-10-17, ZZ kök oturumundan başlatıldı)
---

# Oturum: ziroo.net kapı ekranı turu

## Ne yapıldı
- Kullanıcı geri bildirimi: fareyle kapılar arasında hızlı geçince Ziroo sürekli yukarı zıplıyordu, kapılara düşüş geç geliyordu, maskot daha ön planda olmalı, maskota tıklayınca tepki olsun, "GİR" yazısı gerekli mi.
- Commit `9628017` ve `d16f709`, kullanıcı onayıyla ziroo.net'e yayınlandı (`deploy-www.sh home`, dosyalar yereldekiyle aynı).
  - Neden: havadaki her yeni hedef yeni bir yukarı yay başlatıyordu. Çözüm: 90 ms hover beklemesi ve havadayken yaysız süzülme. Önizlemede 10 hızlı geçişte en çok ~50 px kalktı, tırmanma yok.
  - Düşüş eşiği öne alındı, düşüş, sekme ve kapı açma kısaldı. Ziroo kapıda daha büyük.
  - Ziroo'ya dokunma tepkileri her bölümde var; kapı zemininde gerçek zıplama ve kapı gösterme de var.
- Review ajanı bir orta bulgu buldu ve düzeltildi: fare Ziroo'nun üstüne geçince kapı kapanıp Ziroo eve dönüyordu.
- "GİR" için üç önizleme gösterildi; kullanıcı ışıklı eşiği seçti ve uygulandı (`d16f709`, review temiz).

- İkinci geri bildirim: en altta Ziroo başlığın üstünde kırpık duruyordu, fareyle daha eşzamanlı olmalı, kapılar sonradan açılıyordu, Ziroo kapılar arasında gezsin. `c95f913`:
  - Sayfa altta yeniden yüklenince `scrollY` bir an 0 okunuyor ama kutular kaydırılmış geliyordu. Kapı yerleri belgenin tepesine hesaplanıyor, Ziroo havada konuyordu. Ölçüm artık belge kökünün konumundan.
  - Masaüstünde kapı aralarında yürüme, kapılar fareyle hemen açılıyor. Review'daki iki küçük bulgu düzeltildi.
  - Kullanıcı onayıyla yayınlandı.

- Üçüncü geri bildirim: Ziroo yer değiştirmiyordu, yürüyüş takılıyordu, dönme tepkisi yapaydı, sayfa sonu ortalı değildi, fareyle havada gezme istendi (karma seçildi). `6ea6779`, review'daki iki küçük bulgu düzeltildi. Kullanıcı onayıyla yayınlandı.
- Süzülme alanı alt bilgiye kadar açıldı (`fc9f4c4`), yayınlandı.
- Telefonda alt kapılarda yanıp sönme bildirildi. Önizlemede tam yeniden üretilemedi. Olası neden: ortadaki kapı seçiminin eşik payı yoktu, iOS sayfa sonu esnemesinde Ziroo iki kapı arasında gidip geliyordu. Seçime kırpma, eşik payı ve 0,18 sn bekleme eklendi (`27b7168`). Gerçek telefonda doğrulanmadı.

## Alınan kararlar
- [[2026-10-16-ziroo-net-kaydirmali-2d-maskot]] (kapılar finali bölümüne eklendi)

## Açık kalanlar
- Hikâyede Ziroo'nun gövdesi tıklanabilir oldu; altında kalan bir bağlantı var mı tarayıcıda tam bakılmadı (balonlar Ziroo'nun üstünde).
- Safari/iOS ve gerçek fps hâlâ denenmedi.
