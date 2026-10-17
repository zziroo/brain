---
type: decision
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, deploy, vps, launchd, binance]
source: kripto-bot oturumu "VPS'e taşıma ve Faz 3" (2026-10-16)
---

# Karar: Bot Mac'te launchd ile çalışır; VPS kurulumu hazır ama kapalı, çünkü VPS'ten Binance'e bağlantılar sıfırlanıyor

## Bağlam
Yusuf hosting tercihini Claude'a bıraktı (Mac zaten hep açık; VPS de var). VPS'e taşındı: `/opt/kripto-bot`, uv, systemd timer (cron yok). İlk turlar `NetworkError` ile düştü. Prob: Binance uç noktalarına (api.binance.com, testnet.binance.vision, data-api.binance.vision) isteklerin ~yarısı 0,1 sn'de sıfırlanıyor, büyük yanıtlar 20 sn'de bitmiyor; aynı anda Google, GitHub, Coinbase, Kraken 6/6 başarılı. fapi.binance.com 403. Binance'e özgü filtre/engel.

## Karar
- Bot Mac'te: launchd ajanı `com.ziroo.kripto-bot.run`, her saat :05'te `uv run kbot run` (mum başına idempotent; emir yalnız yeni günlük mum kapanınca).
- VPS: kod ve systemd birimleri duruyor, timer `disable --now`. Yedek; yeniden açmadan önce curl probuyla erişim doğrulanır. Aynı testnet hesabında iki bot asla aynı anda çalışmaz.
- Kodda kalıcı iyileştirmeler: ccxt yalnız spot piyasalarını yükler (`fetchMarkets: ["spot"]`), mum verisi `data-api.binance.vision` üzerinden.

## Neden
- Trading botunda %50 bağlantı hatası kabul edilemez; retry ile örtmek emir yolunda belirsizlik yaratır (istek sunucuya ulaştı mı?).
- Mac zaten 7/24 açık; launchd kaçan turu uyanınca bir kez çalıştırır; günlük mum için yeterli.

## Reddedilen alternatifler
- VPS'te retry'lı çalıştırmak: okuma çağrılarında yardımcı olur ama emir yolunda değil; kök neden ağ.
- Proxy/başka VPS: ek maliyet ve karmaşıklık, şimdilik gereksiz.
- Her iki yerde de çalıştırmak: aynı hesapta çift işlem riski.

## Sonuçlar / riskler
- Mac kapanır ya da uyursa turlar kaçar; sabah raporu "bayat" uyarısı verir.
- Okuma çağrılarına küçük retry eklemek hâlâ sırada (Mac'te de ara sıra sıfırlama olabilir).

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[vps-binance-baglanti-sifirlama]]
- [[faz2-emir-dongusu-guvenlik-tasarimi]]
