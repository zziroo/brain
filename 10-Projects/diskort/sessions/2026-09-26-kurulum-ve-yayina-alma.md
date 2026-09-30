---
type: session
project: diskort
date: 2026-09-26
status: done
tags: [diskort, kurulum, vps, yayin]
source: C--dev-diskort f0d5fe07-075d-4c23-9fa5-991660c48027.jsonl, 0f563e3b-738e-42b9-899e-9826e3671029.jsonl, 3034bff9-b3f9-4abc-a0ca-630123e48ed1.jsonl (aynı sohbetin fork zinciri)
---

# Oturum: Diskort'un sıfırdan kurulup canlıya alınması

Not: Üç dosya aynı sohbetin ardışık parçaları (fork); ilk mesajlar ortak. Tek notta özetlendi.

## Ne yapıldı
- Hedef: Discord kalitesinde, 10-20 kişilik kapalı grup için önce sesli + ekran paylaşımlı masaüstü uygulaması. Uzun vadede metin, roller, DM.
- `git init`, proje OneDrive dışına (`C:\dev\diskort`) taşındı, GitHub'a bağlandı. Ad "Diskort" oldu, repo public + MIT.
- Kiralık VPS + alan adı (`ziroo.net` alt alanları) alındı (Türkiye'den ödeme akışı adım adım yürütüldü), SSH anahtarı panelden eklendi, sunucu kuruldu.
- Kendi alan adında indirme sayfası; v0.1.0 ve v0.1.1 yayını (kurulu uygulama yayından saniyeler sonra güncellendi).
- Günlük DB yedeği (sunucuda 04:00 zamanlayıcı + Windows tarafında görev), SSH parola girişi kapatıldı, sunucu güncellemeleri ve otomatik güvenlik yamaları.
- Şifre sıfırlama + yönetici araçları (Ayarlar > Üyeler, "Sesten At"), TURN/TLS yedek bağlantı (443), Linux ve macOS paketleri CI ile.

## Alınan kararlar
- [[sesli-uygulama-icin-livekit-ve-kendi-vps]]
- [[indirme-sayfasi-kendi-domaininde]]
- [[ssh-yalnizca-anahtar-ile]]
- [[kod-imzalama-ertelendi-dev-era]]

## Öğrenilenler
- [[ortam-tuzaklari-windows-bash-ssh]]

## Açık kalanlar
- Gerçek sistem sesinin ekran paylaşımında yankısız gittiği o sırada doğrulanmamıştı.
- Kod imzalama ertelendi (SmartScreen uyarısı kalıyor).
