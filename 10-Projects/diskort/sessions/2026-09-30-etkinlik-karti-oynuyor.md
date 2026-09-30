---
type: session
project: diskort
date: 2026-09-30
status: done
tags: [diskort, etkinlik, oyun-algilama, masaustu, surum]
source: a23848e8-c89f-4e6e-b205-6a370f117b82.jsonl ("diskort etkinlik karti tasarimi")
---

# Oturum: "Oynuyor" etkinlik kartı, 0.9.0-0.9.1, depo tazeleme

## Ne yapıldı
- Kullanıcı isteğiyle masaüstü temelli etkinlik kartı: `Presence.activity`, `ACTIVITY_SET`, ikon yükleme/sunma ucu, masaüstünde oyun algılama (ayarlardan kapatılabilir, bilinen oyunlar), üye listesi/DM/ses kanalı satırlarında ikonlu alt satır. Üç ajan paralel (sözleşme commit'i sonra sunucu/gösterim/algılama dalları), çok turlu review. Uçtan uca deneme ajanı 9 maddenin hepsini geçti, yerel izole ortamda; gerçek oyun algılamayla canlıda denenmedi.
- Kararlar: [[etkinlik-karti-cok-oyun-ve-ikonlar]].
- **0.9.0** (kullanıcı isteğiyle 0.8.14 yerine; sayısal karşılaştırma nedeniyle güncelleme akışı bozulmaz), sonra küçük iyileştirmeler ile **0.9.1** (0.9.0 etiketinin üzerine yazılmadı).
- Tüm dosyalar tarandı, eski bilgi düzeltildi (README'de "1440p" yanlış; gerçek 720p60/1080p30/1080p60, iOS IPA ve `/udid` akışı vb.), 41 dosya metin düzeltmesi, iki fact-check bulgusu düzeltildi, indirme sayfasına üç kart (Mesajlaşma, Etkinlik, Profil süsleri) eklendi, sunucuda `git pull` ile canlıya alındı.
- Eski dallar: [[github-eski-dallar-silindi]]. Kod imzalama: [[kod-imzalama-simdilik-yok]].
- Eski worktree klasörleri temizlendi (8 boş), birleşmemiş video dalı bırakıldı.

## Alınan kararlar
[[etkinlik-karti-cok-oyun-ve-ikonlar]], [[github-eski-dallar-silindi]], [[kod-imzalama-simdilik-yok]]

## Açık kalanlar
- Gerçek oyunla algılama, ayar ekranı ve sunucuya bildirim canlıda denenmedi; kullanıcı "gerçek hayat testlerinden sonra bakarız" dedi.
