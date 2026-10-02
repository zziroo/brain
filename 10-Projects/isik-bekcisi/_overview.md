---
type: project
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, oyun, incremental, kosu-tabanli, canvas]
source: C:\Users\yusuf\ZZ\zProjects\incremantal-game (CLAUDE.md); oturum 2026-10-02
---

# Işık Bekçisi: fenerle karanlık vadiye koşular yapılan koşu-tabanlı incremental oyun

## Amaç
Yusuf'un asıl istediği tür: belli bir süre aktif oynanan, kampa dönüp geliştirme alınan ve tekrar çıkılan döngü (Shelldiver, Rock Bottom; [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]). İlk deneme idle çıkmıştı ([[10-Projects/bal-vadisi/_overview|Bal Vadisi]], [[2026-10-02-idle-degil-kosu-tabanli-incremental-istendi]]). Analizden sonra Yusuf bu konsepti onayladı: "elinden gelenin en iyisini yap, en kaliteli şekilde tasarla".

## Oyun
- **Koşu ("sefer"):** bekçi imleci/parmağı takip eder, nişan yok. Fenerin ışık çemberi içindeki ruhlar "dolar" ve yakalanır; kıvılcım bırakır. Koşuyu **fener yağı** sınırlar; yağ azalınca ışık daralır.
- **Kamp (gezilebilir üs):** koşudan sonra bekçi kamp ateşinin yanında uyanır ve yürür. Bir şeyi kullanmak: yaklaş + E / Boşluk / Enter, tıkla ya da dokun.
  - **Teleskop + Ülker** (eski bekçi): gökyüzü, yani beceri ağacı.
  - **Kuzey kapısı + Kandil** (kirpi fenerci): kapıdan yürümek koşuyu başlatır; Kandil yanan fenerlerden başlangıç seçtirir.
  - **İstek panosu + Puhu** (baykuş, 1. fenerden sonra gelir): 3 görev, ödül kıvılcım ya da yıldız tozu.
  - **Kazan + Vırak** (kurbağa, 2. fenerden sonra gelir): 3 iksirden biri, yalnız bir sonraki sefer için; ardından 2 sefer bekleme.
  - **Kamp ateşi:** seyir defteri (istatistik, yakalananlar).
  - Kamp ilerlemeyle büyür: her fener için bir fener direği ve kapı süsünde bir lamba.
- **Beceri ağacı:** gece göğünde takımyıldızı (8 kol, 48 yıldız): Alev (güç), Yağ, Hale (çap), Adım (hız), Bereket (değer), Çağrı (ruh sayısı), Yoldaşlar (ateş böcekleri), Parlama (aktif patlama). İki para birimi: kıvılcım ve yıldız tozu. Yıldızın bilgisi imlecin yanında açılır; dokunmatikte altta.
- **Derinlik:** 5 bölge, her biri yeni mekanik getirir: Çayır (temel), Orman (ağaçlar + yağ çalan pervaneler), Bataklık (ışıktan kaçan ürkek ruhlar + sis), Kristal Mağara (zincirleme patlayan kristaller), Harabeler (kovalayan gölgeler).
- **Fenerler:** her bölgenin sonunda ışıkla doldurulan bir yol feneri var; ilerleme kalıcı. Yanınca koşu zaferle biter, gece duvarı çekilir, yeni yıldız kademesi açılır ve sonraki koşu oradan başlar.
- **Beceriler (2. geri bildirimden sonra):** odak ışını (fareyi basılı tut: hale daralır, ışık imlece doğru uzanır ve 2,6 kat güçlü vurur), Parlama (Boşluk), Atılım (Shift / Q / sağ tık). Fener, bölgede yakalanan ruhlarla kendiliğinden %80'e kadar dolar; son kısmı başında ışın ve çağrılan ruhlarla tamamlanır. Yağ derin bölgelerde daha hızlı yanar. Ayrıntı: [[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]].
- **Final:** Gecenin Kalbi (3 fazlı boss: gölge çağırma, boşluklu karanlık halkalar). Kazanınca şafak söker.
- **Arayüz ("gece atlası"):** serif yazı, ince çift çerçeveli plakalar, çentikli düğmeler, emoji yerine kendi çizgi ikon seti, fitil şeklinde yağ göstergesi. Bal Vadisi'nin görünümünden bilinçli olarak ayrıştırıldı.

## Teknoloji
- Düz JS ES modülleri + Canvas 2D, derleme yok, dış dosya yok (görsel ve ses kodla üretiliyor). ~5.000 satır JS.
- Klasör: `C:\Users\yusuf\ZZ\zProjects\incremantal-game`. Çalıştırma: `node serve.mjs` → http://localhost:5174.
- Kural: oyun kuralları `run.js` / `camp.js` / `quests.js` / `state.js` / `data.js` içinde, DOM'suz; görünen her şey olay yolu (`emit`) üzerinden. Bu sayede denge botu oyunu başsız oynayabiliyor.
- Test: `tools/dev.js` (elle sürme; `timerFrames()` + `ev` ile gerçek kare döngüsü ve gerçek girdi olayları; `campSweep()` ile kampın her noktasından kapıya ve istasyonlara gidiş taraması), `tools/sim.js` (oyunu baştan sona oynayan denge botu). Ayrıntı deponun `CLAUDE.md` dosyasında.
- **Canlı:** https://diskort.ziroo.net/games/isik-bekcisi · oyun listesi https://diskort.ziroo.net/games. Yayınlama: `bash deploy/deploy.sh` (oyun); liste sayfası `bal-vadisi` deposundaki `deploy/deploy.sh` ile. Kurallar ve tuhaflıklar: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]. Yeniden yayın Yusuf istediğinde yapılır.

