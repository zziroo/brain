---
type: lesson
project: diskort
date: 2026-09-28
status: active
tags: [guvenlik, ssh, otomatik-mod]
source: C--dev-diskort fed9b022, 72824d08
---

# Ders: Otomatik mod denetçisi bağlamsız yeni sohbette canlı sunucuya SSH komutunu engeller; izin hafızada değil ayar dosyasında olmalı.

- Gün boyu SSH ile çalışılan sohbette sorun yoktu; yeni sohbette `docker compose exec` ile salt-okuma komutu bile engellendi (denetçi ayrı bir sınıflandırıcı, neden söylemiyor).
- Hafıza notları denetçi için yetki sayılmaz.
- Çözüm: [[ssh-izni-yalnizca-diskort-sunucusu]].
- Benzer: sürüm etiketi itmek ("canlıya çıkış") ve güvenlik testi beklentisini değiştirmek de engellendi; kullanıcı onayı gerekti. Kullanıcıdan açık onay al, sonra yap. Ayrıca [[claude-altina-yazma-izin-sorar]].

## İlgili
- [[2026-09-28-ios-davet-kurali-profil-suslemeleri-orkestrasyon]]
