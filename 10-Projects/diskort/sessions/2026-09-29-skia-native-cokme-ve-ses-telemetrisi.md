---
type: session
project: diskort
date: 2026-09-29
status: done
tags: [diskort, skia, telemetri, ses, ios, surum]
source: 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl ("diskortumuzu gelistiriyoruz")
---

# Oturum: 0.8.9-0.8.13, yerel çökme raporlayıcı, ses telemetrisi, iPhone cihaz ekleme

## Ne yapıldı
- #29'u tamamlandı yaptı; sayfa geçişinde kasma videosu incelendi (Üyeler sekmesinde her satırda Skia plaka, uzak sekmeye geçişte boş sayfa) ve düzeltildi: **0.8.9**.
- #28/#29 çökmesi 0.8.9'da da sürdü (yalnız HONOR cihazda); native çökme raporlayıcı (Kotlin) yazıldı, review + skeptic turlarından geçti, **0.8.10** APK. Sunucuda APK sürüm bilgisi ve yama notu için iki ayrı 5 dakikalık önbellek sırayı bozdu: [[surum-onbellegi-sirasi]].
- Rutin talimatı `yerel-çökme`yi çökme sayacak şekilde güncellendi. **0.8.11** (Skia yükleme kök nedeni, bkz. [[skia-native-yukleme-cokmeleri]]), **0.8.12** (renk kutucuğu NaN düzeltmesi; yayın kartındaki "2 izleyici" satırı geri alındı).
- Ses kalitesi incelemesi: [[ses-kalitesi-udp-kayiplari]]. Telemetriye makine ağ geçmişi, gelen ses ölçümü (daha önce hiç çalışmıyormuş), uygulama takılması ve ses ayarları eklendi; DPDFNet dalına sıcaklık/takılma izleme.
- **0.8.13** (yeni Android APK, zorunlu güncelleme ekranı). Sunucu şema 24.
- Yeni iPhone'un Ad Hoc kaydı: [[ios-adhoc-cihaz-ekleme]].
- İzin sorunu: rutin ve gelen kutusu taşındı: [[izin-istemleri-ve-rutinler]].
- 30 Eylül 00:26'da sunucuya bağlantı kırmızı oldu: sunucu sağlıklı, yine yol; LiveKit'i ayrı sunucuya taşıma konuşuldu (yalnız LiveKit taşımak yeter, adresler ayardan geliyor). Sonuç bu kayıtta yok.

## Alınan kararlar
[[livekit-ayri-sunucuya-tasima-degerlendirmesi]]

## Öğrenilenler
[[skia-native-yukleme-cokmeleri]], [[surum-onbellegi-sirasi]], [[ses-kalitesi-udp-kayiplari]], [[ios-adhoc-cihaz-ekleme]]

## Açık kalanlar
- Sunucu yolu/UDP kayıpları kökten çözülmedi (hosting sağlayıcısı/taşıma kararı açık).
- Yeni oturumdaki çökme/tema sorunu ametion onayı sonrası tekrar beklenecekti; sonuç kayıtta yok.
