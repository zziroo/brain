---
type: session
project: tussle
date: 2026-10-17
status: active
tags: [tussle, oturum, denge, hiz-siniri, sohbet, giris]
source: oturum 2026-10-17 gece (mobil-playus) "kalan işler ve geri bildirim kontrolü"
---

# Oturum: YOSEF geri bildirimi, Denge v4, hız sınırları, iptal kartı, Google düğmesi

Yayınlandı 2026-10-17 gece (`release.sh`, rev `e829939`, healthz ok): `fe8c460`, `65c8117`, `e829939`. Geri bildirim #1, #2 ack bekliyor.

## Geri bildirim okuması
- `feedback-cli.mjs list --all`: #1 Yusuf test notu (15 Eki), #2 YOSEF (iOS, 17 Eki 18:45): "Çok hızlısın diyor, balance oyunu 90 saniyede bitiyormuş kolay biraz". İkisi de ack'lenmedi.
- "Çok hızlısın" = sunucu 429 `rate_limited` metni (`http-util.ts`). Hangi uç noktada yediği bilinmiyordu: sunucuda istek günlüğü yok. Şimdi 429 retleri günlüğe düşüyor.
- İstemci hataları: iOS/web'de tekrar eden "Failed to start the audio device" (dokunuş öncesi ses başlatma, zararsız). Android DisplayRate hatası 16 Eki dev derlemesinden.
- Bildirim durumu (soruya cevap): sunucuda tek push cihazı var, o da web tarayıcısı; Android TWA'dan sıfır abonelik (sürüm 6 + izin bekliyor). iOS APNs anahtar/eklenti yok.

## Değişiklikler
- **Denge v4** (`fe8c460`): rampSec (40 s) sonrası rüzgâr tavanı her 20 s'de windCap'in %15'i kadar artar, en çok 2×; CAP_SEC 90 → 180. Bot tablosu (400 tohum): eğilime karşı bot medyan 53 s, en uzun 112 s; orta PD medyan 69 s, hiç tavana ulaşmıyor; becerikli PD %10 tavan; mükemmel bot 180. meta.version 4.
- **Hız sınırları** (`fe8c460`): start/attempt/matchResult kullanıcı 12 → 30/dk (IP 40 → 80); matchCreate 5 → 30/10 dk (IP 20 → 60); partyCreate 5 → 15/10 dk (IP 20 → 40). Yusuf: "kapışmalar sürekli sohbete atılabilsin". 429 günlüğü: limiter + yol şablonu, dakikada en çok bir satır/limiter, kimlik ve IP yok. Metin: "Biraz nefes al: birkaç saniye sonra yeniden dene."
- **İptal kartı sohbetten kalkar** (`65c8117`): kapışma/parti kartı `cancelled` olunca solup yüksekliği kapanarak ~250 ms'de çıkar (motionOff: anında); `Chat.list()` iptal kartların mesajlarını sorgu içinde eler (sayfalama bozulmaz); istemci filtresi eski sunucu/önbellek için kalır. Sunucu mesajı silmiyor (silme yayını yok, live.ts:72 prune kuralıyla karışırdı).
- **Google düğmesi düz** (`e829939`): web/TWA'da GIS `renderButton` Google oturumu açıkken "Yusuf olarak devam et" + e-posta gösteriyordu, kapatılamıyor. Kendi hapımız ("Google ile devam et", Apple'la aynı) + GIS düğmesi opacity 0 bindirme, dokunuşu GIS alır; ölçek ResizeObserver + MutationObserver ile izlenir. **Doğrulanmadı:** localhost'ta GIS iframe'i yüklenmedi; gerçek web/TWA'da dokunuşla açılır pencere denenecek (Yusuf). Risk: Google ileride opacity-0 iframe'e tıklama koruması koyarsa kırılır.

## Yusuf'un listeye kararları
- 4 (slayt figürleri): "şimdiki de fena değil", tasarım Claude'a bırakıldı, düşük öncelik.
- 6 (sürüm ayrışması): yapılacak; "oyun ekle çıkar yaparız" → ayrı oturum açıldı ("Sürüm ayrışması: oyunlar sunucudan modül olarak gelsin").
- 7 (profil sonrası telefon turu): "sorun yok, çalışıyor, denemiştim" → listeden düştü.

