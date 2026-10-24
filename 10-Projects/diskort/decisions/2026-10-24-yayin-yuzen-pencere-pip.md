---
type: decision
project: diskort
date: 2026-10-24
status: active
tags: [diskort, masaustu, yayin, pip]
source: "diskort: yayın yüzen pencere (PiP)" oturumu (Fable 5.1 koordinatör, 1 Opus ajan + inceleme)
---

# Karar: Yayın izlerken sahne kapanınca yüzen köşe penceresi (Discord tarzı PiP), köşeye yapışan ve 16:9 boyutlanan

## Bağlam
Yusuf bir yayını izlerken metin kanalına ya da DM'e geçince ses sahnesi (`VoiceStage`) kalkıyor, yayın sesi arkada sürüyor ama görüntü kayboluyordu. Discord'daki gibi taşınabilir, köşeye yapışan, büyütülüp küçültülebilen bir pencere istedi (0.12.1, `a2f845f`).

## Karar
- `StreamPip` (`components/stage/StreamPip.tsx`, saf hesap `pip.ts`): seste olunup sahne ekranda değilken ve izlenen yayın varken ana içerik alanının köşesinde 16:9 pencere. Hangi yayın: büyütülmüş olan, yoksa izlenenlerin ilki; kendi yayınım gösterilmez.
- "Sahne ekranda" tespiti `useUi.stageMounts` sayacıyla (VoiceStage mount'ta kaydolur); böylece DM araması paneli de kapsanır.
- Konum **köşe** olarak tutulur (piksel değil); bırakınca pencere merkezine en yakın köşeye 240 ms animasyonla yapışır, alan boyutlanınca aynı köşede kalır. Kenar boşluğu 16 px.
- Boyut: yapışılan köşenin karşı iki kenarı ve köşesinden; yalnız genişlik tutulur, 240 px ile alanın %85'i arası. Köşe ve genişlik `settings`'te kalıcı.
- Düz tık sahneye döner (StreamView'ın 250 ms gecikmeli tık mantığı), çift tık tam ekran. Üst şerit "← kanal adı", alt şerit YAYINDA + yayıncı + ses aç/kapat + izlemeyi bırak; şeritler yalnız fare üstündeyken.

## Neden
- Konumu köşe olarak tutmak pencere boyutlandığında taşmayı kendiliğinden çözer; Discord da 4 köşeye yapışır.
- Tek dosyada saf hesap (`pip.ts`) testlenebilir: en yakın köşe, kırpma, genişlik sınırı 7 testle kapatıldı.
- Sayaç yerine `view.kind === 'voice'` bakmak DM aramasını kaçırırdı.

## Reddedilen alternatifler
- Serbest piksel konumu (yapışmasız): yeniden boyutlanmada taşar, Yusuf köşeye yapışma istedi.
- Ayrı Electron penceresi (gerçek PiP): LiveKit track'ini ikinci pencereye taşımak gerekir, kapsam büyür; uygulama içi katman yeterli.
- Taşımada `pointerdown` anında pointer capture (inceleme önerisi): yakalayan öğe `click` hedefi olur, içteki StreamView'ın tıkla-sahneye-dön davranışı bozulurdu. Yerine `buttons === 0` ve `lostpointercapture` ile hareketi bitirme seçildi ([[2026-10-24-pointer-capture-click-hedefini-degistirir]]).

## Sonuçlar / riskler
- Canlıda denenmedi: sürükleme hissi, tutamaç tutulabilirliği (kenar 8 px, köşe 16 px), taşıma sonrası tıkın yutulması.
- Varsayılan sağ alt köşe metin kanalında mesaj kutusunun emoji/GIF düğmelerini kapatabilir; gerekirse varsayılan değişir.
- Çift tık tam ekranda kontrol çubuğu yok, çıkış yalnız Esc (küçük kutucuklarda da böyle).

## İlgili
- [[2026-10-22-yayin-izleme-tek-tik-zoom-ve-ses-satirinda-sabit-yuva]]
- [[yayin-arayuzu-discord-tarzi]]
- [[2026-10-24-yayin-pip-ve-0-12-1]]
