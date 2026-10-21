---
type: session
project: tussle
date: 2026-10-21
status: active
tags: [tussle, gorsel, sahne-kiti, parti-1]
source: Claude Code oturumu "tussle: görsel tur (dolu ama sakin)" (koordinatör Fable; ajanlar opus/sonnet)
---
# Görsel tur, parti 1 + 2 + Gece kontrast + parti 3a: kural, sahne kiti, 20 oyun (gece 02:00–03:50)

Devir notu [[2026-10-21-devir-gorsel-tur-brief]] aynen uygulandı. Karar [[2026-10-21-oyun-sahnesi-dolu-ama-sakin]].

## Yapılanlar (main `ded9bd4`, yayın YOK)
- **A. Kural:** `docs/VISUAL.md` §2.1 "dolu ama sakin": opak zemin (kapak renginden, letterbox dahil, boş sayfa ≤ %40), ana nesne kısa kenarın ≥ %25'i, her nesne hacim yüzü + kontur + temas gölgesi, tek shine, ≥ 3 candy, **yüz yalnız oynatılan karakterde** (Yusuf: seyirci maskot fazlalık), yasaklar aynı. `docs/GAME-CONTRACT.md` §5 ve §8'e sahne kiti satırı.
- **B. Sahne kiti** (`src/games/view-kit.ts`): `bakeGround/drawGround` (`band|full|table`), `volumeStyle`, `faceLook` + `drawFace(look)`, `shine`, `contactShadow`, `mixHex/shadeOf/outlineTone/groundTones`, `COVER_COLORS` (theme.css aynası, test `tests/view-kit-scene.dom.test.ts` eşitliği zorlar; yeni kapak eklerken satır gerekir). Geriye uyum: `drawFace` look opsiyonel, `stickerStyle` değişmedi (34 dosya), `volumeStyle` yeni.
- **C. 8 oyun:** four-arrows (kalıp; masa + zemin, maskot çıkarıldı), make-10 (erik tahta, sarı daireler), bridge (vadi, lavanta kayalar, kalın köprü, yüzlü kahraman), target (opak atış duvarı, hacimli diskler, yüz kaldırıldı), snake (periwinkle zemin, çerçeve, çim yatak, dolgun tırtıl), keep-up (limon zemin, kalın sütunlar, yüzlü top; her vuruşta spark kaldırıldı), chain (macenta masa, amber/krem pullar, ip), spike-wall (lavanta kuyu, taş blok duvarlar, büyük dikenler, yüzlü damla).
- **İnceleme** (opus) 1 orta + 2 düşük, şüpheci CONFIRMED: zemin bandı letterbox'a taşmıyordu (bridge/four-arrows/target; Xiaomi 20:9'da altta boş şerit) → `x:-vp.field.x, w:vp.width, h:vp.height-vp.field.y-hy`; make-10 zemini shake translate'inden önce; target vuruş sprite'ı slop ile ölçeklenir. Testler 2440/2440, typecheck temiz (server-daily paralel yükte bir kez zamanlama hatası, tek başına geçti).

