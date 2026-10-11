---
type: lesson
project: tussle
date: 2026-10-11
status: active
tags: [tussle, hud, css, ders]
source: oturum 2026-10-10/11 (mobil-playus: günlük şerit, üst düzen)
---

# Üst düzen ve şerit dersleri

- **Yusuf'un gösterdiği referans ekran çoğu zaman bir yerleşim örneğidir, mevcut öğeyi kaldırma isteği değildir.** Playus görselleri "şeridi en üste koysak" için gösterildi; Claude şeridi avatar+puan dizisiyle değiştirmeye kalktı, ajan yarı yolda durduruldu. "Bunu mu kastediyorsun" diye tek cümleyle teyit et.
- **Yarım kalan tercihler tekrar sorulur.** İnce çizgi şerit "sen bilirsin" ile yapıldı; Yusuf sonra "vazgeçmiştik" sandı. Görünüm değişikliğini yaptıktan sonra önce/sonra görüntüsüyle açıkça göster.
- **CSS `rotate`/`translate` özellikleri `transform`'dan önce uygulanır.** Eğik bir etiketi `transform: translate()` ile yerleştirmek onu döndürme açısı kadar kaydırır; yerleştirmeyi `translate` özelliğiyle yap. Aynı tuzak: noktaların zıplama animasyonu (`scale`) `transform: translateX` konumunu da ölçekleyip noktayı şeridin dışına fırlatıyordu.
- **Görünüm düzeltmesinde önce ortak nedeni bul.** Şeridin oyun yazılarına binmesi 50 oyunda tek tek değil, sözleşmeye `Viewport.band` eklenerek çözüldü; yeni oyunlar da uyar. Aynı turda bir "bant büyüyünce örtü de büyüyor" yan etkisi adalet sorunu yaratıyordu (Çizgi Takip'te ileriyi daha çok gizleme) — inceleme yakaladı.
- **Toplu ekran görüntüsü (contact sheet) tek tek bakmaktan hızlı.** 50 oyunun üst 300 px'i tek görselde; çakışmalar ve tutarsızlıklar (kompakt mod, Jöle'nin tur süresi) bir bakışta göründü. Araç: scratchpad `shot.mjs` (CDP + harness ile `createGameScreen`).
- **`timeBar()` gibi paylaşılan çizim yardımcısına mod kuralı koyma.** "Son 5 sn kırmızı" yardımcıya konunca onu doğrudan çağıran iki oyunun (Doldur, Kapı) çubuğu baştan kırmızı oldu; kural çağırana (`Hud.draw`) taşındı.

İlgili: [[2026-10-11-oyun-ici-ust-duzen-ve-gunluk-serit]], [[2026-10-10-m1-dersleri]].
