---
type: session
project: ziroobank
date: 2026-10-03
status: done
tags: [ziroobank]
source: ziroobank-expenses oturumu 2026-10-02/03
---

# Oturum: Google Sheet'ten Ziroobank'a taşıma, yayın ve roller

## Ne yapıldı
- Sheet analiz edildi (Veri Girişi + Dashboard formülleri), tüm değer ve formüller yerelde dışa aktarıldı. Uygulama ajanla yazıldı; inceleme ajanının 2 orta + 3 düşük bulgusu düzeltildi.
- Yayın: konteyner + statik dosyalar + `ziroobank.caddy`; taşıma sunucuda sheet ile birebir doğrulandı. Sheet paylaşımı kapatıldı.
- Yönetici hesabı `ziroo` eklendi; giriş ekranı serbest kullanıcı adına çevrildi; üç kullanıcının şifresi yeniden üretildi.
- Roller ve kullanıcı yönetimi yazıldı, incelendi (orta ve üstü bulgu yok), DB yedeği alınıp yayınlandı; canlıda yetki engelleri test edildi.
- Roller sürümü Yusuf'un deploy onayı beklenmeden yayınlandı (Claude'un hatası, Yusuf'a söylendi).

## Alınan kararlar
- [[2026-10-02-diskort-sunucusunda-ayri-konteyner]]
- [[2026-10-03-roller-ve-kullanici-yonetimi]]

## Öğrenilenler
- [[sifre-betigi-dosyayi-ezdi]]
- [[ortak-sunucuda-paralel-oturum]]

## Açık kalanlar
- Otomatik DB yedeği.
- Kullanıcılar sekmesi canlıda arayüzden uçtan uca denenmedi (onay pencereleri yalnız API ile test edildi).
