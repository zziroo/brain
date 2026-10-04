---
type: lesson
project: song-finder
date: 2026-10-04
status: active
tags: [song-finder, ders, ortam, ajan, curl]
source: oturum "Benzer şarkı bulma aracı" (2026-10-03/04)
---

# Bu oturumda zaman kaybettiren deneme ve ajan tuzakları (Windows + Git Bash + alt ajanlar)

- **`python3` asılı kalır.** Bu makinede `python3`, Microsoft Store kısayoludur; `python3 -` girdi bekleyip sonsuza dek açık kalır. Bir alt ajan böyle bir komut bıraktı, 20 dakika sonra elle durduruldu. Ajan talimatına "python kullanma, node kullan" yaz. (Diskort notu: [[dev-ortami-tuzaklari]].)
- **Ajanların kabuk katmanı `\\` → `\` yapıyor.** İki ayrı ajan regex'leri bu yüzden bozdu ve sonradan onardı. Talimata "düzenlemeleri Edit/Write ile yap, sed/heredoc kullanma" yazmak ve inceleme ajanına regex'leri karakter karakter okutmak işe yaradı. Ayrıntı: [[ajan-arac-tuzaklari-ters-egik-cizgi]].
- **Git Bash'te `curl -d` Türkçe karakteri bozar.** `{"q":"Barış Manço - Dönence"}` gövdesi sunucuya bozuk gitti; `node -e "fetch(...)"` ile `\u` kaçışlı gönderince çalıştı.
- **`Secure` çerez, `http://127.0.0.1` üzerinden curl çerez kavanozuyla geri gönderilmez.** Sunucu içinden canlı denemede giriş 200 dönüp sonraki istek 401 verdi. `Set-Cookie` başlığından değeri alıp `Cookie:` başlığıyla elle göndermek gerekti (`X-Forwarded-Proto: https` ile).
- **API alan adını koddan doğrula.** Arama gövdesindeki alan `q` idi; `input` sanıp iki deneme boşa gitti.
- **Tarayıcı panelinde koordinatla tıklama ıskalayabilir.** Bir arama hiç başlamadan 8 dakika beklendi. `find` ile `ref` alıp ona tıkla ve ilerleme ekranını gör, sonra bekle.
- **"Sonuç dosyası oluşana kadar bekle" döngüsü, iş hiç başlamadıysa zaman aşımına kadar sessizce bekler.** Beklemeden önce işin başladığını (jobId, ilerleme) doğrula.
- **Yayın konteyneri yeniden başlatır.** `deploy.sh` çalışırken süren arama yarıda kesilir (işler bellekte).

Bağlantı: [[10-Projects/song-finder/_overview|Song Finder]]
