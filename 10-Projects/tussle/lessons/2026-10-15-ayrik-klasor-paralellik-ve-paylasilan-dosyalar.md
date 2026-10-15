---
type: lesson
project: tussle
date: 2026-10-15
status: active
tags: [tussle, ders, orkestrasyon, worktree]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Ayrık oyun klasörlerinde paralel ajan worktree'siz çalışır; paylaşılan dosyaları koordinatör sonda düzeltir

- 5 denge ajanı (4 denge + 1 silme) aynı çalışma kopyasında, ayrık oyun klasörlerinde sorunsuz çalıştı; worktree gerekmedi.
- Paylaşılan dosyalar (i18n, kapaklar, registry testleri) ajanlara yasaklandı; ajanlar gereken değişikliği raporda yazdı, koordinatör sonda tek seferde uyguladı. Çakışma çıkmadı.
- Worktree'deki dallar (gün kayması, sohbet), ana kopya kirliyken i18n yüzünden birleşemedi; denge commit'leri atılınca birleşti. Kural: **paylaşılan dosyalara dokunan worktree işlerini ana kopya temizken birleştir.**

İlgili: [[2026-10-13-parti-i-ve-sure-modeli-dersleri]] (ortak kayıt dosyası çakışmaları), [[2026-10-15-ajanlar-ortak-calisma-kopyasinda-git-stash-yasak]], [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].
