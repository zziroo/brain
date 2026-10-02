---
type: decision
project: ziroobank
date: 2026-10-03
status: active
tags: [ziroobank, yetki, kullanici]
source: ziroobank-expenses oturumu 2026-10-03
---

# Karar: normal kullanıcı yalnız kendi adına kayıt ekler/düzenler/siler; ödendi işaretleme ve kullanıcı yönetimi yalnız yönetici (ziroo).

## Bağlam
İlk sürümde herkes her şeyi yapabiliyordu (başkasının kaydını silmek, ödendi değiştirmek). Yusuf: normal kullanıcılar yalnız kendi adına kayıt girsin, herkes tabloları görsün, yönetici yeni kullanıcı ekleyebilsin.

## Karar
- Roller `admin` / `user`; kullanıcıda `is_payer`, `active`, renk yuvası. Ödeme yapan kişiler (tablo sütunları) artık DB'den gelir, sabit liste değil.
- Kullanıcı: her şeyi görür; yalnız kendi adına kayıt ekler, yalnız kendi kayıtlarını düzenler/siler, kişiyi değiştiremez. Yönetici: her şey + ödendi + "Kullanıcılar" sekmesi (ekle, şifre sıfırla, pasife al, düzenle).
- Yeni ya da sıfırlanan şifre sistemce üretilir, yanıtta bir kez gösterilir, düz hali saklanmaz ve loglanmaz.
- Giriş ekranında kullanıcı seçme listesi yok; kullanıcı adı elle yazılır (Yusuf istedi).
- DB göçü `PRAGMA user_version` 0→1, yerinde ve veri kaybısız.

## Neden
- Kendi kaydını düzeltip silebilmek: yanlış girişi yöneticiye gerek kalmadan düzeltmek için. Claude'un seçimi, Yusuf'a bildirildi; istenirse yalnız eklemeye daraltılabilir.
- Tek seferlik şifre gösterimi: düz şifre dosyası tutmamak.

## Reddedilen alternatifler
- Kullanıcı yalnız ekleyebilir (düzenleme/silme yok): yanlış girişte yöneticiye bağımlı kalınır. Henüz Yusuf'tan kesin yanıt yok.
- Sabit kullanıcı listesi: yönetici yeni kullanıcı ekleyemez.

## Sonuçlar / riskler
- Pasife alınıp geri açılan kullanıcı eski şifresiyle girer (bilinçli bırakıldı).
- Giriş süresinden aktif kullanıcı adları çıkarılabilir (düşük önem, hız sınırı var).

## İlgili
- [[2026-10-02-diskort-sunucusunda-ayri-konteyner]] · [[10-Projects/ziroobank/_overview|Ziroobank]]
