---
type: lesson
project: tussle
date: 2026-10-23
status: active
tags: [tussle, ders, orkestra, ajan, tarayici]
source: oturum [[2026-10-23-tussle-oyun-ici-duzenleme-turu-telefon-notlari]]
---
# Ders: 7 paralel ajan tek Vite dev sunucusunu paylaşınca HMR kareleri bozar; paylaşılan sözlük dosyasını koordinatör yazar

## Ne oldu
- Yedi ajan aynı anda `src/games/*` düzenlerken Vite her kayıtta bütün sekmeleri yeniden yükledi; canvas-shot kareleri yarıda kaldı, bazı "önce" kareleri hiç alınamadı, bir ajan karesini sim prototipine yamalı botla aldı. Başka ajanın yarım değişikliği konsolda hata verip o anki yakalamayı bozdu.
- `tr.ts` / `en.ts` bütün dilimlerin ortak dosyasıydı. Ajanlara "dokunma, anahtar değişikliklerini raporla" denince çakışma olmadı; koordinatör sonda tek python geçişiyle uyguladı (meta açıklamalarını `meta.ts`'ten okuyup tr'ye kopyalamak i18n testini tek seferde yeşile çevirdi).
- `npm run typecheck` `&&` zinciri ilk kırmızı projede durduğu için ajanlar yalnız kendi tsconfig'lerini ayrı koşturdu; birkaç `noUnusedLocals` hatası ancak koordinatörün tam koşusunda çıktı.

## Kural
- Paralel görsel doğrulama gerekiyorsa ya ajanlar dilimlerini sırayla bitirsin (önce sim/kod, kareler en sonda tek ajan), ya da her ajan kendi Vite kopyasını ayrı portta açsın; aynı sunucuyu paylaşan ajanlara "kare yarıda kalırsa 2-3 kez yeniden dene, kod değişmediyse HEAD'i önce sayma" denmeli.
- Birden çok dilimin dokunacağı tek dosya (sözlük, kayıt tablosu, kod haritası) ajanlara kapatılır; değişiklik raporla gelir, koordinatör uygular.
- Koordinatör commit'ten önce tam `npm run typecheck` + tam `vitest run` koşar; ajan "benim dosyalarım temiz" demesi yetmez.
