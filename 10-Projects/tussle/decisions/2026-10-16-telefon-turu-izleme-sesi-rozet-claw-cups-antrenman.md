---
type: decision
project: tussle
date: 2026-10-16
status: active
tags: [tussle, izleme, antrenman, denge, oyun-eleme, karar]
source: oturum 2026-10-16 (mobil-playus: telefon geri bildirimi turu; izleme sesi, antrenman, renk)
---

# Karar: Telefon turu (`4c1068d`): izlerken ses + "seni izliyorlar" rozeti, oda sınırı 200, Claw silindi, Cups v5, Antrenman arama + sık ızgara, Slice kavanozsuz

## Bağlam
Yusuf telefonda Yayın 3'ü denedi ve yedi madde bıraktı: izlerken ses yok; biri izlerken görünmüyor; bir yerden sonra oda açılamıyor; Slice'ta sağ altta anlamsız kavanoz; Antrenman'da oyun bulmak zor; Cups fazla yumuşak başlıyor; Claw kalksın ("demiştim sanki"; vault'ta kaydı yoktu).

## Karar
- **İzleme sesi:** izleyici host'u oyuncunun ses motorunu kullanır (ayarlara uyar), haptik kapalı. Geç katılımdaki hızlı sarma karesinin tüm sfx'i susar; gerçek zamanlı kareler (yavaş takılmadan sonra ≤6 adımlık yetişme dahil) çalar. `docs/SPECTATE-PLAN.md` güncellendi.
- **Rozet:** yeni ws mesajı `{t:'watchers', key, n}` yalnız koşu sahibinin soketine, sayı değişince (watch/unwatch/unsub); aynı kullanıcı iki cihazdan bir kişi. İstemcide oyun ekranı sağ üst köşesinde göz ikonu + sayı (Clash Royale izleyici rozeti gibi), 0'da gizli, değişince kısa nabız; §5 şerit düzeni değişmedi. İstemci `n`'i doğrular.
- **Oda sınırı:** `MAX_ROOMS_PER_USER` 30 → 200. Tamamen kaldırılmadı: kötüye kullanıma karşı güvenlik tavanı; kullanıcı açısından sınır yok.
- **Claw (`vinc`) silindi:** 46 oyun; Brick Break kalıbı (registry, kapak, i18n, testler, GAMES-ROADMAP notu). Eski gün satırı gelirse 410 `game_gone`. Canlıda yalnız 13 Ekim'e ait tek satır vardı, bugünü etkilemedi.
- **Cups v5:** ilk hareket 500 → 383 ms, rampa yavaşlatıldı (tavan 14 tik 12. tur yerine 19. turda), 3. turdan itibaren 5 hareket; yeni hareket türleri `MV_DOUBLE` (iki komşu çift aynı anda, ≥4 bardak) ve `MV_ROTATE` (üçlü kaydırma), olasılık %30 + tur başına 2,5 puan, en çok %50; çoklu hareket hiç sahte olmaz, turun ilk/son hareketi olmaz. Bot medyanı normal 5 → 4, casual 4 → 3; takipçi bot hâlâ kaçırmıyor.
- **Antrenman:** üstte yapışkan arama çubuğu (Türkçe harf katlama: ı/i, ş/s…), alfabetik sıra, 4 sütun sık ızgara (≥420 px 5, ≥640 px 6), küçük kare kapak + tek satır ad, süre rozeti kalktı; 375 px'te ilk ekranda 24 oyun (eskiden ~2). Çok varyantlı oyun için alt sayfa yolu yazıldı ama şu an hiçbir oyun çok varyantlı değil (ölü kod, bilinçli).
- **Slice:** sağ alttaki kavanoz yalnız yüz ifadesiyle tepki veren süs maskotuydu; kaldırıldı (baş parmak alanı boş). Tezgâh alçaldı, kesim izi kısa parlak çizgi, kaçırılan şekerde kırmızı çizgi + X, parmak izi tek incelen şerit. Sim ve altın tohumlar aynı.

## Neden
- Ses ve rozet izlemeyi "birlikte oynuyormuş" hissine yaklaştırıyor; sayıyı yalnız sahibine göndermek kimlik sızdırmıyor.
- Oda sınırını sıfırlamak yerine yüksek tavan: `/api/me` yanıtında LIMIT yok, sınırsız oda DOS yüzeyi olurdu.
- Cups'ta tavanı değil başlangıcı sertleştirmek: Yusuf'un şikâyeti başlangıçtı; 350/367 ms denendi, normal medyan 3'e düştüğü için fazla sert bulundu.

## Reddedilen alternatifler
- Oda sınırını tamamen kaldırmak: güvenlik tavanı tercih edildi.
- Rozette metin ("2 kişi izliyor"): yalnız ikon + rakam; metin erişilebilirlik etiketinde.
- Kavanozu bilgi taşıyacak hâle getirmek: skor HUD'da, kombo etiketi zaten var, can yok; gereksiz.

## Sonuçlar / riskler
- Telefonda doğrulanmadı: izleme sesi (ses kilidi), rozet görünümü/çentik hizası, Cups üçlü döndürmede üst üste binme görüntüsü, Antrenman'da klavye açıkken yapışkan çubuk, Slice gece teması.
- Cups v4 denemeleri deploy anında gönderilirse 409 `attempt.version` (beklenen).
- Koşu sırasında sahibin soketi yeniden bağlanırsa rozet son değerde kalır (önceden var olan `run.conn` davranışı; koşu bitince temizlenir).

## İlgili
- [[2026-10-15-izleme-girdi-akisi-ortak-tohum-kendi-denemen-bitince]]
- [[2026-10-15-yayin-1-kural-ve-denge-turu-arkadas-geri-bildirimi]] (Brick Break silme kalıbı)
- [[2026-10-16-ana-renk-ikon-mavisi-pembe-vurgu-takasi]]
