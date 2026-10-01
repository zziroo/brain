---
type: decision
project: diskort
date: 2026-10-01
status: active
tags: [diskort, yayin, sahne, arayuz, masaustu]
source: Claude Code oturumu 2026-10-01 (sahne UI düzeltmeleri), main 573bdd0
---

# Karar: Yayınlar ızgarada kendi kutusunda oynar; büyütülen yayından ızgaraya dönülebilir, "izlemeyi bırak" kontrol satırında

## Bağlam
Yusuf iki yayını aynı anda izleyemediğini, yayın bir kez açılınca küçük kutulu ızgaraya dönemediğini, "izlemeyi bırak"ın video köşesinde (sağ altta) olmasını istemediğini ve ızgara/ayarlar ekranının ortalı olmadığını söyledi (ekran görüntüleriyle).

## Karar
- Sahnede "Yayını İzle" yayını kendi kutusunda oynatır, büyütmez (`watchStream(userId, false)`). Kenar çubuğu, profil ve "Yayınına git" girişleri eskisi gibi büyütür.
- Oynayan kutuya tıklayınca büyür; diğerleri alt şeritte, şeritteki izlenen yayınlar canlı kalır.
- Büyük görünümde başlıkta "Izgaraya dön" + Esc (tam ekrandaysa Esc önce tam ekrandan çıkar). Izgaraya dönmek aboneliği kapatmaz.
- "İzlemeyi bırak": büyük görünümde alt kontrol satırında (mikrofon/kulaklık/bağlantıyı kes yanında, göz kapalı ikonu). Izgarada ve şeritte izlenen kutunun üzerine gelince göz kapalı butonu (Yusuf'un önerisi).
- Büyütülen yayın bitince (bırakma ya da yayıncı kapatma, kendi yayının dahil) ızgaraya dönülür; başka yayına atlanmaz.
- Izgara kutuları bitişik ve ortalı (`gridFit.ts`: en büyük 16:9 kutu, en fazla 720px). Ayarlarda menü + içerik bloğu pencere ortasında.

## Neden
Discord'a yakın davranış (referans, kod değil) ve Yusuf'un istekleri. Izgara sütunları `1fr` olduğundan kutular geniş pencerede sütun ortasına oturuyor, arada büyük boşluk kalıyordu.

## Reddedilen alternatifler
- Büyük görünümde iki yayını yan yana bölme: seçilmedi, ızgara yeterli görüldü.
- Izgarada kontrol satırındaki butonun tüm yayınları bırakması: Yusuf kutu üzerinde göz butonunu tercih etti.

## Sonuçlar / riskler
- [[yayin-arayuzu-discord-tarzi]] notundaki "kartlarda izlemeyi bırak düğmesi yok" maddesi bununla değişti.
- Gerçek uygulamada denenmedi (status: yalnız typecheck + 154 test). Özellikle tam ekranda tek Esc'nin ızgaraya da dönüp dönmediği doğrulanmadı. Biri ayrılırken ızgara 180 ms kayabilir (düşük, bırakıldı).

## İlgili
- [[yayin-arayuzu-discord-tarzi]], [[2026-10-01-sahne-coklu-yayin-ve-ortalama]]
