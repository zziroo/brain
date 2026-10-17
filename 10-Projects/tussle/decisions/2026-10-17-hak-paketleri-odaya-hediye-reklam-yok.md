---
type: decision
project: tussle
date: 2026-10-17
status: accepted
tags: [tussle, satin-alma, gelir, hak, adalet, reklam, bildirim, twa]
source: oturum 2026-10-17 (mobil-playus) Yusuf ile sohbet; araştırma [[2026-10-17-magaza-gelir-bildirim-arastirmasi]]
---

# Gelir modeli: hak paketleri odaya hediye, reklam yok

**Karar (Yusuf, 2026-10-17):**
- **Satın alma = hak paketi, odaya hediye.** Tüketilebilir ürünler `tries_1`, `tries_3`, `tries_5`. Alan kim olursa olsun **o günkü bütün oda üyeleri** (sonradan katılan dahil) bonusu alır. Akışa "{ad} odaya N hak hediye etti 🎁" düşer; ana menüde bonuslu oda herkeste parlar.
- **Gün 10'da dolar.** Kişi başı bugünkü hak = kural (en çok 3) + paketler + Şans, üst sınır `TRIES_DAY_CAP = 10`. Paket sayısı sınırı yok; paket yalnız **sığıyorsa** satılır (kural + bonus + paket ≤ 10). Herkes alabilir ("Ali 5 attı, Ayşe 3 ekledi"); sığmayan paket "Sığmıyor", dolunca "Bugün oda dolu 🎁".
- **Kurucu hak ayarı en çok 3** (`TRIES_MAX` 5 → 3; eski odalar migration 20 ile 3'e çekildi). Ayar odanın kalıcı kuralı, paket bugünün hediyesi; gün kuralları zaten ilk denemede donuyor. **İlk paket alınınca da gün kuralları donar** (para girince ayar ve Şans kuralı değişmez).
- **Reklam yok.** Hak bitince reklam izleme de yok.
- **Play Oyun Hizmetleri atlandı**; Console bildirimi zorunlu değil.
- **TWA kalıyor**, WebView'e dönüş yok.

**Neden:**
- Adalet: kişiye hak satmak odayı eşitsizleştirir (Yusuf'un ilk endişesi); odaya hediye tersini yapar.
- Kıtlık oyunun çekirdeği ("birkaç hak, her deneme değerli"); sonsuz hak günün oyununu vakit yarışına çevirir, "bir tur daha" hissi ölür, paketin değeri de düşer. 10 tavanı sonlu tutar ama günde 2–3 paketlik gelir yeri bırakır.
- Kurucu sınırını düşürmek yerine (özelliği geri almak gibi görünür) paketin işini ayarın yapamadığı yere (bugün, hemen) koymak.
- Reklam: TWA'da AdMob yok, AdSense gri bölge, iOS'ta ATT + etiket değişimi; mağaza metninde "reklam yok" Playus'a karşı satış noktası; tek kişinin reklamla hak kazanması adalet ilkesine ters.
- 1-3-5 (2 ve 4 değil): 1'lik boşluk doldurur, üç kart tek bakışta okunur, mağazada daha az ürün.

**Reddedilenler:** kişiye hak satışı; oda başına günde tek paket (gelir ve sosyal an için dar); kurucu sınırını 3'e indirip paketi tek yol yapmak (yapıldı ama sınır düşürme sebebi paket değil, 10 tavanıyla denge); ödüllü reklam; "Destekçi" kozmetik ürünü (sonraya).

**Kod:** `src/shared/iap.ts`, `src/server/iap.ts` (Play Developer API + `@apple/app-store-server-library`), `src/client/iap.ts` (Digital Goods API / `@capgo/native-purchases`), `docs/IAP.md`. Şart: Play ödeme profili + billing'li AAB, Apple Paid Apps sözleşmesi (Yusuf).
