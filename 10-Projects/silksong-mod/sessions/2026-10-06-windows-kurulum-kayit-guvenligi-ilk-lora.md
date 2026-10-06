---
type: session
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong, mod, lora, bepinex]
source: Windows PC oturumu 2026-10-06 (repo C:\Users\yusuf\ZZ\zProjects\silksong-mod, commit'ler 7503b15..40beaeb)
---

# Windows kurulumu, kayıt güvenliği ve ilk stil LoRA'sı

**Yapılanlar**
- Oyun incelendi: Unity 6000.0.50f1, Mono, TK2D sprite'lar, PlayMaker boss FSM'leri, Addressables. Kod ilspycmd ile `D:\SilksongMod\work\decomp\` altına açıldı.
- Kullanıcının kayıtları yedeklendi (`_yedek\`, `D:\SilksongYedek\`, ayrıca kullanıcının masaüstü `saveee`). Oyun `D:\SilksongMod\` altına kopyalandı; Steam kurulumu vanilla kaldı.
- BepInEx 5.4.23.5 + kayıt yönlendirme: [[2026-10-06-kayit-yonlendirme-diske-gomulu-dll]]. Üç tur inceleme (HIGH bulgu fail-open → diske gömülü yama ile kapandı). İlk modlu çalıştırma doğrulandı.
- Tasarım `[doğrula]` maddeleri oyun verisinden kapatıldı (`design/notes-dogrulama.md`); kullanıcı kararları: [[2026-10-06-scoria-denge-ve-lore-kararlari]].
- Veri seti: HK + Silksong'dan 455 görsel (tk2d mesh rasterize), `D:\SilksongMod\work\dataset\`.
- AI ortamı: ComfyUI portable (cu130), kohya sd-scripts (torch 2.8 cu128, Python 3.12 venv), Illustrious-XL v2.0 ve SDXL Base 1.0. Hepsi `D:\SilksongMod\ai\`.
- Deneme eğitimi → taban SDXL Base: [[2026-10-06-lora-tabani-sdxl-base]]. v1 (2400 adım): en iyi checkpoint 1200; sonrasında aşırı öğrenme.

- Akşam: veri seti v2 (Real-ESRGAN x4), stil LoRA v2 (1500 adım, 1000 en iyi, belirgin keskin). 3 konsept turu (18 + 20 + 34 görsel); Yusuf A3/A4/B4/C4/B1 beğendi, çekiç arenaya taşındı, A4 kilitlendi: [[2026-10-06-cekic-arena-sahmerdani-siluet-a4]]. Karakter LoRA `scoria_char_v1` ve Idle denemesi başarılı.

**Sonuç:** Stil öğreniliyor (kontur, düz gölge, gri zemin, lav mağarası arka planları). Scoria konseptleri siluet olarak doğru yönde ama çizgiler bulanık ve tarif tam takip edilmiyor.

**Dersler:** [[2026-10-06-bepinex-preloader-hatayi-yutar]], [[2026-10-06-sd-scripts-onbellegi-modele-ozgu]]

**Sıradaki:** parçalı kukla ve ControlNet ile büyük pozlar; TK2D'ye aktarım ve oyunda Idle testi. Mod tarafında "merhaba" sahnesi ve Deep Docks gizli kapı keşfi.
