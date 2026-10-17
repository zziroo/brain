---
type: lesson
project: ziroo-edge
date: 2026-10-05
status: active
tags: [css, turkce, arayuz, ziroo-edge]
source: oturum 2026-10-05 (araç listesi yeniden tasarımı, ekran görüntüsü kontrolü)
---

# Ders: `lang="tr"` sayfada `text-transform: uppercase` İngilizce kelimedeki i'yi İ yapar ("Windows" → "WİNDOWS")

## Ne oldu
tools.ziroo.net'in yeni tasarımında etiketler CSS ile büyük harfe çevriliyor. Sayfa `lang="tr"` olduğu için tarayıcı Türkçe kuralını uyguladı: "Windows" etiketi "WİNDOWS" göründü. Türkçe kelimeler ("Giriş gerekir" → "GİRİŞ GEREKİR") doğruydu. İnceleme ajanı da yakaladı, ama ilk fark eden canlı ekran görüntüsüne bakmaktı.

## Nasıl uygulanır
- Büyük harfe çevrilen İngilizce/özel adları kendi `lang`'ıyla işaretle: `<span class="tag" lang="en">Windows</span>`.
- Ters durum da var: `lang` İngilizce olan sayfada Türkçe "i" büyütülünce "I" olur. Büyük harf gösterilen Türkçe metinde sayfa dili `tr` kalmalı.
- Yeni etiket, buton ya da başlık eklerken `text-transform: uppercase` alan her İngilizce kelimeye bak (ör. "Idle" doğru çıkar çünkü büyük I ile başlıyor; küçük i içeren kelimeler bozulur).

## İlgili
- [[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]