## İnceleme
- Review ajanı (opus): orta+ bulgu yok; düşük: yeniden çizimde `is-leaving` sınıfı kaybı ve destroy'da kalan zamanlayıcı (düzeltildi), denge live kapışmasında eksik log beklemesi ~4 dk (kabul), yol şablonunda yalnız küçük harfli kısa parçalar günlüğe geçebilir (teorik).
- Google düğmesi review'ı (sonnet): GIS düğüm değiştirirse ölçek kaybı (düzeltildi), ResizeObserver kopmuyor (düzeltildi).

## Devam (2026-10-18 gece): Google kod akışı (`82705b5`, yayınlandı, OTA 0.20261017.2301; sır bekliyor)
- Yusuf bindirmeli düğmeyi "statik, tuş gibi değil" buldu; Apple'ın düğmesi bizim olduğu için basılma hissi vardı. Karar: Google'da da kendi düğmemiz + OAuth kod akışı (GIS `initCodeClient`, popup). Sunucu `GOOGLE_CLIENT_SECRET` ile kodu ID token'a çevirir, aynı `verifyToken` yolundan geçer. Sır yokken eski bindirme kalır, `providers.google.codeFlow` bayrağı seçer.
- **Yusuf'un yapacağı:** Google Cloud Console → Credentials → web OAuth istemcisi → Client secret → `/opt/tussle/.env`'e `GOOGLE_CLIENT_SECRET=…` → `docker compose up -d --force-recreate` (docs/AUTH-SETUP.md §3.1). Sonra telefonda dene: onay ekranı her girişte çıkıyor mu (GIS kod istemcisi `prompt=consent` gönderiyor; can sıkarsa `select_account`/`login_hint` denenecek), TWA'da popup açılıyor mu.
- Review (opus): kritik/yüksek yok; düşükler düzeltildi: odak yedeği geç gelen kodu düşürüyordu, iki düğme ortak istemciyi çakıştırıyordu, yanlış sır sessizdi (artık dakikada bir günlük satırı). Tarayıcıda yalnız hata yolu görüldü (önizleme popup'ı engelliyor); başarılı giriş yalnız testlerle doğrulandı.

## Devam 2 (2026-10-18 gece): token akışı, tek dokunuş (`1c82008`, `ded6d74`; yayınlandı, OTA 0.20261017.2320)
- Kod akışı canlıda çalıştı ama Google her girişte "ziroo.net hesabınızda tekrar oturum açıyorsunuz" ara ekranı gösterdi (kod akışı `prompt=consent`, değiştirilemez). Yusuf: "Apple gibi tek dokunuş olsun" + düğme yazısı soluk.
- `1c82008`: Google hapı beyaz yazı, gri kontur yok (Google'ın #e3e3e3 koyu tema önerisinden sapma, Yusuf'un isteği).
- `ded6d74`: GIS **token akışı** (`initTokenClient`, `prompt: ''`): önceden izin vermiş kullanıcıda ekran yok. Sunucu `verifyGoogleAccessToken`: tokeninfo (aud ∈ web/iOS istemci, sub, expires_in > 0, openid+email), userinfo'dan ad (sub eşleşmeli), e-posta yalnız doğrulanmışsa; 429/5xx/bozuk gövde → 502. Kod akışı, `GOOGLE_CLIENT_SECRET`, `codeFlow`, bindirmeli `renderButton` yolu ve `auth-providers.css` kaldırıldı. Sunucu `.env`'deki `GOOGLE_CLIENT_SECRET` satırı artık okunmuyor; silinebilir, Google Console'da sır Disable edilebilir (18 Eki'de üretilen yeni sır).
- Review (opus): kritik/orta yok; düşük (429 → 401 yerine 502) düzeltildi. Doğrulanmadı: çok Google hesaplı cihazda hesap seçici, TWA'da popup; telefonda denenecek.
- Ders: kendi düğmeyle Google girişi için doğru yol baştan token akışıydı (sır gerekmez, ara ekran yok); kod akışı bir ara adım oldu.
