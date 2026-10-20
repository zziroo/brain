---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, oyun-tasarimi, denge, adalet]
source: Claude Code oturumu "tussle: geri bildirim turu" (geri bildirim #6, #8, #9, #11; replay analizi)
---

# Ceza yalnız oyuncunun bilebileceği hatada; neden her zaman görünür

**Karar:** Üç kural:
1. Oyuncunun bilemeyeceği şey cezalandırılmaz. flip-match v4: ıskada iki kart da ilk kez açılıyorsa süre gitmez (nötr sallanma); biri daha önce görülmüşse −0,5 sn. on-time v5: kum görünürken dokunuş yok sayılır ("Henüz değil"); o anda basmak beceri değildi.
2. Tek kanal turu sıfırlamaz. color-recall v4: kanal puanları çarpılmıyor; en kötü kanalın yarısı + çarpımın yarısı, L/S ancak sürgünün %40'ında sıfır (ton 25°). Yusuf'un "barlara yakınken 0 puan" turu replay'de ton tam / doygunluk 17 puan sapmış, 0 → ~48.
3. Süre giderken nedeni çubukta görünür. double-tap: kural değişmedi (oyun yalnız saatle biter, bu bilinçli), ama kaçan şekerin −1 sn'si artık çubuğun yanında kırmızı çıkıyor ve çubuk yanıyor (shell `timeLoss` / `flashLoss`, diğer oyunlar için kapalı).

**Neden:** Replay'ler hisleri sınıfladı: "hep süreden patlıyorum" doğru ve tasarımdı ama nedeni görünmüyordu; "açışlar bile ceza" doğruydu (ıskaların yarısı kör çıktı, sürenin %25'i); "0 puan" eğri sertliğiydi, hata değil. Adalet hissi "bir tur daha" için şart.

**Reddedilen alternatifler:**
- flip-match: ıska sonrası saatin durması (Yusuf'un "bekletme" fikri): her hatada ölü süre, tempo düşer. Süre yerine hamle hakkı: hız gerilimi gider, oyunlar uzar.
- on-time: erken basışa hafif ceza: kazayı yine cezalandırır, öğretmez.
- double-tap: saat yerine 3 can: neden net olur ama 3 şeker/sn yoğunlukta sert; görünürlük düzeltmesi yetmezse denenir.
- hoop: tek top (6 → 1): ıskalanan top ekrandan çıkana kadar 1,5–2 sn bekleme. Seçilen: 0,45 sn yeniden yükleme + en çok 2 "sayı yapabilecek" top.

**Not:** flip-match'te ceza azalınca pencere daraltıldı (adım 50→60, alt sınır 140→120 tik); botlar ve replay skorları aynı kaldı. Hata: color-recall `RENKHAFIZA_SUSPICIOUS_AVG=980` eşiği yerinde, yorumu v4'e göre.
