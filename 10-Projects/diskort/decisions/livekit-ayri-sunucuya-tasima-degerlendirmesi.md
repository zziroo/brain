---
type: decision
project: diskort
date: 2026-09-30
status: unverified
tags: [diskort, livekit, altyapi, ses]
source: 394744c4-d9f8-5503-a075-3edda0039f1c.jsonl
---

# Değerlendirme: Ses sorunları için yalnızca LiveKit başka bir sunucuya taşınabilir (karar verilmedi)

## Bağlam
Birkaç gün üst üste odadaki herkeste aynı anda UDP paket kaybı ve ses kopmaları görüldü; sunucuya ICMP/HTTP ping kaybolmuyor, sunucunun kendi ölçümü de yolun tıkandığını gösteriyordu.

## Bulgu
Sunucuda üç parça: api (mesajlar, gateway, SQLite, ekler, OTA/APK/iOS, telemetri), LiveKit (ses/yayın) ve Caddy. LiveKit adresleri ayardan geliyor, kodda değişiklik gerekmiyor; yani yalnız LiveKit taşınırsa yeter.

## Durum
Kullanıcı soruyu sordu; taşıma kararı bu kayıtta verilmedi. `status: unverified`: asistanın tahmini, taşımanın sorunu çözeceği denenmedi.

## Reddedilen alternatifler
- Tüm sunucuyu taşımak: gereksiz, trafik esas olarak LiveKit'te.

## İlgili
- [[ses-kalitesi-udp-kayiplari]]
