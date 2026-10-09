---
type: decision
project: diskort
date: 2026-10-08
status: active
tags: [diskort, mobil, livekit, ses, android]
source: oturum 2026-10-08 (yasin ses sorunu), sürüm 0.10.1
---

# Mobilde LiveKit tek bağlantı kipi kapatıldı (singlePeerConnection: false)

## Bağlam
2026-10-08 akşamı üç Android kullanıcısı (yasin, emirhan, engin) aynı kanalda: iki kişi konuşabiliyor, üçüncü gelince herkesin sesi gidiyor. Sunucu temiz (yük 0, livekit/api/edge hatasız). İstemci hataları: kanala biri her katıldığında odadaki telefonlarda "negotiation disconnected → NegotiationError: negotiation timed out → reconnect", yeniden bağlanma denemesinde "unable to set offer: Local fingerprint does not match identity" (react-native-webrtc), ardından tam yeniden bağlanma ve sunucuda DUPLICATE_IDENTITY. Zincir odadaki herkesi tetiklediği için döngüye giriyordu. Aynı hatalar 30 Eylül ve 6 Ekim'de de Android'de vardı; 0.10.0'a özgü değil.

## Karar
`apps/mobile/src/voice/voice.ts` Room seçeneklerine `singlePeerConnection: false` eklendi (sürüm 0.10.1, OTA). livekit-client 2.22 varsayılanı tek bağlantı ("publisher-only") kipidir: her yeni abonelik için sunucu `MediaSectionsRequirement` gönderir, istemci yayın bağlantısına recvonly bölüm ekleyip yeniden müzakere eder. Android WebRTC bu müzakerede takılıyor. İki bağlantılı kipte (yayın + abonelik ayrı) yeni katılan yalnızca abonelik bağlantısını etkiler. Masaüstü (Chrome WebRTC) sorun yaşamadığı için değiştirilmedi. Telemetri (`voiceTelemetry.ts`) iki kipi de destekliyor.

## Neden
Kök neden LiveKit istemcisinin kipi + react-native-webrtc davranışı; kodumuz katılımcı gelince hiçbir şey yayınlamıyor (bind() yalnız abone oluyor). Tek satırlık, geri alınabilir değişiklik.

## Reddedilen alternatifler
- Sadece ping/negotiation zaman aşımını artırmak: müzakere başarısızlığı zaman aşımından değil, SDP uygulanamamasından.
- Kullanıcılara oda değiştirtmek: yeni odada da yasin girince aynı hata tekrarladı.

## Sonuçlar / riskler
- Üç telefonla gerçek doğrulama **yapılmadı** (yalnız typecheck). Yusuf'un ekibi 0.10.1'i aldıktan sonra client-errors'ta "negotiation timed out" ve "Local fingerprint" kayıtları izlenmeli; sürerse hipotez yanlış demektir.
- Yasin'in ayrıca bağlantı kaynaklı sorunu var (tek başınayken de sinyal ping zaman aşımı, Turkcell mobil); bu değişiklik onu düzeltmez, yalnızca onun kopmalarının başkalarını düşürmesini engeller.
- Kalan şüphe: sinyal ping zaman aşımları JS iş parçacığının tıkanmasından da olabilir (DPDFNet ısınması/kozmetik animasyonlar); ayrı inceleme gerekir.

## İlgili
- [[surum-cikarma]], [[mobil-ota-guncelleme]], [[sesli-uygulama-icin-livekit-ve-kendi-vps]]
