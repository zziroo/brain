---
type: decision
project: genel
date: 2026-09-26
status: active
tags: [guvenlik, sunucu]
source: C--dev-diskort f0d5fe07/0f563e3b/3034bff9 (2026-09-26)
---

# Karar: Sunucuya yalnızca SSH anahtarıyla girilir; parola girişi kapatıldı.

## Bağlam
Yeni VPS'e parolayla giriş brute-force riski taşır; kullanıcı kilitlenmeden kapatılmasını istedi ("bana anlat").

## Karar
Anahtarın (`~/.ssh/diskort_vps`) sunucuya eklendiği doğrulandıktan sonra parola girişi kapatıldı; kurtarma yolu (panel konsolu) kullanıcıya anlatıldı. Güvenlik güncellemeleri otomatik (unattended-upgrades, gerekirse 05:00 yeniden başlatma).

## Neden
- Anahtar yalnızca kullanıcıda; parola tahmin saldırısı anlamsız.
- Önce anahtarla girişin çalıştığı kontrol edildi, böylece kilitlenme riski yok.

## Reddedilen alternatifler
- Parola + anahtar birlikte açık: saldırı yüzeyi büyük, kapatmamak için gerekçe yok.

## Sonuçlar / riskler
Kurtarma panelde konsoldan. Anahtarın yeri dışında hiçbir kimlik bilgisi notlarda tutulmaz.

## İlgili
- [[2026-09-26-kurulum-ve-yayina-alma]]
