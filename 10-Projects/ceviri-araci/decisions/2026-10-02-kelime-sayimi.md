---
type: decision
project: ceviri-araci
date: 2026-10-02
status: unverified
tags: [ceviri-araci, excel, kelime]
source: 2026-10-02 oturumu; Yusuf'un "Eco Volunteer - Workspace" tablosunun ekran görüntüsü
---

# Karar (Yusuf onaylamadı): Kelime sayısı, harf ya da rakam içeren parçalardır; etiketler sayılmaz

## Bağlam
Yusuf, kendi tablosundaki gibi "words per line / per file / word count" sütunları istedi. Onun tablosu boşluklara göre sayıyor ("- Clean up the garage" = 5).

## Karar
`countWords` (`src/core/stats.ts`): `{i}`, `{color=…}`, `<b>` gibi etiketler çıkarılır, boşlukla ayrılan ve harf ya da rakam içeren parçalar sayılır (aynı satır = 4). Excel'de Kelime / Dosya Toplamı / Genel Toplam sütunları değer olarak (formül değil) yazılır; uygulama aynı fonksiyonu kullanır.

## Neden
Çeviri ücreti genelde gerçek kelimeye göre hesaplanır; tire ve etiketler kelime değil.

## Reddedilen alternatifler
- Boşluk sayımı (Yusuf'un tablosundaki gibi): tire ve etiketleri de sayar. Yusuf'a fark söylendi, "istersen değiştiririm" denildi; cevap gelmedi. Bu yüzden status unverified.
- Excel formülleri: çevirmen sıralayınca birikimli toplam anlamsızlaşır, değerler daha öngörülebilir.

## İlgili
- [[10-Projects/ceviri-araci/_overview|Çeviri Aracı]]
