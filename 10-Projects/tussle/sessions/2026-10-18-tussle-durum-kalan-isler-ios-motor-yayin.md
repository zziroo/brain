---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, oturum, bildirim, lisans, ios, mini-motor, yayin, play, testflight]
source: oturum 2026-10-18 akşam (mobil-playus, "tussle: durum ve kalan işler")
---

# Oturum: durum ve kalan işler → bildirim düzeltmesi, lisans ekranı, iOS mini motor 4a-4c, Play 1.5 + iOS build 6 yayını

## Yapılanlar (sırayla)
- **GitHub:** main 57 commit geriydi, gönderildi (gizli repo; `google-services.json`'daki Firebase istemci anahtarı APK'da zaten dağıtılıyor). Eski worktree `ecstatic-kirch` silindi.
- **Bildirim:** Xiaomi'ye sohbet bildirimi Chrome site bildirimi olarak geldi → TWA'dan kalan web push kaydı ([[2026-10-18-twa-den-native-e-geciste-chrome-web-push-kaydi-kalir]]). `b4ee6d7`: FCM kaydı aynı hesabın `twa` web push satırlarını kapatır (yayında).
- **Lisans ekranı** (`a5d8179`): Ayarlar > Hakkında > Açık kaynak lisansları (QuickJS MIT, quickjs-kt + kotlinx-coroutines Apache, Nunito OFL, Capacitor MIT, capgo MPL-2.0 kaynak bağlantısıyla, qrcode-generator). İnceleme yüksek bulgu: metinler `android/`'dan okunuyordu, Docker bağlamı `android/`'ı almaz → sunucu derlemesi kırılırdı; kopya `src/client/licenses/` + eşitlik testi.
- **iOS mini motor Faz 4a-4c** → main `0d633ef` ([[2026-10-18-tussle-ios-mini-motor-faz-4a-4b]]): JSC + CoreGraphics, replayCheck 46/46 (Mac ve simülatör içi), parite 50/52, MiniGame eklentisi, IOSurface halkası, ses, simülatörde 4 oyun uçtan uca. Üç inceleme turu, kritik/yüksek yok.
- **iOS build 6** (1.1, `745b054`): arşiv + yükleme API anahtarıyla, `npm run ios:testflight 6` → Apple beta incelemesi **onaylandı**, dış testte.
- **Android 1.5** (versionCode 9, `d031555`): iç + kapalı test, Google onayladı (konsolda Alpha 9 (1.5) yeşil). AAB'ye yan oturumun yarım kurulum kartı değişikliği girdi; uygulamada görünmüyor ([[2026-10-18-ayni-checkoutta-baska-oturum-varken-magaza-derlemesi-yarim-isi-alir]]).
- **Sunucu + OTA:** `202c2ec` (yan oturumun sıralı kurulum adımları, incelendi: orta+ yok), OTA 0.20261018.1541. Canlı pakette lisans + kilitli adım metinleri doğrulandı.
- **Kapalı test:** arkadaşlar "Öğe bulunamadı" gördü, bekleyince açıldı ([[2026-10-18-play-kapali-test-erisimi-katilimdan-sonra-gecikir]]). Yusuf linki paylaştı.

## Doğrulanmayanlar
- iPhone'da yeni motor (istatistik satırı, ses kulakla, haptik, 120 Hz); IOSurface'ın cihazda gerçekten kopyasız olduğu.
- Play 1.5'te satın alma; iOS'ta APNs ve sandbox satın alma.

Dersler: [[2026-10-18-magaza-derlemesi-ortam-tuzaklari-java-home-zsh]], [[2026-10-15-izin-siniflandirici-ref-yazma-ve-deploy]] (18 Eki eki).