## Durum (2026-10-02)
| Parça | Durum |
|---|---|
| Tam oyun akışı (başlık → kamp → koşu → özet → kamp → … → boss → son) | yazıldı; gerçek fare/klavye/dokunma olaylarıyla uçtan uca doğrulandı |
| 5 bölge + boss + son | çalışıyor; her bölge ekran görüntüsüyle kontrol edildi |
| Kamp, sakinler, istekler, iksirler, yeni arayüz | yazıldı (`84cda67`), inceleme bulguları düzeltildi (`5efa47b`); masaüstü ve 375×812 mobil yerleşimde kontrol edildi |
| Denge | botla ayarlandı: istek + iksirle ~44 koşu / ~58 dk, onlarsız ~50 / ~64. İnsan için tahmin 1,5–2 saat. Gerçek oyuncu testi yok |
| Yayın | **canlıdaki sürüm = `5efa47b`** (2026-10-02 16:34'te yüklendi; ilk sürüm 13:48'deydi). Yüklenen 19 dosya yereldekiyle birebir aynı; canlı adreste kamp → sefer → özet → teleskop → yıldız yakma gerçek olaylarla denendi, CSP ihlali ve konsol hatası yok |
| Eski kayıtlar | ilk sürümde oynayanların kaydı yeni sürümde açılıyor (yıldızlar ve fiyatlar aynı). Dönen oyuncu kamp ipucunu ve kapı okunu bir kez görüyor, ilk istekleri kendi düzeyine göre boyutlanıyor |
| Oynanış hissi, ses | canlı izlenemedi (önizleme paneli rAF'i kısıyor). Yusuf ilk sürümü oynadı ve üç geri bildirim verdi; arkadaşlarıyla deneyip devamını aktaracak |
| İnceleme kapısı | 1. tur (ilk sürüm): 1 kritik, 3 orta, 11 düşük bulgu; hepsi düzeltildi (`6fd8b65`). 2. tur (kamp/arayüz): kritik/yüksek yok, 2 orta + 11 düşük; hepsi düzeltildi. Düzeltmeler ayrı bir doğrulayıcı ajandan (sonnet) geçti: gerileme yok, 2 nadir düşük bulgu daha, onlar da düzeltildi (`5efa47b`). Orta bulgular için şüpheci ajan yerine koordinatör bulguları tarayıcıda yeniden üretti |
| Odak ışını, atılım, yeni fener ve yağ dengesi | yerelde, commit `6ec661a`; **canlıda değil** (canlı sürüm `5efa47b`). Bot ~43 sefer / ~50 dk. Gerçek girdiyle ışın, atılım ve telefonda iki parmak denendi; his ve ses denenmedi |
| Git | yerel depo, 8 commit, remote yok |

## Sıradaki işler
0. Yusuf isterse `6ec661a` sürümünü yayınla; sonra ışın / atılım / fener olayı hakkında geri bildirim al (ışın çok mu güçlü, fenerin son kısmı kısa mı, seferler 35–45 sn iyi mi).
1. Yusuf ve arkadaşlarının oynama geri bildirimini al: tempo (ilk 5 dakika, koşu uzunluğu, fenerlerin hızı), hareket (fare ve dokunmatik), zorluk (pervaneler, gölgeler, boss), ağacın anlaşılırlığı, ses, oyunu bitirme süresi. Sonraki tur buna göre.
2. Kamp hakkında sor: üs hissi veriyor mu, sakinler ve yürüyüş angarya mı, imleçle kapıdan çıkmak doğal mı (imleç artık kampın içine bir kez girmeden izlenmiyor), yeni arayüz diğer oyundan yeterince ayrışmış mı.
3. İnsan temposu ölçülünce dengeyi yeniden ayarla (şu an yalnızca bot verisi var).
4. İstekler ve iksirler hiç insan tarafından oynanmadı: ödül büyüklükleri, iksirin bekleme süresi ve "4 seferdir ilerlemeyen istek değişir" kuralı ilk geri bildirimde sorulacak.

## Bilinen küçük eksikler
- Koşu sırasında kapı direkleri katı değil (yalnız görsel).
- Kampta klavye ya da düz imleç takibiyle köşelere (Kandil'in doğusundaki çit dibi, kazan ile Vırak arası) girilebilir; çıkmak için yön değiştirmek yeter. Tıklayıp gitme bu köşelerden kendisi çıkıyor.
- Sunucuda `Cache-Control` yok: yükleme sonrası son birkaç dakikada oynamış biri sayfayı yenileyene kadar eski sürümü görebilir.

## Kararlar
- [[2026-10-02-isik-bekcisi-tasarim-kararlari]]
- [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]]
- [[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]]

## Dersler
- [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]]
- [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]]
- [[2026-10-02-kamera-kayarken-imlecin-dunya-konumu-da-kayar]]
- [[2026-10-02-duran-imlec-geri-alinamayan-esigi-gecirmemeli]]
- [[2026-10-02-tikla-git-yuruyusu-koselerde-takilir-tum-alani-tara]]
- [[10-Projects/bal-vadisi/lessons/2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]]

## Oturumlar
- [[2026-10-02-iki-oyun-yayin-ve-kamp-yenilemesi]]
