---
type: session
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, oturum, oynama-geri-bildirimi, yayin]
source: oturum fb8e3060 (incremantal-game), 2026-10-06 ikinci yarı
---

# Oturum: Yusuf'un ilk iki bölge geri bildirimi; dört yayın (yapışma/pervane, Atılım halkası, hale kuralı + kabuklu, elitler)

## Yusuf'un gözlemleri (ilk iki bölgeyi oynadıktan sonra)
1. Üzerine atlayan karacığın yağ içmesi üst bara bakmadan hissedilmiyor.
2. Karabasanın "elit" olması iyi, direnç hissettirdi.
3. Düşmanlar ışığa gelip hemen ölüyor; oyun yine ruh toplayıp sona yürümek. "Düşman öldürmeye mi çekmeliyiz?"
4. Atılımın dolduğu görünmüyor.
5. Pervane çok güçlü ve çok hareketli hissettiriyor.
6. Kabukluyu kırmak bir işe yaramıyor.

Yusuf "belki oynadıkça bana kolay gelmeye başladı" dedi. Bu kısmen türün doğası: geçilen bölge kolaylaşmalı, ama yeni bir bölgeye ilk girişte zorlanılmalı.

## Kararlar ve yayınlar
| Commit | Ne | Karar notu |
|---|---|---|
| `1773c16` | Yapışan karacık yavaşlatır; pervane döner, sonra dalar | [[2026-10-06-yapisan-karacik-yavaslatir]], [[2026-10-06-pervane-doner-sonra-dalar]] |
| `242654b`, `9ec4f66` | Atılım halkası imleçte (D2) | [[2026-10-06-atilim-halkasi-imlecte]] |
| `8e6ef52` | Hale tutar, bilinçli ışık bitirir; kabuklu sürüsünü korur | [[2026-10-06-hale-tutar-bilincli-isik-bitirir]], [[2026-10-06-kabuklu-surusunu-korur-kirilinca-patlar]] |
| `da7c5cd` | Her bölgeye bir elit | [[2026-10-06-her-bolgeye-bir-elit]] |

Hepsi Yusuf'un isteğiyle canlıya alındı. Canlıdaki sürüm `da7c5cd`; kontrol edilen dosyalar yerelle aynı.

## İnceleme kapısı
- Dört incelemede kritik ya da yüksek bulgu çıkmadı.
- Üç orta bulgu çıktı, üçüne de şüpheci ajan baktı:
  - ekran dışından dalış: bulgu doğrulandı, önemi düşüğe indirildi;
  - eski gölge cümleleri: koordinatör doğruladı;
  - Işık Kemirgeni prizmadan ayrıldığı hâlde onu karanlık tutuyordu: bulgu doğrulandı, mevcut düzeltme onaylandı.
- Düşük bulgular düzeltildi.

## Denge (şimdiki ara durum)
- İnsana yakın bot yaklaşık 40–41 seferde, kusursuz bot yaklaşık 37 seferde bitiriyor. Önceki tempo 46 / 43 seferdi.
- Genel denge (`TIER_SCALE`) bilerek yapılmadı. Hedef uzunluğu Yusuf seçecek: eski tempo mu, daha uzun mu? Önce yeni mekanikleri oynayacak.

## Çalışma şekli
- Paralel iş için worktree kullanıldı: Atılım seçenekleri ayrı bir dalda hazırlandı, ana kopyada pervane işi sürerken. Sonra dal hızlı ileri sarılarak birleştirildi ve temizlendi.
- Ürün hissi kararlarında yine gerçek oyun görüntüleriyle seçenek gösterildi; Yusuf D2'yi hemen seçti.

## Doğrulanmayanlar
- Yeni seslerin hiçbiri kulakla dinlenmedi.
- Hiçbir şey 60 karede izlenmedi.
- Elitlerin dördünün ipucu ekranda görülmedi.
- Hiç insan oynamadı.

## İlgili
- [[2026-10-06-tehdidi-hic-karsilamayan-bot-onu-vergi-gibi-oder]]
- [[2026-10-06-kamera-kaymasi-tehdidi-ekran-disina-iter]]
- [[2026-10-06-bekci-feneri-ve-okunurluk]]
