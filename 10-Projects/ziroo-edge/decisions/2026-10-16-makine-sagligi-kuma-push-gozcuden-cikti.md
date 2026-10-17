---
type: decision
project: ziroo-edge
date: 2026-10-16
status: active
tags: [altyapi, ops, uptime-kuma, rutin, gozcu, yedek, ziroo-edge]
source: Claude Code oturumu 2026-10-16 "ziroo-edge: ops katmanı (Kuma + Netdata)"
---

# Karar: Makine sağlığı (konteyner, disk, yedek yaşı, smoke) gece gözcüsünden çıktı; saatlik betik Kuma push monitörlerine bildiriyor

## Bağlam
Gözcünün dört bölümünden "C sunucu sağlığı" Diskort'a değil makineye aitti ([[2026-10-15-gozcu-birlesik-dort-bolum]]). Kuma kurulunca ([[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]]) konteyner ve site kısmı zaten anlık izleniyordu; Yusuf "makine işiyse onu da taşıyalım" dedi.

## Karar
- ziroo-edge `ops/check.sh` + systemd `ziroo-ops-check.timer` (saat başı, sunucuda): Diskort ve Tussle `latest.db.gz` yaşı (sınır 26 sa), kök disk (sınır %85), `test/smoke.sh live`. Sonuç Kuma'nın dört push monitörüne (`Yedek: Diskort DB`, `Yedek: Tussle DB`, `Disk /`, `Edge smoke testi`; kalp atışı 2 sa, 1 tekrar) up/down + mesaj olarak gider; Telegram bildirimi Kuma'dan. Jetonlar yalnız sunucuda `/opt/ziroo-ops/check.env` (600).
- Gözcü SKILL.md: C bölümü "Mac yedek aynası" oldu (yalnız yerel `yedek-gunlugu.txt`), `client-errors.jsonl` boyutu B'ye taşındı, sunucu komutları (5)–(9) silindi, ACİL kuralından konteyner/disk/smoke çıktı. Yedek `~/.claude/backups/SKILL-gozcu-2026-10-16-oncesi.md`. Rapor bölümleri: Geri bildirim, Panel hataları, Mac yedek aynası, Kod incelemesi.
- Commit ziroo-edge `ops: saatlik kontrol betiği…` (master, GitHub).

## Neden
- Zero-token: betik + Kuma, gece Claude oturumu yerine saat başı çalışır ve anında bildirir.
- Tek bildirim kanalı (Kuma → Telegram); Netdata'nın kendi Telegram'ı bot token'ını sunucuda ayrı bir dosyaya koymayı gerektirirdi.
- Proje repolarına dokunmadan: yedek betikleri değişmedi, dosya yaşına bakılıyor; yeni proje = env'e jeton + bir satır.

## Reddedilen alternatifler
- Ayrı "ops gözcü" Claude rutini (B seçeneği): her gece token, yine aralıklı.
- Netdata disk alarmı + Telegram: token dosyası ve ikinci bildirim yolu.
- Yedek betiklerinin kendisinin Kuma'ya push atması: daha doğru ("başarıyla bitti" sinyali) ama Diskort ve Tussle repolarında değişiklik ister; ileride istenirse.

## Sonuçlar / riskler
- Mac yedek aynası hâlâ gözcüde (yerel dosya); Mac'teki launchd betiği Kuma'ya push atarsa gözcüden tamamen çıkar (Diskort oturumu işi).
- Push jetonu bilen biri monitörü "up" gösterebilir; jetonlar root-only dosyada, risk düşük.
- İlk koşu 2026-10-16 01:03: Diskort yedeği 3 sa, Tussle 12 sa, disk %66, smoke geçti. Diskort yedeğinin 21:22'de olması (timer 04:00) açıklanmadı; bakılacak.

## İlgili
- [[2026-10-16-ops-katmani-kuma-netdata-ziroo-edge]] · [[2026-10-15-gozcu-birlesik-dort-bolum]] (C bölümü bu kararla değişti) · [[vps-makinesi]] · [[yedekler]]
