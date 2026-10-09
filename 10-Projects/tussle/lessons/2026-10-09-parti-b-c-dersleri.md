---
type: lesson
project: tussle
date: 2026-10-09
status: active
tags: [tussle, orkestrasyon, hile, performans, test, yayin]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri)
---

# Dersler: Parti B + C, deneme ayırma ve skor ölçüleri turu

- **Sözleşme önerisi hile kapısı açabilir.** "Gizli çekilişi tik'le karıştır" önerisi, oyuncu anı seçebildiği için manipülasyona dönüştü (Kart Çevir 2×, Balon 2×). Her parti incelemesinde "oyuncu zamanlamayı seçerek sonucu değiştirebilir mi?" sorusu soruldu; bulduran bu oldu. [[2026-10-09-gizli-cekilisler-yalniz-tohumdan]]
- **esbuild sunucu paketinde `if (x > SABIT) x = SABIT` double'ı kutuluyor** (modül sabitleri top-level var oluyor). `Math.min/Math.max` ile 27 B/adım → 0,5 B/adım. vitest ve istemci paketi bunu göstermiyor; ölçüm esbuild paketinde yapılmalı. Sürükleme oyunları için tahsis testine `moves: true` seçeneği eklendi.
- **GC tahsis testi sınırda kırılgan:** çok kısa boş koşular (binlerce sim kurulumu) ve satır üretimindeki Rng kutulama testi eşikte bırakıyor. Olay başına yardımcıyı adım içine koymak yerine kanıtla (örnekleyici heap profili) karar ver.
- **Ortak çalışma kopyasında paralel oyun ajanları birbirinin yarım işiyle vite'ı kırıyor;** ajanlar tarayıcı testini kendi geçici kopyalarından yaptı. Gizli tarayıcı panelinde rAF neredeyse durduğu için gizli Chrome (CDP) ile oynadılar. İşe yaradı; brief'e baştan yaz.
- **Durdurulan ajanın yarım işi:** çalışma kopyasını silmek (checkout + rm) izin sınıflandırıcısına takıldı; `git stash -u` geri alınabilir yol olarak çalıştı, sonra stash geri açılıp yeni ajan devam etti.
- **Skor yönü değişince testler rastgele kırıldı:** günün oyunu tohumdan rastgele seçildiği için Refleks (küçük iyi) çıkınca "yüksek kazanır" varsayan testler kırıldı. Testler oyun yönünden bağımsız sabitlendi.
- **Veri yeniden yazan migrasyonu canlı kopyada prova et:** `VACUUM INTO` ile kopya, yerelde Db kurucusu ile migrasyon, sonuç tablosu karşılaştırması; sonra kopyaları sil, yayından hemen önce yedek al. Migrasyon sonucu tek satır log basmalı.
- **İnceleme kapısının değeri:** gizli çekiliş hileleri (2 yüksek), Hızlı Fren'de tam isabetin yarı tohumda imkânsız olması, yayın günü skor karışması (Refleks tablosu ters dönecekti), gün tohumunun istemciye sızması bu turda incelemeyle bulundu.
- **Hata ayıklama adresi:** `/?debug=1#/oyun/<id>` (bayrak # işaretinden önce). Sözleşme ve üreteç düzeltildi.
- **Telefon geri bildirimi tasarımı en çok değiştiren girdi oldu** (Sek Sek görüş mesafesi, Fren hız algısı, Şeker Yağmuru başparmak konumu, başlangıç akışı). Botlar adaleti ölçüyor, his ölçmüyor.
- Bütçe: bu oturum ~35 ajan; haftalık limit %75 → ~%83.
