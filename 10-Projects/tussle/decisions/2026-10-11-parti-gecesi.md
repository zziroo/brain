---
type: decision
project: tussle
date: 2026-10-11
status: active
tags: [tussle, parti-gecesi, canli-kapisma, karar]
source: oturum 2026-10-11 (mobil-playus: M1 eksikleri + Parti Gecesi)
---

> **2026-10-15:** Oyun sayısı (3/5/7 → 1–10) ve tek koşu kuralı (→ oyun başına 1–3 hak, en iyi skor) [[2026-10-15-parti-oyun-sayisi-ve-oyun-basina-hak]] ile değiştirildi. Gerisi geçerli.

# Karar: Parti Gecesi, oda sahibinin açtığı etkinlik kartıdır; odadaki herkes katılır, oyunlar art arda, sıra puanıyla

## Bağlam
`docs/DESIGN.md` §5.3'teki Parti Gecesi (oda 5–10 oyunu peş peşe oynar, toplam tablo). M1 canlı maç altyapısının (aynı tohum, sunucu zamanlı başlangıç, sunucuda doğrulama) üstüne kuruldu. Sözleşme repo `docs/PARTY-PLAN.md`.

## Karar
- **Yalnız oda sahibi açar**, odada aynı anda tek parti. Açma satırı oda sahibine "Kapışma iste" penceresinin en üstünde.
- **Etkinlik bildirimi gibi:** odadaki herkes katılabilir (oda sınırı 16). Saat yok; kart açılır, katılırlar, **oda sahibi hazır olunca "Başlat"** (≥2). Başlayınca katılım kapanır.
- Oyunlar: 3 / 5 / 7; oda sahibi tek tek seçer ya da "Rastgele" ile doldurur (tekrarsız, sunucuda; kartta sırası gelene kadar "?").
- **Sıra puanı:** N kişide p. sıra N − p + 1 (N başlangıçtaki boyut); eşitler aynı puan; çıkan/bağlantısı kopan/başlangıcı kaçıran o oyunda 0, partide kalır. Başlangıçtan 10 sn içinde paket göndermeyen o oyundan 0 (16 kişi bir kişiyi beklemesin).
- Eşitlik bozma: toplam puan → kazanılan oyun sayısı → son oyundaki sıra.
- **Ara sahne ~9 sn, herkeste aynı anda:** biten oyun + kazananı, "+n" puanlar toplamlara uçar ve sayarak artar, sıralama hareketle yer değiştirir (↑/↓), "X önde · n puan fark" ve senin durumun, sıradaki oyun + geri sayım. Sonda kürsü + konfeti.
- Partideki oyuncular parti bitene kadar başka kapışmaya giremez; partide olmayanlar normal kapışma oynayabilir. Hiçbir yere (günlük, sezon) sayılmaz.

## Neden
- Yusuf: herkesin açabilmesi aynı anda iki parti kartı gibi sorunlar yaratır → oda sahibi.
- Yusuf: "kişi sayısı sunucudaki herkes aslında; etkinlik bildirimi gibi herkes katılabilsin."
- Yusuf: "ara sahneleri güzel ayarlayacaksak sıra puanı okey; insanlar anlasın nasıl ilerlediğini." Oyunların ölçüleri farklı (sn, kat, puan), sıra puanı ortak payda.

## Reddedilen alternatifler
- Herkes açsın, odada tek parti (Claude önerisi): Yusuf oda sahibini seçti.
- 4 ya da 8 kişi sınırı: oda sınırı (16) seçildi.
- Saatli etkinlik (saat + elle başlat) ve saat gelince otomatik başlama: Yusuf "şimdi aç, hazır olunca başlat"ı seçti.
- Galibiyet sayısıyla puanlama: çok beraberlik. Oylamayla oyun seçimi: kurulum uzun. Tamamen rastgele liste: seçim hakkı yok.

## Sonuçlar / riskler
- 16 kişide canlı skor trafiği N²: parti maçlarında sunucu skorları maç başına 200 ms'de bir toplu gönderir (`lives`), yarış şeridi `setMany` ile tek seferde güncellenir.
- Telefonda ve gerçek kişilerle hiç oynanmadı (overview "Telefonda hiç görülmedi").

## İlgili
- [[2026-10-10-canli-kapisma-lobi-karti]]
- [[2026-10-11-canli-kapisma-tek-seferlik-kosu]]
- [[2026-10-11-parti-gecesi-dersleri]]
- [[2026-10-11-tussle-m1-tek-seferlik-ve-parti-gecesi]]
