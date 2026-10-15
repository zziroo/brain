---
type: lesson
project: tussle
date: 2026-10-13
status: active
tags: [tussle, capacitor, ios, simulator, ajan]
source: oturum 2026-10-13 üçüncü (mobil-playus: şeker kalıntıları, Capacitor iOS)
---

# Ders: Capacitor iOS kurulumunda öğrenilenler

- Gömülü web kabuğu `capacitor://localhost` origin'inden gelir; sunucuda yalnız origin kontrolü yetmez, **CORS + OPTIONS ön kontrolü** gerekir (JSON gövde ve Authorization başlığı preflight tetikler). Brief'te "kod değişikliği gerekmez" varsayımı yanlıştı; ajan düzeltti.
- `src/client/env.ts` adı `env.d.ts` ile çakışıp TypeScript global tiplerini düşürüyor; dikiş dosyası `platform.ts` oldu.
- iOS simülatör aracının `text` (yapıştırma) komutu WKWebView girdi alanlarına ulaşmıyor; uzun basıp Paste de işlemedi. Form gerektiren akışlar için ajan geçici bir test betiğini üretilen `ios/App/App/public/index.html`'e koydu (gitignore'da, build ile silinir). Daha iyi yol: Safari Web Inspector ya da yerel sunucuda seed.
- Yerel API'de `tsx watch` 8087'de başka sohbetten açık kalabiliyor; simülatör testi için ayrı `tussle-api-app` (8088, kendi DATA_DIR'i, ALLOWED_ORIGINS'li) konfigürasyonu eklendi.
- Yan bulgu: giriş ekranı kapak şeridi `gameIds` tamamını çiziyordu (51 kapak, ~2.800 px); CSS 4 çocuğa göreydi. Oyun sayısı artarken "ilk 4" varsayımı kodda yoktu.
- Otomatik mod sınıflandırıcısı `deploy/release.sh`'i "Production Deploy" diye engelliyor; Yusuf sohbette izin verince ikinci deneme geçti. Terminal paneli de aynı sınıflandırmaya giriyor.
- Simülatörde ilk kare siyah gelip sonra krem sayfa geliyor; açılış ekranı gerçek cihazda bakılmalı.

## Ek: Android ve telefon turu (aynı gün)
- Capacitor Android `env(safe-area-inset-*)` vermez; `--safe-area-inset-*` değişkeni basar. CSS'te `var(--x, env(x))` kalıbı iki platformu da tutar. Emülatörde "24px görünüyor" demek CSS'in onu kullandığı anlamına gelmez; gerçek telefonda logo saatin altına girdi.
- "Üst üste biniyor" şikayeti pay hatası değil, kenardan kenara çizimde kaydırılan içeriğin saydam durum çubuğu altına kaymasıydı. Önce DevTools'tan ölç (`adb forward tcp:9333 localabstract:webview_devtools_remote_<pid>` + `ws` ile `Runtime.evaluate`), sonra düzelt.
- Xiaomi'de `adb shell screencap` çoklu ekran yüzünden `-d <displayId>` ister (`dumpsys SurfaceFlinger --display-id`); `adb shell input` ise "USB hata ayıklama (Güvenlik ayarları)" izni olmadan reddediliyor. Dokunuşu kullanıcı yapar, görüntüyü biz alırız.
- Android Studio'nun JDK'sı Java 25; Capacitor'ın ürettiği Gradle 8.14 bunu desteklemiyor, wrapper 9.1'e çekildi (AGP 8.13 ile uyumlu).
- Play Console kaydında "Bir kuruluş" ekranı kolayca seçiliyor; bireysel hesap için bir önceki adımda "Kendim". Apple'da mağaza adı benzersiz, "Tussle" alınmıştı; 30 karakterlik alt başlıklı ad kurtardı.
- App Store Connect yeni arayüzde External Testing, **ilk iç grup açılmadan görünmüyor** (Test Information/anlaşma/DSA ile ilgisi yok). Bir iç grup aç, dış bölüm belirir. Destek talebine gerek yoktu; Yusuf Apple yardım sayfasından buldu.
- Telefon kare istatistiği: `adb shell dumpsys gfxinfo net.ziroo.tussle` (9.510 karede %0,12 takılma, p90 8 ms). Canlı log: `adb logcat -d | grep -E "chromium|Capacitor/Console"`.
