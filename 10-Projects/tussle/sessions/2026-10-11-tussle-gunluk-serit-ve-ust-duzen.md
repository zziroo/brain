---
type: session
project: tussle
date: 2026-10-11
status: active
tags: [tussle, oturum, hud, yaris-seridi]
source: oturum 2026-10-10/11 (mobil-playus: günlük şerit, üst düzen)
---

# Oturum: günlük oyun şeridi ve oyun içi üst düzen (yayın `398b84d` → `bf3c248`)

- `398b84d` (yayın): günlük oyunda sabit işaretli şerit, geçmede ✓ (yazı kalktı, kapışmada da).
- `8625809`: yakın işaretler yan yana avatar grubu.
- `12851dc` + `f71a985`: şerit oyun yazılarına binmesin diye `Viewport.band` sözleşmesi; 50 oyun iki ekran boyunda tarandı (kutu, cark "Bu tur" hapı vb.); örtü bantları `hud.edge`; Matematik büyük mod baykuşu, Sepet/Tuğla HUD, Bıçak aşama çipi.
- `1553bbb` + `9364159`: Playus yerleşim örneği üzerine üst düzen: şerit en üstte → durum etiketi → ortalı kısa süre çubuğu (saniyesiz, son 5 sn kırmızı) → skor; kompakt mod kaldırıldı; Jöle tur süresi tabak halkası; bambu/spiral enerji çubuğu.
- `bf3c248` (yayın, yedek `pre-bf3c248.db`): şerit tekrar dolu sticker kutu.
- Her tur: yazar ajan → salt okunur inceleme (orta bulgular: Doldur/Kapı çubuğu kırmızı, etiket eğim kayması) → düzeltme → commit. Bir orta bulguyu (CSS dönüş sırası) koordinatör tek satırla düzeltti ve tarayıcıda baktı.
- Yusuf önerisi bekliyor: süreli ~18 oyunu "sonsuz, hızlanan" yapıya çevirmek (tur başına kısalan süre + can); önce 3–4 oyunla deneme önerildi, karar verilmedi.

Kararlar: [[2026-10-11-oyun-ici-ust-duzen-ve-gunluk-serit]]. Dersler: [[2026-10-11-ust-duzen-dersleri]].

**Doğrulanmadı:** ✓ animasyonu ve son 5 sn nabzı gerçek oyunda/telefonda; kapışma şeridinin yeni düzende canlı maçta görünümü (yalnız harness ile); Denge'de az işaret görünmesi seçim mantığına bağlandı, telefonda bakılmadı.
