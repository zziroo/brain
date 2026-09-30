---
type: session
project: diskort
date: 2026-09-30
status: done
tags: [diskort, dpdfnet, gurultu-engelleme, surum]
source: 69fe2863-181c-42b1-bef7-d93dd8e73177.jsonl ("SNN kullanıcısı DPDF ayarı kapanması")
---

# Oturum: oyun sırasında gürültü engelleyici (DPDFNet) düşmesi ve 0.9.3

## Ne yapıldı
- Şikayet: oyundayken DPDFNet kapanıyor, arka plan sesleri geliyor ama yeşil halka yanmıyor, ayarda standarda geçtiği görünmüyor; uygulamayı kapatıp açınca düzeliyor.
- Ajan incelemesi + telemetri (28-30 Eylül): 3 kullanıcıda görüşme ortasında DeepFilterNet'e düşme; işlemci yükü düşüşün tetikleyicisi değil (önceki 30 sn %37-51). Yeşil halka sorunu: iki mikrofon yenilemesi üst üste gelince yarış.
- Düzeltme: mikrofon kurulumları sıraya girer; yetişemezse tarayıcının standart engellemesine düş, birkaç dk sonra DPDFNet yeniden denenir, görüşmeden çıkmaya gerek yok; başlık çubuğunda simge ile bildirim.
- DeepFilterNet 3 kaldırıldı: [[deepfilternet-3-kaldirildi]].
- Geri bildirimler ve son 3 günün hataları tarandı: açık geri bildirim yok (30 tamamlandı, 1 reddedildi), hatalar ağ/zararsız.
- **0.9.3** yayınlandı (0.9.3 kozmetik "üzerine gelince oynar" işi ve bu düzeltmeyle), sunucu da güncellendi (telemetri alanları değişti).

## Alınan kararlar
[[deepfilternet-3-kaldirildi]]

## Açık kalanlar
- Canlı (CDP) testi yeniden çalıştırılmadı; son düzeltmeler birim testleri ve tip denetimiyle doğrulandı. Uçtan uca testin DPDFNet'i gerçekte çalıştırmadığı review bulgusu (orta) not edildi; çözümü bu kayıtta görünmüyor (status belirsiz).
