---
type: decision
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, oyun-tasarimi, denge, beceri, lazer, yag]
source: Claude Code oturumu 72fd0708 (incremantal-game); Yusuf'un ikinci oynama geri bildirimi; lazer ajanının raporu
---

# Odak ışını geç oyunda lazere dönüşür, odaklanmak yağ yakar ve geç bölgeler lazer ister

## Bağlam
Yusuf: "ışık yoğunlaştırma mekanizmasını sonlara doğru daha lazer gibi yapabilir miyiz? Buna uygun çevre ve düşman tasarımları yapabiliriz" ve "yoğunlaştırdıkça daha fazla harcıyor mu tam hissedemedim, bu şekilde bir mekanik kullanabiliriz." Önceki karar ([[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]]) ışına yağ bedeli koymamıştı; oyuncu bedel olmadığını fark etti ve bedel istedi.

## Karar
- **Işının biçimi istatistik oldu** (`beamHalf`, `beamReach`, `beamPower`, `beamWidth`, `beamCost`, `beamRamp`). **Mercek hattı** (Alev kolunun yanında): Mercek (eski `odak`, kimliği korundu) → Hüzme (2. kademe) → Işın (3.) → Yıldız Mızrağı (4.). Her adım koniyi daraltıp uzatır: ormana kadar meşale konisi, bataklık/mağarada spot, harabelerde ince lazer çizgisi. Koni hiçbir zaman `beamWidth`'ten ince olmaz (kapsül), yakındaki hedefler kaçmaz.
- **Hedefte tutuldukça ısınır:** `RAMP` ile hasar ×(1 + beamRamp × ısı). Toz yıldızları: **Dağlama** (ışının değdiği 1,6 sn yanmaya devam eder), **Kırılma** (ışınla yakalanan ruhtan 3 ışın saçılır).
- **Yağ bedeli:** odaklıyken yanma × (1 + (bedel − 1) × odak); bedel 1,7'den başlar, mercek güçlendikçe ~2,5'e çıkar; Yağ kolundaki **Damıtık Yağ** düşürür. Yağ bedava akarken (Sıcak Başlangıç, son nefes, ilk adımdan önce, fener yakılırken) bedel yok. Fitil göstergesi alevlenir ve üstünde "×1,8" etiketi durur; ilk odaklamada tek seferlik ipucu.
- **Ölçülen değiş tokuş** (yağ başına ışık): tek sert hedefte ışın 1,5–11×, sıralı hedeflerde 3–22× daha iyi; dağınık kalabalıkta hale kazanır (ışın 0,4×).
- **Lazer isteyen dünya:** **Kabuklu ruh** (bataklıktan itibaren; hale ışığının %12'si işler, ışın kabuğu dört aşamada çatlatır; değer ×5), **Prizma** (mağara ve harabeler; `world.js`'de kendi tohum dizisiyle yerleşir, çevresinde sürü toplanır; üstünde tutulan ışın 5 ışına bölünür, ışın prizmada biter), **Gece dikeni** (harabeler; 380 yarıçaplı yağ emen halka, 2–4'lü gruplar yolu keser; dışarıdan lazerle yakılır). **Gecenin Kalbi** gölgelerini çağırdıktan sonra 3,2 sn açılır; o sırada ışın iki kat sayılır. Puhu'nun panosuna "kabuk kır" ve "diken yak" istekleri eklendi.
- **Denge:** `BOSS.hp` 1,5M → 2,5M; `TIER_SCALE` [1, 20, 900, 16000, 350000] → [1, 22, 1300, 31000, 700000]. Bot: ~44 sefer / ~46 dk istek ve iksirle, ~51 / ~53 onlarsız; Kalp ~4 denemede (önce 3–4). Fiyat artışı eski kayıtları da etkiler.

## Neden
- Lazer hissi için yalnız güç değil biçim değişmeli: koni daralıp uzadığında "hedefi seçmek" ve "üstünde tutmak" kendiliğinden oyuna girer; ısınma bunu ödüllendirir.
- Yağ bedeli yoksa ışın her zaman doğru seçim olur ve hale anlamsızlaşır. Bedel, kalabalıkta haleyi, sert tekil hedefte ışını doğru seçim yapıyor; bu ölçüldü, tahmin edilmedi.
- Yeni şeyler (kabuk, prizma, diken) ışının üç özelliğini ayrı ayrı kullanıyor: delme gücü, uzun menzil, nokta hedefleme. Her bölgenin kendi mekaniği korunurken geç bölgeler lazerin yeri oluyor.

## Reddedilen alternatifler
- Lazer için ayrı bir "aşırı ısınma" kaynağı: ikinci bir sayaç öğretmek yerine tek kaynak (yağ) üstünden bedel.
- Lazerin engellerde (ağaç, prizma) durmaması: prizma ve Kalp'te durması "nereye tuttuğun" sorusunu anlamlı kılıyor; ruhları delip geçmesi korundu.
- Prizma ışınlarının çakışarak yakın hedefe birkaç kez vurması: incelemede 4,6×'e kadar yığılma ölçüldü; artık her hedef bir prizma / bir bölünme başına bir kez vurulur.
- `TIER_SCALE`'in 4. kademesini de yükseltmek: Kalp'in süresini uzatıyordu; yalnız 2.–3. kademe arttı.

## Sonuçlar
- Lazer dalı incelemesi: kritik/yüksek yok, 1 orta (bot arena ağzında iki sütun arasına sıkışıp seferi orada harcıyordu; Kalp canı kısmen buna göre ayarlanmıştı) + 7 düşük; hepsi düzeltildi (`6de7f17`, `0c138e1`). Bot artık 2 sn ilerleyemeyince yana adım atar ve yalnız ekranda görünenle plan yapar; nişanı mükemmel olduğu için geç oyun sayıları insana göre iyimserdir.
- Lazer dalı birleşince kamp dekoru çizilmez oldu (prizmalar çizim listesinde kampın "6" türünü almıştı); bkz. [[2026-10-02-birlesmeden-sonra-her-sahneye-bak]].
- Ses (uğultu, ipuçları) hiç dinlenmedi; gerçek fareyle his yalnız Yusuf'un ölçebileceği bir şey.

## İlgili
[[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]], [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]]
