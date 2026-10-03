---
type: decision
project: ziroobank
date: 2026-10-02
status: superseded
tags: [ziroobank, sunucu, caddy, tasima]
source: ziroobank-expenses oturumu 2026-10-02/03 (sheet taşıma)
---

> **Güncel değil (2026-10-03):** adres kısmı (diğer kararlar geçerli: ayrı konteyner, taşıma doğrulaması, sheet erişimi) için yerini [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] aldı. Aşağısı o günkü bağlam olarak duruyor.

# Karar: Ziroobank, Diskort VPS'te ayrı konteyner olarak diskort.ziroo.net/tools/ziroobank altında çalışır; Google Sheet arşivde ve paylaşımı kapalı.

## Bağlam
Yusuf taksit takibini Google Sheet'ten kendi sunucusuna, araçlarını topladığı yere taşımak istedi. Kayıt ekleme ve ödendi işaretleme olduğu için statik sayfa yetmez; backend ve giriş gerekiyordu.

## Karar
- Adres `diskort.ziroo.net/tools/ziroobank` (Yusuf seçti). API ayrı konteyner `ziroobank` (127.0.0.1:3100, Node 24, bağımlılıksız, SQLite); statik dosyalar Diskort web kökünde; yol tanımı `/opt/ziroo-sites/ziroobank.caddy` ([[2026-10-02-caddy-ortak-site-klasoru]]).
- Taşıma doğrulamalı: içe aktarma her ayı, KALAN/TOPLAM'ı ve her kaydın hesaplanan alanlarını sheet ile karşılaştırır, fark varsa işlemi geri alır.
- Sheet arşiv olarak Yusuf'ta kaldı; diğer üç kişinin ve servis hesabının erişimi tamamen kaldırıldı (Yusuf: "arşivi de görmesinler").

## Neden
- Tek giriş kapısı Diskort'un Caddy'si; ayrı konteyner Diskort'u etkilemeden güncellenir.
- Bağımlılıksız Node: küçük imaj, bakım yükü yok.

## Reddedilen alternatifler
- Ayrı alt alan adı ya da `ziroo.net` hub: önerildi, Yusuf `/tools` altını seçti.
- Tek ortak şifre: Yusuf kişi başı hesap istedi.
- Sheet ile iki yönlü senkron ya da salt-okuma paylaşım: Yusuf erişimin tamamen kapanmasını istedi.

## Sonuçlar / riskler
- Otomatik DB yedeği yok (açık iş).
- Servis hesabı sheet'e artık erişemez; tekrar okumak gerekirse Yusuf paylaşmalı.

## İlgili
- [[10-Projects/ziroobank/_overview|Ziroobank]] · [[sunucu-vps]] · [[2026-10-03-roller-ve-kullanici-yonetimi]]
