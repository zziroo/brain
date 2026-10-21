---
type: session
project: genel
date: 2026-10-21
status: done
tags: [cihazlar, windows, disk, steam, onedrive, yedek]
source: Windows ZZ kök oturumu 2026-10-21 "disk taşıma: arızalı Force MP510'dan temiz Windows'a"
---

# Oturum: Arızalı sistem diskinden yeni diske geçiş; Steam ve arşiv düzeni

## Ne oldu
- Force MP510 (eski C:) 15-16 Ekim'de 5 mavi ekran, 21 Ekim'de kopyalama sırasında iki kez ani kapanma (Kernel-Power 41). USB adaptörle takılıyken bir kez daha koptu (okuma hataları + UASP sıfırlama). Disk arızalı; artık ondan alınacak şey kalmadı.
- Samsung FIT USB, Media Creation Tool ile Windows 11 kurulum medyası yapıldı (araç yönetici çalıştığı için tıklamaları Yusuf yaptı). Yeni disk KIOXIA EXCERIA PRO 1 TB; kullanıcı adı yine `yusuf`, Retail lisans kendini tanıdı.
- Claude oturumları eksiksiz geldi (727 jsonl). Masaüstü uygulamasının oturum listesi `%LOCALAPPDATA%\Claude-Data\claude_pzs8sxrjxfjjc\`, `%APPDATA%\Claude` değil.
- Steam: yeni kurulumun üzerine eski Steam klasörü olduğu gibi kopyalandı (userdata 172 GB). Kütüphane D:\SteamLibrary, 918 ekran görüntüsü, klipler geldi; yalnızca yeniden giriş istedi.
- OneDrive otomatik kurulup Masaüstü/Belgeler/Resimler'i kendine çekmişti; kaldırıldı (bkz. [[2026-10-21-onedrive-kaldirildi-klasor-yedekleme-yok]]).
- D:'deki dağınık yedekler `D:\Arsiv\` altında tarihli klasörlere taşındı; dizin `D:\Arsiv\OKU-BENI.md`. D:\SteamRecords (494 GB ham arka plan kaydı) silindi. C: 489 GB, D: 841 GB boş.

## Son kontrol ve eski diskin sıfırlanması (21 Ekim akşamı, ayrı oturum)
- H: (eski MP510) baştan sona C: ve D:\Arsiv ile karşılaştırıldı: Videos, Belgeler, Resimler, Masaüstü, .gemini ve 14 projenin hepsinin (aynı commit'ler ve `.env` dosyaları dahil) kopyası vardı.
- Yalnızca H:'de kalanlar alındı: Downloads'taki Diskort gizli dosyaları (Firebase admin SDK, Google servis hesabı, distribution.cer, mobileprovision), oyun kayıtları ve Türkçe yamalar `D:\Arsiv\2026-10-21_eski-pc-gecis\Downloads-secme` klasörüne (hash'ler doğrulandı); `Desktop\trash` (39 GB, çoğu rocketleague) `…\Desktop-trash` klasörüne.
- Yusuf'un kararıyla alınmayanlar: Telegram tdata, Opera profili, Downloads'taki videolar ve kurulum dosyaları.
- C:'deki eski PC yedeği (196 GB) D:'ye taşındı (`…\Videos`, `…\Desktop`, dosya dosya doğrulandı). C:'deki kaynağı Yusuf sildi; otomatik mod bu silmeyi engellemişti.
- Yusuf diski diskpart `clean` ile temizleyip tek bölüm exFAT yaptı (etiket "mp510", 894 GB). Artık harici USB disk; eski Windows'tan hiçbir şey kalmadı. Bkz. [[2026-10-21-harici-diskte-efi-ve-kurtarma-bolumu-diskpart-ile-silinir]].

## Nerede ne var
- Eski PC'den gelen her şey tek yerde: `D:\Arsiv\2026-10-21_eski-pc-gecis\` (Videos 186 GB OBS, Desktop 9,8 GB, Desktop-trash 39 GB, Downloads-secme, C-yedek). C:'de eski PC yedeği yok.
- Klipler tek yerde: `D:\Arsiv\klipler-toplu-2022-2025`.
- Hassas: `D:\Arsiv\_GIZLI-inportants-2026-02` (wallets, yedek kodları) parola yöneticisine alınmalı.

## Açık işler
- AMD çipset sürücüsü (ROG STRIX B650E-I) kurulmadı; 4 aygıt "yüklenemedi".
- Eski projeler (`D:\Arsiv\2026-02_ZZ-yedek\zProjects`, 19 yerel git deposu) GitHub'da yok; istenirse özel repo olarak gönderilir.
- ~~C:'deki eski PC yedeğinin elenmesi Yusuf'ta.~~ Yapıldı: yedek D:\Arsiv'e taşındı.
- Diskort gizli dosyaları (`Downloads-secme`) ve `_GIZLI-inportants-2026-02` düz dosya olarak duruyor; parola yöneticisine ya da şifreli bir yere alınmaları önerilir.

İlgili: [[2026-10-21-steam-klip-ve-ekran-goruntusu-userdata-icinde]] · [[2026-10-21-windows-temiz-kurulum-hook-ve-bitir]]
