---
type: lesson
project: diskort
date: 2026-10-23
status: active
tags: [diskort, orkestra, ajan]
source: 2026-10-23 oturumu "diskort: 0.12.0 kozmetikler kaldırıldı + oyun sayfası" (masaüstü söküm ajanı)
---

# Ajan `npx prettier --write` çalıştırınca projede yapılandırma olmadığından dosyalar varsayılan stile döndü

**Olay:** Kozmetik sökümünün masaüstü ajanı bir ara `npx prettier --write` çalıştırdı. Projede prettier yapılandırması olmadığı için dosyalar varsayılan stile (çift tırnak, 80 sütun) döndü; ajan bunu fark edip etkilenen dosyaları HEAD'den geri alıp düzenlemeleri elle yeniden uyguladı. İnceleme ajanı `-w` karşılaştırmasıyla biçim dışı kalıntı olmadığını doğruladı.

**Ders:** Ajan brief'lerine "prettier/biçimlendirici çalıştırma" kuralı zaten Claude hafızasında (`diskort-workflow.md`: "Don't prettier existing files") ama ajan görmüyor; büyük söküm/yeniden düzenleme brief'lerine tek cümle olarak ekle. İnceleme ajanına "biçim dışı istenmeyen fark var mı" sorusu bu tür olaylarda işe yaradı.

**Bağlam cezası:** Aynı ajan ~200k bağlam tavanında devretti (60 çağrı). 150 dosyalık söküm için üç ajan (mobil / shared+core+sunucu / masaüstü+belge) doğru bölmeydi; shared ve sunucuyu ayrı ajana vermek daha da iyi olurdu.
