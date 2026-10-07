---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, yon, okunurluk, dunya, ogretici]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); commit d30763b, 5c60089, a67e9cb; canlı a67e9cb'den beri
---

# Karar: ileri (kuzey) oyunun içinden gösterilir: Kuzey Yolu, kuzeye akan ışık, kararan yanlar; yedek olarak bir ipucu

## Bağlam
Yusuf: oyuna yeni başlayan, kapıdan çıkınca yukarı gitmesi gerektiğini kestiremiyor. Önerisi: yanlara yaklaşınca bir uyarı, ya da ileri gitmek için bir sebep.

## Karar
- **Kuzey Yolu:** kapıdan fenerlere ve arenaya uzanan eski taş yol. Taşları ve tekerlek izleri yalnız ışık düştüğü yerde görünür. Engellerin etrafından dolaşır.
  - Kendi tohumundan üretilir, dünyada hiçbir şeyi kaydırmaz.
  - `roadX(depth)` yolun x'ini verir; Yol Fenerleri bunu kullanıyor.
  - Hikâyenin incilinde zaten "Kuzey Yolu" geçiyordu.
- **Fenerin çağrısı:** fenere akan her ruhun ışığı kuzeye doğru süzülen soğuk bir zerre olarak görünür. Sıradaki fener ekranın üst kenarında soğuk bir parıltı olarak belirir, akış doldukça güçlenir.
- **Yanlar:** vadinin dış ~150 birimi biraz daha karanlık ve sisli. Bu yalnız görüntü; kurala dokunmaz.
- **Yedek ipucu (`h_road`):** ilk üç seferde 8 sn yürüyüp 300 birimden az ilerleyen oyuncuya sıradaki fenerde bir ipucu çıkar.
- **Kandil:** kapıda "Kuzey Yolu'nu izle; fenerler onun üstünde."

## Neden
- Sebep, uyarıdan iyidir. Işığın kuzeye aktığını görmek "orada bir şey var" der.
- Yol aynı zamanda içeriğin omurgası: yol üstünde Yol Fenerleri var, yoldan sapmak da bir karar.

## Reddedilen alternatifler
- **Yanlara yaklaşınca uyarı:** cezalandırıcı hissettirir. Yanlarda ileride saklı şeyler olabilir.
- **Ekranda ok:** arayüz ve imleç kuralına ters, gamepad'le de uyumsuz.
- **Yanlarda ruhları seyreltmek:** spawn'ı değiştirir, dengeyi etkiler.

## Sonuçlar
- Bot birebir aynı oynuyor.
- Yol birkaç yerde dik kıvrılıyor (en çok ~60°); oynarken göze batarsa yumuşatılır.
- Yanlış bir varsayım vardı: ilk seferler 14 sn sürdüğü ve kuyrukta önde başka ipuçları olduğu için ipucu ilk seferde nadiren sıra buluyor; o yüzden ilk üç sefere yayıldı. Uzun seferler gelince başlangıç yağı da artıyor.

İlgili: [[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]
