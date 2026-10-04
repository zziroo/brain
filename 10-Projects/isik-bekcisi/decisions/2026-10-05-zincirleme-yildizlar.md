---
type: decision
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, beceri-agaci, niteliksel-yukseltme, sinerji, denge]
source: oturum 53393f9a (incremantal-game), commit bc9e834, bd8ae03, e636e29; Yusuf'un 2026-10-04 gözlemi "zincir gibi etkiler oyunu sıkıcılıktan kurtarır"
---

# Altı zincirleme yıldız, dördü erken kademede; her halka yeni bir yakalama ister, ham çarpan yok

## Karar
| Yıldız | Kademe, bedel | Ne yapar |
|---|---|---|
| Işık Gölü (golu) | 0, Parlama altında, 45 kıvılcım | Her Parlama 3 sn'lik bir ışık gölü bırakır (hale gibi yakar, en çok 4 göl) |
| Nakarat (nakarat) | 0, Bereket I altında, 50 kıvılcım | Bir zincirin her 10. ruhu küçük bir Parlama patlatır |
| Tutuşma (tutusma) | 1, 5 toz | Ani ışıkla (Parlama, atılım, zincir, kristal, Kırılma) yakalanan ruh patlar, çevresine kendi ışığının üçte birini verir |
| Kor İzi (korizi) | 1, Atılım altında | Atılım arkasında 1,5 sn yanan kor bırakır |
| Kayan Yıldız (kayan) | 2, 8 toz | Atılım, indiği yerde yarım güçte bir Parlama ile biter |
| Akkor (akkor) | 3, 12 toz | Zincirin vurduğu 1,5 sn yanar ve zincir hasarını bir kez daha alır |

- **Bağlar:** Nakarat → Parlama → göl ve patlamalar → yakalamalar → zincir → Akkor ve yeni patlamalar. Kristal patlaması ve Kırılma da Tutuşma'yı tetikler.
- **Sınır:** Her halka yeni bir ölüm ister. Patlamanın yakaladığı patlamaz (`'pop'`), Akkor'un yaktığı patlamaz. Göl hedef başına tek kez sayılır. Zincir hedefin canına göre ölçeklidir.
- **Karacık:** Göl ve kor karacığı tam yakar, çünkü karacık yalnız halenin dağınık ışığına dayanır. Kabuklu bunlara da haleye dayandığı kadar dayanır, yani kabuğu çatlatmak için yine ışın gerekir. Karacığın ölümü bu yıldızları tetiklemez.

## Neden
- 55 yıldızın ~10'u oynayışı değiştiriyordu ve ilk ~5 seferde yalnız Parlama ile Atılım vardı. Yusuf zincirleme etkilerin oyunu canlı tuttuğunu söyledi.
- Gösteri büyük olsun, gelir patlamasın diye: [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]].

## Reddedilen alternatifler
- **Ham çarpan yıldızları:** geliri patlatır, his vermez.
- **Kendini sınırsız tetikleyen zincirler:** bir kez tetiklenince ekranı siler.
- **Zincir'i 0. kademeye taşımak:** erken kademeye zaten dört yeni yıldız geldi; eski kayıtların yolu değişmesin.

## Sonuç ve denge
- Yıldızlar botun oyununu ~5–7 sefer kısalttı (Kalp 1–2 denemede düştü). Yıldızların kendi sayılarını zayıflatmak bir seferden az etki etti. Etkinin kaynağı yapısal: daha çok yakalama, daha çok Çiy Damlası yağı, daha uzun sefer.
- Tempo `TIER_SCALE` 2–4 artışıyla eski şekline döndü: [[2026-10-05-denge-tier-scale-ile-eski-tempoya-donus]].
- Bot hiç atılım yapmadığı için Kor İzi ve Kayan Yıldız ölçülmedi. Atılım kullanan bir insan biraz daha güçlü olur.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]]
