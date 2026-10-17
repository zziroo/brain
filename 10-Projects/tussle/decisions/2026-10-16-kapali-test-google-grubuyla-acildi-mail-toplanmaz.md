---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, magaza, google-play, kapali-test, dagitim]
source: Claude Code oturumu 2026-10-16 "tussle: Play kapalı test" (Claude in Chrome, Yusuf'un hesabı)
---

# Karar: Play kapalı testi Google Grubu ile açıldı; testçiler gruba kendileri katılır, Yusuf mail toplamaz

## Bağlam
Bireysel Play hesabında mağazaya çıkmak için 12 test kullanıcısının 14 gün kesintisiz kapalı testte kalması gerekiyor. Yusuf 12 kişinin Gmail adresini tek tek toplayıp Claude'a yazmak istemedi ("bi sign in sistemi yok mu"). Uygulamanın kendi girişi işe yaramaz: Play testçiyi Google hesabından tanır.

## Karar
1. Google Grubu **Tussle Test** (`tussle-test@googlegroups.com`, sahibi Yusuf'un Gmail'i): web'deki herkes görebilir ve katılabilir; ileti gönderme ve üye listesini görme yalnız sahipte (üyeler birbirinin mailini görmez, spam yok).
2. Play Console'daki hazır **"Kapalı test - Alpha"** kanalı: testçi türü Google Grupları (grup adresi), geri bildirim adresi `privacy@ziroo.net`, 177 ülke + dünyanın geri kalanı, iç testteki AAB (versionCode 2, 1.0) kitaplıktan eklendi, EN + TR sürüm notu.
3. Reklam kimliği beyanı **Hayır** (release merged manifest'te `AD_ID` izni yok). Reklam gelirse bu beyan, reklam beyanı ve veri güvenliği yeni sürümle güncellenir.
4. Yusuf'un açık onayıyla **16 değişiklik incelemeye gönderildi** (ilk gönderim: kapalı test kanalı + mağaza girişi + içerik derecelendirmesi + hedef kitle + gizlilik URL'si + reklam beyanı + veri güvenliği + PC'de Google Play Games form faktörü). Yönetilen yayınlama kapalı: onay gelince kendiliğinden yayına girer.
5. Arkadaş akışı: gruba katıl (`groups.google.com/g/tussle-test`) → katılım linki (`play.google.com/apps/testing/net.ziroo.tussle`) → "Test kullanıcısı ol" → Play'den kur, 14 gün silme. Hedef 14-15 kişi (biri çıkarsa sayı düşer).

## Neden
- Grup, e-posta toplama işini testçiye bırakıyor; liste Play'de değil grupta büyüyor, Claude'a mail aktarmak gerekmiyor.
- Kanalı şimdi incelemeye göndermek, ilk inceleme süresini (genelde ≤7 gün) kişiler toplanırken harcatıyor; linkler hazır olunca arkadaşlara tek mesaj gider.
- Tracklerin farkı: **dahili** (≤100 kişi, e-posta listesi, incelemesiz, 12/14 şartına sayılmaz), **kapalı** (davetli liste ya da grup, ilk sürüm incelenir, 12/14 şartı burada), **açık** (mağazada erken erişim, üretim izninden önce kilitli), **üretim** (herkese açık).

## Reddedilen alternatifler
- Gmail'leri toplayıp Play'deki e-posta listesine elle eklemek: Yusuf istemedi, her yeni kişi için Console'a girmek gerekir.
- Uygulamanın kendi giriş sistemiyle test: Play testçiyi Google hesabıyla eşler, mümkün değil.
- Kapalı testi 12 kişi toplanınca açmak (önceki karar [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]] madde 2): inceleme süresi sona kalırdı.

## Sonuçlar / riskler
- **Doğrulanmadı:** inceleme sonucu; katılım linki onaydan önce çalışmaz ve link biçimi standart olandan yazıldı, Console'daki "Bağlantıyı kopyala" onaydan sonra kontrol edilmeli. Grup + katılım akışı gerçek bir arkadaşla denenmedi.
- 14 günlük saat ancak 12 kişi katılınca işler; testçiler ara ara açarsa üretim başvurusundaki etkileşim soruları kolaylaşır.
- İç test listesi ("Tussle test") ayrı kanal olarak duruyor; ikisindeki kişi en yüksek versionCode'u alır.
- PC'de Google Play Games form faktörünün pakette "etkin" gitmesi bilerek seçilmedi (Console'un varsayılanı gibi görünüyor); sorun çıkarırsa Gelişmiş ayarlar'dan kapatılır.

## İlgili
- [[_overview]] · [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]] · [[2026-10-16-play-kapali-test-kurulumu-onay-captcha-ve-ad-id-engeli]] · [[2026-10-16-tussle-play-kapali-test-google-grubu]]
