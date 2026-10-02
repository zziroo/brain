---
type: decision
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, oyun-tasarimi, arayuz, kamp, npc]
source: oturum 2026-10-02 (incremantal-game); Yusuf'un ilk oynama geri bildirimi
---

# Kamp gezilebilir bir üs oldu, arayüze oyuna özgü bir kimlik verildi, yıldız bilgisi imlecin yanında açılıyor

## Bağlam
Yusuf ilk sürümü oynadıktan sonra üç şey söyledi:
1. Koşu bitince doğrudan geliştirme ekranının gelmesi kötü. Kampa dönünce "base gibi" bir alan olsun, orada bir şeylerle etkileşsin, beceri ağacı bile bir etkileşimle açılsın; NPC'ler ve ilginç şeyler olabilir.
2. Genel arayüz diğer oyuna (Bal Vadisi) çok benziyor; arayüz için ayrı çalışma yapılsın.
3. PC'de ağaçta gezerken bilgi paneli en sağda duruyor, oraya bakmak garip; bilgi, üzerine gelinen yerde açılsın.

## Karar
- **Kamp bir mekân:** koşudan sonra bekçi kamp ateşinin yanında uyanır ve yürür. Kullanma: yaklaş + E / Boşluk / Enter, tıkla ya da dokun.
  - Teleskop (Ülker, eski bekçi) → gökyüzü / beceri ağacı.
  - Kuzey kapısı → içinden yürümek koşuyu başlatır (kamptan başlarken geçiş kesintisiz). Kandil (kirpi fenerci) → yanan fenerlerden başlangıç seçimi.
  - Puhu (baykuş, 1. fenerden sonra) → istek panosu: 3 görev, ödül kıvılcım ya da yıldız tozu.
  - Vırak (kurbağa, 2. fenerden sonra) → kazan: 3 iksirden biri, yalnız bir sonraki sefer için; ardından 2 sefer bekleme.
  - Kamp ateşi → seyir defteri (istatistik, yakalananlar).
  - Kamp ilerlemeyle büyür: her fener için bir fener direği ve kapı süsünde bir lamba.
- **Arayüz kimliği ("gece atlası"):** serif ve aralıklı küçük büyük harf, ince çift çerçeveli plakalar, çentikli düğmeler, emoji yerine kendi çizgi ikon seti (43 ikon, hem canvas hem DOM), yağ göstergesi yanan bir fitil, sağ kenarda fenere uzaklık cetveli. Sıcak renk yalnız ışığa ait (fitil, kıvılcım, ana eylem); çerçeve soğuk tonlarda.
- **Yıldız bilgisi:** üzerine gelinen yıldızın hemen yanında açılan kutu (sağda yer yoksa solda). Farede tıklamak yakar; dokunmatikte kutu alta yerleşir ve kendi düğmesi olur.

## Neden
- Referans türde (Shelldiver, Rock Bottom) koşular arasında bir "ev" var: dükkân, eritme ocağı. Üs, koşu döngüsüne nefes ve aidiyet katıyor; NPC'lerin gerçek işlevi olmazsa yalnızca menü kılıfı olurlardı, bu yüzden görev ve iksir eklendi.
- Sakinlerin fenerlerle birlikte gelmesi, ilerlemeyi kampta gözle görülür kılıyor ve sistemleri tek tek tanıtıyor.
- Aynı sitede iki oyun aynı düğme/ikon dilini paylaşınca tek şablondan çıkmış gibi görünüyordu; emoji ve "alt çıkıntılı altın düğme" tam olarak ortak olan şeylerdi.
- Kampta kamera sabit (kamp ekrana sığıyorsa): imleçle bir şeyi göstermek ona gitmek demek. Kamera kayarken imlecin dünya konumu da kaydığı için tıklanan yere yürüme bozuluyordu.

## Reddedilen alternatifler
- Kampı yine menü yapıp yalnız görselini değiştirmek: Yusuf'un istediği etkileşim değil.
- Her seferde zorunlu iksir seçimi: her döngüde angarya olurdu; birkaç seferde bir hazır olan parti seçildi.
- Kıvılcımla satın alınan tek kullanımlık iksirler: denge yükü ve "biriktirme" isteksizliği.
- 5 fenerin her biri için ayrı işlevli NPC: kapsam büyür, geri bildirim bulanır; iki işlevli sakin + büyüyen kamp süsleri yeterli görüldü.
- Web fontu: sitenin CSP'si engelliyor ve dosya indirmek gerekirdi; sistem serif yığını kullanıldı.
- Yıldız bilgisini canvas'a çizmek: metin sarma ve dokunmatik düğme için DOM daha sağlam.

## Sonuçlar
- Döngü başına ~10-15 sn kamp yürüyüşü eklendi; bot ölçümünde istek + iksir oyunu ~%10 hızlandırıyor (45 koşu / 60 dk'ya karşı 51 / 65), ikisi kabaca birbirini götürüyor.
- Yusuf'un isteğiyle inceleme bittikten sonra yayına alındı (2026-10-02 16:34, commit `5efa47b`).

## İnceleme sonrası eklenen kurallar
Kampın yürünebilir olması iki yeni hata sınıfı getirdi; ikisi de incelemeyle bulundu ve kurala bağlandı:
- **Kapıdan çıkış geri alınamaz**, bu yüzden hiçbir şey bekçiyi yanlışlıkla çıkaramaz: imleç ancak kampın içine girdikten sonra izlenir, örtü açıkken bekçi durur ([[2026-10-02-duran-imlec-geri-alinamayan-esigi-gecirmemeli]]).
- **Tıklayıp gitme düz çizgide yürümez**: engellerin etrafından dolaşır, kapıya kapı ağzından gider; yerleşim değişince `campSweep()` taraması çalıştırılır ([[2026-10-02-tikla-git-yuruyusu-koselerde-takilir-tum-alani-tara]]).
- İstekler oyuncunun olağan bir seferine göre boyutlanır (boss ödülü ve iksirli seferler hariç) ve 4 seferdir ilerlemeyen istek değişir; aksi hâlde oyun bitince pano ulaşılamaz isteklerle doluyordu.

## İlgili
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-isik-bekcisi-tasarim-kararlari]]
