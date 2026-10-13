---
type: decision
project: isik-bekcisi
date: 2026-10-13
status: accepted
tags: [isik-bekcisi, tasarim, core-loop, guc, kirilan-dunya, zincir-firtina, denge]
source: oturum 0b67b4a3 (incremantal-game, 2026-10-13); main a8264f4 (c7ef6a0 Kırılan Dünya, f125ee1 Zincir Fırtına, 5b0ef19 birleşme). Yusuf oynamadı.
---

# Karar: "güç ekranda görünsün" yönünün ilk iki dilimi yazıldı: Kırılan Dünya ve Zincir Fırtına

## Bağlam
[[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]] yönü. Yusuf "istediğin sırayla ilerle, paralel yaptır" dedi; seçenek turu yerine Claude tasarladı, raporladı.

## Karar
- **Kırılan Dünya:** vadinin katı nesneleri bilinçli ışığın hedefi. Ağaçlar (çalı, ağaç, kuru ağaç, kütük) ışın üstlerinde tutulunca **tutuşur**: birkaç saniye duran bir fener gibi çevresindeki ruhları aydınlatıp yakalar (src `'fire'`), sonra çöker ve katı olmaktan çıkar. Kayalar (kaya, kaya kütlesi, sarkıt) çatlar ve parçalanır; sütun ve duvar devrilir; dökülen ruh var ama az. Kırık durum yalnız seferde (`R`), kayda girmez: gece her şeyi geri büyütür. Hale asla kırmaz; gecenin ışığı asla. Arena sütunları ve kenar süsleri kırılmaz. Yıldızlar fiil açar: Çıra (k0, 36 kıvılcım, ağaç yanar; onsuz hiçbir şey kırılmaz) → Yangın (k1, 80 is, ateş ağaçtan ağaca, kaya çatlar) → Taş Kıran (k2, 400 is, sütun) → Yıkım (k3, 2000 is, duvar; kırılan ışık saçar) → Şafak Süpürgesi (k4, 8000 is, lazer değdiğini kırar, ateş hale genişliğinde). Çizim `js/breakart.js`; ipuçları `h_tree` / `h_rock` / `h_wall`.
- **Zincir Fırtına:** Zincir Işık'ın üstüne Çatal (k2, 250/500 is, çatallanma) → Fırtına (k3, 1400/2600, en fazla 3-4 sıçrama derinliğinde şimşek ağacı, geceye de çarpar, 12 sıçrama tavanı) → Gök Gürlemesi (k4, 6000, zincirin her 25. yakalamasında gökten yıldırım, karanlık 100 ms incelir). Ek kural: bir sıçramayla yakalanan ruh kendi zincirini başlatmaz (yoksa her yakalama yeni ağaç açıyor, 1,6 sefer götürüyordu).
- Eski "+%" yıldızlarına dokunulmadı (ağacın yeniden kesimi sonraki dilim).

## Neden
Rock Bottom'daki "güçlendikçe her şeyi kırma" hissi; içerik genişliği değil çekirdek. Verimler düşük tutuldu: kırılanlardan gelen yakalama payı bölge başına %1-3, böylece gösteri var, ekonomi bozulmuyor.

## Reddedilen alternatifler
- Katıların ışını durdurması: oyunu değiştirirdi; ışın katıların üstünden geçmeye devam ediyor, yolu kestiklerini yakıyor.
- Katıları `eachTarget()` içine koymak: çok çağıran ruh varsayıyor; ayrı `lightSolid()` yolu.
- Kaya 1-3 / sütun 2-4 ruh dökmesi: kırılan payı harabelerde %14-17'ye çıktı, oyun 3-4 sefer kısaldı; 0-1'e indi.
- Sık gök yıldırımı (her 15, pay 2): 1,4 sefer götürüyordu.

## Ölçüm (tohum 1, 10'ar oyun, kampla; birleşik)
Ana bot 37,5 sefer / 105 dk (öncesi 36,8); özensiz 46,8 / 115 dk (öncesi 47,2). Kalp 1,2 / 2,0 deneme. Bot seferde çayır 4, orman 12, bataklık 15, mağara 31, harabe 39 şey kırıyor.

## İnceleme
İki ayrı salt okunur inceleme: kritik/yüksek yok; 1 orta-düşük (ipucu ve ısı gece duvarının ötesindeki ağaca gidiyordu), 10 düşük; hepsi düzeltildi. 2. evre ajanı 1. evrede `b.r` hatasını buldu (dökülen ruhlar NaN'da, hiç yakalanmıyordu): verimler bu düzeltmeden sonra yeniden ayarlandı.

## Açık
- Yusuf oynamadı; sesler dinlenmedi. Ağaç alevleri ekran görüntüsünde biraz çizgi film gibi: oynayınca bakılacak.
- Kayalar çoğu kez boş kırılıyor (0-1 ruh): boş hissettirirse yakalama yerine kıvılcım motesi dökmek seçenek.
- Gökyüzünde Çıra/Yangın, Hale yıldızlarına 58-65 px (eski taban 70).
- Sıradaki dilimler: Parlama evrimi, ağacın "+%" kesimi, isin kamp yapıları, `VIGIL.light`.
