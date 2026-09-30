---
type: decision
project: diskort
date: 2026-09-27
status: active
tags: [android, bildirim, fcm]
source: C--dev-diskort 2736605c (2026-09-26/27)
---

# Karar: Android push bildirimi FCM ile gönderilir; sunucumuz FCM HTTP v1'e doğrudan istek atar.

## Bağlam
Kullanıcı bildirimin neden kendi sunucumuzda olmadığını sordu; uygulama kapalıyken telefona ulaşmanın yolu gerekiyordu.

## Karar
Mantık (kime, ne zaman, ne yazılacak) kendi sunucuda; taşıyıcı FCM. Sunucu, servis hesabı anahtarıyla imzalanmış JWT ile FCM HTTP v1'e doğrudan istek atar (arada başka sunucu yok). Anahtar sunucuda yalnızca root'un okuyabildiği klasörde, `google-services.json` GitHub secret'ında; ikisi de repoda değil. Çıkış yapınca o telefona bildirim gitmez.

## Neden
- Telefon pil tasarrufu için arka plan bağlantılarını keser; işletim sistemi kanalı (FCM / iOS'ta APNs) tek güvenilir yol.
- Ücretsiz, gecikme yeterli.

## Reddedilen alternatifler
- Tamamen kendi sunucumuzdan kalıcı bağlantı: ekranda kalıcı bildirim, daha fazla pil tüketimi; Xiaomi/Samsung yine de bağlantıyı öldürür.

## Sonuçlar / riskler
iOS için eşdeğeri APNs (bkz. [[ios-ad-hoc-dagitim]]). Anahtar dosyasının indirilenler klasöründeki kopyası kullanıcıya silmesi önerildi.

## İlgili
- [[2026-09-26-metin-kanallari-ve-android-baslangic]]
