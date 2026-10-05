---
type: decision
project: pdf-ceviri
date: 2026-10-05
status: active
tags: [pdf-ceviri, trados, tasarim, yayin]
source: oturum 2026-10-05 (document-formatter)
---

# Araç çeviriyi yapmaz; Trados'un çıktısını orijinal PDF'in düzenine yerleştirir ve PDF üretir

## Bağlam
Arkadaşın Trados çıktısı (PDF'ten dönüştürülmüş DOCX) Türkçe metin uzun olduğu için taşıyor. İlk öneri, aracın metinleri kendisinin çıkarıp çeviriye vermesiydi. Yusuf reddetti: çeviri Trados'ta yapılmak zorunda, yoksa "programla aynı şeyi yapmış oluruz".

## Karar
- Girdi: orijinal İngilizce PDF + Trados'un Türkçe DOCX'i. Çıktı: orijinal görünümde Türkçe PDF (Yusuf seçti; düzenlenebilir Word değil).
- Türkçe metin bozuk DOCX'ten otomatik eşleştirilir (Yusuf: program yalnız çeviri dosyası veriyor). Hatalar rapor + CSV düzeltme turuyla giderilir.
- Web: tools.ziroo.net/pdf-ceviri, parolasız. Yusuf "kaydetmeye gerek yok, tek seferde çalışıp bitsin" dedi; sunucuda hiçbir şey saklanmaz.
- Sunucu fontu: Avenir benzeri açık lisanslı Nunito Sans (Yusuf seçti).

## Neden
- Çevirinin kalitesi ve iş akışı arkadaşın Trados'unda kalır; araç yalnız düzeni onarır.
- Orijinal PDF'e yerleştirmek görselleri, tabloları, renkleri birebir korur; bozuk DOCX'i onarmak her belgede farklı sonuç verirdi.
- Apple'ın Avenir'i Linux sunucuda lisans gereği kullanılamaz.

## Reddedilen alternatifler
- Aracın metni kendisi çıkarıp çeviriye vermesi ya da Claude API ile çevirmesi: Trados'u devre dışı bırakır.
- Bozuk DOCX'i onarmak: düzenlenebilir ama orijinale benzemez.
- Avenir Next'i sunucuya kopyalamak: lisans sorunu.
- Parola ve sonuç saklama: Yusuf gereksiz buldu.

## Riskler
- Parolasız ve tools.ziroo.net (Ziroobank ile aynı köken): sayfada satır içi script / innerHTML yok, CSP sıkı. Kötüye kullanıma karşı tek iş + 3 yükleme sınırı, 30 sn soket zaman aşımı, zip bombası sınırı (inceleme ajanının bulguları düzeltildi).
- Eşleştirme hatası sessiz kalabilir: raporda sarı işaretleme hepsini yakalamayabilir.
