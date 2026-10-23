---
type: decision
project: kripto-bot
date: 2026-10-17
status: active
tags: [kripto-bot, config, sembol, backtest]
source: kripto-bot oturumu "sembol listesini genişletme" (2026-10-17)
---

# Karar: Sembol listesi BTC+ETH'ten hacme göre ilk 5'e çıktı (BTC, ETH, SOL, XRP, BNB)

## Bağlam
Yusuf "sadece iki coinden sinyal çıkmaz, çok sembolle yapalım" dedi. 20 büyük USDT çifti, mevcut 4h `trend_filter_cross` sabit parametrelerle ve botun gerçek statik `equity/N` boyutlamasıyla 500 USD portföy olarak test edildi. Rapor: repo `reports/symbol-universe-research-2026-10-17.md`, script `scripts/symbol_universe_research.py`.

## Karar
`config.yaml` `symbols`: BTC/USDT, ETH/USDT, SOL/USDT, XRP/USDT, BNB/USDT (son 1 yıl medyan günlük hacme göre ilk 5, sonuca bakmadan). `risk:` ve statik boyutlama değişmedi. Commit `fa8fecd`.

## Neden
- 2 yıllık OOS (2024-10..2026-10): BTC+ETH +%35 / DD %33, ilk 5 +%60 / DD %31; emir/hafta ~1,5 → ~4; dilim ~238 → ~95 USD.
- Yusuf daha çok işlem istiyor; 5'te düşüş büyümüyor.
- Tüm 20 çift testnet'te var, min notional 5 USD sorun değil.

## Reddedilen alternatifler
- **10 / 20 coin:** DD %41 / %53, %40 kill switch 2026'da tetiklenir, getiri artmaz. Altcoinler çöküşte BTC ile (çoğu zaman daha sert) düşüyor; medyan 4h korelasyon 0,69.
- **BTC+ETH'te kalmak:** araştırmanın varsayılan önerisiydi; Yusuf daha çok aktivite istedi.
- **Boştaki nakdi aktif sinyallere bölmek:** her sepette daha kötü (kill switch'siz W1 ilk 5 -%21, DD %57).
- **Zarar eden BNB'yi çıkarmak:** sonuca göre seçim = aşırı uydurma.

## Sonuçlar / riskler
- İlk 5'in getiri avantajı neredeyse tamamen XRP'den: XRP'siz sepet +%16, BTC+ETH'in altında. Güvenilir kazanç "daha çok işlem", "daha çok kâr" değil.
- Hayatta kalma yanlılığı: bugünün büyük coinleri seçildi, rakamlar iyimser.
- Listeye coin eklemek testnet'teki ön yüklü SOL/XRP/BNB'yi bir sonraki turda sattı (bkz. [[zaman-dilimi-degisikligi-hemen-emir-tetikler]]).

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[zaman-dilimi-4h-yusuf-tercihi]]
