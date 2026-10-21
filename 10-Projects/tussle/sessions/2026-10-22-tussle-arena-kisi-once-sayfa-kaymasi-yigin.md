---
type: session
project: tussle
date: 2026-10-22
status: active
tags: [tussle, oturum, arayuz, sheet, animasyon, arena]
source: oturum 2026-10-22 (mobil-playus: Yusuf'un küçük arayüz istekleri)
---

# Oturum: Arena'da önce kişi, sayfa kayması, üst üste sayfalar

## Yapılanlar
- **Arena sekmesi** (`challenge-sheet.ts` `arenaPanel`): diğer sekmeler gibi önce ayar, sonra oyun. "Kaç kişi" (yalnız en az bir masanın oturttuğu sayılar, bugün 2·3·4) en üstte; kapaklar o sayıyı oturtan masalarla süzülür (2 kişi 10, 3–4 kişi 7). Seçili masa sayıyı oturtamazsa ilk uygun masaya geçer. Son kişi sayısı `tussle.lastArenaSeats` ile hatırlanır.
- **Sayfa kayması** (`live-sheet.ts` `resize`): oyun listesi açılıp kapanınca ve sekme değişince ⚔ sayfası zıplamadan yeni boyuna kayar (yalnız transform; büyürken aşağıdan yukarı, küçülürken eski boyda aşağı kayıp sonda düşer). Dokunuş kaymayı keser (sürükle / X takılmasın). Azaltılmış harekette yok.
- **Sezon sayfası:** Geçmiş + X başlık hizasına (top 22 px); 375 px'te tutma çizgisine giriyordu.
- **Üst üste sayfalar** (`sheet.ts` `is-behind`, theme.css): alttaki sayfa yenisinin karartmasının altına iner ve alt kenarından 0.93 küçülür (iOS kart yığını gibi). Yusuf "geri çekilme"yi seçti ([[2026-10-22-ust-uste-sayfada-alttaki-geri-cekilir]]); blur önerilmedi (düşük donanımda kasar). Oda ekranı küçülmez, yalnız kararır.
- İncelemeler: iki tur, yalnız düşük bulgular (kayma sırasında sürükleme, transform-origin sıçraması); hepsi düzeltildi.
- Yayın: 3bfeb05 (OTA 0.20261021.2238), sağlık ok, canlı pakette yeni kod var.

## Reddedilenler
- Arka planı blurlamak: akıcılık kuralı (düşük donanımda backdrop-filter pahalı).
- Oyuncu kartını sezon sayfasının içinde ileri geçirmek: Yusuf geri çekilmeyi denemek istedi.

## Doğrulanmayanlar
- Telefonda denenmedi: Arena kişi → oyun süzme, ⚔ sayfa kayması (Xiaomi'de akıcılık), Geçmiş hizası, sezon → oyuncu kartı yığını (küçülme/karartma miktarı Yusuf'un gözünde).
