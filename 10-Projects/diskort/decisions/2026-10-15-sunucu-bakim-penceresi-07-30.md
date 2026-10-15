---
type: decision
project: diskort
date: 2026-10-15
status: active
tags: [sunucu, bakim, guvenlik-guncellemesi]
source: diskort oturumu 2026-10-15 (canlı durum doğrulama ve güncelleme planı)
---

# Karar: Sunucu bakımı ve otomatik yeniden başlatma 07:30 İstanbul'da yapılır; ilk toplu güncelleme 2026-10-16 07:30'a planlandı

## Bağlam
LightNode sunucusunda 1 Ekim'den beri apt çalışmadı: 143 güvenlik + 86 diğer paket bekliyor; çekirdek 6.8.0-62 → 146 (yeniden başlatma şart), openssh-server, libc6, openssl, systemd, sudo. unattended-upgrades imajda maskeli, periyodik apt kapalı. Hazır `52diskort-auto-reboot` dosyası yeniden başlatmayı 05:00'e koymuştu.

## Karar
- Bakım penceresi **07:00–09:00 İstanbul**; toplu güncelleme ve reboot **2026-10-16 ~07:30**'da, Yusuf "başla" deyince.
- unattended-upgrades açılırken `Automatic-Reboot-Time` **07:30** olur (05:00 değil).
- Adımlar: katılımcı 0 mı (`livekit_participant_total`) → `backup-db.sh` → etkileşimsiz `dist-upgrade` (`systemd-run` ile, ssh kopması öldürmesin) → yeni ssh oturumu + `sshd -T` sertleştirme kontrolü → reboot (1-2 dk) → konteynerler/health/ufw/sysctl/`latest.yml` kontrolü → unattended-upgrades unmask+enable, `20auto-upgrades` 1/1 → overview güncelle.

## Neden
Son 14 günün `voice_sessions` tablosundan saatlik doluluk çıkarıldı: 07:00–09:00 arasında hiçbir gün kanal dolu değil; 04:00–06:00 arası 14 günün ~5'inde hâlâ dolu, 16:00–02:00 yoğun. 05:00 reboot'u gece oturumlarını keserdi.

## Reddedilen alternatifler
- 05:00 reboot (hazır dosya): gece 04-06 arası kanal sık dolu.
- Hemen kurmak (15 Ekim akşam): kanalda 4 kişi vardı.
- Yalnız güvenlik paketlerini kurup çekirdeği bekletmek: çekirdek güncellemesi de güvenlik içeriyor, reboot zaten gerekiyor.

## Sonuçlar / riskler
- openssh yükselirken ssh ~90 sn düşer; systemd yükselmesi konteynerleri etkilemez.
- Çekirdek 146 açılmazsa LightNode web konsolundan GRUB'da eski çekirdek (62) seçilir.
- Doluluk ölçme yöntemi (voice_sessions saat histogramı) [[sunucu-vps]] runbook'unda.

## İlgili
- [[sunucu-vps]] · [[sunucu-lightnode-istanbula-tasindi]] · [[ssh-yalnizca-anahtar-ile]]
