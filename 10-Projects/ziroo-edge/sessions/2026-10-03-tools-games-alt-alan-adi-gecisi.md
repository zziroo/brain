---
type: session
project: ziroo-edge
date: 2026-10-03
status: done
tags: [diskort, ziroo-edge, dns, tools, games, tasima]
source: oturum 2026-10-03
---

# 2026-10-03: tools ve games alt alan adlarına geçiş, joker DNS

## Yapılanlar
- Diskort dışı projeler `tools.ziroo.net` ve `games.ziroo.net`'e taşındı, eski adresler 301; her şey canlıda doğrulandı. Karar, neden ve reddedilenler: [[2026-10-03-joker-dns-ve-tools-games-alt-alan-adlari]].
- Joker DNS kuruldu; Yusuf açık `diskort`, `lk`, `turn`, `kapis` kayıtlarını sildi.
- Güvenlik bulgusu geçişten önce düzeltildi: [[caddy-redir-path-acik-yonlendirme]].
- Caddyfile'lar bu bilgisayarda doğrulanamadı (Docker/Caddy yok); sunucuda ayrı kapsayıcıda `caddy validate` + smoke ile doğrulandı.
- Claude Code otomatik mod denetçisi SSH'ı ilk denemede engelledi; Yusuf sohbette izin verdi.
- Aynı gün: zProjects altındaki git'siz 3 proje (steam-avgr-calculator, trencheck, voice-detector) git'e alındı; remote'suz 5 repo ile birlikte GitHub'a private yüklendi (`yusufholat/<klasör adı>`). Steam script'indeki anahtarlar Apps Script Script Properties'e taşındı (değerler yerel gitignore'lu `.env` içinde), `script.py` → `script.gs`.

## Açık işler
- Eski kopyaların temizliği (`/opt/diskort/apps/web/tools`, `/games`, `games.html`), birkaç gün sonra, runbook Faz D.
- Steam panelinde profil değişince sürelerin yüklenmemesi hatası; Yusuf kendi Steam oturumunda yaptıracak ([[10-Projects/steam-avgr/_overview|Steam AGCR Paneli]]).
