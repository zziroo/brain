---
type: resource
project: oyun-tasarimi
date: 2026-10-05
status: active
tags: [oyun-tasarimi, ders, uzunluk, tempo, grind, isik-bekcisi]
source: Claude Code oturumu 82134d2a (2026-10-05); Yusuf: "bu tür oyunları 3–4 saatte bitiriyorum, bizimki kısa mı?"
---

# Ders 4: Oyunun uzunluğu süre değil yenilik yoğunluğudur; uzatmanın dört yolu iyiden kötüye sıralanır

## Üç ölçü
- **Toplam süre:** başlıktan sona, kamp ve menüler dahil.
- **Aktif süre:** asıl eylemde geçen süre (koşuda / seferde).
- **İçerik:** oyuncunun karşılaştığı yeni şeylerin sayısı (mekanik, düşman, yükseltme türü, olay, hikâye anı).

Uzunluk sorusu aslında şudur: oyun, oyuncu sıkılmadan biraz önce mi bitiyor, sonra mı? Koşu-tabanlı incremental türünde oyuncular "birkaç saatte bitmesini" artı olarak yazıyor ([[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]).

## Uzatmanın dört yolu (iyiden kötüye)
1. **İçerik:** yeni mekanik, düşman çeşidi, niteliksel yükseltme, olay. Pahalıdır ama gerçek uzunluk budur.
2. **Koşu uzaması:** güçlendikçe koşu da uzar. Hem aktif süreyi artırır hem güçlenmeyi hissettirir ("eskiden havasız kalıyordum, artık kalmıyorum"). Türün iskeletinde ilk koşular çok kısadır ve büyür. Şartı: koşu boyunca yapacak bir şey olmalı; yoksa "kaynak bitmiyor, sıkıldım" olur.
3. **İsteğe bağlı oyun sonu:** zor mod, rekorlar, meydan okumalar. Ana yolu şişirmeden, isteyene süre verir.
4. **Maliyetleri artırmak:** en ucuz ve en kötü yol. Aynı içerik daha çok tekrarlanır ve "grind / dolgu" şikâyeti doğar (Rock Bottom'un alaşım grind'i). Üstel ekonomide süreyi asıl bu düğme belirlediği için en çok ona uzanılır ([[2026-10-02-bekleme-kapisi-yerine-avdan-dolan-kapi]]).

## Pratik notlar
- Bot süresi bir taban değeridir: botun nişanı kusursuzdur, hata yapmaz, kampta düşünmez. İnsan süresini ölçmeden uzunluk kararı verme; oyunun kendisi sefer sayısını ve yolda geçen süreyi kaydedebilir.
- Satış düşünülürse: Steam, 2 saatten az oynanmış oyunun iadesine izin veriyor (satın almadan sonraki 14 gün içinde). 2 saatin altında biten ücretli bir oyun bu yüzden risk taşır.

## Işık Bekçisi örneği (2026-10-05)
- Bot: ~37 sefer / ~41 dk; bunun yalnız ~23 dakikası yolda geçiyor. İnsan için tahmin ~1–1,5 saat. Tür 3–4 saat.
- Seferler baştan sona ~40 sn (`ZONE_BURN` bilerek böyle). Koşu uzaması ödülü hiç verilmiyor.
- Ayrıntı ve öneri: [[2026-10-05-devir-oyun-uzunlugu]].

İlgili: [[30-Resources/oyun-tasarimi/_index|Oyun tasarımı dersleri]], [[ders-01-ic-ice-donguler]]
