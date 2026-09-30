---
type: lesson
project: diskort
date: 2026-09-29
status: unverified
tags: [diskort, ses, livekit, telemetri, ag]
source: 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl
---

# Ses/yayın kopmaları: paket kaybı sunucuya giden yolda ve yalnız UDP'de; telemetri ölçümleri eksikti

## Gözlemler (29-30 Eylül)
- Kopmalarda odadaki herkeste aynı saniyelerde giden paket kaybı (%3-44); aynı dakikalarda sunucuya ping kaybı yok (gecikme 20-27 ms). Kayıp yalnız UDP ses/yayın paketlerinde.
- Bir Android kullanıcısı (kötü bağlantı, sık ping timeout) sesleri kötü duyuyordu; uygulamayı silip kurması düzeltmedi, sesten çıkıp girmek de uygulamayı yeniden başlatmaz (ses altyapısı bellekte kalır: WebRTC ses cihazı katmanı, DPDFNet); temiz kurulum kalıcı ayarları (`diskort-settings`) siler ama kök neden kanıtlanamadı.
- "Clock skew" uyarısı herkeste var (14 / 13 / 56 kez), zararsız ölçüm artığı; ilk çıkarım ("telefon gerçek zamanın 1/6'sı kadar ses üretiyor") yanlıştı, geri alındı.
- Linux'ta tanınmayan yayın paketleri "dropped" sayılıyor (3 günde 51 bin), ağ kartı sorunu değil.
- Gelen ses telemetrisi bugüne kadar hiç çalışmıyormuş (LiveKit sürümü tek bağlantı kullanıyor, kodumuz ikinci bağlantıya bakıyordu); 0.8.13'te düzeltildi, makine ağ geçmişi Altyapı sekmesinde.

## Ders
Gözlemden hemen sonuç çıkarma; telemetri alanları boşsa kanıtlayamazsın. `status: unverified`: sunucu yolu nedeni bir tahmin, hosting sağlayıcısıyla doğrulanmadı.
