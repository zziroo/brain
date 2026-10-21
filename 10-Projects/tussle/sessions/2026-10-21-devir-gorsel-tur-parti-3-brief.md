---
type: session
project: tussle
date: 2026-10-21
status: done
tags: [tussle, gorsel, devir, brief, parti-3]
source: Claude Code oturumu "tussle: görsel tur (dolu ama sakin)" (koordinatör, 273k context'te devretti)
---
# Devir notu: görsel tur parti 3 ("yakın" küme) ve parti 4 (büyükler)

Yeni oturum başlığı: `tussle: görsel tur parti 3`. Önceki oturum [[2026-10-21-tussle-gorsel-tur-parti-1]] (ne yapıldı, dersler). Kural [[2026-10-21-oyun-sahnesi-dolu-ama-sakin]].

## Durum (güncelleme 03:50: dalga 1 bitti, bu oturum 318k'da kapandı)
**Parti 3 dalga 1 main`de** (`a5e25b9`, "Visual pass 3a"): stack, reflex, knife-toss, spiral, stop-wheel, how-many, odd-one-out; inceleme 3 düşük (2'si düzeltildi; kalan: how-many elmas şekerinde kontur 1-2 px sprite dışına taşıyor, `drawShape` diamond `r` küçült ya da sprite payı). Kontak `kontak-parti3a-{gece,gunduz}.png` Yusuf'a gönderildi (reflex karesi WAIT ekranı; sonnet değerlendirmesi "zayıf" ama tasarım gereği tam ekran durum rengi, sonuç ekranı zeminli). **Kalan: dalga 2** (hop, flutter, jetpack, beat, trace, lane-dash, right-door) ve parti 4. Ajan brief dosyası scratchpad'de kaybolmuş olabilir; aşağıdaki "Ajan brief'i"nden yeniden yaz, parti 3 ek notu: mevcut çizimi koru, zemin/hacim/boyut ekle, rapor ≤12 satır.

Önceki: main `cfe9b76` (parti 1 `ded9bd4`, parti 2 `a1a3418`, Gece V2 `cfe9b76`); 13 oyun yeni kuralda: four-arrows, make-10, bridge, target, snake, keep-up, chain, spike-wall, lights, color-match, quick-math, double-tap, flip-match. Yayın YOK (Yusuf kararı; `deploy/release.sh`). Yusuf uyuyor (21 Eki ~03:00–10:00), "gidebildiğin kadar git" dedi; kontak sayfaları ona gönderildi, telefon teyidi bekliyor. Testler 2440/2440, typecheck temiz.

## Önce oku (bir kez)
1. `docs/VISUAL.md` §2.1 (satır ~149-205) kural + kontrol listesi; §7 sahne kiti satırı.
2. `src/games/view-kit.ts` ~370-760 sahne kiti (`bakeGround/drawGround`, `volumeStyle`, `faceLook`, `shine`, `contactShadow`, `mixHex`, `coverColors`, `bakeLayer`).
3. Kalıplar: `src/games/four-arrows/view.ts` (kahramansız), `src/games/bridge/view.ts` (yüzlü kahraman + band zemin), `src/games/make-10/view.ts` (table), `src/games/keep-up/view.ts` (letterbox'ı kaplayan band + sütunlar).
4. Ajan brief kalıbı: önceki oturumun scratchpad'i silinmiş olabilir; brief'i aşağıdaki "Ajan brief'i" bölümünden yeniden yaz (dosyaya koy, ajanlara yolunu ver).

## Parti 3: "yakın" küme (küçük dokunuş: zemin + renk/boyut; sonnet olabilir, design hassasiyeti olanlar opus medium)
stack, reflex, knife-toss, spiral, stop-wheel, how-many, odd-one-out, hop, flutter, jetpack, beat, trace, lane-dash, right-door. Analizdeki eksikler ([[gorsel-2026-10-21/analiz]] §b "yakın" satırları): çoğunda zemin/masa yok ya da sayfa boş; kahraman küçük (hop, flutter, jetpack); nesneler soluk (trace, beat). 7'şerli iki dalga önerilir (ajan başına port 5221+, tek alıcı 5199).

## Parti 4: büyükler (opus, medium/high; sahne baştan)
treasure, brake, cups, balance, pinata, slice, sort-it, arrow-wall, color-recall. Not: cups 21 Eki'de düzeltildi (feedback turu 2), açılıyor. arrow-wall ve spike-wall kalıbı (LUT) var.

## Ajan brief'i (parti 1-2'de kullanılan; aynen yeniden yaz)
- Tek oyunun `src/games/<id>/view*.ts`; sim/meta/test/view-kit/shell/arena dosyalarına dokunma; commit yok; i18n gerekirse tr+en.
- Lean-context: kod haritası "Oyun kalıbı" (76-84), ≤500 satır tek okuma, grep ile aralık, çıktı grep ile süzülür, görüntü okuma ≤2.
- Kural özeti: opak zemin (kapak renginden, **letterbox dahil**: `x:-vp.field.x, w:vp.width, h:vp.height-vp.field.y-hy`; boş sayfa ≤ %40), ana nesne kısa kenarın ≥ %25'i (sim izin verdiği ölçüde; isabet alanından küçük çizim yok, büyümesi gerekiyorsa "sim önerisi" olarak raporla), her nesne `volumeStyle` + kontur + `contactShadow`, tek `shine`, ≥ 3 candy, kapak çifti en büyük iki alanda, **yüz yalnız oynatılan karakterde** (seyirci maskot/tuş yüzü yok), zemin shake `translate`'inden önce, kare başına ayırma yok, gradient/pattern yalnız layoutGame, sabit hex yok.
- Yerleşim/boyut view'da serbest (Yusuf), sim değişmez.
- Önce/sonra 375x812 iki tema: alıcı `node scripts/canvas-shot/recv.mjs <klasör>` (5199, koordinatör bir kez başlatır), vite ajan başına port + HMR kapalı (scratchpad'de kök `vite.config.ts`'i saran config), `scripts/canvas-shot/README.md` + `run.js`, adlar `<id>-{once,sonra}-{gece,gunduz}[-temiz]`. `?debug=1` yeşil; testler `npx vitest run tests/<id>.test.ts tests/mini-sweep.dom.test.ts tests/mini-theme.dom.test.ts tests/theme-contrast.test.ts` + `npm run typecheck`.
- Rapor: dosyalar, sahne tarifi 5-8 satır, test/debug, görüntü yolları, sim önerisi, eksikler.

## Koordinatör döngüsü (parti başına)
Ajanlar → tam `npx vitest run` + typecheck (server-daily paralel yükte bir kez takıldı, tek başına geçer) → kontak sayfası (`kontak.html` kalıbı: canvas'a çiz, 5199'a POST; `onload`+timeout, sekme öne, `python3 -m http.server`) → Yusuf'a SendUserFile → `inceleme` (opus medium, diff) → orta+ bulguda `supheci` → düzeltme (sonnet) → commit main ("Visual pass N: …", Co-Authored-By satırı) → vault oturum notu + `_overview.md` 9. madde. `harita.mjs kontrol`: 3 bozuk referans arena commit'inden, bizim değil.

## Dersler (dalga 1)
- Bir ajan `git stash`/`pop` yaptı (başka ajanların değişiklikleri birkaç saniye kayboldu, zarar olmadı): brief'e "git stash yasak" ekle.
- Tarayıcı sekme sınırı doluyor: ajanlara "bitince sekmeni kapat" zaten var, koordinatör arada `tabs_context` ile artık sekmeleri kapatsın.

## Yusuf'a açık sorular (uyanınca)
- Gece V2 (mürekkep kontur + koyu gölge) uygulandı, beğenmezse `git revert cfe9b76`.
- Yayın kararı (13 oyun main'de, canlı a396f75'te).
- Ajan sim önerileri (keep-up R_MIN, bridge HERO_R, chain TOKEN_R, snake COLS/ROWS, spike-wall R/WALL, double-tap satır, flip-match CARD_MAX_W/GRID_H): hepsi replay'i değiştirir, test aşamasında geri uyum gerekmez (hafıza dosyası `geri-uyum-gerekmez`) ama karar onun.
