---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, denge, incremental, simulasyon]
source: oturum 2026-10-02 (incremantal-game), tools/sim.js çıktıları
---

# Birbirini çarpan geliştirmeler bölge başına geliri ×50-200 büyütür; maliyetleri tahminle değil botla ayarla

## Ne oldu
İlk denge tahminiyle bot oyunu 16 koşuda, 18 dakikada bitirdi. Sebepler:
- **Çarpımsal yığılma:** bölge değeri ×6, değer çarpanı ×1,76, daha çok ruh (çap, hız, yağ, yoğunluk), kombo ve kritik birlikte bölge başına geliri ×50-200 büyüttü; maliyetler ise kademe başına ×9 artıyordu.
- **Alan etkili aktif yetenek:** Parlama, ışık çapının 2,2 katında "8 saniyelik" hasar veriyordu; koridorun tamamını temizliyordu.
- **Tek hedefli yardımcılar:** 5 ateş böceği, her biri gücün %135'iyle, toplam ×6,75 ek hasar ediyordu.
- **Kapının koşuyu bitirmemesi:** fener yanınca yağ doluyordu, bot aynı koşuda sonraki bölgeye geçip çok daha değerli ruhları topluyordu.

## Ders
- Koşu-tabanlı incremental'da geliri el hesabıyla kestirme. Oyunu baştan sona oynayan basit bir bot yaz (en yakın hedefe git, en ucuzu satın al) ve "kaç koşu / kaç dakikada hangi kapı" çıktısına göre ayarla. Tablo üzerinden geçici değer deneyebilmek (kod değiştirmeden) yinelemeyi dakikalara indirir.
- Aynı istatistiği büyüten çarpanları üst üste koyma; bir kısmını toplamsal yap (değer çarpanı +%10/seviye oldu).
- Alan etkili ve "ek el" türü geliştirmelerin toplam hasara katkısını ayrıca hesapla: (alan oranı × hasar / bekleme) ve (adet × güç yüzdesi).
- "Daha derin her zaman daha kârlı" ise oyuncu kapıları aceleyle geçer; ilerleme hızını asıl belirleyen kapı (fener enerjisi) olur, maliyet tablosu değil. İkisini birlikte ayarla.
- Bot verimli alışveriş yapar ve hata yapmaz; gerçek oyuncu süresi botun ~1,5-2 katı varsayıldı (doğrulanmadı).

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
