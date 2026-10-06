---
type: decision
project: isik-bekcisi
date: 2026-10-06
status: active
tags: [isik-bekcisi, fener, oyun-akisi, denge, karanlik-surusu]
source: oturum 2026-10-06 (incremantal-game, kamera + fener nöbeti), commit'ler 8b10c02, 74dc1f7
---

# Karar: fenerin son beşte biri "ışını tut" değil, Fener Nöbeti (bir kuşatma)

## Bağlam
Yusuf: "'Son ışığı kendin götür, fenere odaklan' adımı biraz gereksiz gibi geldi ama emin değilim." Mekanik: bölgedeki avın ışığı fenere kendiliğinden akıyordu (%80), kalanı başında ışın tutarak ve çağrılan ruhları yakalayarak getiriliyordu ([[2026-10-02-bekleme-kapisi-yerine-avdan-dolan-kapi]]). Botta 3.–5. fenerde bu son kısım 40–110 saniye ışın tutmak demekti: karar içermeyen bir angarya.

## Karar
Üç seçenek sunuldu (A: varmak yakar, B: 1,5 sn tutuşturma, C: kuşatma); Yusuf **C**'yi seçti. Ayrıntıları Claude belirledi:
- Akış %80'e kadar aynı. Fener hazır olunca uzaktan çağırır (parıltı nefes alır, HUD "Fener hazır").
- Işığına adım atınca **nöbet** başlar (`R.siege`): fener bekçinin ışığı ve çağrılan ruhlarla tutuşur; `SIEGE.kindle[zone]` ile hedef süre 12 / 13 / 15 / 16 / 18 s (Çayır → Harabeler). "Fener Bekçisi" yıldızı hızlandırmaya devam eder.
- Gece geri iter: yaylar hâlinde karacık dalgaları (`arcWave`, Karakoncolos'un çağrısıyla ortak), `broodGrow()` ile ölçekli; yarıda bölgenin irisi (İri Karacık / Kurukafa / karabasan / karabasan / Karakoncolos), fener başına sefer başına bir kez.
- Yeni fiil: karacık **fenere yapışır** (bekçiye değil): her biri tutuşmayı yavaşlatır, üçten fazlası geri sarar; **%80'in altına asla inmez**. Işın fenerdeyken yapışanları camdaki gibi yakar, parlama söker; fenerin kendi ışığı yalnız tutar (`HALO.floor`).
- Biter: fener yanar, menzildeki karacıklar is olur (iriler ayakta kalır), çağrılan tüm ruhlar bir anda yakalanır (src `'beacon'`: zincir ve Nakarat tepki verir, Tutuşma vermez). Toz, duvar, `LIGHTING`, 5. fenerin seferi bitirmesi eskisi gibi.
- Yarım kalırsa (yağ bitti, halkadan 1,7× öteye 1,5 s): ilerleme korunur, sonraki seferde yeniden başlar. Ölüm yok.
- Hazır olmadan önce ışık tutunca ruh çağırma kaldı (`SURGE.early: true`): yalnız nöbete bağlanınca botun oyunu ~4 sefer uzadı (bu av her bölgede gelirin parçasıymış).
- İpucu yeni anahtarla (`h_siege`): eski kayıtlar `h_beacon`'ı öğrenmiş sayıldığından nöbeti hiç görmezdi. HUD etiketi "Fener nöbeti"; `r.stall.0a` / `r.stall.3b` tepkileri yeniden yazıldı. Müzikte alçak bir davul.

## Neden
- Angarya yerine okunup cevaplanacak bir sahne: lazere bölge başına bir an, irilerle ve karacık ailesiyle aynı dil.
- %80 tabanı ve ölçekli dalgalar 2 Ekim dersini korur: zayıf oyuncu kaybetmez, daha uzun uğraşır; en kötü hâlde %80'de kalır ve güçlenip döner.
- Denge (20 tohum × 2 küme, aynı tohumlar): ana bot 36,1 → 37,1 / 36,5 → 37,0, özensiz 40,3 → 41,5. Her oyunda ~8 nöbet başlıyor, ~3 yarım kalıyor (yağ), hepsi bir iki sefer içinde tamamlanıyor; tutma süreleri hedefe yakın.

## Reddedilen alternatifler
- **A. Varmak yakar** (önerilendi): angaryayı siler ama fenere bir sahne vermez. Yusuf C'yi seçti.
- **B. Sabit 1,5 sn tutuşturma:** daha kısa bir angarya.
- **Çağrıyı yalnız nöbete bağlamak:** +4 sefer, 1. fenere güçsüz varış.
- **Dalgaları yoğunlaştırmak:** botu hiç etkilemiyor (yayları eritiyor); dalga sayıları insan eli için bırakıldı.

## Açık uç (Yusuf'un onayına)
Oyunun **şekli** değişti, uzunluğu değil: 3.–5. fenerler 1–4 sefer erken düşüyor (nöbet eski son kısımdan çok daha kısa, toplu yakalama ödüyor) ve bot Kalp'e daha az güçle erken varıp ~3,5 yerine ~7–8 denemede kırıyor. Kaldıraç nöbet değil, Kalp (`BOSS`) ve `TIER_SCALE`; bekleyen küresel yeniden dengede ele alınacak. Yusuf canlıda Kalp'te takılma hissederse `BOSS.bounty` ilk aday.

İlgili: [[2026-10-06-kamera-yakin-bekci-buyuk-arayuz-kalin]], [[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]], [[2026-10-05-karanlik-surusu-karacik-ve-karabasan]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
