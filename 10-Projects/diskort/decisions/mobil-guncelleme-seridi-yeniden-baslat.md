---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [diskort, mobil, ota, guncelleme]
source: 5b97b763-8400-43fd-9e9e-ca9d48766518.jsonl
---

# Karar: Mobilde OTA güncellemesi masaüstü gibi üstte şerit olarak gelir, uygulama kendiliğinden yeniden başlamaz

## Bağlam
0.8.2 sonrası mobil OTA güncellemesi uygulama arka plana gidip dönünce kendiliğinden reload ediyordu. Kullanıcı "uygulama açıkken kullanan adam atılıyor mu?" diye sordu; masaüstünde ise yeşil indirme simgesiyle kullanıcı karar veriyor.

## Karar
Güncelleme inince üstte "Diskort X hazır" şeridi ve yeşil "Yeniden başlat" düğmesi çıkar; kapatma (x) mümkün. Kendiliğinden yeniden başlatma yok. 0.8.3'ün kendisi eski yöntemle geldi (bir kez otomatik reload), sonraki sürümler şeritle.

## Neden
Masaüstüyle tutarlılık ve kontrolün kullanıcıda olması; yazılmakta olan mesaj taslağı kaybolmasın. Kullanıcı seçenekler arasından "2" dedi.

## Reddedilen alternatifler
- Otomatik reload (mevcut davranış): kullanıcıyı habersiz atıyor, taslaklar risk altında.
- Yalnızca sessiz indirip bir sonraki açılışta uygulamak: kullanıcıya haber vermiyor.

## Sonuçlar / riskler
- Telefonda gerçek denemesi yapılmadı (oturumda tip kontrolü temiz). Bazı sürümlerde native parmak izi değişirse OTA gitmez, yeni APK gerekir: [[skia-native-yukleme-cokmeleri]].

## İlgili
- [[2026-09-28-handoff-temizlik-ve-0-8-3]]
