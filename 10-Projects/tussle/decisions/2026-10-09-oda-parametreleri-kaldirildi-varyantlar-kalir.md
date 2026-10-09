---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, denge, host-paneli, urun]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A)
---

# Karar: Oda başına oyun parametresi yok; oyun her odada aynı hisseder, denge kodda, varyantlar kalır

## Bağlam
Host paneli her oyunun `meta.params` şemasından form üretip oda bazında override saklıyordu. Yusuf: aynı oyunu başka bir odada oynayan kişi bambaşka hisseder; oyunları biz dengeleyelim.

## Karar
Host panelinden parametre bölümü kaldırıldı; sunucu oda ayarlarında `params` kabul etmiyor. `meta.params` şeması ve `resolveParams` kaldı (varyantlar ve geçmiş günlerin tekrar oynatması için). Eski `days.params` satırları aynen doğrulanıyor. Varyantlar (Klasik / Rüzgâr / Hızlı…) "farklı oyun" sayılır, kalır; her oyunda zorunlu değil.

Aynı turda: odadaki "Önceki günler (antrenman)" listesi kaldırıldı, yerine günün oyunu için **deneme turu** (aynı oyun+varyant, rastgele tohum, hak harcamaz, kaydedilmez). Ana sayfadaki genel antrenman galerisi duruyor.

## Neden
Oyun hissi sabit olmalı; denge tek yerde (kod) olunca test edilebilir ve karşılaştırılabilir. Deneme turu, geçmiş gün listesinden daha az karmaşık ve günün oyununa odaklı.

## Reddedilen alternatifler
- Parametreleri "gelişmiş" başlığı altında tutmak: aynı sorun, sadece saklanmış.
- Varyantları da kaldırmak: günün çeşitliliğini azaltırdı; Yusuf onayladı, kaldı.

## Sonuçlar / riskler
- [[2026-10-08-kule-salinim-parametresi-ve-migrasyon]] geçerli: zorluk günün saklı parametrelerinde yaşamaya devam ediyor (varyant + varsayılan), oda override'ı yok.
- Ses seviyesi kaydırıcısı da kaldırıldı (telefonun sesi kontrol eder); yalnız Ses aç/kapa.

## İlgili
- [[_overview]]
