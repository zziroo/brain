---
type: decision
project: ziroo-edge
date: 2026-10-03
status: active
tags: [diskort, dns, caddy, sunucu, tools, games, ziroobank, guvenlik]
source: oturum 2026-10-03 (ziroo-edge, geçiş runbook'u docs/gecis-tools-games-alt-alan-adlari.md)
---

# Diskort dışı projeler diskort.ziroo.net altından çıkıp joker DNS ile tools.ziroo.net ve games.ziroo.net alt alan adlarına taşındı

## Bağlam
Steam paneli, Çeviri Aracı, Ziroobank ve iki oyun `diskort.ziroo.net/tools` ve `/games` altında yaşıyordu ([[2026-10-02-caddy-ortak-site-klasoru]], [[2026-10-03-caddy-ziroo-edge-projesine-ayrildi]]). Diskort'un adresi başka projelerle karışıyor, yeni proje eklemek her seferinde alt yol sorunu ve Diskort sunucusuna dokunmak demekti.

## Karar
- **DNS:** Cloudflare'da `*.ziroo.net` A → sunucu IP'si (gri bulut). Yusuf açık `diskort`, `lk`, `turn`, `kapis` kayıtlarını sildi; hepsi jokerle çözülüyor. Yeni alt alan adı için DNS gerekmez. Joker silinirse Diskort (ses dahil) ve KAPIŞ da düşer.
- **Gruplama:** giriş ve kişisel veri olmayanlar `tools.ziroo.net` / `games.ziroo.net` altında; giriş ya da kişisel veri olanlar normalde kendi alt alan adına.
- **Ziroobank istisna:** Yusuf'un kararıyla `tools.ziroo.net/ziroobank` altında ("tool gibi kullanıyorum, basit seviyede"). Çerez `Path=/ziroobank`; geçişten sonra herkesin bir kez yeniden giriş yapması gerekiyor.
- **Kural (risk azaltma):** `tools` altındaki araçlarda inline script ve HTML sink (`innerHTML`) yok.
- **Steam yolu:** Yusuf isteğiyle `/steam-avgr` (eski `/tools/steam`).
- **Adresler:** `tools.ziroo.net/{steam-avgr,ceviri-araci,ziroobank}` + araç listesi; `games.ziroo.net/{bal-vadisi,isik-bekcisi}` + oyun listesi. Eski adresler 301 ile yenilerine gider.
- **Oyun kayıtları:** localStorage yeni kökende sıfırdan başlıyor; Yusuf kabul etti, aktarma sayfası yapılmadı.

## Nasıl çalışıyor
- Kaynaklar ziroo-edge deposunda: araç listesi `www/tools/` (yayın `deploy-www.sh`), hub blokları `config/hubs/{tools,games}.caddy`, ortak snippet `config/snippets/ziroo-static.caddy`, eski adres yönlendirmeleri `config/diskort-yollari/tasinan-adresler.caddy` (sunucuda `/opt/ziroo-sites/tasinan-adresler.caddy`). Oyun listesi `bal-vadisi` deposunda `deploy/hub/` (**2026-10-05'te değişti:** iki liste de ziroo-edge `www/`'de, [[2026-10-05-liste-sayfalari-ziroo-edge-te-ortak-neon-tasarim]]).
- Sunucuda statik kökler `/opt/ziroo-www/{tools,games}` (edge'de `/srv/www:ro`); proje-özel yollar `/opt/ziroo-sites/tools/<ad>.caddy` ve `/opt/ziroo-sites/games/<ad>.caddy`. Ayrıntı: [[sunucu-vps]]. Runbook ve smoke testi (`bash /opt/ziroo-edge/test/smoke.sh live`) ziroo-edge deposunda.

## Neden
- Alt alan adı: her proje kendi kökünde, alt yol sorunu yok, çerez ve localStorage kapsamı net.
- Joker DNS: bir kez yapılır, sonrası yalnız Caddy dosyası.
- Giriş/kişisel veri ayrı köken: bir araçtaki XSS diğerinin oturumuna ulaşmasın.

## Reddedilen alternatifler
- Tek merkez `ziroo.net/<ad>`: hepsi aynı köken, alt yol sorunları.
- Her projeye ayrı DNS kaydı: her seferinde Cloudflare işi.
- Oyun kaydı aktarma sayfası: Yusuf gereksiz buldu.

## Riskler
- Ziroobank `tools.ziroo.net` ile aynı kökende: tools altındaki herhangi bir araçta XSS, Ziroobank oturumuyla API çağırabilir. SameSite ve özel başlık CSRF koruması aynı kökene karşı korumaz. Hafifletme: yukarıdaki inline script / `innerHTML` yasağı.
- Eski kopyalar (`/opt/diskort/apps/web/tools`, `/games`, `games.html`) hâlâ duruyor; temizlik birkaç gün sonra (runbook Faz D), açık iş.

## Önceki kararlar
Şunların adres kısmının yerini aldı: [[2026-10-02-oyunlar-diskort-alan-adinda-games-altinda]], [[2026-10-02-yayin-diskort-tools-altinda]], [[2026-10-02-diskort-sunucusunda-ayri-konteyner]].
