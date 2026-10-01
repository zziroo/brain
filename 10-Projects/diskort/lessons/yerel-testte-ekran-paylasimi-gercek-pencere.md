---
type: lesson
project: diskort
date: 2026-10-02
status: active
tags: [diskort, test, ekran-paylasimi, gizlilik]
source: Claude Code oturumu 2026-10-01/02 (masaüstü UI ajanının yerel E2E testi)
---

# Yerel UI testinde ekran paylaşım seçicisi gerçek pencereleri gösterir; yanlış pencere yayınlanabilir

## Ne oldu
Masaüstü ajanı DM aramasında ekran paylaşımını CDP ile denerken seçici Yusuf'un gerçek pencere küçük resimlerini gösterdi (ekran görüntüsü alındı, açılmadan silindi). İlk denemede kurulu Diskort penceresi 1–2 sn yerel LiveKit'e yayınlanmış olabilir; kimse izlemiyordu, hemen durduruldu, test verisi silindi.

## Ders
- Ekran paylaşımı testinde seçici ekranının görüntüsünü alma.
- Test penceresine benzersiz bir başlık ver ve yalnız onu seç; mümkünse sahte medya kaynağı kullan.
- Testten sonra yayın önizlemeleri dahil yerel test verisini sil.

## İlgili
- [[yerel-ui-test-ortami]], [[electron-cdp-testi]]
