---
type: project
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, trados, ceviri, pdf, overview]
source: oturum 2026-10-05 (document-formatter)
---

# PDF Çeviri Düzeltici: Trados'un bozuk Türkçe DOCX'ini orijinal PDF'in düzenine yerleştirir

> Not canlı gerçek değildir: depo ve sunucu durumunu işlem yapmadan önce doğrula.

## Nedir
Yusuf'un çevirmen bir arkadaşı için. Arkadaş çeviriyi **Trados**'ta yapmak zorunda. Trados PDF'i Word'e çevirip çeviriye sunuyor; çıktı DOCX'in düzeni bozuk geliyor (metin kutuları taşıyor, satırlar bölünüyor). Araç orijinal İngilizce PDF + Trados DOCX'ini alır, Türkçe parçaları orijinal PDF segmentleriyle eşleştirir, İngilizceyi silip (redaction) Türkçeyi aynı yere, aynı stille yazar. Çıktı: Türkçe PDF + kontrol raporu (HTML) + düzeltme tablosu (CSV).

## Teknoloji
- Kaynak `~/ZZ/zProjects/document-formatter` (yerel git, remote yok). Python 3, PyMuPDF, lxml, fontTools. Komut satırı: `./cevir.sh orijinal.pdf trados.docx cikti.pdf [--duzeltme x.csv]`.
- Modüller: `pdfseg` (PDF segmentleri), `docxunits` (DOCX paragrafları, metin kutuları dahil), `align` (eşleştirme), `render` + `fonts` (yerleştirme, sığdırma), `report`.
- Eşleştirme: sıralı DP (1:n, n:1 gruplar) → güvenilir eşleşmeler çapa → konum tabanlı turlar (PDF'te yakın çapaların DOCX sırası). Sinyaller: birebir ortak sözcük/sayı, ortak kökler (insulin~insülin), belgeden öğrenilen kelime sözlüğü (Dice + rekabetçi bağlama), stil, uzunluk, içindekiler sayfa numarası.
- İlk belgede (21 sayfa MiniMed Go kılavuzu): 818 parçanın 748'i yerleşti. Zayıf nokta kısa tablo/form etiketleri; raporda sarı ("yalnızca konuma göre eşleşti").

## Yayın (2026-10-05'ten beri)
https://tools.ziroo.net/pdf-ceviri → konteyner `pdf-ceviri` (127.0.0.1:8097, kaynak `/opt/pdf-ceviri/src`), Caddy parçası `/opt/ziroo-sites/tools/pdf-ceviri.caddy`. Betik `deploy/deploy.sh` (proje kökünden). Sır yok, kalıcı veri yok: yükleme `/tmp` tmpfs'e yazılır, iş biter bitmez silinir, sonuç tek ZIP olarak döner. Aynı anda tek dönüştürme (en fazla 3 yükleme), 100 MB üst sınır, DOCX document.xml ≤ 30 MB, 400 sayfa. Sunucuda 21 sayfalık belge ~145 sn (Mac'te ~35 sn).
- Font: sunucuda Avenir yok; Avenir benzeri **Nunito Sans** (OFL, `web/fonts`, değişken fonttan statik ağırlıklar) + yedek Liberation.

## Kararlar
- [[2026-10-05-pdf-ceviri-trados-ciktisini-orijinal-pdfe-yerlestir]]

## Açık işler
- Trados projesindeki iki dilli `.sdlxliff` dosyası kullanılırsa eşleştirme neredeyse kesinleşir; arkadaştan örnek istenmedi.
- Görsel içi metinler çevrilmez; taranmış PDF desteklenmez.
