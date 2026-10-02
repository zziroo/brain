---
type: decision
project: kul-tahti
date: 2026-10-02
status: active
tags: [kul-tahti, mimari, orkestrasyon, threejs]
source: oturum 2026-10-02 (web-boss-teaser ilk sürüm)
---

# Karar: Oyun derleme adımsız Three.js ile, önce yazılan bir modül sözleşmesine göre 4 paralel ajanla kuruldu

## Bağlam
Büyük, görsel ağırlıklı bir web oyunu isteniyordu ve "webde çalışsın" şartı vardı. Haftalık limit %91 doluyken Yusuf bilerek tam orkestrasyonu seçti (limit oturum içinde sıfırlandı).

## Karar
- Derleme yok: ES modülleri + import map ile Three.js r170 (jsDelivr). Her şey prosedürel, dış dosya yok.
- Koordinatör önce iskeleti yazdı: `main.js` (durum makinesi, döngü), `core/` (olaylar, girdi, zaman, savaş sözleşmesi), her modül için çalışan stub'lar ve `ARCHITECTURE.md` (API'ler, olay kataloğu, sanat yönü, denge sayıları, performans bütçesi).
- Dikey dilimle 4 Opus ajanı paralel çalıştı: dünya+render, karakter, boss, efekt+arayüz+ses. Her biri yalnız kendi klasörüne yazdı; eksik modüller otomatik stub'a düştü (`?use=` / `?stub=` bayrakları).

## Neden
- Derleme adımı olmayınca her statik sunucuda ve Artifact olarak da çalışıyor; kurulum gerektirmiyor.
- Sözleşme + stub sayesinde ajanlar birbirini beklemeden kendi modülünü uçtan uca test edebildi; entegrasyonda yalnızca küçük uyum düzeltmeleri gerekti.
- Three.js r170: ajanların API bilgisinin en güvenilir olduğu sürüm (en yenisi 0.186 idi).

## Reddedilen alternatifler
- Vite + npm projesi: daha "profesyonel" ama kurulum ve derleme ister; Artifact yayını zorlaşır.
- Yalın yapım (tek ajan / koordinatör yazar): limit dostu ama kapsam daha dar; Yusuf tam orkestrasyonu seçti.
- Rol bazlı bölme (örn. "modelci", "animasyoncu"): modüller iç içe geçerdi; dikey dilim çakışmayı önledi.
- Hazır model/ses dosyaları: "sınırları görmek" isteğine ve dosyasız taşınabilirliğe ters.

## Sonuçlar / riskler
- ~20 bin satır, 4 ajan × ~0,5M token. İnceleme kapısı kritik/yüksek bulgu bulmadı; orta bulgular düzeltildi.
- Artifact içinde import map'in (sayfa iskeletine sarılınca) çalıştığı doğrulanmadı.

## İlgili
- [[10-Projects/kul-tahti/_overview|Kül Tahtı]]
- [[2026-10-02-ilk-surum]]
