---
type: decision
project: diskort
date: 2026-10-22
status: active
tags: [diskort, yayin, arayuz, masaustu, kenar-cubugu, bildirim]
source: Claude Code oturumu 2026-10-22 "diskort: durum özeti ve yeni işler" (Yusuf'un sesli isteği)
---

# Karar: Yayın izlemede düğme yerine doğrudan etkileşim (tek tık küçültür, tekerlek yakınlaştırır); ses satırında sağ uç sabit yuva (yayın küçük resmi ya da oyun ikonu); okunmamış rozeti bahsetme + DM

## Bağlam
Yusuf 2026-10-22'de üç şey istedi: bildirim gelince uygulama ikonunda rozet; ses kanalı listesinde oyun ikonlarının "isme göre kayıp dikey şeritte düzensiz" durması; yayın izlemede "hep düğme" yerine daha doğrudan bir arayüz (tek tıkla küçülme, yakınlaştırma) ve yayıncının yanında yayının küçük resmi. Ayrıntıları kendisi bırakmıştı ("anlamadıysan sor").

## Karar
- **Rozet:** sayı = görülebilen sunucu kanallarındaki bahsetmeler + açık DM'lerin okunmamışları. Arkadaşlık istekleri sayılmaz. DND'de de sayılır (ses/dikkat çekme DND'de kapalı kalır). Türetilmiş durum: okununca kendiliğinden düşer, pencere odağına bağlı değil. macOS/Linux sayı (`setBadgeCount`), Windows sabit kırmızı nokta overlay.
- **Ses satırı:** sağ uçta sabit yuva: yayın yapıyorsa yayının küçük (32×18) önizlemesi, değilse oyun ikonu; mikrofon/kulaklık ikonları yuvanın solunda. "YAYINDA" rozeti kalır (kural: her yerde YAYINDA).
- **Yayın izleme:** odakta (büyük görünüm) yayına tek tık → ızgara; çift tık → tam ekran; tek tık 250 ms gecikmeli ki çift tıkla çakışmasın. Odakta ve tam ekranda tekerlekle 1×–4× zoom, imlecin altı sabit; yakınlaşmışken sürükleyerek pan, kenarlar içerikle sınırlı; Esc önce zoom'u sıfırlar; görünüm/yayın değişince sıfırlanır; barda oran hapı tıklanınca sıfırlar. "Izgaraya dön" düğmesi keşfedilebilirlik için kalır. Küçük kutucuklarda zoom yok.

## Neden
- Rozet sayımı zaten renderer'da vardı (GuildRail); main'e tek sayı göndermek en küçük değişiklik. Arkadaşlık isteği ayrı akış, rozeti şişirmesin.
- Satırda sorun isim değil, değişken sayıda sondaki ikondu; sabit yuva hizayı korur, boş yuva yer kaplamaz (null döner). Yayın önizlemesi zaten sunucuda 25 sn'de bir yenileniyor (hover kartı için), satırda göstermek ek yükleme maliyeti dışında bedava.
- Tek tık/çift tık gecikmesi bilinen desen; gecikme ızgaradaki kutucuk tıkına da yansıyor (250 ms), kabul edildi.

## Reddedilen alternatifler
- Oyun ikonu için her satırda boş da olsa sabit genişlikte yer ayırmak: gereksiz boşluk.
- Rozete arkadaşlık isteklerini katmak: ayrı akış, sayı anlamsızlaşır.
- Tam ekranda tek tıkla odaktan çıkmak: öğe yeniden kurulup tam ekran düşerdi; tam ekranda tek tık etkisiz.
- Zoom'u büyük↔tam ekran geçişinde korumak: kutu ölçüsü değişince pan değeri eskir; sıfırlamak daha güvenli.
- Yayın küçük resmini "YAYINDA" rozetinin yerine koymak: rozet kuralı ([[yayin-arayuzu-discord-tarzi]]).

## Sonuçlar / riskler
- Her istemci her yayıncı için 25 sn'de bir ≤256 KB önizleme indirir (satır görünürken). 10 kişilik grupta önemsiz.
- Önbellek (8 anahtar) iptal edilen objectURL'i satırda kırık gösterebilir; `onError` ile yer tutucuya düşer.
- Canlıda denenmedi (2026-10-22); Yusuf'un hissine göre gecikme/zoom aralığı ayarlanabilir.

## İlgili
- [[yayin-arayuzu-discord-tarzi]] · [[sahne-izgarada-coklu-yayin]] · [[urun-basit-tutma-reddedilen-fikirler]] · [[2026-10-22-rozet-sahne-prob-ve-0-11-3]]
