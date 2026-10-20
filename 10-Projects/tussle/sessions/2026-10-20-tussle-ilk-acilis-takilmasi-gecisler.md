---
type: session
project: tussle
date: 2026-10-20
status: done
tags: [tussle, performans, gecis, acilis, android, yayin]
source: "oturum 2026-10-20 akşam (mobil-playus)"
---

# Oturum: ilk açılış takılması ve geçiş düzeltmeleri (20 Eki akşam)

## Yayında
- Sunucu + OTA `176e018`, OTA 0.20261020.1612 (önce `d9e12ed`, 0.20261020.1515). Android 1.11 (vc 15) Play iç + kapalı test (splash ikonu sistem dairesine sığar, `TussleSplash/2` UA → `data-boot='android-fit'`; eski 1.10 kabuğu eski davranışta).
- Commitler: `063731e` (JS ısınması, splash, sezon geçmişi morph'suz), `c0e2051` (1.11), `32bcb35` (GPU ısınması), `d9e12ed` (açılış uçuşu, basılmamış karttan morph, oynamayanlar tıklanır), `176e018` (genel ısınma kuyruğu `warm-up.ts`: oda sayfası, oyuncu kartı, ayarlar; morph kaynaklarında basma = kararma, ölçek yok).

## Ne yapıldı
- İlk oda açılışı: önce ana iş parçacığı ısınması (`warmRoomCode`, `warmFormats`), telefonda kalan GPU payı için boyanan ısınma + boşta no-op VT ([[2026-10-20-ilk-acilis-takilmasi-gpu-pipeline-derlemesi]]).
- Açılış uçuşu: başlangıç donması ve konma atlaması giderildi (`holdApp`, `prime`, girişler uçuşla biter, `settled` sıkı + sınırda döngü durur, ses ısıtması boot sonrası).
- Kart → oda/sheet morph'u basma ölçeğinden (.97) değil dinlenme geometrisinden (`settlePress`).
- Sezon geçmişi gün sayfası: kart morph'u ve iskelet geçişi kaldırıldı (Yusuf istedi).
- Odada "oynamadı" satırları oyuncu kartını açar. Sezon sıralamasına oynamayanları eklemek önerilmedi (sıralama hissi; üyeler listesi zaten var), Yusuf kabul etti.
- Yayın izinleri: `.claude/settings.local.json` (git dışı, `.git/info/exclude`) `release.sh` ve `play:upload` için; daha önce kural yoktu, otomatik denetim bu oturumda engelledi.

## İkinci tur (Yusuf OTA sonrası)
- Oda sayfası / oyuncu kartı / ayarlar ilk açılışı aynı GPU nedeni; oda sayfasının "animasyonsuz" açılması da 140 ms'lik ilk kareden. Tek boşta kuyruk (`warm-up.ts`, dilimli %1 boya) hepsini kapsar. Bedel: açılıştan sonraki ~0,6 sn'de ana sayfada 3 görünmez uzun GPU karesi (~300 ms); erken dokunuş gecikebilir → telefonda bakılacak.
- Kart küçülmesi (press scale) morph'u bozuyordu; Yusuf'un sezgisi doğru çıktı, kaldırıldı ([[2026-10-20-morph-kaynaklari-basinca-kararir-kuculmez]]).
- Yuvarlak ikon: 1.11 Play'den inene kadar sürer (OTA ile düzelmez).

## Açık kalanlar
- Temizlik bitti: Yusuf Xiaomi'deki debug uygulamayı ve MHXF'deki misafiri kaldırdı; OnePlus temiz.
- Odanın kendi ilk açılışında OnePlus'ta hâlâ ~10–12 pipeline (6 geçişte, 5 sohbet dolunca; ısınmada sohbet mesajı yok).
- Telefon teyidi: açılış uçuşu (son sürüm Xiaomi'de ölçülmedi), konmada keskinlik farkı, kart morph'unun ilk karesindeki ~3 px dönüş, sohbetten oyuncu kartı ilk açılışı (~4 ms ek, ölçülmedi telefonda), "Profili gör" her açılışta ~50 ms (kapak çizimi, ayrı iş), oda `mount`'unda `pinToVisualViewport` zorlanmış yerleşim (ayrı iş).
- Koşuların ~1/4'ünde açılış intro'sunda ~53 ms raster duruşu.
