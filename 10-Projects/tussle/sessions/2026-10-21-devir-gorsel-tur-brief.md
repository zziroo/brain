---
type: session
project: tussle
date: 2026-10-21
status: active
tags: [tussle, gorsel, devir, brief]
source: Claude Code oturumu "tussle: mevcut durum kapsamlı çalışma" (koordinatör); yeni oturum uzaktan kontrolde açılamadı, brief burada
---
# Devir notu: görsel tur ("dolu ama sakin") için oturum brief'i

Yeni oturum başlığı: `tussle: görsel tur (dolu ama sakin)`. Aşağıdaki metin olduğu gibi yeni oturumun ilk mesajı olabilir.

## Arka plan
Yusuf 2026-10-21: "Bazı oyunlar çok çok basit görünüyor; banner'lardaki (kapak) görseller daha kaliteli ama içerideki oyun basit. Road Rush, Bounce, Crack It, Hoop, On Time, Fill Up, Split'i beğeniyoruz. Tüm oyunları aynı temada ve aynı çizim kalitesinde tekrar görselleştir." Analiz: [[gorsel-2026-10-21/analiz]] (hedef tarz, 3 küme, §2.1 taslak kuralı, kapak-oyun farkının kaynağı, iş sırası) + yanındaki üç PNG. Karar: [[2026-10-21-oyun-sahnesi-dolu-ama-sakin]] (12 Eki "sade" kuralını değiştirir). Değişmeyenler: kare başına ayırma yok, efekt yalnız olayda, serpinti/konfeti/yıldız zemin yok, metin kabuktan, sim'e dokunulmaz (skor/replay aynı, meta.version artmaz). Yusuf tercihleri: büyük görsel değişikliği önce/sonra göster, nihai estetik karar onun; "şeker şeker" ve düz daire-yüz istemez. Aynı klasörde arena/Sumo oturumu çalışıyor: `src/shared/arena/`, `docs/ARENA-*`, `challenge-sheet.ts`, `match-card.ts`, `room.ts`, `src/server/live.ts`, `protocol.ts` dokunulmaz; ortak dosyalarda hunk bazlı stage (`git diff -U0` + hunk seç + `git apply --cached --unidiff-zero`). Yayındaki sürüm: main `a396f75`, OTA 0.20261020.2314, 39 oyun.

## Önce oku (her dosya bir kez)
1. analiz.md + üç PNG. 2. Karar notu + `docs/VISUAL.md` §2.1 (~149-204) ve §1.2. 3. `docs/kod-haritasi.md` "Oyun kalıbı" (76-84) + tema/token satırları; `src/games/view-kit.ts`, `view-api.ts`, `src/games/shell/`; `src/client/ui/covers-core.ts` `face()` (~120-136), `block()` (~115), `ball()` (~1173), `backdrop()` (~139-147). 4. `src/mini/recorder.ts` MiniContext2D metot listesi (yeni yardımcılar yalnız bunları kullanır; testler `tests/mini-sweep.dom.test.ts`, `mini-theme.dom.test.ts`, `theme-contrast.test.ts`). 5. Referans view'lar: `src/games/bounce/view.ts`, `src/games/hoop/view.ts`.

## Aşamalar
- **A. Kural:** VISUAL.md §2.1'i taslağa göre yeniden yaz ("2.1 Oyun sahnesi: dolu ama sakin (2026-10-21)"; 2 satır tarihçe; yasaklar aynen; referanslar: road-rush, bounce, crack-it, hoop, on-time, fill-up, split, zigzag, chop; kontrol listesi: iki tema önce/sonra, okunurluk, debug kare grafiği yeşil, sim dokunulmaz, view-kit yardımcıları).
- **B. Ortak altyapı** (1 ajan, opus high; yalnız `view-kit.ts`/`view-kit-motion.ts` + deneme oyunu `four-arrows` view'ı): `drawFace`'e kapak `face()` eşdeğeri (yanak + göz parıltısı); `bakeGround(theme, coverId, opts)` kapak renginden opak zemin şeridi (layoutGame'de pişirilir, iki temada `mixHex`); `stickerStyle` hacim yüzü varsayılanı (edgeH ≥ 4u, candy %25-38 koyu) + `shine()`; hepsi MiniContext2D içinde; testler + VISUAL.md §7. Ajan dosyaları ve kalıbı listeler.
- **C. İlk parti** (paralel ajanlar, yalnız kendi `src/games/<id>/view*.ts`, sim/meta dokunulmaz): make-10, bridge, target, snake, keep-up, chain, spike-wall. Brief: B'nin yardımcıları + four-arrows kalıbı; kapak (SCENES[id]) palet/karakter kaynağı; önce/sonra iki tema (canvas-shot, ajan başına port 5221-5228, kendi sekmesi, 375x812; vite 5174'te olabilir; HMR yenilerse HMR'siz geçici vite); `?debug=1` yeşil; `npx vitest run tests/<id>.test.ts tests/mini-sweep.dom.test.ts`, `npm run typecheck` (grep ile süz).
- **D. Gösterim:** 8 oyunun önce/sonra görüntülerini koordinatör açar, kontak sayfasına dizer, Yusuf'a gönderir (oyun başına tek satır). Onay sonrası `inceleme` (diff: view + view-kit), bulgu varsa `supheci`; commit main ("Visual pass 1: ..."), `harita.mjs kontrol`. Yayın kararı Yusuf'un (`deploy/release.sh`, HEAD'den geçici worktree).
- **E. Sonraki partiler:** arayüz-benzeri (lights, color-match, quick-math, double-tap, flip-match); "yakın" küme (küçük dokunuş, sonnet olabilir); büyükler (treasure, brake, cups, balance, pinata, slice, sort-it, arrow-wall, color-recall). Parti öncesi `get_usage`; 300k üstünde vault + devir.

## Kurallar
Ajanlar commit atmaz; sim/meta değişmez; arena dosyalarına dokunulmaz; i18n anahtarı gerekirse tr+en birlikte, Edit ile; kapağa birebir kopya değil, kapağın paleti/karakteri sahnede; her parti sonunda vault oturum notu + `_overview.md` 9. madde.
