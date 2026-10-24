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

## Kalan (Yusuf)
0. **`npm run ios:metadata` koşuldu (23 Eki gece), API'den doğrulandı:** sürüm 1.4, yayın tipi elle, EN+TR metin, 2×5 ekran görüntüsü COMPLETE, build 11 bağlı, inceleme kişisi dolu, yaş 4+ (Apple hesapladı), 175 bölge, ücretsiz.
1. Test odası kuruldu: **9QZG** (`store/review-room.ts`, Mert/Ece/Kaan); `~/.config/tussle/asc-review.json` iskeleti yazıldı, ad/telefon/e-posta boş. Sonra `npm run ios:metadata --dry-run` sonra gerçek koşu.
2. ASC'de elle: App Privacy etiketi (listing.md §7), "Add for Review" (3 IAP ile birlikte), sandbox testçi.
3. Play: %15 kaydı, ekran görüntülerini yeniden üret (store/README.md), sayaç dolunca üretim başvurusu.
