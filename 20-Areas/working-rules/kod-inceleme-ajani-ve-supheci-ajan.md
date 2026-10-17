---
type: decision
project: genel
date: 2026-09-28
status: active
tags: [ajan, kod-inceleme, is-akisi]
source: C--dev-diskort 72824d08 (2026-09-28)
---

# Karar: Kod incelemesi ayrı, salt-okunur ajanla yapılır; orta+ bulgular için "şüpheci" ajan çürütmeye çalışır; karar koordinatöre gelir.

## Bağlam
Kullanıcı farklı gözle tüm projeyi tarayan ve main'e gelen değişiklikleri izleyen bir ajan istedi; bulguları yalayan ikinci bir ajan önerdi.

## Karar
Üç bölgeli tarama (sunucu/güvenlik, ortak istemci + masaüstü, mobil); her bulguda dosya:satır, somut tetikleme, öneri; doğrulanamayan iddia raporlanmaz. Bulgu çıkarsa şüpheci ajan (Sonnet) CONFIRMED/REFUTED/DOWNGRADE der; koordinatör karar verir. Zamanlanmış inceleme günde 2 kez (13:20, 23:20). Dar işler Sonnet'e, çok platformlu/derin işler en güçlü modele. Büyük işten önce kullanım durumuna bakılır.

## Neden
- Yazan ajan kendi kodunu incelememeli; şüpheci yanlış alarmları eler, kullanıcıya kısa güvenilir liste gelir.
- Plan limitleri (5 saat + haftalık) sohbet, ajan ve zamanlı görevler arasında ortak: sıklık ve model seçimi maliyet kararı.

## Reddedilen alternatifler
- Tek ajan inceleme: yanlış alarm yükü.
- 3 saatte bir zamanlanmış inceleme: boş çalışmalar pahalı, günde 2'ye indirildi.
- Bulutta çok ajanlı `/code-review ultra`: yalnızca kullanıcı başlatabilir ve ayrıca ücretli.

## Sonuçlar / riskler
Genel kurallar kullanıcı düzeyi CLAUDE.md'ye taşındı. Kullanıcı iş bölümünü (ne/öncelik/sürüm = kullanıcı, nasıl = Claude) onayladı.

## İlgili
- [[2026-09-28-kod-inceleme-ajani-ve-dizin-tasima]]
- [[2026-09-28-otomasyon-gozcu-oturumlari]]
