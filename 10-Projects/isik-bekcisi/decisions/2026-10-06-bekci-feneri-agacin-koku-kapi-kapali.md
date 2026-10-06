---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, beceri-agaci, ilk-acilis, oyun-akisi, kamp]
source: oturum fb8e3060 (incremantal-game), commit 28bca0d
---

# Karar: ilk yükseltme ağacın ortasındaki "Bekçi Feneri"; alınana kadar kamp kapısı kapalı

## Bağlam
Yusuf: "Bu tarz oyunlarda ilk sefere, ağacın tanıtımı olarak ilk yükseltmeyi yaparak başlıyorum. İlk yükseltme zorunlu olsun ve tam ortada olsun." Sonra çerçeveyi netleştirdi: "fener almak gibi, 0. yükseltme, bir giriş." O güne kadar gökyüzünün ortasında yalnız çizilmiş bir kamp ateşi vardı. 8 kolun ilk yıldızlarının ebeveyni yoktu. Yeni oyun 0 kıvılcımla açılıyordu ve ilk sefere hiç yıldız alınmadan çıkılıyordu.

## Karar
- **Yıldız:** gökyüzünün tam ortasında yeni kök yıldız `fener` (TR "Bekçi Feneri", EN "Keeper's Lantern").
  - Bedeli 3 kıvılcım, tek seviye, istatistik etkisi yok: diğer bütün yıldızlar onun geliştirmesi sayılıyor.
  - 8 kolun ilk yıldızlarının ebeveyni artık `fener`. Yanmadan önce bu yıldızlar kilitli görünür; yakınca ışık kollara akar ve uyanırlar.
- **Yeni oyun:** kesede tam 3 kıvılcımla açılır. İlk selam Ülker'den: teleskopa çağırır.
- **Kapı:** fener alınana kadar kapalı. Çit kapı aralığından düz geçer, kapıya iki çubuk çizilir.
  - Tuşlarla kapıya yaslanınca Kandil "Fenerin yok ki yakayım. Önce Ülker'e uğra" der.
  - Bu söz her itişte bir kez gelir; tekrarı için 6 sn geçmesi ve kapıdan uzaklaşıp dönmek gerekir. Başka bir sakinin sözünü kesmez.
- **Fenerden sonra:** kampa dönünce Kandil "kapı bu tarafta" der (`k_first`) ve ilk sefer başlar.
- **İpuçları:** `h_camp_scope` (yürü, sonra teleskopa [E]), sonra `h_camp_gate` / `h_camp_keys`.
- **Hikâye sırası:** `kandil.wick` ("her akşam fenerini ben yakarım") ve günlüğün ilk sayfası (`c.0`) ilk seferden sonraya kaldı.
- **Görünüş:** fener alınana kadar bekçi kampta fenersiz çizilir.
- **Eski kayıtlar:** sefer, yanmış fener, yol süresi ya da herhangi bir yıldız varsa fener bedava verilir, kese değişmez. Hiçbiri olmayan eski kayıtta kesede en az 3 kıvılcım olur.
- **Bot:** önce feneri alır.

## Neden
- Döngü (kıvılcım → yıldız → daha güçlü sefer) ilk dakikada öğretiliyor. Daha önce ancak ilk dönüşte öğreniliyordu.
- Zorunluluk oyunu durduran bir kart değil, dünyadaki bir engel. "Durduran öğretici yok" kuralına uyuyor ([[2026-10-04-yaparak-ogren-ipuclari-oyunu-durduran-kart-yerine]]).
- Hikâyeye oturuyor: Kandil fenerini her akşam kendi lambasından yakıyor, fener yoksa yakacak bir şey de yok.
- Etkisi olmadığı için denge değişmedi. Bot (3 oyun) 41–44 seferde bitirdi; eski ölçümler ~43 seferdi.

## Reddedilen alternatifler
- **Merkez yıldız odak ışınını açsın:** önerilen seçenekti. Yusuf giriş/fener çerçevesini seçti; ışın baştan var olmaya devam ediyor.
- **Ağacı açsın + fenerin gücünü ×1,25 artırsın:** erken oyunun dengesini değiştirirdi.
- **Zorlamasız yönlendirme:** Yusuf açıkça zorunlu istedi.
- **"Ocak", "Kutup Yıldızı", "İlk Kıvılcım" adları:** önerildi, seçilmedi. Yalnız "Fener" adı da reddedildi, çünkü Türkçede yol fenerleri de "fener".
- **Kapı aralığına yuvarlak bir engel koymak:** kapı direkleriyle ~44°'lik bir V oluşturuyordu ve bekçi içine sıkışırdı. Düz çit direklerle ~116° yapıyor.

## Sonuçlar / riskler
- İlk açılış ~20–30 sn uzadı. Hiç insan oynamadı: kapı bekletiyor mu, akış doğal mı, bilinmiyor (`status` doğrulanmadı).
- İngilizce metinlere ekranda bakılmadı.
- Bu sürümde feneri alıp hiç sefere çıkmayan biri, her kampa girişte `k_first`'ü yeniden duyar. Bu, eski ilk ziyaret davranışıyla aynı.
- 2026-10-06'da `1e64b38` ile canlıya alındı.

## İlgili
- [[2026-10-04-zorunlu-donus-noktasi-hikaye-kapisi-olabilir]]: zorunlu bir akış noktası eklerken hikâye sırasını kontrol etme dersi. Burada da `kandil.wick` ve `c.0` bu yüzden ertelendi.
- [[2026-10-06-bekci-feneri-ve-okunurluk]]
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
