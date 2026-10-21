---
type: lesson
project: genel
date: 2026-10-21
status: done
tags: [steam, yedek, cihazlar]
source: Windows ZZ kök oturumu 2026-10-21 "disk taşıma"
---

# Ders: Steam klipleri ve ekran görüntüleri oyun kütüphanesinde değil, Steam'in kurulum klasöründeki userdata'da durur

- Yeni makinede Steam'e kütüphane klasörünü (D:\SteamLibrary) göstermek oyunları getirir ama **klipleri, ekran görüntülerini, kayıtları getirmez**. Onlar `Steam\userdata\<hesap-id>\` altında: `760\remote\<appid>\screenshots` (ekran görüntüleri), `gamerecordings\{video,clips,timelines,gamerecording.pb}` (kayıt deposu).
- Taşıma yöntemi: Steam'i kur, kapat, eski Steam klasörünü olduğu gibi üzerine kopyala (`steamapps\common` hariç). Steam güncellenir, yeniden giriş ister, her şey yerinde olur.
- Klipler kendi klasöründe bağımsızdır (`clip.pb` + video); başka depodan `clips\` altına kopyalanınca Steam yeniden başlatmada tanır. Arka plan kayıtları ise `gamerecording.pb` dizinine bağlıdır; dizin protobuf, birleştirilebilir ama `BackgroundMaxKeep` (1000 dk) sınırı eski kayıtları siler.
- Ekran görüntüleri: `760\remote\<appid>\screenshots\` içine Steam adlandırmasıyla (`YYYYMMDDHHMMSS_1.jpg`) bırakılan dosyaları Steam açılışta "içe aktarır", bildirim yağmuru normaldir. Oyunu bilinmeyenler `7` (Steam) klasörüne konabilir.
- Steam'in girişi makineye bağlı; disk değişince yeniden şifre + Guard ister, bu normal.
