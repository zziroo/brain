---
type: decision
project: genel
date: 2026-10-15
status: active
tags: [working-rules, masaustu-uygulamasi, oturum-basligi, klasor-duzeni]
source: Claude Code oturumu 2026-10-15 "sistem: oturum başlıkları ve klasör adları" (ZZ kökü)
---

# Karar: Oturum başlıkları `<proje>: <konu>`; ZZ kökünde önek konu olur, klasör adları değişmez

## Bağlam
Başlık kalıbı sonradan geldiği için eski oturumlar ("gelistirmeye devamm", "diskort feedback rutin" ×6, "Sence burdaki toollar") kenar çubuğunda kötü duruyordu. Ayrıca iki klasör repo adıyla uyuşmuyor: `zProjects/mobil-playus` → GitHub `zziroo/tussle`, `zProjects/incremantal-game` → `zziroo/isik-bekcisi`. Yusuf hem başlıkları hem klasör düzenini sordu.

## Karar
1. **Bütün oturumlar yeniden adlandırıldı** (47 oturum, 13'ü zaten uygundu). Kalıp `<proje>: <konu>`; proje adı vault'taki klasör adıyla aynı (tussle, isik-bekcisi, diskort, pano, rehber-okuyucu, ceviri-araci, silksong-mod, ziroo-edge). Aynı gün birden çok gözcü koşusu tarihle ayrılır ("diskort: gözcü 14 Eki").
2. **ZZ kökündeki oturumlar "ZZ:" öneki almaz**, çünkü ZZ bir proje değil; önek konudur: `sistem:` (Claude Code, orkestra, kurulum, hesap/araç ayarları), `araştırma:` (dış repo ve fikir incelemeleri), `marka:`, `kişisel:`. Kökte yapılan ama bir projeye ait iş projenin adını taşır (`tussle: gece DB yedeği`, `pano: ...`).
3. **Klasörler yeniden adlandırılmadı.** `mobil-playus` ve `incremantal-game` olduğu gibi kaldı.
4. Oturumlar kenar çubuğunda gruba taşınmadı; yalnız başlık değişti. Kural `~/.claude/CLAUDE.md` "Session title" maddesine yazıldı.

## Neden
- Başlık yalnız görünüm: her oturumun kendi klasöründeki `custom-title.json` içinde tek satır; vault, transcript, rapor, preset, zamanlanmış görev hiçbiri başlığa bağlı değil. Yeniden adlandırmanın yan etkisi yok.
- Klasör adını değiştirmenin bedeli var: o klasöre bağlı ~25 masaüstü oturumu `cwd` olarak eski yolu tutar ve açılmaz; `~/.claude/projects` altındaki transcript/memory dizini yoldan türediği için ayrı dizine düşer; `mobil-playus` ve `incremantal-game` presetleri boş yola işaret eder (uygulamadan elle yeniden kurulmalı). Kazanç ise yalnız kozmetik.
- Vault tarafında klasör adı değişikliği sorun çıkarmazdı: notlar arası bağlantılar wiki-link, yola bağlı değil; klasör adı ~200 notta metin olarak geçiyor, tek gerçek yol `tussle/_overview.md` içinde.

## Reddedilen alternatifler
- **Klasörleri repo adına çevirmek:** eski oturumlar kopar, presetler yeniden kurulur; Yusuf "şimdilik bırak" dedi.
- **Rapor araçlarına takma ad eklemek** (`ortak.mjs` / `usage.mjs` içindeki `projectName`'e mobil-playus→tussle, incremantal-game→isik-bekcisi eşlemesi): pano ve raporda projeyi doğru adla, tek parça gösterirdi (Windows arşivindeki `C--Users-yusuf-ZZ-zProjects-incremantal-game` de birleşirdi). Yusuf şimdilik istemedi; klasör ileride değişirse bu eşleme şart, yoksa pano iki proje sayar.
- **Kök oturumları kenar çubuğunda özel gruplara taşımak:** Yusuf istemedi; kökte ileride farklı farklı şeyler soracak, grup bakımı yük olur.
- **Kök oturumlara "ZZ:" öneki:** klasörü söylüyor, konuyu değil; kaldırıldı.

## Sonuçlar / riskler
- Yeni kök oturumlar bu öneklerle açılır; önek listesi gerekirse CLAUDE.md'de genişletilir.
- Kenar çubuğunun altındaki "This computer ⌄" kutusu yeni oturum yer seçicisidir (SSH/bulut tanımlı olmadığından tek seçenek); altındaki satırlar tek oturumlu klasörlerdir. Bir hata değil.

## İlgili
- [[hafiza-ve-vault-duzeni]], [[araclar-ve-raporlar]], [[2026-10-15-yan-oturum-ssh-alias-auto-mod]], [[2026-10-15-oneri-karti-mevcut-klasorde-acilir]]
