---
type: decision
project: diskort
date: 2026-09-30
status: active
tags: [diskort, ses, gurultu-engelleme, dpdfnet]
source: 69fe2863-181c-42b1-bef7-d93dd8e73177.jsonl
---

# Karar: DeepFilterNet 3 tamamen kaldırılır; bu seçeneği seçmiş kullanıcılar DPDFNet'e taşınır

## Bağlam
Son 3 günde: DPDFNet→DPDFNet 7 kullanıcı (ort. işlemci %32), DPDFNet→DeepFilterNet (düşmüş) 3, DPDFNet→hiçbiri 3, bilerek DeepFilterNet seçen 1.

## Karar
DeepFilterNet 3 (model dosyası, arayüz seçeneği, kod) silinir; eski DeepFilterNet/RNNoise seçenler ve tanınmayan değerler DPDFNet'e geçer. Görüşmede DPDFNet yetişemezse tarayıcının standart engellemesine düşülür ve birkaç dk sonra DPDFNet tekrar denenir. Düşüşte başlık çubuğu simgesi yeter (mesaj gerekmedi).

## Neden
Düşen kullanıcılar seçenekler arasında sıçrıyordu, telemetri yalnız bir kullanıcının bilerek seçtiğini gösteriyor; tek yol bakım yükünü azaltır.

## Reddedilen alternatifler
- Ekranda birkaç sn görünen mesaj: simge yeterli bulundu.
- DeepFilterNet'i tutmak: az kullanılıyor, düşüşleri karıştırıyordu.

## Sonuçlar / riskler
- İlk denemede `git rm` izin sınıflandırıcısınca engellendi; kullanıcı onayıyla ayrı commit olarak yapıldı ([[ajan-calisma-tuzaklari]]).

Benzer/ilgili not (başka ajan): [[dpdfnet-fallback-koku-neden]]
