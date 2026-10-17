---
type: session
project: tussle
date: 2026-10-17
tags: [tussle, surum, ota, build, akicilik]
source: yan oturum 2026-10-17 gece (mobil-playus, "tussle: sürüm ayrışması ve modüler oyunlar"), dal surum-ayrismasi
---

# Oturum: sürüm ayrışması kartı, tek komut yayın; tembel oyun parçaları yazılıp geri alındı

Karar: [[2026-10-17-oyunlar-tembel-parca-modul-sistemi-rafta]].

## Yapılanlar (dal `surum-ayrismasi`, worktree `.claude/worktrees/surum-ayrismasi`)
1. **`3d99a64` kısa yol:** bilinmeyen oyun / farklı oyun sürümünde "Yeni oyun geldi, yeniden başlat" kartı (`src/client/update*.ts`, `ui/update-ui.ts`, `ota-pick.ts`); web/TWA'da SW güncelle + yenile, iOS'ta inmiş Capgo paketine geç ya da `getLatest → download → set`; aynı derlemeye dönünce "henüz hazır değil". Oyun ekranında bilinmeyen kimlik kartı gösterir; 409 `attempt.version` → hazır kartında "Yeniden başlat". `deploy/release.sh`: yedek → deploy.sh → ota-bundle.mjs → ota.sh; kirli ağaçta durur (`--allow-dirty`), `--skip-ota`.
2. **A yolu (`f6468cb`, main'e ALINMADI, Yusuf 18 Eki: "başlangıçta yüklesin, sorun değil"):** oyunlar vite ile tembel parça; `games/ids.ts` + `meta-registry.ts` + `registry.ts` (sunucu) + `client-registry.ts` (tembel). Ana paket 1 051 586 → 528 498 B (gzip 335 518 → 168 599); 46 parça 5,7–24 KB; `game-kit` 24,5 KB tek parça. Oyun ekranı modülü ilk gerektiğinde bekler (StartGate `prepare`); sayılı hak modül gelmeden başlamaz. `client/prefetch.ts` sıralı boşta kuyruğu, acil kimlikler hemen, Data Saver'da yalnız aciller. 46 oyunda meta↔sim sabit ayrımı (değerler aynı). sw.js v6 / 120.
3. Vault karar notu + bu not. Keşif haritası scratchpad'de kaldı (kalıcı değil); özet: sunucu 9 dosyada registry kullanır; 649 oyun metni anahtarı sözlüklerde; kapaklar tek 2180 satırlık dosyada; `game-icons.ts` `GAME_COLOR`/`gameIcon` ölü kod.

## Süreç
- Ana oturumla aynı klasörde çakışmamak için worktree + dal. Yazar ajan (opus high) → okuma review ajanı (opus medium) → düzeltmeler → commit. Review'de A için determinizm mekanik doğrulandı (eski/yeni sim ve meta export'ları değer değer karşılaştırıldı).
- Oturum süreci bir kez yeniden başladı; ajan yarıda kaldı, yeni ajan kaldığı yerden bitirdi (worktree'deki yarım iş `git status` ile görüldü). Ders: [[2026-10-18-yan-oturum-worktree-ve-surec-yeniden-baslayinca-ajan-kaybi]].

## Açık işler
- Main'e yalnız 1. adım alındı (birleştirme 18 Eki, `3d99a64`); A ile birlikte alınan `4825273` geri sarıldı (A commit'i `f6468cb` reflog'da, dal ve worktree silindi). Yayınlandı (Yusuf onayı, 18 Eki): `bash deploy/release.sh` → sunucu `8a7c6d0`, OTA `tussle-0.20261017.2200.zip` (587 KB), sunucu eski paketlere teklif ediyor (doğrulandı).
- Telefonda: kartın görünümü (yalnız sürüm farkında çıkar), oyun başlangıcında bekleme olmaması, Capgo `getLatest`/`set` gerçek davranışı.
- Hafifletme istenirse: `f6468cb` hazır örnek; ayrıca yalnız aktif dil (~80 KB), tembel kapaklar (~90 KB).
- Küçük: `game-icons.ts` ölü kod; `.gitignore` `node_modules/` sembolik bağı yakalamıyor; profil ekranı bilinmeyen oyunun ham kimliğini gösteriyor.
