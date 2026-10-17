---
type: lesson
project: ziroo-edge
date: 2026-10-17
tags: [animasyon, mobil, kaydirma]
source: oturum "ziroo-edge: ana sayfa kapı ekranı turu" (kullanıcının Android ekran kaydı)
---

# Ders: Kaydırma eşiğinin geri dönüş payı küçükse telefonda karakter eşikte gidip gelir

## Ne oldu
- Telefonda kapı ekranında Ziroo "yanıp sönüyordu".
- İlk tahmin yanlıştı: ortadaki kapı seçiminin eşik payı olmaması sanıldı.
- Kullanıcının ekran kaydı gerçek nedeni gösterdi:
  - Kapı başlığına yukarı kaydırınca kaydırma, Ziroo'nun hikâyeye dönüş eşiğinin çevresinde kalıyordu.
  - Geri dönüş payı ekranın %5'iydi. Ziroo bu yüzden bir harflerin arkasına uçuyor, bir geri düşüyordu.
- Hızlı kaydırmada da kapı hedefi her karede değişiyor, Ziroo ekranı boydan boya zıplıyordu.

## Nasıl uygulanır
- Kaydırmaya bağlı durum geçişlerinde geri dönüş payını parmakla yapılan küçük gidip gelmelerden geniş tut. Telefonda ekranın %5'i dar kalır.
- Dokunmatikte hedef değişimini kaydırma durana kadar ertele.
- Karakter ekran dışındaysa yay çizdirme; yeni yere ekranın kenarından girsin.
- Telefon hatası önizlemede üretilemiyorsa tahminle düzeltmeden önce kullanıcıdan ekran kaydı iste. Kaydı `ffmpeg -vf "fps=…,tile=…"` ile tek bir kare tablosuna çevirip incele.

## İlgili
- [[gizli-onizleme-panelinde-animasyon-durur-ve-gorunum-0x0]]
- [[2026-10-17-ziroo-net-kapi-ekrani-turu]]
