---
type: lesson
project: ziroobank
date: 2026-10-03
status: active
tags: [ziroobank, sifre, betik]
source: ziroobank-expenses oturumu 2026-10-02/03
---

# Ders: tek kullanıcıya şifre üreten betik, düz şifre dosyasını baştan yazıp diğerlerini sildi.

- `create-users.mjs --only ziroo` `passwords.txt`'yi yalnız yeni satırla yazdı; diğer üç şifrenin düz hali kayboldu (hash'ler geçerliydi). Üç şifre yeniden üretildi.
- Düzeltme: `--only` diğer satırları korur; tüm hesaplar için artık açıkça `--all` gerekir (yanlışlıkla yöneticinin de şifresini değiştirmesin).
- Genel kural: gizli değer yazan betikler dosyayı birleştirerek yazmalı; canlıda çalıştırmadan önce yerelde geçici klasörde dene.

## İlgili
- [[2026-10-03-roller-ve-kullanici-yonetimi]]
