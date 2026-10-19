---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, denge, serit, bardak, sure-modeli]
source: oturum "tussle: geri bildirim turu" (2026-10-19 gece), commit'ler `dd51c0d` (Bardak v6), `c51692f` (Şerit v4)
---

# Karar: Şerit ve Bardak'ta 90 sn tavan; botlar insan tepkisine göre ayarlı

## Bağlam
Arkadaş geri bildirimi #5: Bardak'ın ilk 1-2 dakikası çok kolay. Yusuf: Şerit'te 80+ sn fazla uzun. İnsan koşu verisi ([[2026-10-19-ilk-kosu-ucurumu-ve-insan-tepki-sureleri]]) iyi oyuncunun tavana dayandığını göstermişti.

## Karar
- **Tavan kuralı: ikisinde 90 sn.** Şerit 120 → 90, Bardak 4 dk → 90 sn (`maxTicks` 5400).
- **Şerit v4:** ikinci rampa 60 → 20 sn; sert sınır (12 m/sn, 0,42 sn satır aralığı, %85 duvar) ~70 sn'de; ilk 50 sn aynı. Usta etiketi 500 → 450 m.
- **Bardak v6:** turluk tablo, bardak sayısı 3/3/4/5; kolay giriş 10-15 sn; eski v5 tepe hızı (233 ms, dinlenme yok, 12 hamle) ~25 sn'de; 200 ms taban ~39 sn; sonra eşzamanlı hamle, zıplama ve aldatma ~55 sn'ye kadar. `typicalSec` 45.
- **Botlar insan hızında:** Yaklaşık 350 ms (Şerit) ve 280 ms (Bardak) insan reaksiyonuna ayarlı; Şerit'te ortalama 31 sn, iyi 44, güçlü 63, ideal tavanda); Bardak'ta v5 kayıtlarına uyan bot (121 sn) şimdi medyanda 50 sn'de biter. Yalnız kareye bakan izleyici hâlâ tavana varır (ideal oyuncu tavan).

## Neden
Tavan günün oyun süresini ve canlı kapışma beklemesini sınırlar; ayrıca "bir tur daha" hissi için tur bir dakika civarında bitmeli. Hızı erken yükseltmek kolay girişi korurken ilk dakikanın sıkıcı olmasını önler. Botları insan hızına kalibre etmek dengeyi gerçek oyuncuya göre ölçer, sıfır reaksiyon süresine göre değil.

## Reddedilen alternatifler
- Şerit'te 120 sn tavanı (v3) tutmak: 80+ sn uzun bulundu.
- Bardak'ta 4 dk tavan: kolay girişle birleşince tura 1-2 dk boş geçiyordu.
- Denge gibi 180 sn tavan: bu iki oyun için gereksiz uzun.
- Ham bot sonuçlarına göre ayarlamak: botlar insandan hızlı tepki verdiği için dengeyi fazla kolay gösteriyordu.

Oturum: [[2026-10-19-tussle-geri-bildirim-turu-antrenman-cubuk-kart]]. İlgili: [[2026-10-19-odada-kim-var-rozeti-ve-serit-v3]], [[2026-10-18-denge-v4-rampa-tavan-180]], [[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]].
