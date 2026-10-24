---
type: lesson
project: kripto-bot
date: 2026-10-23
status: active
tags: [kripto-bot, lesson, rapor, ağ, teşhis]
source: kripto-bot oturumu "Binance ağ kesintisi teşhisi" (2026-10-23)
---

# "Bot çalışmadı" uyarısında önce logs/kbot.log'daki tur başlangıç zamanlarına bak

Raporun "çalışmadı" uyarısı eşitlik günlüğünün son satırına bakar; o satır yalnızca bakiye değerlemesi bitmiş turlarda yazılır. Zamanlayıcı çalışıp tur ağ hatasıyla atlanınca da aynı uyarı çıkıyordu (2026-10-23, 3 tur üst üste). Teşhis sırası: `grep "run: mode=" logs/kbot.log | tail` ile launchd'nin tetiklediğini doğrula, sonra `curl` ile Binance'e birkaç kez ulaşmayı dene (testnet ve mainnet ayrı; Google'ı kontrol olarak kullan). Rapor bu ayrımı artık kendisi yapıyor ([[okuma-cagrilarina-ag-tekrari]]), ama hata kilidi ya da zamanlayıcı sorununda yine log ilk adres.

Ajan kuralı: bu teşhis için `kbot report` ve log okuma yeter; `kbot run`, `kbot status` ve `launchctl` insan işidir.
