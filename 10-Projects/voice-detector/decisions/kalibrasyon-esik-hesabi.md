---
type: decision
project: voice-detector
date: 2026-09-25
status: active
tags: [voice-detector, kalibrasyon, esik]
source: oturum 25d1d08a (Aşama 4), src/VoiceDetector/Detection/Calibrator.cs
---

# Kalibrasyon eşiği normal konuşmanın maksimumu ile yüksek konuşmanın medyanının ortasına koyar

## Bağlam
Eşikleri elle tahmin etmemek için 3 adımlı sihirbaz: sessizlik 5 sn, normal konuşma 10 sn, yüksek konuşma 5 sn. Ölçümler dedektörün **tetik seviyesi** üzerinden alınır, böylece sonuç eşiklerle doğrudan karşılaştırılabilir ([[tetik-seviyesi-500ms-penceresi]]).

## Karar
- Yüksek eşiği = (normal maks + yüksek medyan) / 2, eğer yüksek medyan > normal maks.
- Örtüşüyorsa: (normal P90 + yüksek P90) / 2 ve uyarı mesajı; P90 farkı < 3 dB ise eşik **önerilmez**.
- Yüksek medyan < sessizlik maks + 6 dB ise önerilmez ("mikrofon seni duymuyor / yanlış mikrofon").
- Çok yüksek eşiği = maks(yüksek P90, yüksek eşiği + 4 dB). İkisi de -70..-5 dB'ye kırpılır, 0,5 dB'ye yuvarlanır.
- Her adımda 3 sn hazırlık geri sayımı (kaydedilmez), ölçümün ilk 1 sn'si atılır (tetik seviyesinin 1 sn'lik penceresi önceki anı taşır). İlerleme gelen ses bloklarıyla sayılır; ses gelmezse zaman aşımı.
- Kalibrasyon sırasında uygulama kapalı olsa bile mikrofon dinlenir, ekran uyarısı gösterilmez.

## Neden
Kural "normal konuşmanın en yüksek anı uyarı vermesin, yüksek konuşmanın çoğu versin". Yusuf'un ilk ölçümlerinde normal maks (-33,2) ile yüksek medyan (-34,1) birbirine çok yakındı; bu yüzden örtüşme durumu ve "önerme" kararı ayrıca tanımlandı. Kötü bir öneriyi uygulamaktansa nedenini söylemek daha iyi.

## Reddedilen alternatifler
- Sabit dB değerleri: mikrofon kazancına göre tamamen kayar.
- Ölçümleri 150 ms yumuşatılmış seviyeden almak: dedektörün baktığı ölçekle aynı değil (ilk ölçümler böyleydi, sonra değiştirildi).
- Ortalama kullanmak: hece araları ve tepkime gecikmesi ortalamayı bozar; medyan/P90/maks seçildi.

## Sonuçlar / riskler
6 birim testi sabitliyor. Yusuf Aşama 4'ü test edip "çalışıyor" dedi; sihirbazın kendi ölçümüyle önerdiği eşiklerin -32/-26 ile ne kadar uyuştuğu kayıtta yok (doğrulanmadı).

## İlgili
- [[_overview]], [[tetik-seviyesi-500ms-penceresi]]
