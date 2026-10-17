---
type: decision
project: genel
date: 2026-10-16
status: active
tags: [tussle, diskort, eposta, cloudflare, altyapi]
source: "oturum 2026-10-16 (mobil-playus): privacy adresi yönlendirmesi kontrolü"
---

# Karar: ziroo.net postası catch-all ile Gmail'e gidiyor; privacy@ için ayrı kural yok

## Bağlam
Notlar `privacy@ziroo.net` (Tussle gizlilik sayfası ve mağaza) için "kural kurulana kadar posta düşer" diyordu. Cloudflare panelinde (Chrome, Yusuf'un oturumu) bakıldı.

## Karar
- ziroo.net Email Routing açık; tek kural **Catch-all → Yusuf'un Gmail adresi (Active)**, tek doğrulanmış hedef. Özel adres kuralı yok.
- `privacy@ziroo.net` ve `diskort@ziroo.net` zaten bu kuralla teslim ediliyor; hiçbir ayar değiştirilmedi.
- Spam artarsa: bu iki adrese ayrı kural yaz, sonra catch-all'u kapat.

## Neden
Ek kural bugün bir şey kazandırmaz; catch-all zaten kapsıyor.

## Reddedilen alternatifler
- Şimdiden ayrı kurallar + catch-all kapatma: spam sorunu yok, gereksiz iş.

## Sonuçlar / riskler
- Yönlendirme yalnız alır: Gmail'den yanıt Gmail adresiyle gider. `privacy@` adına göndermek ayrı gönderim kurulumu ister (mağaza için şart değil).
- Gerçek bir test postası atılmadı (`unverified`: uçtan uca teslim).
- [[2026-10-16-play-dagitim-ic-test-eposta-listesi-kapali-test-ertelendi]] içindeki "posta düşer" notu bununla düzeltildi.

## İlgili
- [[10-Projects/tussle/_overview|tussle overview]] · [[2026-10-16-gizlilik-sayfasi-sunucudan-statik-en-tr]]
