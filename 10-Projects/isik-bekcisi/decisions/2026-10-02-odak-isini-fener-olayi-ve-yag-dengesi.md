---
type: decision
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, oyun-tasarimi, denge, beceri, fener]
source: oturum 2026-10-02 (incremantal-game); Yusuf'un ikinci oynama geri bildirimi
---

# Fenere iki mod (odak ışını), atılım becerisi, fenerin kendiliğinden dolması ve derinlikle hızlanan yağ

## Bağlam
Yusuf kamp sürümünü oynadıktan sonra dört şey söyledi, kararı Claude'a bıraktı ("öneri sunuyorum, sen karar ver"):
1. Fener doldurma çok uzun sürüyor, orada yapacak bir şey kalmıyor.
2. Fener iki modlu olabilir: yoğunluğu artıp baktığı yöne uzasın; oyuna hareket katar.
3. Parlama görsel olarak iyi; daha aktif, animasyonlu etkileşimler ve Shelldiver'daki gibi karakter becerileri olabilir.
4. Bir yerden sonra yağ hiç bitmiyor (70+ sn), bölgenin sonuna rahatça varılıyor, ruh toplamaya gerek kalmıyor.

## Karar
- **Odak ışını (temel beceri, baştan açık):** fare basılı tutulunca (F, dokunmatikte düğme) hale yarıya iner, ışık imlecin yönüne 2,3 kat uzanan bir koni olur ve 2,6 kat güçlü vurur; bekçi yavaşlar. Eski "Odak" yıldızı artık ışının gücünü artırıyor ("Mercek").
- **Atılım (yeni yıldız, Adım kolu):** Shift / sağ tık. Kısa hamle; içinden geçilen her şey yanar, pervaneler dokunamaz. 6 sn bekleme.
- **Parlama** artık yalnız Boşluk (tık odaklamaya verildi).
- **Fener:** önündeki bölgede yakalanan her ruhun ışığı fenere kendiliğinden akar (%80'e kadar). Son %20 fenerin başında tamamlanır: ışık fenere tutulur (ışın en hızlısı) ve fenerin çağırdığı ruhlar yakalanır; her biri feneri besler.
- **Yağ:** bölge derinleştikçe daha hızlı yanar (×1 / 1,35 / 1,9 / 2,5 / 3,2). Seferler oyunun her aşamasında ~35–45 sn.
- **Denge:** yıldız maliyetleri biraz arttı (`TIER_SCALE`), Gecenin Kalbi'nin canı 600 bin → 1,5 milyon (ışın ona da işliyor). Bot: ~43 sefer / ~50 dk (önce ~44 / ~58).

## Neden
- Bekleme şikâyetinin kökü, fenerin tek kaynağının "yanında durmak" olmasıydı. Kaynağı bölgedeki avlanmaya bağlayınca fener, zaten yapılan işin sonucu oluyor; başında geçen süre kısa ve olaylı kalıyor.
- Işın, mevcut mekaniklerle kendiliğinden etkileşiyor: ürkek ruhlar haleden kaçar ama ışın onlara uzaktan yetişir; pervaneler gelmeden yakılabilir; hale küçüldüğü için etraf karanlıkta kalır (risk).
- Yağ, yükseltmelerle bölgelerden hızlı büyüyordu. Yanma hızını bölgeye bağlamak, mevcut yağ yıldızlarını değersizleştirmeden sınırı geri getiriyor.

## Reddedilen alternatifler
- Fener enerjisini yalnızca düşürmek: bot fenerleri güçsüzken art arda yakıp son bölgede tıkanıyordu (165+ sefer).
- Fener başında yalnız ışın + çağrılan ruhlarla doldurmak, enerjiyi büyütmek: süre yine uzundu (2. fener için ~3 dk).
- Işına ek yağ maliyeti: zaten hale ve hız kaybı var; üçüncü bir bedel kullanmayı caydırırdı.
- Yakalanan ruhun yağ vermesi (temel mekanik olarak): mevcut "Damla" yıldızıyla çakışıyordu.
- Daha fazla aktif beceri (üçüncü, dördüncü): önce bu ikisinin hissi denenmeli.

## Sonuçlar
- Oyun botla ~%15 kısaldı; beklemenin çıkmasından geliyor. İnsan süresi hâlâ ölçülmedi.
- Bağımsız inceleme: kritik/yüksek yok, 2 orta (iki fare tuşuna birlikte basınca atılımın kaybolması, ışının takılı kalması) + 9 düşük; düzeltildi (commit `6ec661a`). Yayına alınmadı: Yusuf'un kararı.
- Eski kayıtlar çalışır; yarım kalmış fener ilerlemesi yeni enerji tablosuna oranlanır (dolu olan yüzde korunur, kayıt sürümü 2).
- Fare tıklaması artık parlama atmıyor: eski oyuncuya ipucu gösteriliyor.

## İlgili
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[2026-10-02-isik-bekcisi-tasarim-kararlari]], [[kosu-tabanli-incremental-shelldiver-rock-bottom-analizi]]
