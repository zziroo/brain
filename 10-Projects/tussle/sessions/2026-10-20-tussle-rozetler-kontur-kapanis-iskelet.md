---
type: session
project: tussle
date: 2026-10-20
status: done
tags: [tussle, oturum, rozet, ui]
source: oturum "tussle: rozetler ve kapanış geçişleri" (2026-10-20)
---

# Oturum 20 Eki: avatar konturu, kapanış geçişleri, iskeletler, kademeli rozetler (hepsi yayında)

Sunucu `0787aa4`, OTA 0.20261020.645.

## Commitler
- `81f1d48` avatar + şerit konturları
- `4ba4300` kapanış geçişleri (düşüş korunur, bugün tablosu çökmesi)
- `9e03b31` yükleme iskeletleri
- `a0a336f` sezon sayfası morfsuz
- `0787aa4` kademeli rozetler + yeni profil istatistikleri

Her biri için inceleme: orta+ bulgu yok, düşükler düzeltildi; typecheck temiz, 2379 test geçti.

## Kararlar
Ayrıntı ve reddedilenler: [[2026-10-20-gorsel-kurallar-kontur-kapanis-gecisi-iskelet]], [[2026-10-20-kademeli-rozetler-bronz-gumus-altin]].

## Açık
- Telefon teyidi: konturlar (Gece), kapanış geçişleri, sohbet iskeleti, rozet popup'ı (iPhone çentiği, Android geri tuşu).
- Ev sahibi rozeti üyeler ayrılınca düşebilir; kazanılan kademeleri kalıcılaştırmak sonra.
- Rozet eşiklerini veri birikince yeniden ayarla.
- Maskot 1000 ms eşiği gerekirse geri alınır.

## Ders
[[2026-10-20-siniflandirici-canli-yayin-ve-db-okumayi-son-mesaj-onaylamadikca-engeller]]
