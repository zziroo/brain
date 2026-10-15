---
type: decision
project: kisisel
date: 2026-10-14
status: active
tags: [cihaz, xiaomi, xiaomi-eu, hyperos]
source: Oturum "kişisel: Xiaomi 17 Pro xiaomi.eu kurulumu" (2026-10-14)
---

# Karar: Xiaomi 17 Pro'ya stok Çin + bölge hilesi yerine xiaomi.eu ROM kuruldu

## Bağlam
Telefon bir yıl güncelleme alamıyordu: servis, Çin ROM üstüne Xiaomi 17 global'den alınmış `mi_ext` ile bölgeyi "pandora_global/TR" yapmıştı; Güncelleyici sunucuda olmayan bir cihazı soruyordu. Ayrıca gizli KernelSU vardı. Yusuf'un isteği: Google servisleri + Türkçe, root şart değil, güncellemeler gelsin. Bkz. [[xiaomi-17-pro]].

## Karar
Tam silme ile **xiaomi.eu OS3.0.319.0** (pandora) kuruldu; root kurulmadı, bootloader açık bırakıldı.

## Neden
- Google ve tam dil desteği yerleşik; hile yok.
- Güncellemeler telefondan, xiaomi.eu OTA ile; her sürümde bilgisayar gerekmiyor.
- Çin ROM temelli olduğu için Çin donanımıyla uyumlu; fastboot betiği cihazı doğruluyor, kilitleme yapmıyor, modem NV bölümlerine dokunmuyor.
- Mevcut durum zaten açık bootloader + yabancı mi_ext idi; xiaomi.eu bundan daha az kırılgan.

## Reddedilen alternatifler
- **Resmi global ROM:** 17 Pro için yok; olsa da Xiaomi Çin donanımına global flaşı engelliyor (brick riski).
- **Güncel stok Çin ROM + mi_ext hilesi tekrar:** veri korunurdu ama her güncellemede aynı hile elle tekrarlanacaktı; Xiaomi bunu da kapatabilir.
- **Stok Çin mi_ext geri yazıp OTA almak:** root gerekiyordu; KernelSU yöneticisi olmadığından shell'e root verilemedi.
- **Yazılmış IMEI'yi koruma/yedekleme/yeniden yazma:** Türkiye'de suç; Claude bu kısımda yardımcı olmadı. Meşru yol: gerçek IMEI için BTK ithalat kaydı.

## Sonuçlar / riskler
- Veri silindi (yedekler alındı). IMEI NV'de olduğu için flaş sonrası değişmedi; yasal durum aynen sürüyor.
- Banka/Wallet için Play Integrity "strong" geçmez (açık bootloader), öncekiyle aynı.
- HyperOS 4 geçişinde xiaomi.eu temiz kurulum isterse runbook tekrarlanır.

## İlgili
- [[xiaomi-17-pro]]
- [[2026-10-14-xiaomi-17-pro-kurulum-dersleri]]
