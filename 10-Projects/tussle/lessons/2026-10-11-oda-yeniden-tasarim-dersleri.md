---
type: lesson
project: tussle
date: 2026-10-11
status: active
tags: [tussle, ui, tasarim, perf, ders]
source: oturum 2026-10-11 (mobil-playus: deneme turu, rekor flaması, oda ekranı yeniden tasarımı F)
---

# Oda ekranı yeniden tasarım dersleri

- **Maketi gerçek temayla, ayrı sayfada yap.** `src/client/mockups/oda.html` gerçek `theme.css`/`lobby.css` ve bileşenleri yükledi; Vite kökü `src/client` olduğu için geliştirmede `/mockups/...` açılıyor, yayın paketine girmiyor (yalnız `index.html`'den derleniyor). Yön seçimi koda dokunmadan iki turda bitti.
- **Seçenek sayısını erken kıs.** 3 varyant → 4 alt varyant sonrası Yusuf "çok seçenek var gibi, sana bıraktım" dedi. İkinci turdan sonra tek nihai tasarım + gerekçe ver.
- **Yusuf tasarımı bırakınca kendi kararını onunkinden ayır.** "Benim dediklerim oldu gibi, bunlara mı karar verdin sen de" diye sordu. Hangisi onun fikri, hangisi Claude'un kararı, nerede farklı düşünüldüğü açıkça yazılmalı (örn. kapağı tamamen soluklaştırma yerine degrade perde).
- **"Küçülsün" isteğini doğru anla.** Yusuf Playus tarzı başlık küçülmesi istedi (sezon bandı üst bara kapansın, gün sohbetle kaysın); Claude önce "sohbet yukarı kayınca üst kısım şeride insin" çizdi. Referans görseli yerleşim örneği olarak oku, tek cümleyle teyit et ([[2026-10-11-ust-duzen-dersleri]] ile aynı tuzak).
- **Kasmayan küçülen başlık:** gerçek bant ve kart normal akışta kayıp gider; çip ve şerit ayrı küçük katmanlar, IntersectionObserver gözcüleri (histerezisli) tek sınıf değiştirir, yalnız transform/opacity. `visibility` geçişi ana iş parçacığında koşup 20 kare düşürdü; kaldırınca 0. 4x yavaşlatmada kaydırmada layout 0.
- **IO ilk girdisi sıfır geometriyle gelebilir:** ekran kurulmuş ama DOM'a bağlanmamışken (`app.ts` görünüm geçişi bir kare sonra takas ediyor) `rootBounds` null/0 olur ve "geçildi" sanılır. `!rootBounds || height<=0 || !isConnected` girdilerini yok say.
- **`overflow-anchor: none` + elle yer tutma:** baş bölüm (kart, açılan liste) boy değiştirince okunan yer kayıyordu, en yeni mesaj takibi de sessizce duruyordu. ResizeObserver baş düğümleri de izliyor; en alttaysa sona yapıştır, değilse geçilmiş düğümün boy farkı kadar `scrollTop` ekle. iOS `overflow-anchor` desteğine güvenme.
- **Sohbet akış satırının günü `at` değil, yükte taşınmalı:** gece yarısından sonraki 10 dk gecikme payında dünün rekoru bugünün kartına karışıyordu; `FeedBest.day` eklendi, `parseFeed` alanı tek tek kurduğu için doğrulaması da eklendi.
- **Canlı sunucuya SSH, oto mod denetçisine takılabilir;** Yusuf sohbette izin verince geçti. Yayın öncesi yedek komutu: `docker exec tussle node -e` ile `VACUUM INTO '/data/pre-<rev>.db'` (veri dosyası `/data/tussle.db`).
- macOS'ta `timeout` komutu ve Python PIL yok; görüntü birleştirme için ajanların Node betikleri kullanıldı.

## İlgili
- [[2026-10-11-oda-ekrani-sezon-bandi-ve-canli-ilk-3]]
- [[_overview]]
