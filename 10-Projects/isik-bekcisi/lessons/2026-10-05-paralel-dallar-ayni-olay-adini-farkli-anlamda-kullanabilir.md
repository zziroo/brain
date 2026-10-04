---
type: lesson
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, orkestrasyon, worktree, olay-yolu, birlestirme]
source: oturum 53393f9a (incremantal-game): B dalı (karacık) ve C dalı (zincirleme yıldızlar) ikisi de emit('burn') ekledi
---

# Paralel iki dal aynı olay adını farklı anlamda ekleyebilir; git bunu çakışma saymaz, birleştirmeden önce yeni emit adlarını karşılaştır

## Ne oldu
- Karacık dalı `'burn'` olayını "bir karacık yandı (öldü)" anlamında ekledi. Puhu'nun karacık isteği bunu sayıyor, `h_soot` ve `h_mare` ipuçları buna bağlı.
- Yıldız dalı aynı adı "Akkor bir şeyi tutuşturdu" anlamında ekledi.
- İki dal farklı satırlara dokunduğu için git hiçbir çakışma göstermezdi. Birleşseydi Akkor'un tutuşturduğu her ruh karacık isteğini sayacak ve karabasan ipucunu yanlış yerde tikleyecekti.
- Koordinatör dalların diff'lerinde `emit('…'` ve `on('…'` adlarını aratınca fark etti. Yıldız dalı birleştirirken kendi olayını `'ablaze'` yaptı. Aynı turda varlık alan adları (`e.burn` → `e.ablaze`) ile liste adı da değişti.

## Ders
- Olay yolu (`emit` / `on`) ortak bir ad alanıdır. Paralel dallarda yeni olay, R alanı ve varlık alanı adları anlamca çakışabilir; metin birleştirme bunu yakalamaz.
- Birleştirmeden önce her dalın eklediği adları karşılaştır: `git diff main...<dal> | grep "emit('\|on('\|when('"`. Aynı ad iki dalda farklı anlamdaysa sonra birleşen dal kendi adını değiştirsin.
- Ajan brifinde paralel dalların ne eklediğini yaz. Ajandan raporunda yeni olay adlarını listelemesini iste.

İlgili: [[2026-10-02-paralel-ajan-dallarini-main-ile-ajana-birlestirtmek]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
