---
type: lesson
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, ders, eslestirme, regresyon, test]
source: oturum 2026-10-05 (document-formatter), sdlxliff satır bulma ayarları
---

# Eşleştirme sezgisellerindeki her değişiklik iki belgede, önceki çıktıyla satır satır karşılaştırılarak kabul edilmeli

Satır bulma ve Türkçe bölme kuralları birbirini etkiliyor: bir yeri düzelten kural (ör. kısa etiketleri 2. tura ertelemek, paragraf ucundaki kısa parçayı komşuya eklemek) başka yerde "HAYIR" → "HA / YIR", "Food portion…" parçalarının yer değiştirmesi gibi bozulmalar getirdi. Toplam sayı ("837/852 yerleşti") bunu göstermiyor.

**İşe yarayan yöntem:** her değişiklikten önce `.eslesme.csv`'yi sakla, değişiklikten sonra iki belgede (MiniMed + RadiologyInfo) `id → turkce` farkını listele, değişen her satırı gözle iyileşme/bozulma diye ayır. Bozulma getiren denemeyi geri al; iki değişikliği aynı anda deneme (hangisinin neyi bozduğu ayrılamıyor).

Scratchpad'deki `cmp.py` (iki CSV'yi `;` ayraçlı `csv` ile okuyup farkları basar) bu iş için yeterliydi; CSV'de alanlar `;` içerebildiği için `cut -d';'` yanıltıcı.

## İlgili
- [[2026-10-05-sdlxliff-birincil-girdi]]