## Parti 2 (main `a1a3418`) ve Gece V2 (`cfe9b76`)
- **Parti 2, arayüz-benzeri 5 oyun:** lights (lavanta zemin, mavi pano, 4 lamba tuşu: mercan/sarı/nane/pembe, yüz kaldırıldı), color-match (pembe masa, krem levha + koyu yazı tahtası, ✓/✗ oyuncak tuşlar konsolda), quick-math (lavanta zemin, mor masa + mor işlem levhası, 4 candy tuş, baykuş maskot kaldırıldı; drawCheck/drawCross'un textAlign sızması düzeltildi), double-tap (mercan zemin, tepsi + 20 çukur tek katman, hacimli şekerler, ömür yayı mürekkep), flip-match (pembe zemin, ahududu keçe masa, lavanta kart arkası desensiz, büyük candy semboller). İnceleme: yalnız düşük (sim sabit kopyası) → flip-match `GRID_CY/GRID_H` ve target `TOUCH_SLOP/BULL_SLOP` sim'den export edilip import edildi (davranış değişmez). Testler 2440/2440.
- **Gece kontrast (Yusuf: gri kontur ve morumsu gölge zayıf):** worktree'de V1/V2/V3 four-arrows + chain çekildi (`kontak-gece-varyant.png`); V2 açık farkla en net → uygulandı: `outlineTone` Gece `mixHex(ink, line, 0.3)`, `groundTones.shadow` Gece %55 mürekkebe. Tek commit, Yusuf beğenmezse `git revert cfe9b76`. VISUAL.md §2.1 kontur satırı güncellendi.
- Ajan sim önerileri (parti 2): double-tap şeker için 5→4 satır ya da CELL_DY; flip-match `CARD_MAX_W` 0.27→0.40, `GRID_H` 0.66→0.72 / `CARD_RATIO` 1.25→1.15 (ilk tahtada ızgara %58 genişlik).
- Doğrulanmadı: flip-match "Tahta N" etiketi 360x640'ta üst alan açıkken HUD'a yaklaşabilir; lights/color-match/quick-math/double-tap/flip-match Gündüz son çekimlerine ajanlar bakmadı (kontak sayfasında koordinatör gördü, sorun yok).

## Parti 3 dalga 1 ("Visual pass 3a")
stack, reflex, knife-toss, spiral, stop-wheel, how-many, odd-one-out: mevcut çizim korunup zemin (letterbox dahil), kaide/konsol, hacim, kontur, gölge eklendi; yüzler kaldırıldı (knife-toss kütük, stop-wheel göbek, how-many ruh hali), oynatılan nesne yüzleri kaldı (stack blok, spiral top, reflex göz, odd-one-out pullar oyun bilgisi). İnceleme 3 düşük, 2 düzeltildi (spiral top ≤ dilim genişliği, stop-wheel konsol shake içinde). Testler 2440/2440. Sim önerileri: stack `FULL_W` 0.5→0.6; how-many `CANDY_R` 0.046 büyütme.

## Kontak sayfaları
`scratchpad/shots/kontak-parti1-{gece,gunduz}.png` (Yusuf'a gönderildi; oturum scratchpad'i geçici). Üretim: `kontak.html` tarayıcıda canvas'a çizip `scripts/canvas-shot/recv.mjs`'e POST (ImageMagick/PIL yok).

## Ajan "sim önerileri" (Yusuf kararı, uygulanmadı)
- keep-up `R_MIN` 0.075→0.1 (top küçüldükçe %25 kuralı altına iniyor); bridge `HERO_R` 0.045→0.06; chain `TOKEN_R` 0.08→0.1 (dokunma alanı çizimin 1.44 katı, bilinçli tolerans); snake daha büyük tırtıl için `COLS/ROWS` azaltma (denge kararı); spike-wall `R` 0.058→0.07 ve `WALL` artışı. Hepsi sim/replay değiştirir.

## Açık / sıradaki
- **Yusuf teyidi:** 3 kontak sayfası + Gece varyant sayfası gönderildi (parti 1 Gece/Gündüz, parti 2 Gece/Gündüz, varyantlar); telefonda his teyidi ve yayın kararı onun.
- Parti 3 ("yakın" küme, 14 oyun, küçük dokunuş) ve parti 4 (büyükler 9) sırada: devir notu [[2026-10-21-devir-gorsel-tur-parti-3-brief]].
- Kod haritası `harita.mjs kontrol`: 3 bozuk referans arena commit'inden (ClientMsg/ain/onArenaInput satır 25, 131), bu oturumun değil; düzeltilmedi.
- Bilinen zayıflar: bridge platform hacmi küçük görünüyor, target gündüz duvarı grimsi, spike-wall/snake/chain kahraman %25 kuralını sim yüzünden karşılamıyor.

## Dersler
- Ajan brief'inde "yüz" istemek seyirci maskot üretti; kural artık açık (hafıza dosyası `yuz-yalniz-oynatilan-karakterde`).
- DOM tipli test `tests/*.dom.test.ts` adlanmalı, yoksa kök tsconfig 35 hata verir (ajan "typecheck temiz" demişti; koordinatör doğrulamalı).
- Paralel 7 ajan + tek alıcı (5199, ad bazlı) sorunsuz; vite ajan başına port + HMR kapalı. HMR kapalıyken ilk yükleme bayat modül getirebilir: `/@fs/...view.ts`'i `cache:'no-store'` ile fetch edip yeni query ile aç (flip-match ajanı).
- Koordinatör ajanlar tarayıcıdayken `navigate`'i tabId'siz çağırınca bir ajanın sekmesini ele geçirdi; ajanlar çalışırken tarayıcıya dokunma ya da `tabs_create` + tabId kullan.
- Kontak sayfası: gizli sekmede `img.decode()` askıda kalıyor; `onload` + zaman aşımı kullan, sekmeyi `tabs_select` ile öne al; python `http.server` tek iş parçacıklı, takılırsa yeniden başlat.
