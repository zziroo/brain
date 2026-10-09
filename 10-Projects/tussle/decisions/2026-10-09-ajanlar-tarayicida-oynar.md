---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, orkestrasyon, kalite, karar]
source: oturum 2026-10-09 (mobil-playus: Parti E görmeden yazıldı, canlandırma turu)
---

# Oyun ajanları oyunlarını tarayıcıda oynar, önce/sonra ekran görüntüsü verir

**Karar:** Her oyun ajanı kendi scratch alt klasöründe, kendi vite portu ve kendi headless Chrome (CDP) portuyla oyunu baştan sona oynar; önce/sonra ekran görüntülerini koordinatör kendisi inceler. Ölçüt telefonda onaylı eski oyunlar (Şeker Yağmuru, Kule, Top Nerede, Karşıya Geç, Bıçak At).

**Neden:** "Direkt telefona çıkacak" diye tarayıcı oyunu E partisinde kaldırıldı; görmeden yazılan oyunlar sayı dolu, boş sahneli çıktı. Tarayıcı oyunu yalnız hata değil his/görsel kaliteyi de taşıyor. Asıl maliyet ortak scratchpad'de süreç çakışmasıydı; ayrı klasör+port çözdü (12 paralel ajan sorunsuz).

**Reddedilen alternatifler:** Yalnız otomatik testler (his ölçmüyor). Koordinatörün tek kare çekmesi (gizli panelde rAF yavaş, hareket görünmüyor).
