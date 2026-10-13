---
type: lesson
project: tussle
date: 2026-10-13
status: active
tags: [tussle, ders, orkestrasyon, worktree, test]
source: oturum 2026-10-13 (mobil-playus: eleme, süre modeli, Parti I)
---

# Parti I ve süre modeli dersleri (worktree ajanları, çakışmalar, inceleme)

- **Worktree ajanı ana sunucuları değil ana checkout'u görür.** Ana 5173 (Vite) / 8087 sunucuları ana kopyayı servis eder; worktree'deki değişiklik orada görünmez. Her ajan kendi Vite portunu ve kendi canvas-shot alıcı portunu açmalı; `node_modules` ana kopyadan link'lenebilir.
- **Ortak kayıt dosyalarında hep "ikisini de tut" çakışması.** Dört worktree registry/i18n/covers/icons'a aynı anchor'dan ekleyince her merge çakışıyor; çakışma işaretlerini silen küçük bir script yetiyor (içerik zaten iki taraf da).
- **Paralel ajan yükü altında GC/zaman aşımı testleri kararsız** (bicak, sepet, yilan, karsiya); tek başına geçiyor. Önce tek başına yeniden koş, sonra hata say.
- **İnceleme bulguları:** tahsis testi gerçek girdi vermiyorsa adımı ölçmüyor (Basket); teknik tavanda yarım kalan son tur hile bayrağını atlatıyordu, bayrak yalnız biten turları yargılamalı (Renk Hafızası, `2609905`); zorluk tick'ten değil kat edilen mesafeden ölçeklenmeli (Jetpack).
- **`will-change: transform` + rotate Android Chrome'da kenarı kırıyor;** CSS `rotate` özelliği kullan (sezon çipi).
- **Süre bonusu riskle ölçeklenmeli:** Çark'ta Dur'a sabit +3 sn sık bankayı ödüllendirdi; çeviriş başına +1 (en çok +5) ile düzeldi.

İlgili: [[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]], [[2026-10-13-parti-i-dort-hypercasual-oyun]], [[2026-10-12-denge-ve-tema-turu-dersleri]].
