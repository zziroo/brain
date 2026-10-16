---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, magaza, google-play, dagitim, test]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli" (Play Console kurulumu Chrome üzerinden)
---

# Karar: Android dağıtımı şimdilik Play iç testi + e-posta listesi; kapalı test (12 kişi / 14 gün) 12 hesap toplanınca; sunucudan APK yolu reddedildi

## Bağlam
Play Console'da uygulama oluşturuldu, AAB iç teste yüklendi, 11 kurulum görevinin hepsi tamamlandı. Yusuf TestFlight public link gibi e-postasız bir link istedi. Google'da bunun karşılığı yok: iç test linki yalnız e-posta listesindeki Google hesaplarında çalışır; "dahili uygulama paylaşımı" (linki olan herkes) uygulama **Taslak** durumundayken kilitli ("önce yayınlanmalı" = Google incelemesinden geçmiş bir sürüm); Kasım 2023 sonrası bireysel hesaplarda üretim/açık test için önce **12 test kullanıcısıyla 14 gün kapalı test** şart. Yusuf: "12 kişi bulamayabilirim, 14 gün fazla."

## Karar
1. Arkadaş grubu **iç test** ile oynar: liste "Tussle test" (şimdilik Yusuf'un Gmail'i), link `https://play.google.com/apps/internaltest/4701679197682475885`, 100 kişiye kadar; yeni Gmail geldikçe listeye eklenir, güncellemeler Play'den gelir.
2. **Kapalı test** 12 Google hesabı (arkadaş, aile, ikinci hesaplar; kurup 14 gün silmemek yeter, oynamak gerekmez) toplandığında açılır; mağaza sayfası ondan sonra.
3. Sunucudan imzalı APK dağıtımı (`tussle.ziroo.net/tussle.apk`, OTA ile güncellenir) önerildi, Yusuf **gerek yok** dedi.
4. Play Console seçimleri: kategori Oyun / Gündelik, hedef kitle 13+, reklam **Hayır** (reklam eklenince beyan değiştirilebilir), içerik derecelendirmesi IARC "Genel / Tüm yaşlar" (yalnız çevrimiçi etkileşim: oda sohbeti; engelleme/bildirme/denetim yok, etkileşim davetlilerle sınırlı), veri güvenliği 9 tür (`store/listing.md` §6), hesap oluşturma "Diğer: takma adlı misafir hesap", silme bağlantısı gizlilik sayfası, mağaza iletişim e-postası `privacy@ziroo.net` (Cloudflare Email Routing zaten açık; yönlendirme kuralı henüz kurulmadı), yapay zeka görsel etiketi **uygulanmadı** (gerçek ekranlar + vektör logo).
5. Android `versionCode` 2 (iOS yapı 2 ile eşit); upload keystore `~/keys/tussle-upload.keystore` (yedeği iCloud Drive `Yedek/`), parola Yusuf'ta; `android/keystore.properties` gitignore'lu.

## Neden
- Google'ın kuralı; kurumsal hesap (D-U-N-S) tek istisna, uymuyor.
- İç test zaten arkadaş grubunun ihtiyacını karşılıyor; mağaza sayfası aciliyeti yok.
- Reklam beyanı sonradan değiştirilebildiği için şimdi dürüst "Hayır".

## Reddedilen alternatifler
- Sunucudan APK: Play güvencesi yok, bazı telefonlar uyarı verir; Yusuf istemedi.
- Dahili uygulama paylaşımı: inceleme öncesi kapalı.
- Kapalı testi hemen boş kanal olarak açmak: faydası yok, saat ancak 12 kişi kurunca işler.

## Sonuçlar / riskler
- Playus'un onboarding akışı (slaytlar, bildirim izni, yaş kapısı, Google/Apple giriş) mağaza beyanlarını etkilemiyor; yaş kapısı ve "Yaş" veri türü ancak reklam gelirse gündeme gelir, push yok.
- `privacy@ziroo.net` mağazada görünüyor. (Düzeltme 2026-10-16: posta düşmüyor, ziroo.net catch-all zaten Gmail'e iletiyor: [[2026-10-16-ziroo-net-posta-catch-all-ayri-kural-yok]].)
- Play Console ekranlarında URL'ler değişken; kontrol paneli görev listesi üzerinden gidilir.

## İlgili
- [[_overview]] · [[2026-10-13-magaza-hesaplari-apple-bireysel-play-ziroo]] · [[2026-10-16-gizlilik-sayfasi-sunucudan-statik-en-tr]] · [[2026-10-16-play-veri-guvenligi-formu-taslak-kaydet-diyalog-yigini]] · [[sessions/2026-10-16-tussle-magaza-yayini-ve-play-console]]
