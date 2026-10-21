---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, arena, oyunlar, karar]
source: Claude Code oturumu "tussle: arena devam turu" (2026-10-21)
---

# Arena ikinci parti: görünüm dikişi, Crown, Trails, Paint ve Type Race main'de (yayında değil)

## Bağlam
Sumo prototipi ve telemetri/uyarlanabilir gecikme yayındaydı ([[2026-10-21-arena-modu-dort-oyun-ve-sumo-prototipi]], [[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]]). Yusuf: "Arena'nın devam turlarına başlayalım; etkileşimli oyunların ne kadar iyi olacağını kestiremiyorum; ekranda bir yazı var, herkes kendi telefonundan yazıyor, en hızlı yazan kazanıyor gibi ortak ekranlı canlı oyunlar da olabilir; sana bıraktım."

## Karar
- **Beş arena oyunu main'de (`cb415fe`):** Sumo + Crown (Sumo motoru; taç taşıma süresi, 45 sn), Trails (ızgara-yön motoru, 22×22; iz/duvar öldürür, 50 sn, 25. sn'den sonra hızlanır), Paint (aynı motor; hücre boyama, 45 sn), **Type Race** (Yusuf fikri: tohumdan 6 kelimelik Türkçe cümle, herkes kendi klavyesinde yazar, ortak pistte ilerleme; ilk bitiren kazanır, 45 sn). Kurallar `docs/ARENA-PLAN.md` §7–§10, ürün tablosu `docs/ARENA-GAMES.md`.
- **İstemci görünüm dikişi:** `arena-screen.ts` yalnız kabuk (snapshot halkası, gecikme, telemetri, geri sayım, sonuç); oyuna özgü çizim/girdi/HUD `src/client/arena/<id>-view.ts`, sözleşme `view.ts` (`ArenaView`/`ArenaViewRun`: `draw(prev,next,t)`, `pointer`, `preview`, `mount` kendi DOM'u için, `hud`, `layout: 'wide'`), metinler `texts.ts`. Yeni oyun = sim + registry + i18n + texts + view + views.ts + test; kabuğa dokunulmaz.
- **Protokol:** `ain`'e isteğe bağlı `c` (yazılan karakter kodu, `isArenaChar`). Sunucuda yuva başına 8'lik karakter kuyruğu, her tick bir karakter (aynı tick'e düşen iki tuş kaybolmasın; inceleme bulgusu). Yön girdisi "son kazanır" kaldı.
- **Yayın yok:** telefon teyidi ve yayın kararı Yusuf'ta. Rozet yuvaları, izleme, parti, kapak görselleri bu turda yok.

## Neden
- Yusuf etkileşimli (fizik) oyunların hissinden emin değil; Type Race gecikmeden hiç etkilenmeyen bir "ortak ekran" örneği olarak aynı partiye kondu: iki motor + bir metin oyunu, his kıyaslanabilsin.
- Dikiş sayesinde üç oyun paralel iki ajanla yazıldı (Trails+Paint, Type Race), kabuk çakışması olmadı; sonraki oyunlar da ucuz.

## Reddedilen alternatifler
- Type Race'te tohumla cümle türetme yerine cümle snapshot başlığında gidiyor (≤45 sayı, 15 Hz): maç ortasında yeniden açılan ekran da bilir; kabuk geri sayım karesi için `ArenaPlay.seed` eklendi.
- Trails ızgarasını baş yollarından istemcide türetmek: yeniden bağlanan geçmişi kaçırırdı; hücreler 3 bit/10'lu paketle her snapshot'ta gidiyor (49 sayı).
- Type Race'te klavye için `pinToVisualViewport`: kabuk canvas'ı yalnız pencere boyutunda yeniden kuruyor, gerilirdi; alan geniş (2:1) görünümün hemen altında, 375×812'de alt kenarı ~329 px.

## Sonuçlar / riskler
- **Telefonda teyit edilmedi** (ajanlar tarayıcı + bot ile oynadı): Type Race'te kaydırarak yazma (Gboard kelimeyi tek seferde verir, kuyruk emer mi), otomatik düzeltme/öneri şeridi, Türkçe İ/ı, Capacitor'da klavye açılınca yerleşim, canvas'a dokununca klavyenin açık kalması; Paint hücre opaklığı/boşluk hissi; Trails'te 2 kişi kimse dönmezse aynı tick'te duvar → slot 0 kazanır; hız 6→5 geçişinde ~0,3 hücre görsel sıçrama olabilir.
- Açık gözlem (Crown ajanı): botun açtığı "open" arena kartı sohbette bitene kadar görünmedi; bu değişiklikle ilgisi doğrulanmadı.
- Bitiren Type Race oyuncusu sonuç gelene kadar ekranda kilitli (en fazla 45 sn); tasarım gereği, istenirse gevşetilir.
- İnceleme: dikiş+Crown 1 düşük (düzeltildi), Type Race 2 yüksek (şüpheci doğruladı, düzeltildi), Trails/Paint 1 orta + 1 düşük (koordinatör doğrudan düzeltti, şüpheci koşulmadı: düzeltme gereksiz bir istemci süzgecini kaldırmaktı).

## İlgili
- [[2026-10-21-arena-modu-dort-oyun-ve-sumo-prototipi]], [[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]]
