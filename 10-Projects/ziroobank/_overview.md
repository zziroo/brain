---
type: project
project: ziroobank
date: 2026-10-05
status: active
tags: [ziroobank, finans, sunucu]
---

# Ziroobank: arkadaş grubunun taksit takibi (eski Google Sheet "ziroobank-odemeler")

- Klasör `C:\Users\yusuf\ZZ\zProjects\ziroobank-expenses` (yerel git, remote yok). Node 24, bağımlılık yok, SQLite (`node:sqlite`).
- Canlı: https://tools.ziroo.net/ziroobank/ (2026-10-03'ten beri; eski adres 301; çerez `Path=/ziroobank`, geçişte herkes bir kez yeniden girdi). Sunucu: Diskort VPS ([[sunucu-vps]]). Konteyner `ziroobank` (`/opt/ziroobank`, 127.0.0.1:3100), veri `/opt/ziroobank/data/ziroobank.db`, statik dosyalar `/opt/ziroo-www/tools/ziroobank/`, Caddy yolu `/opt/ziroo-sites/tools/ziroobank.caddy`. Neden böyle: [[2026-10-02-diskort-sunucusunda-ayri-konteyner]] (adres kısmı eski); güncel adres kararı ve XSS riski: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]].
- Kurallar sheet ile aynı: Aylık = Toplam/Taksit, Bitiş = Başlangıç+Taksit−1, Kalan Taksit = Taksit − aralıktaki ödenmiş ay sayısı.

## Güncel durum (2026-10-03)
- **2026-10-05:** arayüz neon temada (`9b1ae8a`); Özet tablosunda geciken (geçmiş, ödenmemiş) aylar kırmızı + "Gecikti" rozeti (`3e69e03`). Yayında, `deploy/deploy.sh` Mac'ten çalıştı ([[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]]).
- Yayında, DB şeması v1 (roller). Hesaplar: `ziroo` (yönetici, ödeme yapmaz), `dararius`, `emre`, `tuna` (kullanıcı, ödeme yapan). Yetkiler: [[2026-10-03-roller-ve-kullanici-yonetimi]].
- Yeni kullanıcıyı yönetici "Kullanıcılar" sekmesinden ekler; şifre bir kez gösterilir. İlk dört hesabın şifreleri sunucuda `/opt/ziroobank/secrets/passwords.txt`. Betik: `create-users.mjs --only <ad>` ya da `--all` ([[sifre-betigi-dosyayi-ezdi]]).
- Sheet'ten taşıma 2026-10-02'de birebir doğrulandı; sheet arşivde, paylaşımı kapalı (yalnız Yusuf).
- Göç öncesi DB yedekleri sunucuda `/root/ziroobank-pre-admin.db` ve `/root/ziroobank-data-pre-roles-202610030110`.
- Yayın: `bash deploy/deploy.sh` (artık `tar | ssh`, rsync gerekmez; Mac'te `COPYFILE_DISABLE=1` ile).

## Sıradaki işler
1. Otomatik DB yedeği (Diskort yedek düzenine eklenebilir; Yusuf'a önerildi, karar bekliyor).
2. Kullanıcılar sekmesini canlıda arayüzden denemek.
3. Kullanıcının kendi kaydını düzenleyip silebilmesi kalsın mı, yalnız eklemeye mi daraltılsın: Yusuf'a soruldu, yanıt yok.

## Notlar
- Oturumlar: [[2026-10-03-sheet-tasima-ve-roller]]
- Dersler: [[sifre-betigi-dosyayi-ezdi]] · [[ortak-sunucuda-paralel-oturum]]
