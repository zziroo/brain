---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [tussle, acilis, giris, onboarding, oda, qr, davet, ota]
source: Claude Code oturumu 2026-10-17 gece "tussle: oda başlığı ve kapak sadeleştirme" (Yusuf: "Google/Apple girişi ön plana", "QR kodla davet", "ön ayarlar", "bunu yükleniyor başlangıcıyla yapamaz mıydık", "bizim icondan bir yükleniyor animasyonu")
---

# Karar: açılış tek akış (ikon yükleme → giriş formu), tanıtım slaytları silindi; Google/Apple önde; oda kurma sihirbazı ve QR davet

## Bağlam
Yusuf bir referans uygulamanın ekranlarını gönderdi (QR davet, grup kurma sihirbazı: ad → adın → günlük saat; Google girişi önde). Tussle'da form takma ad önceliyliydi, oda tek adımda açılıyordu, davet yalnız kod + bağlantıydı; dört tanıtım slaytı (16 Ekim) "düz" bulundu. Slaytları yeniden tasarlama ajanı başlatılmışken Yusuf "bunu yükleniyor başlangıcıyla yapamaz mıydık?" dedi; ajan durduruldu, yön değişti.

## Karar
1. **Açılış tek akış (`69a4dc0`).** `index.html` içinde `#boot`: marka ikonu (taçlı üç blok) derleme sırasında Vite eklentisiyle `buildBrand`'dan üretilip gömülür (kopya değil, `brandMarkup()`; test `tests/brand.test.ts`), `brand.css` baştan yüklenir. İkon ilk boyamada kurulur (`brand-boot`: pop + taç düşer, sonra dalga), uygulama hazır olunca `endBoot` (`src/client/boot.ts`): girişli kullanıcıda bekleme yok, ana sayfa üstünde 200 ms solar; yeni kullanıcıda giriş ekranı aynı konumda ikonuyla altında belirir (0 px kayma; `--boot-top/--boot-size` ortak), ikon `brand-greet` yapar. 760 ms asgari yalnız yeni kullanıcıda. 12 sn bekçisi "Yüklenemedi, yeniden dene". `#app` yükleme sırasında inert. Dört slayt, `onboarding-core.ts`, ~1.000 satır CSS ve slayt i18n anahtarları silindi.
2. **Giriş ekranı (`95868bd`, `69a4dc0`).** İkon + "Tussle" + "Arkadaşlarınla oynamaya başla" + üç özellik çıkartması (Günün oyunu · Sezon şampiyonu · Canlı kapışma) + "Google ile devam et" / "Apple ile devam et" + "ya da" + küçük "Misafir olarak devam et" (dokununca takma ad formu açılır). Sunucu sağlayıcı bildirmezse form açık gelir. Davetle gelen de aynı ekranı görür; giriş sonrası `?oda=` kodu işlenir. Google düğmesinin "devam edin" metni Google'ın kendi düğmesinden gelir.
3. **Oda kurma sihirbazı (`95868bd`).** Ad → günlük saat kartları (Gece 04 / Sabah 10 / İkindi 16 / Akşam 22, "Diğer seçenekler" ile 24 saat; İkindi ön seçili) → oda açılır, davet sayfası kendiliğinden bir kez açılır (`tussle.inviteOnce` sessionStorage, rota açılışında okunup silinir). `POST rooms` artık `dailyHour`/`tzOffsetMin` alır (`validateSettings` ile), ilk gün o saatte döner; sunucu varsayılanı 12 (saat göndermeyen eski istemci).
4. **QR davet (`95868bd`).** Davet sayfasında davet bağlantısının QR'ı (`qrcode-generator` 1.4.4, dinamik import, inline SVG, M düzeltme, 4 modül sessiz alan, beyaz kart). Telefon kamerası okur; uygulaması olmayan kapı sayfasında kodu ve mağaza adımlarını görür. Uygulama içi tarama sonraya.
5. **Davet metni** referans uygulamayla birebir aynıydı (`0404284`'ten beri), özgün cümleyle değiştirildi.

## Reddedilenler
- Slaytları yeniden tasarlamak (tam boy renk, büyük sahne): başlatıldı, Yusuf'un sorusu üzerine iptal; üç başlangıç (mağaza açılışı, yükleniyor, slaytlar) tek akışa indi. Slaytlar "Nasıl oynanır?" turu olarak da tutulmadı.
- Takma ad önce, sağlayıcılar altta (eski düzen): misafir hesaplar kayboluyor, telefonda Google/Apple tek dokunuş.
- Oda kurarken "adın" adımı: zaten biliniyor. Saati kilitlemek: ayarlardan değişebilir.
- Uygulama içi QR tarayıcı: telefon kamerası yeter, sonra.

## Sonuçlar ve notlar
- Telefonda ilk deneme: Android TWA'nın kendi açılış perdesi (aynı ikon, ortada) sayfa boyanana kadar duruyor, ikon kurulumu perdenin altında bitiyordu. `33f971d`: süre ilk boyanan kareden sayılır, ikon perdedeki gibi ortada başlayıp giriş ekranının başına kayar (360 ms), girişli kullanıcıda ortada solar. Simgeye uzun basınca çıkan "Site Settings" TWA kütüphanesinin kısayolu, normal.
- İkinci deneme de perdenin altında kaldı (perde ilk kareden sonra da duruyor). `d0d4556`: zamanlama yok; ikon perdedeki gibi kurulu ve durağan bekler (yükleme uzarsa 1,2 sn sonra dalga), uygulama hazır olunca yerinde zıplar + taç + göz kırpma (`brand-open`, 650 ms), sonra kayar. Girişli kullanıcı ve azaltılmış hareket: açılış yok.
- Yayın `d0d4556` (öncekiler `69a4dc0`, `33f971d`); iOS OTA paketi `0.20261017.1830` yayınlandı (`deploy/ota.sh`), eski iOS istemciler bir sonraki soğuk açılışta alır.
- Doğrulanmayan: telefonda hiçbiri görülmedi; gerçek Google/Apple düğmeleriyle devir; girişli kullanıcıda ana sayfaya solma; 12 sn bekçisi gerçek zamanlamada.
- Sürüm ayrışması tartışması: Android/web her açılışta sunucudan alır; iOS OTA sonraki soğuk açılışta geçer, eski istemci yeni oyunu tanımaz. Sıradaki iş: bilinmeyen oyun için "yeniden başlat" kartı + OTA'yı `release.sh`'a bağlamak; asıl özellik oyunların sunucudan gelen bağımsız modül olması.
- Oturum: [[2026-10-17-tussle-oda-ustu-sadelesme-ve-web-kapisi]] (aynı oturumun ikinci yarısı). Bkz. [[2026-10-17-uygulama-disi-web-kapisi-ve-oda-ustu-sadelesti]].
