---
type: decision
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, karar, ai-motoru, kalite, istem]
source: oturum 2026-10-05, üç yerel AI belgesinin analizi (Yusuf: "dikkat bilgileri bağlamı koparıyor, tekrarlar var")
---

# Karar: AI belgesinde her bilgi tek yerde yazılır; Dikkat maddeleri nedenini 1-2 cümleyle söyler

## Bağlam
Analizde aynı bilgi 3-6 kez geçiyordu (warnings, grup notu, iki kartın callout'u, yol haritası, issues). Neden istemdi: "kaçırılabilirleri kartta yaz VE warnings'te özetle", birbirini dışlayan seçimler de warnings'e giriyordu. Arayüz her uyarıyı ayrı kalın kutu yapıyordu (bir belgede art arda 9). Kaynaktan kopyalanan notlarda "aşağıdaki görsel", "burada" gibi bağlamı kopan ifadeler vardı.

## Karar
- İstem: ayrıntı bir kez kartta ya da ait olduğu yol haritası adımında. Birbirini dışlayan çift tek callout'ta (ilk kart). Yazarın tekrarladığı açıklama notu bir kez (walkthrough adımları hariç).
- Yol haritası yalnız rehber bir sıra veriyorsa ya da walkthrough ise yazılır; uyarıları özetlemez.
- Metin kendi başına anlaşılır: bu/burada/aşağıda yok, yazarın birinci şahsı yok, görsel ilgili checklist maddesinin içinde.
- `issues` yalnız rehberin sorunları; dönüştürme meta notu yok. Kartlar kaynak `sections` taşır.
- Dikkat maddeleri: her risk 1-2 cümle (neye dikkat + neden: hangi başarım tehlikede ya da geri dönüş yok + ne zaman kapanır). İlk sürümde "tek kısa satır" denmişti; Yusuf daha açıklayıcı istedi.
- Doğrulayıcı (`aidoc.js`): yalnız birebir yinelenen callout atılır, yalnız kap üst düzeyinde, aynı tür ve en az 40 karakter; kabı boşaltacaksa atılmaz. warnings/issues'ta yinelenen satır atılır. Belge stil yüzünden asla reddedilmez, `notes` döner.
- Arayüz: tek "Dikkat" paneli, uyarı başına bir satır.

## Neden
Tekrar okumayı yoruyor ve sırayla okurken bağlamı koparıyordu; kök neden istemdeydi, arayüz büyütüyordu.

## Reddedilen alternatifler
- Bulanık (Jaccard) otomatik ayıklama: yanlış bilgi silme riski; yalnız birebir yineleme atılır.
- İç içe (spoiler/checklist/alıntı) ayıklama: incelemede kart missable uyarısının ve alıntı yazarının silindiği doğrulandı, kapsam üst düzeye indirildi.
- Türlü uyarı + başarım çipi: Yusuf "yalnız daha uzun metin"i seçti.

## Sonuçlar / riskler
İstem etkisi yalnız yeni üretimlerde görülür; canlıdaki eski belgeler yeniden üretilmeden değişmez (panel ve birebir ayıklama hariç).

## İlgili
- [[2026-10-04-walkthrough-rehberde-adimlar-yol-haritasinda]]
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
