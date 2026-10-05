---
type: lesson
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, trados, sdlxliff, xml, ders]
source: oturum 2026-10-05 (document-formatter), iki gerçek sdlxliff incelendi
---

# Trados `.sdlxliff`: paragraf = trans-unit, cümle = `mrk mtype="seg"`; biçim etiketleri dosya başına, metinde yorum/varlık düğümleri olabilir

- Her `trans-unit` bir paragraf; `seg-source` ve `target` içinde cümleler `<mrk mtype="seg" mid=…>`. Durum `sdl:seg conf` (Translated, Draft, ApprovedTranslation…).
- Biçim `<g id>` ile gelir, tanımı `sdl:tag-defs` içinde (`<cf bold=True italic=True …>`); kimlikler **her `<file>` için ayrı**, tek sözlükte birleştirmek yanlış stil verir. `<x>` yer tutucu (resim, alan, sekme): metin yok. Sayfa numarası gibi alanlar `<x>` olduğu için "Page 1 of 4" PDF satırıyla eşleşmez.
- Link hedefleri ayrı trans-unit olarak gelebilir (yalnız `http://…/`); PDF'te görünmezler, eşleşmezler, sorun değil.
- `internal-file` içinde base64 zip olarak Trados'un ara DOCX'i gömülü.
- Ayrıştırma: `etree.XMLParser(resolve_entities=False, no_network=True)`; çocuk düğümlerde `isinstance(c.tag, str)` kontrolü yoksa yorum/işlem talimatı/çözülmemiş varlık `etree.QName` hatası verir (geçerli dosya reddedilir).
- Kaynak Word'e çevrilmiş DOCX ise (`…docx.sdlxliff`): tablo hücreleri sekmeyle ya da 2+ boşlukla tek paragrafta, sıraları PDF'ten farklı; PDF'teki bazı metinler (form başlıkları, kutulardaki yasal notlar) hiç yok.

## İlgili
- [[2026-10-05-sdlxliff-birincil-girdi]]
