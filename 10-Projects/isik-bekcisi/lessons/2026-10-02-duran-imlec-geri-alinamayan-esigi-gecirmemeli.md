---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, girdi, kamp, inceleme, oyun-tasarimi]
source: oturum 2026-10-02 (incremantal-game), 2. inceleme turu (kamp/arayüz değişikliği)
---

# İmleci izleyen bir karakter, geri alınamayan bir eşiği duran imleçle geçmemeli

## Ne oldu
Kampta bekçi fare imlecini tıklama olmadan izliyor ve kuzey kapısından geçince koşu başlıyor (geri dönüşü yok: koşu sayılıyor, içilen iksir harcanıyor). İnceleme ajanı şunu gösterdi: imleç sayfanın üstünden tarayıcı sekmelerine giderken, ya da teleskop ekranında üstteki bir yıldızın üzerinde bırakılıp kampa dönülünce, bekçi 1,5–2 saniyede kendiliğinden kapıdan çıkıp koşu başlatıyordu. Benzer biçimde bir panel açıkken kalan hız ya da yarım kalmış "oraya yürü" işi panel kapanınca devam ediyordu.

Kendi testlerim bunu yakalamadı, çünkü hep "oyuncunun yapmak istediği şeyi" denedim; imlecin başka bir amaçla nereye gidebileceğini denemedim.

## Ders
- Sürekli girdi (imleç takibi) ile geri alınamayan sonuç (koşu başlatma, satın alma, silme) aynı yere bağlanıyorsa araya bir **niyet koşulu** koy. Burada: imleç, kamp açıldıktan sonra en az bir kez kampın içinde görülmeden izlenmiyor (`Camp.armed`); sayfadan çıkınca da izlenmiyor (`Input.away`). Klavye, dokunma ve kapıya tıklama zaten kasıtlı olduğu için serbest.
- Bir sahne örtüldüğünde (panel, ayarlar, geçiş) altındaki karakteri gerçekten durdur: hızı sıfırla, yarım işleri sil. "Güncellemeyi atla" yetmez; durum olduğu gibi bekler ve örtü kalkınca devam eder.
- Sahne açılır açılmaz gelen tıklamayı yut (0,4 sn): onu açan düğmeye yapılan çift tıklamanın ikincisi, düğmenin altındaki şeye isabet eder.
- Test ederken "oyuncu ne yapmak ister" yanında "imleç başka hangi sebeple oraya gider" sorusunu da sor: sekme çubuğu, köşedeki düğme, başka pencere, önceki ekranda kaldığı yer.

İlgili: [[2026-10-02-kamp-gezilebilir-us-ve-ayri-arayuz-kimligi]], [[2026-10-02-tikla-git-yuruyusu-koselerde-takilir-tum-alani-tara]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
