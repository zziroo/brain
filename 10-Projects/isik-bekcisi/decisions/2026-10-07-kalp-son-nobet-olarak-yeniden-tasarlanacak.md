---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, kalp, boss, tasarim, nobet]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); tasarım ajanı raporu (Plan); kod yok
---

# Karar: Gecenin Kalbi "Son Nöbet" olarak yeniden tasarlanacak; oyuncunun bildiği mekaniklerle, her deneme sıfırdan

## Bağlam
Yusuf Kalp'e erken geldi ve orada çok uğraştı. Sorunları:
- İyi oyuncu ile kötü oyuncu ayrılmıyor, tamamen bir güç sınavı.
- Oyun boyu öğrenilen şeyler Kalp'te yok.
- Yalnız Kalp odasını oynadığı için geliştirme alamadı.

Önerisi: Kalp, büyük bir fener doldurma (nöbet) gibi olsun.

Ölçüm (tasarım ajanı, bot):
- Bir denemede Kalp'in kırılan payı, fenerin gücünün basamaklı bir fonksiyonu.
- Aynı güçte özensiz bot yalnız %5–10 geride.
- Kalp oyunun %26–30'unu alıyor (7–10 deneme).
- Zayıf gelen oyuncu bir denemede normal bir Harabeler seferinin ×0,5–0,7'si kadar kazanıyor.

## Karar
- **Şafak Feneri:** arenanın girişinde. Bildiğimiz Fener Nöbeti'nin en büyüğü. Işıkla ve yakalanan ruhlarla yanar; karacıklar ona tırmanır.
- **Üç basamak (Tan, Şafak, Sabah):** her basamakta Kalp'e bir şafak ışını gider, üçüncüsü onu kırar.
- **Kalp her basamakta bir bölgenin tehditlerini salar:** karacık yayları ve İri Karacık; pervaneler ve Kurukafa; kabuklu sürüleri ve kemirgen; Karakoncolos ve dikenler.
- **Arena prizmaları** ışını Kalp'e kırar.
- **Halkalar, açılma anı ve yağ çeken çevre kalır.**
- **Tek yenilik:** ışınla Kalp'i çatlatınca içinden ruhlar saçılır. Halede her zamanki gibi yakalanır, ışıkları fenere akar. Yeni bir fiil yok.
- **Her deneme sıfırdan başlar.** Kaybetmek de iyi öder: bir geç seferin en az %80'i, ilerledikçe 2,5 katına kadar. Önden başlatma ayarı (`keep`) varsayılan kapalı, yalnız insan verisi >6 deneme gösterirse açılır.
- **Hedefler:** iyi bot 3, özensiz bot 5 denemede kazansın; Kalp oyunun %12–15'ini alsın; Kalp'ten gelen kazanç `refGain`'e girmesin.

## Neden
- Yusuf: "oyuna son dakika yeni mekanikle entegre edip oyuncuya yeni şeyler de öğretmeyelim fazla". Sonra karar bana bıraktı: "etkisi olmaz ve güzel olacaksa ekleyebilirsin".
- Bildik mekaniklerle kurulan son sınav ustalığı ölçer, istatistiği değil.

## Reddedilen alternatifler
- **"Alevleri ipe bağlayıp fenere götür"** ve **"gölge alevi kapar":** tasarım ajanının çekirdek önerisiydi. Oyunun sonunda yeni bir fiil öğretmek demek. İlk sürüm düz kalırsa ikinci katman olarak eklenebilir.
- **Bugünkü Kalp'e yalnız mekanik eklemek:** daha az iş, ama güç sınavı olmaktan çıkmaz.
- **Yalnız ilerlemeyi denemeler arasında saklamak:** Yusuf emin değildi; iyi dengelenirse sıfırdan başlamak daha iyi bir son sınav.

## Sonuçlar / sıradaki
- Uzun seferler dalının üstüne yapılacak, çünkü ödülü yeni ekonomiye göre ayarlanmalı. O dal Son Nöbet'siz yayınlanmamalı: Kalp şimdilik tek ve kısa bir denemede düşüyor.
- Dilimler: (1) çekirdek: Şafak Feneri, nöbet, çatlatınca ruh saçılması, üç basamak, ödeme, bot. (2) Tehditler basamak basamak. (3) Prizmalar ve kabuklar. (4) Ses, ipuçları, hikâye metni, denge. İlk dilim oynanmadan sonrakiler yapılmasın.
- Fener nöbetleri beğenilirse ileride bu yöne evrilebilir (Yusuf).

İlgili: [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]], [[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]
