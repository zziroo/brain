---
type: decision
project: tussle
date: 2026-10-18
status: active
tags: [tussle, sohbet, kapisma, hiz-siniri]
source: oturum 2026-10-17 gece (mobil-playus), YOSEF geri bildirimi, [[2026-10-17-tussle-yosef-geri-bildirimi-denge-429-iptal-karti-google-dugmesi]]
---

# Karar: iptal edilen kapışma/parti kartı sohbetten animasyonla kalkar; kapışma atma ve deneme sınırları gevşedi

## Bağlam
YOSEF (iOS testçisi) "Çok hızlısın" 429 mesajı aldı; Yusuf kapışma kartlarının sohbete sınırsız atılabilmesini ve iptal edilen kartın sohbette sönük kalmamasını istedi.

## Karar
- Kart `cancelled` olunca istemcide solup yüksekliği kapanarak çıkar (~250 ms, hareket kapalıysa anında); `Chat.list()` iptal kartların mesajlarını sorgu içinde eler (sayfalama bozulmaz); istemci filtresi eski sunucu/önbellek için kalır. Sunucu mesajı silmez (`65c8117`).
- Sınırlar (`fe8c460`): start/attempt/matchResult kullanıcı 12 → 30/dk (IP 40 → 80); matchCreate 5 → 30/10 dk (IP 20 → 60); partyCreate 5 → 15/10 dk (IP 20 → 40). 429 retleri dakikada en çok bir satır günlüğe (limiter + yol şablonu, kimlik/IP yok). Metin: "Biraz nefes al: birkaç saniye sonra yeniden dene."

## Neden
- 5–10 saniyelik oyunlarda bir deneme en az 2 istek (start + attempt); 12/dk gerçek oyuncuyu kesiyordu.
- Sohbette iptal kartı gürültü; animasyonla kalkması "bir şey oldu" hissini korur.
- Mesajı silmek yeni bir silme yayını isterdi ve live.ts'teki "mesajı gitmiş açık kart iptal edilir" kuralıyla karışırdı.

## Reddedilen alternatifler
- Sunucunun kart mesajını silmesi: silme protokolü yok, tepkiler ve prune kuralı karışır.
- Sınırları tamamen kaldırmak: kötüye kullanım koruması kalmalı.

## Sonuçlar / riskler
- Eski istemcide (sohbet önbelleği) iptal kartı bir kez daha görünebilir; istemci filtresi bunu kapatır.

## İlgili
- [[2026-10-18-denge-v4-rampa-tavan-180]]
