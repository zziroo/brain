---
type: session
project: diskort
date: 2026-09-27
status: done
tags: [diskort, ota, ses, roller, dm, geri-bildirim]
source: C--dev-diskort 126a55f0-b1bf-4c1c-97ce-39daa8895424.jsonl
---

# Oturum: OTA güncelleme, DeepFilterNet 3, roller, DM, geri bildirim sistemi

## Ne yapıldı
- Android APK derlemeleri yavaştı (tek adım ~9,5 dk): mobil için OTA (expo-updates, kendi sunucumuz) ve hızlı test derlemesi kuruldu.
- Kullanıcı Krisp kalitesi istedi: LiveKit'in Krisp'i yalnızca LiveKit Cloud'da; RNNoise yerine DeepFilterNet 3'e tam geçildi (karşılaştırma testi yapılmadan, gerçek kullanımla değerlendirme).
- Paralel işler: ajanlar ayrı worktree'lerde (ses, tepkiler/dosya, sonra roller + DM). Yayın bitrate'i ve düşük kalite katmanı için 5 TB trafik kotası not edildi.
- Android: ekran paylaşımı istatistik satırı, kalıcı bildirimin yayın bitince kalkması, pencere teması (bildirim panelleri), dosya yedeği.
- Masaüstünde ekran paylaşımı GPU yerine CPU ile kodlanıyordu: ayrı araştırma işi açıldı.
- Roller, DM, mobil yayın izleme arayüzü, mobil UI baştan, GIF arama (API anahtarı kullanıcıdan), "Yenilikler" sayfası (bildirim değil, uygulama içi).
- Kullanıcı geri bildirim mekanizması istedi; uygulama içi form + CLI ile işleme alma kuruldu.
- Sürümler: 0.2.1 -> 0.5.3 (sunucu şeması 13).
- 0.5.3: seste iken uygulamadan çıkıp dönünce sesin kesilmesi düzeltildi; telefonda doğrulanmadı (kullanıcıdan test istendi).

## Alınan kararlar
- [[mobil-ota-guncelleme-kendi-sunucuda]]
- [[gurultu-engelleme-dpdfnet-varsayilan]]
- [[geri-bildirim-sistemi-uygulama-ici]]

## Öğrenilenler
- [[apk-derleme-suresi-ve-hizli-test-yolu]]
- [[test-apk-surumu-son-surumden-yuksek-olmali]]

## Açık kalanlar
- Sürüm etiketi ("canlıya çıkış") sistem tarafından engellendi, kullanıcı onayıyla (0.2.1) yapıldı.
- Masaüstü ekran paylaşımı donması ve CPU kodlama araştırması sonuçları sonraki oturumda.
