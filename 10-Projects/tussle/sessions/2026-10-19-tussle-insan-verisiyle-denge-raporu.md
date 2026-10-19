---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, denge, veri, bot]
source: oturum "tussle: insan verisiyle denge raporu" (mobil-playus yan oturumu, worktree claude/heuristic-dirac-c207c7)
---

# Oturum: gerçek oyuncu koşularıyla denge raporu

## Yapılan
- `scripts/balance-report.mjs` yazıldı ve commit'lendi (c98f940, dal `claude/heuristic-dirac-c207c7`; push yok, main'e girmedi, yayın yok). Konteynerde salt okunur toplar, Mac'te `tsx` ile oyun + sürüm bazlı tablo üretir; kullanım dosyanın başında.
- Canlı DB'den 1.282 koşu, 40 oyuncu (günlük + canlı maç + Parti Gecesi). Denge ve Köprü logları yerelde yeniden oynatıldı, skorlar sunucuyla birebir tuttu.
- Bulgular ve yöntem: [[2026-10-19-denge-insan-kosulariyla-surum-bazli-olculur]]; ilk koşu uçurumu ve gerçek tepki süreleri: [[2026-10-19-ilk-kosu-ucurumu-ve-insan-tepki-sureleri]].
- Tam tablo ve iki log analizi (Denge dokunuş tarafı/gecikme, Köprü bırakma hatası) yan oturum notlar klasöründe kaldı; script ile yeniden üretilir.

## Yusuf'un kararı
Hiçbir oyun şimdi ayarlanmıyor. Kısa koşulu oyunlar keşif sorunu olabilir, şikâyet gelirse ele alınır. Uzunlarda ölçüt "bitiyor mu": bitmeyen Bardak ve Çizgi aday, Basket/Çift/Hedef'in sonu belli. Yusuf önce YOSEF'le konuşacak.

## Doğrulanmayanlar
- Kısa koşuların "keşif" mi "zorluk" mu olduğu ayrılmadı; ilk koşu / sonraki koşu farkı ipucu (Denge ve Köprü öğreniliyor, Yörünge ikinci koşuda da 6 sn).
- Bambu, Kargo, Ritim, Katane, Bıçak'ın sim'ine bakılmadı; öneriler yön düzeyinde.
- Oyuncuların çoğu bir oyunu 1-3 kez oynamış: rapor ilk izlenim ağırlıklı.

## Sonra
- Antrenman ayrı veriyle gelirse ([[2026-10-19-antrenman-gizli-testci-modu-ve-ayri-veri]]) script onu da okuyabilir; şimdilik okumuyor.
- Dal main'e alınmak istenirse yalnız script dosyası, yayın gerektirmez.
