---
type: decision
project: isik-bekcisi
date: 2026-10-04
status: active
tags: [isik-bekcisi, ogretici, ipucu, arayuz, ux]
source: oturum 2026-10-03/04 (incremantal-game, 55919b05); commit 6f90510 → 8685e7a
---

# Karar: öğretici ipuçları oyunu durdurmaz; anlattığı şeyin yanında çıkar ve oyuncu hareketi yapınca tik alıp söner

## Bağlam
Yusuf'un geri bildirimi: alttaki ipucu satırı "çok belirsiz", oyuncunun okuduğundan emin olalım, kısa ve öz olsun. İlk çözüm (commit `6f90510`): ekranın ortasında, onaylanana kadar oyunu durduran rehber kartı. Yusuf oynayınca reddetti: "oyunu durduruyor, bu tarz bir tasarım istemiyorum, kullanıcı dostu bir şey".

## Karar
"Yaparak öğren" ipuçları (kodda coach marks: `MARKS`, `UI.hintOnce`, `UI.coach` — `js/ui.js`), commit `8685e7a`:
- Oyun hiç durmaz, ipucu girdi almaz (`pointer-events: none`).
- İpucu anlattığı şeye bağlıdır ve onu izler: bekçi, yeni karşılaşılan düşman, HUD göstergesi (fitil, fener çubuğu), kampta kapı, gökyüzünde alınabilir yıldız. Ekran dışındaysa kenardan işaret eder.
- İçerik: tuş kapakları + 2–4 kelimelik satırlar; en fazla bir kısa ek satır. Başlık yok.
- Satır, oyuncu hareketi **ipucu çıktıktan sonra** gerçekten yapınca tik alır; son tikte "görüldü" sayılır ve kaydedilir.
- Yapılacak hareketi olmayan bilgi (fitil, ışık akışı, odak yağ yakar) göstergeyi parlatır, 6,5 sn kalır.
- Yapılmadan kaybolan ipucu 20 sn dinlenip sonraki fırsatta tekrar gelir; 3 gösterimden sonra bırakır.
- Anlık uyarılar (`bossSafe`, yeni yıldızlar, Ülker hatırlatması) üst ortada çerçeveli bant; oyunu durdurmaz.

## Neden
- Yusuf'un açık tercihi: öğretici oyunu durdurmasın.
- "Okudu mu" yerine "yaptı mı" ölçülüyor: onay tuşuna basmak okumayı kanıtlamaz, hareketi yapmak anlamayı kanıtlar.
- ~45 seferlik, yağın süre sınırı olduğu aksiyon oyununda 18 duraklama ritmi bozar.

## Reddedilen alternatifler
- **Oyunu durduran, onay isteyen orta kart** (yapıldı, yayınlandı, aynı gün reddedildi): kesintili ve ağır.
- **Kenarda duran, tuşla kapanan küçük kart:** durdurmaz ama dövüş ortasında gözden kaçar; okundu garantisi zayıf.
- **Kısa ağır çekim (2–3 sn %30 hız):** dikkat çeker ama her yeni şeyde ritmi böler.
- **Ekranı durdurup küçük video oynatmak** (Yusuf'un sonradan sorduğu fikir): durdurma sorunu geri gelir; oyunda dosya yok, her "video" kodla çizilen ayrı sahne demek, 18 tane pahalı. Önerilen ve henüz kararlaştırılmamış devamı: yalnızca kabuk, prizma, diken ve Kalp ipuçlarına, durdurmadan dönen küçük canlandırma.

## Sonuçlar / riskler
- `run.js`: `meet(what, thing)` artık şeyi taşır ve yakınken 6 sn'de bir yeniden duyurur; `R.beaconBeam` eklendi. Simülasyon ve bot değişmedi (43–44 sefer).
- Bilinen pürüzler: kabuklu ruh tek vuruşta yakalanırsa tik atmaz; kampta tıkla-git yürüyüşü de "yürü"yü tikler; imleç yokken yürümek "feneri çevir"i tikleyebilir; pervane ipucu ancak pervane yanınca tamamlanır; kalabalıkta kutu taraf değiştirebilir.
- Denenmedi: `prefers-reduced-motion`, ipucunun panel / konuşma altında gizlenmesi (yalnız koddan okundu), insan oyuncuyla his.

## İlgili
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
- [[2026-10-04-urun-hissi-kararinda-once-secenek-goster]]
- [[2026-10-02-hikaye-kampi-f-ile-konusma-ve-yumusak-gecisler]]
