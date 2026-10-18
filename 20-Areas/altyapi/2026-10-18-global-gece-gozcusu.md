---
type: decision
project: altyapi
date: 2026-10-18
status: active
tags: [gozcu, rutin, otomasyon, code-review, diskort, tussle, kripto-bot, yedek]
source: Claude Code oturumu 2026-10-18 "sistem: global gece gözcüsü + Tussle" (mobil-playus oturumundan başlatıldı)
---

# Karar: Tek global gece gözcüsü bütün sistemleri tarar, tek rapor `~/ZZ/gozcu/` altında

## Bağlam
Gece gözcüsü yalnız Diskort'a bakıyordu ([[2026-10-15-gozcu-birlesik-dort-bolum]]); makine sağlığı 2026-10-16'da Uptime Kuma'ya taşınmıştı ([[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]]). O kararda ayrı Tussle gözcüsü, Tussle'da hata toplama ve geri bildirim olmadığı için reddedilmişti; artık var (`scripts/feedback-cli.mjs`, [[2026-10-15-istemci-hata-toplama-jsonl-geri-bildirim-sqlite]]). Yusuf (2026-10-18): "Gece gözcüsüne Tussle bölümü de ekleyebilir miyiz? O gözcüyü daha global hale getirmek istiyorum: bütün sistemleri tarayan ve raporlayan bir sistem gibi."

## Karar
- Zamanlanmış görev `gece-gozcusu` ("Gece gözcüsü"), her gece 00:10, çalışma klasörü `~/ZZ`. Sıra ucuzdan pahalıya: 1 Diskort (geri bildirim + panel hataları, eski A/B aynen) → 2 Tussle (geri bildirim + istemci hataları) → 3 kripto-bot durumu → 4 Mac yedekleri → rapor diske → 5 kod incelemesi → 6 skeptik, özet, bildirim.
- **Kapsam (Yusuf seçti):** Diskort, Tussle, Mac yedekleri (Diskort aynası + `net.ziroo.sunucu-yedek` ve iCloud kopyası), kripto-bot, 5 reponun yeni commit incelemesi (tussle, diskort, ziroo-edge, kripto-bot, Işık Bekçisi). Makine sağlığı, site/konteyner, sunucu yedek yaşı, smoke **Kuma'da kalır**, tekrar edilmez. Mağaza konsolları (Play, App Store Connect) kapsam dışı: girişli tarayıcı ister, gözetimsiz çalışmaz.
- **Kripto raporu birleşti (Yusuf seçti):** sabah 09:00'daki `kripto-bot-gunluk-rapor` durduruldu; aynı kurallar (salt okunur `kbot report`, launchctl durumu, kill switch/hata kilidi/bayat bot uyarısı) gece raporunun bölümü.
- **Gelen kutusu `~/ZZ/gozcu/` (Yusuf seçti):** `~/diskort-inbox/` buraya taşındı (eski raporlar `okundu/`), `~/diskort-review/last-reviewed.txt` → `inceleme/diskort.txt`, `hata-ozet.js` → `araclar/`. Her repo için `inceleme/<ad>.txt` imleci. `durum.json` proje başına anahtarlı: `diskort.lastErrorScanAt`, `tussle.lastErrorTs`, `tussle.lastFeedbackId`, `lastDigestDate`. Ayrıntı `~/ZZ/gozcu/BENIOKU.md`.
- **Bildirim aynı kural (Yusuf seçti):** çalıştırma başına en fazla bir; ACİL (Diskort 2+ kullanıcıda çökme, Tussle aynı üretim hatası 20+ ya da 2+ platformda çökme, kullanılamaz/güvenlik geri bildirimi, kripto kill switch/hata kilidi/bayat bot, skeptikten geçen yüksek bulgu) → açık geri bildirimli Diskort çökmesi → günlük özet.
- **Tussle kuralları:** geri bildirimler `list --all` ile okunur, yeni = `lastFeedbackId`'den büyük no; gözcü **ack yapmaz** (Tussle'da "incelendi" ara durumu yok, karar Yusuf'ta), açık kalanları tek satırda sayar. Hatalar `errors --tail 300` ile, `lastErrorTs`'den yeniler; `[boot]`/`[push]` teşhis satırları yalnız sayılır, `dev/` sürümleri geliştirici cihazı (düşük öncelik), gerisi üretim hatası olarak gruplanır.
- **Kod incelemesi:** yerel dal (`main`, ziroo-edge `master`) incelenir; `origin`'le fark varsa "push edilmemiş X / çekilmemiş Y" satırı. "main <- dal:" (Tussle) ve "Birleştir:" (Diskort) birleştirmeleri zaten incelenmiş sayılır; doğrudan commit'ler tam, birleştirmelerde repo başına sıcak noktalar. Bütün repolar için toplam ~40 dosya okuma; orta+ bulgu varsa bütün repolar için tek Sonnet skeptik.
- **İzinler:** `~/ZZ/.claude/settings.local.json`'a 5 repo × izinli git alt komutları (`rev-list` eklendi), `uv run --directory … kbot report --mode testnet`, `launchctl print gui/501/com.ziroo.kripto-bot.run`, `~/ZZ/gozcu/**` okuma/yazma, `~/Yedekler/**` okuma. `ssh vps *` zaten genel ayarlarda. Görev kaydedilirken izin modu taşınmadı; genel varsayılan `auto`.
- **İlk deneme (2026-10-18 19:49, Run now, ~2,5 dk, izin sorusu yok):** rapor `~/ZZ/gozcu/2026-10-18-1949-gozcu.md`; Tussle #2 (Denge kolay) `main`deki sim v4 ile büyük ihtimalle çözülmüş, Tussle üretim hatası yok, kripto yolunda, **sunucu yedeğinin iCloud kopyası HATA** (`rsync: unexpected end of file`, 18.10 12:30) yakalandı, Tussle 3 commit temiz.
- Eski görevler silinmedi, durduruldu; SKILL.md yedekleri `~/Yedekler/eski-gorev-tanimlari/`.

