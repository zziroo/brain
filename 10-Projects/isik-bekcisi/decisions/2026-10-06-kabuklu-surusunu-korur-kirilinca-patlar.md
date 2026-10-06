---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, kabuklu, isin, odul]
source: oturum fb8e3060 (incremantal-game), commit 8e6ef52; Yusuf'un 2026-10-06 oynama gözlemi
---

# Karar: kabuklu ruh sürüsünü korur; kabuğu kırılınca sürü bir anda yakalanır ve patlama olur

## Bağlam
Yusuf: "2. fenerde gelen, patlattığım bir şey var. Onu patlatana kadar zaten etrafındaki her ruhu alıyorum; patlatmak bir işe yaramıyor gibi."

Rakamlar bu hissi doğruluyordu: kabuklunun canı 6 kat, değeri 5 kattı. Işın yağı 2 kat yakıyordu ve kırılınca hiçbir şey olmuyordu. Kabuklu yalnız "geç bölgeler ışın ister" dersi için konmuştu, ödülü yoktu.

## Karar
- **Sürü:** her kabuklunun çevresinde ipliklerle bağlı 4–6 ruh var. Kabuk dururken bu ruhlara hiçbir ışık işlemez.
- **Kırılınca:** sürünün hepsi bir anda yakalanır (kaynak `'husk'`): zincire, ödeme ve fener akışına sayılır, Tutuşma tetiklemez. Hemen ardından çevreye bir patlama yayılır (kaynak `'boom'`, Tutuşma tetikler).
- **İplikler:** kabuk çatladıkça teker teker kopar.
- **Ayarlar:** kabuklunun kendi değeri 5'ten 4'e indi. `SHELL_CHANCE` ([0, 0, 0,045, 0,1, 0,12] → [0, 0, 0,03, 0,05, 0,06]) azaldı.

## Neden
Bugünkü sorunun tersine çevrilmesi: kırmadan sürüyü alamazsın. "Patlatmak" en tatmin edici anlardan biri olur ve ışına gerçek bir amaç verir.

## Reddedilen alternatifler
- **İçinden yağ çıksın:** anlamlı ama gösterişsiz.
- **Yalnız patlama, sürü koruması olmadan:** bugünkü sorun sürer; çevredeki ruhların çoğu zaten alınmış olurdu.

## Sonuçlar / riskler
- Sürünün büyüklüğü oyunu kısaltan en güçlü ayar. 5–8 ruh oyunu ~3 sefer kısaltıyordu, 4–6 ise ~2.
- Gerçek bir oyuncunun patlamayı tatmin edici bulup bulmadığı denenmedi.

## İlgili
- [[2026-10-06-hale-tutar-bilincli-isik-bitirir]]
- [[2026-10-02-lazere-donusen-isin-yag-bedeli-ve-lazer-dusmanlari]]
