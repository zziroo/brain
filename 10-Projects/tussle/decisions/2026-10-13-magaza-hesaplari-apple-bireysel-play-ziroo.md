---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, magaza, apple, google-play, hesap]
source: oturum 2026-10-13 üçüncü (mobil-playus: Capacitor iOS/Android, TestFlight, Play Console)
---

# Karar: Apple'da bireysel hesap (ad Yusuf Holat), Play'de bireysel hesap (geliştirici adı Ziroo); mağaza adı "Tussle: Daily Mini Games"

## Bağlam
İlk TestFlight yüklemesi ve Play Console kaydı yapıldı. Yusuf geliştirici adının "Ziroo" olmasını istedi; "Tussle" adı App Store'da başkasında çıktı.

## Karar
- **Apple:** mevcut bireysel Apple Developer hesabı; mağazada geliştirici "Yusuf Holat" görünür (bireyselde yasal ad, değiştirilemez). "Ziroo" için kurumsal hesap + D-U-N-S gerekir; **sonraya**, yayından sonra dönüşüm mümkün.
- **Google Play:** bireysel hesap (kuruluş hesabı şirket belgesi/D-U-N-S ister, seçilmedi); görünen geliştirici adı **Ziroo** (Play'de serbest metin). Hesap 2026-10-13 açıldı; kimlik doğrulaması bekliyor. Uygulama sayısı en küçük seçenek, para kazanma "henüz karar vermedim", hassas kategori "Hiçbiri".
- **Mağaza adı (iOS):** "Tussle: Daily Mini Games" (30 karakter sınırı; "Tussle" alınmış). İkon altı ad her iki platformda "Tussle". Birincil dil English (U.S.); Türkçe sonra ek dil.
- **Dağıtım:** iOS'ta TestFlight dış grup + public link (UDID gerekmez); Android'de Play iç test (inceleme yok) → kapalı test. Play bireysel hesaplarda üretime çıkmadan 14 gün / 12 test kullanıcısı şartı var; arkadaş testi bunu doldurur.
- İlk yapı: iOS 1.0 (1) App Store Connect'te "Ready to Submit"; DSA beyanı "not a trader" (Active), Free Apps anlaşması Active.

## Neden
- Kurumsal hesaplar haftalar alır; önce test grubuna çıkmak öncelik ([[2026-10-13-once-magaza-sonra-denge]]).
- Play'de görünen ad serbest olduğundan "Ziroo" markası orada bedava geliyor.

## Reddedilen alternatifler
- Kuruluş hesabı (Play) / kurumsal hesap (Apple) şimdi: belge + D-U-N-S + bekleme.
- `com.tussle.app` benzeri kimlik: [[2026-10-13-paket-kimligi-net-ziroo-tussle-ve-ios-kabuk]].

## Açık → çözüldü (2026-10-15)
- External Testing bölümü, **bir iç grup açılınca** beliriyor (Apple yardım sayfası "Invite external testers"; Yusuf buldu). Dış grup "externalgroup" + public link oluşturuldu; link, yapı Beta App Review'dan geçince çalışır. Apple destek talebi gereksiz kaldı.
