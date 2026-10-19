---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, ui, gecis, oda]
source: oturum "tussle: geçiş ve düzenleme geri bildirimi" (2026-10-19/20)
---

# Karar: ana sayfa → oda karttan karta geçer; bitmiş gün de açık günün afişini kullanır

## Bağlam
Telefonda: yalnız kapak görseli büyüyordu ("tam ekrana uzuyor" hissi), çift görsel/gölge ve köşe sıçraması vardı; hakkı bitmiş odada (ince şerit) hiç dönüşüm yoktu.

## Karar
- Ana sayfa kartının tamamı odadaki bugün kartına dönüşür; kapak sanatı iki uçta hizalı, tek resim; odanın geri kalanı kademeli belirir. Köşeler `clip-path: inset(round)` ile süreklidir.
- Dönüşte kart görünür bandın dışındaysa ana sayfa onu ortaya kaydırır.
- Bitmiş gün = açık günün afişi (A, 116 px): "Bugün bitti", "Bugün {sıra}.", "Yeni oyun"; ▶ yerinde yazısız sarı hediye rozeti. Şansını dene durumunda hediye yok (önce bedava yazı tura).
- Bugün afişi sade: büyük satır "Bugün {sıra}." (puan/birim yok, puan alttaki satırda). Sezon kutuları "#N".
- Sahip için "Sonraki günü başlat": herkes bitirmeden yalnız soluk açıklama satırı, hazır olunca küçük düğme.

## Neden
Göz tek kartın başka bir karta dönüşmesini izlesin; iki gün durumunda geçiş birebir aynı olsun.

## Reddedilen alternatifler
- B varyantı (92 px kısa afiş): geçiş farklı olurdu.
- Bitmiş günde 76 px ince şerit + 52 px küçük ikon: dönüşüm hedefi yoktu.
- Maskotu görünsün diye yapay bekleme: akıcılık önce; maskot gerçek beklemede (parti sonuç beklerken) eklendi.
- Geçişleri yavaşlatmak: karar verilmedi, telefonda bakılacak.

## İlgili
- [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]]
- [[2026-10-19-onceden-cekme-gun-satirini-olusturmamali]]
