---
type: decision
project: kapis
date: 2026-10-05
status: active
tags: [kapis, tema, harita, urun]
source: oturum 2026-10-04/05 (web-fps-game, dünya temaları)
---

# Karar: temalar yalnız dünyayı değiştirir, aynı haritayı kaplar; her maç rastgele, oda sahibi seçebilir

## Bağlam
Yusuf neon görünümü ortaçağ gibi farklı temalara çevirmek istedi; arkadaşların ilgisini çekmesi hedef.

## Karar
- 7 tema (`src/shared/themes.ts`): neon, medieval (Ortaçağ Şatosu), halloween (Cadılar Bayramı), japan (Sakura Tapınağı), lava (Lav Madeni), snow (Kutup İstasyonu), desert (Çöl Harabeleri).
- **Yalnız dünya değişir** (gökyüzü, yüzey, dekor, ışık, sis, parçacık, müzik + ortam sesi); kahramanlar, çarpışma, doğuş, jump pad ve can paketi aynı.
- **Varsayılan her maç rastgele** (oda başına karışık torba: hepsi bir kez gelmeden tekrar yok, arka arkaya aynı yok); oda sahibi sabit tema seçebilir (giriş ekranı + Esc → Oda). Tema değişikliği maçı yeniden başlatır, 2 sn bekleme süresi var.
- Başka bir ayar (bot sayısı vb.) maçı yeniden başlatırsa tema **değişmez** (Claude'un kararı: maç ortasında arena aniden değişmesin).
- Tur başında tanıtım kartı + harita raylarında kamera turu; sonuç ekranında "Sıradaki arena" çarkı; giriş ekranında canlı tema vitrini.
- Temalar **haritadan bağımsız** yazıldı (koordinat yok, dekor harita verisinden), çünkü yeni haritalar sırada.
- Ortam sesi Müzik ayarına bağlı (Efekt'e değil): müziği kısan ortamı da kısar, ayak sesi/atış duyulur.
- İçerik kuralı (Claude'un kararı): dini sembol yok; ortaçağ sancaklarındaki ve kuledeki haçlar güneş/kule armasıyla değiştirildi (can paketindeki yeşil haç evrensel sağlık işareti olarak kaldı).

## Neden
- Aynı harita: denge ve botların yol ağı bozulmuyor, emek görünüme gidiyor; Overwatch'ta da fütüristik kahraman + ortaçağ haritası (Eichenwalde) tuhaf durmuyor.
- Rastgele + seçilebilir: Yusuf'un isteği.
- Haritadan bağımsızlık: ileride her harita × 7 tema çeşitlilik verir.

## Reddedilen alternatifler
- Tam dönüşüm (şövalye/okçu kahramanlar, arbalet, büyü): 6 kahramanın modeli + efekti + sesi baştan; şimdilik reddedildi, ileride "kostüm" olabilir.
- Her temaya ayrı harita: iş iki katı; harita sonra ayrı iş olarak yapılacak.
- Her oyuncunun kendi teması: arkadaşlar aynı maçta farklı dünya görür.

## Sonuçlar / riskler
- Tema bütçeleri ~100 m'ye kadar haritaları varsayıyor; kamera uzak düzlemi 400 m.
- Müzik ve ortam sesleri yalnız ölçümle ayarlandı, dinlenmedi (`status: unverified` sayılmalı).

## İlgili
- [[2026-10-05-tema-altyapisi-themedef-ve-arka-plan-insa]], [[2026-10-05-kapis-dunya-temalari]], [[_overview]]
