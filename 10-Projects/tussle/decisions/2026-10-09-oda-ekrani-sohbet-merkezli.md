---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, ui, sohbet, oda]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A)
---

# Karar: Oda ekranı sohbet merkezli; Tablo/Sezon/Üyeler alt sayfa; tepki ve yanıt var, GIF ertelendi

## Bağlam
Oda ekranı dört sekmeydi (Tablo, Sezon, Sohbet, Üyeler); sohbet üç düğmeli basit bir kutuydu. Yusuf Playus havası istedi: sohbet en başta, gönderme hep altta, chat aktif olsun.

## Karar
- Üstte günün oyunu kartı + podyum şeridi + üç hap (Tablo / Sezon / Üyeler → alt sayfa). Gövde sohbet akışı; gönderme çubuğu `visualViewport`'a sabit, klavye açılınca üst alan gizlenir.
- Sohbet: uzun basınca 6 sabit emoji tepkisi + Yanıtla + Kopyala; sağa kaydır = yanıt; emoji paneli (8 kategori, son kullanılanlar `localStorage`). Sunucu: `messages.reply_to`, `reactions` tablosu (migration 4), `POST .../react`, ws `reaction` olayı, tepki için ayrı hız sınırı.
- Sezon alt sayfasında oyuncu başına çizgi grafik; veri yeni `GET /api/rooms/:code/season` (gün başına kümülatif puan). Oyuncu kartı alt sayfası podyum/tablo/sezon/üyelerden açılır, host işlemleri (eş-host, at) oraya taşındı.
- GIF ikinci tura (Tenor/GIPHY anahtarı + ağ trafiği).

## Neden
Sohbet odanın kalbi; skor akış satırları zaten sohbete düşüyor. Sabit emoji seti doğrulamayı ve arayüzü basit tutuyor.

## Reddedilen alternatifler
- Sezon grafiğini `localStorage`'da gün gün biriktirerek tahminle çizmek (ilk ajan böyle yaptı): cihazdan cihaza farklı, eksik günleri uyduruyor; sunucu uç noktasıyla değiştirildi.
- Serbest emoji tepkisi: grapheme/ZWJ doğrulaması karmaşık, 6'lı set yeterli.
- Tepki için idempotent `{emoji, on}` yerine toggle: yeniden sıralanan isteklerde nadir yanlış chip (düşük, kabul edildi).

## Sonuçlar / riskler
- Telefonda doğrulanmadı: klavye açıkken çubuk (iOS/Android), uzun basma/kaydırma jestleri, Gece teması.
- Eski akış satırları (yük olmayan) hangi dilde yazıldıysa öyle kalır.

## İlgili
- [[2026-10-09-dil-altyapisi-tr-en]]
- [[_overview]]
