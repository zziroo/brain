---
type: session
project: tussle
date: 2026-10-18
status: active
tags: [tussle, oturum, uygulama-hissi, slaytlar, ios, twa]
source: oturum 2026-10-18 gece (mobil-playus) "tussle: durum özeti"
---

# Oturum: uygulama hissi (onay sayfası), tanıtım slaytları 6'ya, iOS 120 Hz, Renk kapağı dili

Yayınlandı 2026-10-18 gece (`release.sh`, rev `0ce9d26`, healthz ok, OTA 0.20261018.0, yedek `pre-0ce9d26.db`): `ab842fd` (iOS plist), `0ce9d26`. Sunucu `.env`'den `GOOGLE_CLIENT_SECRET` silindi (yedek `.env.bak-20261018`), konteyner `--force-recreate` ile yenilendi.

## Yapılanlar
- **Tarayıcı `confirm()` kalktı:** Yusuf telefonda "tussle.ziroo.net web sitesinin mesajı" kutusunu gördü ("webteymişim gibi"). `confirmSheet()` (`src/client/ui/confirm.ts`, `openSheet` üzerine) yedi çağrıyı aldı; İptal/perde/geri/Escape → hayır, odak İptal'de, tehlikeli işlem kırmızı, açıklama `aria-describedby`.
- **Slaytlar 6 oldu:** merhaba → bugünün oyunu → kapışma → sezon → parti gecesi → giriş. Düz daire + nokta göz yüzler yerine marka üçlüsünün blokları (`brandPiece`). Yusuf'un notları: gün çipi ortada garip (köşeye çıkartma oldu), bilet "3 oyun" gibi duruyordu (akan bilet rulosu + "10 oyuna kadar", `PARTY_MAX_GAMES`), çarpışma geç geliyordu (~0,75 sn'de, her dönüşte başa sarılır).
- **Renk kapağı:** "MAVİ" sabiti dilden gelir (`CoverOpts.word`, fallback BLUE). Yusuf "dil bazlı banner uğraş olmasın" dedi; tek kelime parametre olduğu için kaldı.
- **iOS 120 Hz:** Info.plist `CADisableMinimumFrameDurationOnPhone`; 8 Ekim kararının eki yazıldı. Yeni iOS build gerekir, ölçülmedi.

## Kararlar
- **Android WebView'e dönüş yine reddedildi (18 Eki):** tek kazanç Chrome'un bir kerelik "Chrome'da çalışıyor" bildirimi; 16 Eki ölçümleri (parmak kalkınca takılma, denenen her şey) duruyor. Web izleri (confirm, metin seçimi, aşağı çekince yenileme, kenar parıltısı) motor değil kod meselesi; TWA'da tek tek kapatılıyor. [[2026-10-16-android-webview-parmak-kalkinca-takilma]]
- Giriş ekranı dili sistem dilinden; değiştirilmedi.

## Kalanlar
- Uygulama hissi turunun geri kalanı (metin seçimi, bağlantı menüsü, dokunuş vurgusu, aşağı çekince yenileme, kenar parıltısı, yakınlaştırma). Sohbetteki yerel `confirmSheet` (`chat.ts:309`) ortak bileşene alınabilir.
- Telefonda görülecek: blok konturu büyük boyda kalın mı, sarı blok sarı basamakta ayrışıyor mu; slaytları görmek için `tussle.introSeen` silinmeli.
- iOS build 5: 120 Hz anahtarı + doğrulama (Pro model).

**Ek:** Yusuf telefonda slaytları beğendi; tek sorun misafir formunun klavyenin altında kalmasıydı (Chrome 108+ klavyede yalnız görsel görünümü daraltır, `scrollIntoView` formu görünür sayar). `8aa494b`: visualViewport resize'da form slaytı kaydırılır. Yayınlandı (rev `8aa494b`, OTA 0.20261018.8). Telefonda doğrulanacak.

**Ek 2 (yayın `986cc50`, OTA 0.20261018.25):** klavye düzeltmesi 2 (`2e3d4ba`: yerleşim küçülmeyince kaydıracak taşma yoktu; klavye açıkken slayta örtülen alan kadar alt boşluk + kaydırma), Oda sayfasında "Davet bağlantısını paylaş" → QR'lı davet sayfası (`bdca72c`), web izleri + sohbet bildir/engelle ortak onay + yanıt kaydırması her mesajda sağa (`986cc50`). Ders: Chrome 108+ klavyede yalnız görsel görünümü daraltır; `scrollIntoView` işe yaramaz, taşma yaratmak gerekir (ya da viewport meta `interactive-widget=resizes-content`, denenmedi). Telefonda doğrulanacak: klavye kayması, seçim menüsü yok, yenileme yok, sağa kaydırma, gece temasında gezinme çubuğu.

