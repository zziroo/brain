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
- Aynı gün ikinci tur (Yayın 1, 15 ajan): ajanlara i18n tr/en'de **yalnız kendi oyununun satırlarını** Edit ile değiştirme izni verildi ("dosya değiştiyse satırları yeniden oku, asla tüm dosyayı yazma"); 15 ajan paralel yazdı, çakışma çıkmadı, koordinatör sonda toplu düzeltme yapmadı. Tek yan etki: Vite sık yeniden yüklendi ([[2026-10-15-vite-yeniden-yuklemeleri-tarayici-testini-boluyor]]) ve bir ajanın ara hali (`MAX_ROUNDS` export'u) uygulamayı birkaç dakika kırdı; tarayıcı testi yapan ajanlar bunu beklemeyi bilmeli.

İlgili: [[2026-10-13-parti-i-ve-sure-modeli-dersleri]] (ortak kayıt dosyası çakışmaları), [[2026-10-15-ajanlar-ortak-calisma-kopyasinda-git-stash-yasak]], [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]].

## Ek (2026-10-22, kapışmaya davet + huni oturumu)
- İki opus ajanı aynı sunucu dosyalarına (live.ts, api.ts, db.ts) dokunacaksa biri worktree'de çalışır; brief'te **göç numaraları önceden paylaştırılır** (A: 27, B: 28) ve "hunk'ların küçük/yerel olsun" denir. Böyle yapınca live.ts ve api.ts kendiliğinden birleşti; yalnız `MIGRATIONS` sonu ve kod haritasının aynı satırı çakıştı, elle çözüldü (B'nin "28" yorumlu göçü dizide 27. sıradaydı; inceleme bu tuzağı yakaladı, sıra merge'de düzeltildi).
- İki iş arasındaki bağ (davet olaylarının tabloya yazılması) ayrı bir üçüncü ajana bırakıldı: B'ye "olay yazma, `// EVENT:` yorumu bırak" denildi. İki ajanın birbirinin henüz var olmayan koduna bağımlı olmasından ucuz.
- Worktree'deki ajan tabanı eski commit'ten (7042573) açılmıştı; merge yine sorunsuzdu ama test sayıları farklı çıktı, şaşırtmasın.
