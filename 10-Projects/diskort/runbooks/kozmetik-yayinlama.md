---
type: resource
project: diskort
date: 2026-09-30
status: active
tags: [diskort, runbook, kozmetik]
source: memory diskort-cosmetics-plan.md
---

# Yeni kozmetik set: render aracıyla üret, bundle'ı kuru çalıştır, production'a CLI ile yayınla

- **Araç:** `scripts/cosmetic-render/` (gizli Electron + winget ffmpeg). `node scripts/cosmetic-render/render.mjs --set <id>|all [--check] [--pack]`. Set config'i `scripts/cosmetic-render/sets/<id>.mjs`; döngü shader'ları `packages/client-core/src/cosmeticLoops/`, 2D katmanlar `apps/desktop/src/renderer/src/components/cosmetics/layers.ts` (artık yalnız araç).
- **Bundle'lar:** `scripts/cosmetic-render/out/packs/<id>.bundle.json` (gitignored; yayınlanan altısı ana checkout'ta durur).
- **Kuru çalıştırma:** `pnpm --filter @diskort/server exec tsx src/cosmetics-cli.ts publish --dir <geçici> < bundle.json`.
- **Production:** `ssh -i ~/.ssh/diskort_vps root@38.60.208.88 'cd /opt/diskort/infra && docker compose exec -T api node dist/cosmetics-cli.js publish' < bundle.json`; ayrıca `list`, `remove`, `platforms <id> <desktop,android,ios|none>` (platform başına kill switch, release yok), `order`, `prune`, `--force-unlock`. Belge: `docs/kozmetik-paketleri.md`.
- **Parçalar:** kart avif + stacked-h264 + poster; süs ve plaka avif + webp + poster. AVIF tam aralık olmalı ([[kozmetik-avif-tam-aralik]]).
- **Kod haritası:** sözleşme `packages/shared/src/cosmetics.ts`; istemci `packages/client-core/src/cosmeticPacks.ts` (READY'de, 10 dk'da bir, ön plana gelince, bilinmeyen id'de, varlık hatasında yenile); sunucu `apps/server/src/cosmeticPacks.ts`, `cosmeticCompat.ts` (0.9.1 masaüstü bilinmeyen plaka id'sinde render döngüsünü çökertir; `cosmetic_packs` özelliği olmayan istemcilerde yerleşik olmayan id'leri siler), `routes/cosmetics.ts`, `cosmetics-cli.ts`; masaüstü oynatıcı `apps/desktop/.../cosmetics/Cosmetics.tsx` + `pieces.ts`; mobil `apps/mobile/src/components/cosmetics/` (Skia animasyonlu WebP + stacked video, URL başına paylaşımlı oynatıcı, disk önbelleği); Skia Android video yaması `patches/@shopify__react-native-skia@2.6.2.patch`.

## İlgili
- [[kozmetik-sunucudan-paketler]], [[kozmetik-sadece-hover]]
