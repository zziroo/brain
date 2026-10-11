---
type: decision
project: tussle
date: 2026-10-11
status: active
tags: [tussle, hud, yaris-seridi, karar]
source: oturum 2026-10-10/11 (mobil-playus: günlük şerit, üst düzen)
---

# Karar: Oyun içi üst düzen şerit → durum etiketi → kısa süre çubuğu → skor; günlük oyunda da sabit işaretli şerit

## Bağlam
Kapışmadaki yarış şeridi beğenildi. Yusuf günlük oyunda da bir şerit istedi ama "hareketli olursa odak bozulur". Sonra Playus ekranlarını yerleşim örneği olarak gösterdi (üstte oyuncular, altında süre çubuğu, ortada "La puntuación cuenta" yazısı).

## Karar
- **Günlük oyun şeridi** (sayılan deneme ve Deneme turu; Antrenman ve link oyununda yok): bugün oynayanların en iyileri sabit işaret, yalnız kendi noktan hareketli (yerel 10 Hz, ağ yok). En çok 4 işaret: lider + önündeki 2 + arkandaki 1. Bugünkü en iyin ince bir çentik. Kimse oynamadıysa şerit yok.
- **Geçme anı** her iki şeritte yazısız: noktan zıplar, geçilenin üstünde 0,5 sn minik ✓ (Yusuf: "geçtin yazmasına gerek yok, ufak bir işaret yeter").
- **Yakın işaretler** yan yana, hafif iç içe avatar grubu (en çok 3, fazlası solda "+n"). Dikey kaydırma denendi, "garip" bulundu.
- **Üst düzen** yukarıdan aşağı: şerit (kapat düğmesinin yanında; sağda da aynı boşluk, ortalı) → durum etiketi (Puan sayılıyor / Deneme turu / Kapışma; Antrenman'da yok) → ortalı %60 genişlikte süre çubuğu, **saniye yazısı yok**, son 5 sn kırmızı + hafif nabız (enerji çubuklarında yok: bambu, spiral) → skor satırı. Her ekranda aynı sıra; kısa ekranda yalnız aralıklar küçülür.
- **Şerit görünümü dolu sticker kutu.** İnce çizgiye çevrilmişti (süre çubuğuyla karışmasın diye), yeni düzende karışma kalmayınca geri döndü.
- Şerit varken oyunlar üstte yer ayırır (`Viewport.band`); örtü/gölge bantları `hud.edge`, içerik `hud.bottom` kullanır (`docs/GAME-CONTRACT.md` §5). Yalnız görünüm: sim, girdi eşlemesi, skor ve altın tekrar testleri değişmedi (inceleme doğruladı: girdi `vp.field`'a göre normalleşir).
- Tek koşu süresi kuralı: toplam süre yalnız ortak çubukta; tur içi süreler sahnede farklı şekilde (Jöle Kes tabak halkası, Doğru Kapı işaret penceresi, Bardak Doldur nişan çubuğu).

## Neden
Rakipler sabit kalınca dikkat dağılmıyor, yine de "kimi geçiyorum" hissi var. Etiket ve kısa ortalı çubuk, şeridi süre çubuğundan ayırıyor; "Puan sayılıyor" denemenin sayıldığını da söylüyor. Saniye yazısı kalabalık yapıyordu; son 5 sn rengi gerginliği taşıyor.

## Reddedilen alternatifler
- Başkalarının girdi kayıtlarını tekrar oynatan hareketli hayalet (dikkat dağıtır, telefonda ek işlem).
- Girdi kayıtlarını sunucudan silmek: doğrulama ve yeniden puanlama için şart.
- Playus tarzı avatar + puan dizisinin şeridin yerini alması (Claude yanlış anladı, Yusuf düzeltti: şerit kalsın, yalnız en üste).
- Küçük ekranda etiket ve çubuğun yan yana olduğu kompakt mod (çubuk bazen sağda bazen altta, tutarsız).
- İnce çizgi şerit (dolu kutu uygulamanın sticker diline daha uygun).

## Sonuçlar / riskler
- ✓ ve nabız gerçek oyunda telefonda görülmedi (tarayıcı paneli gizliyken sayfa kısılıyor; ✓ dondurularak yakalandı).
- Tuğla Kır 5 toplu varyantta küçük ekranda skor en soldaki topa değebilir (düşük).

## İlgili
- [[2026-10-10-canli-kapisma-lobi-karti]]
- [[2026-10-11-tussle-gunluk-serit-ve-ust-duzen]]
