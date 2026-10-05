---
type: decision
project: kapis
date: 2026-10-05
status: active
tags: [kapis, tema, render, mimari]
source: oturum 2026-10-04/05 (web-fps-game, dünya temaları); repo docs/THEMES.md
---

# Karar: temalar ThemeDef sözleşmesiyle yazılır, dünya ekran dışında aşamalı kurulup takılmadan değiştirilir

## Bağlam
6 tema altı paralel ajana yazdırılacaktı; ortak çizim koduna dokunmadan, takılmadan değişen ve sızıntısız bir dikiş gerekiyordu.

## Karar
- `src/client/render/themes/types.ts` → `ThemeDef`: atmosfer (sis, ışık, pozlama, post-fx grade), palet (bölge renkleri: batı mavi, doğu kırmızı; pad, can), malzeme etiketi başına yüzey boyacısı, yüzey gölgelendirici kancaları, tek `build(ctx)` (birleşik glow/decor ağları, ışık alanı yayıcıları, parçalar).
- Ortak kit (`render/themes/kit`), neon ilk tema olarak taşındı ve **birebir aynı** kaldı.
- Ana makine (`world.ts`, `theme-switcher.ts`): her tema ayrı Vite parçası; dünya **ekran dışında aşamalı** kurulur (ışık alanı Web Worker'da, gölgelendiriciler gerçek render hedefine önceden derlenir, dokular parça parça yüklenir), sonra takas; son çağrı kazanır; hata → neon.
- Sonuç ekranında sıradaki tema önceden kurulur (geçiş anlık). Üretimde ilk kez geçiş ~0,45–0,6 sn.
- Tema yazarının sözleşmesi + kurallar + bütçe: repo `docs/THEMES.md`; çalışma tezgâhı `gallery.html?theme=<id>` (yer imleri, mankenler, ray testi, sızıntı testi, PNG kaydı).

## Neden
- Tema ajanları yalnız kendi klasörüne yazabilsin, paralel çalışsın.
- Arkadaşların dizüstlerinde (iGPU) geçiş takılması olmasın.

## Reddedilen alternatifler
- Her tema tüm WorldView'ı kendisi uygular: kalite ayarı, atma, takas her temada tekrar eder.
- Yalnız veri (renk/doku parametresi) ile tema: görsel özgürlük çok az kalır.

## Sonuçlar / riskler
- Işık alanı yayıcı renkleri iki kez dönüşüyor (eski neon davranışı, neon aynı kalsın diye korundu); THEMES.md'de belgelendi.
- Vitrinde önceden kurulmamış temaya tıklanınca kısa karanlık geçiş kalıyor; görünümden "hazır" sinyali ile giderilebilir.

## İlgili
- [[2026-10-05-dunya-temalari-yalniz-gorunum-ayni-harita]], [[2026-10-05-tema-gorsel-tuzaklari]], [[_overview]]
