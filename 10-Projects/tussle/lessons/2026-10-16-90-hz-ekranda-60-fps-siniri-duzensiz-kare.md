---
type: lesson
project: tussle
date: 2026-10-16
status: superseded
tags: [tussle, performans, kare-hizi, android, ders]
source: oturum 2026-10-16 (mobil-playus) Yusuf'un "Android'de ilk oyun kasar gibi oldu" bildirimi
---

# Ders: 90 Hz ekranda 60 fps sınırı kareleri düzensiz aralıkla verir

## Ne oldu
Yusuf Android'de (Xiaomi) ilk oyunun "kasar gibi" olduğunu söyledi ve ekran hızı ölçümünden şüphelendi. Ayarlar'daki "Yüksek kare hızı" anahtarı ilk oyundan sonra "90 Hz" olarak göründü.

## Koddan çıkan
- **Ölçüm sebep değil:** `measureRefresh(60, …)` yalnız oyun öncesi hazır kartında çalışıyor (`src/client/ui/game-screen.ts`). 60 kare sürüyor, 90 Hz'de yaklaşık 0,7 sn, ve oyun başlarken durduruluyor. Boş bir kare döngüsü, yükü yok denecek kadar az. Anahtarın ilk oyundan sonra görünmesi beklenen davranış: ölçüm o oyunda yapıldı.
- **Güçlü aday:** `highFps` kapalıyken `FrameLimiter` 60'ta sınırlıyor (`src/client/loop-math.ts`). 90 Hz'de 60, 90'ı tam bölmediği için kareler sırayla 11 ms ve 22 ms arayla geliyor. Ortalama 60 fps ama hareket titrek görünür. 120 Hz'de sorun yok, orada her ikinci kare çiziliyor.
- Telefonun paneli 120 Hz olmasına rağmen ölçüm 90 çıktı. Muhtemelen HyperOS uygulamayı 90 Hz'e indiriyor. Oyun sırasında 120 ile 90 arasında geçiş olursa o da anlık takılma yapabilir.
- Titreklik ilk oyuna özgü olmaz, her oyunda olur. Yalnız ilk oyunda takılıyorsa daha olası sebep soğuk başlangıç (ilk çizim, ses, font ısınması).

## Sonuç (2026-10-16 gece, doğrulandı)
adb ile ölçüldü: Xiaomi'nin uyarlanabilir paneli oyun sırasında 60 ↔ 120 Hz gidip geliyor; rAF atlayan 60 sınırı her geçişte 33 ms boşluk bırakıyordu. Sınır kaldırıldı: [[2026-10-16-kare-siniri-kalkti-her-vsyncte-cizim]]. Uygulamaya özgü kalan takılma ayrı: [[2026-10-16-android-webview-parmak-kalkinca-takilma]].

## Uygula
- Önce Yusuf 90 Hz anahtarını açıp aynı oyunu oynasın. Daha akıcıysa: ekran hızı 60'ın katı değilse (90, 75, 144) varsayılan olarak ekranın kendi hızında çiz. Oyun mantığı 60 Hz'de kalır, çizim ara değerle yapılır.
- Fark yoksa ve yalnız ilk oyun takılıyorsa: adb + `chrome://inspect` ile ilk oyunun performans kaydını al.
- **Doğrulanmadı:** cihazda henüz denenmedi; yukarıdakiler kod okumasından çıkan hipotez.

## İlgili
- [[2026-10-08-web-cekirdegi-capacitor-ve-ad-tussle]] (varsayılan 60 kare sınırı kararı)
- [[sessions/2026-10-16-tussle-oda-parti-siniri-32]]
