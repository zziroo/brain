---
type: resource
project: oyun-tasarimi
date: 2026-10-04
status: active
tags: [oyun-tasarimi, ders, zorluk, dusman, isik-bekcisi]
source: Claude Code oturumu 82134d2a (2026-10-04); Yusuf: "ilk etaplarda zorluk yok, ışığı odaklamak bir düşmanı öldürmüyor"
---

# Ders 2: Zorluk düşmandan gelmez; direnç, bedel ve ustalık farkından gelir

## Üç bileşen
1. **Direnç:** oyuncunun hedefine bir şey karşı koyuyor mu? (düşman, kaçan hedef, zaman, arazi)
2. **Bedel:** başaramazsan ne kaybedersin? Bedel yoksa zaman baskısının dişi olmaz.
3. **Ustalık farkı:** iyi oynayanla kötü oynayan arasında sonuç farkı var mı? (*skill ceiling*)

Tetris ve Celeste'de neredeyse hiç düşman yok ama ikisi de zordur. Doğru soru "düşman ekleyelim mi" değil, "bu oyunun fiiline hangi direnç uyar".

## Işık Bekçisi'nin Çayır'ı (2026-10-04 kodu)
- Direnç yok: `MOTH_EVERY[0] = 0`, kabuklu `SHELL_CHANCE[0] = 0`; pervane Orman'da, kabuklu Bataklık'ta, gölge Harabeler'de başlıyor. Ruhlar ışığa girince direnmeden dolar.
- Bedel yok: sefer sonunda kayıp yok (cozy kararı, [[2026-10-02-isik-bekcisi-tasarim-kararlari]] madde 7).
- Ustalık farkı az: nişan yok, çember içindekilerin hepsi dolar.
- Sonuç: ilk ~5 sefer (bot 1. feneri ~5. seferde yakıyor) "gelir toplama" gibi hissettiriyor. İlk izlenim oyunu belirler.

## İlgili kavramlar
- **İlk bölge öğretme bölgesidir:** Mario 1-1'de ilk Goomba birkaç saniye içinde gelir. Tehdidin en basit hali ilk bölgede tanıtılmalı.
- **Güç eğrisi ile zorluk eğrisi:** incremental'da oyuncunun gücü üstel büyür; direnç onunla büyümezse oyun erir ("yağ hiç bitmiyor" şikâyetinin de kökü bu).
- **Çatışma temadan doğmalı:** ışık oyununda doğal düşman karanlığın kendisidir; "öldürmek" yerine "dağıtmak" aynı tatmini verip türü dövüş oyununa çevirmez.
- **En ucuz gerilim kaynağı kayıp cezasıdır**, ama rahat (cozy) hisle çatışır; bilinçli bir takas.

## Işık Bekçisi için konuşulan seçenekler
- **A. Gece'nin kendisi düşman:** çembere sürünen karanlık yaratıklar haleyi/yağı kemirir; hale yavaşlatır, ışın eritir. Çayır'da yavaş ve az, derinde hızlı ve çok. Işına ilk dakikadan amaç verir.
- **B. Ruhlar avlansın:** bazı ruhlar ışık değince kaçar, çemberden çıkar; takip, köşeye sıkıştırma, ışınla uzaktan bitirme. Bataklık'taki ürkeklerin yumuşak hali.
- **C. Ustalık ödülü:** kopunca sıfırlanan zincir, sefer içi mini hedefler; iyi oynayan daha çok kazanır, kötü oynayan yine ilerler. Tek başına tehlike hissi vermez.
- Claude'un ilk önerisi: A omurga + Çayır'da B'nin hafif hali. Karar Yusuf'un.
- **Güncelleme (aynı gün):** Yusuf, Bataklık'taki kaçan ruhların oynarken iyi hissettirmediğini söyledi; B bu haliyle düştü. Nedeni ve geç oyun gözlemleri: [[ders-03-guc-ancak-direncle-hissedilir]].

İlgili: [[30-Resources/oyun-tasarimi/_index|Oyun tasarımı dersleri]], [[ders-01-ic-ice-donguler]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
