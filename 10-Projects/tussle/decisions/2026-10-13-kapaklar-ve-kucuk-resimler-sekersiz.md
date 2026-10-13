---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, gorsel, kapak, tema]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Karar: Oyun kapakları ve küçük resimler şekersiz (Şeker Dükkânı yalnız arayüz paleti)

## Bağlam
2026-10-12'de oyun sahneleri sadeleşmişti ama kapaklar bilerek şekerli bırakılmıştı ([[2026-10-12-oyun-sahnesi-sade]]); Parti I kapakları da şekerli yapıldı ve "kapaklar şekerli mi kalsın" sorusu açık kaldı. Yusuf: "gerek yok şekerli tasarımlara kapaklarda ve ufak resimlerde".

## Karar
- Audit: 47 kapaktan 21'i şekerli + 3 sınırda; bu **24 kapak yeniden çizildi**: düz oyuncak şekiller + yüz, oyunun sahnesi minyatür. Baston, lolipop, ambalaj, jöle, gofret, ekşi dikenli top yok. Kullanılmayan `wrapped/stick/swirlDisc` yardımcıları silindi.
- Küçük resimler (ana sayfadaki 4'lü satır, kartlar, maskot kesitleri) aynı SVG'den türediği için kendiliğinden düzeldi. `game-icons.ts` ikon tablosu hiçbir yerde kullanılmıyor, dokunulmadı.
- `docs/VISUAL.md` §4.1 yeniden yazıldı (kural satırı + 24 yeni kapak cümlesi).
- Bu, "oyun sahnesi sade" kararının kapaklara genişlemesi; arayüz paleti Şeker Dükkânı olarak kalır ([[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]]).

## Neden
Yusuf'un isteği; sahne ile kapak aynı sade dili konuşunca bütünlük artıyor, kapak oyunu daha doğrudan anlatıyor.

## Reddedilen alternatifler
- Kapakları şekerli bırakmak (2026-10-12 kararı "kapak şeker dükkânı kalır" diyordu): Yusuf istemedi, artık geçersiz.

## Sonuçlar / riskler
- Açık nokta: oyun içi sahnelerde birkaç şeker kalıntısı var (Karşıya Geç şeker küp, Kart Çevir lolipop simgeleri, Köstebek bonbon); Kes'in kapağında oyundaki dikenli tehlike kaldı.
- 24 yeni kapak telefonda görülmedi.

## İlgili
- [[2026-10-12-oyun-sahnesi-sade]]
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]]
- [[2026-10-13-kapak-varyant-dort-ok-dersleri]]
