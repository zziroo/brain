---
type: lesson
project: tussle
date: 2026-10-19
status: active
tags: [tussle, oyun, denge, bot, veri]
source: oturum 2026-10-19 "tussle: insan verisiyle denge raporu", canlı DB loglarının yeniden oynatılması
---

# Ders: Yeni oyuncunun ilk koşusu çoğu zaman 5 saniyeyi bulmuyor; gerçek tepki süresi botlarınkinden yavaş

- **İlk koşu uçurumu:** canlı maç ve Parti Gecesi'nde bir oyunla ilk temas puanlı koşu (pratik saklanmıyor, çoğu oyuncu doğrudan maça giriyor). Oyuncuların ilk koşusunun 5 sn dolmadan bittiği oran: Köprü %81, Yörünge %63, Denge %62, Pinyata %50, Renk %38, Bambu %32. Denge'de ilk koşu medyanı 4 sn, ikinci 37 sn: oyun zor değil, açılışı tuzak (kısa koşularda dokunuşların çoğu yanlış tarafa, düşüş boştakinden bile hızlı).
- **Köprü:** yeni oyuncuların %81'i ilk köprüde düşüyor, 13 kaçıştan 12'si fazla uzun (medyan ~10 tick = 170 ms geç bırakış: uca bakıp tepki veriyorlar, öngörmüyorlar). Öğrendikten sonra kaçış medyanı ~1 tick.
- **Tepki süresi:** Refleks v4'te insan ortalama tepki medyanı 337 ms (p25 301, en iyi oyuncu 283 ms; telefonda dokunma gecikmesi dahil). Testlerde "ortalama" bot çoğunlukla 300 ms, Şerit'in "iyi" botu 230 ms: en iyi oyuncudan hızlı. Bot standardı olarak ortalama ~350 ms, iyi ~280 ms daha gerçekçi.
- **Sürekli takip (Denge):** dokunuş tarafını en iyi açıklayan algı gecikmesi ~12 tick (200 ms; öngörü sayesinde Refleks'ten kısa), "orta PD" botuyla aynı. Ama dokunuş hızı medyanı 4,3/sn (botlar 5-8,6/sn), uzun koşularda 3,7-7,8/sn; dokunuşların ~%10'u yanlış tarafa.
- Uygulama: yeni ya da ayarlanan oyunda (1) ilk ~3 sn affedici olsun (yavaş başlangıç, ilk engel geniş), (2) "ortalama" bot 350 ms ve biraz hatalı dokunuşla ölçülsün, (3) sonuç [[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]] raporundaki insan medyanıyla karşılaştırılsın.
