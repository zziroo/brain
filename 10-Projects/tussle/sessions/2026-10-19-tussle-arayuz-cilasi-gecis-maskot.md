---
type: session
project: tussle
date: 2026-10-19
status: active
tags: [tussle, arayuz, gecis, maskot, koyu-tema, akicilik, yayin]
source: oturum "tussle: arayüz cilası (geçiş, koyu tema, sohbet)" (2026-10-19 akşam)
---

# Oturum: arayüz cilası — geçişler, maskot yükleyici, koyu tema (19 Eki akşam)

Yayın: sunucu + OTA `77dd746` (0.20261019.1658). Önceki ara yayın `bf7f761` (sohbet kayması, Gece kontrastı, ilk açılış düzeltmeleri).

## Kararlar (Yusuf)
- **Geçiş:** B (iOS gibi itme, eski ekran -%25 paralaks) her yerde; C (paylaşılan öğe büyür) devam eden bir nesne olan yerlerde: oda kartı→oda, avatar→profil, sezon bandı→sezon sayfası, rekor→rekor sayfası, oyuncu avatarı→oyuncu kartı. Ayarlar gibi ortak görseli olmayan yerlerde B. Prototip Artifact'te denendi (0/A/B/C/D).
- **Yerinde açılan listeler sayfaya çevrilmedi** (bugünün tablosu yerinde büyüyerek açılır, FLIP); sayfaya çevirme sonraya.
- **Sonra doldur:** ekran geçiş sırasında dolmaz; önbellekte veri varsa geçişten önce çizilir (C için hedef hazır olmalı), yoksa geçişten sonra. Takılmanın asıl nedeni buydu (4x CPU: geçiş ortasında 2000 düğüm → ~0).
- **Maskot yükleyici:** iskelet yerine logodaki üçlü. Karışık havuz 10: Birdirbir, Kule, Taç kapmaca, Tahterevalli, Cee-ee, Takla, İp atlama, Yarış, Domino, Hapşırık (Kule/Cee-ee/Yarış yalnız büyük boy). Elenen: Atlıkarınca, eski dalga. Uyku yalnız 8 sn sonra ve o anki tur bitince; dokununca uyanır. 180 ms'den kısa beklemede görünmez, görününce ≥400 ms kalır. "Yükleniyor" yazısı ancak 3 sn sonra (Yusuf kararsızdı, Claude önerdi). Maskot görünsün diye yapay bekletme yok.
- **Kilitli oda kartına maskot konmadı** (kart sıkıştı, sohbetin boş durum üçlüsüyle çift oldu); parti lobisinde uyuklayan üçlü var.

## Teknik
- iPhone'da C (View Transitions) iOS 18+; eskisinde B'ye düşer. Kendi oyun motorumuz yalnız oyun ekranında, menüler WebView; oyun ekranı geçişine dokunulmadı.
- Gece temasında `--ink` tema yüzeylerinde kullanılıyordu (↓ düğmesi 1:1); yeni token'lar `--on-accent`, `--fab-*`; `tests/theme-contrast.test.ts` koruyor. Açık temayı da etkileyen küçük kontrast sorunları açık (kilitli kart 1/2, davet kartı, kendi mesaj saati, "2 hak", parti buton yazıları) — Yusuf'a soruldu, cevap yok.
- AudioContext boşta kuruluyor (ilk dokunuş ~95 ms takılması); iOS ses kilidi telefonda denenmedi.
- Her parça ayrı inceleme ajanından geçti; son başsız tarayıcı turunda tüm adımlar temiz.

İlgili: [[2026-10-19-ekran-gecisi-itme-paylasilan-oge-sonra-doldur]], [[2026-10-19-maskot-yukleyici-karisik-havuz-uyku]], [[2026-10-19-gecis-olcumu-gizli-bolme-ve-view-transition-tuzaklari]], önceki: [[2026-10-19-tussle-sohbet-gun-ayirici-paylasim]].

## Telefonda bakılacak
Geçiş hissi, yavaş ağda maskot ve Uyku, iPhone'da ilk dokunuşta ses, klavye açıkken sohbet, Gece teması, eski iPhone'da B'ye düşüş.
