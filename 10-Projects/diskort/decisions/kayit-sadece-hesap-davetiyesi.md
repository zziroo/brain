---
type: decision
project: diskort
date: 2026-09-26
status: active
tags: [diskort, auth, kayit, davet]
source: memory diskort-rules.md, diskurt-project.md
---

# Yeni hesap yalnızca hesap davetiyesiyle açılır; sunucu davetleri mevcut hesapları katar

## Karar
- Kayıt SADECE hesap davetleriyle. Sunucu (guild) davetleri yalnız var olan hesapların katılmasını sağlar.
- Giriş ekranında sunucu adresi gizli (logoya 5 dokunuş); varsayılan olmayan sunucuda "Test sunucusu" yazar.
- Davet sayfasında "Uygulamada aç" düğmesi (`diskort://`, Android `intent://`). Giriş yapılmamışsa giriş moduna düşer (sunucu daveti hesap açamaz).

## Neden
Kapalı grup; davet kodu + kullanıcı adı/parola modelinde hesap sayısı kontrol altında kalır ([[proje-hedefleri-ve-platformlar]]).

## Reddedilen alternatifler
Açık kayıt; sunucu daveti ile hesap açma.

## Sonuçlar / riskler
Gece incelemesi kuralı ihlal eden yolları arar ("new accounts only via account invites").

## İlgili
- [[_overview]]
