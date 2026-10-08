---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, denge, uzunluk, icerik, yol-feneri]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); dal worktree-agent-ab86d63263f65aa59 (931384a..27f5fb7), yerel, main'e girmedi
---

# Karar: hedef ilk bitiriş ~2–2,5 saat; seferler güçlendikçe uzar, her bölgede bir Yol Feneri, ruhlar sefer boyunca yenilenir

## Bağlam
- Yusuf: "seferler çok hızlı bitiyor, sürekli kampa dönüp geliyorum"; bu türde 3–4 saatlik oyunlara alışkın.
- İlk gerçek ölçüm: 49 sefer, yolda 32 dk, toplam 1 sa 16 dk ([[2026-10-07-ilk-gercek-olcum-kamp-suresi-botun-iki-kati]]).
- Hedefi Yusuf seçti: ~2–2,5 saat. İlk içerik setinde yalnız Yol Fenerleri olsun dedi.

## Karar (dal `worktree-agent-ab86d63263f65aa59`, son commit `27f5fb7`)
- **Yağ eğrisi:** derin bölgede yağ hâlâ daha hızlı yanar ama fark azaldı. `ZONE_BURN` [1, 1,1, 1,05, 1,5, 2,9], arena 2,5. Başlangıç yağı 25 (14'tü). Yağ yıldızları ~5–15 verir. Maliyetler ve fener enerjileri buna göre yükseltildi. Nöbet tutma süreleri değişmedi.
- **Yol Fenerleri:** her bölgede bir tane, Kuzey Yolu'nun kenarında.
  - Halkasına bilerek girip 0,4 sn durunca küçük bir nöbet başlar, bir kez yakılır (~7–9 sn). Çayır'ın dalgaları tek tük karacık.
  - Yakılınca kalıcıdır. Her seferde ilk geçişte yağın %25'ini döker. Dolu fenerin üstüne de döker: fazlası azami yağın üstünde, önce yanan bir yedek olur (fitilde ayrı, parlak bir şerit).
  - Fenerler bot yağının ~%13–17'sini veriyor.
- **Ruh yenilenmesi (`RENEW`, `thinned()`):** bölge boşaldıkça karanlıktan yeni ruhlar süzülür. 20 sn'den sonra devreye girer, 50 sn'de tam hıza ulaşır. Hiçbir zaman ışığın içinde doğmaz. Geç bölgelerde avın yarısı artık seferin son üç çeyreğine dağılıyor.
- **Uyarlanmamış ön fener:** henüz hazır olmayan bir fener, sefer başına en çok iki kez ruh çağırır.
- **Kalp:** şimdilik tek ve kısa bir denemede düşüyor. Son Nöbet çözecek ([[2026-10-07-kalp-son-nobet-olarak-yeniden-tasarlanacak]]).

## Sayılar (seed 1/3, 20'şer oyun, kamp dahil)
| | Önce (`a67e9cb`) | Dal |
|---|---|---|
| İyi bot | 37,5 sefer, yolda 24 dk | 36,4 sefer, yolda ~62 dk |
| Özensiz bot | 43,3 sefer, yolda 27 dk | 44,4 sefer, yolda ~64 dk |
| İnsan tahmini (özensiz bottan) | ~77 dk | ~123 dk (~50 sefer, yolda ~78 dk) |
| Sefer süresi, Çayır → Harabeler (özensiz) | ~20–40 sn | 45 / 69 / 86 / 108 / 128 sn |

## Neden
- Bu türde sefer güçlendikçe uzar; uzama ödülün kendisidir.
- Uzunluk maliyetle değil sefer süresiyle geliyor. Maliyet artışı yalnız dengeyi korumak için kullanıldı.
- Ödüller yağ, kıvılcım değil; yoksa içerik oyunu kısaltır.

## Reddedilen alternatifler
- **Yalnız maliyet ve yağ:** uzun ama boş seferler ([[2026-10-07-uzun-sefer-icin-yag-yetmez-av-yenilenmeli]]).
- **Sabit hızda yenilenme:** Harabeler'in ikinci yarısını doldurmadı.
- **Kalp'te yağı hızlı yakıp sefer sayısını tutturmak:** ajan arenada yanmayı 4,5'e çekmişti, Kalp 6–8 denemeye çıktı. Tam Yusuf'un şikâyeti; geri alındı.
- **Fenerin artanını geri dönüp almak:** geri yürümeyi taktik yapıyordu.
- **Çiy Damlası'nı kısmak:** etkisi küçük kaldı. Bunun yerine Harabeler'in yanması yükseltildi; genel ayarda yeniden bakılmalı.
- **Kayan yıldızlar, eski bekçi fenerleri, bölge olayları:** önerildi, Yusuf ilk sete almadı.
- **Işığı kesen harita (terk edilmiş köy):** Yusuf'un fikri. Neredeyse her sistemi değiştirir (gölge, tehditlerin yolu, bot). Sınırlı hâli sonraya: önce "ışın duvarda biter", sonra köy tek bir yer olarak.

## Sonuçlar / açık
- **2026-10-08:** dal incelendi (1 orta: başlanan fenerin gerisindeki yol feneri de dolduruyordu, artık doldurmuyor; 5 düşük), Son Nöbet'le birlikte main'e girdi ve canlıda (`b2bedf1`). Bot 0,4–0,8 sefer uzadı, yeniden ayar yok. Son hâli: [[2026-10-08-son-nobet-gamepad-lazer-yayin]].
- Yedek yağ, fenere "ne zaman uğrasam" kararını azaltıyor (ajanın sorusu). Gerekirse yedek, dökülen miktardan küçük tutulabilir.
- Harabeler'de özensiz bot 9,3 sefer, sefer ~128 sn; hedefin biraz üstünde.
- Kayıt sürümü 4; eski kayıtlar fener paylarına göre ölçekleniyor.

İlgili: [[2026-10-07-kuzey-yolu-ileri-gitmenin-isareti]], [[2026-10-05-devir-oyun-uzunlugu]]
