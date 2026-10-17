---
type: resource
project: tussle
date: 2026-10-17
status: active
tags: [tussle, magaza, satin-alma, bildirim, reklam, twa, ios, play-billing, apns]
source: oturum 2026-10-17 (mobil-playus) web araştırma ajanı (sonnet), resmi sayfalar + npm 2026-10-17
---

# Mağaza gelir ve bildirim araştırması (TWA + Capacitor iOS)

Soru: TWA'da satın alma, bildirim ve reklam yapılabilir mi; yapılamıyorsa Capacitor WebView'e dönülür mü?
**Sonuç: TWA kalıyor.** Satın alma ve bildirim TWA'da var; reklam zaten istenmiyor. WebView'e dönüş takılmayı geri getirir ([[2026-10-16-android-webview-parmak-kalkinca-takilma]]).

## Satın alma
- **Android TWA:** Chrome **Digital Goods API** (Chrome 101+, yalnız Chrome/Brave/Vivaldi TWA'da; WebView'de yok). Android: `com.google.androidbrowserhelper:billing` **1.2.0** (Play Billing 8.3.0; Play'in 31 Ağu 2026 "BL 8+" şartını karşılar, BL 8 → 31 Ağu 2027'ye kadar kabul). Manifest: `PaymentActivity` (action `org.chromium.intent.action.PAY`, meta `org.chromium.default_payment_method_name`=`https://play.google.com/billing`), `PaymentService` (`IS_READY_TO_PAY`), özel `DelegationService` içinde `registerExtraCommandHandler(new DigitalGoodsRequestHandler(ctx))`. Örnek: repo `demos/twa-play-billing`.
- Web: `getDigitalGoodsService('https://play.google.com/billing')` → `getDetails`, `PaymentRequest` (`data:{sku}`), `resp.details.token` → sunucu doğrular → `complete('success')`; açılışta `listPurchases()` ile geri yükle. API kullanıcıyı bilmez: token bizim hesaba sunucuda bağlanır.
- Sunucu: `purchases.productsv2.getproductpurchasev2` (ya da `products.get`), sonra `acknowledge`/`consume` (3 günde onaylanmayan iade edilir). `purchaseToken` UNIQUE. Servis hesabı: Play Console → API access, scope `androidpublisher`. İade için RTDN (Pub/Sub) ya da `voidedpurchases.list`.
- Console şartı: ödeme (merchant) profili + billing kütüphaneli AAB herhangi bir kanalda yüklü olmadan ürün açılamaz.
- **iOS Capacitor 8:** `@capgo/native-purchases` 8.9.x (StoreKit 2, JWS, `restorePurchases`, `appAccountToken`) ya da `capacitor-plugin-cdv-purchase` 13.x (en olgun). RevenueCat (`@revenuecat/purchases-capacitor` 13.7) Android TWA'da kullanılamadığı için faydası düşüyor. Sunucu: `@apple/app-store-server-library` 3.1 → `SignedDataVerifier` (JWS çevrimdışı doğrulama) + Server Notifications V2 (iade). `verifyReceipt` kullanımdan kalktı. Şart: **Paid Apps sözleşmesi + banka/vergi** (sandbox için bile), ürünler App Store Connect'te, 3.1.1 (geri yükle düğmesi görünür olsun), 3.1.1(a) uygulamadan web ödemeye yönlendirme yok (ABD dışı).
- Her iki mağaza: IARC "dijital satın alma" sorusu, "Uygulama içi satın alma" etiketi, gizlilik/veri güvenliği (satın alma geçmişi). AB için ek bir şey yok. Rastgele ücretli öğe (loot box) yok.

## Bildirim
- **Android TWA:** Web Push (SW + PushManager + VAPID, Firebase gerekmez). **Notification delegation:** Chrome bildirimi doğrulanmış uygulamanın `TrustedWebActivityService`'ine devreder; bildirim Tussle'dan gelir, uygulamanın izin/kanal ayarlarına bağlıdır. android-browser-helper `DelegationService` (manifest: exported, intent-filter `android.support.customtabs.trusted.TRUSTED_WEB_ACTIVITY_SERVICE`, `SMALL_ICON` meta). 2.7.3/2.7.4 yüksek öncelik ve kanal override ekledi. Yalnız Chrome/Brave/Vivaldi. **Bilinmez:** Android 13 `POST_NOTIFICATIONS` istemi TWA'da nasıl tetikleniyor; cihazda denenecek.
- **iOS Capacitor:** WKWebView'de Web Push yok; `@capacitor/push-notifications` 8.1.x (APNs token, Firebase gerekmez) + Xcode Push capability + AppDelegate. Sunucu: APNs HTTP/2 + `.p8` anahtar (`@parse/node-apn` 8.1 ya da `apns2` 12). FCM gereksiz.
- Sunucu tasarımı: `push_devices` (kind webpush|apns, endpoint UNIQUE, 404/410 → disabled), `push_prefs` (oda override > genel > varsayılan), payload yapısal (SW kendi dilinde yazar), tag/collapse-id ile birleştir, odada etkin kullanıcıya gönderme; izin bağlamsal (ilk oda), açılışta değil.

## Reklam (yapılmıyor)
- TWA'da AdMob çalışmaz; AdSense H5 Games Ads TWA/Play için belirsiz (Google politikası web reklamını uygulamanın parçası sayar), erişimi kapalı program. iOS: `@capacitor-community/admob` 8.2 var ama ATT istemi + App Privacy "tracking" + Play "reklam içerir" + veri güvenliği değişir.

## Play Oyun Hizmetleri (atlandı)
- PGS v2 yerel SDK ister; TWA'da JS istemcisi yok. Console "Play Oyun Hizmetleri'ni ekleyin" bildirimi tanıtım, zorunlu değil. Başarım/lider tablosu yoksa kazanımı az.

## Doğrulanamayanlar
Android 13 izin istemi (TWA); AdSense-TWA politikası; `products.get` için planlı kaldırma; 2026 AB (EEA) oyun şartları.
