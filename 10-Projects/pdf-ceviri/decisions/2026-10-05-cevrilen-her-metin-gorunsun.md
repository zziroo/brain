---
type: decision
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, sdlxliff, eslestirme, icerik-kaybi]
source: oturum 2026-10-05 (document-formatter), "buna düzeltmeyi dene, çevrilen her metin gözüksün bir şekilde"
---

# Karar: sdlxliff'teki her Türkçe metin çıktıda bir yerde görünmeli; birebir yeri yoksa komşu parçaya eklenir

## Bağlam
Trados paragrafı PDF'te birden çok bloğa/satıra dağıldığında, bir satıra bağlanamayan paragraf parçalarının Türkçesi sessizce atılıyordu. Sanılandan ciddiydi: MiniMed sayfa 3'te "…ne kadar aktif insülini var?" cümlesi tamamen kayboluyordu. Yusuf: "çevrilen her metin gözüksün bir şekilde".

## Karar
- Paragrafın sonu/ortası başka paragrafa ait bir satıra taşıyorsa (PDF'te tek satır, Trados'ta iki paragraf), taşan kısmın Türkçesi o satırın çevirisinin önüne/arkasına eklenir; paragrafın başı taşıyorsa sonraki parçaya.
- Yine de atılacak bir parça kalırsa: Türkçesi çıktıda başka yerde (hücre hücre, yalnız harflere bakılarak) görünmüyorsa komşu parçaya eklenir; görünmeyen kalanlar raporun "Kullanılmayan Türkçe parçalar" listesine yazılır.
- İstisna: PDF'te çevrilmeden kalan bir satırla (sayılar hariç) aynı metin, ör. "Page 1 of 4" alanı (Trados'ta sayılar alan, Türkçesi yalnız "Sayfadan") eklenmez; satır orijinal kalır.
- Eklenen her yer raporda notla işaretlenir.

## Neden
- Atılan Türkçe, okuyucu için kayıp içerik demek; konumu birebir tutmasa da görünmesi tercih edildi.
- "Başka yerde görünüyor mu" kontrolü olmadan eklemek, aynı metni ikinci kez yazıyordu (form sayfalarında "Başlangıç Zamanı Bitiş Zamanı Ayar…" tekrarları).

## Reddedilen alternatifler
- Paragraf ucundaki kısa parçayı her zaman komşuya eklemek: başka tablo hücrelerini ("Hasta Adı Doğum Tarihi") ve sayfa numaralarını yanlış yere taşıdı, geri alındı.
- Görünürlüğü paragraf bütünü olarak kontrol etmek: bölünmüş paragrafları ve sekmeli hücreleri "görünmüyor" sanıp fazlalık üretiyordu.

## Sonuçlar / riskler
- Eklenen metin PDF'teki satıra birebir oturmayabilir (ör. form tablosunda "gram 15 gram" iki hücrenin metni yan yana).
- MiniMed'de kelime düzeyinde görünmeyen Türkçe yalnız Trados'taki tutarsız kayıtlar ("Fixed Dose" İngilizce bırakılmış, "adımmetodolojisi", "Ertele"/"Erteleme"); doğru halleri başka kayıtlarla görünüyor.

## İlgili
- [[2026-10-05-sdlxliff-birincil-girdi]]
- [[2026-10-05-sezgisel-eslestirme-degisikligini-iki-belgede-fark-alarak-dogrula]]
