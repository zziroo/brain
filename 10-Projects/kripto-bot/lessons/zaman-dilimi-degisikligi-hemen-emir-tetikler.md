---
type: lesson
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, config, launchd, testnet]
source: kripto-bot oturumu "4 saatlik mumlara geçiş" (2026-10-16)
---

# Ders: config.yaml'da strateji/zaman dilimi değişikliği bir sonraki saatlik turda emir tetikleyebilir

- launchd ajanı her saat :05'te `kbot run` çalıştırır ve `config.yaml`'ı o an okur. Dosyayı kaydetmek = bir sonraki turda devreye girer; commit beklenmez.
- Yeni zaman diliminin mumu eski `last_candle_ts`'ten yeni olduğu için bot hemen yeni sinyale göre hareket eder. 1d → 4h geçişinde 4h sinyali 0'dı; bot testnet'teki ön yüklü 1 BTC + 1 ETH'yi sattı.
- Aynısı `symbols` listesine coin eklemekte de olur: 2026-10-17'de SOL/XRP/BNB eklenince sinyal 0'dı, testnet'teki ön yüklü miktarlar ilk turda satıldı.
- Testnet'te bot almadığı coinleri de satar; yalnız canlıda `manage_existing_holdings: false` bunu engeller.

**Nasıl uygulanır:** strateji, parametre ya da zaman dilimi değişikliğinden önce yeni ayarla güncel sinyali hesapla (public mumlar + `build_strategy`, anahtarsız), bir sonraki turda ne olacağını Yusuf'a söyle, sonra kaydet.

Ayrıca: Yusuf'a strateji rakamı verirken örneklem dışı (walk-forward) sonucu ver. 4h için önce örneklem içi "+29/+30%" söylendi, OOS BTC +8% (B&H +31%) çıktı; sonradan düzeltildi.

## İlgili
- [[zaman-dilimi-4h-yusuf-tercihi]]
- [[faz2-emir-dongusu-guvenlik-tasarimi]]
