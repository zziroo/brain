---
type: lesson
project: kul-tahti
date: 2026-10-02
status: active
tags: [web, onbellek, gelistirme-sunucusu]
source: oturum 2026-10-02 (web-boss-teaser entegrasyonu)
---

# Ders: `python -m http.server` önbellek başlığı göndermediği için tarayıcı düzenlenen ES modüllerini eskisinden çalıştırabiliyor

## Ne oldu
`main.js` düzenlendikten sonra sayfa yeniden yüklendi ama değişiklik çalışmadı. `performance.getEntriesByType('resource')` içinde `transferSize: 0` görüldü; Chrome, `Last-Modified` başlığına dayanarak modülü sezgisel önbellekten verdi.

## Çözüm
- Projeye `serve.py` eklendi: `SimpleHTTPRequestHandler` + `Cache-Control: no-store`.
- Zaten önbellekte duran dosyalar için sayfa içinde `fetch(dosya, { cache: 'reload' })` ile tek tek tazelemek işe yaradı.

## Uygula
Derleme adımı olmayan ES modülü projelerinde baştan no-store bir geliştirme sunucusu kullan; "değişiklik çalışmıyor" durumunda önce `transferSize` ile önbelleğe bak.

## İlgili
- [[_overview]]
