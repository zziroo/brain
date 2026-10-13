---
type: session
project: tussle
date: 2026-10-13
status: done
tags: [tussle, oturum, kapak, oyun-havuzu, varyant, parti]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Oturum: şekersiz kapaklar, Parti J, varyantların kaldırılması ve Dört Ok

Günün ikinci oturumu (önceki: [[2026-10-13-tussle-eleme-sure-modeli-parti-i]]). Repo main `2609905` → `3fe3dc2` (18 commit), GitHub `zziroo/tussle` aynı.

- **Kapaklar şekersiz:** 24 kapak yeniden çizildi, küçük resimler kendiliğinden düzeldi, `docs/VISUAL.md` §4.1. [[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]]
- **Terazi, İp Atla, Fırlat silindi; Parti J:** Köprü Kur, Ok Duvarı, Topla 10. [[2026-10-13-terazi-ip-atla-firlat-yerine-parti-j]]
- **Varyantlar kaldırıldı:** 12 oyunda yalnız ilk mod, sim birebir, altın tohum testleri. [[2026-10-13-varyantlar-kaldirildi-oyunlar-tek-ve-sabit]]
- **Öncelik:** önce Capacitor/mağaza, denge sonra. [[2026-10-13-once-magaza-sonra-denge]]
- **Dört Ok:** Yusuf telefonda 3 tur denedi, v3 yayında. [[2026-10-13-dort-ok-oyunu]]
- **Yayınlar:** canlı rev `3fe3dc2`; bugünkü yayınlar `fd7368a`, `f04ef65`, `e1c252f`, `2db56a3`, `3fe3dc2`; her yayın öncesi `/opt/tussle/data/pre-<rev>.db` yedeği. DB şeması değişmedi (13). Yeni yardımcı `deploy/release.sh` = yedek + `deploy/deploy.sh`. 1.699 test yeşil. 51 oyun.
- **Doğrulanmayanlar:** Parti J'nin üç oyunu ve 24 yeni kapak telefonda görülmedi (Yusuf yalnız Dört Ok'u denedi); Dört Ok koyu temada bakılmadı; Köprü Kur maskot kutusu ölçülmeden yazıldı; oyun içi şeker kalıntıları; Vinç beyazı vb. önceki liste aynen duruyor.

Dersler: [[2026-10-13-kapak-varyant-dort-ok-dersleri]].
