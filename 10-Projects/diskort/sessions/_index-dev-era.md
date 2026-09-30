---
type: session
project: diskort
date: 2026-10-01
status: done
tags: [diskort, indeks, dev-era]
source: C--dev-diskort (28 jsonl; 8 anlamlı oturum + 20 otomatik)
---

# Dev dönemi (C:/dev/diskort) notları: tarih sıralı indeks

Bu liste yalnızca C--dev-diskort kayıtlarından yazılan notları içerir (session, decision, lesson). Not: decision/lesson notlarının tarihi, konunun ilk geçtiği oturumun tarihidir.

- 2026-09-26 [decisions] [[indirme-sayfasi-kendi-domaininde]] : Karar: Kurulum dosyaları GitHub yerine kendi alan adımızdaki indirme sayfasından dağıtılır; kullanıcı GitHub'ı görmez.
- 2026-09-26 [decisions] [[kod-imzalama-ertelendi-dev-era]] : Karar: Windows kurulum dosyalarının kod imzası şimdilik ertelendi; SmartScreen uyarısı kabul edildi.
- 2026-09-26 [decisions] [[sesli-uygulama-icin-livekit-ve-kendi-vps]] : Karar: Ses ve ekran paylaşımı için kendi VPS'imizde LiveKit SFU, hesap + davet koduyla giriş.
- 2026-09-26 [decisions] [[ssh-yalnizca-anahtar-ile]] : Karar: Sunucuya yalnızca SSH anahtarıyla girilir; parola girişi kapatıldı.
- 2026-09-26 [lessons] [[ortam-tuzaklari-windows-bash-ssh]] : Ders: Windows + Git Bash + SSH ile çalışırken tekrar yaşanan küçük tuzaklar.
- 2026-09-26 [lessons] [[sqlite-migration-once-prod-kopyasinda-dene]] : Ders: Şema değişikliği canlıya gitmeden önce prod yedeğinin kopyasında denenir.
- 2026-09-26 [sessions] [[2026-09-26-kurulum-ve-yayina-alma]] : Oturum: Diskort'un sıfırdan kurulup canlıya alınması
- 2026-09-26 [sessions] [[2026-09-26-metin-kanallari-ve-android-baslangic]] : Oturum: Metin kanalları, zorunlu güncelleme ve Android ilk sürüm
- 2026-09-27 [decisions] [[android-push-icin-fcm]] : Karar: Android push bildirimi FCM ile gönderilir; sunucumuz FCM HTTP v1'e doğrudan istek atar.
- 2026-09-27 [decisions] [[geri-bildirim-sistemi-uygulama-ici]] : Karar: Kullanıcı geri bildirimi uygulama içi formdan toplanır, CLI ile işleme alınır; zamanlanmış görev yalnızca bildirir.
- 2026-09-27 [decisions] [[gurultu-engelleme-dpdfnet-varsayilan]] : Karar: Masaüstü ve Android'de varsayılan gürültü engelleme DPDFNet; yetmezse DeepFilterNet'e, o da yetmezse Standart'a düşer.
- 2026-09-27 [decisions] [[ios-ad-hoc-dagitim-dev-era]] : Karar: iOS dağıtımı Apple Developer hesabıyla Ad Hoc imzalı IPA ve kendi indirme sayfamızdan yapılır; TestFlight/App Store yok.
- 2026-09-27 [decisions] [[mobil-ota-guncelleme-kendi-sunucuda]] : Karar: Mobil JS güncellemeleri expo-updates protokolüyle kendi sunucumuzdan, imzalı ve zorunlu OTA olarak gelir.
- 2026-09-27 [decisions] [[zorunlu-istemci-guncellemesi]] : Karar: Herkes her zaman son sürümü kullanır: masaüstünde açılış kapısı + gateway sürüm reddi, Android'de zorunlu güncelleme ekranı.
- 2026-09-27 [lessons] [[apk-derleme-suresi-ve-hizli-test-yolu]] : Ders: APK derlemesi her seferinde sıfırdan çalışıyordu; JS değişiklikleri OTA ile, test derlemeleri ayrı hızlı yolla gitmeli.
- 2026-09-27 [lessons] [[telefon-ekran-paylasimi-cozunurluk-siniri]] : Ders: Telefon ekranını tam çözünürlükte paylaşmak kodlayıcıyı yetişemez kılıp kare düşürüyordu.
- 2026-09-27 [sessions] [[2026-09-27-coklu-sunucu-dpdfnet-yayin-kalitesi-ses-tasarimi]] : Oturum: Çoklu sunucu, DPDFNet, sabit yayın kalitesi, ses tasarımı, admin paneli
- 2026-09-27 [sessions] [[2026-09-27-ota-ses-filtresi-roller-dm]] : Oturum: OTA güncelleme, DeepFilterNet 3, roller, DM, geri bildirim sistemi
- 2026-09-28 [decisions] [[ekran-paylasimi-sabit-kalite-presetleri]] : Karar: Ekran paylaşımı sabit presetlerle çalışır; otomatik kalite ve özel bitrate kaldırıldı, en üst seçenek 1080p60 (12 Mbps).
- 2026-09-28 [decisions] [[hesap-acma-yalnizca-davetle]] : Karar: Diskort'ta yeni hesap yalnızca hesap yöneticisinin daveti ile açılır; bu bir ayar değil sabit kuraldır.
- 2026-09-28 [decisions] [[kod-inceleme-ajani-ve-supheci-ajan]] : Karar: Kod incelemesi ayrı, salt-okunur ajanla yapılır; orta+ bulgular için "şüpheci" ajan çürütmeye çalışır; karar koordinatöre gelir.
- 2026-09-28 [decisions] [[proje-dizini-onedrive-disina]] : Karar: Diskort `C:\dev\diskort` yerine `C:\Users\yusuf\ZZ\zProjects\diskort` altına taşındı; OneDrive içinde tutulmaz.
- 2026-09-28 [decisions] [[sesli-moderasyonda-rol-hiyerarsisi-kaldirildi]] : Karar: Sesli moderasyon (taşı, sustur, sağırlaştır, bağlantıyı kes) rol hiyerarşisine bakmaz; at/yasakla/rol hâlâ bakar.
- 2026-09-28 [decisions] [[ssh-izni-yalnizca-diskort-sunucusu]] : Karar: Canlı sunucuya SSH izni ayar dosyasına açıkça ve yalnızca bu sunucu + kullanıcı + anahtarla sınırlı olarak yazıldı.
- 2026-09-28 [decisions] [[tek-ses-paketi]] : Karar: Uygulama sesleri tek pakettir (yumuşak, Discord tarzında ama kopya değil); ses paketi ayarı ve ses seviyesi ayarı yok.
- 2026-09-28 [decisions] [[yonetim-paneli-web-uzerinden]] : Karar: Yönetim paneli uygulama içinde değil, sitede (/admin) sunulur; yalnızca hesap yöneticileri girer.
- 2026-09-28 [lessons] [[dfn-catirtisi-ses-is-parcacigi-siniri]] : Ders: DeepFilterNet çatırtısı: ses iş parçacığına ayrılan ~2,7 ms süre tek tük yavaş karede aşılabiliyor; karşı taraf çatırtı duyar, konuşan duymaz.
- 2026-09-28 [lessons] [[onedrive-icinde-git-ve-node-modules-sorunu]] : Ders: Git deposu ve node_modules OneDrive klasöründe tutulmaz.
- 2026-09-28 [lessons] [[otomatik-mod-ssh-engeli-yeni-sohbette]] : Ders: Otomatik mod denetçisi bağlamsız yeni sohbette canlı sunucuya SSH komutunu engeller; izin hafızada değil ayar dosyasında olmalı.
- 2026-09-28 [lessons] [[otomatik-yayin-kalitesi-gercek-yayinda-denenmeden-cikti]] : Ders: Dinamik yayın kalitesi yalnızca kendi bilgisayarında test edilip çıktı; gerçek yayında takılma ve "bağlantı zayıf" uyarısı yarattı.
- 2026-09-28 [lessons] [[pnpm-node-modules-tasima-sonrasi-yeniden-kur]] : Ders: Proje klasörü taşınınca pnpm bağlantıları (junction) bozulur: node_modules silinip yeniden kurulur.
- 2026-09-28 [lessons] [[test-apk-surumu-son-surumden-yuksek-olmali]] : Ders: Test APK'sının sürüm numarası son yayın sürümünden yüksek olmalı, yoksa uygulama içi güncelleyici yayın APK'sını zorlar.
- 2026-09-28 [sessions] [[2026-09-28-ios-davet-kurali-profil-suslemeleri-orkestrasyon]] : Oturum: iOS ilk derleme, davetle kayıt kuralı, profil süsleri, orkestrasyon soruları
- 2026-09-28 [sessions] [[2026-09-28-kod-inceleme-ajani-ve-dizin-tasima]] : Oturum: Kod inceleme ajanı, ajan çalışma düzeni, proje dizininin taşınması
- 2026-09-28 [sessions] [[2026-09-28-otomasyon-gozcu-oturumlari]] : Oturum: Otomatik "gözcü" oturumları (özet)
