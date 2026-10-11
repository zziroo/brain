---
type: decision
project: tussle
date: 2026-10-10
status: active
tags: [tussle, canli-kapisma, m1, karar]
source: oturum 2026-10-10 (mobil-playus: M1 canlı kapışma)
---

# Karar: Canlı kapışma, sohbette Clash Royale "dostluk savaşı" gibi süresiz canlı lobi kartıdır

## Bağlam
M1 (canlı kapışma) ilk sürümü 30/60/120 sn katılım penceresiyle yapıldı. Yusuf: "Clash Royale'deki klana savaş isteği gibi olsun; süre sevmeye gerek yok, 10 dk'ya da gerek yok; açtım, iptal etmediğim sürece orada; uygulamada gezerken otomatik iptal durumlarını halletmek lazım."

## Karar
- Kartı sohbete "Kapışma iste" butonu açar (mesaj kutusunun üstünde, tam genişlik; açık kartın varsa "Kartın açık · n/N" olur ve karta götürür). Oyunu atan seçer ya da Rastgele (başlangıçta sunucuda çekilir), 2/3/4 kişi.
- **Süre yok.** Dolunca ya da atan ≥2 kişiyle "Başlat" deyince başlar; tek kişiyle asla başlamaz; atan istediği an iptal eder.
- **Varlık (presence) tabanlı iptal:** "odada" = kullanıcının herhangi bir soketi o odaya abone (oda ekranı ya da kendi kapışma oyunu). Atan 20 sn yoksa kart iptal; katılan 20 sn yoksa yeri boşalır. Günlük oyuna, ana sayfaya, ayarlara geçmek ayrılmak sayılır (Yusuf: "günlük oyuna girince kart kapansa da olur", kapsamı Claude belirledi); çıkarken "Kapışma kartın 20 sn içinde kapanacak" uyarısı çıkar. Sunucu yeniden başlarsa +30 sn ek tolerans.
- **Görünmez güvenlik ağları:** sohbetten (200 mesaj sınırı) silinen kart 5 sn sonra iptal; 60 dk'dan eski açık kart iptal. UI'da süre gösterilmez.
- Aynı tohum, sunucu zamanlı ortak başlangıç, her oyuncunun girdi günlüğü sunucuda tekrar oynatılır; sonuç aynı karta yazılır. **Sezona, günlük tabloya ve deneme hakkına sayılmaz** (Yusuf: "sayılmasın").
- Kopan oynamaya devam eder (outbox); son teslimde günlüğü yoksa son canlı skoruyla "bağlantı koptu" etiketiyle sıralanır.
- **Hayalet = yalnız HUD altındaki yarış şeridi**, oyun alanına hiçbir şey çizilmez (Yusuf dikkat dağıtmasından çekindi): avatar noktaları canlı skora göre, geçince "X'i geçtin!" balonu, seni geçenin noktası parlar, bitiren bayrak. 10 Hz röle.
- **Ek (yayın `398b84d`):** Yusuf: "hareketli olursa odak bozulur; günlük oyunda da üstte bir şerit olsun, oynayanların skorları sabit, yalnız biz hareketli olalım" ve "geçtin yazmasına gerek yok, ufak bir işaret yeter". Günlük oyunda (sayılan deneme + Deneme turu) sabit işaretli şerit; geçme anı her iki şeritte yazısız ✓. Reddedilen: başkalarının girdi kayıtlarını tekrar oynatan hareketli hayalet (dikkat dağıtır, ek işlem). Girdi kayıtları sunucuda kalır (doğrulama ve rescore için şart).
- **Ek (2026-10-11, yayın `bf3c248`):** Yusuf Playus ekranlarını yerleşim örneği olarak gösterdi. Şerit kaldırılmadı (Claude önce avatar+puan dizisi sandı; Yusuf düzeltti: "pist şeridi kalsın, en üstte dursun"). Sıra: şerit → durum etiketi → ortalı kısa süre çubuğu (saniyesiz) → skor. Şerit görünümü: önce ince çizgiye çevrildi (süre çubuğuyla karışmasın diye), yeni düzende karışma kalmayınca dolu sticker kutuya geri döndü (Claude önerisi, görsel dil). Reddedilen: Playus tarzı avatar+puan dizisi; küçük ekranda etiket ve çubuğun yan yana olduğu kompakt mod (tutarsız göründü).
- Ekran dışındaki açık kartlar için sağ altta ⚔ sayılı rozet; dokununca en yeni karta kayar, tekrar dokununca sıradakine.

## Neden
Clash Royale isteği gibi "canlı" hissi; süre baskısı yok. Sahibi ortada olmayan kart oluşmasın diye varlık tabanlı. Yarış şeridi her oyunda bedava çalışır, oyun başına iş istemez.

## Reddedilen alternatifler
- Seçilebilir katılım penceresi (30/60/120 sn): Yusuf istemedi, ilk sürümde vardı, kaldırıldı.
- 10 dk otomatik kapanma (Claude önerisi): Yusuf "gerek yok"; yalnız görünmez 60 dk güvenlik ağı kaldı.
- Günlük oyun/ayarlar ekranını da "odada" saymak (Claude önerisi): Yusuf kapanmasını da kabul etti; mevcut kural daha tutarlı, uyarı eklendi.
- Oyun içi hayalet (rakibin karakteri yarı saydam sahnede): dikkat dağıtır ve oyun başına iş.
- Sonucu sezona ya da ayrı canlı tabloya saymak: Yusuf "sayılmasın".
- Bayrak düğmesi mesaj kutusu satırında: yazma alanını daraltıyordu.

## Sonuçlar / riskler
- Değiştirilmiş istemci sahte canlı skor gönderip günlük göndermezse o kartta skoruyla sıralanır (kabul edilen risk, etki tek kart).
- Maç başladığında oda ekranında olmayan "Oyna"ya basmalı; bildirim yok. Oyun ortasında sayfa yenilenirse son canlı skorla sıralanır.

## İlgili
- [[2026-10-10-tussle-canli-kapisma-m1]]
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
- [[2026-10-09-oda-ekrani-sohbet-merkezli]]
