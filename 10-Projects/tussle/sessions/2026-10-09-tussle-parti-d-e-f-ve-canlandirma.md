---
type: session
project: tussle
date: 2026-10-09
status: active
tags: [tussle, oturum]
source: oturum 2026-10-09 (mobil-playus)
---

# Oturum: Parti D-E-F, canlandırma, beceri öncelikli havuz

- **Parti D** (yayın `91083e7`): Doğru Kapı, Örüntü, İp Atla, Fırlat, Çarkı Durdur, Hazine Haritası + kit düzeltmeleri (HUD rozeti, gradeSticker hook'u, TextLabel.set, skor/çarpı çakışması). İnceleme: Çark çift dokunuş kilidi, İp Atla hızlanma, Hazine süre sonu gösterimi.
- **Parti E** (yayın `3b70297`): Vinç, Plinko, Zar Kulesi, Gizli Geçit, Piñata, Salyangoz (şans teması). Şüpheli bayrakları (Geçit, Plinko, Hazine), otomatik bırakma 0 puan, Salyangoz ×8 tavan.
- Yusuf E'yi "eksik" buldu → 12 oyun (E+F) tarayıcıda canlandırıldı; sonra asıl kastın mekanik olduğu anlaşıldı → [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]].
- **Parti F + canlandırma + OFF_POOL** (yayın `4576161`): Şifre Kır, Kaç Tane, Çizgi Takip, Bardak Doldur, Şeker Ritmi, Jeton İtici. Havuz dışı: itici, plinko, salyangoz, zar. Vinç v2 saf nişan; Zar v2, Plinko v2 zamanlama.
- Yedekler: `/opt/tussle/data/pre-3b70297.db`, `pre-4576161.db`. 1.279 test yeşil.
- Kararlar: [[2026-10-09-havuz-beceri-oncelikli-havuz-disi-liste]], [[2026-10-09-ajanlar-tarayicida-oynar]]. Dersler: [[2026-10-09-parti-d-e-f-dersleri]].
- Şeker Ritmi son girdi kuralı: aynı şeritte bir vuruştan sonraki 4 tik (sıçrama) ve geniş şekerde diğer şeritteki 6 tik (ikinci başparmak) arama öncesinde yok sayılır; ilk şekerden önceki boş dokunuşlar ücretsiz.
- Yayın izni: Yusuf bu oturum için SSH ile yayın/yedek işlerini Claude'a bıraktı.

## Doğrulanmayanlar
- D/E/F oyunlarının hiçbiri gerçek telefonda görülmedi (yalnız headless Chrome). Özellikle: Fırlat hassasiyeti, İp Atla ilk oyuncu süresi (~14 sn), Şeker Ritmi geniş şeker/sıçrama, Vinç güvenli bantları (küçük ödülde ~11 px), Çizgi Takip zorluğu, Kaç Tane geç turlar.
- Canlandırılan oyunların ucuz telefonda ilk kare/katman pişirme takılması (Zar ~65 tuval, Piñata sprite) ölçülmedi.
- Jeton İtici tek şerit baskınlığı (~0,87) çözülmedi; havuz dışında.
