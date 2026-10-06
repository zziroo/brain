---
type: session
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, devir, dogrulama, test, hakem, playtest, genex]
source: Claude Code oturumu 27ffb81a (ZZ kökü, 2026-10-06), Genex Desktop incelemesi; Işık Bekçisi kod yerleri commit 8e6ef52 ve o anki çalışma kopyasından (js/audio.js, data.js, fx.js, i18n.js, icons.js commitlenmemiş değişiklik içeriyordu), salt okunur bakıldı
---

# Devir: Genex'in "insansız doğrulama" fikirleri Işık Bekçisi'ne nasıl uyarlanır (tartışılacak, karar Yusuf'un)

## Bağlam
Yusuf 2026-10-06'da [Genex Desktop](https://github.com/genex-games/genex-desktop) reposunu sordu. Ayrıntılar: [[genex-desktop-oyunu-insansiz-dogrulama-yontemleri]]. Yusuf'un sözü: "Işık Bekçisi oyununda tekrar tartışırız." Bu not o konuşmanın girdisi. **Bu oturumda hiçbir kod yazılmadı.**

Boşluk: overview'daki durum tablosunda aynı satırlar tekrar ediyor.
- "Gerçek kare döngüsüyle oynanmadı"
- "Hareket hâli 60 karede görülmedi"
- "Sesler dinlenmedi"
- "İnsan oyuncuyla denenmedi"

Genex'in harness'ı tam bu boşluk için kurulmuş: oyunu ölçülebilir yapan bir sözleşme, scriptli oynatma ve kör hakemler.

## Elimizde ne var (kod yerleri, 8e6ef52)
- **Konsol kancası:** `window.game`, `js/main.js:631` civarı. İçinde `S, ST, R, V, FX, Sky, Camp, Sound, UI, endRun` ile `scene()`, `busy()`, `transit()`, `launch`, `camp`, `sky` ve `give` var.
- **`tools/dev.js`:**
  - `fresh`, `setup` ve `newGame` kayıt durumları kuruyor.
  - `step`, `walkTo`, `camp` ve `campStep` simülasyonu doğrudan sürüyor ama `input.js`'i atlıyor.
  - `timerFrames()` ile `ev.*` gerçek olay gönderiyor.
  - `manualFrames()` ile `clock.step` saati durduruyor.
  - `campSweep` kamp mantığını bir ızgara üzerinde "ok" satırlarıyla denetliyor.
- **Diğer araçlar:** `tools/sim.js` ve `sim-node.mjs` denge botu. `tools/story-check.mjs` hikâyeyi başsız oynatıyor.
- **Rastgelelik:** yalnızca denge botunda tohumlu. `tools/sim-node.mjs:18` `Math.random`'u mulberry32 ile değiştiriyor. Sayfada tohum yok.
  - `js/util.js:6-7` (`rand`, `pick`) doğrudan `Math.random` kullanıyor.
  - `js/run.js` içinde 18 yerde `Math.random` var, ör. `:159`, `:164`, `:408` kritik vuruş, `:413`.
  - Sonuç: sayfadaki bir sefer ve ekran görüntüsü aynı şekilde tekrar üretilemiyor.
- **Zaman:** sahne geçişleri `performance.now()` kullanıyor (`js/main.js:33, 65, 69, 122`); `manualFrames()` bunu zaten durdurabiliyor.
- **Ses:** `js/audio.js:32-35`. `AudioContext` → `volMaster` → `ctx.destination`. Ölçüm için master'a tek bir analizör takmak yeterli.

## Uyarlanabilecek fikirler (Claude'un önerdiği sıra: bedava olandan pahalıya)
1. **İnceleme ve şüpheci ajanın talimatına hakem disiplini (bedava).**
   - Puan yerine ekran görüntüsü başına tek bir evet/hayır sorusu ve bir güven değeri. 0,7'nin altındaki "evet" geçmez.
   - "Bozuk her zaman kaybeder." "His gerilediyse eskisi kalır." "Muhtemelen = hayır."
   - Kontrol listesine bir **saçma madde** eklenir. Hakem ona evet derse karar geçersiz.
   - İnceleme ajanı kural dosyalarında (`run.js`, `camp.js`, `state.js` …) yeni `Math.random` ya da `Date.now` kullanımını işaretler.
