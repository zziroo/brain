---
type: decision
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, hikaye, kamp, arayuz, gecisler, gokyuzu]
source: Claude Code oturumu 72fd0708 (incremantal-game); Yusuf'un ikinci oynama geri bildirimi; hikâye yazarı, bağlama, geçiş ve gökyüzü ajanlarının raporları
---

# Kamp bir hikâye anlatır (F ile konuşma, plaka, günce), sahne geçişleri yumuşar, gökyüzü ekranı durumları ayırt eder

## Bağlam
Yusuf: "kamp güzel, konuşmalar artabilir, hikâye gibi yapılabilir", "kampa giriş çıkış animasyonları biraz sert, direkt başlıyoruz direkt kampa dönüyoruz", "geliştirme ekranı daha canlı olsun; seçimler, alımlar, alınamayan şeyler daha belirgin olsun."

## Karar
### Hikâye
- **Hikâyenin özü** (`js/story.js` başındaki "story bible"): sönen her ışık yolunu kaybetmiş bir ruhtur; ışık tutulunca hatırlar, kıvılcım bırakır ve yıldız olur. Ülker son bekçiydi; yaşlanıp karanlıktan korkunca topladığı ışıkları göğe salmayı bırakıp yolun sonundaki Büyük Fener'de biriktirdi. Bekletilen ışık ekşidi; Büyük Fener çöküp Gecenin Kalbi oldu ve vadinin bütün lambalarını, sabahı da içine çekti. 4. fenerde itiraf: "Işık tutmam gerekirken ışığı tuttum." Kandil gecede doğdu, sabahı hiç görmedi, geceleri fitille sayar; annesi Fanus eski kapı fenercisi. Puhu resmî (siz) bir kayıt tutucu; gece ona yaramıştır ama oyunu sabahtan yana kullanır. Vırak'ın kardeşleri su ısınana dek çamurda uyur. Sonsöz: kuzey hâlâ alacakaranlık, iş bitmedi (kazandıktan sonraki seferlerin açıklaması).
- **Bölümler = yanan fener sayısı** (0–5), sonra sonsöz. 29 konuşma (132 satır), 79 ara söz, 46 sefer tepkisi, 7 günce sayfası; her satır `tr` ve `en` yan yana (i18n'in tek istisnası). Kimlikler kayıtta saklanır, asla yeniden adlandırılmaz. Ülker'in zinciri ve geliş sahneleri dinlenene dek sunulur (acele eden oyuncu hikâyeyi sırayla alır); diğerleri yalnız kendi bölümünde.
- **Etkileşim:** E istasyonu kullanır, **F konuşur** (sakine tıklamak da). Yeni sözü olanın başında soğuk renkli konuşma işareti. Konuşma alttaki plakada akar: portre, ad ve rol, kendini yazan satır, ilerleme noktaları; E/Boşluk/Enter/F/tık önce satırı tamamlar sonra ilerletir; yalnız Esc kapatır (P değil). **Dinlendi kuralı:** son satır tam gösterilince ya da ilk satır tam gösterildikten sonra Esc ile; ilk satır yazılırken kapatılırsa sunulmaya devam eder.
- **Tepkiler** kamp canlandıktan 0,9 sn sonra balon olarak gelir (`js/talk.js` sefer olaylarını toplar: fener, rekor, erken dönüş, pervane ısırığı, altın ruh, gölge, Kalp denemesi, iksir, takılma). Erken dönüş yalnız "başlanan yolun beşte birinden azını" alan yağ-bitti seferlerinde; süre eşiği değil.
- **Günce:** kamp ateşindeki defterde "Günce" ve "Kayıtlar" sekmeleri; okunmamış sayfa varsa ateşin üstünde işaret.
- Kayıt: `S.story = { heard, read, lastProgress }`; eski kayıtlarda Puhu/Vırak geliş sahneleri dinlenmiş sayılır.

### Geçişler (bütçe: sefer başına ≤ ~2–3 sn, girdi ≤ ~1 sn kilitli)
- Kapıdan çıkış kesintisiz: Kandil'in lambasından fenere kıvılcım sıçrar, hale 1 sn'de açılır (`KINDLE`; bu sürede yağ yanmaz, ışın açılamaz, diken emmez), kamera ve HUD yumuşakça gelir, ipuçları bekler. Girdi hiç kilitlenmez.
- Fenerden başlama: gece kapanır, "2. FENER'DEN" kartı, fenerin alevinden açılış (0,9 sn kilit).
- Yağ bitince alev iki nefeste söner, fitilden bir kor güneye (eve) süzülür — "alev nerede yakıldığını unutmaz" — özet 1,5 sn'de sayarak gelir. Fener yanınca kutlama korunur. Duraklatmadan bitirince kısa (0,45 sn).
- Kampa dönüş: ateşin ışığından açılan görüntü, kamera geri çekilir, bekçi oturduğu yerden kalkar; ~0,8 sn sonra kontrol (yürüme tuşu kısaltır); ancak o zaman sakinler konuşur (`campUp()`).
- Teleskop: göz merceğine kapanıp yıldızlara açılan iris (~0,9 sn). `prefers-reduced-motion` ile hepsi kısa düz geçiş.
- Hepsi `transit()` ile: adımlar kare döngüsünden ya da zamanlayıcıdan, hangisi önce; son adım her durumda perdeyi kaldırıp girdiyi açar (gizli sekme, istisna kilitleyemez).

### Gökyüzü ekranı
- Beş durum ilk bakışta ayrı: tamamlanan (en parlak, durgun), alınmış (seviye halkası), **şimdi alınabilir** (sıcak, nefes alan, ekrandaki en hareketli şey; imleç yalnız bunda el olur), pahalı (soğuk; kesenin bedelin ne kadarını karşıladığını gösteren yay), kilitli (küçük, karanlık, ana yıldıza noktalı ip). Sonraki kademenin soluk önizlemesi.
- Canlı gök: galaksi kuşağı, iki katman yıldız, dal renginde bulutsular, kayan yıldız, yanan çizgilerde dışa akan ışık, dal adları.
- Satın alma: ışık ana yıldızdan çizgi boyunca gelip yıldızı tutuşturur, kese geriye sayar, ses seviyeyle yükselir. Reddedilen tıklamada sallanma ve kırmızı yanıp sönme (biten bir animasyon).
- **Kör satın alma yok:** bir basış yalnız bilgileri zaten görünen yıldızı yakar (fare: üstünde durulan; kalem/dokunmatik: ilk dokunuş seçer, ikincisi alır). Açılıştan sonra 650 ms tıklama yok sayılır (teleskopa çift tık). Bilgi kutusu en az yıldızı örteceği tarafa açılır.

## Neden
- "Hikâye gibi" için sakinlerin tek satırlık tekrarlı sözleri yetmezdi; bölümlere bağlı, cevap veren ve soru açan bir hat gerekir. Hikâye, oyunun kurallarını da açıklıyor (ruh = sönmüş ışık, fener = bekçi durağı, Kalp = ekşimiş ışık) ve mevcut metinle çelişmiyor (boss ipucu "hüzmelerin arasında dur" yanlıştı, "hüzmenin içinde dur" oldu).
- E/F ayrımı: aynı istasyona hem kullanım hem konuşma bağlanınca ya konuşma zorla araya girer ya da teleskopa gitmek istenirken konuşma açılır. İki tuş, iki niyet.
- Geçişlerde bütçe: oyun ~45 seferlik; sefer başına 5 sn geçiş toplamda dakikalar eder. "Yumuşak ama hızlı" sınırı baştan kondu.
- Gökyüzünde durumun yalnız hale boyutuyla anlatılması okunmuyordu; en yüksek sesli şey "şimdi alınabilir" olmalı, çünkü oyuncunun kararı o.

## Reddedilen alternatifler
- Konuşmayı istasyonu kullanmadan önce zorla oynatmak: yıldız almaya giden oyuncuyu bekletir.
- Kapı önünde final sahnesini kapıya bağlamak: kapıdan çıkmak geri alınamaz; sahne Kandil'in sıradan konuşması olarak kaldı.
- Gökyüzünde dokunmatik düzeni geri getirmek (kalemle alınamama bulgusu için): oyun masaüstü; "ilk dokunuş seçer, ikincisi alır" yeterli.
- Bilgi kutusunu yıldızdan ayırmak (sabit panel): Yusuf bilgiyi imlecin yanında istemişti ([[ui-and-base-preferences]] hafızası); kutu yıldıza bağlı kaldı, yalnız yerleşimi akıllandı.

## Sonuçlar
- Hikâye bağlama dalı incelemesi: kritik/yüksek yok, 1 orta (erken dönüş eşiği) + 3 düşük; geçiş dalı: 3 düşük; gökyüzü dalı: 2 orta (kalıcı kırmızı yanıp sönme, kör satın alma) + 9 düşük. Hepsi düzeltildi.
- `tools/story-check.mjs` hikâyeyi başsız oynar (her konuşma tam bir kez, dinlendi kuralı, tepkiler, eski kayıtlar, adların oyunla eşleşmesi).
- Hiçbir ajan sesi dinleyemedi; hareketler kare kare değerlendirildi, 60 karede izlenmedi. Türkçe metni Yusuf'tan başka ana dili konuşan okumadı.

## İlgili
[[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]], [[2026-10-02-masaustu-oyun-wasd-hareket-fare-isik]], [[2026-10-02-paralel-ajan-dallarini-main-ile-ajana-birlestirtmek]]
