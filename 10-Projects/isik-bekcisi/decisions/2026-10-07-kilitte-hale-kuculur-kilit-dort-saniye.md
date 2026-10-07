---
type: decision
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, denge, isin, isi]
source: oturum 1249d80e (incremantal-game, 2026-10-07 akşam); commit cf358c1, canlı a67e9cb'den beri
---

# Karar: cam taşınca kilit 4 sn sürer ve kilit boyunca hale odaklanmış gibi küçük kalır

## Bağlam
Yusuf canlıda "hep basmak caydırmıyor" dedi. Bot da aynısını göstermişti: kilitliyken fener bırakılmış sayılıyordu (hale tam, yürüyüş hızlı, odak yağı yok), yani kilit bir moladan farksızdı ([[2026-10-07-kilit-cezasi-mola-olabilir]]).

## Karar
- Kilitliyken hale, odaklanmış gibi küçük kalır (`R.narrow`). Işın çıkmaz; yürüyüş hızına ve yağa dokunulmaz. Kilit açılınca hale yumuşakça açılır.
- `HEAT.lock` 2 → 4 sn.
- Aşırı ısınma anındaki hale kısılması (`outDip`) kaldırıldı. Aşırı ısınma, dalgalanmalarla aynı "saniyede en çok 3 kararma" sayacına girer.

## Neden
- Ceza kilitli hâlin kendisinde olmalı. Küçük hale, gecenin yaklaşması ve daha az yakalama anlamına geliyor, yani hissediliyor.
- Yusuf iki seçeneği de mantıklı buldu: yağ dökülmesi ya da halenin küçülmesi. Daha basit olduğu için haleyi seçti: "aynı odaklanmış gibi ama odak ışığı yok".

## Sayılar (seed 7–9, 8'er oyun)
| Bot | Önce | Sonra |
|---|---|---|
| İyi bot | 38,0 sefer | 38,0 sefer |
| Özensiz bot | 43,4 sefer | 43,1 sefer |
| İyi bot, hep basan | 41,8 sefer | 44,6 sefer |
| Özensiz bot, hep basan | 47,7 sefer | 50,0 sefer |

- Normal oynayan botlar hiç aşırı ısınmıyor.
- Hep basan bot oyun başına ~125–130 kez aşırı ısınıyor.
- Kilit 2 sn iken hale küçülmesi tek başına yalnız +0,2 / +0,4 sefer ekliyordu.

## Reddedilen alternatifler
- **Cam taşınca yağ dökülmesi:** Yusuf ikisini de mantıklı buldu, ama yeni bir yağ kaybı yerine daha basit olanı seçti.
- **İkisi birden:** fazla sert bulundu.
- **Kırmızı bölgede zayıflamayı artırmak:** sayıdaki zayıflama hissedilmiyor ([[2026-10-07-sayidaki-zayiflama-hissedilmez]]).

İlgili: [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]], [[2026-10-07-isi-isinin-solmasi-ve-hale-kenarinda-anlatilir]]
