---
type: lesson
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, ai-motoru, claude-cli, kesilme, teshis]
source: oturum 2026-10-04; sunucu ajanının 2.1.284 ikilisini okuması ve yapay testler. Gerçek büyük üretimde doğrulanmadı.
---

# Claude CLI çıkış sınırında yanıtı yeni iletiyle sürdürür; yalnız son iletiyi okuyan kod belgenin ortasını alır

## Ne oldu
Witcher 3 rehberi (çıktı 64 bin token'ı aşıyor) Opus ile iki kez üretildi, ikisi de `$.v / $.summary / $.groups eksik` hatasıyla düştü: 22 dakika, ~160 bin çıkış token'ı (API karşılığı ~6 dolar) boşa gitti. Bir önceki Opus üretimi de aynı nedenle iki deneme sürmüştü (~125 bin token).

## Kök neden
- Başsız kipte (`claude -p`) CLI çıkış sınırına gelince en çok 3 kez "Output token limit hit. Resume directly…" iletisi ekler; model **yeni bir asistan iletisinde** devam eder.
- `result.result` yalnız **son** iletiyi içerir. Akıştaki asistan olaylarında `stop_reason` null gelir, yani "max_tokens" denetimi tetiklenmez.
- Bizim JSON ayıklayıcı, kapanmamış üst nesnenin **içine** girip kapanan ilk küçük nesneyi (bir `{label,value}` bilgi çipi) belge diye döndürüyordu. Kesilme, sıradan doğrulama hatası gibi göründü ve onarım turu her şeyi baştan yazdırdı.

## Yanlış teşhis
İlk okuma "model belgeyi başka bir nesneye sarıyor" oldu ve sarmalayıcı açma eklendi (`ad9c3e8`); hata aynı kalınca yanlış olduğu anlaşıldı. Ham çıktı saklanmadığı için tahmin yürütüldü.

## Düzeltme (`b017f55`)
- Birden çok asistan iletisi varsa metin blokları birleştirilir (düşünme blokları hariç).
- Ayıklayıcı yalnız üst düzey adayları dener; kapanmayan JSON başlangıcı doğrudan "kesildi"dir, içine girilmez.
- Kesilmede onarım turu çalışmaz.
- Her çağrı için günlük satırı: durma nedeni, ileti sayısı, karakter, çıkış ve düşünme token'ı, model sınırı. Başarısız üretimin ham çıktısı `DATA_DIR/debug/` altında (son 6 dosya).
- `REHBER_MAX_OUTPUT_TOKENS` 128000 yapıldı (Sonnet 5.5 için model sınırı 128000 bildirildi; Opus'unki günlükten okunacak).

## Ders
- Model çıktısı başarısız olunca önce ham çıktıyı sakla, sonra teşhis koy; pahalı üretimde tahminle düzeltme deneme.
- "İlk kapanan JSON nesnesini al" türü toleranslı ayıklama kesilmeyi gizler.
- Düşünme (thinking) varsayılan açık ve uyarlamalı; çıkış sınırından yer. Kapatmak için `MAX_THINKING_TOKENS=0` (çocuk ortam izin listesine eklendi); büyük rehberdeki etkisi ölçülmedi.

## İlgili
- [[buyuk-rehberde-model-kisaltiyor]], [[2026-10-04-ai-motoru-sunucu-icinde-claude-cli]], [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
