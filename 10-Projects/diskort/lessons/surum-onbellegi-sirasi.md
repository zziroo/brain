---
type: lesson
project: diskort
date: 2026-09-29
status: active
tags: [diskort, sunucu, cache, apk, surum]
source: 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl
---

# Yama notları APK'dan önce gelebiliyordu: iki ayrı önbellek

- `/api/releases` (yama notları) önbelleksiz/erken tazeleniyor, APK sürüm bilgisi kendi 5 dakikalık önbelleğinde eski sürümü tutuyordu; telefon 15:53'te "en son APK 0.8.5" gördü, önbellek 15:54:51'de yenilendi.
- Düzeltme: sunucu, bildiği en son APK sürümünden yeni bir notu göstermez; son sürümü önbellekten okuyan fonksiyonun log/başka kullanımlarını da gözden geçirmek istendi.
- Ders: yeni APK yayınlanınca birkaç dakika bekle; notlar APK'dan önce görünebilir (düzeltmeden önceki davranış).
