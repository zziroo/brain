---
type: decision
project: tussle
date: 2026-10-18
status: partially-superseded
tags: [tussle, canli-mac, parti, surum, hile, ota]
source: oturum "tussle: durum ve sıradaki işler" (2026-10-18 akşam), commit `624c6e0`
---

> **19 Eki:** eski sürümde düşme ve koşu öncesi durdurma kaldırıldı, bkz. [[2026-10-19-canli-macta-eski-surum-oynar-sonucu-sayilmaz]].

# Karar: Canlı maçta yalnız doğrulanmış sonuç sayılır, oyun sürümü uyuşmayan istemci oyuna başlamaz

## Bağlam
18 Eki 20:16 (parti 9, Denge): YOSEF (ilk iPhone testçisi) iOS'ta dünkü OTA paketindeydi (`d0d4556`, Denge v3); sunucu Denge v4'teydi. Koşuyu oynadı, sonucu 409 `attempt.version` aldı ama sunucu onu düşmüş saymadı; maç 4 dk süre sınırına kadar açık kaldı. Kart "Canlı · Oyun 1/3 · 0 puan" gösterdi, kimse kimi beklediğini görmedi; kapışma açmaya çalışan "Zaten bir kapışmadasın" aldı. Süre dolunca YOSEF'in doğrulanmamış canlı skoru (86) sayıldı ve birinciliği aldı. "Odaya dön" sonrası istemci oyunu bir daha açmıyordu.

## Karar
- İstemci canlı koşudan önce maçın `gameVersion`'ını kendi sürümüyle karşılaştırır; uyuşmazsa koşu yok, `stop {reason:'update'}` + güncelleme ekranı (OTA yeniden başlatma yolu).
- Sunucu: kayıt sürümü maçınkinden farklı sonuç gelirse oyuncu hemen düşer (`forfeitOut`), maç/parti beklemeden ilerler. Sunucunun kendi sürümü maç sırasında değişirse oyuncu suçlu sayılmaz (409, düşme yok).
- Sabit oyunlu kapışma aç/katıl `gameVersion` ister; göndermeyen eski istemci 409 alır. **Geri uyum yok** (Yusuf: "eskiye dönük tekrarlar silinebilir ya da oynatılamaz olabilir").
- Süre dolunca **yalnız doğrulanmış sonuç** sıralanır ve puan alır; doğrulanamayan oyuncu `dropped`, 0 puan, "sonuç gelmedi" (Yusuf: "sayılmasın, sorun değil"). Eski tutarsız satırlar bozuk sayılır, geriye dönük düzeltme yok.
- Oyun ortasında ekrandan çıkmak (stop) düşen soket gibi: 10 sn sonra düşme. Bitmiş koşunun kaydı arka planda gönderilmeye devam eder.
- Parti kartı oyun sürerken "X oynuyor · 2:41" / "Sonuçlar bekleniyor" gösterir.

## Neden
- Doğrulanmamış canlı skor sunucu otoritesini deliyordu: eski sürümle (Denge v3 daha kolaydı) ya da hiç kayıt göndermeden alınan skor doğrulanmışları geçebiliyordu.
- Uygulama henüz test aşamasında; eski istemcileri desteklemek için kod tutmak yerine güncellemeye yönlendirmek daha sade.
- OTA yeni paketi yalnız soğuk açılışta devreye alır; sürüm artınca bir süre eski paketli istemci kaçınılmaz, sunucunun bunu beklemeden çözmesi gerekir.

## Reddedilen alternatifler
- Eski istemcileri çalışır tutmak (gameVersion isteğe bağlı): Yusuf geri uyum istemedi; gönderim anındaki düşme zaten güvenlik ağı.
- Doğrulanmamış skoru "yedek" olarak saymaya devam: hile/eski sürüm açığı.
- Maçı süre sınırını kısaltarak çözmek: yavaş ağda gerçek sonuçları da keserdi.

## Sonuçlar / riskler
- Güncellemeyi almamış istemci (bir sonraki tam açılışa kadar) sabit oyunlu kapışma açamaz/katılamaz; rastgele kapışma ve parti çalışır.
- `live.mismatch` / `live.invalid` reddi hâlâ süre sınırına kadar bekler (puan almaz); hemen bitirmek ayrı kural kararı.
- iPhone'da gerçek partide denenmedi (`status` aktif ama cihaz teyidi bekliyor).

## İlgili
- [[2026-10-18-denge-v4-rampa-tavan-180]] (sürüm artışı), [[2026-10-15-tussle-ota-canli-guncelleme]], oturum [[2026-10-18-tussle-basket-glif-lobi-parti-kilidi-magaza]]
