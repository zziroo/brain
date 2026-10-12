---
type: lesson
project: pano
date: 2026-10-13
status: active
tags: [artifact, html, tema, yayin]
source: ZZ oturumu 9f1a0281 (pano Artifact uyum kontrolü)
---

# Artifact'a yüklenen sayfa kendi `<html><head>` iskeletini ve CSP'sini taşımamalı, temayı kökteki `data-theme`'den izlemeli

Tek başına `file://` ile açılan bir HTML'i claude.ai Artifact'ına uyarlarken dört ayrıntı çıktı.

1. **İskelet.** Yayın, sayfayı kendi iskeletiyle sarıyor: doctype, charset, viewport, CSP ve küçük bir reset. Sayfanın kendi `<!doctype>`, `<html>`, `<head>`, `<body>` etiketleri ve CSP meta'sı bu yüzden çıkarılmalı. Sayfa `<title>` ile başlamalı; başlık yalnız ilk 8 KB'ta aranır. `pano.mjs --artifact` bu gövde parçasını ayrı dosyaya yazıyor.
2. **Tema.** claude.ai açık bir tema seçimini köke `data-theme="dark|light"` olarak yazıyor. "Sistem" seçiliyse hiçbir şey yazmıyor.
   - Sayfanın kendi tema düğmesi açılışta bu değeri ezmemeli, başlangıç değeri olarak almalı.
   - Değer sonradan değişebilir. JS ile boyanan grafikler (ısı haritası, Canvas) eski renkte kalmasın diye `MutationObserver` ile izlenmeli.
3. **Güvenli alan.** İskelet `:root`'a güvenli alan dolgusu veriyor. Aynı dolgu `body`'de de olursa çentikli telefonda boşluk ikiye katlanıyor. Dolgu `:root`'ta tanımlanmalı ki çakışsın, toplanmasın.
4. **Derin bağlantı.** Dışarıdan gelen linkte `location.hash` yalnız düz biçimi taşır (`#harf-rakam._~-`). `#oturum/<id>` gibi rotalar sayfa içinde çalışır ama paylaşılan linkle açılmaz.

İlgili: [[2026-10-13-pano-artifact-yayini]], [[10-Projects/pano/_overview|Pano]]
