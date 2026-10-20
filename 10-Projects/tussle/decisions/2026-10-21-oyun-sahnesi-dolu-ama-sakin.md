---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, gorsel, tema, oyun-sahnesi]
source: Claude Code oturumu "tussle: mevcut durum kapsamlı çalışma", görsel analiz ([[gorsel-2026-10-21/analiz]]); oturum notu [[2026-10-21-tussle-geri-bildirim-turu-2-ve-gorsel-analiz]]
---

> Değiştirir: [[2026-10-12-oyun-sahnesi-sade]] (VISUAL.md §2.1 "sade").

# Oyun sahnesi "dolu ama sakin": opak zemin, hacimli kahraman, kapak paleti sahnede

**Karar:** `docs/VISUAL.md` §2.1 "sade"den "dolu ama sakin"a çevrilir (taslak [[gorsel-2026-10-21/analiz]] §c). Özet kural:
- Sahne bir "yer"dir: kahramanın bastığı opak zemin/masa/saha/yol katmanı zorunlu, `layoutGame`'de pişirilir, kapak renginden türer (gece `mixHex(bg, candy, 0.25-0.35)`). Boş tema sayfası ekranın en fazla %40'ı.
- Kahraman/ana nesne kısa kenarın en az %25'i.
- Her nesne: tek dolgu + ikinci ton hacim yüzü (`edgeH` ≥ 4u, candy'nin %25-38 koyusu) + kontur 2.5-3u (gündüz `theme.ink`, gece `theme.line`/`muted`) + yere temas gölgesi.
- Yuvarlak kahramanda pişirilmiş tek parlaklık izi serbest; yüzde yanak + göz parıltısı (kapaktaki `face()`).
- Sahnede en az 3 candy rengi; kapağın ana renk çifti en büyük iki alanda.
- 1 opak zemin + en fazla 1 soluk uzak katman; statik dekor ≤ 6; gradient yalnız `layoutGame`'de pişirilmiş sis/HUD bandı.

**Değişmeyenler:** kare başına ayırma yok; efekt yalnız olayda; metin kabuktan; serpinti/konfeti yok; sim'e dokunulmaz.

**Neden:** Yusuf 2026-10-21: "bazı oyunlar çok basit görünüyor, banner'lar daha kaliteli." Analiz: beğendiği 7 oyun (road-rush, bounce, crack-it, hoop, on-time, fill-up, split) zaten §2.1'in dışına çıkmıştı (tam ekran zemin, gradient sis, parlaklık izi); §2.1 uyan oyunlar (22 oyun "baştan" kümesinde) boş koyu sayfa, hacimsiz ve küçük nesnelerle arayüz gibi görünüyordu. Kapak ile oyun arasındaki fark zemin rengi, kompozisyon, ışık ve hacimden geliyordu.

**Reddedilen alternatifler:**
- Kapakları sadeleştirip sahneye eşitlemek: kaliteli bulunan taraf kapaklar, düşürmek yanlış yöne gider.
- Sahneye gradient/pattern serbestliği: kare maliyeti ve "her taraf şeker" kalabalığı (12 Ekim sorunu) geri gelir; baked tek zemin yeterli.

**Uygulama:** Önce ortak altyapı (`view-kit`'e kapak `face()` eşdeğeri, `bakeGround(theme, coverId)`, varsayılan hacim kenarı), sonra 8'lik partiler (ilk: four-arrows, make-10, bridge, target, snake, keep-up, chain, spike-wall). Ayrı oturumda başlıyor. Yusuf 2026-10-21'de yönü onayladı.
