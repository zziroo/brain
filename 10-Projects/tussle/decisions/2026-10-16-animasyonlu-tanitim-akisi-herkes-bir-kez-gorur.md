---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, onboarding, giris, animasyon, gorsel]
source: "oturum 2026-10-16 (mobil-playus): tussle animasyonlu tanıtım akışı"
---

# Karar: Giriş ekranı 4 animasyonlu tanıtım slaytı + isim formu; herkes bir kez görür

## Bağlam
Giriş tek sayfaydı (marka üçlüsü, logo, slogan, 4 kapak, isim formu). Yusuf ilk açılış için Playus'un tanıtım akışı gibi "güzel animasyonlu" bir şey istedi, birebir kopya olmadan (Playus ekran görüntüleri: atari makinesi + ışın, kapak satırları, "tek bir kazanan", bildirim izni, yaş seçici, Google/Apple girişi).

## Karar
- Commit `114db8f`: 5 slayt tek şeritte. 1 Hoş geldin (marka üçlüsü `hello`, dönen ışın disk, zıplayan üçlü), 2 "Herkese aynı oyun" (gerçek kapaklar 3 eğik satırda dalga + sallanma), 3 "Sezonun şampiyonu ol" (kürsü, taç düşünce konfeti, süs sayaç), 4 "Canlı kapış, parti kur" (çarpışma + yarış şeridi), 5 mevcut isim formu (davranışı aynen).
- Her slayt: başlık + tek kısa cümle; sezon süresi, puan kuralı, sabit saat yazılmaz.
- Daha canlı: slayt başına arka plan tonu (opaklık geçişi), kaydırmada paralaks, göz kırpan/zıplayan yüzler, boşta İleri dürtmesi.
- **Menüde sürekli hareket istisnası** `docs/VISUAL.md` §3'e yazıldı: döngüler yalnız etkin slaytta, azaltılmış harekette kapalı, yalnız transform/opacity, rAF yok.
- **Herkes bir kez görür**: `tussle.introSeen` (localStorage) form ilk görülünce yazılır; sonraki açılış forma gelir. Davet linki (`?oda=`) ilk kez gelende tanıtımı atlamaz.
- **Android geri tuşu** bir önceki slayda döner: `src/client/back-intercept.ts` dikişi (`setBackInterceptor` / `releaseBackInterceptor` / `interceptBack`), `native.ts` önce bunu sorar; ilk slaytta eski davranış (geri / arka plana al).
- Yaş sorusu ve bildirim izni sayfası yok (push yok, reklam yok).

## Neden
- İlk izlenim: Yusuf "buralar daha canlı olsun, ilk giriş sonuçta" dedi; istisna yalnız tanıtıma, menülerin geri kalanı kurala bağlı.
- "Herkes bir kere görsün": davetle gelen de oyunun ne olduğunu bir kez görmeli.
- Metinler: "14 gün" yanlış olurdu (oda süresi ayarlanır, herkes bitirince sonraki gün erken başlar); sade cümle yanlış iddia taşımaz.
- Geri tuşu Android'de beklenen davranış.

## Reddedilen alternatifler
- Playus'un öğeleri (atari makinesi, defne "1M+", yaş seçici, bildirim anahtarı): telif/kimlik; yaş ve bildirim de şimdilik gereksiz.
- Davet linkinin tanıtımı atlaması (Claude önerdi): Yusuf herkesin bir kez görmesini istedi.
- İlk turdaki ayrıntılı metinler ("genelde 14 gün", puan kuralları): sadeleştirildi.
- Menülerde döngü yasağını tanıtımda da sürdürmek: daha cansız bir ilk izlenim.

## Sonuçlar / riskler
- Yusuf: sezon ve kapışma slaytlarındaki düz daire yüzler "çok düz, AI gibi"; ilk iki slayt daha iyi. Tanıtım şimdilik yayında, sonra genel bir elden geçecek.
- Doğrulanmayan (`unverified`): gerçek telefonda akıcılık (2. slaytta 21 ayrı hareketli kapak), Android donanım geri tuşu, çentikte güvenli alan.
- İnceleme notu (düşük): sürüklemede `--ob-pos` her `pointermove`'da tüm şeritte stil hesabı yapar; zayıf telefonda takılırsa yalnız yakın slaytlara yaz.

## İlgili
- [[_overview]] · [[2026-10-16-tussle-animasyonlu-tanitim-akisi]] · [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]] · [[2026-10-12-oyun-sahnesi-sade]] · [[2026-10-16-tanitim-animasyonu-gizli-bolmede-donar-headless-kayit]]
