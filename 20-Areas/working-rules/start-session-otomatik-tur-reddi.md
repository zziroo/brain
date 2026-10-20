---
type: lesson
project: genel
date: 2026-10-16
status: active
tags: [claude-code, start-session, orkestra, tuzak]
source: ZZ oturumu "kripto-bot: proje başlangıcı" (2026-10-16)
---

# Ders: ToolSearch ile tool yükledikten sonra gelen "Tool loaded." turunda start_session reddediliyor

## Ne oldu
ZZ kökünde `start_session` tool'unu `ToolSearch` ile yükledim; uygulama "Tool loaded." diye sentetik bir tur açtı. O turda `start_session` (`user_asked`, `cwd` ile proje klasörü) iki kez şu hatayla reddedildi: "this turn runs an automated event ... start it once the user asks you here". Kullanıcının o sırada gönderdiği ara mesaj da turu "kullanıcı turu" yapmadı.

## Neden önemli
Kart (`own_initiative`) çözüm değil: kart mevcut klasörde (ZZ) açılır, `cwd` taşıyamaz. Proje işi yanlış klasörde başlar (bkz. hafıza: proje işi proje oturumunda).

## Nasıl uygulanır
- `start_session` tool'unu kullanıcının asıl mesajını aldığım turda değil, **önceden** (örneğin ilk yanıtı yazarken) yükle; böylece kullanıcının "başlat" dediği tur temiz bir kullanıcı turu olur.
- Reddedilirse: brifingi proje klasörüne not olarak yaz (`BASLANGIC-NOTU.md` gibi), kullanıcıdan tek kelimelik yeni bir mesaj iste, sonraki turda başlat.

## Tekrar (2026-10-20, status: unverified neden)
ZZ oturumu "araştırma: tweet doğrulama"da iki ret yaşandı:
1. İlk ret, alt ajan raporu (SubagentHandback) ile gelen turdaydı. Bu beklenen durum.
2. İkinci ret ise kullanıcının gerçek mesajıyla açılan turdaydı: "düşündüğün değişiklikleri uygulayabilirsin". Olası neden: genel bir onay "oturum başlat" sayılmıyor, ya da önceki görev bildirimi turun sınıfını etkiledi. Neden doğrulanmadı.

Uygulanan çözüm şuydu: brief vault'a devir notu olarak yazıldı ([[2026-10-20-kod-haritasi-devir-notu]]) ve kullanıcıdan açık bir "başlat" mesajı istendi. Ek ders: alt ajan çalışırken bir oturum açılacaksa, kullanıcıdan oturumu açıkça isteyen bir cümle beklenir.

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[20-Areas/working-rules/_index]]
