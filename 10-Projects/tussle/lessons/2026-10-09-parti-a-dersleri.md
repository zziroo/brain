---
type: lesson
project: tussle
date: 2026-10-09
status: active
tags: [tussle, orkestrasyon, worktree, test, denge]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A)
---

# Dersler: paralel oyun partisi, worktree tuzakları, bot dengesi ve inceleme kapısının değeri

- **Worktree tabanı eskiyor.** Ajan worktree'leri, koordinatörün iskelet commit'inden **önceki** HEAD'den açıldı; ajanlar `--ff-only main` ile ya da diff uygulayarak kendileri yetişmek zorunda kaldı; biri izin sınıflandırıcısına takılıp diff uyguladı, dalı bütünüyle birleştirilemez oldu (dosyalar elle kopyalandı). Kural: iskeleti commit et, **sonra** worktree ajanlarını başlat; ajana "tabanın `<sha>` olmalı" yaz.
- **`git add -A` worktree klasörlerini gömülü repo olarak ekledi** (`.claude/worktrees/`). `.gitignore`'a eklendi; commit amend ile düzeltildi. Worktree kullanılan projede bunu önceden ekle.
- **Ortak dosyalara paralel yazımı üreteçle önle:** `new-game` registry/tr/en/kapak dosyalarına yazdığı için koordinatör 6 iskeleti tek başına üretip commit etti; ajanlar yalnız kendi klasörleri + marker bloklarıyla sınırlı kaldı. İşe yaradı.
- **GC "adım başına sıfır tahsis" testi sezgisel ve kırılgandı** (4 koşuda 1 düştü). Çözüm: profil öncesi **minor** `gc({type:'minor'})`; full GC genç nesli küçültüp daha çok scavenge ürettiği için durumu kötüleştirdi.
- **Bot dengesi şart:** Kutu'da otomatik "güvenli nokta" Dur'u anlamsız, körlemesine tıklamayı 2,5× üstün yapıyordu; ölçüm olmadan görünmezdi. Her oyun partisinde "spam bot vs makul bot" tablosu zorunlu (artık testte).
- **İnceleme kapısı platform açığı buldu:** aynı tohumlu 3 deneme → ezber (Kutu/Terazi/Işık/Matematik). Oyun bazlı değil platform bazlı düzeltildi ([[2026-10-09-deneme-basina-tohum]]).
- **Paralel ajanlar aynı tarayıcı panelini paylaşıyor:** bir ajan başka ajanın sekmesine JS gönderdi (tema/rota değişti). Ajanlara "yalnız kendi sekmeni, tabId ile" de; `.claude/launch.json` sabit portları da çakışıyor, ajanlar kendi vite'larını açtı.
- **Ajan raporu ≠ doğrulama:** sezon grafiği ilk ajanda `localStorage` tahminiyle "çalışıyor"du; inceleme sunucu uç noktası gerektiğini gösterdi. Rapordaki "verified" iddiaları ikinci gözle oku.
- **Ses kaydırıcısı hiç çalışmıyormuş:** `setVolume` hiçbir yerden çağrılmıyordu; kaldırınca kimse fark etmedi. Ölü özellikleri kaldırırken önce "gerçekten bağlı mı" bak.
- Bütçe: bu tur ~14 ajan, haftalık limit %70 → ~%80. Bir oyun partisi (3 ajan + inceleme + düzeltme) ≈ haftalık %5–7.
