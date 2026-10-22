---
type: lesson
project: diskort
date: 2026-10-22
status: active
tags: [diskort, prob-motoru, baglanti-teshisi, inceleme, test]
source: Claude Code oturumu 2026-10-22, prob motoru işi (yazar ajan + üç tur inceleme)
---

# Sonda motorunda protokol başına seri: dizi tutarsan sınırsız büyür; yeniden oynatma düzeneği aynı tura aynı sentAt verdiği için sıralama yapay kesinti üretir

## Ne oldu
UDP ve TCP kayıp serilerini ayırırken (`OutageDetector`, `apps/server/src/netProbe.ts`) ilk sürüm serileri dizi olarak tuttu ve `Math.min(...all.map(r => r.sentAt))` ile hesapladı. UDP hiç yanıt almayan bir kurulumda (UDP/53 süzülüyor, TCP çalışıyor) seri hiç sıfırlanmaz; ~125k elemanda (saniyede 2,4 sondayla ~14 saat) `RangeError` atar, `push`/`open` kalıcı bozulur, `tick().catch` hatayı yutar. Eski kod `run[0].sentAt` kullandığı için bu sorun yoktu. İnceleyici 130k elemanla betikle doğruladı.

Aynı işte yeniden oynatma testi (`netReplay.test.ts`, `muosxa5r-0` olayı) yeni bir "yalnız-UDP kesinti" buldu. Yazar bunu gerçek sanıp beklentiyi değiştirdi; inceleyici gösterdi ki fixture'daki satır sırası tamamlanma sırası (zaman aşımları satır sonuna düşüyor) ve bir turun bütün sondaları aynı `sentAt` alıyor; seri yalnızca aynı turdaki sıralama yüzünden 3'e ulaşıyordu. Gerçek motorda her sondanın `sentAt`'i ayrı.

Üçüncü tur: "both için öbür protokolde ≥2 hedef" kuralı fazla gevşek bağlanınca (`kRun.at < r.at`) kısa tam kesinti `udp` etiketlendi, 1+1 hedefli kurulumda kesinti hiç kayda geçmedi. Çözüm: koşulu yalnızca protokol serisi tüm-sonda serisinden önce kendi başına eşiği aşmışsa uygula (`preDown`).

## Ders
- Sürekli akan veride seri/pencere tutarken **dizi değil sabit boyutlu özet** (ilk an, sayaç, hedef kümesi) tut; `Math.min(...dizi)` gibi yayma çağrılarını üretim yolunda kullanma. "Hiç yanıt gelmeyen" uç durumu düşün.
- Bildirim/geri çağrıdan **önce** durumu sıfırla (ya da try/finally); aksi hâlde bir hata dedektörü kalıcı bozar.
- Yeniden oynatma fixture'ı gerçek zamanlamayı taşımıyorsa (aynı tura aynı zaman damgası), yeni bir tespit kuralı önce fixture'ın yapaylığına karşı test edilmeli; **testin beklentisini değiştirmeden önce** veride kanıt ara. Yazarın değiştirdiği beklenti inceleme sorusu olarak açıkça verilmeli.
- Sunucu tarafı mantık değişikliğinde inceleme ajanının **betikle yeniden üretmesi** değdi: üç turda bir yüksek, üç orta bulgu, hepsi gerçek. Böyle doğrulanmış bulgularda şüpheci atlandı (koordinatör kararı).

## İlgili
- [[saglayici-udp-paket-siniri]] (açık iş kapandı) · [[server-testleri-tam-kosuda-kararsiz]] · [[2026-10-22-rozet-sahne-prob-ve-0-11-3]]
