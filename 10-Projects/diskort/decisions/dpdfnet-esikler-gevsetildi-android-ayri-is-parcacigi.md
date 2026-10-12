---
type: decision
project: diskort
date: 2026-10-12
status: active
tags: [diskort, ses, dpdfnet, android, masaustu]
source: Claude Code oturumu 2026-10-12 (commit 7a197f9); inbox 2026-10-10/12 hata taramaları
---

# Karar: DPDFNet eşikleri gevşetildi, Android'de model ayrı iş parçacığında 30 ms tamponla, bekleme kısa

## Bağlam
Sahada Android'de neredeyse herkes "yavaş: ısınmada ~5 ms" ile Standart'a düşüyordu (eşik 5 ms/10 ms hop, ısınma 3,1 ms; kalıcı "yavaş cihaz" hafızası yeni APK'ya kadar DPDFNet'i kapatıyordu). Masaüstünde düşenler 5-30 dk bekliyordu. Yusuf: gecikme bedeli kabul, ~70 ms'ye kadar hissedilmez.

## Karar
- Android: model artık ses yakalama iş parçacığında değil, ayrı iş parçacığında, 3 kare (30 ms) geriden halka tamponla çalışır; sonuç gecikirse o kare 3 ms crossfade ile kuru geçer ("geç" sayılır), pencere başına toplam bekleme ≤ 200 ms. Canlı bütçe 5 → 7,5 ms, ısınma 3,1 → 5,6 ms (oran 1,35), "yetişemedi" = geç kare > %2. Yavaş-cihaz hafızası 12 saat süreli; bekleme 2/4/8/15 dk, görüşme içinde yeniden deneme, geri gelince bildirim. Kural sürümü `/3`: eski "yavaş" kayıtları geçersiz, herkes bir kez daha dener. **Yeni APK gerekir** (CI derlemesi ve Kotlin testleri 2026-10-12'de geçti; cihazda dinlenmedi).
- Masaüstü: yük sınırı 0,6 → 0,75, ısınma 6 → 5,6 ms (pay), köprü tamponu 29 → 39 ms (üst sınır 49 aynı), bırakma 8 raporda 5 → 6 kötü, bekleme 1/2/4/8/10 dk (sıfırlanma 30 dk); bildirim gerçek süreyi yazar.
- Uçtan uca gecikme: Android ~50 → 80 ms, masaüstü ~79 → 89 ms (modelin kendi 50 ms'si dahil). Yusuf "70 civarı kabul" dedi; tampon 70'e çıkarılmadı, masaüstü düşüşleri yük kaynaklı.

## Neden
Ortalama 10 ms'yi aşan cihaz hiçbir tamponla kurtulmaz ama sahadaki telefonlar ortalama olarak sınırdaydı; tampon sıçramaları yutunca ortalama bütçe güvenle yükseltilebildi.

## Reddedilen alternatifler
- Android'de DPDFNet'i varsayılan kapatmak: Yusuf gecikmeyi kabul etti, model istenen özellik.
- Tamponu 70 ms yapmak: kopmaların nedeni sıçrama değil yük; telemetri sonrası gerekirse.

## İzlenecek
`yavaş:`/`yetişemedi:` etiketleri ve yeni "geç: N" sayısı; telefonda başta 30 ms sessizlik ve geçiş sesi.
