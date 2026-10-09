---
type: lesson
project: tussle
date: 2026-10-09
status: active
tags: [tussle, ders, ui, yayin]
source: oturum 2026-10-09 (mobil-playus: kapaklar ve Antrenman düzeltmesi)
---

# Kapak turu dersleri

- **Oyun sayısıyla büyüyen UI'ya üst sınır koy.** Ana sayfa Antrenman satırı `gameIds.map(coverThumb)` ile her partide uzadı; 40 oyunda telefonda taştı ve kimse fark etmedi çünkü masaüstünde bakılıyordu. Yeni parti eklerken oyun listesini dolaşan her ekranı telefon genişliğinde (375 px) kontrol et.
- **Kapakta küçük boyut belirleyici:** 48 px'te rakam/metin okunmuyor, siluet + tek odak nesne + maskot taşıyor. Panel renkleri 36 oyunda çakışmaya başladı (vinc~matematik, cark~renk, ritim~denge); toptan tema düzenlemesinde renk dağılımına bakılmalı.
- **Auto mode yayın komutlarını engelleyebilir:** sohbette verilen genel "ssh izni veriyorum" sonrası bile commit+push+ssh tek komutta "Remote Shell Writes" olarak reddedildi; Yusuf izni açıkça yineleyince ayrı ayrı komutlar geçti. Yayın adımlarını (commit, push, yedek, deploy) tek dev komutta birleştirme.

İlgili: [[2026-10-09-tussle-kapaklar-ve-antrenman-duzeltmesi]], [[2026-10-09-parti-d-e-f-dersleri]].
