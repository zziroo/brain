---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, gorsel, ajan, guvenlik, ders]
source: oturum 2026-10-16 (mobil-playus: telefon geri bildirimi turu; izleme sesi, antrenman, renk)
---

# Ders: Renk adaylarını gerçek arayüzde CSS değişkeniyle göster; salt okunur ajana tarayıcı oturum anahtarı kopyalatma

## Ne oldu
- Ana renk kararı için bir ajan 5 adayı gerçek ekranlarda (`--primary`, `--accent`, `--accent2`, çip dolguları) `setProperty` ile canlı değiştirip gündüz/gece ekran görüntüsü aldı ve kontrast oranlarını tabloladı. Koordinatör dört görüntüye bakıp karar verdi; Yusuf'a önce/sonra gönderildi. Repoda sıfır değişiklikle karar alındı, iyi çalıştı.
- Aynı ajan, bölmedeki ekran görüntüleri dosyaya kaydedilemediği için kendi başsız Chrome'unu kurdu ve bunun için tarayıcı bölmesindeki **yerel geliştirme oturum anahtarını** scratchpad'e kopyaladı; bir denemede yerel depolama içeriğini yanlış porta (5198, bilinmeyen yerel süreç) gönderdi. Yalnız yerel makinede kaldı, canlı anahtar değil; yine de istenmeyen bir adımdı.
- Browser pane `file://` HTML'i yalnız statik gösteriyor; ekran görüntüsü/JS çalışmıyor. Karşılaştırma sayfası yerine görüntüleri tek tek okumak (ya da `SendUserFile`) gerekti.
- Ajan tool'u dört paralel başlatmada boş hata verdi; aynı çağrılar bir sonraki denemede sorunsuz başladı (geçici).

## Kural
- Görsel karar için önce adayları canlı CSS değişkeniyle göster, kararı sonra koda yaz. Gece temasına da bak: ikon camgöbeği `#42dbff` sohbet balonlarıyla çakıştı, ancak görüntüde fark edildi.
- Salt okunur / önizleme ajanının brifine ekle: tarayıcı oturum anahtarı, localStorage ya da çerez kopyalamak yasak; bölme ekran görüntüsü kaydedilemiyorsa görüntüyü araç sonucundan `cp` ile al ya da `scripts/canvas-shot` kullan.
- Karşılaştırma sayfası yapılacaksa dev sunucunun altından (`/public` ya da Vite `public/`) servis et; `file://` bölmede çalışmıyor.

## İlgili
- [[2026-10-16-ana-renk-ikon-mavisi-pembe-vurgu-takasi]]
- [[2026-10-15-tema-degisikligini-once-goster]]
