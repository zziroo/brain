---
type: decision
project: tussle
date: 2026-10-08
status: active
tags: [tussle, kule, denge, migrasyon, adalet]
source: oturum 2026-10-08 (mobil-playus cila turu), inceleme + şüpheci ajan
---

# Karar: Kule'nin zorluğu tamamen günün saklı parametrelerinde yaşar (swingLo + migrasyon)

## Bağlam
Kule 3 katta bitiyordu. Yumuşatma: varsayılanlar (startSpeed 0.55, speedStep 0.03, perfectPct 0.06, minWidth 0.05) ve kayan bloğun alanın ortadaki %70'inde salınması (`meta.version` 2→3). İnceleme: sunucu günün parametrelerini çözülmüş halde `days.params`'a yazıyor, ama salınım bandı kod olduğu için gün ortası deploy'da aynı tablo eski parametre + yeni bant melezi olurdu.

## Karar
Salınım bandı `swingLo` parametresi oldu (varsayılan 0.15, 0 = tüm alan). DB migrasyonu 3, parametre yokken açılmış Kule günlerine `swingLo = 0` yazar. Böylece bir günün zorluğu yalnız o günün saklı parametreleriyle tanımlı; deploy zamanı tablonun adilliğini etkilemez. Sürüm artışı kalır: eski bundle'ı açık tutan istemci 409 alır, hak yanmaz.

## Neden
- Kural: "oyunun davranışını belirleyen her şey ya seed/parametre ya da sürümdür; parametreyse günde saklanır." Kod sabitleri gün ortasında değişemez.
- Deploy zamanlaması (Kule olmayan gün) kırılgan: odaların gün dönümü saat dilimine göre farklı, `LATE_GRACE_MS` penceresi var.

## Reddedilen alternatifler
- **Deploy'u Kule olmayan güne denk getirmek:** insan hatasına açık, oda başına gün dönümü farklı.
- **`days.game_version` ile tabloyu ayırmak:** doğrulama şu an canlı `meta.version` kullanıyor; daha büyük değişiklik, aynı tabloda iki sıralama kafa karıştırır.
- **Bandı sabit bırakıp yalnız varsayılanları yumuşatmak:** boşa geçen kenar süresi kalırdı.

## Ölçüm
`tests/kule-human.test.ts`: ±150 ms hata ile ~10 kat, ±80 ms ~19, uzman (±25 ms) ~59; eski ayarda ±150 ms 6.8 kattı. Gerçek elle ayar hâlâ gerekli.
