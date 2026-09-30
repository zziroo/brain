---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [guvenlik, ssh, ayarlar]
source: C--dev-diskort fed9b022 (2026-09-28), C--dev-diskort 72824d08 (2026-09-28)
---

# Karar: Canlı sunucuya SSH izni ayar dosyasına açıkça ve yalnızca bu sunucu + kullanıcı + anahtarla sınırlı olarak yazıldı.

## Bağlam
Yeni sohbette otomatik mod denetçisi canlı sunucuya `root` SSH komutlarını engelledi; koordinatörün günlük işi (dağıtım, yedek, yeniden başlatma) buna bağlı.

## Karar
Seçenekler: (1) salt-okuma izni, (2) bu sunucu için dar kapsamlı SSH izni, (3) denetçiye bırakmak. Kullanıcı 2. seçeneği seçti ("yalnızca bu sunucu ve bu anahtarla sınırlı").

## Neden
- Salt-okuma kuralı dağıtım/yedek/yeniden başlatmayı kapsamıyor, her seferinde takılırdı.
- Yedekler otomatik; risk kabul edilebilir.
- Başka bir makineye SSH yine denetime takılır.

## Reddedilen alternatifler
- Yalnızca salt-okuma: akışa yetmez.
- Denetçiye bırakmak: bağlamsız sohbette sürekli engel.

## Sonuçlar / riskler
Hafızadaki notlar denetçi için yetki sayılmaz; izin ayar dosyasında olmalı. Sunucu adresi/anahtar ayrıntıları burada tutulmaz.

## İlgili
- [[2026-09-28-kod-inceleme-ajani-ve-dizin-tasima]]
- [[otomatik-mod-ssh-engeli-yeni-sohbette]]
