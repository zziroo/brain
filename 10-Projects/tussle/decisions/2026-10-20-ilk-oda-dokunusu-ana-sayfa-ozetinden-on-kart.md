---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, gecis, oda, onbellek, performans]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Karar: soğuk açılışta ilk oda dokunuşu ana sayfa özetinden başlık + bugün ön kartıyla açılır

## Bağlam
Soğuk açılıştan sonra ilk oda dokunuşunda geçiş "animasyonsuz" hissediliyordu. Telefonda 120 Hz kayıtla kök neden bulundu: oda görünüm önbelleği boş → başlıkta oda KODU ("TVHC"), iskelet ve C dönüşümü yerine B itme.

## Karar
- Ana sayfanın `RoomSummary`'sinden başlık + bugün "ön kartı" (`todayHint`) kurulur; C dönüşümü ilk dokunuşta da çalışır.
- Oda ön çekmesi açılışta başlar, hat başına tek istek, en fazla 2 hat (sunucuya ek istek yok). Ölçüm: ana ekran göründükten 0,5 sn sonra dokunuşta önbellek dolu 0/5 → 5/5.
- Oda ayarları sayfası: bildirim tercihleri bellek + localStorage önbelleği (hesaba bağlı), sessiz tazeleme; yalnız üyeler değişince yalnız liste güncellenir (her açılışta yükleniyordu).

## Neden
- 19 Eki kuralı: ekran bir kez, dolu açılır ([[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]]); elde zaten olan özet veri yeterli.

## Reddedilen alternatifler
- Dokunuşu veri gelene kadar bekletmek: dokunuş yavaş hissettirir.
- Kapak decode, font ön yükleme, detail + today paralel: küçük kazanç (Yusuf sadelik tercihi: küçük kazançlı mimari iyileştirme istemez).

## İlgili
- [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]] · [[2026-10-19-onceden-cekme-gun-satirini-olusturmamali]] · [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]
