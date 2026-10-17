---
type: session
project: tussle
date: 2026-10-17
status: done
tags: [tussle, ui, kapisma, ayarlar, performans, yayin]
source: "tussle: kapışma ızgarası, bağlı hesap, profil açılışı (2026-10-17)"
---

# Oturum: kapışma ızgarası, bağlı hesap rozetleri, hak rozeti ve deneme düğmesi

## Ne yapıldı
Yusuf'un telefondaki geri bildirimleri, üç yayında (`a35b9db`, `c22c668`, `2db9eed`; her biri `deploy/release.sh` ile, yedek `pre-<rev>.db`, healthz ok):
- **Kapışma / Parti Gecesi penceresi:** oyun ızgarası profildeki rekor ızgarası gibi: 4 sütun (440 px üstü 5), kapak hücreyi doldurur, kutu yok, seçili kapakta halka. Partide seçili kapağın köşesinde sıra numarası. Pencere neredeyse tam boy (üstte 12 px şerit).
- **Ayarlar > Hesap:** bağlı Google/Apple cümle yerine giriş düğmesi biçiminde satır + yeşil "✓ Bağlı" etiketi. Çıkış yap dolu düğme (kapı simgesi), Hesabımı sil kırmızı çerçeveli düğme (yeni `trash` simgesi). Hayalet düğmeler "havada" duruyordu.
- **Profili düzenle takılması:** ölçüldü, sebep `#app.inert`; açılış bitince konuyor. Bkz. [[2026-10-17-pencere-acilisinda-inert-tum-sayfayi-yeniden-bicimlendirir]].
- **Oyun başlangıç kartı:** hak "●●● 3/3 hak" (nokta = hak, dolu = kalan; son hak sarı "Son hak · 1/3"), günün toplamı `today.tries`'tan. Günde bir deneme turu bağlantı yerine Başla'nın hemen altında ikincil düğme ("günde 1 · sayılmaz").

## Alınan kararlar
- Yeni karar notu yok (görsel düzeltmeler). Tema: Yusuf varsayılanın "Sistem" mi olması gerektiğini sordu; Claude **Gündüz'ün kalmasını** önerdi (kimlik Şeker Dükkanı, Android TWA açılış ekranı/gezinme çubuğu sabit açık renk, Sistem varsayılanında koyu modlu telefonda açık→koyu parlama olur; Gece/Sistem ayarda seçilebilir). Yusuf'un yanıtı yok; mevcut karar [[2026-10-08-gorsel-kimlik-seker-dukkani-acik-varsayilan]] geçerli.

## Öğrenilenler
- [[2026-10-17-pencere-acilisinda-inert-tum-sayfayi-yeniden-bicimlendirir]]

## Açık kalanlar
- Hiçbiri telefonda denenmedi: kapışma ızgarası ve tam boy pencere, profil düzenle açılışı, başlangıç kartı.
- iOS'a ancak OTA paketi yenilenince gider (build 3/4 kullanıcıları).
