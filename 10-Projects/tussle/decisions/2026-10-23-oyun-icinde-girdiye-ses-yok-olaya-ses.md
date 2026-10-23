---
type: decision
project: tussle
date: 2026-10-23
status: active
tags: [tussle, ses, oyun]
source: Claude Code oturumu "tussle: dokunma sesi ve kademe animasyonu kararı" (2026-10-23)
---

# Karar: oyun içinde girdiye ses yok, yalnız olaya ses var; dokunuşun kendisi olaysa olay sesi

## Bağlam
Ses turundan önce de sonra da 27 oyun view'ı her dokunuşta nötr bir "tık" (eski `click`, yeni `tap`) çalıyordu. Yusuf (23 Eki): jetpack'te eylem basılı tutmak, "tık" bunu karşılamıyor; her oyunda girdinin ne olduğunu ayrı ayrı çözmek çok iş ve tutarsızlık garanti.

## Karar
Oyun view'larında `tap` çağrılmaz (`docs/GAME-CONTRACT.md` ses bölümü, `docs/ses-tasarimi.md` §4). Hareket girdisi (zıplama, itiş, dönüş, bırakma, iniş, fren) sessizdir; varsa titreşim kalır. Dokunuşun kendisi oyun olayıysa (hedefe vurma, kart çevirme, bardak/karo seçme, rakam girme) olay sesi çalar: isabet `hit`/`score`, ıska `miss`, sonucu hemen belli olmayan nötr seçim `pop`. Aynı olayda zaten olay sesi varsa ikinci ses yok. Arayüz düğmelerinde `tap` kalır. Arena view'ları da kapsamda (top çarpışması, kelime bitişi `pop`).

## Neden
Tek kural, oyun başına yorum gerektirmez; Target gibi dokunuşun vuruş olduğu yerler zaten olay sesiyle karşılanır; çift ses ve "dokunduğum şey bu değil" hissi biter.

## Reddedilen alternatifler
- Girdi sesini oyun başına özelleştirmek (basılı tutma, kaydırma sesi): 45 oyunda sonu gelmez, Yusuf istemedi.
- Yalnız seçim oyunlarında `tap` bırakmak: çoğunda zaten ardından isabet/ıska sesi geliyor, fazlalık; sessizlik ölü hissettiren oyun çıkarsa oraya olay sesi eklenir.

## Sonuçlar / riskler
Hareket oyunları (jetpack, hop, flutter, zigzag…) telefonda sessiz hissettirebilir; Yusuf'un telefon teyidi bekleniyor. Yayın c25be1e ([[2026-10-23-tussle-ses-seti-f-girdi-sesi-kademe-rozeti]]).

## İlgili
- [[2026-10-23-kademe-yazisi-hud-rozetinde-konfeti-yok]]
- [[2026-10-22-ses-paleti-recete-wav-motorlar-ornek-calici]]
