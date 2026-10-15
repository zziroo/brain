---
type: decision
project: diskort
date: 2026-10-15
status: active
tags: [ses-tasarimi, geri-bildirim, profil, sunucu]
source: geri bildirim #34 (Dararius); diskort oturumu 2026-10-15 akşam (Mac), sürüm 0.11.1
---

# Karar: Kişisel giriş sesi, Discord soundboard tarzı; sunucu ffmpeg ile kırpar, dinleyici seviyeyi ayarlar

## Bağlam
Dararius'un #34 önerisi ([[2026-10-15-kisisel-giris-sesi-ertelendi]] ile ertelenmişti). Yusuf aynı gün "34'ü yapalım, sonra sürüm çıkarız" dedi; sürüm 0.11.1 ile çıktı.

## Karar
- Kullanıcı en çok **5 sn**'lik ses yükler (profil ayarları); kanala girince **herkes, giren dahil** genel katılma sesi yerine onu duyar (Discord gibi).
- **Sunucu işler:** ffmpeg (Docker imajına apt ile eklendi) `-ss start -t 5`, loudnorm, 0,3 sn fade-out, MP3 48 kHz mono 96 kbps; `-protocol_whitelist file` + biçim beyaz listesi (m3u8 ile SSRF'ye karşı), geçici dosya (borudan okuma M4A'da moov sondaysa çalışmıyor), 20 sn zaman aşımı, 8 MB giriş / 1 MB çıkış sınırı, 1000 bayt altı çıktı "okunamadı". Özet `sha256("intro:"+userId, çıktı)` ilk 32 hex: dosya kullanıcıya özgü. Şema 27 (`users.intro_sound_hash`), `/api/me/intro-sound?start=`, `/api/intro-sounds/<kullanıcı>/<özet>.mp3` kimliksiz, `private, immutable`, ETag/Range. Hız sınırı 10 dk'da 5 (yükleme + kaldırma ortak).
- **Dinleyici kontrolü (Discord ekran görüntüsünden):** aç/kapat anahtarı yerine **ses seviyesi kaydırıcısı** (0 = kapalı, genel ses çalar). Masaüstünde ses paneline yeni düğme: sol tık aç/kapat (üstü çizili ikon), sağ tık kaydırıcılı bağlam menüsü (+ "Ses Ayarları" → Bildirimler ve Sesler). Aynı kaydırıcı ayarlarda ve telefonda. Ayar `introSoundVolume` (0..1, varsayılan 1).
- **Yükleme:** masaüstü dosyayı tarayıcıda çözer, 5 sn'den uzunsa dalga formu + başlangıç kaydırıcısı + dinleme; 15 dk'dan uzun dosya reddedilir (PCM bellek). Telefon ilk 5 sn'yi alır (başlangıç seçici yok), expo-document-picker ile.
- **Moderasyon:** yönetici kaldırır (`DELETE /api/users/:id/intro-sound` USER_UPDATE gönderir; admin-cli `intro-sound-remove` yalnız DB+dosya) + dinleyici kaydırıcısı. Discord'da da aynı ikili (sunucu yöneticisi sesi siler, dinleyici soundboard'u susturur).
- Kendi girişin sağırken de çalar (kendi işlemin), başkalarınınki sağırken çalmaz. Yeni bir giriş sesi öncekini durdurur; kanaldan çıkınca durur.

## Neden
- Discord'un soundboard giriş sesi alışkanlığı; kullanıcılar bunu bekliyor. "Tek ses seti" kararı ([[tek-ses-paketi]]) arayüz sesleri içindir, kişisel ses onu bozmaz.
- Sunucu tarafı ffmpeg: iki platformda da yükleme basit dosya seçimine iner; telefonda ses çözme/kırpma altyapısı yok.
- Kaydırıcı: Yusuf'un isteği, Discord'daki "Ses Paneli Ses Seviyesi" ile aynı kullanım.

## Reddedilen alternatifler
- Yalnız masaüstünden yükleme (ilk sürüm için önerildi): Yusuf iki platformu da istedi.
- İstemcide kırpma/kodlama, sunucuda yalnız doğrulama: telefon için zor, iki ayrı kod yolu.
- Aç/kapat anahtarı: Discord'daki kaydırıcı tercih edildi.
- Sunucu sahibinin de kaldırabilmesi: yönetici + dinleyici kaydırıcısı yeterli görüldü.
- `ffmpeg-static` npm paketi: kurulumda GitHub'dan indirme, Docker derlemesinde kırılgan; Debian apt seçildi.

## İlgili
- [[2026-10-15-kisisel-giris-sesi-ertelendi]] (superseded) · [[tek-ses-paketi]] · [[sessions/2026-10-15-kisisel-giris-sesi-ve-0-11-1]]
