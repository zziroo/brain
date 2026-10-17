---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, parti, oda, sinir, karar]
source: oturum 2026-10-16 (mobil-playus) oda ve parti sınırı 32
---

# Karar: Oda ve parti sınırı 16 → 32, parti için ayrı sabit (`1d44092`)

## Bağlam
Yusuf partinin neden 16 kişiyle sınırlı olduğunu sordu. 16 aslında oda üye sınırıydı (`MAX_MEMBERS`, `src/shared/protocol.ts`). Parti Gecesi kararında ([[2026-10-11-parti-gecesi]]) 4 ya da 8 kişilik seçenekler reddedilmiş, parti doğrudan oda sınırına bağlanmıştı. Odanın neden 16 olduğu hiçbir notta yazmıyordu: "arkadaş grubu" boyutu olarak seçilmişti. Ayrıca 2026-10-16 telefon turundaki "oda sınırı 200", kişi başına açılabilen oda sayısıydı (`MAX_ROOMS_PER_USER`), üye sınırı değil.

## Karar
- `MAX_MEMBERS` 32 (oda). Yusuf: "32 yeterli olur".
- Ayrı `PARTY_MAX_PLAYERS` sabiti eklendi; şimdilik oda sınırına eşit (`= MAX_MEMBERS`). Parti doluluk kontrolü ve parti kartı bunu kullanır, odaya katılma `MAX_MEMBERS`'ı. Yusuf ayrı sabiti gerekirse eklemeyi koordinatöre bıraktı; bir satırlık maliyetle şimdiden eklendi.
- İzleme tamponu `RUNS_PER_ROOM_MAX = MAX_MEMBERS` (32). Oda başına en kötü durumda yaklaşık 20 MB (koşu başına ~640 KB, 80k int); önceki 16 kişide ~10 MB'tı.
- Ara sahne 17–32 kişide "sıkışık" düzende: 32 px satır, yalnız tahta kayar (başlık, lider satırı, sonraki oyun kartı yerinde kalır), tahta açılışta ve sıralama değişince kendi satırına kayar, oyuncu tahtaya dokunduysa onun kaydırmasına karışmaz. Tahta yüksekliği bilinen bir değerden hesaplanır, ekrandan düzen okunmaz. Üstte 8 px iç boşluk var: lider tacı ve kendi satırının halkası kırpılmasın diye. 16 ve altı eski düzende.
- İzleme çipleri listesi 146 px'te kendi içinde kayar.

## Neden
- Sunucu tarafında 32'yi engelleyen bir şey yok. Parti canlı skorları oda başına saniyede en çok 5 toplu mesaj gidiyor, kişi sayısından bağımsız. Katılma kontrolleri işlem içinde. 32 kişi için yük artışı küçük.
- Asıl iş ekrandı: 16 satır 375×812'lik ekrana tam sığıyordu, 32 satır sığmıyor.

## Reddedilen alternatifler
- İki sütunlu tahta: 375 px'te ad, puan çipi ve toplam için dar kalıyor.
- Tüm sahnenin kayması (16 kişide kısa ekranlarda olan buydu): başlık ve sonraki oyun kartı kayıp gidiyordu; artık yalnız tahta kayıyor.
- Tek sabitte kalmak: parti ileride odadan farklı bir sınır isteyebilir. Ayrı sabitin maliyeti bir satır.

## Sonuçlar / riskler
- İnceleme ajanı ciddi bulgu çıkarmadı. İki düşük önemli bulgu (sıralama karesinde gereksiz düzen okuması, kaydırıcının taç ve halkayı kırpması) commit'ten önce düzeltildi.
- Yükselme animasyonundaki ölçek büyümesinin yanları hâlâ kenarlarda bir miktar kırpılabilir; önemsiz.
- `PARTY_MAX_PLAYERS === MAX_MEMBERS` olduğu için bugün `party.full` hatasına ulaşılamaz; sınırlar ayrıştığı gün işe yarayacak bir koruma olarak duruyor.
- **Doğrulanmadı:** 32 kişilik sahnenin telefonda akıcılığı (satır kayması, kendi satırına kayma). Tarayıcıda yalnız ölçümler alındı, görünmeyen bölmede animasyon çalışmadı.

## İlgili
- [[2026-10-11-parti-gecesi]]
- [[2026-10-16-tussle-oda-parti-siniri-32]]
