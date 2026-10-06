---
type: project
project: silksong-mod
date: 2026-10-06
status: active
tags: [oyun, mod, silksong, unity, lora]
source: Windows oturumu 2026-10-06
---

# Silksong modu: Team Cherry kalitesinde özgün boss

Kişisel kullanım ve arkadaşlarla oynamak için Hollow Knight: Silksong'a mod olarak yeni içerik. Dağıtım yok, ticari amaç yok.

## Güncel durum (2026-10-06, Windows PC)
- Repo: `C:\Users\yusuf\ZZ\zProjects\silksong-mod` (yerel git, remote yok). Proje kuralları ve kurulum komutları repo `CLAUDE.md`'de. Mac'te repo yok; tasarım dosyalarının ana kopyası bu vault.
- Oyun: Unity 6000.0.50f1, **Mono**, TK2D, PlayMaker. Mod kopyası `D:\SilksongMod\Hollow Knight Silksong` (BepInEx 5.4.23.5 kurulu); Steam kurulumu vanilla.
- **Kayıt güvenliği çalışıyor:** modlu kopya kayıtları `...\Hollow Knight Silksong\_SunkenForgeMod\`'a yazar, ilk çalıştırmada doğrulandı. Bkz. [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]].
- Tasarım: [[10-Projects/silksong-mod/design/00-dlc-overview-sunken-forge|DLC çerçevesi]], [[10-Projects/silksong-mod/design/boss-01-kilnwright-scoria|Boss 01 Scoria]], [[10-Projects/silksong-mod/design/notes-dogrulama|doğrulama notları]]. Denge ve lore kararları: [[2026-10-06-scoria-denge-ve-lore-kararlari]].
- LoRA: SDXL Base üzerinde stil LoRA v1 (en iyi checkpoint 1200. adım), `D:\SilksongMod\ai\loras\`. Bkz. [[2026-10-06-lora-tabani-sdxl-base]].
- Henüz mod içeriği (sahne, boss kodu) yok; eklenti şimdilik yalnızca kayıt güvenliği yapıyor.

## Kararlar
- Önce tek tam boss, "DLC" sonra. Gerekçe: hat (tersine mühendislik → LoRA → sprite → mod kodu) bir kez uçtan uca işlemeden kapsam büyütülmez.
- Görsel üretim ve LoRA eğitimi Windows PC'de (RTX 5070); tasarım Mac'te de olabilir.
- Animasyon hibrit: stil LoRA + Scoria karakter LoRA'sı; kareler katmanlı kukladan ControlNet/img2img ile yeniden çizilir.
- Ses ve müzik şimdilik kapsam dışı (Yusuf'un kararı).
- Kayıt yönlendirme diske gömülü DLL ile; mod durumu ayrı dosyada, PlayerData'ya yazılmaz.

## Sıradaki adımlar
1. Parçalı kukla (gövde / kollar / bacaklar / zincir maskeleri) → Walk ve zincir çekme kareleri; büyük pozlar için ControlNet (SDXL lineart/depth, ~2,5 GB, indirme onayı gerekli).
2. Kareleri TK2D sprite collection'a çevirme ve oyunda test (Idle ile).
3. Mod: "merhaba" sahnesi, Deep Docks gizli kapı adayını (Dock_13) oyunda görme.
4. Şahmerdan ve arena nesneleri (örs, zincir, Harpoon Ring) için görsel üretim.

## Oturumlar
- [[2026-10-06-windows-kurulum-kayit-guvenligi-ilk-lora]]

## Notlar
- Oyun asset'leri, veri seti ve LoRA PC'de kalır; arkadaşlara sadece mod klasörü verilir.
