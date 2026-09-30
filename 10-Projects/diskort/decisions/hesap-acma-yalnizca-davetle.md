---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [davet, guvenlik, hesap]
source: C--dev-diskort fed9b022 (2026-09-28)
---

# Karar: Diskort'ta yeni hesap yalnızca hesap yöneticisinin daveti ile açılır; bu bir ayar değil sabit kuraldır.

## Bağlam
Bir arkadaş sunucu kurup başkalarını davet ederse kullanıcı sayısının haberi olmadan büyüyüp büyümediği soruldu.

## Karar
Hesap yönetimi (şifre sıfırlama, hesap silme, hesap daveti, geri bildirim yönetimi) platform geneli hesap yöneticisinde; sunucu sahibi yalnızca kendi sunucusunun sahibi. Hesabı olmayan biri başkasının sunucu davetini kullanamaz ("hesap yöneticisinden davet iste", davet hakkı harcanmaz). Yönetici yetkisi alınınca eski davetleri hesap açtırmaz. Yönetici başka yöneticinin şifresini sıfırlayamaz; son yönetici çıkarılamaz.

## Neden
- Kullanıcı sayısı ve sunucu yükü kontrol altında kalır (tek VPS, trafik kotası).
- Kapalı, güvenilen grup.

## Reddedilen alternatifler
- Sunucu sahibine şifre sıfırlama yetkisi: aynı kişi birden çok sunucuda olabilir, kötü niyetli sahip başkasının hesabını ele geçirebilir.
- E-posta ile kendi şifresini sıfırlama: e-posta gönderme altyapısı gerekir; ertelendi.
- "Ayar olsun": kullanıcı gerek görmedi.

## Sonuçlar / riskler
Sunucu testleri 346 geçti, kural için yeni test eklendi. İş grubu büyürse güvendiğin kişileri yönetici yapmak mümkün.

## İlgili
- [[2026-09-28-ios-davet-kurali-profil-suslemeleri-orkestrasyon]]
- Aynı konuda memory kaynaklı not: [[kayit-sadece-hesap-davetiyesi]]
