---
type: decision
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, kontroller, masaustu, girdi]
source: Claude Code oturumu 72fd0708 (incremantal-game); Yusuf ve arkadaşlarının ikinci oynama geri bildirimi
---

# Oyun yalnız masaüstü için; hareket WASD, fare yalnız ışığı yönetir

## Bağlam
Yusuf arkadaşlarıyla canlı sürümü oynadı: "fareyle baktığım yöne gitmesi iyi gelmedi, normal WASD gezelim; fare ışık yoğunlaştırma için kalsın" ve "mobil için düşünmene gerek yok, istersen mobilde açılmasın; bunu PC için masaüstü oyunu olarak geliştireceğiz."

## Karar
- **Seferde:** yalnız WASD / ok tuşları yürütür. Fener her zaman imlece bakar; sol tuş (ya da F) basılı = odak ışını; sağ tık / Shift / Q = atılım (basılı tuşların yönüne, yoksa imlece); Boşluk = parlama.
- **Kampta:** WASD yürütür, E / Boşluk / Enter erişimdekini kullanır, **F konuşur** (bkz. [[2026-10-02-hikaye-kampi-f-ile-konusma-ve-yumusak-gecisler]]). İstasyona tıklamak yürüyüp kullanır, sakine tıklamak yürüyüp konuşur. İmleç asla takip edilmez; boş zemine ve kapıya tıklamak hiçbir şey yapmaz. Sefere **yalnız tuşlarla kapıdan yürüyerek** çıkılır.
- **Dokunmatik desteği tamamen kaldırıldı** (parmakla yönlendirme, ekran düğmeleri, dokunmatik ipuçları, mobil CSS). Hiç ince işaretçisi olmayan cihazda (`any-pointer: fine` yanlış) başlık ekranı "klavye ve fareyle oynanır" notu gösterir, oyna düğmesi yoktur. Kalem ya da dokunmatik ekranlı bir masaüstünde oyun yine çalışır.
- Beceri düğmeleri silinmedi, tıklanamayan göstergeye çevrildi: parlama ve atılımın bekleme süresi yalnız orada görünüyor.

## Neden
- İmleç takibi hem his olarak kötüydü hem de en tehlikeli hata sınıfını (imleç kuzeydeyken bekçinin kendiliğinden kapıdan çıkması) doğuruyordu. WASD ile `Camp.armed`, `wayOut`, zemin/kapı tıklamaları ve pointer modu tamamen silinebildi.
- Tek platform, test yüzeyini yarıya indirdi: artık her sahne tek girdi modeliyle doğrulanıyor.

## Reddedilen alternatifler
- Dokunmatiği "bakımsız ama açık" bırakmak: ölü kod ve dokunmatikte yarım işleyen bir oyun bırakırdı.
- Kampta imleç takibini tutup yalnız seferde WASD: iki yerde iki ayrı hareket modeli öğrenmeyi gerektirirdi.
- Kampta zemine tıklayınca yürüme: fareyle hareket etmemek kararıyla çelişiyordu.

## Sonuçlar
- Kontroller dalının incelemesi: kritik/yüksek yok, 2 orta + 4 düşük. Ortaların biri (`main`'de de olan): sefer bitince W basılı tutulup özet geçilince bekçi kamptan dümdüz kapıdan çıkıyordu. Çözüm: kamp açılırken basılı tuşlar unutulur (`releaseKeys()`), bilinmeyen bir tuşun otomatik tekrarı basış sayılmaz. `resetInput()`'a konmadı: kapıdan çıkarken basılı W sefere taşınmalı.
- Tarayıcının sağ tık menüsü bütün sayfada engellendi (menü açıkken bırakılan tuş görünmüyordu).
- Commit'ler `f9e7365`, `759903f`; depo `CLAUDE.md`'si kuralları anlatıyor.

## İlgili
[[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]], [[2026-10-02-duran-imlec-geri-alinamayan-esigi-gecirmemeli]]
