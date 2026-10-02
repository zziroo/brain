---
type: project
project: ziroobank
date: 2026-10-02
status: active
tags: [ziroobank, finans, sunucu]
---

# Ziroobank: Dararius / Emre / Tuna taksit takibi (eski Google Sheet "ziroobank-odemeler")

- Klasör `C:\Users\yusuf\ZZ\zProjects\ziroobank-expenses` (yerel git, remote yok). Node 24, bağımlılık yok, SQLite (`node:sqlite`).
- Canlı: https://diskort.ziroo.net/tools/ziroobank/ . Sunucu: Diskort VPS ([[sunucu-vps]]). Konteyner `ziroobank` (`/opt/ziroobank`, 127.0.0.1:3100), veri `/opt/ziroobank/data/ziroobank.db`, statik dosyalar `/opt/diskort/apps/web/tools/ziroobank/`, Caddy yolu `/opt/ziroo-sites/ziroobank.caddy`.
- Hesaplar: dararius, emre, tuna (sabit). Şifreler sunucuda `/opt/ziroobank/secrets/passwords.txt`; sıfırlama `docker compose exec ziroobank node scripts/create-users.mjs --only <ad>`.
- Kurallar sheet ile aynı: Aylık = Toplam/Taksit, Bitiş = Başlangıç+Taksit−1, Kalan Taksit = Taksit − aralıktaki ödenmiş ay sayısı. Üç kullanıcı da her şeyi düzenleyebilir; her değişiklik Geçmiş'te.
- Taşıma 2026-10-02: 45 kayıt, 18 ay, 4 ödenmiş ay; KALAN 202.855,78, TOPLAM 336.246 sheet ile birebir. Sheet arşiv; diğer üç kişinin ve servis hesabının erişimi kaldırıldı (yalnız sahibi).
- Yedek: henüz otomatik yedek yok (açık iş).
