---
type: decision
project: kapis
date: 2026-10-03
status: active
tags: [kapis, kill-cam, netcode, respawn]
source: oturum 2026-10-03 (web-fps-game, kill cam)
---

# Karar: Kill cam, öldürenin gözünden istemci tarafında kurulan bir tekrardır; respawn 4 sn

## Bağlam
Oyunda yalnızca öldürenin etrafında dönen bir ölüm kamerası vardı. Yusuf "kill cam" istedi; tür ve süre ona soruldu.

## Karar
- Başka bir oyuncu öldürdüğünde ölümden önceki son 3,4 sn (+0,25 sn sonrası), öldürenin birinci şahıs görüşünden 1× hızda oynatılır. Öldürenin silahı (viewmodel) ve oyuncunun kendi eski gövdesi görünür.
- **Space** tekrarı geçer, eski dönen kameraya düşer. Tekrar respawn'dan en az 150 ms önce biter.
- Dünya/kendi hasarıyla ölümde ya da 0,7 sn'den az kayıt varsa tekrar yok (dönen kamera).
- Ayarlarda "Kill cam (ölüm tekrarı)" anahtarı, varsayılan açık. Kapalıyken kayıt da tutulmaz.
- Tümü istemci tarafı: tekrar, istemcinin zaten aldığı snapshot ve olaylardan (`snap.time` anahtarlı ~5,5 sn'lik halka) kurulur. Sunucu ve protokol değişmedi.
- Tekrar sırasında canlı maç işlenmeye devam eder (skor, kill feed, entity kaydı); yalnızca canlı atış efektleri/sesleri susturulur, canlı mermiler gizlenir. Kayıtlı olaylar ikinci bir `Feedback` + `Entities` çiftiyle oynatılır.
- Respawn 3 sn → **4 sn** (`RESPAWN_MS`, `src/shared/constants.ts`); kodda sabit, Denge panelinde yok.

## Neden
- Öldürenin gözünden tekrar: Yusuf'un seçimi (Overwatch/CoD tarzı).
- İstemci tarafı: gereken veri zaten geliyor; protokol değişikliği ve sunucu yükü yok, hile yüzeyi açmıyor.
- 4 sn: Yusuf süreyi Claude'a bıraktı. 2,4 sn'lik tekrar öldürenin nereden geldiğini anlamaya zor yetiyordu; 5 sn 20 kill'lik maçta tempoyu fazla düşürürdü (Claude'un yargısı, gerçek oyuncuyla denenmedi).
- Öldürenin viewmodel'i için sahte durum predictor'a sokulmadı: yalnızca görüntü amaçlı bir `PlayerState` her karede snapshot'tan doldurulur.

## Reddedilen alternatifler
- Öldüreni canlı izleme (seyirci gibi): küçük işti ama "nasıl öldüm"ü göstermiyor; Yusuf seçmedi.
- Yalnızca mevcut dönen kamerayı geliştirmek: Yusuf seçmedi.
- 3 sn respawn içinde kalmak: ilk sürüm böyleydi (2,4 sn tekrar); kısa bulundu.
- Respawn 5 sn: tempo kaybı.
- Sunucunun tekrar verisi göndermesi: gereksiz protokol değişikliği.

## Sonuçlar / riskler
- Öldürenin silah tepkileri genel (kahramana özel animasyon, dürbün zumu yok; snapshot bu durumu taşımıyor).
- Canlı roketin uçuş sesi tekrarda duyulabilir; ölümden sonra patlayan kendi bombanın hasar sayıları tekrara karışabilir. Liste: repo `docs/POLISH.md`.
- Space aynı zamanda zıplama: doğarken basılı tutulursa zıplar.
- Sunucu gizlenmiş (cloak) düşmanı snapshot'a koymuyorsa tekrar, öldürenin kesintisiz göründüğü andan başlar.
- Dikiş ve sözleşme değişiklikleri: repo `docs/CLIENT.md` kill cam bölümü. Debug: `__kapis.killcam()`, `__kapis.skipKillcam()`.

## İlgili
- [[_overview]], [[2026-10-03-paylasilan-sim-sunucu-otoritesi-hero-dilimi]], [[2026-10-03-kapis-kill-cam]]
