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

**İçerik kaybını ölçmek:** eşleşme sayısı kaybı göstermez. sdlxliff'teki her Türkçe paragrafın kelimelerinden çıktıda hiç geçmeyenleri listelemek (kelime düzeyinde, harf dışı karakterler atılarak) gerçek kayıpları bulur; paragraf bütünü ya da ham alt dize karşılaştırması bölünmüş paragrafları ve sekmeli hücreleri yanlışlıkla "kayıp" gösterir.

**Kuralın kapsamını dar tut:** "aynı sayfada zaten kullanılmış konumdan kaçın" kuralı genel uygulanınca aynı etiketi taşıyan farklı paragraflar kötü eşleşmeye kaydı ("YES" → "iyi", "Lunch" → "Öğle"); yalnızca **aynı Trados paragrafı içindeki** tekrar (çok sütunlu formlar) için uygulanınca bozulma kalmadı. Benzer şekilde "hücre kenarına hizalı eşleşme temizdir" kuralı yalnız gerçekten sekmeli/boşluklu paragraflarda geçerli olmalı, yoksa her paragrafın son kelimesi temiz sayılıyor.

## İlgili
- [[2026-10-05-sdlxliff-birincil-girdi]]
- [[2026-10-05-cevrilen-her-metin-gorunsun]]
