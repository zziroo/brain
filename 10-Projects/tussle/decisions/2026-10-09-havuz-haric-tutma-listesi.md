---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, havuz, sunucu, migrasyon]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A)
---

# Karar: Oda havuzu "hariç tutulanlar" listesi; yeni oyunlar her odaya otomatik girer, günün oyunu rotasyonlu

## Bağlam
Havuz oda açılırken "o anki tüm oyunlar" listesi olarak kaydediliyordu; sonradan eklenen oyunlar eski odalara girmiyordu. 50 oyun hedefiyle bu her partide sorun olurdu.

## Karar
- `RoomSettings.pool` → `excluded: string[]`; etkin havuz = kayıt sırası − excluded, asla boş (sunucu `settings.pool_empty`, yükleyici hepsi dışlanmışsa `[]`'a düşer). Migration 6: `excluded = 4 M0 oyunu − eski pool` (registry'ye bağlı değil, sabit liste; böylece yeni oyunlar eski odalarda dışlanmaz).
- Günün seçimi: son `min(7, n−2)` günde çıkan oyun tekrar etmez, aynı birincil etiket üst üste en çok 2 gün; geçmişi yoksa eski `pool[h % n]` ile aynı sonuç, kayıtlı günler değişmez.

## Neden
Host "ne istemediğini" seçer; yeni içerik kendiliğinden ulaşır. Rotasyon çeşitlilik verir ama 2 aday bırakarak yarının oyununu öngörülemez tutar.

## Reddedilen alternatifler
- Her yayında eski havuzlara yeni oyunları ekleyen migration: host'un bilinçli kapattığı oyunu ayırt edemez.
- Sıkı rotasyon (havuz − 7 gün tamamı): yarının oyunu tahmin edilebilir olurdu.

## İlgili
- [[2026-10-09-oyun-uretim-kiti-ve-partiler]]