**Telefonda doğrulandı (Yusuf, 18 Eki gece):** klavye kayması, seçim menüsü yok, yenileme yok, davet sayfası iyi. Tema ve çubuk renkleri en sona, cila turuna bırakıldı ("her şey bitsin bir").

## Mağaza kurulumu (18 Eki gece, Chrome'da birlikte)
- **App Store Connect API anahtarı** `MFHXB9DW2D` (.p8 OneDrive yedeğinden `~/.config/tussle/`'a) doğrulandı; apps/builds/IAP uçları çalışıyor. TestFlight yüklemesi artık komut satırından yapılabilir.
- **Play:** ödeme profili (mevcut bireysel YouTube profili seçildi, satıcı profili: Ziroo, Bilgisayar Yazılımı, destek e-postası) aktif. Hizmet hesabına "Mağazadaki varlığı yönetme" izni eklendi. `scripts/play-iap.mjs` ile `tries_1/3/5` oluşturuldu ve aktif (0,49 / 0,99 / 1,49 $; yeni one-time products API, eski `inappproducts` ucu bu hesaba kapalı; Play'in eklediği bölgeler güncellemede korunur). %15 hizmet ücreti programı ve IBAN Play'de henüz yapılmadı.
- **Apple:** yasal kayıt (State: Samsun) → Paid Apps kabul → W-8BEN + yabancı statü beyanı (ikisi Active) → Garanti TRY banka hesabı (Account Number = IBAN'ın 16 haneli hesap bölümü, kısa hesap no "too short" dedi). Paid Apps **Processing**. `scripts/apple-iap.mjs` ile üç tüketilebilir ürün + en-US/tr çeviri (açıklama ≤ 55 karakter) + USD fiyat takvimi kuruldu; "Missing metadata" = inceleme ekran görüntüsü, build 5 gönderiminde elle.
- **Ders:** izin sınıflandırıcısı mağaza formu doldurma ve ürün oluşturma komutlarını engelliyor; scripti yazıp komutu Yusuf'a Run düğmesiyle koşturmak işliyor. Yasal adresde mahalle eksik, sonra "Edit Legal Entity" ile eklenecek (yeniden doğrulama tetikleyebilir).

## iOS build 5 (18 Eki sabah)
- `b54bb82`: StoreKit 2 paketi SPM ile iOS'ta (entitlement gerekmez), APNs istemci (`@capacitor/push-notifications`, dinamik import, token push/devices kind apns) + sunucu `ApnsDriver` (http2, ES256 JWT, yalnız Expired/InvalidProviderToken'da yenileme), sürüm 1.1 (5). Review: medium 1 (kapatma ağ hatası) + low 1 (403 JWT), şüpheci CONFIRMED, ikisi düzeltildi; 1908 test.
- Arşiv ve yükleme komut satırından, ASC API anahtarıyla (`296c524`: deploy/ios-export.plist, docs/CAPACITOR.md): archive ~12 dk, export `destination upload` → "Upload succeeded", App Store Connect işliyor.
- Bekleyen: sunucuya APNs anahtarı (`/opt/tussle/data/push/AuthKey_<id>.p8`, `.env` APNS_KEY_ID / APNS_TEAM_ID=F892426M52 / APNS_KEY_P8_PATH) + sunucu yayını; build 5'te Ayarlar → Bildirimler o zamana kadar "desteklemiyor" der. Sandbox satın alma ve gerçek APNs cihazda denenmedi. `aps-environment` dışa aktarmada production'a döner, ilk TestFlight'ta doğrulanmalı.

**APNs açıldı (18 Eki öğlen):** Diskort'un takım geneli APNs anahtarı `4GBN4UL88K` (`.p8` yedekten, `~/.config/tussle/`) Tussle için de geçerli; Apple'a sahte token denemesi "BadDeviceToken" döndü (kimlik geçti). Sunucuda `/opt/tussle/data/push/AuthKey_4GBN4UL88K.p8` (600, 1000:1000), `.env` APNS_KEY_P8_PATH/APNS_KEY_ID/APNS_TEAM_ID (yedek `.env.bak-apns`), konteyner `--force-recreate`; "apns key unreadable" günlüğü yok. Build 5 App Store Connect'te VALID (işlendi). Cihazda bildirim henüz denenmedi.
