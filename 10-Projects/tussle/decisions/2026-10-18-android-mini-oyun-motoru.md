---
type: decision
project: tussle
date: 2026-10-18
status: accepted
tags: [tussle, android, performans, mini-motor, quickjs, capacitor, twa, geckoview]
source: oturum 2026-10-18 "tussle: Android TWA yerine Capacitor + oyun tanınması"
---

# Karar: Android'de oyunlar kendi mini motorumuzda çalışacak (QuickJS + Android Canvas); arayüz Capacitor'a döner

## Bağlam
Yusuf TWA'nın "site gibi" görünmesinden ve uygulamanın oyun olarak tanınmamasından rahatsız. Aynı gün denenenler (hepsi Xiaomi 17 Pro):
- Capacitor/WebView + `appCategory=game` + renderer önceliği + Game Turbo performans: parmak kalkınca takılıyor ([[2026-10-16-android-webview-parmak-kalkinca-takilma]]).
- GeckoView (`android-gecko/`): akıcı ama ~80 MB indirme; hızlandırılmış canvas'ta yarım çizilmiş kare (Split'te gölgeli sıçrama; yalnız `gfx.canvas.accelerated=false` giderdi); parmak kalkınca panel 60'a inince "ghosting" ([[2026-10-18-geckoview-parmak-kalkinca-akici]]).
- Ölçüm: TWA'da Chrome oyunu hep 60 fps çiziyor (Xiaomi Chrome'u 60'ta tutuyor); panel dokunurken 120, ~2,4 sn sonra 60. Xiaomi uygulamanın `preferredDisplayModeId` ve `Surface.setFrameRate` isteklerini dinlemiyor.
- Mini motor denemesi (`src/mini/` + `android-mini/`): QuickJS (`io.github.dokar3:quickjs-kt:1.0.15`, KMP, iOS da var) oyun kodunu çalıştırır, kare başına tek komut tamponu döner, Android `lockHardwareCanvas` ile SurfaceView'e çizer, Choreographer vsync + beklenen sunum zamanı. Slice: 120 Hz'de 121 kare/sn, en büyük boşluk 8,3 ms; 60 Hz'de 61 kare/sn düz 16,6 ms; 120→60 geçişinde tek kare (25 ms). Release APK 1,55 MB. **Yusuf: "inanılmaz derecede iyi ve akıyor, hiç bu kadar akarken oynamamıştım."**

## Karar
Android'de oyun çalışması mini motora geçer; giriş/oda/sohbet arayüzü Capacitor/WebView'de kalır (TWA bırakılır). Ortak katman (`src/mini/`, PROTOCOL.md) platformdan bağımsız; iOS şimdilik WKWebView'de kalır (sorun yok), ileride iOS ressamı (JavaScriptCore + CoreGraphics) ~1 hafta.

## Neden
- Kare zamanlamasını biz yönetiyoruz; WebView/Chrome/Gecko'nun 120↔60 sorunları ortadan kalkıyor.
- Boyut ~6-10 MB (Gecko 80 MB). Gerçek uygulama: Chrome bildirimi yok, oyun işareti ve Game Turbo bize uygulanır.
- Oyunlar yalnız ~40 temel canvas komutu kullanıyor; sim'ler motor bağımsız (sin/cos/exp yasak), sunucu doğrulaması bozulmaz.

## Reddedilen
- TWA: site hissi, oyun olarak tanınmıyor, Chrome'un 60'ında kalıyor.
- Capacitor/WebView'de oyun: takılma çözülemedi.
- GeckoView: 80 MB, canvas hatası, motor güncelleme yükü.
- iOS'u da şimdi taşımak: iOS'ta sorun yok, önce Android kanıtlanmalı (Yusuf onayladı).

## Açık işler
Tüm canvas API + 46 oyun + otomatik görsel karşılaştırma; oyun ekranına bağlama (giriş kaydı, canlı izleme, duraklatma, ses, titreşim, tema); Android'i TWA'dan Capacitor'a geri alma (satın alma, push, Google girişi, testçi hesapları). Tahmin ~3-4 hafta toplam.
