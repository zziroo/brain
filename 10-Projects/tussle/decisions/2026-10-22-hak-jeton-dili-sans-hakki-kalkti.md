---
type: decision
project: tussle
date: 2026-10-22
status: active
tags: [tussle, hak, jeton, sans-hakki, arayuz, canli-sayfa]
source: oturum 2026-10-21/22 (mobil-playus: Melih geri bildirimi, ⚔ sayfası sadeleştirme, jeton, şans hakkı)
---

# Karar: Hak = jeton (C2 Delikli), şans hakkı kaldırıldı, ⚔ sayfası kademeli açılım

## Bağlam
Testçi Melih: Parti Gecesi sayfası "görüntüsel karışık, silik, ayarlara bakasım gelmiyor"; "×1 ×2 ×3 itici, kalp daha anlaşılır". Yusuf aynı sadeleştirmeyi üç sekmeye istedi ve hak için uygulama genelinde ortak dil istedi.

## Karar
- **⚔ sayfası:** üç sekmede aynı iskelet: tek satır açıklama → ayar kutusu (etiket solda, kontrol sağda) → tek "Oyun ›" satırı (dokununca kapaklar/yuvalar açılır) → ana düğme → tek satır not. Kapışma son oyunu, Arena son masayı önceden seçer; Parti'de havuz satırı kalktı, "Hepsi rastgele" ikincil.
- **Hak = jeton:** sarı delikli disk = kalan, soluk gri disk = harcanan; sayaçlarda "hak" kelimesi düşer (2/3 hak → ●●○), >4 tek jeton + ×N. "Son hak", mağaza paketi, akış cümleleri, aria kelimeyi korur; "jeton" kelimesi hiçbir yerde geçmez (sanal para gibi algılanmasın). Günün tablosunda Hak sütunu yok (Yusuf: jeton dizisi dolan çubuk gibi okundu); hakkı kalanın isminde tek jeton + sayı rozeti, bitirende hiçbir şey (Playus'taki satır rozetinden esinlenildi, görünüm bizim çip stilimiz). Bileşen `src/client/ui/jeton.ts`.
- **Şans hakkı (yazı-tura) tamamen kalktı:** rota, kurucu ayarı, 'lucky' rozeti, akış türü, gizlilik cümlesi. Haklar herkese eşit (taban + oda paketi). Migrasyon 26 yalnız saklı ayarı siler; `luck` tablosu ve `days.luck` geri alma (tussle:prev) çalışsın diye duruyor, sonraki bir sürümde düşürülecek.

## Neden
- Kalp "can" çağrıştırdı (Yusuf): kaybedince giden şey; hak ise harcanan deneme. Jeton = atari kredisi, anlam birebir.
- T'li jeton: T Türkçede anlam taşımıyor. Delikli seçildi: harf/para işareti/yıldız yok, 12 px'te dolu/boş ayrımı en net.
- Şans hakkı: şans eşit ama sonuç eşitsiz; puanlı tabloda tek bireysel avantaj kaynağıydı, "ceza yalnız bilinebilir hatada" adalet çizgisiyle çelişiyordu; mağaza paketleri zaten herkese eşit hak veriyor.

## Reddedilen alternatifler
- Kalp (B): can çağrışımı. Nokta (A): güvenli ama soyut. Bilet: küçükte dikdörtgen. ▶ jeton: Oyna düğmesiyle karışır, boş ▶ "oynat" okunur. Taç: birincilikle çakışır. Halka: hedef tahtası.
- Şans hakkını tabloya saymadan tutmak: sayılmayan hak heyecan yaratmaz, yarım çözüm.

## Sonuçlar / riskler
- Telefon teyidi: Gece'de küçük jetonun dolu/boş ayrımı (tabloda ince kalabilir), tablo sütununun "kalan"a dönmesi, ⚔ sayfa aç/kapa.
- Sonraki sürüm: `luck` tablosu + `days.luck` düşür.
- Açık: parti modunda oyun anlatımı (Melih: "oyunları anlayana kadar yenileniyor").

## İlgili
- [[2026-10-09-sans-hakki-yazi-tura]] (artık geçersiz)
- [[2026-10-20-ceza-yalniz-bilinebilir-hatada]]
- [[2026-10-21-kapisma-1v1-arena-sekmesi-acilis-sahneleri]]
