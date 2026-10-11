# Orkestrasyon Raporu Üretici

Claude Code oturumlarındaki ana oturum + arka plan ajanları (subagent) akışını
tek bir kendi kendine yeten HTML raporuna döken, tekrar çalıştırılabilir bir
araç. Sadece Node 20+ ile çalışır, harici npm bağımlılığı yoktur.

## Kullanım

```
node report.mjs [--session <id>] [--project <proje-dizini>] [--out <dosya.html>]
```

- Hiçbiri verilmezse yalnız **canlı kaynakta** (`kaynaklar.json`'daki ilk giriş, dosya
  yoksa `~/.claude/projects`) bütün proje dizinleri içinde dosya zamanına göre en yeni
  `.jsonl` oturumu seçilir. Arşiv kaynaklarına düşülmez: canlı kök yoksa ya da hiç
  `.jsonl` içermiyorsa hata verir ve `--session` / `--project` önerir.
- `--session` verilirse oturum bütün kaynaklardaki proje dizinlerinde aranır
  (`--project` de verilmişse yalnız o projede). Aynı oturum kimliği birden çok kaynakta
  varsa stderr'e uyarı yazılır, listedeki ilk kaynak kullanılır.
- `--project` yalnız verilirse, o dizindeki (hangi kaynakta varsa) dosya zamanına göre en
  yeni `.jsonl` oturumu seçilir. Dizin adı hangi kaynakta varsa oradan bulunur (Mac:
  `-Users-ziroo-ZZ-zProjects-diskort`, Windows arşivi: `C--Users-yusuf-ZZ-zProjects-diskort`).
- `--out` verilmezse çıktı `out/<sessionId>.html` olarak yazılır; yanına aynı
  isimle bir `<sessionId>.json` (ham hesaplanmış veri) de yazılır.

Örnek:

```
node report.mjs --session 72824d08-d870-48e5-bdad-ab589c1b5f78 --project C--dev-diskort
```

## Kaynaklar (Mac + Windows)

İki araç da transkriptleri tek bir kök yerine `~/Arsiv/claude-konusmalar/kaynaklar.json`
listesindeki bütün köklerden okur (`~` açılır):

```
{"kaynaklar": [{"ad": "mac", "kok": "~/.claude/projects"},
               {"ad": "windows", "kok": "~/Arsiv/claude-konusmalar/windows/projects"}]}
```

