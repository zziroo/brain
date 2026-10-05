---
type: project
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, trados, ceviri, pdf, overview]
source: oturum 2026-10-05 (document-formatter)
---

# PDF Çeviri Düzeltici: Trados çevirisini (.sdlxliff ya da bozuk DOCX) orijinal PDF'in düzenine yerleştirir

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

## sdlxliff yolu (2026-10-05'ten beri)
- Trados projesindeki `.sdlxliff` verilirse eşleştirme tahmin edilmez: Trados'un İngilizce–Türkçe çiftleri kullanılır, PDF satırları İngilizce metinde birebir aranır (`docfmt/xliff.py`). Web'de aynı alana yüklenir, tür otomatik tanınır.
- Trados paragrafları PDF bloklarıyla örtüşmeyebilir (giriş cümlesi + ilk liste maddesi, sayfaya taşan paragraf): Türkçe, sınırlı adaylı DP ile bölünür; bölünen parçalar raporda "kesimi kontrol et" notuyla sarı. Kelime sırası farklı olduğu için bu kesimler zaman zaman bir iki kelime kayar.
- Bir cümlesi çevrilmemiş paragraf İngilizce bırakılır (raporda not); "Draft" durumundakiler işaretlenir.
- İlk deneme (4 sayfa RadiologyInfo makalesi, wkhtmltopdf PDF'i): 89 parçanın 85'i, sunucuda 2,5 sn (DOCX yolunda MiniMed 21 sayfa ~145 sn).
- MiniMed sdlxliff'i (arkadaş PDF'i önce Word'e çevirmiş: `…pdf…docx.sdlxliff`): 852 parçanın 837'si, canlıda 16 sn; kalan 15 sdlxliff'te yok (form başlıkları, yasal notlar) ve Yusuf'un kuralıyla İngilizce kalır.
- Aynı turda: tiresiz font adları (`ArialBold`) artık kalın/italik çözülüyor; çevrilen link metninin altındaki eski alt çizgiler kaldırılıyor (form doldurma çizgileri korunur); sağa yaslı tek satırlar (alt bilgi) sağa hizalanıyor.

## Güncel durum (2026-10-05)
Yayında `9f216b3`. Çevrilen her Türkçe metin çıktıda bir yerde görünür; görünemeyenler raporda listelenir. sdlxliff birincil girdi, DOCX yedek. Arkadaşın ekran görüntülerindeki hatalar (olay listesi, 2-3. adımlar, sabit doz tablosu, hücre içi İngilizce) sdlxliff ile giderildi.

## Kararlar
- [[2026-10-05-pdf-ceviri-trados-ciktisini-orijinal-pdfe-yerlestir]]
- [[2026-10-05-sdlxliff-birincil-girdi]]

## Öğrenilenler
- [[2026-10-05-sezgisel-eslestirme-degisikligini-iki-belgede-fark-alarak-dogrula]]
- [[2026-10-05-sdlxliff-yapisi-ve-tuzaklari]]

## Oturumlar
- [[2026-10-05-sdlxliff-destegi-ve-minimed-duzeltmeleri]]

## Sıradaki işler
- Arkadaş yeni sürümü sdlxliff ile denesin; çeviri hataları ("Instinct Settings form" → "İnsülin Ayarları formu", çevrilmemiş bir "Fixed Dose") ona iletilsin.
- Trados paragrafı bölünen yerlerde kesim kaymaları kalıyor (raporda sarı); gerekirse iyileştirilir.
- ziroo-edge `5b7f581` (kart metni) push edilmedi.
- `.sdlxliff` içindeki `Page {x} of {x}` gibi alan içeren alt bilgiler çevrilmiyor, İngilizce kalıyor.
- Görsel içi metinler çevrilmez; taranmış PDF desteklenmez.
