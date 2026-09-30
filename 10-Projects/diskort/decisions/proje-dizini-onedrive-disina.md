---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [dizin, onedrive, tasima]
source: C--dev-diskort 72824d08 (2026-09-28)
---

# Karar: Diskort `C:\dev\diskort` yerine `C:\Users\yusuf\ZZ\zProjects\diskort` altına taşındı; OneDrive içinde tutulmaz.

## Bağlam
Kullanıcı projeyi diğer projelerinin yanına (zProjects) almak istedi; önerilen yol OneDrive altındaydı.

## Karar
Kullanıcı OneDrive dışında yeni bir ZZ\zProjects klasörü açtı, proje ve OneDrive\ZZ\zProjects altındaki diğer projeler oraya taşındı. Android imzası, OTA imza anahtarı gibi önemli yedekler (OneDrive\Yedekler) bir arada tutulacak şekilde yedeklendi. Yeni yerde typecheck/test, proje hafızası kopyası, ayar dosyasındaki yol izinleri, zamanlanmış görev yolları, devir notu güncellendi.

## Neden
- OneDrive senkron yükü (node_modules = yüz binlerce küçük dosya), git dosyası kilitleme/çakışma, uzun yol hataları, "yalnızca çevrimiçi" dosyalar.
- Kod zaten GitHub'da yedekli.

## Reddedilen alternatifler
- `C:\Users\yusuf\OneDrive\ZZ\zProjects` içine taşımak (kullanıcının ilk fikri): yukarıdaki riskler.

## Sonuçlar / riskler
Boş eski klasör ve voice-detector klasörü silinemedi (kullanımda). Hafıza klasörü proje yoluna bağlı olduğundan yeni yola kopyalanması gerekti.

## İlgili
- [[2026-09-28-kod-inceleme-ajani-ve-dizin-tasima]]
