---
type: lesson
project: kapis
date: 2026-10-03
status: active
tags: [kapis, limit, ajan, orkestrasyon]
source: oturum 2026-10-03 (web-fps-game, KAPIŞ ilk inşa)
---

# 5 saatlik limit: 7 ajanlık dalga limiti bitirir, dalga öncesi `get_usage` bak

## Ne oldu
Büyük bir Fable ajanı 5 saatlik limitin yaklaşık %7-8'ini, sonnet ajanı yaklaşık %3'ünü yedi. 7 ajanlık dalga limiti bitirdi. Sıfırlanmayı beklemek için `CronCreate` ile tek seferlik tetik işe yaradı.

## Çıkarım
Dalga öncesi `get_usage` ile bütçeyi hesapla; dar işleri sonnet'e ver. Limit biterse tek seferlik cron ile devam et.

## İlgili
- [[_overview]], [[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]], [[orkestrasyon]]
