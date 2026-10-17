---
type: lesson
project: tussle
date: 2026-10-18
status: active
tags: [tussle, giris, google, oauth, ders]
source: oturum 2026-10-17/18 gece (mobil-playus), [[2026-10-17-tussle-yosef-geri-bildirimi-denge-429-iptal-karti-google-dugmesi]]
---

# Ders: Google girişinde kendi düğme için doğru yol token akışı; kod akışı ara ekran getirir, istemci sırrı sonradan görüntülenemez

- **GIS `renderButton` kişiselleşmesi kapatılamaz.** Tarayıcıda Google oturumu varsa düğme "X olarak devam et" olur. Düz hâli yalnız oturum yokken görünür. Kendi düğmeden ID-token popup'ı programatik tetiklenemez; seçenekler kod akışı ya da token akışı.
- **Kod akışı (`initCodeClient`) her girişte ara ekran gösterir:** `prompt=consent&access_type=offline` sabit; "hesabınızda tekrar oturum açıyorsunuz" ekranı kaçınılmaz. Bir de istemci sırrı ister. Tek dokunuş isteniyorsa baştan **token akışı** (`initTokenClient`, `prompt: ''`): izin verilmiş kullanıcıda ekran yok, sır yok; sunucu `tokeninfo` ile `aud` denetler.
- **Google Cloud Console istemci sırrını sonradan göstermiyor** (2025'ten beri): yalnız oluşturma anında tam görünür, sonra `****F_ly` gibi. Kaybolduysa "Add secret" ile yeni üretilir; eskisi geçerli kalır.
- **Sunucuda compose dosyası `deploy/compose.yml` altında:** `/opt/tussle`'da `docker compose up` "no configuration file" der; `docker compose -f deploy/compose.yml up -d --force-recreate` gerekir ([[2026-10-17-env-degisikligi-compose-restart-okumaz]]).
- Karar: [[2026-10-18-google-girisi-kendi-dugme-token-akisi]].
