---
type: session
project: tussle
date: 2026-10-22
status: done
tags: [tussle, arena, ses, geri-bildirim, sure]
source: Claude Code oturumu "tussle: arena oyunları kısa ve etkileşimli"
---
# Arena: kısa maçlar ve olay tabanlı geri bildirim (22 Eki)

**Sorun (Yusuf):** arena oyunları yavaş/uzun ve tepkisiz; top cebe girince, çarpışınca, skor alınca hiçbir şey olmuyor. Keşif: arena view'larında ses/parçacık/squash hiç yoktu (kabuk yalnız geri sayım, go, sonuç, kendi elenme sesi); süreler 45–90 sn, telemetri de doğruladı (Pocket 90, Drop Four ort 37 max 89, XOX 60, Trails çarpmayla 4 sn).

**Yapılan (commit `0032c72`, main):**
- Sim olayları: `ArenaEvent {t,p,q,x,y,v}`, türler hit/out/dash/score/goal/miss/place/turn/win; sim `ev` listesini her tick başında boşaltır, `events()` ile verir; sunucu tick damgasıyla `ast.e`'ye kodlar (en çok 16, sonuç türleri önce). İstemci `src/client/arena/feedback.ts` (`ArenaFx`: render saatine göre bir kez oynatma, aynı ses 60 ms'de bir, parçacık/squash/shake, `TurnWarn` son 2 sn tik + yanıp sönme). Yeni sentetik `thud`.
- Süreler (hepsi v2): Sumo daralma 10→30 sn; Crown 25; Trails 30 + erken rampa; Paint 25; Number Hunt 25 (karıştırma 8 sn); Type Race 4 kelime/25; Pocket tur 5 sn/30 sn, hızlı yuvarlanma; Puck tur 4 sn, 2 tur × 2 pul; Drop Four tur 4 sn/40 sn, süre bitince en uzun dizi; XOX tur 3 sn, tek el + rövanş/30 sn.
- Ses kuralı: ses herkese görünür anlarda (çarpışma, gol, puan, kazanma); başkasının her küçük hamlesi sessiz (4 kişide kalabalık); kendi hamlem anında yerel çalar, sunucu olayı atlanır; kendi elenmemde kabuk çalar, view susar.
- Ayrıca `cd273b6`: oda ayarlarında structuredClone → JSON klon (eski Android WebView hatası).

**İnceleme:** Number Hunt view'ında `events` kancası unutulmuştu (düzeltildi + DOM testi); 16 olay sınırında öncelik; ipucu metni; XOX süresi 9×90 tick'i aşmıyordu → 900. Şüpheci gerekmedi (bulgular grep ile doğrulandı).

**Açık:** Pocket'ta 30 sn'de 5–8 vuruş, 3 topu sokup bitirmek nadir, maçlar "en çok sokan"la bitecek (Yusuf'a soruldu). Telefon teyidi yapılmadı. Yayın kararı Yusuf'ta. Maç başı "Hazır" düğmesi önerisi (Kapışma/Arena'da düğme + 20 sn zaman aşımı, Parti'de otomatik ama ilk görülen oyunda 7–8 sn kart) karar bekliyor. Ses tasarımı turu için devir notu: [[2026-10-22-devir-ses-tasarimi-brief]].

Karar: [[2026-10-22-arena-olay-geri-bildirimi-ve-kisa-mac]]. Ders: [[2026-10-22-paralel-ajanlarda-ortak-dikis-her-ornekte-test]].
