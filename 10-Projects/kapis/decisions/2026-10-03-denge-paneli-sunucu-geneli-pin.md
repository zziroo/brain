---
type: decision
project: kapis
date: 2026-10-03
status: active
tags: [kapis, denge, balance, guvenlik, pin]
source: oturum 2026-10-03 (web-fps-game, yayın ve denge paneli); repo commit b8e7083
---

# Karar: Kahraman dengesi sunucu geneli tek set, PIN ile düzenlenir, canlı uygulanır

## Bağlam
Yusuf ve arkadaşları kahramanları kendileri, olabildiğince ayrıntılı dengelemek istedi. İlk sürüm dengeyi oda ayarı olarak tutuyordu (yeni oda "aktif" ön ayarından başlıyordu). Yusuf "çıkınca kaybolmasın, doğrudan tüm oyunu etkilesin; ileride mod eklersek ona özel denge yaparız" dedi.

## Karar
- **Tek, sunucu geneli denge:** `DATA_DIR/balance.json` (sunucuda `/opt/kapis/data`), açılışta yüklenir, değişince tüm odalara `balance {version, overrides}` mesajıyla yayılır ve sohbete düşer. Odalar denge taşımaz.
- **Şema:** `src/shared/balance.ts` içinde 252 ayar (yol, Türkçe etiket, birim, min/max/adım, varsayılan); `applyBalance` kahraman verisini yerinde değiştirir, sunucu ve istemci aynı fonksiyonu çağırır (tahmin bozulmaz). Türetilmiş profiller (Volt aşırı yük, Şahin barrage, Hayalet dürbün) her uygulamada yeniden hesaplanır.
- **Yetki:** `BALANCE_PIN` (8–64 karakter, sunucuda `/opt/kapis/.env`, 600). PIN yoksa ya da geçersizse panel herkese salt okunur. PIN bağlantı başına bir kez girilir, dakikada 5 deneme.
- **Araçlar:** isimli ön ayarlar, JSON dışa/içe aktarma, alan/kahraman/tümü sıfırlama, değişiklik kaydı, DPS ve kaç-atışta-öldürür özeti.
- **Emniyet ağları:** yetenek bekleme süresi en az 0,5 sn; oyuncu başına en fazla 32 canlı mermi ve 8 konuşlandırılabilir; `ammoPerShot ≤ magSize`; büyük (16 KiB) paket yalnız yetkili `balanceImport` için.

## Neden
- Sunucu internete açık; "oda sahibi düzenler" modeli, oda kuran her yabancının dengeyi ve ön ayarları değiştirebilmesi demekti (inceleme: bekleme 0 + uzun ömürlü mermi ile sunucu boğulabiliyordu).
- Tek set, "hangi odadayım, hangi denge geçerli" karışıklığını ve oda kapanınca kaybolma endişesini ortadan kaldırır.

## Reddedilen alternatifler
- **Oda bazlı denge + "aktif" ön ayarına otomatik kayıt:** dolaylıydı; yabancı bir odanın ilk kaydı herkesin başlangıç dengesini eziyordu.
- **Oda sahibi / "herkes düzenleyebilir" yetkisi:** açık sunucuda yabancıya da yetki veriyordu.

## Sonuçlar / riskler
- PIN arkadaşlarla paylaşılan tek sırdır; sızarsa `.env` değiştirilip konteyner yeniden başlatılır.
- Mod bazlı denge istenirse ön ayar → mod eşlemesi olarak eklenecek (henüz yok).
- Değişiklik anında istemcide tek, milimetre altı bir tahmin düzeltmesi olur (ölçüldü).
- Botların menzil bantları kısmen sabit; uç denge değerlerinde bot davranışı uyum sağlamayabilir.

## İlgili
- [[_overview]], [[2026-10-03-simulasyon-ve-guvenlik-kararlari]], [[2026-10-03-yayin-paylasilan-vps-kapis-ziroo-net]]
