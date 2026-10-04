---
type: decision
project: song-finder
date: 2026-10-04
status: active
tags: [song-finder, karar, yayin, sirlar]
source: oturum "Benzer şarkı bulma aracı" (2026-10-04)
---

# Yayında Claude token'ı ve giriş parolası şimdilik Rehber Okuyucu ile aynı değerleri kullanır

## Karar
1. Song Finder konteyneri Claude token'ını `/etc/claude-token.env` dosyasından okur. Dosya, `/etc/rehber.env` içindeki `CLAUDE_CODE_OAUTH_TOKEN` satırının sunucu içinde alınmış kopyasıdır.
2. Giriş parolası (`APP_PASSWORD`, `/etc/song-finder.env`) Rehber Okuyucu'nun `OWNER_PASSWORD` değeriyle aynı yapıldı (sunucu içinde kopyalandı).
3. İkisi de Yusuf'un sözüyle "şimdilik".

## Neden
- Yusuf yeniden `claude setup-token` çalıştırmak ve ayrı parola tutmak istemedi; Rehber Okuyucu'daki kurulumu yeniden kullanmayı istedi.
- Değerler sunucu içinde kopyalandı, sohbete ya da ekrana çıkmadı.

## Bilinen bedeller
- Token daha önce bir ekran görüntüsüyle sohbete düşmüştü; yenilenmedi. Yenilenince iki dosya da (`/etc/claude-token.env`, `/etc/rehber.env`) güncellenmeli ve iki konteyner yeniden başlatılmalı.
- İki araç aynı Max limitinden harcar; token iptal edilirse ikisi birden durur.
- Parola iki dosyada ayrı kopya: biri değişince diğeri kendiliğinden değişmez. Biri sızarsa iki araç da açılır.
- "Ortak dosya" yarım: Rehber Okuyucu hâlâ kendi dosyasını okuyor. Geçiş o projenin oturumunda yapılmalı (bu oturumda o projenin klasörünü okuma isteği izin denetimine takıldı).

## Reddedilen alternatifler
- Song Finder için ayrı token ve rastgele ayrı parola: önce böyle kuruldu (28 karakterlik rastgele parola), Yusuf aynı olmasını isteyince değiştirildi.
- Song Finder konteynerine `/etc/rehber.env` dosyasını doğrudan vermek: Rehber Okuyucu'nun diğer sırlarını da bu konteynere taşırdı.

Bağlantı: [[10-Projects/song-finder/_overview|Song Finder]], [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
