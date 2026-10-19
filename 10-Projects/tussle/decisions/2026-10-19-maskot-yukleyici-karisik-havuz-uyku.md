---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, arayuz, maskot, yukleyici, marka]
source: oturum "tussle: arayüz cilası (geçiş, koyu tema, sohbet)" (2026-10-19 akşam)
---

# Karar: gecikmeli yükleyici logodaki maskot üçlüsü, 10'luk karışık havuz, uzun beklemede Uyku

## Bağlam
Yavaş açılan ekranlar için yükleme göstergesi gerekti; Yusuf "maskot üçlüsüyle, yerinde zıplamaktan öte yaratıcı" istedi. Taslak Artifact'te 12 seçenek denendi.

## Karar
- **Havuz (rastgele, art arda aynısı yok):** Birdirbir, Kule, Taç kapmaca, Tahterevalli, Cee-ee, Takla, İp atlama, Yarış, Domino, Hapşırık. Kule, Cee-ee, Yarış yalnız büyük boyda (kalabalık). Elenen: Atlıkarınca, eski dalga.
- **Uyku:** yalnız 8 sn sonra ve o anki tur bitince geçer; dokununca irkilip uyanır, başka bir animasyon başlar, sayaç yeniden. Hareketli animasyonu yarıda kesmez (Yusuf'un isteği).
- **Görünürlük:** ekran geçişi bittikten 180 ms sonra hâlâ veri yoksa görünür; göründüyse ≥400 ms kalır. Maskot görünsün diye yapay bekletme yok.
- **Yazı:** "Yükleniyor" ancak 3 sn sonra belirir (yeri baştan ayrılı), Uyku'da "Bağlantı yavaş, bekliyoruz · dokununca uyanırlar". Ekran okuyucu için etiket baştan.
- **Yerler:** ekran yükleyicileri (küçük), soğuk açılış (büyük, splash bittikten sonra), parti lobisi (birkaç tur oynayıp durur). Kilitli oda kartında yok.
- Teknik: yalnız transform/opacity CSS keyframes, kare başına JS yok, ekran dışında durur; `ui/mascot.ts`, `mascot-core.ts`, `mascot.css`; yeni seçenek = havuza bir giriş + CSS bloğu.

## Neden
- Marka kimliği ve bekleme anını eğlenceye çevirme; kısa beklemede yazı göz kırptığı için yalnız uzun beklemede (Yusuf yazıdan emin değildi, Claude önerdi).
- Akıcılık kuralı: compositor dışı animasyon yok; boştayken hiçbir şey dönmez.

## Reddedilen alternatifler
- **İskelet yükleyici:** ilk uygulandı, maskotla değiştirildi.
- **Hep görünen "Yükleniyor":** kısa beklemede gürültü.
- **Kilitli oda kartında uyuyan üçlü:** kart sıkıştı (başlık iki satır), hemen altındaki sohbet boş durum üçlüsüyle çift oldu; çıkarıldı.
- **Maskotu kesin göstermek için açılışı bekletmek:** uygulamayı yavaş hissettirir.

## Sonuçlar / riskler
- Telefonda denenmedi; boot'ta kısa animasyonlar satırın tabanına hizalı (en kısa döngüde ~22 px aşağıda), cihazda bakılacak.
- `mascot.css` ~65 KB küçültülmüş giriş CSS'inde (yerel yüklenir, splash örter).

## İlgili
- [[2026-10-08-marka-maskotu-uclu-blok-ve-ikon]]
- [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]]
- [[2026-10-19-tussle-arayuz-cilasi-gecis-maskot]]
