---
type: session
project: tussle
date: 2026-10-19
status: done
tags: [tussle, oturum, denge, oda-kilidi, tema, iap, canli-mac, yayin]
source: oturum "tussle: denge partisi, oda kilidi, tema düzeltmeleri" (2026-10-19, Mac)
---

# Oturum: tema düzeltmeleri, canlı maç kuralı, Play TR fiyatı, denge partisi, oda kilidi

## Ne yapıldı (yayın sırasıyla)
- **`43fd2d8` tema:** koyu temada oda üstü "bugün" satırı `--ink` ile çiziliyordu (okunmuyordu) → `--text`; açık temada sezon gün kutularının çizgisi sarıda kayboluyordu → sabit mürekkep tonu `--day-line`. Satın alma hatası artık client-errors'a yazılır.
- **`6ea29e6` ana sayfa yüzleri:** kart önizlemesi sezon sırasıyla (oda sahibi önce değil); yığında ilk yüz üstte, fotoğraflı/harfli fark etmeden (fotoğraflı `position: relative` yüzünden üstte çiziliyordu).
- **`705c4a2` canlı maç + parti lobisi:** [[2026-10-19-canli-macta-eski-surum-oynar-sonucu-sayilmaz]]; n/32 rozeti → Katılanlar sayfası, dolu parti kırmızı rozet + "Parti dolu", parti panelinde "N rastgele · havuz M", akışta uzun bas bırakması kart düğmesine tıklamaz.
- **`66b035f` Play TR fiyatı:** [[2026-10-19-play-hak-paketleri-tr-fiyati]], ders [[2026-10-19-play-urunu-bolgede-yoksa-product-not-found]].
- **`bef09c5` Lane Dash v5:** Playus "Lane Rush" videosu ölçüldü (metre sayacı: ~22 sn'de ×2,3, ~24 sn'de kaza) → ortak tempo [[2026-10-19-sonsuz-oyun-tempo-hedefi]].
- **`fb9f2dd` denge partisi:** 13 ajan, 33 oyun (tablo aşağıda). Üç inceleme: kritik/yüksek yok; Jetpack'te arama planlayıcısı uç ayarlarda kapanmış diziler buldu → boşluk tabanları + `tests/jetpack-solve`. Balance'ta step() içi kutulama bulundu → ders [[2026-10-19-sim-step-te-gizli-heap-number-ve-gec-dal-gc-testi]].
- **`a13755b` sohbet:** akış satırlarında isim kalın, gövde bir ton koyu, saatler küçük ama kalın (Playus gibi).
- **`b84ad84` Swing ipucu:** ilk uçuşlarda "Dokun: yakala!" (yalnız görünüm).
- **`c81a8b7` + `c9971b8` İngilizce oyun kimlikleri:** yan oturumda yapıldı ([[2026-10-19-oyun-kimlikleri-ingilizce-kebab-case]]), buraya birleştirildi; göç 22.
- **`fc70f52` oda kilidi:** [[2026-10-19-oda-ilk-arkadas-katilana-kadar-kilitli]]. Yayın: sunucu `fc70f52`, OTA 0.20261019.1253, DB 22 canlıda doğrulandı.
- Diğer: iCloud yedek hatası geçiciydi (elle çalıştırma temiz); açık geri bildirim yoktu; kapalı testte 12 testçi tamam.

## Denge partisi özeti (eski → yeni; insan değerleri tahmin)
- Rampa yavaş: Lane Dash ×2 40→25 sn, tavan 70→50; Bounce ×2 65→34, tavan 92→45, cap 180→90; Jetpack 35 sn sonrası ikinci rampa + geç sıkışma; Chain insan 64→~35 sn; Spike Wall tavan ~49 sn; Stack tavan 54.→31. kat, cap 90; Snake bilerek yumuşak (tavan 65→38 sn); Four Arrows yalnız cap 90 (rampa zaten sıkıyordu).
- Plato kaldırıldı: Balance (cap 180→90, rüzgâr 30 sn'den sonra artar), Trace (insan 61→~36), Hop, Arrow Wall, Road Rush, Zigzag, Flutter, Slice, Spiral, Pinata (bölge daraltma yerine salınım genişler), Odd One Out, Flip Match (~55→~32 sn, adım 50).
- Zor başlangıç: Bridge (pencere 244→622 ms), Sort It (belirsiz: ölüm yanlış kutudan olabilir), Chop, Beat, Swing, How Many.
- Süreli: Target 79→~41, Double Tap 84→~39 (isabet süresi azalır, taban 30).
- Yalnız cap 90: Color Match, Quick Math, Make 10, Keep Up, Right Door.

## Öğrenilenler
- [[2026-10-19-play-urunu-bolgede-yoksa-product-not-found]]
- [[2026-10-19-sim-step-te-gizli-heap-number-ve-gec-dal-gc-testi]]
- Paralel ajanlarda `git stash` yine oldu: [[2026-10-15-ajanlar-ortak-calisma-kopyasinda-git-stash-yasak]] güncellendi.

## Açık kalanlar
- Cihazda: oda kilidi (kur, davetle katıl, push), yeni oyun temposu hissi, Swing ipucu, parti lobisi ve gerçek partide "sonuç sayılmadı", Android satın alma (TR eklendi, yeniden denenmedi).
- Yayından sonra sürüm bazlı insan medyanı (balance-report); Sort It log replay ile ölüm nedeni.
- "Herkes için zar" (Playus fikri: satın alan rekorunu geçince odaya hak açılır, geçemezse devreder): ücretli/ücretsiz kararı Yusuf'ta.
- Oda kilidi notları: kilitliyken bulanık kapak gerçek ilk oyun değil (seed-0 seçimi); yan panelde görünüm geçişleri test edilemedi (bölme gizliyken View Transition takılıyor).
