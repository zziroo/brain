---
type: lesson
project: diskort
date: 2026-10-15
status: active
tags: [mobil, ota, livekit, ses]
source: diskort oturumu 2026-10-15 gece: 0.11.1/0.11.2 OTA sonrası iki Android'de kesik ses
---

# Ders: Telefonda seste iken OTA yeniden yüklemesi eski LiveKit oturumunu bırakır, ses herkese kesik gider

## Ne oldu
0.11.1 ve 0.11.2 aynı akşam, kullanıcılar sesli kanaldayken OTA ile geldi. İki Android (Yusuf'un Xiaomi'si, Ametion) hem kendi sesini kesik gönderdi hem kesik duydu; masaüstü kullanıcıları temizdi. Telemetride paket kaybı ~0, jitter orta; LiveKit logunda telefon için "removing duplicate participant (DUPLICATE_IDENTITY)". Ametion uygulamayı silip kurunca düzeldi.

## Neden
`applyOta()` doğrudan `Updates.reloadAsync()` çağırıyordu. JS yeniden yüklenince eski JS'nin LiveKit odası (native WebRTC) ve Kotlin ön plan servisi kendiliğinden kapanmıyor; yeni JS aynı kimlikle tekrar katılınca telefonda iki oturum/iki mikrofon yolu kalıyor. Güncelleme zorunlu olduğundan (sunucu eski istemciyi 5 dk içinde reddeder) herkes seste iken yeniden yüklendi.

## Düzeltme
`setBeforeReload` kancası (`apps/mobile/src/update/updater.ts`): `_layout.tsx` kurulumda `voice.leave()` verir; `applyOta` en çok 4 sn bekleyip sonra yeniden yükler (commit sonrası sürüm 0.11.3). Not: düzeltme yeni paketin içinde olduğu için 0.11.3'e geçiş de eski yolla olur; o yüzden kanal boşken yayınla ya da telefon kullanıcılarına "güncellemeden sonra uygulamayı kapatıp aç" de.

## Uygulama
- İstemci sürümünü kanal doluyken çıkarma; mümkünse boş saatte, değilse telefon kullanıcılarını uyar.
- Telefonda "kesik ses + masaüstü temiz + kayıp yok + DUPLICATE_IDENTITY" görürsen: uygulamayı tamamen kapatıp açmak yeter, silmeye gerek yok.
- Teşhis kaynakları: `/data/telemetry/<gün>.jsonl` (kullanıcı başına kalite), `incidents.jsonl`, LiveKit logu (`docker compose logs livekit | grep <identity>`), `netmin-*.jsonl` sondaları.

## İlgili
- [[2026-10-15-kisisel-giris-sesi]] · [[zorunlu-istemci-guncellemesi]] · [[mobil-ota-guncelleme]] · [[sessions/2026-10-15-kisisel-giris-sesi-ve-0-11-1]]
