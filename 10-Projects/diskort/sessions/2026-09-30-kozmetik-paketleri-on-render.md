---
type: session
project: diskort
date: 2026-09-30
status: done
tags: [diskort, kozmetik, mimari, surum]
source: 54dc3a33-8a43-4d66-8774-07b1dfa4d58f.jsonl ("Dekoratif tasarımlar yönetimi")
---

# Oturum: kozmetikleri sunucudan gelen ön-render paketlere geçirme, 0.9.2

## Ne yapıldı
- Soru: yeni set eklemek sürüm gerektiriyor mu? Cevap: evet (set listesi kodda, çizim kodda). Yönlendirilen fikir: ücretsiz "mağaza" (sunucudan paket).
- Deney: Buz seti 6 sn kesintisiz döngü, çevrimdışı render; animated WebP çok büyük (kart 6-22 MB), kart için video/AVIF 0,28-1 MB. Altı set döngü biçimine çevrildi (ajanlar), Saturn isim kartı sağa dayandı (yapılmadı, sonraya).
- Mimari: [[kozmetik-paketleri-sunucudan-on-render]]; altyapı (paket deposu, yükleme komutu, liste yenileme 10 dk) + masaüstü oynatıcı + telefon oynatıcı (Skia video, Android 8 min SDK, Skia yaması), birkaç review/skeptic turu.
- Geri bildirim #31 (sunucu çubuğunda ses/yayın rozeti), profil rengi seçici kaldırıldı: [[profil-rengi-secici-kaldirildi]].
- AVIF solukluk sorunu: [[avif-solukluk-renk-araligi]].
- **0.9.2** yayınlandı; telefonda takılma/kalitesizlik görününce [[kozmetik-yalnizca-uzerine-gelince-oynar]] kararı, 0.9.3 bekletildi.

## Alınan kararlar
[[kozmetik-paketleri-sunucudan-on-render]], [[android-min-surum-8]], [[profil-rengi-secici-kaldirildi]], [[kozmetik-yalnizca-uzerine-gelince-oynar]]

## Öğrenilenler
[[avif-solukluk-renk-araligi]], [[ajan-calisma-tuzaklari]]

## Açık kalanlar
- Telefonda video oynatma gerçek cihazda yeterince doğrulanmadı.
- Masaüstünde küçük avatarlarda süs sabit kare; plakalı satırlarda kırpılma olup olmadığı sürüm öncesi bakılacaktı.
- 0.9.3 kullanıcının diğer işinden sonra çıkarılacak (bkz. [[2026-09-30-dpdfnet-dusmesi-ve-0-9-3]]).
