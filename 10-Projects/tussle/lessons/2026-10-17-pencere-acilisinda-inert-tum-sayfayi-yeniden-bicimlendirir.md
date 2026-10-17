---
type: lesson
project: tussle
date: 2026-10-17
status: active
tags: [performans, akicilik, sheet, inert, css]
source: tussle oturumu 2026-10-17 (kapışma ızgarası, bağlı hesap, profil açılışı)
---

# Ders: alt pencere açılırken `#app.inert = true` ağır ekranda ilk kareyi takıltır; kayma bitince koy

- Belirti: Yusuf'a "Profili düzenle" penceresi açılırken takılır gibi geldi (fotoğraflı profil, telefonda).
- Ölçüm (masaüstü Chrome, profil ekranı ~2.100 öğe, 46 kapak SVG'si): açılışın ~10 ms'sinin ~7 ms'si `#app.inert = true` satırıydı. inert tüm alt ağacın stilini ve erişilebilirlik ağacını yeniden hesaplatıyor; telefonda bu birkaç kat, açılış kaymasının ilk karesine biniyor.
- Çözüm (`a35b9db`, `src/client/ui/sheet.ts`): inert açılış animasyonu bitince (`animationend`, yedek `OPEN_MS + 80` ms; hareket azaltılmışsa hemen) konur, `closed` ile korunur. Arada arka zemin dokunuşları zaten alıyor, odak pencerede. Açılış ~5 ms'ye indi.
- Kural: açılış/kapanış animasyonunun ilk karesinde tüm sayfayı etkileyen DOM değişikliği (inert, sınıf, büyük stil değişimi) yapma; işi hareket bittikten sonraya bırak. Projenin bir numaralı kuralı: hiçbir cihazda kasmama.
- Doğrulanmadı: telefonda farkın hissedilip hissedilmediği.
