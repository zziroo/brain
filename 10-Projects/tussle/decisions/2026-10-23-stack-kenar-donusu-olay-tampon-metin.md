---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, karar, stack, gorsel, metin]
source: oturum "tussle: oyun turu kalan işler" (2026-10-23)
---
# Karar: stack'te kenar dönüşü üç yoldan okunur (olay + tampon + hazır kartı metni)

## Karar
- Sim yön değiştirdiği tick'te `EV_TURN` yayınlar (sürüm artmadı: RNG/skor/tick aynı).
- View: kayan blok hizasında iki kenarda kaide renginde küçük tampon (alan genişliğinin %2'si, kuleyle yükselir); dönüşte blok 120 ms kenara yaslanıp yassılır, tampon içeri basılır, `tick` sesi; azaltılmış harekette yalnız ses.
- Hazır kartı: "Blok kenarda geri döner; dokun, düşsün. Taşan kısım kesilir!"

## Neden
Oyuncu ilk blokta onun ekrandan çıkacağını sanıp kenarda bırakıyordu (Yusuf). Oyun içi ipucu yazısı yasak ([[2026-10-23-ortak-hud-skor-ortada-tur-hapi-ipucu-ve-altin-yok]]); dönüşü sahne ve hazır kartı anlatır.

## Reddedilen
Kenara yaklaşırken yavaşlayıp dönme: dönüşü sezdirir ama zamanlama hissi ve zorluk eğrisi değişir.
