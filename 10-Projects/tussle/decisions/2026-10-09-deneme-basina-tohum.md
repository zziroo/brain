---
type: decision
project: tussle
date: 2026-10-09
status: superseded
tags: [tussle, adalet, hile, tohum, sunucu]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A), Parti A inceleme ajanı (yüksek bulgu)
---

> Eskidi (2026-10-09): deneme numarası artık "Başla"da sunucuda ayrılıyor ve gün tohumu istemciye gitmiyor; bkz. [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]. Kutu'nun hash2 karıştırması eski istisna olarak kaldı ([[2026-10-09-gizli-cekilisler-yalniz-tohumdan]]).

# Karar: Günün k'inci denemesi `mixSeed(gün tohumu, k)` ile oynanır; antrenman rotası tohum almaz

## Bağlam
Bir günün 3 denemesi aynı tohumu kullanıyordu. İnceleme: Kutu Seç'te 1. denemede bomba yerleri görülüp 2.'de risksiz tekrar edilebiliyor; Terazi ve Işık Sırası'nda cevaplar/dizi ezberlenebiliyor; Matematik'te zaten vardı. Ayrıca istemci günün tohumunu bildiği için `#/oyun/<id>?seed=` ile tam o oyunu çalışmak mümkündü.

## Karar
- Deneme k (0 tabanlı, kullanıcının o gün kayıtlı deneme sayısı) `attemptSeed(day.seed, k) = mixSeed(day.seed, k)` oynar; sunucu `verify` aynı senkron istekte `triesUsed` sayıp eşleşmeyeni 409 `mismatch` ile reddeder. Aynı k'daki herkes aynı tohumu alır (adalet korunur). `AttemptResponse.triesUsed` eklendi; istemci iyimser artırır, hata olursa `/today` ile uzlaşır.
- Antrenman rotası `?seed=` parametresini kabul etmez; deneme turu zaten rastgele.
- Kutu: bomba çekilişi `(rng ^ hash2(tick, picks)) % 60`; sürüm 3. Sunucu `bombsHit === 0 && cleared >= 25` koşulunu `suspicious` sütununa işler (yanıta çıkmaz).

## Neden
Ucuz, tekrar oynatma modelini bozmuyor, istemci değişikliği minimal. Stok istemciyle ezber bitti.

## Reddedilen alternatifler
- Bombaları sunucu sırrından türetmek: her seçimde sunucu turu gerekir, istemci tarafı tekrar oynatmayı bozar.
- Hiçbir şey yapmamak: Kutu'da 2. deneme risksiz, skor sınırsız.

## Sonuçlar / riskler
- Modifiye istemci yine tohumu bilir; kabul edildi, şüpheli bayrağıyla izlenir.
- Dağıtım anında açık olan eski sayfalar bir deneme için `mismatch` alır (yenileme gerekir).
- Nadir kenar: sonuç gelmeden başlatılan tekrar + ilk gönderimin başarısız olması bir denemeyi boşa harcar (test yok, kabul).

## İlgili
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
- [[2026-10-09-oyun-uretim-kiti-ve-partiler]]
