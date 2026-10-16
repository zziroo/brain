---
type: resource
project: tussle
date: 2026-10-17
status: active
tags: [tussle, android, twa, gecis, magaza, hesap]
source: oturum 2026-10-17 gece (mobil-playus) TWA deneme sürümü; Yusuf'un Xiaomi karşılaştırması
---

# Android TWA geçiş planı (karar Yusuf'ta)

Deneme sonucu: **TWA'da Slice parmak kalkıkken akıcı, Capacitor uygulamasındaki takılma yok** (Yusuf, Xiaomi 17 Pro, Chrome 155, 2026-10-17 gece). Öneri: [[2026-10-17-android-twa-onerisi]]. Deneme yapısı repoda `android-twa/` (oturum [[sessions/2026-10-17-tussle-twa-deneme]]).

Geçiş ayrı bir iş; aşağıdaki sırayla, her adım ayrı onay.

## 1. Site tarafı (Capacitor'dan bağımsız, önce yayınlanabilir)
- **Yayında (`23ba339`, 2026-10-17, yedek `pre-23ba339.db`; 050c924'ün web kodu da girdi, web'de etkisiz):** `/.well-known/assetlinks.json` 200, `application/json`, `no-cache`; Google Digital Asset Links API görüyor, telefonda `pm get-app-links` → verified; TWA adres çubuksuz, tam ekran açıldı.
- `/.well-known/assetlinks.json` (`src/client/public/.well-known/`): deneme için `net.ziroo.tussle.twa` + Mac debug anahtarı. Geçişte `net.ziroo.tussle` + **Play App Signing anahtarının SHA-256'sı** (Console → Uygulama bütünlüğü) + yükleme anahtarının SHA-256'sı (`android/keystore.properties`'teki anahtar; elle kurulan AAB/APK için). Debug anahtarı girdisi geçişte çıkarılır. Doğrulanmazsa TWA adres çubuklu Custom Tab olur (deneme ekran görüntüsünde böyle).
- `sw.js` bu yola dokunmuyor (yalnız navigasyon, `/assets`, `/icons`, `/fonts`, manifest yakalanıyor). Değişiklik gerekmedi.

## 2. Web tarafı: `isNative` yolları TWA'da web yolu olur
TWA'da `window.Capacitor` yok, `isNative` false. Etkisi:
| Yer | Capacitor | TWA (web yolu) | Yapılacak |
|---|---|---|---|
| `native.ts` titreşim | `@capacitor/haptics` | `navigator.vibrate` (Android Chrome'da var) | yok |
| `native.ts` durum çubuğu | `StatusBar.setStyle` | `theme-color` meta (`theme-apply.ts` temaya göre zaten güncelliyor); TWA `STATUS_BAR_COLOR` yalnız açılış rengi | gece temasında Chrome'un çubuğu izliyor mu, telefonda bak |
| `native.ts` geri tuşu + `back-intercept.ts` | `App backButton` → önce interceptor (tanıtım slaytı), sonra hash geri | Chrome geri = `history.back()`; interceptor hiç çağrılmaz | tanıtım slaytları `history.pushState` ile her slayt bir geçmiş adımı olsun ya da `popstate`'te interceptor'a sor |
| `native.ts` ekran yenileme eklentisi (`050c924`) | `DisplayRatePlugin` | yok; Chrome zaten akıcı | yok (iOS'ta zaten çalışmıyor) |
| `native.ts` OTA | gömülü paket + `/bundles` | site neyse o | Android için OTA biter; iOS sürer |
| `pwa/register.ts` | SW kayıt yok | SW kaydolur (çevrimdışı açılış) | yok |
| `auth-providers.ts` | sağlayıcı düğmeleri gizli | Google/Apple web SDK'sı origin `tussle.ziroo.net` ile çalışır | kimlik ayarları açılınca TWA'da denenmeli |
| `platformName()` / rapor / geri bildirim | `android` + OTA sürümü | `web` | TWA'yı ayırmak için ilk açılışta `document.referrer` `android-app://net.ziroo.tussle` ise `sessionStorage`'a işaret; raporlar `android-twa` desin |
| `platform.ts` `API_BASE` | gömülü `__PUBLIC_ORIGIN__` | aynı origin | yok |
| `ALLOWED_ORIGINS` (sunucu) | `https://localhost` gerekli | site origin'i zaten var | iOS için kalır |

**Titreşim farkı (2026-10-17, `dumpsys vibrator_manager` ile görüldü):** Android oyunun titreşimini `usage: TOUCH` sayıyor; telefonda sistemin "Dokunsal geri bildirim" ayarı kapalıysa (`TOUCH = OFF`, Yusuf'un Xiaomi'sinde öyle) hem Capacitor (`@capacitor/haptics`) hem Chrome (`navigator.vibrate`) titreşimleri `ignored_for_settings` ile sessizce yok sayılıyor. Yusuf'un "titreşim hiç çalışmadı" bildiriminin sebebi bu, kod hatası değil. Capacitor'da kendi eklentiyle `VibrationAttributes` `USAGE_MEDIA` gönderip bu ayardan bağımsız yapılabilir (Tussle'ın Titreşim anahtarı yine kapatır); **TWA'da yapılamaz** (titreşimi Chrome `TOUCH` olarak gönderir). Ders: [[2026-10-17-titresim-sistem-dokunsal-geri-bildirim-kapaliysa-yok]]. Karar: [[2026-10-17-oyun-titresimi-media-arayuz-touch]] (oyun efekti MEDIA, arayüz TOUCH; TWA'da yapılamaz, bedel olarak kabul).

## 3. Hesap taşıma (asıl risk)
Capacitor Android hesabı WebView `localStorage`'ında (origin `https://localhost`, `tussle.secret` + `tussle.token`, `src/client/net.ts`). TWA Chrome'un `tussle.ziroo.net` deposunu kullanır; aynı paketle güncellenince misafir hesap görünmez olur. Cihaz sırrı tek başına yeter: `auth/guest` bilinen cihazı aynı hesaba bağlar.

Seçenekler:
- **(b) önerilen, kullanıcıya görünmez:** TWA'nın `LauncherActivity`'si alt sınıfla genişletilir; ilk açılışta (tercih bayrağı yoksa) gizli bir `WebView` `https://localhost/` adresini `shouldInterceptRequest` ile boş bir sayfayla açar (aynı uygulama veri dizini → aynı WebView profili → aynı `localStorage`), `tussle.secret`'ı okur, TWA'yı `https://tussle.ziroo.net/#devral=<sır>` ile başlatır. İstemci parçayı okur, Chrome deposunda sır yoksa yazar, `history.replaceState` ile parçayı siler. Parça sunucuya gitmez. Çakışma kuralı: Chrome'da zaten bir sır varsa (kullanıcı web'de de oynamış) üzerine yazma, ikisinden birini seçtir ya da eskiyi koru; karar Yusuf'un. Okunduktan sonra eski WebView verisi silinir.
- (a) Son Capacitor sürümünde "hesabı taşı" kodu/bağlantısı: kullanıcı adımı ister, kapalı testte gereksiz zahmet.
- (c) Kabul et: kapalı testte ~12 kişi; misafir hesaplar kaybolur. En ucuzu, ama sezon puanları gider.
- Not: Google ile bağlı hesaplar TWA'da Google girişiyle geri gelir (giriş açıldığında).

## 4. Play
- Aynı paket `net.ziroo.tussle`, **versionCode 5+** (4 commit'te ama AAB çıkmadı; atlanabilir), aynı yükleme anahtarı, yeni AAB. `android/` yerine `android-twa/` derlenir (paket adı, imza ayarı, `keystore.properties` taşınır).
- `minSdk` 24 kalabilir. Chrome olmayan cihaz için `FALLBACK_STRATEGY` (Custom Tab ya da WebView yedeği; WebView yedeği yine takılır ama açılır).
- Kapalı test 14 gün sayacı test kullanıcılarının katılım süresine bağlı görünüyor, sürüm değişikliği sıfırlamamalı; yüklemeden önce Console'da teyit et.
- Mağaza: TWA Play politikalarına uygun (Google'ın kendi önerdiği yol). Uygulama boyutu ~5 MB'a düşer.
- Açılış ekranı: denemede yok (şeffaf tema, Chrome açılana kadar kısa boşluk). Geçişte `SPLASH_IMAGE_DRAWABLE` + FileProvider ile sayfa renginde ikonlu açılış.

## 5. iOS
Değişmez: Capacitor + WKWebView (60'ta düzenli). OTA iOS için sürer.

## Açık sorular (Yusuf)
- Geçiş evet/hayır, ne zaman.
- Hesap taşıma (b) mi (c) mi; (b)'de çakışma kuralı.
- Tam ekran (`immersive`, durum ve gezinme çubuğu gizli) mi, durum çubuğu görünür mü. Denemede `immersive` çalışıyor ama üstte kamera çentiği hizasında **siyah şerit** kalıyor (Capacitor'da durum çubuğu sayfa renginde, içerik altından geçiyor). Seçenek: `DISPLAY_MODE` varsayılan + `STATUS_BAR_COLOR` sayfa rengi (çubuk görünür, şerit yok) ya da immersive'de çentiğe taşma (`DISPLAY_OVERRIDE` / kitaplık sürümüne bak).
