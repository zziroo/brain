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

- 2026-10-02 (string-tool sohbeti, Diskort dışı proje): salt-okuma `ssh … df/ls/grep` ve SSH içeren dağıtım betiğini yazmak bile engellendi. Yusuf sohbette "ssh bağlantı iznini veriyorum" dedikten sonra aynı komutlar geçti. Proje dışı bir sohbette ayar dosyasındaki izin yetmeyebilir; engelde dolanmaya çalışma, kullanıcıya sor.

- 2026-10-09 (ZZ kökü sohbeti, song-finder/rehber API anahtarına geçiş): `docker inspect` ve `grep` ile salt okuma geçti, `/etc/*.env` içinde `sed -i` ile yazma engellendi. Yusuf "sshla yazma izni veriyorum" deyince aynı komut geçti; `deploy.sh` betikleri baştan beri engelsizdi. Ayrıca: `read -s` ile sır soran komutu Yusuf sohbetin `!` bash satırından çalıştırınca komut sırrı soramadan durdu (iki kez); böyle komutlar Terminal sekmesine verilmeli.

## İlgili
- [[2026-09-28-ios-davet-kurali-profil-suslemeleri-orkestrasyon]]
- [[2026-10-02-ceviri-araci-v0-1-ve-v0-2]]
