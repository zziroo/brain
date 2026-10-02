---
type: decision
project: ceviri-araci
date: 2026-10-02
status: active
tags: [ceviri-araci, renpy, format]
source: 2026-10-02 oturumu, Yusuf'un gönderdiği script.rpy (İspanyolca→İngilizce tl dosyası)
---

# Karar: Ren'Py desteği yalnız tl çeviri dosyaları içindir; çevrilen metin etkin satırdır, yorumdaki orijinal bağlam olarak gösterilir

## Bağlam
Yusuf `.rpy` desteği istedi. Örnek, Ren'Py'nin `game/tl/english/` çeviri dosyası: her blokta `# who "orijinal"` yorumu ve etkin `who "English"` satırı, ayrıca `translate english strings:` içinde `old`/`new` çiftleri.

## Karar
- Çevirmene giden kaynak metin etkin satırdaki diyalog ve `new` değeri. Yorumdaki orijinal ve `game/script.rpy:NN` konumu Not/bağlam olarak gösterilir.
- Etkin metin boşsa (`translate <dil> --empty` şablonu) kaynak metin yorumdan ya da `old`'dan alınır.
- `translate english` başlığı bir dil kodu alanıdır: "Dil kodu alanlarını değiştir" seçilirse kaynak dildeki başlıklar `renpyLanguageName(hedef)` (tr→turkish) olur. "Dosya adlarını değiştir" seçilirse `tl/english/` → `tl/turkish/`. İki seçenek bağımsız ve varsayılan kapalı; biri seçilip diğeri seçilmezse yazma diyaloğu uyarır.
- Kaçışlar Ren'Py sözlük kurallarıyla okunur ve yazılır (ardışık boşlukta ters eğik çizgi + boşluk, `{{`, `\u` kaçışları).
- Ren'Py oyun kodu (`.rpy` betik) dosyaları desteklenmez; translate bloğu yoksa hata verilir.

## Neden
Arkadaşın işi İngilizce metni Türkçeye çevirmek; İspanyolca orijinal yalnızca anlamı netleştirir. Ren'Py klasör adına değil başlıktaki dil adına bakar, bu yüzden ikisi ayrı ayrı seçilebilir.

## Reddedilen alternatifler
- Yorumdaki orijinali kaynak almak: arkadaş İspanyolcadan değil İngilizceden çeviriyor.
- İki seçeneği birbirine bağlamak: [[2026-10-02-ortaklastirma-yok-dil-kodu-kullanicida]] kararıyla çelişir, uyarı yeterli.

## Sonuçlar / riskler
- Ren'Py oyun içinde denenmedi; kaçış ve boş `new ""` davranışı Ren'Py bilgisinden çıkarıldı (doğrulanmadı).
- Desteklenmeyen: `r"..."` ve backtick dizgileri, çok satırlı dizgiler (açık hata verilir).

## İlgili
- [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]
