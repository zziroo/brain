---
type: session
project: tussle
date: 2026-10-22
status: unverified
tags: [tussle, gorsel, test, oda-ayarlari, kapisma]
source: "oturum 2026-10-22 (mobil-playus: tussle: telefon ekran taşmaları ve kök neden)"
---

# Oturum: telefon ekran taşmaları, kök neden ve otomatik taşma denetimi

- Girdi: sahibin üç ekran görüntüsü (Xiaomi, 407 CSS px): oda ayarları başı (kod çipi seçilebiliyor, Davet et küçük), odada bitmiş Sumo kartı ("36,9 sn" kırık) + kendi açık kart ("Davet et" iki satır), Ayarlar > Hakkında (sürüm taşıyor, lisans oku kesik). Soru: neden kaçırıyoruz?
- Kök neden ve ders: [[2026-10-22-dev-verisi-uretimden-kisa-tasma-gorunmez]] (dev'de kısa sürüm dizesi; 375 px kuralı elle; genişlik değil veri eksikti).
- Yapılan (`4cb21c1`, yayın 22 Eki 14:31, OTA 0.20261022.1431): skor nowrap + container query küçülme; kart altı düğmeler nowrap, iki düğmede not alta; sürüm iki satır (`settings.versionRev` anahtarı), `.live-rows` minmax(0,1fr) + `.live-row > *` min-width 0; oda ayarları başında kod çipi kalktı (davet sayfasında kopyalanabilir), Davet et tam boy hap; oyun havuzu kutunun altında değil satırın hemen altında açılıyor, sığmıyorsa satır üste kayar (`scrollIntoView start`, yapışık Kaydet çubuğu hesaba katılır); ana sayfada 360 px "Kodla katıl"; dev'de üretim uzunluğunda sürüm; `npm run tasma` (`scripts/tasma-kontrol.mjs`), `docs/VISUAL.md` kuralı.
- Süreç: kök neden inline grep (textZoom, nowrap, vite define) → iki opus ajanı paralel (düzeltmeler + script, dosya sınırları ayrı) → inceleme (1 düşük, düzeltildi) → sahibin iki ek isteği inline → sonnet teyit ajanı (kaydırma ölçümü iki tur). Testler: 2646 geçti, `server-daily` bir kez zamanlama yüzünden düştü (tek başına geçiyor).
- Telefonda denenmedi; sıradaki: sahibin üç ekrana yeniden bakması, tasma kapsamını alt sayfalara ve canlı kartlara genişletme.
