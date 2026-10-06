---
type: resource
project: oyun-gelistirme
date: 2026-10-06
status: active
tags: [genex, yapay-zeka, oyun-gelistirme, dogrulama, test, hakem, playtest]
source: Claude Code oturumu 27ffb81a (ZZ kökü, 2026-10-06); github.com/genex-games/genex-desktop, commit 55f35267a2 (dal dev, v0.1.3), salt okunur inceleme; iki ajan raporu, ana iddialar ve alıntılar koordinatörce repoda kontrol edildi
---

# Genex Desktop: yapay zekânın yaptığı oyunu insan oynamadan doğrulama yöntemleri

[Genex](https://github.com/genex-games/genex-desktop), yapay zekâyla oyun yapan bir masaüstü uygulaması. Electron ve TypeScript ile yazılmış, MIT lisanslı, macOS (Apple Silicon) ve Linux'ta çalışıyor. Yusuf 2026-10-06'da "bize ne katar" diye sordu. Asıl değeri uygulamanın kendisi değil, içindeki **harness**: ajanların oyunu yapıp kalitesini insan olmadan ölçtüğü döngü. Bizim notlarda en sık geçen satır "gerçek oynanışla doğrulanmadı", bu yöntemler o boşluğa denk geliyor.

Bağlantılar commit `55f35267a2`'ye sabit. Repo erken sürüm ve hızlı değişiyor.

## Ürün kısaca
- Solda sohbet, sağda canlı oyun. Builds sekmesinde işçi ajanların grafiği var, Assets sekmesinde varlıklar.
- Kullanıcının kendi Claude Code ya da Codex CLI aboneliğiyle çalışıyor, API anahtarı kullanmıyor. Ollama ve yerel MLX modeli de destekliyor.
- **Roller:** ana ajan, işçiler ve hakemler. Her role ayrı model seçilebiliyor ve Opus ile GPT karıştırılabiliyor. Döngü modu aynı anda 8 işçiye kadar çalıştırıyor.
- **Eklentiler:**
  - Blender eklentisi yerelde bpy script'i çalıştırıp GLB ve iki render üretiyor. Ağsız sandbox'ta çalışıyor ([plugins/blender](https://github.com/genex-games/genex-desktop/tree/55f35267a2/src/plugins/blender)).
  - Meshy, Tripo ve ElevenLabs'e ücretli yönlendiriciyle bağlanıyor.
- Ürettiği oyunlar **yalnız Three.js**. Canvas 2D ve Phaser için döngü çalışmıyor; bu oyunlar yalnızca oynanıp fotoğraflanabiliyor.
- **Ekip ve olgunluk:** 3 kişi; açık geçmiş 4 günlük ve özel geçmiş tek commit'e sıkıştırılmış. Kodun yarısından fazlası Claude Code ile yazılmış. Uygulama yaklaşık 230 bin satır, testler 169 bin satır.

## 1. Oyuna test kancası: `window.__studio`
Oyun şablonunun [CLAUDE.md](https://github.com/genex-games/genex-desktop/blob/55f35267a2/src/game-template/CLAUDE.md) dosyasındaki ilke: "What cannot be measured does not exist."
- **Kanca:** `installStudio({ renderer, player, update, probes, cameras, demos, reset, audio })` ile kuruluyor ([studio.js](https://github.com/genex-games/genex-desktop/blob/55f35267a2/src/game-template/src/studio.js), 1.156 satır). İçinde `seed(n)`, `step(dtMs)`, `state()`, `debugCamera(ad)`, `capture()`, `inspect()` ve `injectInput` var.
- **Belirlenimcilik:** saat ve rastgelelik test aracının elinde. Oyun kodu rastgeleliği yalnız `update()`'e verilen `rng`'den, zamanı yalnız `dt`'den alıyor.
- **Ölçülebilirlik:** her nesne etiketli. Her mekaniğin bir probe'u, onu gösteren bir kamerası ve gerekirse bir demosu var.
- **Kontrol geçmiyorsa** işçi kontrolü eğip bükmüyor. Notlarına `HARNESS: <kontrol> şu yüzden geçemez` yazıyor ve bu satırlar sonraki çalışmaya ders olarak taşınıyor.

## 2. Kanıt turu (her yapım turunda)
Kaynak: [evidence.ts](https://github.com/genex-games/genex-desktop/blob/55f35267a2/src/harness-seed/loop/evidence.ts).
1. Sayfa yükleniyor. İki adımlık kareyle saatin test aracında olduğu kanıtlanıyor.
2. Oyun türüne göre scriptli girdiyle yaklaşık 30 sn oynatılıyor. FPS'te WASD, fare ve Space; masa oyununda tıklama ve sürükleme ([kinds.ts](https://github.com/genex-games/genex-desktop/blob/55f35267a2/src/harness-seed/loop/kinds.ts)).
3. Durum girdiden **önce** ve sonra alınıyor. `delta("player.x")` kayma ya da kendiliğinden hareketi değil, kontrollerin etkisini ölçüyor.
4. **Hareket şeridi:** sürüş boyunca 6 kare çekiliyor (`MOTION_FRAMES`). Hakem oyunu tek kareden değil hareket ederken görüyor.
5. Adlandırılmış kameralardan fotoğraf çekiliyor, demolar çalıştırılıyor; konsol ve GPU hataları okunuyor.
6. Ses probe'u RMS ve spektral merkezi ölçüyor.

**Kontrol türleri:**

| Tür | Ne ölçer |
|---|---|
| scene | sahne grafiği |
| pixel | parlaklık, doluluk, iki kare farkı |
| metric | sayısal değer |
| probe | durum farkı |
| demo | demonun çalışması |
| vision | ekran görüntüsüne evet/hayır sorusu |
| play | playtester'ın cevabı |

Ölçülemeyen kontrol "geçti" değil **"ölçülmedi"** sayılıyor. Bir sonuç geriye gittiyse fotoğraf bir kez yeniden çekiliyor; ancak sonra tur kaybedilmiş sayılıyor.

## 3. Hakemler
Hakem talimatları [judge/](https://github.com/genex-games/genex-desktop/tree/55f35267a2/src/harness-seed/judge) klasöründe sabit. Her hakem taze bağlamla çalışıyor, araç ve skill'i yok. İki sürüm (A/B) karıştırılmış sırayla geliyor ve **hiçbir hakemden puan istenmiyor**. Okunamayan bir karar berabere sayılmıyor, mevcut sürüm kalıyor.
- **vision-check / vision-batch:** her kare için tek bir evet/hayır sorusu, bir de güven değeri. Güveni 0,7'nin altındaki "evet" başarısız bir kontrolü geçirmiyor; 0,5'in altı "bu kare bunu gösteremiyor" demek. Hakem cevabı tahminle değil, yalnızca pikselde gördüğüyle veriyor.
- **blind-compare:** iki sürümü ayrı ayrı "çalışıyor mu", "görsel", "his" ve "oynanış" başlıklarında karşılaştırıyor.
  - Bozuk sürüm her zaman kaybediyor.
  - His gerilediyse yeni sürüm daha güzel görünse de eskisi kalıyor.
  - Hakem tüm kusurları sıralıyor, çünkü yazılmayan kusur düzeltilmiyor.
- **taste-veto:** yalnızca kontrollerden geçmiş bir sürüme uygulanıyor.
  - Hakem sürümü ancak gerilemeyi **yeni bir evet/hayır kontrolü** olarak yazarak engelleyebiliyor. Böylece öznel itiraz bir regresyon testine dönüşüyor.
  - Hakem ayrıca tek bir büyük yapısal hamle (`bigMove`) ve en fazla 3 cila notu yazıyor. Cila notları kusurlardan ayrı tutuluyor.
  - "Competent is not satisfied": düzgün ama sıradan bir sürüm yeterli sayılmıyor.
- **readability (ekran ve 2D oyunlar):** 8 ilkenin her biri 0–3 arası puanlanıyor ve her puana bir neden ile somut bir düzeltme yazılıyor. Hakem en büyük etkiyi yapacak ilkeyi `biggest` olarak seçiyor.
  - Büyütme ilkeleri: okunur, durum, eylem ipucu (affordance), geri bildirim, derinlik.
  - Cila ilkeleri: kompozisyon, palet, bitiş.
  - "A screen that swallows an input is broken however it looks." Hakem 2D bir oyundan dünya hissi istemiyor.
- **liveness (3D mekânlar):**
  - Büyütme ilkeleri: alan, ölçekler, amaç, canlılık, sonraki adım.
  - Cila ilkeleri: aşınma, ışık, malzeme.
- **artefact-classes:** adlandırılmış kusur sınıfları köşeli parantezle raporlanıyor. Örnekler: `[floating]`, `[z-fight]`, `[dead-input]`, `[primitive]`, `[blob]`, `[duplicate-overlay]`.
- **code-review:** kanıt toplamaya geçmeden önce diff'e ucuz bir bakış.
  - Oyun kodunda `Math.random` ve `Date.now` kullanımını işaretliyor.
  - Kodun hesaplamadığı değeri raporlayan probe'ları yakalıyor.
  - İşi yapmadan geçirilen kontrolü `gaming: true` ile işaretliyor.
- **playtester:** oyunu hiç görmemiş taze bir ajan 20 dakikaya kadar oynuyor. Ekran görüntüsü alıyor, tuşlara basıyor, fareyle bakıyor, tıklıyor ve oyunun durumunu okuyor.
  - Kural: birkaç eylemde bir ekran görüntüsü alıyor; kanıt, oyunun bildirdiği durum değil, ekranda gördüğü.
  - 2–4 evet/hayır soruyu cevaplıyor, bir oyun raporu ve tek bir `bigMove` yazıyor.
  - En pahalı kanıt olduğu için yalnızca birleşik sürümde ve kilometre taşlarında çalışıyor.

**Kabul kuralı:** turda en az bir güçlü kontrol düzelmişse ve zevk vetosu yoksa sürüm kabul ediliyor. Bu olmazsa sürüm ancak hakem onu seçtiyse ve planlanan hamle gerçekten yapıldıysa kabul ediliyor.

## 4. Kendi araçlarını ölçme (eval)
Kaynak: [docs/evals.md](https://github.com/genex-games/genex-desktop/blob/55f35267a2/docs/evals.md) ve [scripts/evals/prober](https://github.com/genex-games/genex-desktop/tree/55f35267a2/scripts/evals/prober).

**Ölçüm aracı (prober).** Playwright init script'iyle oyun yüklenmeden araya giriyor.
- `AudioNode.connect`'e bir analizör ekleyip sesi dinlemeden ölçüyor ([instrument.ts](https://github.com/genex-games/genex-desktop/blob/55f35267a2/scripts/evals/prober/instrument.ts)).
- Ölçtükleri:
  - açılıyor mu, hata var mı;
  - kare hızının alt sınırı;
  - 5 dakikada bellek eğimi;
  - girdinin durumu değiştirip değiştirmediği;
  - yönlerin etiketlerle uyuşması;
  - girdiye 200 ms içinde ekranda ya da seste tepki;
  - 5 dakikalık uzun koşuda kilitlenme;
  - okunurluk ve telefon ekranı.
- Bir satır ancak somut kanıtla kalıyor, kanıt yoksa sonuç "bilinmiyor".

**Kontrol listesi notlayıcısı.**
- Her çağrıda tek madde soruluyor. Kurallar: "kanıt göstermiyorsa HAYIR" ve "'muhtemelen' HAYIR'dır".
- İki model ailesi üçer kez oy veriyor, sonuçlar VE ile birleşiyor.
- Her listede **saçma bir kontrol maddesi** var ("the ball is a live goldfish that swims back out of the hole"). Notlayıcı bu maddeye evet derse notun tamamı geçersiz sayılıyor. Yağcı hakemi yakalamanın neredeyse bedava yolu bu.

**Karşılaştırma ve hakemlerin denetimi.**
- İkili karşılaştırma iki sırayla da yapılıyor; yalnızca iki sırada aynı çıkan sonuç sayılıyor.
- Hakemlerin kendisi sabit bir kandırma tablosuyla sınanıyor ([judge-evaluation.md](https://github.com/genex-games/genex-desktop/blob/55f35267a2/docs/judge-evaluation.md)). Tablodaki tuzaklar:
  - açılış hatası;
  - kopuk girdi;
  - havada duran nesne;
  - kırpılmış HUD;
  - daha güzel ama kontrolü bozuk sürüm;
  - özdeş sürümler;
  - eksik kanıt.

## 5. Ekip pratikleri (kendi kodlama ajanları için)
- **Talimat dosyaları:** `CLAUDE.md` tek satır (`@AGENTS.md`). `AGENTS.md` kısa bir yönlendirme dosyası, `docs/agent/` altında sözlük, tarifler ve bir "değişiklik kapsamı → çalışacak kontroller" tablosu var.
- **Doküman disiplini:**
  - Bağlantıları ve kelime bütçesini bir test denetliyor: özet 500, konu 800, toplam 4.000 kelime.
  - Dokümanlar güncel davranışı anlatıyor; aynı PR'da değiştiriliyor, sona ekleme yapılmıyor.
- **`.claude/skills` tarifleri:** `add-ipc-channel`, `add-plugin-tool`, `run-area-tests` gibi tekrar eden işler için hazır tarifler. Her biri dokunulacak dosyaları sırasıyla veriyor.
- **`.claude/settings.json`:**
  - `git reset --hard`, `git clean`, `rm -rf` ve kullanıcı veri klasörleri yasak.
  - Her düzenlemeden sonra bir PostToolUse hook'u mimari sınırı kontrol ediyor ve ihlalde exit 2 ile durduruyor.
- **Testler:**
  - Önce kırmızı: her hataya, düzeltme olmadan başarısız olan bir test yazılıyor.
  - Kaynak koddan metin arayan (grep'leyen) testler yasak.
  - Etkilenen testler import grafiğinden seçiliyor.
  - Model cevapları scriptlenerek uygulamanın tamamı hesapsız çalıştırılabiliyor.
- **Performans bütçeleri:** duvar saati yerine **sayaçlarla** konuyor (draw call, üçgen, paket baytı). Bütçeler yalnızca sıkılaşabiliyor; zaman ölçümleri sadece gözlem.

## Bize uymayan ya da fazla büyük olanlar
- Gece boyu çalışan yönetmen döngüsü (uyandırma ve günlük ile), her oyun parçası (facet) için ayrı worktree, skill'lerin kendini optimize etmesi (SkillOpt), referans paneli ve stil mesafesi, çok kulvarlı değerlendirme kampanyaları, tarif terfi istatistikleri.
- Oyun başına ders defteri (ledger) fikrini vault zaten karşılıyor.
- Döngü mekanizmasının kodu Three.js'e ve `__studio` ara katmanına bağlı. Fikirler Canvas 2D'ye taşınır, kod taşınmaz.

## Genex'i kendimiz kullanalım mı? (Claude'un önerisi, 2026-10-06)
Fikirleri ve kodu alalım, günlük araç yapmayalım. Merak edilirse Kül Tahtı'nın bir kopyasıyla bir akşam denenebilir.
- **Erken sürüm:** v0.1.3 ve açık geçmişi 4 günlük.
- **Canvas 2D oyunlarımıza uymuyor:** Işık Bekçisi ve Bal Vadisi Canvas 2D, Genex ise yalnızca Three.js üretiyor.
- **İşi zaten yapıyoruz:** koordinatör, ajan ve inceleme düzenini kendimiz kuruyoruz.
- **Limit riski:** 8 Opus işçisi Max 5x limitini hızlı tüketebilir (bu bir tahmin, ölçülmedi).

## Uygulama
- Işık Bekçisi'ne uyarlama: [[2026-10-06-devir-genex-dogrulama-fikirleri]]. Yusuf "Işık Bekçisi oyununda tekrar tartışırız" dedi.
- Diğer oyunlar için öne çıkanlar:
  - **KAPIŞ ve Kül Tahtı:** ses, tepki süresi ve uzun koşu probe'u; Kül Tahtı için liveness rubriği.
  - **KAPIŞ:** istemci, sunucu ve simülasyon arasındaki sınırı denetleyen bir hook.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[10-Projects/kul-tahti/_overview|Kül Tahtı]], [[10-Projects/kapis/_overview|KAPIŞ]], [[30-Resources/oyun-tasarimi/_index|Oyun tasarımı dersleri]]
