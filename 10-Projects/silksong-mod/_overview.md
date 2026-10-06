---
type: project
project: silksong-mod
date: 2026-10-06
status: active
tags: [oyun, mod, silksong, unity, lora]
source: ZZ kök oturumu 2026-10-06
---

# Silksong modu: Team Cherry kalitesinde özgün boss

Kişisel kullanım ve arkadaşlarla oynamak için Hollow Knight: Silksong'a mod olarak yeni içerik. Dağıtım yok, ticari amaç yok.

## Durum
- 2026-10-06: Genel DLC çerçevesi (`design/00-dlc-overview-sunken-forge.md`: The Sunken Forge, 7 oda, 3 düşman, mini-boss, NPC, Wish, Crest; v0.1/0.2/0.3 sürümleri) ve ilk boss (`design/boss-01-kilnwright-scoria.md`) yazıldı. Tasarım dosyaları `~/ZZ/zProjects/silksong-mod/design/`.
- Henüz kod yok. Proje klasörü: `~/ZZ/zProjects/silksong-mod/`.

## Kararlar
- Önce tek tam boss, "DLC" sonra. Gerekçe: hat (tersine mühendislik → LoRA → sprite → mod kodu) bir kez uçtan uca işlemeden kapsam büyütülmez.
- Görsel üretim ve LoRA eğitimi Windows PC'de (RTX 5070); tasarım ve rig kodu Mac'te olabilir.
- Animasyon: oyun kare kare el çizimi kullanıyor. Yaklaşım hibrit: gövde kareleri LoRA ile, hareketli parçalar (kol, iğne, zincir) katman olarak kodla.
- Ses ve müzik şimdilik kapsam dışı (Yusuf'un kararı).

## Sıradaki adımlar (Windows oturumu)
1. Oyun klasörünü aç: Mono mu IL2CPP mi, Unity sürümü.
2. BepInEx kur, boş eklenti yüklendiğini doğrula.
3. AssetRipper ile sprite atlas'larını çıkar; tasarımdaki `[doğrula]` işaretlerini kapat.
4. ComfyUI + SDXL LoRA hattı.

## Notlar
- Oyun asset'leri ve LoRA PC'de kalır; arkadaşlara sadece mod klasörü verilir.
