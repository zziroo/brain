---
type: session
project: tussle
date: 2026-10-18
status: done
tags: [tussle, android, mini-motor, faz-2, yayin]
source: oturum 2026-10-18 "tussle: mini motor faz 2 (oyun ekranı → yerel motor)" (Faz 3 oturumunun başlattığı yan oturum)
---

# Oturum: mini motor Faz 2: Android'de oyun koşusu yerel motorda, 1.4 yayında

Ayrıntılı sonuç ve Faz 4 (iOS) için gerekenler: [[2026-10-18-mini-motor-faz-devir-notu]]. Karar: [[2026-10-18-yerel-oyun-yuzeyi-webview-arkasinda-arayuz-dom-da]].

## Ne yapıldı
- main (`2b99a2e`, Faz 3) dala birleşti. Ortak sözleşme yazıldı, üç opus ajanı paralel çalıştı: `src/mini` ev sahibi koşu modu ve ortak giriş çekirdeği, oyun ekranı devri ve geliştirici bayrağı, Android `MiniGame` eklentisi. Commit `3c42cb5`.
- Telefonda android-mini replayCheck: 46/46 oyunda QuickJS kaydı Node/V8 tekrarıyla aynı skoru verdi.
- Telefonda otomatik deneme (adb + WebView CDP): Slice kart arkası ve sonuç; Jetpack arka plan → duraklatma kartı → devam; oyun ortasında X; WebView bayrağı. Bulgular düzeltildi: yerel koşuda 120 Hz tutulmuyordu (`holdLoopActivity` eklendi, sonra Bambu 121 kare/sn); dev kurulumu eski OTA'yı tutuyordu ([[2026-10-18-ayni-versioncode-ile-kurulum-eski-ota-paketini-tutar]]).
- İnceleme + şüpheci: 1 yüksek ([[2026-10-18-capacitor-android-webview-zamanlayicilari-arka-planda-calisir]]) ve 1 orta (motor hatasında ayrılmış hakkın kaybı) düzeltildi. Düşük bulgular da düzeltildi.
- main `940b04f` (oda ayarları ızgarası) tekrar birleşti (`cf75853`). Yusuf telefonda denedi, sorun görmedi: "komple her yerde" yayın onayı verdi.
- Yayın: main `e61359e`, `release.sh` (sunucu `cf75853`, OTA 0.20261018.1346), Play 1.4 / versionCode 8 iç test + kapalı test. GitHub'a push yok.

## Doğrulanmayanlar
- Play'den kurulan 1.4'te yerel motor (yalnız `.dev` denendi), OTA 1346'ya geçtikten sonra motorun OTA dizininden yüklenmesi.
- Sayılan hakla oda skoru, ikinci cihazdan canlı izleme, kulakla ses (Yusuf genel denemede sorun görmedi, madde madde rapor gelmedi).
- API < 30 telefonda WebView yolu, sayfa yenilenmesi ve çağrı zaman aşımı yolları (yalnız kodla ve testle).
