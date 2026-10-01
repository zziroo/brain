---
type: session
project: diskort
date: 2026-10-02
status: unverified
tags: [diskort, dm, arama, engelleme, surum]
source: Claude Code oturumu 2026-10-01 gece / 2026-10-02 (/basla, bağlantı teşhisi, DM arama + engelleme, 0.9.6)
---

# DM'de arama, ekran paylaşımı ve engelleme yazıldı; sunucu şema 25'e deploy edildi, 0.9.6 çıktı

- **Gelen kutusu (20:51–21:55 hata taraması):** ölümcül hata yok. 8 yayın donması; sunucu sondaları temiz. Belirgin olanlar: yayıncı kodlayıcısı (NVIDIA H.264, 12–29 fps, bit hızı 2,8 → 12,4 Mbps sıçraması, anahtar kare yok) ve tek kullanıcının yükleme hattı (%5–9 giden kayıp).
- **Bağlantı teşhisi (sunucudan, salt okunur):** `outages.jsonl`'de akşam aramasında kesinti yok. Tek "tam" kayıt 14:55'teki 12 sn (taşıma/kurulum saati); diğerleri boş odada 1–2 sn'lik "aday" gürültüsü. Dış sondalar (UDP/TCP) temiz. Yeni sunucuda UDP sınırı sorunu görünmüyor (gerçek kalabalık yayınla henüz kanıtlanmadı).
- **0.9.5:** Yusuf "sorunsuz kullanıyoruz" dedi.
- **DM araması + engelleme:** Yusuf istedi, ürün kararlarını verdi ([[dm-sesli-arama-ve-calma]], [[engelleme-dm-ve-arama]], [[dm-aramalari-yonetimde-ozel]]). Üç dilim: sunucu+shared+client-core (sözleşme `docs/direkt-mesajlar.md`), sonra masaüstü ve mobil paralel. İki inceleme + iki şüpheci turu; düzeltilen orta bulgular: engellenenin eski mesajı düzenleyebilmesi, takma kimliklerin DM'ler arası bağlanabilmesi, gruptan ayrılanda takılan zil, DM aramasındayken ses kanalına geçişte yanlış görünüm, açılmış aramadan sonraki geri aramanın sessiz kalması. DM aramasının sunucu üye listesine sızması client-core'da kapatıldı (`guildVoiceStateOf`, `voiceStateIn`).
- **Testler:** server 661, client-core 369, masaüstü 165, mobil 182 geçti ([[server-testleri-tam-kosuda-kararsiz]]). Masaüstü yerel test ortamında iki profille uçtan uca denendi ([[yerel-testte-ekran-paylasimi-gercek-pencere]]).
- **Commit/deploy/sürüm:** `8168252` (özellik), `cadb249` (Sürüm 0.9.6). Sunucu: yedek → deploy → şema 25, bütünlük ok, hata yok. CI tüm platformlar başarılı; mobil parmak izi 0.9.5 ile aynı (APK 0.9.2 / IPA 0.8.5 yeniden kullanıldı, OTA). 0.9.6 yayında, `latest.yml` 0.9.6.
- **Sürüm adı:** 1.0 tartışıldı, ertelendi ([[surum-1-0-ertelendi]]).
- **Doğrulanmayanlar:** telefonda hiçbir şey (gelen arama kartı, zil, `diskort-call` bildirimi, dokununca açılma); masaüstünde grup araması, aynı anda iki gelen arama, masaüstü bildirimi, DM aramasındayken ses kanalına geçiş düzeltmesi.
