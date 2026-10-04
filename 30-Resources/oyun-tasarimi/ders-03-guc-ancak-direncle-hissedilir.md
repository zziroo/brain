---
type: resource
project: oyun-tasarimi
date: 2026-10-04
status: active
tags: [oyun-tasarimi, ders, guc-fantezisi, sinerji, okunabilirlik, isik-bekcisi]
source: Claude Code oturumu 82134d2a (2026-10-04); Yusuf'un Işık Bekçisi oynama gözlemleri
---

# Ders 3: Güç ancak dirençle karşılaştırınca hissedilir; kaçan hedef, ekran silme, zincirleme etki ve görünmeyen bekleme süresi

## Yusuf'un gözlemleri
1. Kaçan ruhlar iyi hissettirmedi ("belki animasyondan").
2. Oyunun sonunda güçlenme iyiydi ama ekranı anında siliyordu, tüm ruhlar bitiyordu.
3. Zincirleme etkili yükseltme gibi şeyler oyun akışını sıkılmaktan kurtarır.
4. Becerilerin dolduğu anlaşılmıyordu; sağ alta bakmak gerekiyordu.

## 1. Zorluk ile hayal kırıklığı farklıdır
- Zorluk: "kaybettim ama nedenini ve ne yapacağımı biliyorum." Hayal kırıklığı: "kaybettim ve elimden bir şey gelmiyordu / ne olduğunu anlamadım."
- İyi bir kovalamaca: kazanılabilir, hedef bir açık pencereyi **gösterir**, yakalamak bir ödül anıdır.
- Kodda (2026-10-04): ürkek ruh 120 hızla kaçıyor, bekçinin temel hızı 100; halenin hemen dışında (×1,15) kaçmaya başlıyor, yani ışığın kenarında oyalanıyor; 2,2 sn kaçınca 1,3 sn yoruluyor ama yorgunluğun ekranda hiçbir işareti yok. Sorun yalnız animasyon değil: hem sayı (yürüyerek kazanılamıyor) hem okunabilirlik (açık pencere görünmüyor).
- Ders: tasarım teorisi oyuncu deneyimini yenmez; "kaçan ruh" seçeneği kağıtta iyiydi, oynayınca kötü hissettirdi.

## 2. Güç fantezisi kalabalık ister
- Incremental'ın asıl ödülü güçlenmenin **görünmesi**. Güç yalnız dirence göre ölçülür: ekran anında boşalınca karşılaştıracak bir şey kalmaz, güç hissi de söner.
- Vampire Survivors'ın çözümü: oyuncu güçlendikçe düşman yoğunluğu da büyür; güç bir kalabalığı biçerken hissedilir.
- Erken bölgede zorluk olmaması ile geç bölgede ekranın silinmesi **aynı kökten** gelir: direnç oyuncunun gücüyle birlikte büyümüyor. Erken oyun "zayıf ama yetkin", geç oyun "tanrı gibi ama önünde biçecek bir sel var" olmalı.

## 3. Zincirleme etki ve sinerji
- Tek eylem, çok sonuç: oyuncu bir şeyi tetikler ve sonra bir şelaleyi izler (Peggle, Balatro, Noita). Kendi eserini seyretmek ayrı bir zevk.
- **Niceliksel** yükseltme sayıyı değiştirir (+%10 güç); **niteliksel** yükseltme oynayışı değiştirir (ışık sekiyor, kristal patlıyor, ışın bölünüyor). Akılda kalan ve "bir tur daha" dedirten niteliksel olanlardır.
- Sinerji: niteliksel yükseltmeler birbirini tetikleyince (zincir + kristal patlaması + kırılma) oyuncu bir "yapı" kurduğunu hisseder.
- Uyarı: zincirleme etkiler çarpımsal güçtür; denge botla ölçülmeli ([[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]]). Gösteriyi büyütüp ham çarpanı sınırlamak mümkün.

## 4. Bilgi oyuncunun baktığı yerde olmalı
- Göz bekçide ve halede; sağ alt köşe görüş alanının dışında. Yağ çemberinde doğru yapılan şey ([[ders-01-ic-ice-donguler]], diegetic bilgi) becerilerde yapılmamış.
- Kodda beceri hazır olunca yalnız sağ alttaki düğmeye `ready` sınıfı ekleniyor; ses ya da bekçinin üzerinde bir işaret yok.
- Çözüm ailesi: karakterin üzerinde işaret (fener parıltısı, bekçinin etrafında dolan ince halka), kısa bir "hazır" sesi; köşedeki gösterge yalnız yedek.

İlgili: [[30-Resources/oyun-tasarimi/_index|Oyun tasarımı dersleri]], [[ders-02-zorluk-dusmandan-gelmez]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
