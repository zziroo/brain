---
type: lesson
project: tussle
date: 2026-10-08
status: active
tags: [tussle, ui, ajanlar, telif, font, ikon, css]
source: oturum 2026-10-08 gece (mobil-playus UI yenileme)
---

# Dersler: UI yenileme turu (referans kopyası riski, ikon turları, Türkçe başlık, önbellek anahtarı)

- **Referans uygulamayı "fikir" diye verince ajan birebir kopyalıyor.** İlk tur Playus'un mor zemin + beyaz kart + sarı düğme + laurel + posterini aynen üretti; Yusuf telif kaygısıyla durdurdu. Bundan sonra görsel brief'e "şu öğeler yasak, kimlik farkı şurada" satırı baştan yazılacak; `docs/VISUAL.md` §6 yasak listesi var.
- **Özgün yön seçtirmenin ucuz yolu: 3 yönü CSS override + sahte veriyle mockup'lamak** (ajan kendi Vite + headless Chrome ile tam sayfa görüntü aldı), seçileni sonra gerçek koda uygulamak. Token sistemi olduğu için uygulama 1 ajan turu sürdü.
- **İkon seçimi çok tur ister:** Yusuf 7 turda ~25 aday gördü. İşe yarayan: her turda 3–4 aday, mutlaka **48 px** hâliyle beraber, ajan küçük boyutu kendisi açıp "en iyi okunan" demeli; seçilen adayın varyantlarını türetmek (N → N2 → N2d → N2d2) sıfırdan yeni fikirden daha hızlı sonuç verdi.
- **"Türkçe karakter bozuk" şikâyetinin sebebi font değil satır yüksekliğiydi:** büyük harf poster başlıkta `line-height: 1` + 4 px gölge İ/Ğ/Ü noktalarını üst satıra yapıştırıyor. Başlıklarda 1.1+ satır yüksekliği; Türkçe büyük harf için `lang="tr"` şart.
- **Canvas oyun fontu yüklenmeden çiziyor:** ilk karede fallback font kalıyor; `document.fonts.load` ile kısa (≤1,5 s) bekleme, `runId`/`alive` guard ile geç başlamayı engelle.
- **`GET me` gibi okuma uçları yan etki üretmesin:** oda özeti `current()` çağırınca günün oyun satırı ana sayfa yüklenince oluşuyor, host sabah ayar değiştiremiyordu. Özet salt okur, satırı yalnız oyun açılınca oluştur.
- **Önbellek anahtarına "sahiplik" de gir:** sezon sıralaması önbelleği (sayı, max id, üyeler) hesap birleştirmede bayat kalıyordu; `SUM(user_id)` eklendi. Satır sahipliğini değiştiren her işlem (merge) anahtara yansımalı.
- **`prefers-reduced-motion` kuralları özgüllük kaybediyor:** `:is(.a,.b) *` (0,1,0) `.a .child` (0,2,0) karşısında yenilir ve global 1 ms kuralı sonsuz animasyonu titremeye çevirir. Hareket kapatan kurallarda `!important` ya da eşit özgüllük.
- **Yorumlar kodla çelişince reviewer yakalar:** "ilk kullanımda yazılır" yorumu ile davranış ayrışmıştı; reviewer'a "yorum–kod tutarlılığı" sormak faydalı.
- **Paralel ajanlar aynı port/panel üzerinde çakışıyor:** 5173 başka sohbetin Vite'ı olduğu için ajanlar kendi portlarını (5299, 5311) ve headless Chrome'u kullandı; tarayıcı paneli gizliyken oyun döngüsü durduğu için sonuç kartını koordinatör kendi oynayarak doğruladı. Brief'e "kendi sekmen, gerekirse kendi portun" satırı yaz.
- **Eski üretici betikleri sil:** `scripts/gen-icons.mjs` yeni ikonları ezecek durumdaydı; kaynak değişince üreten araç da güncellenmeli ya da kaldırılmalı.
- **Kademeli ajan zinciri işledi:** görsel temel (opus high) ∥ sunucu verisi (opus medium) ∥ oyun bitişi (opus medium) → ekranlar (opus high) → inceleme (opus) → düzeltmeler → yön mockup'ları → gerçek uygulama → marka → inceleme (sonnet). Toplam ~3,3 M ajan token'ı.

## İlgili
- [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]], [[2026-10-08-font-nunito-tek-aile]], [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]], [[2026-10-08-oyun-bitis-kuyrugu-runner]]
- Önceki tur: [[2026-10-08-cila-turu-dersleri]]
