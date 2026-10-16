---
type: decision
project: kripto-bot
date: 2026-10-16
status: active
tags: [kripto-bot, mimari, risk, claude-rolu]
source: ZZ oturumu "kripto-bot: proje başlangıcı" (2026-10-16)
---

# Karar: Al-sat kararı deterministik kodda durur; Claude botu kurar, test eder ve salt okunur izler, canlı emir vermez

## Bağlam
Yusuf Binance hesabını doğrudan Claude'un yönetmesini, sonra da "agent olarak botu yönetmesini" istedi; 500 USD'nin sıfırlanmasını göze aldığını söyledi.

## Karar
- Bot kuralı uygular: sinyal, risk limiti, emir gönderme hepsi kodda, 7/24 kendi döngüsünde.
- Claude: mimariyi kurar, stratejiyi seçip backtest ile gerekçelendirir, salt okunur gözetim yapar (log/PnL/hata raporu, değişiklik önerisi).
- Claude canlı hesapta emir vermez/tetiklemez, al-sat kararı almaz, risk parametrelerini kendi başına değiştirmez, API anahtarı girmez. Risk iştahı bu çizgiyi değiştirmez.
- Değişiklik akışı: Claude önerir → Yusuf onaylar → Claude kodu günceller → Yusuf botu yeniden başlatır.

## Neden
- Claude'un çalışma kuralları finansal işlemi kullanıcı adına yürütmesini yasaklar; izin verilse de geçerli.
- Mimari olarak da doğrusu bu: dil modeli emir döngüsünde yavaş, pahalı ve tutarsız; her çağrıda farklı yorumlar, aşırı uyum yapar, hata canlı parada çıkar. Kazanan yaklaşım az kural, sert risk limiti, çok test.

## Reddedilen alternatifler
- Claude'un hesabı doğrudan yönetmesi: kural dışı.
- "Agent her gün piyasaya bakıp stratejiyi ayarlasın": LLM-in-the-loop trading; tutarsız ve riskli, ayrıca canlı risk parametresini Claude'un değiştirmesi demek.
- Risk motorunu gevşetmek ("para zaten gidebilir"): kill switch ve kayıp limiti yine zorunlu; test gibi görülse de para gerçek.

## Sonuçlar / riskler
- Yusuf hiçbir emir girmez; sadece bütçe ve kayıp limiti gibi üst düzey onaylar verir (varsayılanlarla önerilir).
- Canlıya geçiş bayrağı ve anahtar yalnızca Yusuf'ta.

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[10-Projects/kripto-bot/decisions/binance-global-tr-degil]]