## Neden
- Tek rapor, tek bildirim: Yusuf'un sabah açacağı bir dosya; ayrı ayrı görevler hem bildirim gürültüsü hem her biri ~45k token soğuk başlangıç demek.
- Ucuz adımlar önce: bütçe biterse sunucu ve yedek bölümleri zaten diskte olur.
- Gözcü çalışma klasörü `~/ZZ`: Diskort klasöründe koşan genel görev Diskort'un CLAUDE.md'sini ve hafızasını gereksiz yükler.
- Kuma'yı tekrarlamamak: aynı alarm iki kanaldan gelirse biri görmezden gelinmeye başlar.

## Reddedilen alternatifler
- **Diskort gözcüsüne yalnız Tussle bölümü eklemek:** hızlıydı ama görev adı, klasörü ve gelen kutusu Diskort'a bağlı kalırdı; global yapı aynı oturumda netleşti.
- **Proje başına ayrı gözcü:** her biri ayrı soğuk başlangıç ve ayrı bildirim; Yusuf tek sistem istedi.
- **Kripto raporu sabah ayrı kalsın, gecede tek satır:** önerilen buydu; Yusuf tam birleştirmeyi seçti.
- **Raporlar vault'ta:** Obsidian'da okunurdu ama vault günlük raporlarla dolardı.
- **Tussle geri bildirimini gözcünün ack'lemesi:** Tussle'da ack "işlendi" demek, ara "incelendi" durumu yok; ack Yusuf'un kararı.
- **Tussle CLI'ye `--since` eklemek:** Tussle reposuna dokunmak bu işin dışında (o sırada başka oturum Tussle'da çalışıyordu); `--tail 300` + zaman imleci yeterli (log 20 KB).

## İlgili
[[proje-altyapi-standardi]] · [[2026-10-15-gozcu-birlesik-dort-bolum]] · [[2026-10-16-makine-sagligi-kuma-push-gozcuden-cikti]] · [[2026-10-17-felaket-kurtarma-yedegi]]
