---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, android, mini-motor, devir]
source: oturum 2026-10-18 "tussle: Android TWA yerine Capacitor + oyun tanınması"
---

# Devir notu: mini motor fazları (haftalık limit sıfırlanınca başlat)

Karar: [[2026-10-18-android-mini-oyun-motoru]]. Yusuf "evet başla, iOS'u da ayarlayabiliriz" dedi (18 Eki). Haftalık limit %82 (Fable %94) olduğu için fazlar 19 Eki 04:00 (TR) sıfırlanmasından sonra başlayacak.

## Repo durumu (18 Eki)
- Dal `android-mini-motor` (main `6e62748` üstü), Faz 1 commit'leri aşağıda; ilk hâl: `src/mini/` (recorder, cmd, shim, input, runner, theme-light, entry-kes, PROTOCOL.md), `android-mini/` (Kotlin: MainActivity, Engine, Painter; quickjs-kt 1.0.15; Nunito TTF), `package.json` `build:mini`, `build:mini-apk`. Mevcut koda dokunulmadı. Deneme uygulaması (`net.ziroo.tussle.mini`) telefonda.
- Gecko denemesi silindi (klasör + telefondaki uygulama).

## Faz 1 — Motoru tamamla (dal `android-mini-motor`, bu klasör)
Bütün canvas API'si (liste kararda), 46 oyunun hepsi tek pakette, otomatik görsel karşılaştırma (aynı seed + betik girişle Chrome kareleri vs Android ressamının bitmap'i, piksel farkı eşiği), ses: 7 prosedürel ses (src/client/audio/engine.ts) Android'de (AudioTrack/Oboe ya da önceden üretilmiş PCM), gece/gündüz teması (theme.css token'ları), lisans kontrolü (quickjs-kt, QuickJS, Nunito). Spike kısıtları PROTOCOL.md'de (yol çizilirken dönüşüm değişimi). İlk iş: spike'ı inceleme ajanından geçirip dalda commit.

