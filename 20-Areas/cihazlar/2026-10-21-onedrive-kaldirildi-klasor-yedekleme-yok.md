---
type: decision
project: genel
date: 2026-10-21
status: active
tags: [windows, onedrive, cihazlar]
source: Windows ZZ kök oturumu 2026-10-21 "disk taşıma"
---

# Karar: Windows'ta OneDrive kullanılmıyor; klasör yedekleme kapalı, Masaüstü/Belgeler/Resimler yerel

**Neden:** Temiz kurulumda Microsoft hesabıyla girilince OneDrive kendini kurdu, "klasör yedekleme"yi açıp Masaüstü/Belgeler/Resimler'i `OneDrive\` altına taşıdı ve buluttaki eski proje/My Games çöplerini indirmeye başladı. Oyun kayıtları (Documents\My Games) buluta gidiyor, 5 GB kota doluyor, Rocket League eski bulut kopyasını görüyordu. Yusuf eşitleme istemiyor; bulut dosyalarına tarayıcıdan erişiyor.

**Nasıl:** OneDrive kaldırıldı (`OneDriveSetup.exe /uninstall`), `User Shell Folders` Desktop/Personal/My Pictures ve GUID anahtarları `%USERPROFILE%\...`'a çevrildi, Explorer yeniden başlatıldı, yerel OneDrive klasörü silindi (bulut dokunulmadı).

**Reddedilen alternatifler:** Yalnızca klasör yedeklemeyi kapatıp OneDrive'ı bırakmak (yine arka planda eşitler, istenmedi). Microsoft hesabından çıkmak (OneDrive'ın oturumu ayrı, çözüm olmadı).

**Not:** Yeni Windows kurulumunda ilk iş bu adımı tekrar yapmak; aksi halde kopyalanan Documents/Pictures yanlış klasöre düşer.