Dosya hiç yoksa yalnız `~/.claude/projects` okunur. Dosya varsa ama bozuksa (geçersiz JSON,
eksik `ad`/`kok`, aynı `ad` iki kez, boş liste) dört araç da hata verip çıkar (sessizce
yalnız Mac'e düşmez). Göreli `kok`, bu dosyanın dizinine göre çözülür. Listede olup
diskte bulunmayan kök uyarıyla atlanır. Listenin **ilk girişi canlı kaynaktır** (`report.mjs`
argümansız bunu kullanır), sırayı değiştirme. Aynı liste `ayikla.py` ve `ice-aktar.py`
tarafından da kullanılır; yeni makine/kaynak eklemek için yalnız bu dosyaya satır eklenir.

`ice-aktar.py <zip> [--dene] [--hedef <dizin>]` yeni bir Windows zip'ini `windows` köküne ekler
(kuralları dosyanın başındaki yardım metninde): `.jsonl` yalnız sonuna eklenerek büyüyebilir,
yerinde yeniden yazılan diğer dosyalar (memory, `custom-title.json` ...) zip'teki tarih daha
yeniyse güncellenir, başka her fark çakışma sayılıp dokunulmaz; zip-slip, çift ad ve bozuk girdide
hiçbir şey yazılmadan durur; hedef `~/.claude/projects` olamaz.

## Toplam kullanım: `usage.mjs`

```
node usage.mjs [--since <ISO>] [--until <ISO>] [--kaynak <ad>] [--out <dosya.html>]
```

Bütün kaynaklardaki ana oturum ve subagent kayıtlarını tarar; model / proje / gün /
oturum bazında token ve API-eşdeğeri maliyet çıkarır (`out/usage.html` + `.json`).
Konsol özeti ve HTML başlığı kullanılan kaynakları gösterir. Aynı mesaj kimliği
birden çok dosyada geçerse bir kez sayılır.

- `--since` / `--until`: `YYYY-MM-DD` ise **UTC günü** bazında (sınır günü dahil; kayıt
  zamanları UTC), saatli ISO ise anlık karşılaştırma (UTC için sonuna `Z`:
  `--until 2026-10-05T12:30:00Z`; saat dilimi yazılmazsa yerel saat).
- `--kaynak <ad>`: yalnız o kaynağı oku (`mac`, `windows`).
- Bayrak değersiz bırakılırsa ya da değeri `--` ile başlıyorsa (ör. `--since --out x`) hata verir.

## Pano (dashboard): `pano.mjs`

```
node pano.mjs [--since <ISO>] [--until <ISO>] [--kaynak <ad>] [--metinsiz] [--yenile] [--ac] [--out <dosya.html>]
```

Bütün kaynaklardaki oturum ve alt ajan transkriptlerinden tek dosyalık, animasyonlu bir
dashboard üretir: `out/pano.html` + `out/pano.json`. Claude oturumunda `/pano` komutu
aynısını çalıştırıp tarayıcıda açar (`~/.claude/skills/pano/SKILL.md`).

- Bölümler: Genel bakış, Token ve maliyet, Projeler, Oturumlar (oturum başına oynatılabilir
  zaman çizelgesi), Akışlar (araç geçişleri ve orkestrasyon Sankey'i), Ajanlar, Alışkanlıklar,
  Dosyalar. Tarih, kaynak, proje, model ve zamanlanmış görev filtreleri tarayıcıda uygulanır.
- `--since/--until/--kaynak` anlamı `usage.mjs` ile aynı; `--ac` tarayıcıda açar;
  `--metinsiz` istem metinlerini ve ajan açıklamalarını çıkarır (paylaşmadan önce kullan).
- Önbellek: `out/.pano-onbellek.json`. İlk tam tarama ~5 sn, sonrakiler <1 sn. `--yenile`
  önbelleği yok sayar; `redact` değişince önbellek kendiliğinden yenilenir.
- Dosyalar: `pano.mjs` (toplayıcı), `ortak.mjs` (kaynak listesi, fiyatlar, proje adı, redact;
  `usage.mjs`/`report.mjs`'ten kopya, onlar değişirse elle eşitle), `pano/sablon.html`
  (arayüz, harici bağımlılık yok, CSP'li), `pano/SEMA.md` (veri sözleşmesi).
- Doğrulama kuralı: `ozet.cagri` ve `ozet.maliyet`, aynı süzgeçle `usage.mjs` toplamına
  birebir eşit olmalı (SEMA.md "Doğrulama").
- Çıktıda istem metinleri var: Artifact/bulut/vault'a yalnız istenirse ve `--metinsiz` ile.

## Canlı pano: `canli.mjs`

```
node canli.mjs [--port 7788] [--ac] [--pencere <dk>]
```

Şu an çalışan oturumları ve alt ajanları canlı gösteren yerel sunucu (Node 20+, bağımlılık yok).
Claude oturumunda `/canli` komutu çalışmıyorsa başlatır ve URL'yi verir (`~/.claude/skills/canli/SKILL.md`).

- Yalnız `127.0.0.1`'e bağlanır. Yollar: `/` (arayüz), `/durum` (JSON anlık görüntü), `/olaylar` (SSE).
- Yalnız **canlı kaynağı** (`kaynaklar.json`'daki ilk kök, yoksa `~/.claude/projects`) salt okur.
  Açılışta son `--pencere` dakikada (varsayılan 180) değişen dosyalar tam okunur; sonra
  `fs.watch` (özyinelemeli) + 2 sn yoklama ile `.jsonl`'lar kaldığı bayttan artımlı izlenir.
  Pencere dışındaki eski bir dosya büyürse o an baştan okunur.
- Arayüz "Orkestra": her oturum bir kart (model, durum, bağlam ölçeri, anlık araç, maliyet, 60 dk
  çıkış kıvılcımı), ajanları altında SVG bağlarla; yan sütunda model dağılımı ve son 60 kaydın akışı.
  Biten ajan 2 dk soluk kalıp toplanır. Boşta/kapalı oturumlar düğmeyle görünür.
- Durum kuralları, ajan bitiş sinyalleri ve veri biçimi: `canli/SEMA.md`.
- `--ac` tarayıcıda açar; durdurmak için Ctrl+C (ya da `pkill -f "orchestration-report/canli.mjs"`).
- Gizlilik: serbest metin `redact()`/`excerpt()`'ten geçer (en çok ~80 kr); istem gövdesi ve ham araç
  girdisi gönderilmez. Yine de sayfa yereldir: Artifact olarak yayınlama.

## Rapor neler içerir

1. **Özet** — model başına toplam token (giriş/önbellek yazma/önbellek okuma/çıkış),
   ajan sayısı, eşzamanlı ajan zirvesi, toplam ajan duvar-saati, tahmini maliyet.
2. **Zaman çizelgesi** — ana oturum + her ajan için bir Gantt şeridi (model rengine
   göre), ana oturumdaki kullanıcı mesajları dikey çizgi olarak işaretli.
3. **Ajan tablosu** — açıklama/tür/model/konum (ön plan, arka plan, worktree),
   başlangıç/süre, araç çağrıları, tokenler, zirve/son bağlam, bağlam grafiği,
   maliyet, durum.
4. **Bağlam büyümesi** — ana oturum ve her ajan için API çağrısı başına bağlam
   boyutunu gösteren küçük çizgi grafik (sparkline).
5. **İletişim akışı** — kullanıcı→ana oturum, ana oturum→ajan (spawn), ajan→ana
   oturum (hand-back), ana oturum→ajan (SendMessage) olaylarının kronolojik listesi.
6. **Olaylar** — izin reddi, araç hatası, compaction olayları.
7. **Ana orkestratör** — ana oturumun kendi token/bağlam eğrisi ve toplam
   maliyetteki payı.

## Maliyet rakamları hakkında

Maliyetler **API liste fiyatı karşılığıdır**. Pro/Max abonelikte bu tutarlar ayrıca
faturalandırılmaz, kullanım limitinden düşer. Fiyatlar `report.mjs` içindeki
`PRICES` tablosunda sabitlenmiştir; kaynağı ve türetilen (önbellek yazma/Sonnet 5
önbellek okuma) oranlar dosya içindeki yorumda açıklanmıştır. Fiyatlar zamanla
değişebilir — güncel fiyat için `claude-api` skill'i tekrar sorgulayıp tabloyu
güncelleyin.

## Veri kaynağı ve sınırlamalar

- Ana oturum: `<kaynak kökü>/<proje>/<sessionId>.jsonl` (kök: yukarıdaki kaynak listesi;
  Mac için `~/.claude/projects`)
- Ajanlar: `<kaynak kökü>/<proje>/<sessionId>/subagents/agent-<id>.jsonl`
  + `.meta.json` (`.meta.json` olmayan ajanları `report.mjs` göstermez; `usage.mjs` sayar)
- Token sayımı, aynı `requestId`'yi paylaşan satırlar için **bir kez** yapılır
  (bir istek birden çok JSONL satırına yayılabilir).
- Task-notification'daki `subagent_tokens` alanı, o ajanın tüm API çağrıları
  toplamı DEĞİL, ajanın **son/zirve bağlam boyutuna** yakın bir değerdir
  (önbellek nedeniyle çağrılar arası token toplamı gerçek dışı büyük çıkar).
  Rapor, kendi hesapladığı zirve/son bağlam değerlerini bu bildirimle yan yana
  gösterir, böylece çapraz kontrol edilebilir.
- Transkriptler salt okunur girdi olarak işlenir; istem ve hand-back metinleri
  raporda en fazla 600 karakterlik özetler halinde, olası anahtar/token benzeri
  dizeler kırpılmış (redakte edilmiş) olarak gösterilir.
