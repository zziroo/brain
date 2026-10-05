---
type: session
project: pdf-ceviri
date: 2026-10-05
status: done
tags: [pdf-ceviri, sdlxliff, yayin, eslestirme]
source: oturum 2026-10-05 (document-formatter): "sdlxliff'i incele", arkadaşın MiniMed ekran görüntüleri
---

# Oturum: sdlxliff desteği, DOCX yolunun sınırları, MiniMed düzeltmeleri

## Ne yapıldı
- 2-4 dk'nın kaynağı ölçüldü: süre neredeyse tamamen DOCX eşleştirmesinde (Mac'te 33 sn / 35 sn; sunucu ~4 kat yavaş).
- Yusuf'a `.sdlxliff`'in yerini anlattık; iki örnek geldi. `docfmt/xliff.py`: sdlxliff okuma, PDF satırlarını İngilizce kaynakta bulma (temiz eşleşme seviyeleri, bitişik satır devamı, konuma göre 2. tur, birden çok paragrafa yayılan satır), Türkçeyi sınırlı adaylı DP ile bölme (noktalama ve büyük harf ipuçları, sonraki dipnot numarasını çıkarma).
- Yan düzeltmeler: tiresiz font adları (`ArialBold`, "Narrow" ailede kalır), çevrilen link metninin eski alt çizgisini silme (form boşluğu çizgileri korunur), sağa yaslı alt bilgiler.
- Üç inceleme ajanı turu; bulunan DP süre patlaması, yorum düğümü hatası, kısmen çevrilmiş paragrafta içerik kaybı, numara silmenin metin yemesi düzeltildi.
- Yayın: `47eb772`, tools.ziroo.net/pdf-ceviri; ziroo-edge kart metni `5b7f581` (push edilmedi).
- Sonuçlar: RadiologyInfo 85/89 (kalan 4 "Page x of 4"), MiniMed 837/852, canlıda 16 sn (kalan 15 sdlxliff'te yok).

- Ek tur (`51b1d6c`, yayında): konuma göre aramadan sonra bitişik satırlara yayılım + bitişiklik puanı; iki paragrafa taşan satırın sonraki paragraftaki ucu ("…meals. One") Türkçesiyle sonraki parçaya ekleniyor (sabit doz hücresindeki "Bir" artık düşmüyor, Trados'ta cümle tamdı); sekmeli hücrelerde kesim sekmede ("Başlangıç Zamanı / Bitiş Zamanı / Ayar"). MiniMed 834/849, canlı 17 sn.
- "Çevrilen her metin görünsün" turu (`9f216b3`, yayında): paragraf sonu başka paragrafa ait satıra taşıyorsa Türkçesi o satıra eklenir; atılacak Türkçe parça belgede başka yerde görünmüyorsa komşu parçaya eklenir, kalanlar raporda listelenir ("Page x of y" alanı istisna); çok sütunlu formlarda aynı paragrafın kullanılmamış geçişi tercih edilir. MiniMed 835/845, canlı 16 sn; kelime düzeyinde görünmeyen Türkçe yalnız Trados'taki tutarsız/İngilizce kalmış kayıtlar ("Fixed Dose", "adımmetodolojisi", "Ertele" ↔ "Erteleme").

## Alınan kararlar
- [[2026-10-05-sdlxliff-birincil-girdi]]

## Öğrenilenler
- [[2026-10-05-sezgisel-eslestirme-degisikligini-iki-belgede-fark-alarak-dogrula]]
- [[2026-10-05-sdlxliff-yapisi-ve-tuzaklari]]

## Açık kalanlar
- Trados paragrafı bölünen yerlerde kalan kesim kaymaları (ör. "dose calculator?" satırı); paragraf sonuna taşan satır uçları artık ilgili satıra ekleniyor (`9f216b3`).
- Çeviri hataları (araçtan değil): "Instinct Settings form" → "İnsülin Ayarları formu"; bir "Fixed Dose" başlığı çevrilmemiş. Arkadaşa iletilmeli.
- Doğrulanmadı: arkadaşın yeni çıktıyı kendisinin denediği; başka belge türleri (formu/tablosu yoğun PDF'lerde alt çizgi silme ve sağa hizalama kuralı).
