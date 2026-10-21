---
type: session
project: tussle
date: 2026-10-22
status: active
tags: [tussle, oturum, arayuz, jeton, sans-hakki]
source: oturum 2026-10-21/22 (mobil-playus: Melih geri bildirimi → ⚔ sayfası, hak = jeton, şans hakkı kaldırma, tablo rozeti)
---

# Oturum: ⚔ sayfası sadeleşti, hak = jeton, şans hakkı kalktı

## Yapılanlar
- Melih'in geri bildirimi (Parti Gecesi sayfası karışık/silik, ×N itici; parti modunda oyunlar anlaşılmadan geçiyor) analiz edildi.
- Maketler (`src/client/mockups/canli-sayfa*`, `jeton*`, `jeton-cizim*`): üç sekme önce/sonra; hak simgesi A nokta / B kalp / C bilet; jeton 11 yer önce/sonra; jeton çizimi 2. tur. Yusuf: kalp "can" gibi → jeton; T anlamsız → C2 Delikli.
- Üretim ([[2026-10-22-hak-jeton-dili-sans-hakki-kalkti]]): ⚔ sayfası ortak iskelet; jeton bileşeni ve tüm hak gösterimleri; şans hakkı uçtan uca kaldırıldı (migrasyon 26 yalnız ayarı siler); çarpı sekme hizası; günün tablosunda Hak sütunu yerine isimde kalan hak rozeti (Yusuf'un Playus ekran görüntüsünden esinlenildi).
- İncelemeler: ⚔ sayfası bulgu yok; jeton/şans bir orta bulgu (yıkıcı migrasyon geri almayı bozar) düzeltildi, şüpheci atlandı (düzeltme yalnız riski azaltıyordu). Ders: [[2026-10-22-worktree-tabani-ve-geri-alinabilir-migrasyon]].
- Yayın: 21efb0e (OTA 0.20261021.2142, DB 26), sonra 7042573 (OTA 0.20261021.2152). Sunucu sağlıklı, room_settings'te luck kalmadı.

## Doğrulanmayanlar
- Telefonda hiçbiri denenmedi: ⚔ sayfa aç/kapa, Gece'de küçük jeton dolu/boş ayrımı, tablo rozeti (Gece'de yalnız renk ölçüldü), parti kartı/sahnesindeki jeton ve akış hediye rozeti canlı partide görülmedi.

## Açık
- Parti modunda oyun anlatımı (Melih: "oyunları anlayana kadar yenileniyor"): akışı çıkar, öneri getir.
- Sonraki sürümde `luck` tablosu + `days.luck` düşür.
