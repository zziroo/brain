---
type: decision
project: tussle
date: 2026-10-11
status: active
tags: [tussle, deneme-turu, oda]
source: oturum 2026-10-11 (mobil-playus: deneme turu, rekor flaması, oda ekranı yeniden tasarımı F)
---

# Karar: Deneme turu günde bir kez, yalnız ilk sayılan denemeden önce ve başlangıç kartında

## Bağlam
Oda kartındaki "Deneme turu" oynadıktan sonra da duruyordu, sonsuz kez girilebiliyordu ve düğme gibi görünmüyordu. Yusuf: deneme, oynamadan önce bir kerelik, sayılmayan bir hak; serbest test için Antrenman zaten var. "Bir kere oynadıysa deneme de oynayamasın."

## Karar
- Deneme yalnız günün ilk sayılan denemesinden önce, gün açıkken ve oda+gün başına bir kez sunulur (`src/client/trial.ts`: `trialOffered`, `trialUsed`, `markTrialUsed`; `localStorage` anahtarı `tussle.trials.v1`, oda başına son kullanılan gün).
- Açıldığı anda kullanılmış sayılır (yarıda çıkmak geri vermez). Deneme sonucu ekranında "Tekrar" yok, "Gerçek denemeye geç" var.
- Yeri: oda kartından kalktı, günün oyununun başlangıç kartına "Önce deneme turu · günde 1, sayılmaz" bağlantısı olarak taşındı (`PlayRequest.trialLink`). Dokunuşta yeniden denetlenir; artık izin yoksa yalnız bağlantı gizlenir, kart kullanılabilir kalır. Deneme `/oyna` geçmiş girdisinin yerine açılır (tek geri basışta odaya).

## Neden
Deneme sunucuya hiç gitmiyor (rastgele tohum, kayıt yok); bu yüzden işaret cihazda tutuldu. Başlangıç kartı, oynamadan hemen önceki doğru an; odada yer kaplamıyor.

## Reddedilen alternatifler
- Sunucuda deneme kaydı: deneme zararsız (gerçek günün tohumunu bilmiyor), ek uç nokta ve tablo gereksiz. Bedeli: başka cihaz ya da silinen tarayıcı verisinde ilk gerçek denemeye kadar tekrar çıkar (kabul edildi).
- Odada küçük düğme olarak bırakmak: F tasarımında kart = tek dokunma alanı.

## İlgili
- [[2026-10-11-oda-ekrani-sezon-bandi-ve-canli-ilk-3]]
- [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]
- [[_overview]]
