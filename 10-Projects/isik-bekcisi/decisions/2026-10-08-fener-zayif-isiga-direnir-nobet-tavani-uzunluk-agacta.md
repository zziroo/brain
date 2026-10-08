---
type: decision
project: isik-bekcisi
date: 2026-10-08
status: active
tags: [isik-bekcisi, fener, nobet, denge, uzunluk, ilerleme-hissi]
source: oturum 2026-10-08 (incremantal-game, nöbet tavanı), commit ec77919; bot ölçümleri (seed 1 ve 3)
---

# Karar: fener zayıf ışığa direnir; akış küçüldü, nöbete görünür güç tavanı geldi, oyunun uzunluğu kotadan ağaca taşındı

## Bağlam
Yusuf sıfırdan oynadı: Çayır'da ağaç 7–8 seferde doldu, sonra seferler "ruh toplayıp fenerin barını doldurmak" oldu; para ölü birikti (sonraki kademe fener yanmadan açılmıyor), nöbet bar dolar dolmaz tek seferde geçildi. Hissettiği: ilerleme yok. Kök neden notlarda açıkça yazılıydı: bölge başına sefer sayısını yıldızlar değil fenerin ışık kotası (`BEACON_ENERGY`, akış %80'e kadar) belirliyordu ([[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]]). Bot sıkılmaz, insan sıkıldı ([[2026-10-08-kota-kapisi-agac-dolunca-olu-sefer-uretir]]).

Yusuf'un isteği: "bu döngü eğlenceli olsun ve ilerleme hissi versin; çizgiyi beraber yakalayalım." Kalp'in mekaniği olduğu gibi kalsın ("orası challenge olarak kalabilir").

