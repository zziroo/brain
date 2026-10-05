---
type: decision
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, trados, sdlxliff, eslestirme]
source: oturum 2026-10-05 (document-formatter), sdlxliff desteği ve MiniMed düzeltmeleri
---

# Karar: Trados'un `.sdlxliff` dosyası birincil girdi; DOCX yalnız yedek. sdlxliff'te olmayan metin İngilizce kalır

## Bağlam
DOCX yolunda Türkçe parçalar orijinal PDF'e tahminle eşleşiyordu (sıra, sayılar, stil, ortak kökler). Arkadaşın gerçek çıktısında olay listesi, tablo hücreleri ve numaralı adımlar kaydı ya da İngilizce kaldı. Trados her projede İngilizce–Türkçe çiftleri `.sdlxliff` olarak zaten tutuyor; Yusuf iki örnek getirdi (RadiologyInfo makalesi, MiniMed kılavuzu).

## Karar
- Araç ikinci dosyanın türünü kendisi tanır: `.sdlxliff` verilirse Trados'un çiftleri kullanılır, PDF satırları sdlxliff'in İngilizce metninde birebir aranır (`docfmt/xliff.py`). Web'de aynı yükleme alanı, sayfa sdlxliff'i öneriyor.
- Yusuf'un kuralı: **sdlxliff'te olmayan metin zaten çevrilmemiştir; PDF'te orijinal (İngilizce) haliyle kalması beklenir, bunun için ek çaba harcanmaz.**
- Bir cümlesi çevrilmemiş paragraf İngilizce bırakılır (yarım Türkçe içerik kaybettirir); "Draft" durumundakiler raporda işaretlenir.

## Neden
- Tahmin yok: kısa etiket ve tablo hatalarının çoğu kaybolur; MiniMed 21 sayfa sunucuda 145 sn yerine 16 sn.
- Kaynak metin aynı olduğu için tek kalan iş "bu İngilizce satır sdlxliff'te nerede" sorusu.

## Reddedilen alternatifler
- DOCX yolunu daha fazla sezgisel kuralla iyileştirmek: her kural başka yerde bozulma getiriyordu; sdlxliff kökten çözüyor.
- sdlxliff'te olmayan metinleri (form başlıkları, yasal notlar) başka kaynaktan çevirmek: Yusuf istemedi.

## Sonuçlar / riskler
- Trados bir paragrafta birden çok PDF bloğunu birleştirdiyse Türkçe bölünmek zorunda; kelime sırası farkından kesim bir iki kelime kayabilir (raporda "kesimi kontrol et").
- Arkadaş PDF'i önce Word'e çevirip Trados'a DOCX verdiyse (`…pdf…docx.sdlxliff`) kaynak metin Word dönüşümünün metnidir: sekmeyle birleşmiş hücreler, boşluklu ayraçlar, eksik metinler olabilir.

## İlgili
- [[2026-10-05-pdf-ceviri-trados-ciktisini-orijinal-pdfe-yerlestir]]
- [[2026-10-05-sezgisel-eslestirme-degisikligini-iki-belgede-fark-alarak-dogrula]]
- [[2026-10-05-sdlxliff-yapisi-ve-tuzaklari]]
