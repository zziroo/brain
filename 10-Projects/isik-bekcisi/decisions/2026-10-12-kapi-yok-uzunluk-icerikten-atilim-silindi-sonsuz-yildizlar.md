---
type: decision
project: isik-bekcisi
date: 2026-10-12
status: active
tags: [isik-bekcisi, denge, ilerleme, nobet, atilim, agac, kayit]
source: oturum b89a4bee (incremantal-game, 2026-10-12 → 10-13); Yusuf'un yorumu; main 3500c03 (yayında değil)
---

# Karar: ilerlemede kapı yok; nöbet tavanı kalktı, Atılım silindi, ağaç sonsuz yıldızlarla hiç bitmez, uzunluk içerikten gelecek

## Bağlam
- Nöbet tavanı ([[2026-10-08-fener-zayif-isiga-direnir-nobet-tavani-uzunluk-agacta]]) ölü seferleri çözmüştü ama Yusuf: "zorunlu olarak beni kampa gönderiyor, beğenmedim". Kota kapısı da, güç tavanı da aynı kökten: bölgenin uzunluğunu tek bir sayı belirliyor ve her kademenin ağacı sonlu; ya alacak şey biter ya fener kapanır.
- Yusuf'un hedefi 3–4 saatlik ilk bitiriş; içerik ekleyerek. Eski kayıtlar, göç, "sil baştan" sorun değil; hikâye eklemesi isteğe bağlı; her bölüm için bir kayıt geçişi şart.

## Karar (main `3500c03`, yayında değil)
- **Tavan tamamen silindi.** Fenerler akışla normal dolar, nöbet kavgası (dalgalar, tırmananlar, büyük olan) aynen kalır. `BEACON_ENERGY` [28400, 667000, 5.97e6, 6.64e7, 3.74e8], `TIER_SCALE` [2.4, 182, 9000, 172000, 2.15e6], `ZONE_BURN` [1, 1, 1.05, 1.8, 3.4], `OIL_PER` [8.4, 13.3, 14.7, 16.2, 8.5].
- **Sonsuz yıldızlar:** her kademede Fitil, Yağ ve (1. kademeden) Bereket kolunun ucunda bir yıldız: Sönmez Fitil (+%2 güç/seviye), Dipsiz Hazne (+1,5 sn yağ/seviye), Taşkın Bereket (+%2 kıvılcım/seviye); fiyat taban × kademe × 1,5^seviye. Ölü sefer sıfır. Ajanın eklediği "sonraki fener yanınca mühürlenir" kuralı kaldırıldı (`REPEAT.seal` false): yine bir kapıydı ve alınmamış yıldız "mühürlendi" görünüyordu; botla ölçüldü, güç şişmesi yok (5. fenerde 2431 her iki hâlde).
- **Atılım silindi** (Kor İzi ve Kayan Yıldız ile; Shift/Q/sağ tık/LB boşta). Pervane ve Kurukafa yana adımla kaçılır; bot zaten atılmıyordu. İade yok.
- **`?chapter=N`** (0–5) ve `?chapter=new`: o bölümün kaydını kurar (`js/chapter.js`, `tools/dev.js` `fresh()` ile ortak). Oynanmış kayıt varsa onay sorar ve `_bak` anahtarına yedekler. Kayıt sürümü 6 → eski kayıtlar atılır.
- Bot: özensiz ~48–50 sefer / ~117–120 dk, insan tahmini ~163–167 dk (önce ~138); Kalp kolaylaştı (özensiz ~6 → ~2 deneme), sonra ayarlanacak.

## Reddedilen alternatifler
- Tavanı "zayıf ışık yavaş tutuşturur" diye yumuşatmak: yine beklemek demek.
- Sonsuz yıldızların mührü: yukarıda.
- Yalnız kota/maliyet ile 3–4 saat: her kota ve fiyat ×1,8 ile ~196 dk ama bölge başı 11–13 sefer, tekdüze. Uzunluk içerikten gelecek ([[2026-10-13-guc-ekranda-gorunsun-dunya-kirilir]]).

## Sonrası
- Kalp (`VIGIL.light`) daha güçlü gelen bekçiye göre yeniden ayarlanacak (Yusuf: "bossu sonra").
