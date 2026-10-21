---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, arena, performans, olcum, ag]
source: "oturum 2026-10-21 öğleden sonra (mobil-playus: kalan işler + arena Xiaomi kasma)"
---

# Karar: arena kasması veri açlığıydı; render gecikmesi uyarlanabilir (100–250 ms), maç sonu telemetri client-log'a

## Bağlam
Yusuf Sumo'yu iki telefonla denedi: OnePlus akıyor, Xiaomi 17 Pro kasıyor. Elde ölçüm yoktu; istemci yalnız hata raporu gönderiyordu.

## Ölçüm (7b0465d, aynı maç, 935 tick / 31 sn)
| | Xiaomi 25098PN5AC | OnePlus CPH2747 |
|---|---|---|
| kare aralığı ort. | 8,8 ms (120 Hz) | 8,3 ms |
| 33 ms üstü kare | 1 | 0 |
| draw() ort./max | 0,1 / 3,7 ms | 0,1 / 0,7 ms |
| snapshot aralığı ort./max | 67 / 188 ms | 67 / 170 ms |
| aç kalan kare (render saati en yeni snapshot'ı geçti) | 379 (%11) | 254 (%7) |

Çizim ve kare temposu ikisinde de kusursuz; takılma snapshot'ların ara sıra 170–190 ms gecikmesinden, sabit 100 ms render gecikmesi bunu karşılamıyor. OnePlus'ta da %7 var ("akıyor" hissi bile mikro takılmalı).

## Karar
- `POST /api/client-log` (kimliksiz, `kind` + düz `data`, cihaz modeli UA client hints/UA'dan) → `DATA_DIR/logs/client-log.jsonl`; arena ekranı maç sonunda bir `arena` olayı gönderir (frames, gapOver33/50/100, drawAvg/Max, snaps, snapMax, starved, delayAvg/Max…). Okuma: `feedback-cli.mjs log --kind arena`.
- Render gecikmesi uyarlanabilir: son ~2 sn'de snapshot varış gecikmesinin maksimumu + 82 ms, 100–400 ms arası (tavan ilk 250 idi, `bc2755b` ile 400), saniyede en çok 50 ms kayar (görünür sıçrama yok). Yalnız `arena-screen.ts` çizim katmanında; sim, protokol, sunucu, tur bazlı oyunlar (kelime yazma vb.) etkilenmez.

## Neden
- Tahmin yerine ölçüm (bkz. [[2026-10-20-cihaz-hissi-adb-kaydi-ve-cdp-ile-olculur]]); ölçüm WebView/GPU şüphesini düşürdü.
- Uyarlanabilir gecikme iyi ağda gecikmeyi büyütmez; kendi hamle yerel önizlemeyle anında çizildiği için dokunuş hissi değişmez.

## Reddedilen alternatifler
- Sabit 160 ms: OnePlus'ta gereksiz gecikme, Xiaomi'de yine yetmeyebilir.
- Ekstrapolasyon (snapshot yokken ileri tahmin): Sumo'da çarpışma anında yanlış konum gösterir; ileride gerekirse.
- adb/CDP ölçümü: telemetri iki cihazı bir maçta karşılaştırdı, gerekmedi.

## Sonraki maçlar (649d787, aynı Wi-Fi, 2 maç)
- OnePlus: starved 5 ve 4, delayAvg 106–125 → çözüldü, iyi ağda bedel yok.
- Xiaomi: starved 59 ve 42 (%1–3), snapshot aralığı 237–279 ms'ye çıkıyor, gecikme 250 tavanına dayanıyor. Aynı ağda olduğu için fark cihazda: MIUI/HyperOS'un WebView soketini geç/toplu teslim etmesi (güç tasarrufu). Tavan 400'e çıktı (yalnız etkilenen telefon öder); `snapBurst` sayacı toplu teslimi (uykudan flush) düz gecikmeden ayırır.

## Dördüncü maç (bc2755b, tavan 400)
- OnePlus: starved 12/4448, delayAvg 136, snapBurst 19/552 (%3).
- Xiaomi: starved 19/4227 (%0,4), delayAvg 180 / max 240 (tavana dayanmıyor), snapBurst 99/552 (%18). Toplu teslim kanıtı: soket uyuyup boşaltıyor → HyperOS güç tasarrufu. Kod tarafı burada bitti; kalan kazanç cihaz ayarında.

## Uyanık tutma (de66558)
- Pil kısıtlaması zaten kapalıydı; kalan şüphe Wi-Fi güç tasarrufu. Maç sürerken istemci 100 ms'de bir `{t:'wake'}` gönderir (kuyruk doluyken atlar); sunucu kendi kovasında (12/s) sessizce düşürür, hesaplı sokete asla strike vermez (inceleme bulgusu: takılma sonrası toplu boşalma strike biriktirip soketi kapatırdı). Beşinci maç (de66558): Xiaomi snapBurst 99→61 (%13), delayAvg 180→122, starved 16; OnePlus snapBurst 19→25, starved 35, delayAvg 155. Etki belirsiz/küçük: toplu teslim Xiaomi'de sürüyor, WebView/HyperOS'un kendi zamanlaması. Tek maçlık örnekler gürültülü; wake ucuz olduğu için kaldı, testçi verisi birikince (`log --kind arena`) cihaz bazında yeniden bakılır. Donma iki telefonda da %0,5 altı: his sorunu çözülmüş sayılır.

## Açık
- Xiaomi'de `snapBurst` yüksek (%18): güç tasarrufu: Yusuf'un cihaz ayarları (Pil → Tussle sınırsız, Wi-Fi yardımcısı/optimizasyon, Game Turbo). Oyun modu (`setGameMode`) yalnız tazeleme hızı; iki telefon da zaten 120 Hz, kaldıraç orada değil.

## İlgili
- [[2026-10-21-arena-modu-dort-oyun-ve-sumo-prototipi]] · [[2026-10-21-tussle-arena-sumo-prototipi]]
