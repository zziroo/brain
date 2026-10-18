---
type: session
project: ziroo-edge
date: 2026-10-18
status: active
tags: [ziroo-edge, ziroo-net, tussle, kapis]
source: "oturum 2026-10-18 akşam (ziroo-edge): Tussle ara sayfası, kurulum adımları yan oturumu, Kapış tanıtım sayfası; commitler dc9abed, bad5151"
---

# 2026-10-18 akşam: Tussle ara sayfası tek İndir düğmesi, Kapış tanıtım sayfası

## Ne oldu
- İstek: Tussle kapısı Android/iOS ayırmadan tussle.ziroo.net'e gitsin; arkadaşlar kurulum adımlarını atlıyor. Önce ara sayfa silindi ve eski adres için Caddy yönlendirmesi yazıldı. Yusuf ara sayfayı beğendiğini söyleyince yayınlanmadan geri alındı.
- `ziroo.net/tussle/`: iki platform düğmesi yerine tek "İndir" düğmesi tussle.ziroo.net'e gidiyor (`dc9abed`, yayında).
- Kurulum kartı yan oturumda (mobil-playus) düzenlendi: adımlar sırayla vurgulanıyor, indir kilitli (`202c2ec`, OTA `0.20261018.1541` ile canlıda; [[2026-10-18-kurulum-adimlari-sirali-indirme-kilitli]]).
- `ziroo.net/kapis/` tanıtım sayfası (`bad5151`, yayında); ana sayfadaki Kapış bağlantıları oraya gidiyor.
- Karar: [[2026-10-18-tanitim-sayfasi-tanitir-kurulum-urunun-sitesinde]].

## Doğrulanan
- Canlıda curl ile: `/tussle/` sayfasında Play/TestFlight bağlantısı kalmadı, iki İndir düğmesi de tussle.ziroo.net'e gidiyor; `/kapis/` 200 dönüyor, başlığı doğru, `/kapis` adresi 308 ile `/kapis/`'e gidiyor; ana sayfada üç `/kapis/` bağlantısı var. tussle.ziroo.net'in yayındaki kodunda yeni adım açıklamaları var.
- Yerel önizlemede masaüstü ve 375 px telefon görünümü, yatay taşma yok.

## Doğrulanmayan
- Yeni kurulum kartı gerçek telefonda (Android, iPhone) denenmedi.
- ziroo-edge commitleri (`dc9abed`, `bad5151`) push'lanmadı.
