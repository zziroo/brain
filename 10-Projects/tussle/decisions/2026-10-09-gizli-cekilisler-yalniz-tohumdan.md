---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, hile, determinizm, oyun-sozlesmesi]
source: oturum 2026-10-09 (mobil-playus: Parti B + C, deneme hakkı ayırma, şans hakkı, skor ölçüleri), Parti C inceleme ajanı (2 yüksek bulgu) + şüpheci doğrulama
---

# Karar: Gizli değerler yalnız tohum akışından çekilir; dokunma anıyla (hash2(tick, …)) karıştırılmaz

## Bağlam
Sözleşme, keşfi zorlaştırmak için gizli çekilişleri `hash2(tick, …)` ile karıştırmayı öneriyordu. İnceleme: oyuncu anı seçebildiği için modifiye istemci simi klonlayıp uygun tik'i seçerek sonucu yönlendirebiliyor. Ölçülen: Kart Çevir'de eşleri zorlama (dürüst en iyi 1267 → 2521), Balon'da patlama noktasını büyütme (kâhin 3812 → 7972). Yüksek mi Alçak mı'da eşit kartlardan kaçma +%6.

## Karar
Gizli değerler yalnız tohum akışından (çekiliş sayısı sabit). Kart Çevir, Balon, Yüksek mi Alçak mı (v2), Top Nerede düzeltildi; sözleşme maddesi değişti. Kutu eski istisna (ek avantaj vermiyor), Farklı Olan zararsız istisna (farklı surat zaten ekranda).

## Neden
Deneme başına tohum ve tohumun ancak "Başla"da gelmesi stok istemcide keşfi zaten kapatıyor; karıştırma artık bir şey korumuyor, sadece manipülasyon kapısı açıyordu. Düzeltmeyle hile yapan istemci dürüst kusursuz oyuncuyla aynı puanı alıyor (1276/1276).

## Reddedilen alternatifler
- Karıştırmayı tutup tik'i sunucuya sabitlemek: tekrar oynatma modelini ve gecikmesiz oynanışı bozar.
- Balon'u balonun çıktığı tik'e bağlamak: önceki balonun bırakılma zamanıyla yine yönlendirilebilir.

## Sonuçlar / riskler
Durumu okuyan istemci (kâhin) engellenemez; sunucu şüphe bayrakları (kutu, yuksek, refleks) yalnız işaretler, tabloyu etkilemez.

## İlgili
- [[2026-10-09-deneme-hakki-baslangicta-ayrilir]]
- [[2026-10-08-deterministik-sim-ve-sunucuda-tekrar-oynatma]]
