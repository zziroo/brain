---
type: decision
project: isik-bekcisi
date: 2026-10-24
status: active
tags: [karar, yapi, gokyuzu, iksir, vadi]
source: Claude Code oturumu "ışık bekçisi: yapı, ağaç kesimi, daraltma" (Fable, koordinatör)
---

# 2026-10-24 (gece): iksirler rafta, vadi daraltma denemesi, ağaç kesimi ve "seferde karar" önerisi

## Yusuf'un gözlemleri (gece derinleşir'i oynadıktan sonra)
- Akış öncekinden iyi, ama "hep yukarı gidiyorum, sağa sola hiç gitmiyorum; bir sebebim olmuyor".
- Üstteki durak barı ile sağdaki metre cetveli aynı şey gibi.
- Gökyüzü karışık: "hep stat basıyoruz, build mantığı yok, şeylerin birbiriyle etkileşimi yok".
- Vırak'ın iksir sistemi basit, gerek yok; Vırak'a daha derin bir rol bulunacak.

## Kararlar (Yusuf)
1. **İksirler rafta** (`BREW.on` false, hikâye gibi bayrakla; kod silinmedi, Vırak'ın yeni rolü belirlenince temizlenir).
   **Neden:** on düz çarpan, sefer başına seçilen, hiçbir şey verilmeden; denge ölçümünü kirletiyor. **Reddedilen:** tamamen silmek (yeni rol kazanı/paneli yeniden kullanabilir).
2. **Vadi daraltma denemesi:** `HALF_W` 700 → 450 (engel sayıları genişliğe ölçeklendi, `SIDE` 100). **Neden:** Çayır'da ekran ±420 gösteriyordu, vadinin %40'ı görünmüyordu; tek eksenli koşu dürüstçe koridor olsun. Yusuf oynayıp karar verecek.
3. **Tek derinlik göstergesi:** sağdaki cetvel durakları çentik olarak taşır (yanmış sıcak, yanmamış soğuk, sıradaki halkalı), üst bar yalnız nöbet/Kalp'te.
4. **Ağaç kesimi önerisi** (karar bekliyor, depo `docs/gokyuzu-yeniden.md`): 82 yıldızın 56'sı sayı, 37'si aynı beş yıldızın kademe kopyası → beş büyüme "fener parçası" + üç fiil yolu (Hüzme / Parlama / Zincir, kademe başına bir yıldız) + 2. kademede takaslı kilit taşları (aynı anda biri yanar: Soğuk Cam, Kıvılcım Kesesi, Kopmaz Zincir) + "X ile:" etkileşim çizgileri. ~26 yıldız. Açık: Ateş Böceği'nin kaderi.
5. **Yapı analizi** (depo `docs/yapi-analizi.md`): eksen sorun değil, eksik olan **karar**. Önerilen: yanlar "farklı" olsun (zengin şeyler yol dışındaki ceplerde: itiş seferi yolu tutar, çiftlik seferi cepleri süpürür), seferde "nerede biteceği" kararı (yanmış durakta dinlenip isi bankaya koy; karanlıkta sönen fener kıvılcımı korur, isi dağıtır ya da kayıpsız ×1,5 bonus). **Reddedilen:** ikinci eksen, yan görev, bölge olayı (13 Ekim "çekirdek döngü" kararı).

## Araştırma notu
Shelldiver / Rock Bottom / Chef Knight: övülen güç eğrisi, mekân değil; iyi hissettiren "ne zaman geri dönerim" kararı (Shelldiver oksijen, Dome Keeper dalga sayacı); kararsız ve risksiz Rock Bottom "tek tuşa bas ilerle" diye şikâyet alıyor. Kaynaklar ince (Steam, inceleme, hayran rehberi); Chef Knight'ın "dalga" tarifi kaynaklarla uyuşmadı, Yusuf oynadı, o bilir.

## Açık
- Kalp arenası (r 540) artık vadiden (450) geniş: ya vadi arenada açılsın (`halfW(depth)`), ya arena küçülsün. Yusuf'a soruldu.
- `dev.campSweep` "ışıksız kapalı kapıda Kandil konuşur" satırı eskiden beri kırık (Ülker'in `u_lantern` balonu üstteyken Kandil konuşmuyor olabilir); bu oturumdan değil.
