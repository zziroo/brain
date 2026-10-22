---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, arena, ses, geri-bildirim, sure]
source: Claude Code oturumu "tussle: arena oyunları kısa ve etkileşimli"
---
# Karar: arena oyunları 25–40 sn sürer ve sim'den gelen olaylarla ses/parçacık/titreşim verir

## Bağlam
Yusuf arena oyunlarını yavaş, uzun ve tepkisiz buldu: top cebe girince, gövdeler çarpışınca, puan alınca hiçbir şey olmuyordu. View'lar yalnız durum farkını okuyordu, "an" yakalanamıyordu; süreler 45–90 sn idi (günlük oyunların 2–3 katı), telemetri de doğruladı.

## Karar
- Sim'ler tick başına olay listesi yayar (`ArenaEvent`: hit/out/dash/score/goal/miss/place/turn/win); sunucu tick damgasıyla snapshot'a ekler (en çok 16, sonuç türleri önce); istemci `ArenaFx` ile render saatine göre bir kez oynatır.
- Ses kuralı: ses yalnız herkese görünür anlarda (çarpışma, gol, puan, kazanma); başkasının her küçük hamlesi sessiz; kendi hamlem anında yerel çalar, sunucu olayı atlanır; kendi elenmemi kabuk çalar, view susar; aynı ses 60 ms'de bir.
- Her maç 25–40 sn (günlük oyun bandı); sıra tabanlılarda tur 3–5 sn ve son 2 sn tik + yanıp sönme (`TurnWarn`).

## Neden
"Bir tur daha" hissi kısa maçta doğar; olay anındaki ses/ezilme oyunun tepki verdiğini hissettirir. 4 kişide her hamleye ses kalabalık olur.

## Reddedilen alternatifler
- View'ın durum farkından olay türetmesi: çarpışma şiddeti, gol anı gibi bilgiler durumda yok; sim tek doğru kaynak.
- Olayları ayrı WS mesajıyla göndermek: snapshot'la aynı tick'e hizalanması gerekiyor; snapshot içinde taşımak daha basit.

## Sonuçlar / riskler
Pocket'ta 30 sn'de 5–8 vuruş; 3 topu bitirmek nadir, maçlar "en çok sokan"la bitecek (Yusuf: böyle kalsın, telefonda bakılacak). Doz telefonda doğrulanmadı.

## İlgili
- [[2026-10-22-tussle-arena-kisa-maclar-ve-olay-geri-bildirimi]]
- [[2026-10-21-arena-parti-2-gecikmesiz-oyunlar-ve-gorsel-sema]]
