---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, skor, tablo, oyun-sozlesmesi]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri)
---

# Karar: Becerisi tek bir ölçü olan oyunda skor o ölçüdür; sezon puanı sıralamaya dayalı kalır

## Bağlam
Yusuf: "kaç saniye yaptı, kaç km gitti direkt puan gibi sayılabilir mi?"; seçimleri bize bıraktı.

## Karar
- `GameMeta.score {unit, decimals, better}`. Doğal ölçü: Refleks ortalama ms (küçük iyi), Kule kat, Işık Sırası tur, Farklı Olan bulunan, Şeker Yağmuru şeker, Denge saniye (ondalıklı), Karşıya Geç adım, Top Nerede top. Kombo/bonusun ayrı beceri olduğu oyunlar puan kalır, sonuç kartında ikincil ölçü ("1240 puan · 87 karo"). Tablo: docs/GAMES-ROADMAP.md "Skor = doğal ölçü".
- Küçük-iyi sıralama her yerde (tablo, en iyi deneme, rekor, akış, geçtiği oyuncular); yarım denemeler her zaman en altta.
- Migrasyon 10: altı oyunun eski kayıtları günlükten yeni simle yeniden oynatılıp yeni ölçüye çevrildi (eski simlerle adım adım 3,26 milyon adımda sıfır fark; canlı kopyada prova).
- Sezon puanı 10/7/5/3 kalır: farklı oyunların ölçüleri toplanamaz.

## Neden
"47 sn dayandım" puandan anlaşılır; aynı gün herkes aynı oyunu oynadığı için ölçüyle sıralamak yeterli.

## Reddedilen alternatifler
- Her oyunda ham ölçü: kombo/tam isabet ödülü kaybolur, tavana dayanan oyunlarda (Zıpla 60 sn, Bıçak 40) iyi oyuncular eşitlenir.
- Hızlı Fren cm, küçük-iyi: sonsuz moda geçince tur sayısı + hassasiyet puanı daha anlamlı.

## İlgili
- [[2026-10-09-puanlama-sabit-gunun-kurallari-donar]]
