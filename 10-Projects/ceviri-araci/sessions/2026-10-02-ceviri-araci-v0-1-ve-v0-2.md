---
type: session
project: ceviri-araci
date: 2026-10-02
status: done
tags: [ceviri-araci, oturum]
source: string-tool oturumu 2026-10-02/03 ("çevirmen arkadaş için masaüstü çeviri aracı")
---

# Oturum: Çeviri Aracı sıfırdan v0.2.0'a, sunucuda yayında

## Ne yapıldı
- Electron + React + TS proje kuruldu; çekirdek (format işleyicileri, Excel, QA, prefill) ve arayüz iki paralel ajanla yazıldı. Ortak sözleşme (`src/core/types.ts` + `index.ts`) önceden koordinatörce yazıldı.
- Yusuf'un örnekleriyle uçtan uca deneme: 155 metin dolduruldu, üretilen TR dosyaları elle yapılanlarla birebir aynı (elle yapılan `LocalTutorial-tr.json` bozuk JSON'du, araç onardı).
- Üç inceleme turu + skeptik. Bulunanlar: Excel sıralanınca yanlış satır, aynı çıkış yolu, aynı adlı dosyalar, UTF-8 olmayan dosyalar, eski çevirinin değişmiş kaynağa sessizce gitmesi, glob regex donması, Ren'Py uç durumları. Yüksek bulgu kalmadan commit edildi.
- v0.1.0, sonra v0.2.0 (Ren'Py, dosya renkleri, kelime sütunları) https://diskort.ziroo.net/tools/ceviri-araci adresinde yayınlandı. SSH ilk denemede otomatik mod denetçisince engellendi, Yusuf sohbette izin verdi.
- Dağıtım betiği paylaşılan `tools/` klasöründe fazla geniş `chown/chmod` yapıyordu, daraltıldı.

## Alınan kararlar
- [[2026-10-02-span-tabanli-yazma]]
- [[2026-10-02-ortaklastirma-yok-dil-kodu-kullanicida]]
- [[2026-10-02-yayin-diskort-tools-altinda]]
- [[2026-10-02-renpy-tl-dosyalari]]
- [[2026-10-02-kelime-sayimi]] (Yusuf onaylamadı)

## Öğrenilenler
- [[excel-satir-eslestirme-gizli-id-tek-basina-yetmez]]
- [[paylasilan-web-kokunde-yalniz-kendi-yollarina-dokun]]
- [[ajan-arac-tuzaklari-ters-egik-cizgi]]
- SSH engeli yine yaşandı: [[otomatik-mod-ssh-engeli-yeni-sohbette]]

## Açık kalanlar
- Arkadaşın gerçek dosyalarıyla denemesi; Ren'Py çıktısının oyunda denenmesi.
- Kelime sayımı yöntemi için Yusuf'un onayı.
- Bilinen küçük eksikler: undo yok; Excel'de boşaltılan hücre çeviriyi silmez; başka araçla yapılmış Excel'de "Translation status" başlığı çeviri sütunu sanılabilir; `.exe` imzasız.
