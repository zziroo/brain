---
type: decision
project: tussle
date: 2026-10-11
status: active
tags: [tussle, ui, oda, sohbet, sezon]
source: oturum 2026-10-11 (mobil-playus: deneme turu, rekor flaması, oda ekranı yeniden tasarımı F)
---

# Karar: Oda ekranı tek sayfa; üstte sezon bandı, bugün kartında canlı ilk 3, sekme ve haplar yok

## Bağlam
Yusuf Playus oda ekranını örnek gösterdi ("sezon üstte, gün altta, daha anlaşılır"). Bizdeki sorunlar: bugün kartında eşit ağırlıkta ~8 küçük öğe, "Bitti" düğme gibi duruyor; günün yarışı tek satır şeritte, tam liste alt sayfada; Tablo/Sezon/Üyeler haplarının "5 / 2. / 5" rozetleri şifreli; sezon sırası neredeyse görünmüyor; sohbeti her deneme ve yazı tura satırı boğuyor; altta üst üste iki çubuk.

## Karar
Maket turlarıyla (A/B/C → C'nin 4 alt varyantı → C-d → son tasarım F) seçildi, 3 adımda yapıldı (`80fa7b0`, `d3e72fb`, `339f0ca`):
- **Üst bar:** geri, oda adı (dokununca Üyeler), ayarlar. İsimli avatar dizisi ve davet düğmesi kalktı (davet Üyeler sayfasında).
- **Sarı sezon bandı:** sıra rozeti, puan · lider, 14 gün kutusu (sayı = o günkü sıran; 1 altın, 2 cyan, 3 mercan, 4+ soluk, oynanmamış geçmiş gün "–", bugün pembe çerçeve, gelecek kesikli), seri alevi üst satırda. Açıklama satırı ("Kutudaki sayı = o günkü sıran") Yusuf'un isteğiyle banttan sezon sayfasına taşındı. Sunucu: `SeasonInfo.myDays` (var olan sezon sorgusundan, şema değişmedi).
- **Bugün kartı = tek dokunma alanı (C-d):** butonsuz banner, kapak sağda tam renk, yalnız yazının arkasında degrade krem perde; 64 px statik pembe ▶ (şans açıksa para). Banner'a dokunmak mevcut başlangıç kartını açar (hak yalnız Başla'da harcanır). Bitince 76 px ince şerit.
- **Canlı ilk 3 her durumda kartta** (haklar bitmeden de): 3 çip + gerekirse "Sen N." + "4/6" + ⌄; dokununca kart yerinde tam listeye açılır (sıra, skor, deneme, sezon puanı). Skor çipte hiç kesilmez, yer azsa önce isim düşer.
- **Kalkanlar:** Tablo/Sezon/Üyeler hapları, skor tablosu alt sayfası, podyum şeridi, Sohbet | Skor sekmesi.
- **Tek sayfa kaydırma:** bant, kart, sohbet birlikte kayar; mesaj satırı sabit; oda en üstten açılır; sohbet son 30 mesaj + "Önceki mesajlar", aşağıdayken "↓ N yeni mesaj".
- **Kaydırınca küçülme (Yusuf'un fikri):** bant üst barın altına girince oda adının yanında sarı sezon çipi ("4. · 8 p · alev", dokununca sezon sayfası); kart da çıkınca üst barın altında 56 px bugün şeridi (kapak, skor/hak, lider, ▶/para). Klavye açıkken şerit gizli.
- **Sohbet:** oyuncunun günü tek skor kartı (rekorlar katlanmış, eskiler üstü çizili; yeni rekor kartı sona taşır); yazı tura soluk satır, art arda küçük olaylar "N küçük olay" çipi. "Kapışma iste" çubuğu yerine ⚔ mesaj satırında.

## Neden
Hiyerarşi tek bakışta okunuyor: önce sezon, sonra gün, en altta sohbet. Günün yarışı oynamadan önce de görünüyor (oynama isteği). Haplar ve alt sayfalar kalkınca bilgi ekranda, sekme kalkınca sohbete ~60 px yer açıldı. Kart = buton, büyük kapağı sığdırdı; deneme ve Başla zaten başlangıç kartında.

## Reddedilen alternatifler
- A (sahne + Sohbet/Bugün/Sezon sekmeleri): sezon sekmenin arkasında kalıyordu.
- B (kürsü hep açık): sohbete 2–3 mesaj kalıyordu.
- C-a/b/c (kartta görünür Oyna düğmesi): Yusuf düğmenin yer kapladığını söyledi, C-d seçildi.
- Bütün kapağı soluklaştırmak: kapak oyunun kimliği; perde yalnız yazı tarafında.
- "Bitti" hâlinde büyük banner: başlatılacak şey yok, kartı en uzun yapıyordu.
- Kaydırmayı yalnız sohbet içinde tutup sohbet yukarı kayınca üst kısmı tek şeride indirmek (Claude'un ilk önerisi, F6 maketi): Yusuf Playus tarzı "sezon bandı üst bara kapansın, gün sohbetle kaysın" istedi.
- Kapışma düğmesi Skor sekmesinde tam genişlik: fazla baskındı.
- Birebir Playus öğeleri (defne, koyu sekme/satırlar, mücevher, "TIME'S UP", mor bant): telif ve kimlik.

## Sonuçlar / riskler
- Telefonda görülmedi (unverified): klavye açılınca şeridin gizlenmesi ve mesaj satırı, çip/şerit belirme hissi, skor kartları, iOS'ta `overflow-anchor` yokluğu (baş bölüm boy değişimi ResizeObserver ile telafi ediliyor).
- Skor kartında yalnız rekorlar görünür (sunucu yalnız rekor satırı yazıyor); deneme sayısı canlı tablodan.
- Bilerek bırakılan düşükler: klavye açıkken ⚔ sıçrama gözlemcisinin 56 px üst payı; şerit eşik bandında "Önceki mesajlar"a biraz biniyor.
- Maketler `src/client/mockups/` (yalnız geliştirmede, yayın paketine girmez), özet `F-SPEC.md`.

## İlgili
- [[2026-10-09-oda-ekrani-sohbet-merkezli]] (yerleşim kısmını bu karar değiştirdi)
- [[2026-10-11-deneme-turu-gunde-bir-baslangic-kartinda]]
- [[2026-10-11-oda-yeniden-tasarim-dersleri]]
- [[_overview]]
