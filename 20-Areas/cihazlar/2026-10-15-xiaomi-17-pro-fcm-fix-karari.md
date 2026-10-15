---
type: decision
project: kisisel
date: 2026-10-15
status: active
tags: [cihaz, xiaomi, hyperos, xiaomi-eu, bildirim, shizuku]
source: Oturum "kişisel: Xiaomi 17 Pro bildirim sorunu" (2026-10-15)
---

# Karar: Gecikmeli bildirim için Shizuku + HyperOS FCM Fix kuruldu, ROM/sistem ayarına dokunulmadı

## Bağlam
xiaomi.eu (Çin tabanlı HyperOS 3) kurulumundan sonra WhatsApp ve diğer uygulamaların bildirimleri ancak uygulama açılınca geliyordu. Teşhis: HyperOS dondurucusu Google Play Services'i donduruyor, FCM bağlantısı kopuyor; ayrıntı [[2026-10-15-hyperos-gms-dondurma-bildirim]]. Pil menüsünde GMS için "Kısıtlama yok" seçeneği yok (sistem uygulaması); adb ile listeye eklemek işe yarıyor ama powerkeeper listeyi geri yazıyor. Yusuf'un şartı: pil ömrü kötüleşmesin.

## Karar
Telefona **Shizuku** (v13.6.0) ve **HyperOS FCM Fix** (dingwen07, v0.3.1) kuruldu. Uygulama Google Play Services'i 30 saniyede bir muafiyet listesinde tutuyor ve dondurucunun GMS kısıtını kapatıyor. Pil yiyen seçenekler (uygulamalar için "Unrestricted", gece koruması) açılmadı. Bunun için Geliştirici seçeneklerinde "USB hata ayıklama (Güvenlik ayarları)" açıldı.

## Neden
- Topluluk tarafından aynı teşhisle doğrulanmış, root istemeyen tek kalıcı çözüm; kaynak kodu açık (GPL), APK hash'i doğrulandı.
- Yaptığı şey global ROM'ların zaten yaptığı: GMS'i dondurmamak. Pil maliyeti önemsiz; GMS'in bugünkü pil payı %1'in altındaydı ve bunun bir kısmı 331 kez dondurulup çözülmenin kendisiydi.
- Geri alınabilir: iki uygulamayı kaldırmak yeterli.

## Reddedilen alternatifler
- **Yalnız adb ile `MILLET_NO_RESTRICT_APP` düzenlemek:** powerkeeper ~1 saat içinde ve her paket kurulumunda geri yazıyor; kalıcı değil.
- **Her yeniden başlatmada adb'den `dumpsys greezer IM GMS disable` vermek:** bellekte kalıyor, Mac gerektiriyor; sürdürülebilir değil.
- **"MIUI/Sistem optimizasyonu"nu kapatmak:** topluluk bazen öneriyor, ama izin arayüzü ve başka MIUI davranışları değişiyor; etkisi bu dondurucu üzerinde doğrulanmadı (`status: unverified`).
- **powerkeeper'ı kaldırmak:** Reddit'te bootloop ve öngörülemez davranış raporları; çok riskli.
- **Global ROM:** cihaz için yok (bkz. [[2026-10-14-xiaomi-17-pro-xiaomieu-secimi]]).

## Sonuçlar / riskler
- Her yeniden başlatmada Shizuku'nun yeniden başlatılması gerekir (Kablosuz hata ayıklama ile ya da Mac'ten); FCM Fix, Shizuku gelince kendini toparlıyor. Unutulursa belirti geri gelir.
- "USB hata ayıklama (Güvenlik ayarları)" açık kaldı; telefon kaybolursa adb erişimi olan birine daha fazla yetki verir. Kilit ekranı ve USB yetkilendirme onayı yine de gerekir.
- Shizuku açıkken bazı banka uygulamaları (Reddit: Revolut) sorun çıkarabiliyor; yaşanırsa önce bu şüphelenilecek.
- Bir sonraki xiaomi.eu OTA'sı sonrası koruma kontrol edilmeli.

## İlgili
- [[xiaomi-17-pro]]
- [[2026-10-15-hyperos-gms-dondurma-bildirim]]
- [[2026-10-15-xiaomi-17-pro-bildirim-oturumu]]
