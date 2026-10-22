---
type: decision
project: tussle
date: 2026-10-20
status: active
tags: [tussle, pazarlama, lansman, olcum, davet]
source: "oturum 2026-10-20 (mobil-playus: pazarlama)"
---

# Karar: Mağazaya sessiz yayın ile tanıtım hamlesi ayrı; tanıtım ancak çıkış çizgisi tutunca

## Bağlam
Yusuf "önce tüm oyun hazırlıkları mı bitsin, lansman günü ne kadar önemli" diye sordu. Ölçüm altyapısı yok (olay kaydı, günlük aktif, davet eden, kaynak/UTM, gelir tutarı, paylaşım kartı, puan isteme yok; gizlilik metni "analitik yok" diyor).

## Karar
- Kapalı test dolunca mağazaya **sessiz** yayın (çevreyle); tanıtım (video, influencer, reklam) ayrı ve sonra.
- **Çıkış çizgisi** (tanıtım için): davet akışı kısaltılmış + ölçüm/huni çalışıyor + 2-3 canlı/arena oyunu hazır. Geri kalan güncelleme olarak gelir.
- 90 gün: ölçüm/hazırlık → organik büyüme → ücretli test; kapılar: huni canlı, sonra 1. gün ≥ %35 / 7. gün ≥ %15 (kaba referans). Bütçe kademeleri 0 / ~5-15 bin ₺ / 30 bin ₺+.
- Davetli tanıtım slaytlarını başta görmez: bekleyen oda varsa doğrudan isim → oda; ilk maçtan sonra "Tussle'ı tanı" kartı. Davetsiz gelen slaytları görür (Yusuf onayladı).
- Ölçüm için üçüncü taraf SDK yerine kendi olay tablomuz önerildi (karar Yusuf'ta).

## Neden
Mağaza tutunma/yorum/çökme oranına sürekli bakar; lansman günü sanıldığı kadar belirleyici değil (Among Us, Flappy Bird geç patladı), ama ilk 100-200 yorum ve ilk haftaların tutunması ortalamayı uzun süre etkiler. Ölçümsüz tanıtım bütçeyi körlemesine yakar.

## Reddedilen alternatifler
- Her şey bitince tek büyük lansman: sonsuz beklemeye döner.
- Hemen ücretli reklam: tutunma kanıtlanmadan para yanar.

## Sonuçlar / riskler
Davet akışı bulguları (20 Eki, eski kod): uygulamasız davetlide oda kodu kurulumdan sonra kayboluyor (sessionStorage; Install Referrer yok), kapalı testte 3 adım, canlı maçı yalnız ev sahibi başlatıyor. Öneriler: Play Install Referrer, "kodu kopyala" + panodan okuma, davetliye tanıtımı atlatma, isim önerisi, davet → açık kapışma lobisi (his kararı Yusuf'ta). 22 Eki'ye kadar kod çok değişti; **yeniden taranmalı** (status: unverified).

## İlgili
- [[2026-10-20-pazarlama-konumlandirma-canli-kapisma]]
- [[2026-10-20-tussle-pazarlama-plani]]
