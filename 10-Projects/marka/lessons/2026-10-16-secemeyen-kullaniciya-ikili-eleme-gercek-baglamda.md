---
type: lesson
project: marka
date: 2026-10-16
status: active
tags: [tasarim, karar-verme, maskot, yontem]
source: oturum "marka: Ziroo maskotu" (ZZ kökü), 2026-10-16
---

# Ders: Seçemeyen kullanıcıya daha çok seçenek değil, gerçek yerinde ikili eleme göster

Ziroo için bir haftada 15 aday, 6 kafa ve 8 tema çizildi; Yusuf hiçbirini seçemedi ("aslında seçemedim hâlâ"). Aynı gün ikili eleme sayfasıyla (4 tur × 4 aday, her eşleşmede 2 seçenek, 12 tık) yarım saatten kısa sürede (seçim zamanları 16:36–16:57) seçim çıktı.

İşe yarayan parçalar:
- Bir eksen bir tur: silüet, yüz, kafa, tema ayrı ayrı.
- Her seçenek soyut bir kartta değil, kullanılacağı yerde: site üst bandı, 404 sayfası, 16 px sekme ikonu.
- Kazanan sonraki turların çizimine taşınıyor; karakter seçtikçe kendiliğinden oluşuyor.
- Her tura isteğe bağlı not alanı; notlar sonraki adımı gösterdi ("gözler değişebilir", "default olabilir").
- Seçimler artifact `db`'sinde; Claude `ArtifactData` ile okuyabildi, kullanıcı "bitti" demekle yetindi.

Uygula: tasarım seçiminde kullanıcı takıldığında yeni aday turu açma; mevcut adayları eksenlere ayır ve ikili eleme sayfası yap. Sonuçtan sonra da çıkan yeni sorunu (kollar "kulak" gibi) küçük bir yan yana karşılaştırmayla çöz.
