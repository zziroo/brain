---
type: decision
project: tussle
date: 2026-10-11
status: active
tags: [tussle, canli-kapisma, m1, karar]
source: oturum 2026-10-11 (mobil-playus: M1 eksikleri + Parti Gecesi)
---

# Karar: Canlı kapışmada koşu tek seferliktir; çıkan, yenileyen ya da bağlantısı kopan o koşuyu kaybeder

## Bağlam
M1'de oyun ortasında sayfa yenilenince aynı tohum baştan oynanıp daha iyi skor gönderilebiliyordu (yalnız istemci "Oyna"yı gizliyordu). Ertelenen listede rövanş, maç geçmişi, yeniden katılma, oyun başına kişi sayısı filtresi de vardı.

## Karar
- Yusuf: "bağlantı kopmaları, uygulamadan çıkmalar o oturumu bitirebilir, sorun değil; yeniden maç isteği atılır." **Yeniden katılma yok.**
- Sunucu kuralı: koşu ilk canlı paketin geldiği sokete bağlanır. Bitiş paketinden (`f=1`) önce o soket giderse, oyuncunun başka soketi odaya abone olursa ya da başka soketten paket gelirse (ikinci sekme/cihaz) koşu **10 sn** sonra `forfeit` olur (migration 12). Kartta "çıktı", sırasız. Bitirmiş oyuncunun outbox'tan geç gelen sonucu kabul edilir.
- Yusuf: "rematch, history gereksiz; bu kart anlık, öylesine." **Rövanş ve maç geçmişi yapılmadı.**
- Oyun başına kişi sayısı filtresi: daha kalabalık/canlı oyunlar eklenince düşünülecek.

## Neden
- Kart hafif ve anlık; özellik yükü istenmiyor.
- Hile açığı (aynı tohumu tekrar oynama) sunucuda kapanmalı; tek seferlik kural hem basit hem güvenli.
- 10 sn pay en kısa koşudan (~30 sn) kısa: o sürede baştan oynanmış bir koşu sığamaz, ama bitiş anında kopan dürüst oyuncunun sonucu kurtulur.

## Reddedilen alternatifler
- Yeniden katılma/yenilemede kaldığı yerden devam: Yusuf gereksiz buldu, karmaşık.
- Rövanş düğmesi, maç geçmişi/istatistik: Yusuf "anlık oyun" diye reddetti.
- 5 sn pay (ilk sürüm): inceleme, ağ kopukken HTTP yeniden denemesinin 5 sn'yi aşıp dürüst sonucu sildirdiğini gösterdi → 10 sn.
- Pencere içinde "un-forfeit" (incelemenin önerdiği düzeltme): şüpheci geçişi, `startedAt` gönderim zamanından türetildiği için koşulun anlamsızlaştığını ve tekrar oynamayı geçirdiğini gösterdi.

## Sonuçlar / riskler
- iPhone'da uygulama arka plana atılınca soket genelde kapanır: bildirime bakmak da koşuyu bitirir (karara uygun; telefonda doğrulanmadı).
- Bilinen boşluk: hiç canlı paket göndermeyen değiştirilmiş istemci; kapışma hiçbir yere sayılmadığı için kabul.

## İlgili
- [[2026-10-10-canli-kapisma-lobi-karti]]
- [[2026-10-11-parti-gecesi]]
- [[2026-10-11-tussle-m1-tek-seferlik-ve-parti-gecesi]]