## Karar
1. **Akış küçük:** `BEACON_ENERGY` ×0,05 (`SIEGE.kindle` de onunla). Bölgeye varınca fener 1–3 seferde "hazır".
2. **Nöbetin görünür güç tavanı:** nöbet payı ancak `cap = min(1, (ST.power / SIEGE.ref[i])^2)` kadar tutuşur (`SIEGE.ref` = bugünkü yakma güçleri [30,5, 93, 215, 666, 2117]; güç yalnız Fitil yıldızlarından gelir, Kor iksiri bir seferlik yükseltir). İlerleme `S.charge`de kalır; tavandayken tutuşma ve ruh çağırma durur, geri akma olmaz (ulaşılan korunur). Fener ancak tavan 1 iken yanar. Nöbetin kendisi kısa ve sert kaldı (8–11 sn bir deneme), dakikalık dövüşe dönmedi. Bölgenin irisi tam yolun %25'inde gelir (düşük tavanda hiç gelmez).
3. **Uzunluk ağaçta:** `TIER_SCALE` [2,1, 110, 5800, 97000, 1,8M] (4. kademe Kalp için aynı). Her kademenin fiyatı kendi bölgesinin sefer sayısını aşağı yukarı bire bir belirler.
4. **Seferler biraz daha uzun** (Yusuf: "kısa olunca garip gelmişti"): temel yağ 25 → 40 (ilk sefer 40 sn), `OIL_PER` [6, 7,4, 9,2, 14,7, 8,5], `ZONE_BURN` [1, 1,1, 1,65, 2,1, 3,3] (arena 3,2 aynı). Çayır dolu ağaçla ~70 sn, Bataklık ~100, Mağara ~130, Harabeler ~135 sn.
5. **Görünür / duyulur:** HUD çubuğu yarı yarıya (sol akış soğuk, sağ nöbet sıcak, tavanın ötesi taralı, tavanda hairline işaret), etiket "Alev daha güçlü bir ışık istiyor"; fenerin alevi tavanda durup nefes alır, üstünde tam boyun hayalet çizgisi; iki notalı çözülmemiş "henüz değil" sesi; ilk seferinde ipucu (`siegeCapHint`: Fitil yıldızları), `h_siege` üçüncü satır; Kandil'in sözü `s.kandil.proud`, Ülker'in tek seferlik tepkisi `r.siegeCap`.
6. **Kayıt:** `S.stat.treeFullRun[i]` / `litRun[i]`; Günce'nin Kayıtlar sayfasında "N. Fener: ağaç X. seferde doldu · Y. seferde yandı". Yusuf'un sonraki oyunu kendiliğinden veri olur.
7. **Eski kayıtlar:** `S.v` 5; doldurulan pay korunur (v4'te %50 → yeni enerjide %50), karanlık fenerin şarjı göçte bir kez tavana kırpılır.
8. Kalp (`VIGIL`, `BOSS`, arena yağı) dokunulmadı.

## Neden
- Kapı güç + beceri testi olmalı, bekleme değil: "güçlü değilsen fener yanmaz, güçlendiysen bir iki denemede yanar" okunur bir kural; ilerleme her seferde görünür (bar biraz daha ileri gider).
- Deneme boşa gitmez: şarj kalır, çağrılan ruhlar ödüyor; döngü sıkmasın diye.
- Ölçüm (seed 1 ve 3, 10'ar oyun): ölü sefer 0 (Çayır'da 2,8–3,1 idi), her bölge 6–10 sefer; ana bot ~37–38 sefer / ~82–86 dk, özensiz ~47–48 / ~94–98 dk (insan tahmini ~133–139 dk); Kalp ana botta aynı (3,1–3,5), özensizde +1 (5,8–6,4; gürültü sınırında). Her fenerde ~5 kısa deneme, dördü tavanda biter.

## Reddedilen alternatifler
- **Yalnız akışı küçültmek:** gelir güçle büyüdüğü için ×0,3'te "hazır" 7 → 5 sefer, ×0,15'te 4; kota kalıyor.
- **Işık-saniyeye dayalı sert nöbet, kalıcı ilerlemeyle (T2):** yine kota, fener başında ödenen; bot her dalgayı eritiyor, güçsüzken geçip Kalp'te yığılıyor (7–31 deneme, oyunun %30–60'ı).
- **Sıfırlanan nöbet (keep 0, T3a):** ana bota göre ayarlanınca özensiz bota uçurum: Harabeler'de 40 sefer, toplam 77.
- **Gizli güç çarpanı (T3c: tutuşma hızı × (güç/ref)^5, dakikalık nöbetler):** matematik aynı ama oyuncu "neden dolmuyor" der ve her bölge sonu dakikalık dövüş olur (Yusuf Kalp'te temizliği yorucu bulmuştu). Görünür tavan + kısa nöbet seçildi.
- **Dalgaları yoğunlaştırmak:** bota görünmüyor; insan eline bırakıldı.
- **Kalp'e kısmi taşıma (`VIGIL.keep` > 0):** Yusuf istemedi, Kalp challenge olarak kaldı.
- **Çiy Damlası'nı kapatmak (`refill` 0,1):** geç seferleri kısalttı ama Kalp'i 3,2 → 4,3 denemeye çıkardı; yerine `ZONE_BURN` yükseltildi.

## Sonuçlar / riskler
- Tavan pratikte "yeterince Fitil al" demek (güç yalnız Fitil'den). Dar gelirse ölçü genişletilir (ışın gücü vb.).
- Her seferin sonunda fenere uğrayıp "biraz daha ileri" görmek eğlenceli mi, tekdüze mi: insanla denenmedi.
- Tutturulamayan: Harabeler 5,7–6,6 sefer (hedef 7–9; kısa sefer isterdi, 135 sn uzlaşma), özensiz botta Orman 9,3–9,8.
- Sesler dinlenmedi; `prefers-reduced-motion` yolları yalnız kodda.
- Yayın: `ec77919` canlıda (2026-10-08).

## İlgili
- [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]] (nöbetin kendisi; bu karar kapıyı ona taşır)
- [[2026-10-07-uzun-seferler-yol-fenerleri-ruh-yenilenmesi]] (kotayla uzatma: kısmen aşıldı)
- [[2026-10-02-bekleme-kapisi-yerine-avdan-dolan-kapi]]
- [[2026-10-08-kota-kapisi-agac-dolunca-olu-sefer-uretir]]
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
