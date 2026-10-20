---
type: resource
project: genel
date: 2026-10-20
status: active
tags: [claude-kullanim, token, arastirma, kod-grafigi]
source: ZZ oturumu "araştırma: tweet doğrulama" (2026-10-20); x.com/bakigulai tweet'i, github.com/bgts-ai-org/bgts-context-engine README (5d8ad23, 9 Ekim)
---

# BGTS Context Engine: rakamlar README ile tutarlı ama yalnız dosya bulmayı ölçüyor; kurulmadı, yerine düz kod haritası

## İddia
Bir tweet, Oğuz Öztürk ve Enes İyidil'in (BGTS) açık kaynak aracını tanıttı. Araç ajana ilgili fonksiyonları ve bağımlılıkları önceden çıkarıyor (AST, embedding, kod grafiği, karar modeli). Tweet'teki rakamlar: 600 görevde %82 daha az token, %89 daha az araç çağrısı.

## Repoda bulunanlar
- MIT lisanslı, 8 Eylül 2026'da açılmış, 87 yıldızlı. Rakamlar README'deki sonuç tablosuyla birebir aynı.
- Ölçülen iş: ajana merge edilmiş değişikliğin cümlesi veriliyor ve yalnız hangi dosyaların değiştiğini bulması isteniyor. Kod yazma ölçülmüyor.
- Ajanlar Cursor CLI ve OpenCode. Claude Code ile 600 görev koşulmamış; Claude Code hook'u yalnız 14 görevlik ayrı bir testte **%20** token azalması göstermiş.
- Maliyet düşüşü %63'te kalıyor, çünkü tasarrufun çoğu ucuz önbellek okumasından geliyor. İki ajan da tek fiyat tablosuyla (GLM 5.3 Flash) fiyatlanmış.
- Güçlü modelde recall düşüyor (Cursor: %95,6 → %92,9). Precision %91'den %11'e iniyor, çünkü ajan ~15 dosya döndürüyor.
- Test düzeneği ve görev seti yayımlanmamış. Rakamlar bağımsız doğrulanamıyor.
- Ağır kurulum: PostgreSQL 16 + Apache AGE + pgvector. Varsayılan "embedding" anlamsal değil, deterministik.

## Sonuç
- Fikir doğru ve bizim verimizle örtüşüyor: mobil-playus ajanlarının Bash çağrılarının ~%60'ı grep/sed/cat.
- Kurulmadı. Yerine düz Markdown kod haritası seçildi ([[2026-10-20-token-ucuncu-tur-kod-haritasi-ve-kural-gozden-gecirme]]).
- Harita yetmezse kod grafiği araçları yeniden değerlendirilir: Graphify, Serena ve BGTS ([[2026-10-06-graphify-ve-ponytail-incelemesi]]).
