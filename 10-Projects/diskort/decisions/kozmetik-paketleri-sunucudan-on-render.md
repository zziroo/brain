---
type: decision
project: diskort
date: 2026-09-30
status: superseded
tags: [diskort, kozmetik, mimari, sunucu, video]
source: 54dc3a33-8a43-4d66-8774-07b1dfa4d58f.jsonl
---

> Geçersiz (2026-10-23): kozmetikler tamamen kaldırıldı, bkz. [[2026-10-23-kozmetikler-tamamen-kaldirildi]].

# Karar: Kozmetik setleri uygulamada çizilmez; sunucudan gelen ön-render (6 sn, 30 fps, kesintisiz döngü) paketler olarak oynatılır

## Bağlam
Yeni set eklemek için sürüm gerekiyordu; masaüstü WebGL + telefon Skia ayrı kod, telefon ısınması ve "kart boyutu dinamik" sorunu.

## Karar
- Tasarım masaüstündeki araçta yazılıp kare kare dışa aktarılır (`cosmetic-packs/<id>/`, `pack.json`), sunucuya yüklenir, istemciler yalnızca oynatır.
- Standart: 6 sn (5-7 sn), 30 fps (60 fps varsayılandan çıktı), ilk kare = son kare, standart tuval boyutu.
- Kart efekti saydam video (yığılmış H.264 MP4, ses izi olamaz) veya AVIF; süs/plaka AVIF. Kullanıcı: "çizimler tamamen değişebilir sorun değil, yeni sisteme geçtiğimiz için".
- Eski çizim motorları (masaüstü WebGL, telefonda ~2300 satır Skia motoru + GLSL→SkSL çevirici) ve ilgili native kod silinir; yedek yok.
- Liste yenileme bağlıyken 10 dk'da bir ve uygulama öne gelince; paket güncellenince önceki sürüm sunulmaya devam eder.

## Neden
Sürümsüz yeni tema, tek çizim yeri, telefon ısınması/iki platformda ayrı kod sorununun azalması, dosya boyutu video ile 6 MB'tan <1 MB.

## Reddedilen alternatifler
- Animasyonlu WebP: kart 6-22 MB (inter-frame yok).
- 14 sn uzun döngü: kullanıcı kısa standart istedi.
- Eski çizimi yedek tutmak: kullanıcı kaldırmayı istedi ("bir sorun çıkarsa bakarız").
- Telefon oynatma testini uzun sürdürmek: kullanıcı gerek yok dedi.

## Sonuçlar / riskler
- Kesintisiz döngüde sıkıştırma döngü noktasında küçük sıçrama ekliyor (ölçüldü); Android 8 gereği: [[android-min-surum-8]].
- Altyapı review'unda bağlı istemcilere liste değişikliğinin ulaşmaması (orta) doğrulandı ve düzeltildi.

## İlgili
- [[kozmetik-setleri-ucretsiz]], [[kozmetik-yalnizca-uzerine-gelince-oynar]]

Benzer/ilgili not (başka ajan): [[kozmetik-sunucudan-paketler]]
