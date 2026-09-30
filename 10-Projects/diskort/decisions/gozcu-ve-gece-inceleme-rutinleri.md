---
type: decision
project: diskort
date: 2026-09-29
status: active
tags: [diskort, rutin, otomasyon, code-review]
source: 5b97b763-8400-43fd-9e9e-ca9d48766518.jsonl, a7b70327-6e05-4060-a15b-293ddac27162.jsonl, 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl
---

# Karar: Geri bildirim + hata tarama (gözcü, saatlik) ve gece kod incelemesi yerel zamanlanmış görev olarak çalışır; gelen kutusu `.claude` dışındadır

## Bağlam
Geri bildirim kontrolü başta sadece "Görüldü" notu yazıyordu. 29 Eylül'de kullanıcı rutinlerin koordinatör sohbet yerine mi, rutin olarak mı çalışması gerektiğini sordu ("biz de kendi review ajanlarımızı kurmuştuk").

## Karar
- Saatlik "gözcü": yeni geri bildirimleri "incelendi" yapar, panel/sunucu hatalarını tarar, raporu gelen kutusuna yazar; yerel çökme (`yerel-çökme`) kayıtları her zaman çökme sayılır, yığın rapora konur. Günlük özet bildirimi (yerel 20:00-20:59) ilk etapta yeterli.
- Gece "güvenlik ağı": main'e girenleri bağımsız gözle inceler; orta+ bulgu yoksa doğrulayıcı ajan ve bildirim yok.
- Düzeltme ve yayın işleri rutine devredilmez; koordinatör sohbet yapar.
- Gelen kutusu `C:\Users\yusuf\diskort-inbox\`, gece rutininin işaret dosyası `C:\Users\yusuf\diskort-review\` (`.claude` altından taşındı).

## Neden
- `.claude` altındaki her yazma "hassas dosya" sayılıp her seferinde onay istiyordu; rutin gece yazamazsa takılı kalıyor ([[izin-istemleri-ve-rutinler]]).
- Gözcü ilk çalışmasında gerçek bir Skia çökmesini yakaladı.

## Reddedilen alternatifler
- Gelen kutusunu `.claude` altında bırakmak: sürekli onay.
- Rutinin kendisinin düzeltme yapması: kullanıcı kararı ve review kapısı gerektirir (oturumdaki değerlendirme; kullanıcı "evet böyle yap" dedi).

## Sonuçlar / riskler
- Gözcü tahmin yürütüyor; bir kez yanlış (bkz. [[gozcu-otomasyonu]]).

## İlgili
- [[gozcu-otomasyonu]], [[izin-istemleri-ve-rutinler]]