2. **İtiraz yalnızca yeni kontrol olarak.** Şüpheci ajan ya da Yusuf'un bir geri bildirimi ("okunmuyor", "çok benziyor") tekrarlanabilir bir evet/hayır kontrolüne çevrilir ve bir listeye eklenir. Liste her birleşmede yeniden sorulur. Böylece okunurluk kararları ([[2026-10-06-karanlik-tehdidi-gizlemez-isaretler-sekliyle]]) ve [[2026-10-06-gorunum-birlestirme-okunurlugu-geriletebilir]] dersi regresyon testine dönüşür.
3. **`window.game` bir test sözleşmesine dönüşsün.** Bunun çoğu `dev.js`'te dağınık hâlde zaten var.
   - **`seed(n)`:** sim-node'daki mulberry32 değişimi sayfaya taşınır.
   - **`state()`:** sahne, bölge, yağ, kıvılcım, yanan fener sayısı, ekrandaki sürü ve benzeri bilgilerin kısa bir anlık görüntüsü.
   - **Mekanik başına bir probe ve adlandırılmış görünümler:** kamp, sefer başı, gökyüzü, fener başı.
   - **`capture()`:** `game.V.cv`'den görüntü alır.
   - **Ölçüm biçimi:** durum girdiden **önce** ve sonra alınır, `delta` ile ölçülür. Örnekler: sol tuş → ışın daralıyor; Boşluk → parlama; Shift → atılım konumu değiştiriyor; E → istasyon açılıyor.
   - Ölçülemeyen kontrol "geçti" değil "ölçülmedi" yazar.
4. **Hareket şeridi ve okunurluk hakemi.**
   - `timerFrames()` ile yaklaşık 30 sn scriptli bir sefer oynatılır ve 6 kare kırpılır: sürünün yaklaşması, beceri halkasının dolması, ışından lazere geçiş.
   - Kareler taze bir hakem ajana verilir. Hakem Genex'in readability rubriğini kullanır:
     - 8 ilke 0–3 arası puanlanır: okunur, durum, eylem ipucu, geri bildirim, derinlik, kompozisyon, palet, bitiş.
     - Her ilkeye bir neden ve somut bir düzeltme yazılır, en etkili ilke `biggest` olarak seçilir.
   - Hakem 2D oyundan "dünya hissi" istemez.
5. **Ses probe'u.**
   - `volMaster`'a takılan analizörle RMS ölçülür. Parlama, hazır halkası ve "boğuk tık" sesleri dinlenmeden doğrulanır.
   - Girdiden sonra 200 ms içinde ekranda ya da seste tepki olup olmadığı ölçülür.
6. **Kilometre taşında taze bir playtester.**
   - Oyunu hiç görmemiş bir ajan tarayıcıda (yerel ya da canlı) oynar ve 2–4 evet/hayır soruyu cevaplar. Örnekler: "Odak ışınını kendin keşfettin mi?", "Kampa neden döndüğünü anladın mı?"
   - Sonunda tek bir büyük öneri (`bigMove`) yazar.
   - Pahalı olduğu için yalnızca yayın öncesi çalışır. "İnsan oyuncuyla denenmedi" satırının **yerini tutmaz**, yalnızca ara adımdır.

**Yapılmasın:**
- Genex kodunu kopyalamak: Three.js'e ve `__studio` ara katmanına bağlı.
- Yönetmen ve gece döngüsü, her parça için ayrı worktree, tarif istatistikleri.

## Açık sorular (Yusuf)
- Hangi maddeler, hangi sırayla? Claude'un önerisi: 1 → 3 → 4 → 5 → 6. Madde 2, 1 ile birlikte gider.
- Sayfada tohumlu rastgeleliğe geçilsin mi? Botun sonuçları zaten tohumla ölçülüyor; sayfadaki oyun normal oynanışta tohumsuz kalabilir, tohum yalnız `?seed=` ya da test için açılır.
- Hakem ajan ne zaman çalışsın: her birleşmede mi, yayın öncesinde mi? Hangi modelle (Claude'un önerisi: sonnet)?
- Playtester için bütçe: kilometre taşı başına bir oturum yeterli mi?

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-04-devir-zorluk-ve-his-bulgulari]], [[2026-10-02-bot-ve-test-araclari-girdi-yolunu-atladi]], [[2026-10-06-bekci-feneri-ve-okunurluk]]
