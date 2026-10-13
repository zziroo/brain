---
type: decision
project: tussle
date: 2026-10-12
status: active
tags: [tussle, oyun-tasarimi, denge]
source: oturum 2026-10-12 (mobil-playus: denge ve sade tema turu)
---

# Karar: Sabit toplam süreli yedi oyun tur penceresine geçti (sonsuz-hızlanan)

## Bağlam
Yusuf: "oyunlar hızlı hissettiriyor" = sabit 30–45 sn süre baskısı acele hissi veriyor. [[2026-10-09-sure-siniri-yerine-sonsuz-hizlanan]] kararının devamı.

## Karar
Hızlı Matematik, Terazi, Sayı Zinciri, Farklı Olan, Renk Eşleşti, Şeker Avı, Kart Çevir: toplam süre yok. Her soru/tahta/turun kendi penceresi var; ilk 2–3 tur cömert, sonra hiperbolik bir eğriyle insan tabanına iner (Matematik 8→2,5 sn, Renk 3→1 sn, Terazi 12→3,5 sn, Kart Çevir çift başına 4→2,33 sn). Yanlış ya da dolan pencere bitirir; teknik tavan 180 sn. Skor doğal sayı (doğru / sayı / fark / şeker / çift); kombo ve hız bonusu kalktı çünkü pencere hızı zaten zorluyor. HUD'da tur penceresi çubuğu (`hud.energy` bayrağı, nabız yok). Kutu Seç, Çark, Gizli Geçit "dur ya da devam" turları olduğu için sabit kaldı; Çift Dokun zaten hızlanıyor.

## Neden
Oyuncu kendi temposunda başlasın, zorluk kademeli gelsin; "bir tur daha" hissi ve doğal ölçü.

## Reddedilen alternatifler
- Süreyi uzatmak: tavanda eşitlenme sürer, acele hissi kalır.
- Önce 4 oyunla deneme: Yusuf yedisini tek seferde istedi.

## Sonuçlar / riskler
Şüpheli sertlikler telefonda doğrulanmadı: Renk 1 sn taban, Şeker Avı tek kaçırma biter. Deploy günü eski/yeni ölçü aynı gün tablosunda karışabilir; 2026-10-12 deploy'u canlı DB kontrolüyle (etkilenen odalarda sabah denemesi yok) yapıldı.

İlgili: [[2026-10-12-can-sistemi-kaldirildi-ilk-hata-bitirir]], [[2026-10-09-skor-dogal-olcu]].

**Ek (2026-10-13):** Kutu Seç ve Gizli Geçit silindi; Çark artık taban + Dur bonusu modelinde. Bkz. [[2026-10-13-sure-modeli-taban-50-60-bonus-sert-tavan]], [[2026-10-13-duz-sans-oyunlari-ve-oruntu-kaldirildi]].
