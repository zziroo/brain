---
type: decision
project: tussle
date: 2026-10-19
status: active
tags: [tussle, arayuz, gecis, akicilik, view-transitions]
source: oturum "tussle: arayüz cilası (geçiş, koyu tema, sohbet)" (2026-10-19 akşam)
---

# Karar: ekran geçişi B itme her yerde, C paylaşılan öğe ortak nesne olan yerlerde, ekran geçişten sonra dolar

## Bağlam
Yusuf menülerde ilk açılışın takıldığını, ikinci girişte düzgün geldiğini söyledi; "akıcı ve smooth bir UI" istedi. Ölçüm (başsız Chrome, 4x CPU): her soğuk ekran tüm DOM'unu kaymanın ortasında tek karede kuruyordu (60–100 ms kare, ~2000 düğüm geçiş sırasında eklendi). Ekran parçaları ana pakette, tembel yükleme takılmanın nedeni değildi.

## Karar
- **B (iOS gibi itme):** yeni ekran sağdan tamamen üstüne kayar, eski ekran −%25 paralaks, kenar gölgesi, ~380 ms; View Transitions yolu ve CSS yedek yolu aynı hareket. Oyun ekranının solması değişmedi (orada kendi motorumuz devreye girip çıkıyor).
- **C (paylaşılan öğe):** yalnız iki ekranda süren bir nesne varken: oda kartı kapağı → odadaki bugünün kapağı, ana sayfa avatarı → profil avatarı, sezon bandı → sezon sayfası, profil rekoru → rekor sayfası, oyuncu avatarı → oyuncu kartı (alt sayfalar `openSheet({ morph })` ile). Ortak görseli olmayan yerler (ayarlar çarkı, düz listeler) B.
- **Sonra doldur:** ekran geçiş sırasında hiç dolmaz. Veri önbellekteyse geçişten önce çizilir (C'nin hedefi yakalama anında var olmalı), yoksa kabuk kayar, içerik geçiş bitince gelir. Sayfa başına önbellek: `net.ts` oda görünümü (8 oda).
- **Yerinde açılan liste** (bugünün tablosu) sayfaya çevrilmedi; kart yerinde büyür, sohbet aşağı kayar (FLIP, `motion.ts slideBelow`).

## Neden
- Takılmanın asıl nedeni geçiş ortasında dolmaydı; ölçümde geçiş içi eklenen düğüm ~0'a indi, en uzun kare 18–34 ms.
- B en "gerçek uygulama" hissi; C yalnız anlamlı olduğu yerde (küçük bir çarkın sayfaya büyümesi tuhaf durur). Yusuf prototipte (0/A/B/C/D) B ve C'yi seçti, C'yi her yerde istedi; "devam eden nesne" sınırı Claude'un önerisi, kabul edildi.

## Reddedilen alternatifler
- **"Önce hazırla" (veriyi ≤150 ms bekleyip geçişi sonra başlatmak):** dokunuştan harekete ~250 ms gecikme, yavaşlık gibi okunur; yalnız önbellek varken geçerli.
- **Ekranları boşta önceden ısıtmak / parça önyükleme:** hileli ya da kazancı yok (parça yok).
- **Kapakları `<img>` olarak önbelleklemek:** tema değişkenleri SVG içinde kırılır, şimdilik değmez.
- **A (ayarlı kayma), D (ölçek+solma):** prototipte denendi, B ve C seçildi.
- **Bugünün tablosunu sayfaya çevirmek:** bir adım ve geri tuşu ekler, sohbetle birlikte görme kaybolur; sonraya bırakıldı.

## Sonuçlar / riskler
- C iPhone'da iOS 18+ (WKWebView View Transitions); eskisi B'ye düşer. Android WebView güncel.
- Oda önbelleği yeni durum: deneme başlarken ve oda ayarı kaydedilince geçersizlenir; kapanmış gün önbellekten çizilmez.
- Geçiş sırasında giren ekran ve dönüşen alt sayfa tıklamaya kapalı; arka plan dönüşüm sırasında kapatmaz.
- Telefonda hissi denenmedi (`status` aktif, cihaz teyidi bekliyor).

## İlgili
- [[2026-10-19-maskot-yukleyici-karisik-havuz-uyku]]
- [[2026-10-19-gecis-olcumu-gizli-bolme-ve-view-transition-tuzaklari]]
- [[2026-10-19-tussle-arayuz-cilasi-gecis-maskot]]
