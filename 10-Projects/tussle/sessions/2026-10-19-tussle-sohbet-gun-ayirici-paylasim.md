---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, sohbet, oda-kilidi, paylasim, magaza, yayin]
source: oturum "tussle: sohbet gün ayırıcı, ↓ düğmesi, paylaşım" (2026-10-19 öğleden sonra)
---

# Oturum: sohbet gün ayırıcı, ↓ düğmesi, kilitli kapak, paylaşım (19 Eki)

Yusuf'un telefon geri bildiriminden dört iş; commit `9b70049`, sürüm commit'i `6b3b849`.

- **Gün ayırıcı:** sohbette yeni sezon günü başlayınca `Gün N · <oyun>` çizgisi; eski günün satırları üstünde kalır. Ayrı "yeni gün" bildirim satırı yok, çizginin kendisi söyler.
  - **Neden sunucuda gün:** saatten hesap (`dayIndexAt`) kurucu "sonraki gün"e erken geçince (`day_offset`) yanlış olur. Göç 23 `messages.day` (boş bırakılabilir ADD COLUMN), sorgu `days`/`seasons` ile birleşir. Yayından önceki mesajlarda gün yok (geri doldurma yapılmadı).
- **↓ düğmesi:** sağ altta tek yuvarlak düğme ("N yeni mesaj" balonunun yerine), son girişten beri gelen mesaj rozeti (localStorage, hesap + oda başına). Oda yine üstten açılır.
  - **Reddedilen:** odayı en alttan açmak (bugünün kartı/sıralaması gözden çıkar), duruma göre üstten/alttan açmak (her girişte farklı yer, kafa karıştırır). Yusuf ikisine de "okey".
- **Kilitli oda kapağı:** kilitliyken hiçbir oyun gösterilmez, düz kilit kapağı. Eskiden seed 0 ile seçilen oyun gösteriliyordu, arkadaş girince gerçek oyun farklı çıkıyordu.
- **Paylaşım:** Android WebView'da `navigator.share` yok, bu yüzden hep "kopyalandı" çıkıyordu. `@capacitor/share` 8.0.3 (sabit) eklendi; eski kabuklar OTA ile yeni paketi alınca `isPluginAvailable('Share')` false, eskisi gibi kopyalar.
- **Yayın:** sunucu + OTA 0.20261019.1357, DB 23. Android 1.9 (vc 13) iç + kapalı test; iOS 1.3 (build 9) yüklendi, `testflight.mjs 9`.
- **TestFlight notu:** "↓" gibi semboller whatsNew'da reddedilebilir diye kelimeyle yazıldı ([[2026-10-18-magaza-derlemesi-ortam-tuzaklari-java-home-zsh]]).
- **Telefonda denenmedi:** paylaşım ekranı (1.9 / build 9 gerekir), gün ayırıcı (ilk gün değişiminden sonra görünür), ↓ rozeti, koyu tema yalnız hesaplanan renklerle kontrol edildi.
