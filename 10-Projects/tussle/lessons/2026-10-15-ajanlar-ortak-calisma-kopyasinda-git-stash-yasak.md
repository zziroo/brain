---
type: lesson
project: tussle
date: 2026-10-15
status: active
tags: [tussle, ders, orkestrasyon, git]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Paylaşılan çalışma kopyasında ajanlar git stash / checkout çalıştırmamalı

- Oyun silme ajanı, diğer ajanlar aynı çalışma kopyasında dosya düzenlerken `git stash` / `git stash pop` çalıştırdı. Bu sefer zarar olmadı, ama stash başkalarının yarım değişikliklerini de alır; pop sırasında çakışma ya da kayıp olabilir.
- Kural: paylaşılan çalışma kopyasında çalışan her ajanın brief'ine "**git stash yok, git checkout yok**" ekle; ajan yalnız kendi dosyalarını düzenler, git durumunu değiştirmez.
- Not: tek ajanın çalıştığı durumda `git stash -u` geri alınabilir bir kurtarma yolu olarak işe yaramıştı ([[2026-10-09-parti-b-c-dersleri]]); yasak paralel ajanlar içindir.

- **Tekrarladı (19 Eki, denge partisi, 11 paralel ajan):** brief'te yasak yoktu; ölçüm için "eski sürüm" tabanı almak isteyen iki ajan `git stash`/`pop`, biri kendi dosyasında `git checkout` çalıştırdı. Zarar çıkmadı ama o saniyelerde test koşan diğer ajanlar HEAD görmüş olabilir. Yasak artık **ortak brief'in en başında** olmalı ve tabanın yolu da yazılmalı: `git show HEAD:<yol> > <scratchpad>/eski.ts` ya da yalnız kendi sabitlerini aç/kapa.

İlgili: [[2026-10-19-tussle-denge-partisi-oda-kilidi]], [[2026-10-15-ayrik-klasor-paralellik-ve-paylasilan-dosyalar]], [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].
