---
type: decision
project: tussle
date: 2026-10-13
status: active
tags: [tussle, ui, oda-ekrani, canli]
source: oturum 2026-10-13 (mobil-playus: eleme, süre modeli, Parti I)
---

# Karar: Canlı alt sayfada sekme şeridi başlık oldu, ipucu düğmeye binmiyor

## Bağlam
Yusuf'un telefon görüntüsünde "Kapışma iste / Parti Gecesi" alt sayfasında metinler iç içeydi, oyun ızgarası 1,2 satır görünüyordu; asıl hata ipucu metninin düğmeye binmesiydi.

## Karar
(`00211aa`) Oda sahibinde ayrı başlık kalktı, sekme şeridi başlık görevi görüyor; kicker ve sayı seçici aynı satırda; parti seçim sırası kompakt başlık satırı; ızgara en az 2 satır, altta solma; ipucu 2 satır sabit yükseklik; alt sayfa 88dvh.
Sezon çipi (`75bb90e`): `will-change` + `transform: rotate` Android Chrome'da kenarı kıtırlaştırıyordu; ayrı `rotate` özelliğiyle çözüldü.

## Neden
Dar ekranda dikey yer başlık + sekme + kicker ile harcanıyordu; sabit ipucu yüksekliği düğmenin yerini oynatmıyor.

## Reddedilen alternatifler
- İpucunu kısaltmak/kaldırmak: dil değişince yine taşar; sabit 2 satır daha sağlam.

## Sonuçlar / riskler
Yeni düzeni Yusuf telefonda gördü mü belirsiz (doğrulanmadı).

## İlgili
- [[2026-10-11-parti-gecesi]]
- [[2026-10-10-canli-kapisma-lobi-karti]]
- [[2026-10-13-parti-i-ve-sure-modeli-dersleri]]
