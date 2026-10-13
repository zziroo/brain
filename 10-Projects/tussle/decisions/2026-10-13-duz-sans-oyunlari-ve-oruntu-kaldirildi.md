---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, oyun-havuzu, karar]
source: oturum 2026-10-13 (mobil-playus: eleme, süre modeli, Parti I)
---

# Karar: Düz şans oyunları (Gizli Geçit, Kutu Seç, Yüksek/Alçak) ve Örüntü koddan silindi

## Bağlam
Yusuf 2026-10-12 gecesi oyunları oynadı: düz şans oyunları gereksiz, Örüntü (düşünme ağırlıklı, az aksiyon) sevilmedi. Claude ayrıca "fazla bekleten" diye Refleks, Tam Zamanı, Top Nerede, Terazi, Kaç Tane, Hazine, Şifre, Renk Hafızası'nı çıkarmayı önerdi.

## Karar
Silinen: `gecit`, `kutu`, `yuksek`, `oruntu` (commit `d2f3ab3`). Claude'un önerdiği sekiz oyun **kaldı** (Yusuf: eğlenceli). Çark da kaldı (dur zamanlaması beceri). Havuz 46 oldu, Parti I ile 50 ([[2026-10-13-parti-i-dort-hypercasual-oyun]]).

## Neden
Havuz beceri öncelikli ([[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]); sonucu oyuncunun elinde olmayan oyun "bir tur daha" hissi vermiyor. Örüntü aksiyonsuz kaldığı için parti temposunu düşürüyordu.

## Reddedilen alternatifler
- `OFF_POOL`'a almak (linkle oynanır kalsın): reddedildi; önceki silmenin (`2312f15`) kalıbıyla tamamen silindi, eski kayıtlar `game_gone` ile güvenli.
- "Fazla bekleten" sekiz oyunu da çıkarmak: Yusuf istemedi.

## Sonuçlar / riskler
Silinenlerin şüpheli koşu bayrakları (kutu, yuksek, gecit) de gitti. Roadmap `docs/GAMES-ROADMAP.md` tarihli notla güncel.

## İlgili
- [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]]
- [[2026-10-13-tussle-eleme-sure-modeli-parti-i]]
