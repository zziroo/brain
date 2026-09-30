---
type: lesson
project: diskort
date: 2026-09-26
status: active
tags: [diskort, installer, electron-builder, test]
source: memory diskurt-dev-environment.md
---

# Yerel installer/güncelleme testinde productName da ayrı olmalı, yoksa Yusuf'un gerçek oturumu kullanılır

Ayrı kimlik config'i (`extends: electron-builder.yml`, kendi appId/guid/name) yetmez; `extraMetadata.productName` de verilmeli. Aksi halde Electron userData yine `%APPDATA%\Diskort` olur (Yusuf'un gerçek ayarları/oturumu). 2026-09-26'da bir kez oldu: veri yazılmadı ama test uygulaması Yusuf'un oturumuyla girdi.

Besleme: `/updates/*` için 302 veren ve tek Range destekleyen bir Node sunucusu; paketlenmiş uygulama `DISKORT_UPDATE_URL` ile ona yönlendirilir.

## İlgili
- [[electron-cdp-testi]], [[dev-ortami-tuzaklari]]