### Faz 1 sonucu (18 Eki öğleden sonra, bitti)
Dal `android-mini-motor`: `fb93ec1` (spike temeli), `4e3dc1d` (46 oyun + tam API + ses/titreşim + gece), `05e08a9` (görsel karşılaştırma + ressam düzeltmeleri). Main'e birleştirilmedi, push yok. Her commit inceleme ajanından geçti (kritik/yüksek yok; orta bulgular düzeltildi). `npm test` 2022 yeşil, typecheck `src/mini` dahil.
- **Paket:** `src/mini/entry.ts` → `dist/mini/games.js` (891 KB, gzip ~270 KB), 46 oyun; QuickJS'te yükleme ~145 ms (sürüm), oyun başlatma 4–26 ms. Sürüm APK 1,78 MB. `__mini.games()`, `init({width,height,dpr,safe,game,variant,seed,params,theme:'light'|'dark'})` web `game-screen` gibi (`variantOf` + `resolveParams`, verilen seed her koşuda sabit). Oyun değişiminde yeni runner + yeni Painter.
- **API:** bütün canvas kullanımı kapsandı; kaydedici sıkı modda desteklenmeyen her şeyi atar (testler), üretimde bir kez loglar (PROTOCOL.md §3.5). Yeni operasyonlar STR_FREE 7, GRAD_FREE 8, PATH_XFORM 49 (yol kurulurken dönüşüm değişimi artık canvas anlamında; 46 oyunun hiçbiri bunu yapmıyor, bicak'ta 6 tekil ölçek düşmesi = Chrome davranışı).
- **Görsel karşılaştırma:** `npm run parity -- --serial <cihaz> [--build]` (PROTOCOL.md §7). Emülatör ve telefon: 50/52 geçer, ortanca %0,04; renk (açık+koyu) ✓/✗ Nunito'da yok → platform yedek glifi, bilinen fark. En büyük düzeltme: textBaseline top/middle OS/2 typo metrikleriyle (eskiden 0,09 em aşağıdaydı).
- **Ses:** `Sfx.kt` engine.ts'nin 7 sesini ses başına ön-üretir (Chromium kompresör eğrisi dahil), tek düşük gecikmeli AudioTrack (48 kHz, ~6 ms tampon), render iş parçacığından kilitsiz. Kulakla henüz denenmedi.
- **Titreşim:** `View.performHapticFeedback`, Faz 3 tablosu (<15 CLOCK_TICK, <40 KEYBOARD_TAP, aksi LONG_PRESS). Oyun API'si yalnız tek ms verir.
- **Lisans:** QuickJS 2026-06-04 MIT, quickjs-kt 1.0.15 Apache-2.0, Nunito OFL 1.1 (PROTOCOL.md §6). Ürün uygulaması lisans ekranında QuickJS + quickjs-kt metinlerini göstermeli.

### Faz 2'nin bilmesi gerekenler
- Giriş noktası `src/mini/entry.ts` `__mini`; Engine.kt intent ekstraları (`game/variant/seed/theme/params`) ve `Engine.start(Game(...))` eklentiye köprü için hazır. Sonuç dönüşü, giriş kaydı (encodeInputLog), inp-stream ve duraklatma henüz yok; runner şu an "dokun başla / skor / tekrar" döngüsünü kendisi çiziyor (Faz 2'de hazırlık kartı ve sonuç WebView'e kalacağı için runner'ın bu kabuğu kapatılmalı).
- `src/games/shell/draw.ts` modül düzeyinde ölçüm bağlamı tutuyor; oyun değişiminde eski kaydediciye bağlı kalır (yazımlar artık yutuluyor, sızıntı yok ama tek eski kaydedici bellekte kalır).
- Ses/titreşim ayarları (`sfx.enabled`, `haptics.enabled`) ana uygulamadan eklentiyle geçmeli.
- Bilinen küçük pürüz: oyun yeniden başlarken (yeni koşu bake'leri) tek karelik 13 ms boyama ve bir kez "step 24.9 → 0 ms" görüldü; Faz 2'de hazırlık aşamasında bake edilirse kaybolur.
- Sürüm imzası hâlâ debug anahtarı (yalnız deneme); paket adı `net.ziroo.tussle.mini`.


## Faz 3 — Android'i TWA'dan Capacitor'a geri al (ayrı worktree, main'den)
`android/` (Capacitor) yeniden ana Android uygulaması: Play Billing (`@capgo/native-purchases`, sunucu "iap play" yolu), push FCM (`@capacitor/push-notifications`, sunucu sürücüsü), Google girişi (`@capgo/capacitor-social-login`, iOS'ta çalışıyor), uygulama içinde web kapı sayfası açılmasın, `appCategory="game"`, kenar boşlukları, geri tuşu, açılış; TWA'ya özgü kod yolları (Digital Goods API, assetlinks) kapatılmadan korunur (geri dönüş). Testçi hesapları: TWA'da Chrome deposunda; Google girişliler sorun değil, misafirler kaybolur (3 testçi) — taşıma kodu gerekmez, duyuru yeter. versionCode 7, `npm run play:upload` + `--promote` kapalı teste. 16 Ekim WebView dersleri: [[2026-10-16-android-webview-parmak-kalkinca-takilma]] (Capacitor eklenti vekili `then` tuzağı).

### Faz 3 sonucu (18 Eki akşam, dal `claude/android-capacitor-donus-a533c0`, commit `8f25f61` + `368e5cf` (geri tuşu = ekrandaki geri düğmesi, sihirbaz/davet geçişi, titreşim sistem ayarını izler; Yusuf telefonda onayladı), main'e birleşmedi)
- **Kod:** Play Billing (`@capgo/native-purchases`; isConsumable + autoAcknowledgePurchases false, `configure({autoFinishTransactions:false})` yalnız Android'de çalışma anında; sunucu tüketir, onaylanmamışlar `getUnfinishedTransactions` ile yeniden gider), FCM (sunucu `FcmDriver`, `FCM_SERVICE_ACCOUNT`; istemci yalnız `push/config` `fcm:true` iken kaydolur, yoksa Firebase'siz yapıda `register()` çöker), Android Google girişi (web istemci kimliği, MainActivity yetki sonucunu eklentiye iletir; Apple Android'de gizli), SystemBars + `barIcons`, geri zinciri `nativeBackAction`, klavye `keyboardCovers` + `adjustResize`, `PageColorPlugin` (ilk kare tema rengi, açılış teması), `VibePlugin` (oyun MEDIA / arayüz TOUCH), `appCategory="game"`, versionCode 7 / 1.3. `build:aab` = Capacitor; TWA `build:aab:twa` → `dist/tussle-twa-release.aab`. 1.934 test.
- **İnceleme bulgusu (yüksek, düzeltildi):** `push.ts` bildirim eklentisini kutusuz döndürüyordu (vekil `then` tuzağı) → Android'de bildirim hiç başlamazdı; **iOS build 5'in APNs yolu da aynı yüzden asılı kalıyor olmalı** (cihazda denenmemişti). Düzeltme web paketinde: iOS'a OTA ile gider. Düşükler (kabul): IapOwned bekleyen ödemede yanlış mesaj; bekleyen ödeme yalnız sonraki açılışta yeniden gönderilir; yanlış Firebase anahtarı ilk gönderimde cihazları 'gone' yapar (sonraki açılışta düzelir).
- **Konsol (Chrome'dan, Yusuf onayıyla):** Firebase GCP projesi `civil-epigram-511911-e7`'ye ("tussle", Google girişi + Play hizmet hesabı da burada) eklendi, Analytics kapalı. Android uygulamaları `net.ziroo.tussle` (SHA-1 Play `8D:61:…:5F:DB`, yükleme `13:05:…:57:79`) ve `net.ziroo.tussle.dev` (debug `A9:C8:…:B7:9F`); `android/app/google-services.json` repoda. Google Auth'ta üç Android OAuth istemcisi. FCM hizmet hesabı anahtarı `~/.config/tussle/fcm-service-account.json` (sunucuya henüz konmadı). iOS Firebase'e geçirilmedi (APNs doğrudan kalır, Yusuf'a önerildi).
- **Yayın (18 Eki ~16:00, Yusuf onayı):** main `368e5cf` + betik düzeltmesi, `release.sh` (yedek `pre-368e5cf.db`, OTA 0.20261018.1252; bildirim kutusu düzeltmesi iOS'a da OTA ile gitti), FCM anahtarı `/opt/tussle/data/push/fcm-sa.json` + `.env` `FCM_SERVICE_ACCOUNT` (sunucu hatasız okudu). Play: versionCode 7 / 1.3 iç test + kapalı test (alpha) `completed`. GitHub'a push yapılmadı (origin/main geride). `play:upload` için `PLAY_SERVICE_ACCOUNT_JSON=~/.config/tussle/play-service-account.json` gerekiyor. Bekleyen: Play'den kurulan 1.3'te satın alma ve FCM bildirimi denemesi.
- **Kalan (eski plan, yukarıdaki yayınla yapıldı):** main'e birleştirme + `release.sh` yayını (FCM sürücüsü + push düzeltmesi + OTA), aynı anda anahtarı `/opt/tussle/data/push/fcm-sa.json` (600, sahibi 1000) + `.env` `FCM_SERVICE_ACCOUNT=/data/push/fcm-sa.json` + compose `--force-recreate`; sonra `npm run play:upload` (dist/tussle-release.aab, upload anahtarıyla imzalı doğrulandı) + `--promote`. Satın alma ve FCM yalnız Play'den kurulan 1.3'te denenebilir (`.dev` Play ürünlerini görmez). `otaMinNative` iki platforma ortak: 6/7'ye çıkarmak iOS build 5'i keser.
- **Telefon:** `.dev` 1.3 kurulu; ajan çalışırken telefon kilitliydi, görsel/dokunma kontrolleri Yusuf'ta (liste oturumda). Misafir testçiler (3) TWA'daki misafir hesabını kaybeder; duyuru yeter.
- **Faz 2 için:** oyun koşusu yerel motora geçerken MainActivity'de artık `PageColorPlugin`, `VibePlugin`, `DisplayRatePlugin` ve social-login yönlendirmesi var; motor eklentisi aynı `registerPlugin` kalıbıyla eklenir ve **kutuda** tutulur. Titreşim türü (`haptic(ms,'game')`) motor tarafına da taşınmalı. Ekran rengi/çubuklar `theme-apply.ts` bindirme yığınından gelir; yerel oyun yüzeyi açılırken oyun ekranı bindirmesi aynen kalmalı.

### Titreşim eşlemesi (Android, ortak: Faz 1 motoru da bunu kullanır; 18 Eki, Yusuf: "telefonun kendi ayarını izlesin")
Android'de titreşim `View.performHapticFeedback(HapticFeedbackConstants.X)` ile gider: sistemin dokunsal geri bildirim anahtarı ve şiddeti geçerli, sistem kapalıysa hiç titremez (önceki "oyun MEDIA" kararı geri alındı). Uygulamadaki Titreşim anahtarı ek kapatma. Web/TWA `navigator.vibrate`, iOS `@capacitor/haptics` aynen. Kod: `native.ts` `hapticStrength()`, `VibePlugin.java` `feedback({strength})`.

| Web `haptic(...)` | Güç | Sabit | Yedek |
|---|---|---|---|
| tek değer < 15 ms (4–14) | light | CLOCK_TICK | gerekmez (API 21) |
| tek değer 15–39 ms | medium | KEYBOARD_TAP | gerekmez |
| tek değer ≥ 40 ms (çarpma, düşme, yanlış, süre bitti) | heavy | LONG_PRESS | gerekmez |
| birden çok öğeli desen ([20,40,20] yazı-tura kazandı, [18,70,28] kürsü) | success | CONFIRM (API 30+) | API < 30: VIRTUAL_KEY |
| tek öğeli dizi [n] | tek n gibi | | |
| toplam 0 | hiçbir şey | | |

## Faz 2 — Oyun ekranına bağlama (Faz 1 + 3 bitince)
game-screen "Başla"dan sonra koşuyu yerel katmana devreder (Capacitor eklentisi): seed/params/tema/viewport gider; giriş kaydı (encodeInputLog), inp-stream parçaları (canlı izleme), duraklatma/görünürlük, sonuç dönüşü. Hazırlık kartı, geri sayım ve sonuç kartı WebView'de kalır. İzleyici görünümü (spectator.ts) ve parti sahnesi şimdilik WebView'de.

## Faz 4 — iOS (Faz 2 oturunca)
Yusuf istedi. JavaScriptCore + CoreGraphics ressamı, PROTOCOL.md'den. ~1 hafta. iOS bugün WKWebView'de sorunsuz; amaç iki platformda aynı motor.
