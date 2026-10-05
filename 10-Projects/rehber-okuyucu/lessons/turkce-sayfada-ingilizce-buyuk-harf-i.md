---
type: lesson
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, ders, css, dil]
source: oturum 2026-10-05, İngilizce AI araştırma belgesinde "DİFFİCULTY" görüldü
---

# `lang="tr"` sayfada `text-transform: uppercase` İngilizce metni "DİFFİCULTY" yapar

Tarayıcı büyük harfe çevirmeyi elementin diline göre yapar; Türkçe kuralda i → İ. Model ya da rehber metni (başka dilde olabilir) büyük harfle çiziliyorsa ya o elemana belgenin dilini `lang` ile ver, ya da büyük harfe çevirme. Rehber Okuyucu'da bilgi etiketlerine `lang=<belge dili>` verildi, tablo başlıklarında `uppercase` kaldırıldı. `h()` öznitelik izin listesine `lang` eklenmesi gerekti (yoksa hata fırlatır).

Bağlantı: [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
