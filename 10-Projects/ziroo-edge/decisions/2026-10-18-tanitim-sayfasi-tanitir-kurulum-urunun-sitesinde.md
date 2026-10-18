---
type: decision
project: ziroo-edge
date: 2026-10-18
status: active
tags: [ziroo-edge, ziroo-net, tussle, kapis, tanitim-sayfasi]
source: "oturum 2026-10-18 akşam (ziroo-edge): Tussle ara sayfası ve Kapış tanıtım sayfası; commitler dc9abed, bad5151, yayın deploy-www.sh home"
---

# Karar: ürün tanıtım sayfası ürünü tanıtır, kurulum adımları ürünün kendi sitesinde

## Bağlam
Arkadaşlar Tussle'ı kurarken kapalı testin 1. (Google grubu) ve 2. (Play'de testçi ol) adımını atlayıp doğrudan Google Play'e gitti. `ziroo.net/tussle/` sayfasının üstündeki büyük "Android" düğmesi doğrudan Play test linkine gidiyordu; grup adımı yalnız küçük not satırındaydı. tussle.ziroo.net'in kurulum kartında da son "indir" düğmesi hep vurguluydu.

## Karar
- `ziroo.net/tussle/` kalır (Yusuf ara sayfayı beğeniyor), ama Android/iOS ayrımı yok: üstte ve altta tek "İndir" düğmesi `https://tussle.ziroo.net/`'e gider. Alttaki iki platform paneli tek panele indi. Kurulum adımlarını yalnız tussle.ziroo.net'teki kart anlatır (bkz. [[2026-10-18-kurulum-adimlari-sirali-indirme-kilitli]]).
- Kapış da aynı şablonla tanıtım sayfası aldı: `ziroo.net/kapis/`. Ana sayfadaki üç Kapış bağlantısı oraya gidiyor (kapı "İncele", hikâye bağlantısı "Kapış"). İki "Oyna" düğmesi `kapis.ziroo.net`'e gidiyor. Sayfada bilgisayarda klavye ve fareyle oynandığı, telefonda oynanmadığı, Opera'da hareket tuşlarının takılabildiği yazıyor.
- Üç ürünün üçünün de tanıtım sayfası var (`/tussle/`, `/kapis/`, `/diskort/`, şablon `www/home/urun.css`, renkler `.u-<ürün>`).

## Neden
- Adımları iki yerde anlatmak ikisini de bozuyordu: ara sayfa adım atlatıyordu, kartla tutarlı kalmıyordu. Tek kaynak kurulum kartı.
- Kapış telefonda açılınca oynanmıyor; tanıtım sayfası bunu oyuna girmeden söylüyor ve öteki iki ürünle aynı düzende duruyor.

## Reddedilen alternatifler
- Ara sayfayı kaldırıp kapıyı doğrudan tussle.ziroo.net'e bağlamak: önce böyle yapıldı (yayınlanmadan geri alındı), Yusuf ara sayfayı istedi.
- `ziroo.net/tussle/indir/` adında ayrı, adım adım indirme sayfası: Yusuf istemedi; adımlar tussle.ziroo.net'te zaten var.
- Adımları ara sayfanın kendi içinde büyütmek: yine iki kaynak olurdu.

## Sonuçlar / riskler
- Kurulum değişirse (mağazaya çıkış) yalnız mobil-playus `src/shared/install-links.ts` güncellenir; ara sayfada platforma özel link kalmadı.
- Kapış sayfasındaki bilgiler (6 kahraman, 7 tema, kontroller) web-fps-game `docs/DESIGN.md`'den alındı; oyun değişirse sayfa elle güncellenir.

## İlgili
- [[2026-10-18-ziroo-net-iki-sira-kapi-bolumler-ve-urunler]]
- [[2026-10-18-tussle-kapisi-ve-kapis-tanitim-sayfasi]]
