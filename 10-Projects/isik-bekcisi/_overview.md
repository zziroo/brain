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
- **Final:** Gecenin Kalbi (3 fazlı boss: gölge çağırma, boşluklu karanlık halkalar). Kazanınca şafak söker.
- **Arayüz ("gece atlası"):** serif yazı, ince çift çerçeveli plakalar, çentikli düğmeler, emoji yerine kendi çizgi ikon seti, fitil şeklinde yağ göstergesi. Bal Vadisi'nin görünümünden bilinçli olarak ayrıştırıldı.

## Teknoloji
- Düz JS ES modülleri + Canvas 2D, derleme yok, dış dosya yok (görsel ve ses kodla üretiliyor). ~4.800 satır JS.
- Klasör: `C:\Users\yusuf\ZZ\zProjects\incremantal-game`. Çalıştırma: `node serve.mjs` → http://localhost:5174.
- Kural: oyun kuralları `run.js` / `camp.js` / `quests.js` / `state.js` / `data.js` içinde, DOM'suz; görünen her şey olay yolu (`emit`) üzerinden. Bu sayede denge botu oyunu başsız oynayabiliyor.
- Test: `tools/dev.js` (elle sürme; `timerFrames()` + `ev` ile gerçek kare döngüsü ve gerçek girdi olayları), `tools/sim.js` (oyunu baştan sona oynayan denge botu). Ayrıntı deponun `CLAUDE.md` dosyasında.
- **Canlı:** https://diskort.ziroo.net/games/isik-bekcisi · oyun listesi https://diskort.ziroo.net/games. Yayınlama: `bash deploy/deploy.sh` (oyun); liste sayfası `bal-vadisi` deposundaki `deploy/deploy.sh` ile. Kurallar ve tuhaflıklar: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]]. Yeniden yayın Yusuf istediğinde yapılır.

## Durum (2026-10-02)
| Parça | Durum |
|---|---|
| Tam oyun akışı (başlık → kamp → koşu → özet → kamp → … → boss → son) | yazıldı; gerçek fare/klavye/dokunma olaylarıyla uçtan uca doğrulandı |
| 5 bölge + boss + son | çalışıyor; her bölge ekran görüntüsüyle kontrol edildi |
| Kamp, sakinler, istekler, iksirler, yeni arayüz | yazıldı (commit `84cda67`); masaüstü ve 375×812 mobil yerleşimde kontrol edildi |
| Denge | botla ayarlandı: istek + iksirle ~45 koşu / ~60 dk, onlarsız ~51 / ~65. İnsan için tahmin 1,5–2 saat. Gerçek oyuncu testi yok |
| Yayın | ilk sürüm 13:48'de canlıya alındı (kamp/arayüz yenilemesi öncesi). Yeni sürüm: Yusuf "inceleme bitince yükle" dedi |
| Oynanış hissi, ses | canlı izlenemedi (önizleme paneli rAF'i kısıyor). Yusuf ilk sürümü oynadı ve üç geri bildirim verdi; arkadaşlarıyla deneyip devamını aktaracak |
| İnceleme kapısı | 1. tur (ilk sürüm): 1 kritik, 3 orta, 11 düşük bulgu; hepsi düzeltildi (`6fd8b65`). 2. tur (kamp/arayüz): çalışıyor. Şüpheci ajan yerine bulgular koordinatör tarafından tarayıcıda yeniden üretilerek doğrulanıyor |
| Git | yerel depo, 5 commit, remote yok |

## Sıradaki işler
1. 2. inceleme turunun bulgularını doğrula ve düzelt, ardından yeni sürümü yayınla (Yusuf onayladı: "inceleme bitince sunucuya yükle").
2. Yusuf ve arkadaşlarının oynama geri bildirimini al: tempo (ilk 5 dakika, koşu uzunluğu, fenerlerin hızı), hareket (fare ve dokunmatik), zorluk (pervaneler, gölgeler, boss), ağacın anlaşılırlığı, ses, oyunu bitirme süresi. Sonraki tur buna göre.
3. İnsan temposu ölçülünce dengeyi yeniden ayarla (şu an yalnızca bot verisi var).
4. Yeni kamp sistemleri (istekler, iksirler) hiç insan tarafından oynanmadı: ödül büyüklükleri ve bekleme süresi ilk geri bildirimde sorulacak.

## Kararlar
- [[2026-10-02-isik-bekcisi-tasarim-kararlari]]
- [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]]

## Dersler
- [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]]
- [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]]
- [[2026-10-02-kamera-kayarken-imlecin-dunya-konumu-da-kayar]]
- [[10-Projects/bal-vadisi/lessons/2026-10-02-gizli-onizleme-panelinde-raf-durur|Gizli önizleme panelinde rAF durur]]

## Oturumlar
- [[2026-10-02-iki-oyun-yayin-ve-kamp-yenilemesi]]
