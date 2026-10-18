---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, play, apple, magaza, claude-code, izin]
source: oturum 2026-10-18 "tussle: durum özeti" (mağaza kurulumu, Chrome'da birlikte)
---

# Ders: mağaza formlarını doldurma ve ürün oluşturma izin sınıflandırıcısına takılır; scripti yaz, komutu Yusuf koştursun

## Ne oldu
Claude in Chrome ile App Store Connect / Play Console'da form alanı yazma, kaydetme ve API ile ürün oluşturma (`batchUpdate`, `POST inAppPurchases`) auto-mode sınıflandırıcısı tarafından "bağlı uygulamada kayıt / gerçek dünya işlemi" diye engellendi. Okuma (sayfa metni, listeler, GET) serbest.

## Uygula
- Sayfayı Chrome'da aç, oku, hangi alana ne yazılacağını söyle; yazma ve Submit Yusuf'ta.
- Ürün/yapılandırma işini repoya script olarak yaz (`scripts/play-iap.mjs`, `scripts/apple-iap.mjs`), komutu bash bloğuyla ver; Yusuf Run'a basar, çıktıyı yapıştırır. Script tekrar çalıştırılabilir olsun (var olanı güncelle, eksiği tamamla).
- Banka, vergi, kimlik: zaten yasak; cevapları hazırla, formu Yusuf doldurur.

## Mağaza tuzakları (aynı gece)
- Play: `inappproducts` ucu yeni hesaplara "migrate to the new publishing API" der; `oneTimeProducts:batchUpdate` + `purchaseOptions:batchUpdateStates` (activate) kullanılır. Play kaydederken kendi bölgelerini ekler ve güncellemede silinmesini reddeder: önce GET, mevcut bölgeleri koru. Hizmet hesabına "Mağazadaki varlığı yönetme" izni gerekir. Satıcı profili ürün türü listesinde oyun yok: "Bilgisayar Yazılımı".
- Apple: IAP açıklaması ≤ 55 karakter; fiyat takviminde inline entity id `${price0}` biçiminde; banka formunda "Account Number" = IBAN'ın 16 haneli hesap bölümü (kısa hesap no "too short"); Paid Apps için W-8BEN **ve** ayrı "Certificate of Foreign Status" ikisi de gerekli; yasal kayıtta State boşsa anlaşma imzalanamaz.
- APNs anahtarı takım geneli: Diskort'un anahtarı Tussle'a da gönderir, ikinci anahtar gerekmez (Apple en çok 2). Anahtarın APNs olduğunu doğrulamak için sahte token ile istek: `BadDeviceToken` = kimlik geçti.
- ASC API anahtarı (`MFHXB9DW2D`) OneDrive yedeğindeydi (`Yedekler/Diskort/ios-imza`); Mac'te `~/.config/tussle/`. TestFlight yüklemesi `xcodebuild archive` + `-exportArchive` (`destination upload`) ile komut satırından çalışıyor (docs/CAPACITOR.md).

## İlgili
- [[2026-10-18-hak-paketi-fiyatlari-ve-magaza-urunleri]]
- [[2026-10-18-tussle-uygulama-hissi-onay-sayfasi-slaytlar-ios-120]]
