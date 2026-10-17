---
type: decision
project: ziroo-edge
date: 2026-10-05
status: active
tags: [ziroo-edge, tools, games, tasarim, kapis, yayin]
source: oturum 2026-10-05 (ZZ kökü; ziroo-edge 269732a, bal-vadisi 3b087ee, incremantal-game 985e64a)
---

# Araç ve oyun listeleri ziroo-edge deposunda, ortak "neon arcade" tasarımla, tek yayın betiğiyle

## Bağlam
`tools.ziroo.net` listesi ziroo-edge `www/tools/`'taydı, `games.ziroo.net` listesi bal-vadisi deposunun `deploy/hub/` klasöründeydi ve Bal Vadisi'nin yayın betiğiyle çıkıyordu. KAPIŞ oyun listesinde yoktu. Yusuf listelerin güncellenmesini ve "afilli" bir arayüz istedi; üç tarzdan (neon arcade, sade bento, retro CRT) **neon arcade**'i seçti. İşin ZZ kökündeki oturumda yapılmasını da onayladı (iki repoya dokunan, tek projeye ait olmayan iş).

## Karar
- Oyun listesi ziroo-edge `www/games/`'e taşındı. Ortak tasarım `www/shared/hub.css`, her sayfanın teması `www/tools/tools.css` / `www/games/games.css`. Sunucuda her kökte `index.html`, `hub.css`, `<hub>.css`.
- Yayın: `bash deploy-www.sh [tools|games|all]` (varsayılan all). Dosyalar kökte gizli bir geçici klasöre (`.hub-yayin.*`) açılır, denetlenir, `mv` ile yerine konur. Doğrulama yayındaki üç dosyayı yereldekiyle bayt bayt karşılaştırır. `www/shared/hub.css` değişince `all` ile yayınla.
- bal-vadisi `deploy/deploy.sh` artık yalnız `bal-vadisi/` klasörünü yayınlar, listeye dokunmaz.
- Tasarım: koyu zemin, akan aurora ışıması, cam kartlar, oyunlarda her oyunun renginde satır içi SVG kapak (KAPIŞ nişangâh/vizör, Işık Bekçisi fener ve ruhlar, Bal Vadisi arı ve petek), araçlarda SVG ikonlar. JS yok; satır içi stil ve script yok (CSP `style-src 'self'`, `script-src 'self'`). `prefers-reduced-motion` tüm animasyonları kapatır.
- KAPIŞ ilk kart, "YENİ" rozetiyle, `https://kapis.ziroo.net/`'e gider. Kül Tahtı games altında yayında değil, listede yok.
- Yeni araç ya da oyun yayına girince kartı ziroo-edge `www/<hub>/index.html`'e eklenir.

## Neden
- İki liste tek depoda: ortak tasarım tek dosyada, bir oyunun deposu başka oyunların listesini taşımıyor.
- Saf CSS + SVG: sunucu CSP'si dış font/CDN'e ve satır içi koda izin vermiyor; `tools.ziroo.net` Ziroobank oturumuyla aynı kökende, JS olmaması XSS yüzeyini sıfırda tutar.
- Geçici klasör + `mv`: eski betik önce siliyor sonra açıyordu; yarıda kalan yayın kökü 404'te bırakabilirdi.

## Reddedilen alternatifler
- Listeyi bal-vadisi'de bırakmak: tasarım iki depoya bölünür, her yeni oyun Bal Vadisi'nin betiğini çalıştırmayı gerektirir.
- Sade bento ve retro CRT tarzları: Yusuf neon arcade'i seçti.
- İmleç takipli parlama gibi JS efektleri: tools kökündeki "inline script / HTML sink yok" kuralı ve gereksiz risk.

