---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, test, inceleme, girdi]
source: oturum 2026-10-02 (incremantal-game), bağımsız inceleme ajanının raporu
---

# Bot ve test araçları simülasyonu doğrudan sürdüğü için gerçek girdi yolundaki kritik hata gözden kaçtı

## Ne oldu
Oyun baştan sona botla hatasız oynanıyordu ve elle sürülen testler temizdi; yine de fareyle oynayan herkes ikinci koşunun ilk karesinde donacaktı. Sebep: "kamerayı hemen hedefe atla" işareti olarak zoom 0'a çekiliyordu; kare döngüsü çizimden önce fare konumunu dünya koordinatına çevirirken 0'a böldü, hareket vektörü NaN oldu, konum NaN oldu, çizimdeki gradyan çağrısı istisna attı ve `requestAnimationFrame` bir daha çağrılmadı.

Bot ve `tools/dev.js` hareket vektörünü kendileri verdiği için `readMove` (fare → dünya) yolundan hiç geçmedi. Önizleme paneli gizliyken kare döngüsü de çalışmadığı için gerçek döngü fiilen hiç test edilmemişti. Hatayı salt-okunur inceleme ajanı kod okuyarak buldu.

## Ders
- Simülasyonu doğrudan süren test, girdi ve kare döngüsü katmanını kapsamaz. En az bir testte gerçek olayları üret (`PointerEvent` dispatch et) ve döngünün yaptığı sırayı (girdi oku → güncelle → çiz) aynen çağır.
- Bir değeri hem veri hem işaret olarak kullanma (zoom = 0 "atla" demekti). Ayrı bayrak kullan.
- Kare döngüsünde `requestAnimationFrame`'i en başta çağır; tek karelik bir istisna oyunu kalıcı dondurmasın. Simülasyona giren vektörü sonluluk açısından denetle.
- Kendi yazdığın kodu kendi testinle doğrulamak aynı kör noktayı paylaşır; bağımsız okuma burada tek başına kritik hatayı yakaladı. "Önemliyse inceleme yap" eşiği, canlıda test edilemeyen her oyun için aşılmış sayılmalı.

## İncelemeden çıkan diğer düzeltmeler
Eski sekmenin yeni kaydı ezmesi (kayıt damgası + bayat sekme yeniden yüklenir), tıklanan düğmede kalan odak yüzünden Boşluk/Enter'ın çift iş yapması, dokunmatikte ikinci parmağın yönlendirmeyi bozması, fener tozunun ve boss zaferinin kazanıldığı anda kaydedilmemesi.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]]
