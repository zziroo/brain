---
type: lesson
project: tussle
date: 2026-10-13
status: active
tags: [tussle, ders, canvas, orkestrasyon, worktree, deploy]
source: oturum 2026-10-13 ikinci (mobil-playus: kapaklar, Parti J, varyantlar, Dört Ok)
---

# Kapak, varyant ve Dört Ok dersleri (canvas yolu, gizli bölme, worktree tabanı, ortak sunucu)

- **Canvas `roundRect` yolu eklemeli:** shell'in `roundRect` yardımcısı `beginPath` çağırmıyor. Önce `stickerRect` ile karo çizilip sonra `roundRect` + `fill` yapılınca çubuğun rengi karonun tamamına doldu (karolar beyaz, süre bitince tamamı kırmızı). Yusuf'un "çubukta bir şey yok, kutuların komple rengi değişiyor" gözlemiyle bulundu; üç ajan ve inceleme görmedi. Kural: her `roundRect`/`fill` öncesi `ctx.beginPath()`.
- **Gizli bölmede oyun durur:** koordinatörün tarayıcı sekmesi arka plandayken sayfa `hidden` görür, oyun "Duraklatıldı" der. Canlı kare için `scripts/canvas-shot` görünürlük taklidi + alıcıya POST şart. `toDataURL` sonucunu `javascript_tool` ile doğrudan döndürme: base64 bağlama dökülür (~45k token). Alıcı portu paylaşımlı (5199): paralel ajanlar kendi portunu açsın.
- **Worktree ajanları HEAD'den değil eski commit'ten dallanabilir:** iki kapak ajanı `2609905`'ten dallandı (ana dalda sonradan atılan silme commit'i yoktu); merge'de silinmiş Terazi kapağının başlığında çakışma çıktı, kolay çözüldü. Aynı dosyada ayrık bölgelerde çalışan iki worktree ajanı sorunsuz birleşti; sınır: ortak yardımcıları silmemeleri söylendi, temizlik koordinatörde.
- **İskelet önce main'e:** `npm run new-game` ile iskeletleri main'e koyup commit'lemek, sonra 3 oyun ajanını yerinde (worktree'siz) paralel çalıştırmak çakışma çıkarmadı (klasör + kendi i18n bloğu ayrık).
- **Ortak Vite sunucusu:** başka oturumun dev sunucusu 5173'te açıktı, ajanlar onu kullandı (aynı repo, HMR); yarım düzenlemeler birbirinin sayfasını yeniden yükledi, tolere edildi.
- **"Önce" ekran görüntüsü:** yeni oyun ajanı başladığında Vite kodu zaten yüklemiş oluyor; önce/sonra isteniyorsa ajan başlamadan koordinatör alsın.
- **Uzak SSH yazmaları:** auto mode sınıflandırıcısı yedek alma için SSH yazmasını reddetti; terminal paneli üzerinden `deploy/release.sh` (yedek + `deploy/deploy.sh`) çalıştı; Yusuf oturum içinde SSH izni verdi.
- **Varyant kaldırmada saklı parametre tuzağı:** gün satırı modun çözülmüş parametrelerini saklıyordu; silinmiş modla açılmış gün "melez" oyun olurdu. İnceleme ajanı yakaladı (orta bulgu), düzeltildi. Davranışı koruyan silmelerde boş rng çekimlerini altın tohum testiyle kilitle.

İlgili: [[2026-10-13-dort-ok-oyunu]], [[2026-10-13-varyantlar-kaldirildi-oyunlar-tek-ve-sabit]], [[2026-10-13-kapaklar-ve-kucuk-resimler-sekersiz]], [[2026-10-13-parti-i-ve-sure-modeli-dersleri]], [[2026-10-12-denge-ve-tema-turu-dersleri]].
