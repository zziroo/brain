---
type: lesson
project: tussle
date: 2026-10-12
status: active
tags: [tussle, ders, orkestrasyon, tarayici]
source: oturum 2026-10-12 (mobil-playus: denge ve sade tema turu)
---

# Denge ve sade tema turu dersleri (15 paralel ajan, 48 oyun dosyası)

- **Gizli tarayıcı bölmesinde oyun duraklıyor; canvas yakalama yöntemi işe yarıyor.** Bölme gizliyken `document.hidden` true, rAF ~1 fps, screenshot zaman aşımı. Çözüm (pilot ajan): sayfaya `document.hidden`/rAF taklidi enjekte et (MessageChannel ile ~60 fps), oyunu başlat, canvas'ı `toDataURL` ile 127.0.0.1'deki küçük bir Node alıcıya POST et. Betikler repoda `scripts/canvas-shot/`. Tek alıcı bütün ajanlara yetiyor (`?n=<ad>`).
- **Gece teması oyun ekranı kurulurken okunuyor.** Sayfa yüklendikten sonra `data-theme` değiştirmek yetmez: `#/`'a gidip oyuna geri dön. `localStorage` ortak, ajanlar ayarı bozuyor; `dataset.theme` ile sekme içinde kal.
- **Tarayıcı sekme sınırı 9.** 9 ajan + koordinatör sekmesi dolunca `tab cap reached`; ajan beklemeli, koordinatör kendi sekmesini kapatmalı. Ajan brief'ine "sekme alamazsan 60 sn bekle, 3 kez dene" ekle.
- **Boşluk tuşu her oyunu başlatmıyor** (Jöle, Doldur, Ritim): "Başla" düğmesine `click()`. Aksi halde "önce" görüntüsü başlangıç kartı arkasındaki kare olur.
- **Paralel ajanlar aynı Vite'ı paylaşınca HMR sık yeniden yükler;** yarım dosya bütün uygulamayı kırabilir (kes/sim.ts `HEARTS` export'u). Büyük yeniden yazımı önce scratch'e, sonra tek `cp` ile yerine koy.
- **Ajanın "benim dosyalarımda hata yok" iddiasına güvenme:** bir ajan 4 kullanılmayan değişken bıraktı (`TS6133`), koordinatör tam typecheck'te yakaladı. Tam typecheck + test + build koordinatörde.
- **Tek-hata/kısa koşu oyunlarında `expectNoStepAllocation` sim oluşturmayı ölçmeye başlıyor;** düğmeye düşen `spots` + sık `tapEvery` ya da tavana koşan ayrı GC testi gerekir (inceleme Kaç Tane'de kör GC testini yakaladı).
- **Kural değiştiren sürüm atlamasında deploy günü karışması:** sunucu eski sürümle başlatılan koşuyu 409 ile reddeder ama sabah yapılmış eski-ölçü denemeler aynı gün tablosunda kalır. Deploy öncesi canlı DB'yi salt-okunur sorgula (bugünün gün satırları + attempts); etkilenen odada deneme yoksa deploy et. Yeniden puanlama (migration 10) yalnız score() değişimlerinde çalışır; `server-rescore.test` artık adımı geçen oyunları `PAST` olarak atlıyor.
- **Süs silinirken bilgi silinebilir:** hız kadranı, ekşi silüeti, renk ayrımı. Sade kural brief'ine "bilgi taşıyan her görselin sade karşılığı olmalı" maddesi ve incelemeye "kaybolan bilgi" sorusu eklendi; incelemeler 4 böyle kayıp buldu.
- **Uzak komutta `$(cd …)` yerel klasörü arar.** Yedek dosya adı boş kaldı (`pre-.db`), elle yeniden adlandırıldı; rev'i önce yerelde değişkene al.

İlgili: [[2026-10-12-oyun-sahnesi-sade]], [[2026-10-09-ajanlar-tarayicida-oynar]], [[2026-10-11-parti-gecesi-dersleri]].
