---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oda, sezon, davet, buyume]
source: oturum "tussle: denge partisi, oda kilidi, tema düzeltmeleri" (2026-10-19), commit `fc70f52`
---

# Karar: Yeni oda ilk arkadaş katılana kadar kilitli; oyun ve sezon başlamaz

## Bağlam
Yusuf Playus'ta "arkadaşını davet etmeden oda başlamıyor" ekranını gördü, mantıklı buldu. Ben "kurucu bugünün oyununu oynasın, sezon ikinci kişiyle başlasın" ortasını önermiştim.

## Karar
- Yusuf: kilitli kalsın, "insanlara olan bağı arttırır"; "belli başlı şeyler kalabilir ama oyun başlamasın"; "kilit açıldı diye animasyonlu şeylere gerek yok, genel tasarıma odaklanalım".
- Kilitli = sezon satırı yok ve üye < 2 (`ROOM_MIN_MEMBERS`). Oyun, gün, sezon, kapışma, parti, hak satın alma 409 `room.locked` (IAP mağazaya gitmeden reddedilir). Ad, ayar, davet, sohbet açık.
- 2. üyenin ilk katılımı Sezon 1'i o gün başlatır (`start_day` = katılım günü), sohbete tek "X odaya katıldı · Sezon 1 başladı" satırı ve kurucuya aynı push (oyun adı yok, gün satırı açılmaz). Sezonu olan oda bir daha kilitlenmez.
- Tasarım C1 (tek kart): bugünün kartı yerinde sebep + kilit diski "1/2" rozeti + tek "Arkadaşını çağır" + kod/QR satırı; ana sayfa kartında "kilitli · 1/2" rozeti ve "Çağır". Kutlama animasyonu yok. Taslak `src/client/mockups/oda-kilit.*` (v2).

## Neden
Tek kişilik oda boş hisseder; davet zorunluluğu hem bağı hem yayılmayı artırır. Kilitli hâl gerçek odanın kendisi olduğu için açılınca ekran değişmez.

## Reddedilen alternatifler
- Kurucunun tek başına oynayabilmesi, sezonun 2. kişiyle başlaması (benim önerim): Yusuf kilidi istedi.
- A (boş sandalye kartı), B (QR'lı davetiye, sohbet de kilitli): açılınca ekran baştan değişiyor / sohbeti de kapatıyor.
- Kilit açılma animasyonu ve "Kilidi sen açtın!" çıkartması: Yusuf istemedi.
- Üye 1'e düşünce yeniden kilitleme: koşan sezonu bozar, sade değil.

## İlgili
[[2026-10-19-tussle-denge-partisi-oda-kilidi]]
