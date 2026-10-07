---
type: lesson
project: isik-bekcisi
date: 2026-10-07
status: active
tags: [isik-bekcisi, oyun-hissi, geri-bildirim, denge]
source: oturum e5a9fa92 / 5f403d52 (incremantal-game, 2026-10-07); commit 0ac3876 ve Yusuf'un "camın ısındığını hissedemiyorum" geri bildirimi
---

# Ders: sayıdaki bir zayıflama, botta büyük ceza olsa da oyuncu tarafından hissedilmeyebilir; ceza görünür bir durum değişikliği olmalı

## Ne oldu
Işının ilk "cam ısınır" sürümü (commit 0ac3876) şöyleydi: uzun tutulan ışın yavaş yavaş gücünün %50'sine iniyor, cam hafifçe kızarıyor, ışık sönükleşiyordu. Botta güçlü bir cezaydı: hep basan ~11 sefer geride kalıyordu.

Yusuf oynadı ve "camın ısındığını tam hissedemiyorum" dedi. Nedenleri:
- Ruhların çoğu zaten bir anda yakalanıyor; yarı güç onları da bitiriyor. Fark yalnız dayanıklı hedeflerde, rakamda görünüyor.
- Kızarma halenin sarı parıltısı altında kayboluyordu.
- Cızırtı çok kısıktı.

Hissedilen sürüm, ışığın kendisini değiştiren sürüm oldu: teklemesi, sönmesi, fenere geri çekilmesi, duman çıkması.

## Ders
- Bir bedel ya da ceza tasarlarken önce oyuncunun onu nereden fark edeceğini sor. Hasar, hız ya da yüzde gibi sayılar, oyuncunun gördüğü sonucu (hedef yine ölüyor) değiştirmiyorsa fark edilmez.
- Botun ölçtüğü ceza ile insanın hissettiği ceza ayrı şeyler. İkisini de kontrol et: botla rakam, oynayarak his.
- Görsel ipuçlarını oyunun gerçek sahnesinde kontrol et. Kırmızı bir cam, sarı bir halenin içinde kırmızı görünmeyebilir.

## İlgili
- [[2026-10-07-isin-camini-isitir-asiri-isinma-kilidi]]
- [[2026-10-04-urun-hissi-kararinda-once-secenek-goster]]
