---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, etkinlik, presence, arayuz]
source: a23848e8-c89f-4e6e-b205-6a370f117b82.jsonl
---

# Karar: Etkinlik kartında durum ikonları, son başlayan oyun öne çıkar, diğerleri profilde; yalnız giriş yapılmışken çalışır

## Bağlam
Önce yalnız oynanan oyun gösterilecek; ileride Spotify gibi etkinlikler de gelebilir.

## Karar
- Alt satır ikonlu: oyunda ise oyun kolu, seste ise ses ikonu; metin sırası özel durum > oyun adı > "Sesli sohbette". İpucu alta açılır, ismi kapatmaz (yer yoksa üste).
- Aynı anda iki oyun: son girilen gösterilir, diğeri profildeki etkinlik kartlarında alta kaydırınca görünür (en çok 4; aynı oyun iki cihazda tek öğe).
- Üye listesinden "hızlı mesaj gönder" düğmesi kaldırıldı (profil kartında var).
- Algılama yalnız oturum açıkken çalışır; oyun adından görünmez karakterler temizlenir, ikonda yalnız sıkı denetlenen PNG parçaları kabul edilir.
- Seste oyun ikonu üye satırında ve mobil kanal listesinde; mobilde ikonlar oyun rengi yerine uygulamanın yeşili.

## Neden
Kullanıcı yanıtları (madde madde: 1 "alta alabilirsin", 2 "kaldır", 3 "yalnızca giriş yapılmışken", 4 "olur", 5 "gerçek testlerden sonra").

## Reddedilen alternatifler
- Üye satırında hızlı mesaj düğmesi: kaldırıldı.
- İkon PNG'sine her veri: sıkı denetim (review düşük bulgusu).

## İlgili
- [[sade-arayuz-tercihi]], [[2026-09-30-etkinlik-karti-oynuyor]]

Benzer/ilgili not (başka ajan): [[etkinlik-oyun-aktivitesi]]
