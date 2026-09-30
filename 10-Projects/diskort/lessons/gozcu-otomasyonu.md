---
type: lesson
project: diskort
date: 2026-09-30
status: active
tags: [diskort, rutin, otomasyon, gozcu, code-review]
source: 51 gözcü/geri bildirim kontrolü oturumu + 5 gece kod incelemesi oturumu, 28-30 Eylül 2026 (örnekler: 58145b96-b834-4f08-90d3-1c455ec61b06, 41d5023d-17be-4a3f-a63e-bf6ef373f5f1, 9a6b6c58-b57e-42aa-aa8d-37e2a52e406b, f8c945de-b625-463c-bbca-21178960a9d1, ab21fab2-841d-45bf-9fd1-09d783b288d4)
---

# Gözcü ve gece güvenlik ağı otomasyonu: ne yapıyor, ne sıklıkta, işe yaradı mı

## Ne yapıyor
- **Geri bildirim kontrolü** (28 Eylül 14:54'ten, saatlik): sunucudan "yeni" geri bildirimleri çeker, "incelendi" yapıp "Görüldü" notu yazar, önemliyse bildirim yollar. 29 Eylül 11:20'den itibaren **"gözcü: geri bildirim + hatalar"**: panel/sunucu hata gruplarını da tarar, raporu `diskort-inbox` altına yazar, `durum.json` ile taranan zamanı ilerletir, günlük özet (yerel 20:00-20:59). Bulgu yoksa hemen durur ("Yeni bir şey yok").
- **Kod incelemesi**: ilk kurulumda günde 2 (13:20/23:20), sonra her gece 00:00 (~00:10), 29 Eylül'den "gece güvenlik ağı": son incelenen commit'ten beri main'e girenleri okur; orta+ bulgu yoksa doğrulayıcı ajan ve bildirim yok.

## Sıklık (bu dizinde)
67 kayıttan 51'i gözcü/geri bildirim oturumu (çoğu sıfır kullanıcı mesajı, ~0,3 MB), 5'i gece kod incelemesi (aralık örnekleri: 14, 29, 32, 1, 35 commit). Boş çalışma maliyeti çok düşük (yaklaşık 0,14 $ liste fiyatı, 28 Eylül asistan tahmini).

## Tipik bulgular
- Yeni geri bildirimler: #26, #27 (toast/APK eki), #28/#29 (profil teması çökmesi), #30 (seste parazit), #31 (sunucu çubuğu rozeti).
- Hata grupları: ilk çalışmada gerçek Skia JSI ölümcül çökmesi; sonra yerel çökme kayıtları (0.8.10'dan); çoğunluk ağ kaynaklı LiveKit kopmaları, ping timeout, giden paket kaybı; zararsız uyarılar (DUPLICATE_IDENTITY, closed peer connection, track was not unpublished, "unknown track", data channel kapanması); kozmetik "çok fazla dosya oynuyor" (0.9.2).
- Gece incelemeleri: 5'inde de orta+ bulgu yok (ör. izleyici listesi temizliği, şema 23, `PATCH /api/me`, sürüm iş akışı, APK ekinin güvenli açılması).

## İşe yaradı mı
- Evet: ilk koşuda gerçek çökmeyi yakaladı; #31'i "planlandı" yapıp akışa soktu; zararsız kayıt listesi sayesinde gürültü azaldı.
- Sınırlar: tahmin yürütüyor, bir kez yanlış (telefonda zaten Skia'lı 0.8.5 APK vardı; "Skia'sız eski APK" tahmini geçersizdi). Gece incelemesi Skia/WebGL çizim kodunu "kullanıcı verisiyle çalışmaz" diye okumamıştı ve #28 tam oradan çıkmıştı. Bildirim aracı, terminal açıkken bildirimi gereksiz sayıp göndermedi (günlük özet bildirimi iki kez atlandı). Saat dilimi (UTC+3) varsayımı kullanıldı.
- İzinler ve dosya yolları: [[izin-istemleri-ve-rutinler]], [[gozcu-ve-gece-inceleme-rutinleri]].
