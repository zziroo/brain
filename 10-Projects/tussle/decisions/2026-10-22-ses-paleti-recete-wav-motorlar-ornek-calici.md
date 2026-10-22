---
type: decision
project: tussle
date: 2026-10-22
status: accepted
tags: [tussle, ses, haptik, native, ota]
source: Claude Code oturumu "tussle: ses tasarımı" (2026-10-22)
---
# Karar: 15 adlık ses paleti, reçete → WAV, üç motor örnek çalıcı, bitiş ve son 3 sn sesi kabukta

## Karar
- Sesler sentetik tasarlanır (`scripts/ses/recete.js`, demo sayfasında A/B dinlenir) ama **WAV olarak** gönderilir (`src/client/public/sfx`, 24 dosya, 157 KB). Web, Android ve iOS motorları sentez portu olmaktan çıkıp örnek çalıcı oldu; bir ses değişikliği tek reçeteye dokunur, OTA ile dağıtılır (native yalnız ilk seferde mağaza sürümü ister).
- Palet: tap, pop, hit, miss, score(step 0–7), countdown, go, level, tick, urgent(step 0–2), win, lose, badge, whoosh, thud. Eski click/success/fail bir sürüm takma ad.
- Bitiş sesi (win/lose) ve son 3 sn uyarısı (urgent) oyunlarda değil kabukta; `GameMeta.end` + `endSound` + `state.won` + view `endSound?(sim)` kancası. Combo merdiveni tek kural `comboStep(n)=min(7,n−1)`; ses↔titreşim tablosu `HAPTIC`, `sfxHaptic`.
- Müzik/ambiyans yok. Arayüzde ses azınlık (sohbet, katılım, toast sessiz); dikkat isteyen anlar (rakip hazır, davet, rozet, hediye) ses alır.

## Neden
Yusuf "eskiler fena değildi" dedi; asıl sorun tınıdan çok anlam haritasıydı (tick 9 anlamda, go iki anlamda, süre dolunca kimi oyun success kimi fail) ve üç ayrı sentez motoru. Yusuf demoda "Hepsi A"yı onayladı.

## Reddedilen
- (a) Yalnız sentetik yeniden tasarım: her yeni ses 3 port + kulakla eşleme (Sfx.kt Chromium kompresörünü satır satır taklit ediyordu).
- (b) CC0 örnek paketleri: karakter tutarsız; aynı çalıcı altyapısıyla ileride yine mümkün.
- Parti açılış jingle'ı: istenmedi, sadelik.

## İlgili
[[2026-10-22-tussle-ses-tasarimi-turu]], docs/ses-tasarimi.md (repo), [[2026-10-22-arena-olay-geri-bildirimi-ve-kisa-mac]]
