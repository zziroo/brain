---
type: session
project: tussle
date: 2026-10-09
status: active
tags: [tussle, oturum, parti-g, parti-h]
source: oturum 2026-10-09 (mobil-playus: Playus katalog taraması, Parti G+H)
---

# Oturum: Playus kataloğu taraması ve Parti G+H (14 oyun, yayın `30532cf`)

- **Kaynak:** Yusuf'un verdiği iki YouTube listesi (Playus, ~70 oyun) küçük resim + adla tarandı; videolar izlenmedi. Seçim ve gerekçeler `docs/GAMES-ROADMAP.md` "Parti G–H". Yusuf: "uygun gördüklerini ekle, 50'yi geçebiliriz, zayıfları sonra eleriz; planına sadık kal".
- **Üretim:** koordinatör 14 iskeleti `new-game` ile üretip commit etti (`23a6973`), 14 opus ajanı paralel, ortak çalışma kopyasında yalnız kendi klasörlerinde; tarayıcı testi her ajanın kendi kopyası + vite/CDP portunda (5201–5214 / 9401–9414). Ortak brief `scratchpad/games/BRIEF.md` kalıbı işe yaradı; kimse birbirini kırmadı. Kapaklar ayrı tek ajan (oyunlar bitince, ortak dosya).
- **Ortak eklemeler (koordinatör):** skor birimleri kesim (bambu), yuzde (renkhafiza; TR "90,6 %"), vurus (havada), tugla. Bambu view'da `meta` importu eksikti, düzeltildi.
- **İnceleme:** iki opus inceleme + sonnet şüpheci. Bambu (yüksek): tempo sınırı yoktu, bot 2.400 kesim → en az 6 tik aralık + sürekli artan tüketim (bot ~340). Kes: daire ovalama 5× komboyu koruyordu → 150° birikimli dönüşte vuruş biter. Yörünge: spam → 5 tik dokunuş aralığı (spam 0 m); önerilen "tutunduktan sonra fırlatma yok" düzeltmesi spam'i iyileştiriyordu, şüpheci yakaladı. Düşükler: tamzaman ceza, yilan şeker yedeği, kes rng havuzu, tamzaman/renkhafiza şüpheli bayrakları.
- **Yayın** `30532cf`: 1.593 test, yedek `pre-30532cf.db`, canlıda Antrenman 50 oyun, yer tutucu kapak yok.
- **Bütçe:** haftalık %89 → ~%93 (14 oyun ajanı ≈ 210–260k token/ajan).

**Doğrulanmadı:** 14 oyunun hiçbiri telefonda oynanmadı; dengeler bot tablolarına dayanıyor. Şüpheli bayraklar hâlâ hiçbir yerde gösterilmiyor (flood bayrağı da yalnız saklanıyor).
