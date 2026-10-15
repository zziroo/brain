---
type: session
project: kisisel
date: 2026-10-15
status: active
tags: [cihaz, xiaomi, hyperos, bildirim]
source: Oturum "kişisel: Xiaomi 17 Pro bildirim sorunu" (2026-10-15)
---

# Oturum: Xiaomi 17 Pro'da gecikmeli bildirim teşhisi ve FCM Fix kurulumu

- **Belirti:** WhatsApp bildirimleri yalnızca uygulama açılınca; pil ayarları zaten açıktı.
- **Teşhis (adb):** GMS'in FCM bağlantısı 11:49'da kopmuş, 3,5 saat bağlanmamış; neden HyperOS dondurucusunun (GreezeManager) GMS'i günde yüzlerce kez dondurması. Komutlar ve bulgular: [[2026-10-15-hyperos-gms-dondurma-bildirim]].
- **Denenen:** adb ile `MILLET_NO_RESTRICT_APP` listesine GMS eklendi; işe yaradı ama powerkeeper ~50 dk sonra ve FCM Fix kurulurken listeyi geri yazdı. Arayüzde GMS için pil seçeneği yok.
- **Karar ve kurulum:** [[2026-10-15-xiaomi-17-pro-fcm-fix-karari]]. Shizuku Mac'ten başlatıldı; "USB hata ayıklama (Güvenlik ayarları)" açılınca izin verildi, "Protection active" ve FCM "Connected" doğrulandı (`*#*#426#*#*`).
- **Doğrulanmayan:** ekran kapalı uzun süre (gece) sonrası teslimat; yeniden başlatma sonrası Shizuku akışı Yusuf tarafından henüz denenmedi.
- **Açık işler:** FCM Fix ve Shizuku'ya arayüzden "Kısıtlama yok" vermek; WhatsApp'ı son uygulamalarda kilitlemek. [[xiaomi-17-pro]] içinde.

## İlgili
- [[xiaomi-17-pro]]
