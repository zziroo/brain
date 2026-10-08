---
type: lesson
project: tussle
date: 2026-10-08
status: active
tags: [tussle, v8, performans, ajanlar, tarayici-paneli]
source: oturum 2026-10-08 (mobil-playus cila turu)
---

# Dersler: cila turu (V8 alan tahsisi, gizli panelde oyun testi, paralel ajanlar)

- **Sim sınıfında sayısal alanı `undefined` bırakma.** `private lo: number;` deyip constructor'da atamak Kule'nin "adım başına GC yok" testini sürekli kırdı (3 GC > 2); `private lo = 0.15;` gibi double ile ilklendirince geçti. V8 alan temsilini ilk değerden çıkarıyor. Sim dosyalarındaki mevcut alanlar da bu yüzden ilklendirilmiş; kuralı `docs/GAME-CONTRACT.md`'ye taşımak iyi olur.
- **Tarayıcı paneli gizliyken oyun döngüsü duruyor** (`visibilityState = hidden`, rAF kısılıyor). Oyun ajanları canlı oynayamadı; gerçek `view.ts` + `sim.ts`'i sayfaya import edip sahte saatle çizerek ekran görüntüsü aldılar. Doğru görsel çıktı ama **fps ölçümü değil**; fps telefonda `?debug=1` ile.
- **Paralel ajanlar aynı Vite'ı ve aynı localStorage'ı paylaşıyor:** her dosya kaydı diğerlerinin sayfasını yeniliyor, tema ayarını değiştiren ajan ötekini etkiliyor. Çözüm: ajanlar ayrı köken (`http://[::1]:5173`) ya da `data-theme` ile sekme içi deneme; ya da oyun ajanlarını sıralı çalıştırmak.
- **Görsel yönergeyi önce yaz, altyapıyı tek ajana kur, sonra dikey dilimler:** token adları ve kit API'si sabitlenince 4 oyun + 1 arayüz ajanı çakışmadan paralel bitti (her biri kendi klasörü).
- **İnceleme → şüpheci zinciri işe yaradı:** "gün ortası deploy melezi" bulgusu şüpheciyle doğrulanıp parametre+migrasyon çözümüne dönüştü; deploy zamanlamasına güvenmek yerine kod düzeltildi.
- **Gündüz temasında renkli yazı krem üstünde zayıf:** `theme.good`/`accent2` yazılar 3:1'in altında; `theme.light ? theme.text : renk` kalıbı kullanılıyor.
