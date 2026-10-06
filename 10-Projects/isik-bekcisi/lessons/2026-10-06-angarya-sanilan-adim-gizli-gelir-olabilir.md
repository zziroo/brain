---
type: lesson
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, denge, bot, oyun-tasarimi]
source: oturum 2026-10-06 (incremantal-game, kamera + fener nöbeti), Fener Nöbeti ajanının raporu
---

# Angarya sanılan bir adımı kaldırmadan önce botla gelirdeki payını ölç

## Ne oldu
Fenerin "başında ışın tut" adımı angarya diye nöbete çevrilirken ajan, fenerin ruh çağırmasını (SURGE) da yalnız nöbete bağladı. Botun oyunu ~4 sefer uzadı: 1. fener 5 yerine 7. seferde geldi ve bot bölgeye güçsüz girdi. Fener başında çağrılan ruhları toplamak her bölgede gelirin görünmez bir parçasıymış; oyuncu bunu "fener dolduruyorum" sanıyordu. Çağrı eski hâline (`SURGE.early: true`) döndürülünce uzunluk ±1 sefere geldi ([[2026-10-06-fener-nobeti-son-beste-bir-kusatma]]).

## Ders
- Oyuncunun sıkıcı bulduğu adım, onun fark etmediği bir ödeme kanalı olabilir. Kaldırmadan ya da değiştirmeden önce aynı tohumlarla botu koştur ve fenerlerin düştüğü seferlere bak; toplam uzunluk değil **şekil** (hangi fener kaç seferde) söyler.
- Bir mekaniğin iki yüzü varsa (burada: zaman alan tutma + gelir getiren çağrı) yalnız sıkıcı yüzünü değiştir, diğerini bayrakla ayrı tut.

İlgili: [[2026-10-02-bekleme-kapisi-yerine-avdan-dolan-kapi]], [[2026-10-05-yakalama-basina-odul-sinerjiyi-carpana-cevirir]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
