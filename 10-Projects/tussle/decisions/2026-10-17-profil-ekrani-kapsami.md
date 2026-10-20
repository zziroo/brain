---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [profil, arayuz, urun]
source: tussle profil oturumu (2026-10-17)
---

# Karar: Ayrı profil ekranı; istatistik, rekor ızgarası, sezon geçmişi ve rozetler; Antrenman kalktı

## Bağlam
Ayarlar ekranında yalnız takma ad ve hesap bağlama vardı; "Antrenman kalkacak, profile eklemeler gelecek" sözü ayrıntısız kalmıştı. Sunucuda deneme, maç ve parti sonuçları tutuluyor ama gösterilmiyordu.

## Karar
- Ana sayfadaki avatar `#/profil`'i açar; ayarlar profilin sağ üstündeki dişliden. Başkasının profili `#/profil/<id>`, salt okunur.
- İçerik (yukarıdan aşağı): baş (fotoğraf/baş harf, seri, "Profili düzenle"), Genel (6 kutu), Rozetler (8), Sezon geçmişi (altın/gümüş/bronz madalya), Oyun rekorları (46 kapak; oynanmayan soluk, dokununca rekor penceresi, oynama düğmesi yok).
- Odadaki oyuncu kartının sonunda Profil özeti; fotoğraf ve ada dokunmak da profile gider.
- Başkasının rekor penceresinde "senin en iyin" kıyası.
- Madalya renkleri altın/gümüş/bronz; odadaki sezon şeridi de bunlara çekildi (`--medal-1..3`).
- Tek küresel profil, oda başına farklı görünüm yok.
- Ortak olmadığın odaların adı başkasının profilinde boş gelir ("başka bir oda").
- Antrenman ekranı ve ana sayfa kartı silindi; rekor ızgarası yerini aldı.

## Neden
- Veri zaten vardı; istatistikler şema değişmeden `GET /api/users/:id/profile` ile hesaplanıyor (ağır kullanıcıda 5-19 ms).
- Arkadaş grubunda rekabet hissi: kıyas ve madalya bunu taşıyor.
- Oda başına profil karışıklık ve iş yükü getirir (Yusuf "sana bırakıyorum" dedi, Claude tek profil seçti).
- Oda adı gizleme: inceleme bulgusu, ortak arkadaşa başka grup adlarını göstermemek.

## Reddedilen alternatifler
- Avatar yalnız renk seçimi ya da figür/karakter: Yusuf fotoğraf istedi (bkz. [[2026-10-17-profil-fotografi-sqlite-blob-bildir-admin]]).
- Profili Ayarlar içinde tutmak: ayrı ekran seçildi.
- Profili yalnız sahibi görsün: odadakiler de görsün seçildi.
- Rekorlar oyun + varyant bazında: varyant yok (2026-10-13'ten beri).
- Kalem rozeti + Düzenle düğmesi birlikte: telefonda çift göründü, tek düğme kaldı.

## Sonuçlar / riskler
- Oda silinince o odanın geçmişi profilden düşer (kabul).
- Parti turları oyun başına skor tutmadığı için rekorlara girmez.
- Mağaza metinleri ve ekran görüntüleri hâlâ Antrenman'dan söz ediyor, yenilenecek.

## İlgili
- [[2026-10-17-tussle-profil]] · mockup `src/client/mockups/profil.html`, `PROFIL-SPEC.md`

- 20 Eki: ayarlar girişi ana ekrana taşındı, profildeki dişli kalktı: [[2026-10-20-ayarlar-girisi-ana-ekranda-diskli-disli]].
