---
type: lesson
project: isik-bekcisi
date: 2026-10-05
status: active
tags: [isik-bekcisi, denge, sinerji, bot, gelir]
source: oturum 53393f9a (incremantal-game): C dalı ve denge ajanının ölçümleri (20 ve 99 oyunluk bot karşılaştırmaları)
---

# Ham çarpanı olmayan zincirleme yıldızlar da oyunu kısalttı: yakalama başına ödül (yağ, kombo) her yeni yakalamayı daha uzun sefere çeviriyor

## Ne oldu
- Altı zincirleme yıldızın hiçbiri gücü ya da değeri doğrudan çarpmıyordu. Her etki hedefin canına göre ölçekliydi ve bir kuşakta sönüyordu. Yine de botun oyunu ~44'ten ~38 sefere indi, Kalp 1–2 denemede düştü.
- Yıldızları tek tek zayıflatmak bir seferden az etki etti.
- Etkinin asıl kaynağı yapıydı. Daha çok yakalama, Çiy Damlası'ndan daha çok yağ (yakalama başına dolum), yani daha uzun sefer, o da yine daha çok yakalama demek. Kalp'te de eski denemeler zaten %85–96'ya varıyordu; küçük bir güç artışı ilk denemede kırdı.

## Ders
- Yakalamayı artıran her yeni etkiyi, yakalama başına verilen ödüllerle (yağ dolumu, kombo, fener akışı) birlikte düşün. Gösterinin kendisi sınırlı olsa bile bu döngü onu çarpana çevirir.
- Böyle bir yapısal kısalmayı etkinin kendi sayıları düzeltmez. Kademe maliyeti (`TIER_SCALE`) ya da döngüdeki ödül düzeltir.
- Kalp gibi eşikli bir hedefte, eski denemelerin ne kadar yaklaştığına bak: %90'a varan denemeler küçük bir güç artışıyla ilk denemede biter.

İlgili: [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]], [[2026-10-05-denge-tier-scale-ile-eski-tempoya-donus]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
