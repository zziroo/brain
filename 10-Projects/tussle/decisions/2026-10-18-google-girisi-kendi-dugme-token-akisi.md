---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, giris, google, web, twa]
source: oturum 2026-10-17/18 gece (mobil-playus), [[2026-10-17-tussle-yosef-geri-bildirimi-denge-429-iptal-karti-google-dugmesi]]
---

# Karar: Web/TWA Google girişi kendi düğmemizle GIS token akışında, tek dokunuş

## Bağlam
Google Identity Services'in `renderButton` düğmesi, tarayıcıda Google oturumu açıkken "Yusuf olarak devam et" + e-posta + avatar biçiminde kişiselleşiyor; kapatma ayarı yok. Yusuf giriş ekranında Apple düğmesiyle aynı düz "Google ile devam et" hapını istedi (17 Eki gece). Apple'ın JS kütüphanesi kendi düğmeden `signIn()` çağrısına izin verdiği için Apple düğmesi zaten bizimdi.

## Karar
Webde ve Android TWA'da Google düğmesi bizim `markedButton` hapımız (Apple'la aynı biçim, beyaz yazı, gri kontur yok). Dokununca GIS `initTokenClient` (`scope: openid email profile`, `prompt: ''`) popup'ı; dönen erişim belirteci sunucuya gider, sunucu `tokeninfo` ile doğrular (aud = web/iOS istemci kimliği, sub, süre, kapsam), adı `userinfo`'dan alır, aynı `signInWithClaims` yoluna sokar. iOS native yol (`idToken`) aynen.

## Neden
- Daha önce izin vermiş kullanıcıda Google hiç ekran göstermez: Apple gibi tek dokunuş.
- Sunucuya istemci sırrı gerekmez.
- Kimlik yine Google'a sorularak doğrulanır; `aud` denetimi başka uygulamaya verilmiş belirteci reddeder.

## Reddedilen alternatifler
- **GIS düğmesini görünmez bindirmek** (`e829939`): hap basılma tepkisi veremiyor (dokunuşu iframe alıyor), Google ileride opacity-0 iframe'e tıklama koruması koyarsa kırılır.
- **OAuth kod akışı** (`82705b5`, canlıda denendi): çalıştı ama GIS kod istemcisi `prompt=consent` gönderdiği için her girişte "ziroo.net hesabınızda tekrar oturum açıyorsunuz" ara ekranı çıktı; ayrıca istemci sırrı gerekiyordu. Kaldırıldı (`ded6d74`).
- **Google'ın düğmesini olduğu gibi bırakmak:** kişiselleşmiş görünüm Apple'ın yanında tutarsız.

## Sonuçlar / riskler
- Google marka kuralı koyu temada #e3e3e3 yazı önerir; beyaz yazı bilinçli sapma (`1c82008`).
- Belirteç `tokeninfo` sorgu dizesinde gider (Google'ın resmi yolu); günlüğe ve hata metinlerine asla girmez.
- Doğrulanmadı: çok Google hesaplı cihazda hesap seçici, TWA'da popup. Telefonda denenecek.
- Sunucu `.env`'deki `GOOGLE_CLIENT_SECRET` artık okunmuyor; silinebilir, Google Console'da Disable edilebilir.

## İlgili
- [[2026-10-17-web-google-apple-girisi-acildi-android-twa-ile]]
- [[2026-10-18-gis-dugmesi-kisisellesir-kod-akisi-ara-ekran-sir-sonradan-gorunmez]]
