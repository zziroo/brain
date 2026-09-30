---
type: session
project: diskort
date: 2026-09-29
status: done
tags: [diskort, hata-paneli, skia, mobil, surum, remote-control]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl (2. yarısı, 09-29), 012218c9 kopyası işlenmedi
---

# Oturum: admin paneli hataları, DM/sunucu ayrımı, Skia çökmesi, kanal paneli, 0.8.7-0.8.8

## Ne yapıldı
- Admin paneli hataları incelendi (28 Eylül'den 12 kayıt; bir telefonda ses kopmaları). Zararsız üç kayıt (başka cihazdan bağlanma, closed peer connection, "track was not unpublished") hem istemcide çift kapatma düzeltmesiyle hem sunucuda yok sayma listesiyle kesildi (sunucu kurulumu sürüm gerektirmedi).
- Gürültü engelleme (DPDFNet) hızlı telefonda gereksiz kapandı: ölçüm altyapısı yazıldı (kodek, çözücü donanım/yazılım, FPS, çözme süresi, düşen kare; bağlantı panelinde "İzlenen yayın"). Sebep: telefonun ısınması şikayeti. Review: Chrome/Electron `ExternalDecoder`'ı donanım sanıyordu, düzeltildi.
- **DM bağlamı sunucudan ayrıldı:** [[dm-baglami-sunucudan-ayri]].
- Geri bildirim #28 (HONOR/Android 16: profil teması rengi seçince uygulama kapanıyor): JS'de hata kaydı yok, native şüphesi; motor sertleştirildi, **0.8.7**.
- Skia JSI çökmesi: [[skia-native-yukleme-cokmeleri]]; ortak ajan düzeltmesi (yüklemeyi açılıştan sonraya alma) ile birlikte **0.8.8** (yalnız OTA).
- Mobil kanal yan paneli (Discord tarzı: arama, ayarlar, Üyeler/Medya/Sabitlemeler/Bağlantılar/Dosyalar sekmeleri; şema 24, yeni `files` ucu) yapıldı ve 0.8.8'e girdi.
- Rutinler ve izinler: [[gozcu-ve-gece-inceleme-rutinleri]], [[izin-istemleri-ve-rutinler]].
- Ajan modeli sorusu: [[ajan-modeli-dinamik-miras]]. Devir notu şişmesi: [[devir-notu-kucuk-tutulur]].
- Claude Remote Control telefondan kuruldu: [[ortam-tuzaklari-windows]].

## Alınan kararlar
[[dm-baglami-sunucudan-ayri]], [[ajan-modeli-dinamik-miras]], [[devir-notu-kucuk-tutulur]], [[gozcu-ve-gece-inceleme-rutinleri]]

## Öğrenilenler
[[skia-native-yukleme-cokmeleri]], [[izin-istemleri-ve-rutinler]], [[ortam-tuzaklari-windows]]

## Açık kalanlar
- Gürültü engelleme ve ısınma için yeni APK, ölçüm verisi görülünce tek seferde çıkarılacaktı (sonuç bu oturumda yok; bkz. [[2026-09-29-skia-native-cokme-ve-ses-telemetrisi]]).
- Zaman zaman rastgele başarısız olan iPhone testleri (yapılacak olarak önerildi).
