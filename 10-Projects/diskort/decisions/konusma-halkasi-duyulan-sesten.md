---
type: decision
project: diskort
date: 2026-10-01
status: active
tags: [diskort, ses, arayuz, konusma-gostergesi]
source: Claude Code oturumu 2026-10-01 (yeşil halka senkronu), main d3ed74f, sürüm 0.9.5
---

# Karar: Uzak katılımcıların yeşil konuşma halkası yerelde çalınan sesten ölçülür (masaüstü)

## Bağlam
Başkalarının halkası LiveKit sunucusunun ActiveSpeakers olayından geliyordu. Bu olay sinyal kanalıyla gelir; sunucu -35 dBov eşiği ve 100 ms'lik pencere kullanır. Sonuç:
- halka duyulan sesle eş zamanlı yanmıyordu,
- hece hece titriyordu,
- sessiz konuşmayı kaçırıyordu.

Kişinin kendi halkası ise yerel ses kapısından geliyor. Yusuf "yeşil yanma senkronu düzeltilmeli" dedi.

## Karar
- `remoteSpeaking.ts`: abone olunan her uzak mikrofon izine (yayın sesi hariç) ortak ses bağlamında bir AnalyserNode bağlanır. Tek bir 50 ms zamanlayıcı kullanılır; eşik -55 dBFS RMS, halka ilk okumada açılır, 300 ms tutma süresi var.
- Ölçüm, kişi başı ses seviyesinden ve yerel susturmadan önce yapılır. Sesini kıstığın biri konuşunca halkası yine yanar.
- Sesi ölçülemeyenler için sunucunun ActiveSpeakers bilgisi yedek olarak kullanılır. Mobil şimdilik sunucudan gelen halkayla devam ediyor.

## Neden
Halka, kullanıcının gerçekten duyduğu sesle aynı anda yanmalı. Sunucu bildirimi, sesin geçtiği gecikme tamponundan (jitter buffer) bağımsız geldiği için duyulan sesle eşleşmez.

## Reddedilen alternatifler
- Sunucuda `active_level` / `smooth_intervals` ayarı: senkron sorununu çözmez, üstelik deploy gerektirir.
- Yalnızca istemcide 300 ms tutma süresi: titremeyi azaltır ama gecikmeyi gidermez.
- livekit-client `createAudioAnalyser`: her iz için ayrı AudioContext açıyor, 25 kişide pahalı.

## Sonuçlar / riskler
Bir katılımcı ölçülmeye başlayınca onun için sunucu bilgisi yok sayılır. İkinci ses bağlamındaki MediaStreamSource sessizlik verirse o kişinin halkası hiç yanmaz (inceleme ajanının canlı test uyarısı). Gerçek aramada doğrulanmadı.

## İlgili
- [[model-calisirken-agc-kapali-ve-sinirlayici]] · [[2026-10-01-sinanse-boguk-ses-ve-0-9-5]]
