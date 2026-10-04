---
type: lesson
project: isik-bekcisi
date: 2026-10-04
status: active
tags: [isik-bekcisi, hikaye, oyun-akisi, inceleme]
source: oturum 2026-10-04 (incremantal-game, 9e4d0124); inceleme ajanı bulgusu
---

# Ders: oyunun zorla durduğu bir nokta, farkında olmadan hikâye kapısı işi görüyor olabilir; kaldırmadan önce bölüm koşullarına bak

## Ne oldu
"Fener seferi bitirmesin" değişikliği ilk turda beş fenerin hepsine uygulandı. Uygulama ajanı testleri geçti, bot oyunu kazandı. Ayrı inceleme ajanı şunu buldu: 5. fener seferi bitirmeyince oyuncu ~230 birim yürüyüp Gecenin Kalbi'ne giriyor; Kalp'i anlatan konuşmalar (`ch: LAST`) ilk dövüşten sonraya kalıyor, aynı seferde Kalp yenilirse epiloğa geçilip bu konuşmalar kalıcı kayboluyordu. Zorunlu kampa dönüş, bölümler arası anlatının sırasını sessizce garanti ediyormuş. Ayrıca 1,8 sn'lik kutlama anında hızlı oyuncu Kalp'i yine başlatabiliyordu (eski sürümde de vardı); tek satırlık koşulla kapatıldı.

## Ders
- Bir akış kısıtını (zorunlu dönüş, sahne geçişi, sefer sonu) kaldırırken, hikâyenin hangi koşulların o noktada sağlandığını varsaydığını ara: `when: { ch, minCh, maxCh, after }` ve bölüm hesabı (`chapterOf`, `S.won`).
- Botun kazanması ve hikâye testinin geçmesi bunu yakalamadı; yakalayan, "hangi varsayım bozuldu" diye bakan ayrı inceleyiciydi. Akışı değiştiren işte inceleme ajanına bu soruyu açıkça sor.
- Bir "an" (kutlama, kindle) sırasında oyuncu hâlâ yürüyebiliyorsa, o anda başka bir olayın (boss başlangıcı) tetiklenebileceğini kontrol et.

## İlgili
- [[2026-10-04-fener-seferi-bitirmez-yalniz-besinci-bitirir]]
- [[2026-10-02-birlesmeden-sonra-her-sahneye-bak]]
- [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
