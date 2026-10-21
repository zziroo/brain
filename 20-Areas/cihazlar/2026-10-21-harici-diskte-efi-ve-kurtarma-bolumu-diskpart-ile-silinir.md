---
type: lesson
project: genel
date: 2026-10-21
status: done
tags: [cihazlar, windows, disk, diskpart, robocopy]
source: Windows ZZ kök oturumu 2026-10-21 "eski H: diskinin son kontrolü ve sıfırlanması"
---

# Eski sistem diskini USB diske çevirmek için Disk Yönetimi yetmez; diskpart clean gerekir

## Ne oldu
Eski Windows diski (MP510) USB'ye takılıyken Disk Yönetimi'nde ana bölüm silindi ama 200 MB EFI ve 918 MB Kurtarma bölümlerinde "Birimi Sil" çıkmadı. Windows bu bölümleri korumalı sayıyor.

## Ders
- Bütün diski silmek için yönetici terminalde `diskpart`: `list disk` → `select disk N` → `detail disk` (C:/D: görünmediğini doğrula) → `clean` → `convert gpt` → `create partition primary` → `format fs=exfat quick label=...` → `assign`.
- `clean` onay sormaz; disk numarasını boyuttan ve `detail disk` çıktısından doğrulamadan çalıştırma.
- Mac ile de kullanılacak harici diskte exFAT seç; Mac NTFS'ye yazamaz.
- Claude bu tür geri dönüşsüz disk silme işlemlerini kendisi çalıştırmaz (otomatik mod da engelliyor); komutları verir, Yusuf çalıştırır.

## Yan ders: robocopy çıkış kodları
Arka planda çalışan robocopy 1 ya da 3 kodu döndürünce görev "failed" görünüyor. Bunlar hata değil: 1 = dosyalar kopyalandı, 3 = kopyalandı ve hedefte fazladan klasör var. 8 ve üstü gerçek hatadır. Sonucu logdaki FAILED sütunundan ve dosya sayısı/bayt karşılaştırmasından anla.

İlgili: [[2026-10-21-arizali-diskten-yeni-diske-gecis-ve-arsiv-duzeni]]
