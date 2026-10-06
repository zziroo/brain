---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, kamera, okunurluk, arayuz, his]
source: oturum 2026-10-06 (incremantal-game, kamera + fener nöbeti), commit a352450
---

# Karar: kamera bölünmüş ölçekle yaklaştı, bekçi 1,2× çizildi, HUD kalınlaştı; tekdüze 1,5× reddedildi

## Bağlam
Yusuf: "Karakter ekrana göre çok mu küçük? Çok uzaktan bakıyormuşuz gibi geliyor. UI tarafında mı ufak hissettiriyor? Shelldiver'da UI daha anlaşılır gibi." Ölçüm (1440×900): `runZoom` ekran yüksekliğine her zaman en az 760 dünya birimi sığdırıyordu; bekçi ~36 px = yüksekliğin **%3,9**'u (Çayır), Mağara'da **%3,2** (kamera haleyle açıldığından geç oyunda daha da küçük). Shelldiver'ın Steam görsellerinde kaplumbağa ~%8. Arayüz tarafı da ince: 11 px aralıklı küçük büyük harf, kılcal çizgiler, soğuk soluk renkler.

## Karar
- **Bölünmüş yakınlaştırma** (`js/view.js`): küçük halede taban sınırlar bağlar (430/760/380 → 296/524/262, ÷1,45; Çayır-Orman s ≈ 1,72, bekçi ~%6,4); büyük halede haleye bağlı terimler bağlar (3/3,4/1,7 → 2,55/2,9/1,45, ÷~1,17), yükseklikte 2,9 hale yarıçapı: halenin kuzeyinde ~0,7 yarıçap gece görünür kalır, güney kenarı ekranda kalır (Mağara bekçi %4,2, Harabeler %3,5).
- Yeni `camAhead(hh, rad)`: öne bakış hale yüksekliği doldurdukça küçülür; eğim üst sınırı 0,42 → 0,45·hh (ayakların altında yarı yüksekliğin üçte biri kalır).
- **Bekçi sprite'ı `KEEPER_K` = 1,2** (ayaklar sabit, her şey ölçeklenir; fener konumu dünya biriminde döner). Çarpışma yarıçapı ve kamp geometrisi değişmedi; kampta Ülker'den hâlâ bir tık kısa.
- **HUD kalınlaştı, yalnızca `#hud` kapsamında:** `#gain` 34 px, fitil 26 px, `#oilTxt` 18, cetvel 2 px, bölge adı 16, `#hud .cap` 13. Plakalar, paneller, konuşma plakası aynı kaldı.
- Bot (`onScreen()`) artık `camHalf / camAhead / camLean`'i view.js'den okur: oyuncunun gördüğünü görür.

## Neden
- Şikâyet "dünya uzak" değil "bekçi küçük". Yakınlaştırma tek başına Mağara'da gecenin geliş alanını yiyordu; sprite büyütmek kaybı olmadan doğrudan hedefi vuruyor.
- Gerçek ekran görüntüleriyle (3 yakınlık × Çayır/Mağara/Mağara+ışın) karşılaştırıldı; 1,5×'te Mağara'da karacık yayları ekran kenarında doğuyor, hale güneyde kesiliyordu.
- HUD ağırlığı tek başına hissi az değiştirdi (arayüz tasarım gereği seyrek); ucuz ve zararsız diye girdi.
- Denge: 20 tohumlu oyun, fenerler yerinde (≈5,4 / 11,3 / 18,2 / 25,4 / 32,8), ana bot 36,1 → 37,4 (Kalp gürültüsü), özensiz bot bataklıktan sonra ~yarım sefer geç (dar görüş, az hedef). Yeniden ayar yapılmadı.

## Reddedilen alternatifler
- **Tekdüze 1,5×:** geç bölgelerde tehdidi görünmez kılıyor, haleyi kesiyor.
- **Tekdüze 1,3×:** güvenli ama geç oyunda bekçi hâlâ küçük kalıyor ve ters ilişkiyi (geç oyunda daha küçük) koruyor.
- **Yalnız arayüzü kalınlaştırmak:** ölçüldü, his değişmedi.
- **Tüm metni (`body`) büyütmek:** ilk sürüm öyleydi; inceleme plakalara ve konuşma plakasına sızdığını buldu, HUD'a kapsandı.

## Bilinen açık uçlar
- Mağara'da tam Mercek hattıyla ışının ucu (907 birim) eskiden de ekranın dışındaydı; yakınlaşınca daha çok dışarıda. Ayrı bir iş.
- Büyük haleyle kuzeye odaklanınca hale halkasının güney kenarı ~125–157 birim kesiliyor (açık hale odakta zaten küçülüyor). Rahatsız ederse eğim üst sınırı 0,38'e çekilir.
- Daha dar görüşle, yarıçap ≥ ~140 halede tam güneyde dönen pervane `mothShown` dışında kalıyor; daha çok pervane bekletiliyor ya da yana gönderiliyor.

İlgili: [[2026-10-06-fener-nobeti-son-beste-bir-kusatma]], [[2026-10-04-urun-hissi-kararinda-once-secenek-goster]], [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
