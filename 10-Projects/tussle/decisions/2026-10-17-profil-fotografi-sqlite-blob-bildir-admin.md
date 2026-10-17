---
type: decision
project: tussle
date: 2026-10-17
status: active
tags: [profil, fotograf, gizlilik, moderasyon]
source: tussle profil oturumu (2026-10-17)
---

# Karar: Profil fotoğrafı isteğe bağlı, SQLite'ta BLOB, bildir düğmesi + admin'den kaldırma

## Bağlam
Yusuf avatara kullanıcı fotoğrafı eklenmesini istedi; varsayılan baş harf kalacak. Apple 1.2 kullanıcı içeriğinde bildirme ister.

## Karar
- İstemci fotoğrafı 256 px kare kırpar, WebP (olmazsa JPEG) olarak `PUT /api/me/photo` ile ham gövdede yükler; en çok 96 KB.
- Sunucu türü ve boyutu dosya başlığından okur (WebP/JPEG, 32-512 px, kareye yakın), hareketli WebP'yi reddeder.
- Bayt `user_photos` tablosunda BLOB (migration 17); her yüklemede yeni rastgele anahtar, `/api/photos/<key>` değişmez önbellek + nosniff + sandbox CSP.
- Oyuncu kartında "Fotoğrafı bildir" (yalnız ortak odadakiler); admin panelinde Fotoğraflar sekmesi: kaldır / sorun yok.
- Gizlilik sayfasına fotoğraf paragrafı.

## Neden
- BLOB: gece yedeği (`VACUUM INTO`) ve hesap silme (cascade) fotoğrafı kendiliğinden kapsar; diskte ayrı dosya yönetimi yok.
- Rastgele anahtar: `<img>` istekleri yetki başlığı taşıyamaz, adres tahmin edilemez olunca açık sunmak yeterli.
- İstemcide kırpma: sunucuda görüntü kütüphanesi (sharp, yerel bağımlılık) gerekmiyor; canvas yeniden kodlaması EXIF'i de atar.

## Reddedilen alternatifler
- Fotoğrafı yalnız ortak odadakiler görsün: bildir + admin seçildi (bildirme zaten gerekiyordu).
- Diskte dosya: yedek ve silme ayrıca ele alınmalıydı.
- Sunucuda yeniden kodlama: yerel bağımlılık, gereksiz.

## Sonuçlar / riskler
- Yeni fotoğraf yüklenince eski anahtara açılmış bildirimler admin listesinden düşer (içerik değişti; kabul).
- Telefonda gerçek fotoğraf seçme/kırpma henüz denenmedi.

## İlgili
- [[2026-10-17-profil-ekrani-kapsami]] · [[2026-10-17-tussle-profil]]
