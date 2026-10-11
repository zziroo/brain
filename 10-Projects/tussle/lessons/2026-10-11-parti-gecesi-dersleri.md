---
type: lesson
project: tussle
date: 2026-10-11
status: active
tags: [tussle, ders, orkestrasyon, parti-gecesi]
source: oturum 2026-10-11 (mobil-playus: M1 eksikleri + Parti Gecesi)
---

# M1 tek seferlik koşu ve Parti Gecesi dersleri

- **Geniş `pkill -f` başka oturumun sunucusunu öldürür.** M1 ajanı kendi sunucularını `pkill -f "src/server/index.ts"` ile kapatırken 8087'deki başka oturumun `tussle-api`'sini de düşürdü. Ajan brief'ine "yalnız kendi başlattığın PID'leri öldür, kendi portunu kullan" yaz.
- **Kopya ref ile inceleme ve geliştirme paralel yürür.** `git add -A && git stash create` + `git update-ref refs/heads/review/<ad>` + `git reset` ile çalışma ağacının anlık kopyası dal olarak saklandı; inceleme ajanı yalnız `git diff main review/<ad>` okurken 2. faz ajanı aynı ağaçta çalıştı. Sonra delta (`review/p1..review/p2`) ayrıca incelendi. Dalları commit sonrası sil.
- **Şüpheci geçişi, incelemenin önerdiği düzeltmeyi de sınamalı.** M2 bulgusunun önerilen "pencere içinde kabul" düzeltmesi, `startedAt`'in gönderim anından türetilmesi yüzünden `now <= goneAt + pay`'a indirgeniyor ve tekrar oynamayı geçiriyordu; doğrusu payı 10 sn'ye çıkarmaktı.
- **Gizli sekmede rAF hiç çalışmaz; zamanlı sahne adımları sunucu saatinden hesaplanmalı.** 1. faz ara sahnesinin "geç açılma" sınıfı rAF'ta kalkıyordu, gizli/arka planda sıralama hiç yer değiştirmedi. Düzeltme: adımlar idempotent, `sync()` sunucu zamanına göre vadesi gelen her adımı uygular (zamanlayıcıda ve görünürlük dönüşünde).
- **Modül düzeyinde durum, kapanış yollarında temizlenmeli.** `party-flow.ts`'deki `scene` yalnız bir yolda sıfırlanıyordu; kürsüyü gören oyuncuya sonraki partinin ilk oyunu açılmıyor, 10 sn kuralıyla 0 alıyordu (inceleme buldu). "Burada mısın" kontrolü de geniş tutulunca (`#/oda/X/` altındaki her rota) parti oyunu günlük denemenin üstüne açılıp hak yakabiliyordu.
- **İnceleme ajanı bile repoya dosya bırakabilir:** grep yönlendirmesi kökte `keys_used.txt` yarattı (ajan taşıdı). Salt-okunur brief'e "çıktıyı yalnız scratchpad'e yönlendir" ekle.
- **%98 "dolu" demek %2 kaldı demek, ve %2 büyük bir pay.** Oturumun tamamı (≈1,2 M alt ajan token'ı, çoğu önbellekten okuma) haftalık sayacı yalnız %98 → %99, 5 saatlik sayacı %0 → %4 oynattı. Önbellek okumaları limite ham token kadar yazılmıyor gibi; tam hesap bilinmiyor. Ders: %98'de büyük işten kaçınmaya gerek yok, ama sayacı aralarda kontrol et; %100'de işler sıfırlanmaya kadar durur.

İlgili: [[2026-10-11-parti-gecesi]], [[2026-10-11-canli-kapisma-tek-seferlik-kosu]], [[2026-10-10-m1-dersleri]].
