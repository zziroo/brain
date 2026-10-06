---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, cekirdek-dongu, dusmanlar, hale, isin]
source: oturum fb8e3060 (incremantal-game), commit 8e6ef52; Yusuf'un 2026-10-06 oynama gözlemi
---

# Karar: hale geceyi tutar, öldürmez; bilinçli ışık bitirir

## Bağlam
Yusuf: "Oyunda genel olarak ışığımla düşmanlar üzerime geliyor ve çoğunlukla direkt ölüyorlar. Ben yine ruh toplayıp sona gidiyorum. Bunu biraz düşman öldürme tarafına çekmeli miyiz?"

Kaynak: düşmanları hale kendiliğinden öldürüyordu. Sürünün sayısı oyuncunun gücüyle büyüyor ama dayanıklılığı büyümüyordu. Sonuçta karar da gerilim de yoktu.

## Karar
- **Amaç değişmedi:** oyunun amacı yine ruh toplamak.
- **Hale artık öldürmüyor:** fenerin kendi ışığı (yeni kaynak adı `'halo'`) karacık, karabasan, pervane, gölge ve dikeni en fazla canlarının %30'una kadar yakar (`HALO.floor`), öldürmez. Ruhlar ve Kalp eskisi gibi tam hasar alır.
- **Bitirenler:** ışın, Parlama, Atılım, zincir yıldırımı, Tutuşma, Akkor, Işık Gölü, Kor İzi, ateş böcekleri, prizma ışınları, Dağlama ve patlamalar.
- **Yanmış görünüm:** sınıra inen düşmanın kenarları kor gibi kızarır, daha çok tüter, yavaşlar.
- **Yapışan karacık:** ışın açıkken fener, camındaki karacığı yakar (`SOOT.glass`). Böylece Parlama'sı ve Atılım'ı olmayan bir oyuncu da kurtulabilir.

## Neden
Döngü "topla, temizle, topla" oldu. Temizlemek yağa mal oluyor, çünkü odaklanmak yağ yakıyor; bu her temizliği bir karar yapıyor. Öldürmeyi oyunun amacı yapmak ise oyunu sıradan bir "dalgaları biç" oyununa çevirir ve fener/ruh kimliğini sulandırırdı.

## Reddedilen alternatifler
- **Düşman öldürmeyi oyunun amacı yapmak:** kimlik kaybolur, büyük yeniden denge gerekir.
- **Hale hiç yakmasın, yalnız itsin:** daha sert. Karacıklar yığılır, sürekli ışın tutmak gerekir ve yağ tükenir.
- **Düşmanlar bölgeyle sertleşsin, hale öldürmeye devam etsin:** en basiti, ama sorun sürer; düşmanlar kendiliğinden ölmeye devam eder.
- **Yalnız odaklanmak öldürsün:** Parlama ve Atılım panik düğmesi olarak çalışmaya devam etmeliydi.

## Sonuçlar / riskler
- **Metinler:** ipucu, yıldız açıklamaları ve hikâye cümleleri yeni kurala göre güncellendi. İnceleme iki eski gölge cümlesini yakaladı.
- **Hiç odaklanmayan oyuncu:** ilk seferlerde yağının ~%5,5'ini yapışan karacıklara kaptırıyor.
- **Denenmedi:** gerçek bir oyuncunun "yanmış halka" ritmini nasıl hissettiği.

## İlgili
- [[2026-10-06-kabuklu-surusunu-korur-kirilinca-patlar]]
- [[2026-10-06-her-bolgeye-bir-elit]]
- [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]]
