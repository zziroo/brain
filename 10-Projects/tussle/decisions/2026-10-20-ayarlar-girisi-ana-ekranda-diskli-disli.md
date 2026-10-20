---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, ui, ayarlar, ana-sayfa, dugme]
source: "oturum 2026-10-20 öğleden sonra (mobil-playus: ayarlar girişi, açılış, splash, Android Apple girişi)"
---

# Karar: Ayarlar girişi ana ekranda avatarın solunda diskli dişli; profildeki dişli kalktı

## Bağlam
Ayarlar yalnız profilin sağ üstündeki dişliden açılıyordu ([[2026-10-17-profil-ekrani-kapsami]]); ana ekrandan bulunması zordu.

## Karar
- Ana ekranda avatarın solunda odadaki gibi diskli dişli (`btn-icon btn-light`, 44 px); avatar 48 → 44 px (ikisi aynı boy).
- Profildeki dişli kaldırıldı: ayarlara tek giriş.
- Mockuplar repo `src/client/mockups/ayarlar-*.png`.

## Neden
- Seçenekler Önce / A iki düğme / B tek kapsül / C avatar rozeti + menü gösterildi; Yusuf A'yı seçti.
- Zeminsiz küçük dişli (Playus örneği) denendi, Yusuf diskliyi seçti: bütün düğmeler aynı dil.

## Reddedilen alternatifler
- B tek kapsül, C avatar rozeti + menü: Yusuf A'yı seçti.
- Zeminsiz dişli: Yusuf diskliyi tercih etti.
- İki kademeli düğme ölçeği (birincil diskli / ikincil zeminsiz): öneri bu yüzden rafa kalktı.

## Sonuçlar / riskler
- Avatar → profil ortak öğe geçişi 44 px avatarla telefonda bakılmadı (doğrulanmadı).

## İlgili
- [[2026-10-20-tussle-ayarlar-acilis-splash-android-apple]] · [[2026-10-17-profil-ekrani-kapsami]] (ayarlar girişi kısmı değişti)
