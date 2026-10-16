---
type: lesson
project: tussle
date: 2026-10-16
status: active
tags: [tussle, google-play, tarayici-otomasyon, ders]
source: Claude Code oturumu 2026-10-16 "tussle: admin paneli" (Play Console veri güvenliği formu, Claude in Chrome)
---

# Ders: Play Console veri güvenliği formunda tür diyalogları yığılıyor ve taslak kaydedilmezse her şey siliniyor; her türü aç → "Toplandı" → bekle → kalan alanlar → görünür Kaydet sırasıyla doldur

- Her veri türü ayrı bir diyalog; "Toplandı" işaretlenmeden diğer alanlar DOM'da yok (2 sn bekle). JS ile `Kaydet`'e basmak diyaloğu her zaman kapatmıyor; kapanmayan diyaloglar gizli kalıp üst üste biniyor, sonraki JS seçicileri yanlış diyaloğa yazıyor (Teşhisler'e yanlışlıkla "Hesap yönetimi" eklendi, boş diyaloglar kaydedilince türler sıfırlandı).
- Sayfa yenilenince bütün form gitti: adım geçişleri taslağı kaydetmiyor; her adımdan sonra **"Taslağı kaydet"**.
- İşleyen yol: bölümleri "Göster" ile aç, türün ok düğmesini `aria-label "<tür> sorularını aç"` ile tıkla, önce yalnız "Toplandı", 2 sn bekle, kalan kutular, durumu oku, **görünür Kaydet'i gerçek tıklamayla** bas, diyalog kapandı mı kontrol et. Kapanmayan boş diyaloglar X ile (kaydetmeden) kapatılır.
- Genel: Play Console'da URL tahmin etme (yanlış yol ana sayfaya atıyor); kontrol panelindeki görev bağlantılarını kullan. Sözleşme kutuları (program politikaları, Play imzalama, ihracat, IARC, dahili paylaşım şartları) Yusuf'a bırakıldı.

İlgili: [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]]
