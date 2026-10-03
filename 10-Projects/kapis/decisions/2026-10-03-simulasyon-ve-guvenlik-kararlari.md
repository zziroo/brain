---
type: decision
project: kapis
date: 2026-10-03
status: active
tags: [kapis, guvenlik, simulasyon, inceleme]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa); inceleme turu bulguları
---

# Karar: inceleme sonrası sim ve güvenlik kuralları (girdi kredisi, tohum, momentum, kill kaçışı, proxy)

## Bağlam
İnceleme kapısı ([[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]]) sunucu otoritesindeki suistimal ve doğruluk açıklarını buldu.

## Karar
- Girdi kredi kovası: tick başına 1 komut, patlama 4. 12 tick sonra boş girdi ile adımlama (sim debt); sessiz oyuncu zamanda donamaz.
- Saçılma tohumu istemci seq'inden değil `hash(SALT, shots)`'tan; sunucu her doğuşta sayacı rastgele başlatır.
- Zıplayarak momentum tutma: yalnız koşu hızı üstündeki kısım sönümlenir. Bunny-hop kazancı yok, roket zıplaması bozulmadı.
- Kalkan yakın dövüşü de keser.
- Öldürülmekten takım değiştirerek ya da çıkarak kaçılamaz; son hasar veren kill alır.
- Oda kodu 4 harf kaldı; tahmin sınırı adres başına.
- `TRUST_PROXY` yalnız loopback ya da `TRUSTED_PROXIES` eşinden başlık kabul eder. IPv6 /64 ile sayılır.

## Neden
Her madde bir suistimal ya da hata yolunu kapatıyor (komut seli, tohum tahmini, bunny-hop, kill kaçışı, sahte proxy başlığı).

## Reddedilen alternatifler
- Zıplamada naif sürtünme düzeltmesi: bunny-hop kazancı veriyordu; şüpheci ajan reddetti ([[2026-10-03-inceleme-ve-test-dersleri]]).

## Sonuçlar / riskler
Canlıda çok oyunculu doğrulanmadı; parametreler gerçek oyunla gözden geçirilmeli.

## İlgili
- [[_overview]], [[2026-10-03-paylasilan-sim-sunucu-otoritesi-hero-dilimi]]
