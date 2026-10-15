---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, sohbet, tepki, oda, karar]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Karar: Sohbette kişi başı mesaj başına tek tepki, 20 emojilik şerit, satırın her yerinden kaydırma, emoji düğmesi yok

## Bağlam
Sohbet tepkisi 6 sabit emoji + çoklu tepki, yazma kutusunda sol emoji düğmesi ve paneli vardı ([[2026-10-09-oda-ekrani-sohbet-merkezli]]). Yanıt için kaydırma yalnız balonda çalışıyordu.

## Karar
- Sol emoji düğmesi ve paneli silindi (`emoji.ts` silindi); klavyenin emojisi yeter.
- Tepki: kişi başı mesaj başına tek; başka emoji seçince değişir, aynı emoji tekrar = kaldır. 20 emoji yana kaydırmalı şerit.
- Sunucu: `toggleReaction` delete+insert tek transaction, `ReactResponse.replaced`; WS iki olay (eski off, yeni on); hesap birleştirmede de tek tepki.
- Yanıt için kaydırma satırın her yerinden (`li.msg` tam genişlik, kartlar hariç); uzun basma da boş alandan çalışıyor.
- Commit `50392cd`.

## Neden
(Yusuf gerekçe söylemedi; aşağıdakiler Claude'un çıkarımı.)
- Tek tepki sohbeti sade tutuyor; mesaj altında tepki yığını oluşmuyor.
- Emoji paneli klavyenin yaptığını tekrar ediyordu, yazma satırında yer kaplıyordu.
- Kısa mesaj balonu küçük; kaydırmayı yalnız balonda tutturmak zordu.

## Reddedilen alternatifler
- Migration ile eski çoklu tepkileri temizleme: gerek yok, kişinin bir sonraki seçiminde kendiliğinden tekleşiyor.

## Sonuçlar / riskler
- Telefonda denenmedi (tepki şeridi, satırdan kaydırma).

## İlgili
- [[2026-10-09-oda-ekrani-sohbet-merkezli]] (tepki ve emoji paneli kısmını değiştirdi)
- [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]]
