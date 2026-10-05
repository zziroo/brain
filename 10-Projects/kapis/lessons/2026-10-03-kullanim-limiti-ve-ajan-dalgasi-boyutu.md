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

## Ek (2026-10-05, dünya temaları)
- Opus tema ajanı (~700-900k token) haftalık limitin yaklaşık %1-2'sini yedi; 2 altyapı + 7 tema/vitrin ajanı ve incelemeler haftalığı %74'ten %100'e taşıdı.
- Haftalık limit dolunca çalışan 4 ajan yarıda kesildi (429). Sıfırlanınca `SendMessage` ile aynı ajanlara "kaldığın yerden devam" demek yetti; bağlamları korunuyordu, iş kaybı olmadı.
- Yusuf: "limitler yüzünden bir şeyleri kısıtlamana gerek yok". Yani dalgayı limit için küçültme/erteleme; dolarsa sıfırlanınca devam et.

## Çıkarım
Dalga öncesi `get_usage` ile bütçeye bak ve kullanıcıya söyle, ama Yusuf açıkça istemedikçe işi limit yüzünden erteleme. Limit dolarsa ajanları sıfırlanmadan sonra `SendMessage` ile sürdür (yeni ajan açma). Dar işleri sonnet'e ver.

## İlgili
- [[_overview]], [[2026-10-03-ajan-dalgalari-ve-inceleme-kapisi]], [[orkestrasyon]]