## Olay
Tasarım ajanı yayın betiğini sahte `ssh` ile denerken gerçek sunucuya iki kez yayın yaptı (yasaktı). Yayınlanan dosyalar incelenen çalışma kopyasıyla aynıydı ve diğer yollar etkilenmedi. Yusuf'a bildirildi, geri alınmadı. Ders: [[ajan-yayin-betigini-sahte-ssh-ile-denerken-canliya-cikti]].

## Ek: ziroo.net ana sayfası (aynı gün)
- Yusuf `ziroo.net`'te ana sayfa istedi; üç seçenekten (kapılar, kişisel sayfa, ikisi birden) **kapılar**'ı seçti. Üç kapı: Oyunlar (games.ziroo.net), Araçlar (tools.ziroo.net), Diskort (diskort.ziroo.net, indirme sayfası); altında elle güncellenen tek "Öne çıkan" şerit (KAPIŞ).
- Kapılarda sayı ya da oyun/araç listesi yok: yeni oyun ya da araç eklenince ana sayfaya dokunmak gerekmez. KAPIŞ şeridindeki "6 kahraman, botlar, 12 kişiye kadar odalar" elle güncellenir.
- DNS: joker kayıt çıplak alan adını kapsamaz; Yusuf Cloudflare'a `ziroo.net` A kaydını (gri bulut) ekledi. MX (e-posta yönlendirme) kayıtları değişmedi.
- Caddy: `config/hubs/home.caddy` (`ziroo.net` statik kök `/srv/www/home`, `www.ziroo.net` → `https://ziroo.net{uri}` 308; hedef sabit, açık yönlendirme yok). `www` ve çıplak alan adı artık ayrılmış.
- Yayın: `bash deploy-www.sh [tools|games|home|all]`, `all` üçünü birden yayınlar. ziroo-edge `ea3c49f`; sertifikalar alındı, canlı smoke 64/64 geçti (2026-10-05). Reload sesli kanalda 2 kişi varken yapıldı (Yusuf onayıyla); hemen sonra LiveKit katılımcı sayısı yine 2 idi (kısa kopma olup olmadığı loglardan doğrulanmadı).
- Reddedilen: kişisel/portfolyo sayfası ve karma sayfa (Yusuf kapıları seçti); kapılarda sayı/liste (bakımı üç yere bölerdi).

## Ek: araçların kendi arayüzleri (aynı gün akşam)
- Yusuf araçların kendi arayüzlerinin de bu temaya benzemesini istedi ("tematik, çok hareketli olmak zorunda değil") ve yolu Claude'a bıraktı.
- Karar: her araç kendi CSS dosyasında temanın renklerini, font yığınlarını ve kendi kart vurgusunu (`tools.css`'teki `.t-<ad>`) taşır; `hub.css`'e bağlanmaz. Arka plan ışığı sabit; hareket yalnız hover/basma, `prefers-reduced-motion` ile kapanır. Her sayfanın altında `← Araçlar · ziroo.net` footer'ı (`https://tools.ziroo.net/`).
- Neden: her araç kendi deposundan tek başına yayınlanıyor ve yerelde de çalışmalı; ortak dosyaya bağlanınca `hub.css` değişikliği altı aracı birden bozabilirdi. Tema sürüklenmesi riski kabul edildi: `hub.css` renkleri değişirse araçlar elle güncellenir.
- Reddedilen: araçlardan `/hub.css`'e bağlanmak (aynı kökende olduğu için CSP izin verirdi, ama sınıf adları çakışır ve araçlar yerelde temasız kalır); liste sayfalarındaki gibi hareketli ışık bulutları (Yusuf sakin istedi, araçlarda içerik önde).
- Çeviri Aracı'nda yalnız web indirme sayfası; Electron arayüzü kapsam dışı (yeniden paketleme gerekir).
- Oturum: [[2026-10-05-araclarin-arayuzu-neon-temaya-gecti]].

## Önceki kararlar
Oyun listesinin yeri için [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]] notundaki "Oyun listesi `bal-vadisi` deposunda" kısmının yerini alır; o notun geri kalanı geçerli.
