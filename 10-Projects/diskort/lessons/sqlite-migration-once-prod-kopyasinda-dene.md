---
type: lesson
project: diskort
date: 2026-09-26
status: active
tags: [veritabani, migration, dagitim]
source: C--dev-diskort 2736605c, 4b7b1382
---

# Ders: Şema değişikliği canlıya gitmeden önce prod yedeğinin kopyasında denenir.

- Sunucu `node:sqlite` ve `PRAGMA user_version` ile migration çalıştırır; hata canlıda geri almayı zorlaştırır.
- Desen: dağıtımdan önce `backup-db.sh`, yedeği açıp `new Store(dosya)` ile migration'ı çalıştır, tablo sayıları, yabancı anahtarlar ve bütünlüğü karşılaştır.
- Dağıtımdan sonra `PRAGMA user_version` ve hata seviyesi loglarına bak.
- Metin kanalı migration'ı (2 -> 3) ve 17-19 arası migration'lar bu şekilde denendi.

## İlgili
- [[2026-09-26-metin-kanallari-ve-android-baslangic]]
