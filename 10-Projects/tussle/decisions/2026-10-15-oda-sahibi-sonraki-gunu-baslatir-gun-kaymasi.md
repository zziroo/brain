---
type: decision
project: tussle
date: 2026-10-15
status: active
tags: [tussle, gunluk, sezon, oda, karar]
source: oturum 2026-10-15 (mobil-playus: tema sadeleştirme, parti ayarları, sonraki gün, 25 oyun geri bildirimi)
---

# Karar: Herkes bitirince oda sahibi sonraki günü başlatır; erken başlatma odanın takvimini kaydırır

## Bağlam
Grup bir günün oyununu erken bitirince ertesi günü beklemek zorundaydı. İlk model (`62162a8`): gün satırı index+1, takvim beklemiyordu; Yusuf geri sayımı 32 saat gördü.

## Karar
- Herkes hakkını bitirince (Şans Hakkı dahil; açık koşu engeller; hiç oynamayan üye "bitirmemiş" sayılır) oda sahibi "Sonraki günü başlat"a basar.
- `POST /api/rooms/:code/next-day`, yalnız oda sahibi (`room.host_only`); bitmemişse 409 `day.not_done {done,total}`. `TodayResponse` `doneCount`/`memberCount`; WS `day` olayı; yapısal akış satırı `{type:'day'}`.
- Düğme hep tıklanabilir, yanında "3/5 bitirdi"; bitmemişse sunucunun 409'u toast olur.
- **Gün kayması** (`eddab2a`): `rooms.day_offset` (migration 15); `todayIndex = saat günü + offset`; geri sayım `Daily.opensAt` ile, hep ≤24 sa; sezon hızlanır. Oda sahibinin erken bitirdiği günde geç gönderme ek süresi yok.

## Neden
- Grubun temposuna uyar, takvim beklemek can sıkıyordu.
- Kaydırma tek sayı (offset) ile tutarlı: günün oyunu, tohum ve sezon aynı hesapla ilerler; geri sayım hiç 24 saati geçmez.

## Reddedilen alternatifler
- Aynı güne ek tur: sezon takvime bağlı kalırdı, gün kavramı bulanıklaşırdı.
- İlk model (index+1, takvimi beklemeyen gün): 32 saatlik gün ortaya çıktı.

## Sonuçlar / riskler
- Sezon takvim günlerinden önce bitebilir (bilinçli).
- Telefonda denenmedi.

## İlgili
- [[2026-10-09-puanlama-sabit-gunun-kurallari-donar]]
- [[2026-10-15-tussle-tema-parti-sonraki-gun-denge-turu]]
