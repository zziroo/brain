---
type: session
project: tussle
date: 2026-10-23
status: done
tags: [tussle, magaza, app-store, google-play, oturum]
source: Claude Code oturumu 2026-10-23 "tussle: mağaza durum kontrolü" (mobil-playus)
---

# Oturum: mağaza durum kontrolü (API + Play Console) ve App Store metadata scripti

## Durum (23 Eki)
- **Play kapalı test sayacı:** Konsol "12 testçi kesintisiz 4 gündür kayıtlı" diyor; 14 gün ~4-6 Kasım'da dolar (19 Eki'den sayılmıyor; 12'nin altına düşerse sıfırlanır). Üretim başvurusu düğmesi o güne dek pasif.
- Play: 1.13 (vc 17) iç + kapalı test, 10 beyan tamam, politika sorunu yok, 3 ürün (tries_1/3/5) konsolda, EN+TR giriş, EN 5 ekran görüntüsü. **Eksik:** %15 hizmet ücreti kaydı (18 Eki kartı duruyor, Yusuf konsoldan), ekran görüntüleri 16 Eki'den kalma (yeniden üret), ödeme profili/IBAN ve gelen kutusu okunamadı.
- Apple: TestFlight build 11 (1.4) dış grupta 5 testçi; 3 IAP Ready to Submit; sandbox testçi yok. **App Store sürümü 1.0 tamamen boştu** (metin, görsel, kategori, yaş, gizlilik URL, build, fiyat, bölge).

## Yapılan
- `scripts/asc-metadata.mjs` (`npm run ios:metadata`, önce `--dry-run`): listing.md'den EN+TR metinler, kategori Games/Casual+Family (Apple'da Party yok), yaş anketi (sohbet + UGC evet, şans hakkı kalktığı için kumar yok), gizlilik URL, inceleme kişisi (`~/.config/tussle/asc-review.json`: firstName, lastName, phone, email, demoRoomCode) ve notu, 5 iPhone 6.7" görseli, build 11, ücretsiz fiyat (USA taban), 175 bölge. Sürüm dizesi build'in pazarlama sürümüne (1.4) çekilir; ilk sürümde whatsNew yazılmaz (Apple 409). Yayın tipi MANUAL; incelemeye göndermez. Commit `git log` 23 Eki akşam.
- İnceleme ajanı bulguları (whatsNew 409, sürüm 1.0≠build 1.4, bölge kontrolü hep eksik, .catch 404'e daraltıldı) düzeltildi; şüpheci atlandı çünkü build sürümü canlı API'den doğrulandı.

## 24 Eki devamı
- Yusuf konsollarda: Play %15 hizmet ücreti kaydı tamamlandı ("Hesap grubunu yönet" → Başlat → iki soruya Hayır → şartları kabul); ASC App Privacy etiketi 11 türle yayınlandı (hepsi linked, App Functionality, takip yok). Sınıflandırıcı ASC form tıklamasını engelledi, Claude yönlendirdi.
- Ekran görüntüleri güncel arayüzle yenilendi (ajan, opus; 529 ile iki kez kesildi, SendMessage ile sürdü): 5 kare + 06-arena (masa açma) + 07-duel (Split 950-1580). Mağaza sırası 01,02,07,06,03,05,04 (`store/README.md`). ASC'ye `npm run ios:metadata` (checksum ile değişeni yeniler), Play'e `npm run play:screenshots` yüklendi ve geri okundu (14 görsel COMPLETE / 7 Play). Eski kareler `store/_eski/` (gitignore).
- Arena "Hazırım" bekleme evresi karesi çekilmedi (bot ws girdisi gerekir). `.practice-row` hâlâ home.ts'te; Antrenman satırı sürümden önce kalkacak mıydı, karar yok.

## 24 Eki öğleden sonra: App Review gönderimi
- Add for Review iki eksik verdi: 13" iPad görseli (derleme universal) ve Content Rights. Karar: **iOS yalnız iPhone** (`TARGETED_DEVICE_FAMILY = 1`, iPad sonra ayrı geniş-ekran turuyla); Content Rights API ile "üçüncü taraf içerik yok". Build 12 derlenip yüklendi (`ios-build.sh` kalıbı: build:app → archive → exportArchive, auth key ile), sürüme bağlandı, TestFlight dış gruba gitti; commit 5ff2e1d.
- Gönderim: ilk Add for Review ürünsüz gitti; `scripts/asc-submit.mjs` geri çekip sürümü yeniden gönderdi. Apple kuralı: ilk tüketilebilir ürün sürümle birlikte gitmeli; API ile reviewSubmissionItems IAP kabul etmiyor, inAppPurchaseSubmissions de "pending version yok" dedi. Yusuf ASC'de tries_1'i "Add for Review" ile ekleyip gönderdi: **sürüm 1.4 + tries_1 WAITING_FOR_REVIEW (24 Eki 14:26)**. tries_3 ASC'de taslağa eklendi; tries_5 + Draft Submissions → Submit for Review Yusuf'ta (doğrulanmadı).
- Sınıflandırıcı ASC form tıklamalarını ve bir API gönderimini engelledi; scriptler Yusuf'a koşturuldu, sonrakiler geçti.
- Ders: universal Capacitor derlemesi App Store'da iPad görseli zorunlu kılar; sürüm dizesi build'in pazarlama sürümüne eşit olmalı; ilk sürümde whatsNew yazılamaz.

## Kararlar ve dersler
- [[2026-10-24-ios-yalniz-iphone-ipad-sonra]], [[2026-10-24-asc-api-gonderim-tuzaklari]]

## Kalan (Yusuf)
0. **`npm run ios:metadata` koşuldu (23 Eki gece), API'den doğrulandı:** sürüm 1.4, yayın tipi elle, EN+TR metin, 2×5 ekran görüntüsü COMPLETE, build 11 bağlı, inceleme kişisi dolu, yaş 4+ (Apple hesapladı), 175 bölge, ücretsiz.
1. Test odası kuruldu: **9QZG** (`store/review-room.ts`, Mert/Ece/Kaan); `~/.config/tussle/asc-review.json` iskeleti yazıldı, ad/telefon/e-posta boş. Sonra `npm run ios:metadata --dry-run` sonra gerçek koşu.
2. ASC: tries_3 ve tries_5'i Add for Review + Submit; sandbox testçi; inceleme sonucu gelince "Release This Version".
3. Play: sayaç dolunca (~4-6 Kas) üretim başvurusu. %15 ve görseller tamam.
