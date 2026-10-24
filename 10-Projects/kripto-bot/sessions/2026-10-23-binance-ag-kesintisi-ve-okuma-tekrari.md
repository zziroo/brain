---
type: session
project: kripto-bot
date: 2026-10-23
status: active
tags: [kripto-bot, session, ağ, exchange, rapor]
source: kripto-bot oturumu "Binance ağ kesintisi teşhisi" (2026-10-23 akşam)
---

# Oturum 2026-10-23: "bot çalışmıyor" uyarısı ağ kesintisiydi, okuma çağrılarına tekrar eklendi

- Yusuf raporda "bot 3 sa 40 dk çalışmadı, bilgisayar açık mı?" gördü. Teşhis: launchd her saat :05'te tetiklemiş; 16, 17 ve 18 turları testnet `exchangeInfo` çağrısında ağ hatasıyla atlanmış. Mac'ten Binance'e (testnet ve mainnet) TLS el sıkışmasında bağlantı sıfırlanıyor, denemelerin yaklaşık yarısı düşüyor; Google sorunsuz. Günlük atlanan tur 21-23 Ekim: 5, 8, 9. ([[bot-calismiyor-uyarisinda-once-log-zamanlarina-bak]])
- Çözüm ([[okuma-cagrilarina-ag-tekrari]], `b21bc0f`): salt okunur çağrılar NetworkError'da 3 kez denenir; emir çağrıları ve 418/429 asla. Rapor ve dashboard artık "bot çalışıyor ama borsaya ulaşamıyor (son tur, son deneme)" diyor. 171 test, ruff temiz, inceleme ajanı: iki düşük bulgu, ikisi de uygulandı.
- Kapsam dışı: mainnet mum çekimi tekrar kapsamında değil (çalışıyordu). Etkisi sonraki saatlik turlarda görülecek; sıfırlamalar sürerse Mac'in ağ yolu (utun225 tüneli, ISS) incelenmeli.

## İlgili
- [[10-Projects/kripto-bot/_overview]]
- [[vps-binance-baglanti-sifirlama]] (VPS'teki aynı desen)
