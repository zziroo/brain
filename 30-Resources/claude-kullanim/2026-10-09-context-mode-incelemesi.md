---
type: resource
project: genel
date: 2026-10-09
status: active
tags: [claude-kullanim, token, mcp, eklenti, arastirma]
source: oturum "araştırma: context-mode incelemesi" (ZZ kökü, 2026-10-09), github.com/mksglu/context-mode
---

# Context Mode (MCP + hook eklentisi): fikir sağlam ama alt ajan düzenimizle çakışıyor, şimdilik kurulmadı

## Ne yapıyor
Büyük araç çıktılarının bağlama girmesini engelleyen bir MCP sunucusu + Claude Code eklentisi. Üç parça:
- **Sandbox:** `ctx_execute` kodu ayrı süreçte çalıştırır, bağlama yalnız stdout girer.
- **Bilgi tabanı:** `ctx_index` / `ctx_fetch_and_index` sayfaları SQLite FTS5'e atar, `ctx_search` yalnız ilgili parçayı döndürür.
- **Oturum sürekliliği:** PreCompact'te 2 KB anlık görüntü, SessionStart'ta geri yükleme.

Asıl mekanizma PreToolUse hook'u: WebFetch tamamen reddedilir; `curl`/`wget` içeren Bash komutları bir `echo` ile değiştirilir; 50 KB üstü Read'e tavsiye enjekte edilir; alt ajan prompt'larına yönlendirme metni eklenir.

## Neden kurmadık
- **Alt ajanları engelliyor.** Açık issue'larda (#967, #911) auto mode sınıflandırıcısının, hook'un enjekte ettiği blok yüzünden alt ajan başlatmalarının ~%40'ını reddettiği bildiriliyor. Orkestrasyon modelimiz alt ajan üzerine kurulu.
- **Auto mode ile çakışıyor.** Bash birincil aracımız; `curl` ve WebFetch'in sessizce `echo`ya dönüşmesi akışı bozar.
- **Tasarruf rakamları tahmin.** Kodda `bytesAvoided: 8192` gibi sabitler var; README'deki %98 kendi beyanı, yöntem yok.
- **Sabit maliyet:** 11 araç tanımı her çağrıda bağlama giriyor (~6k token/çağrı iddiası). Kısa oturumlarda kayıp.
- Diğer şikâyetler: boşta araçların bayatlaması, zombi node süreçleri, temiz kaldırma yolu yok. Lisans ELv2.

## Aynı ihtiyacı nasıl karşılıyoruz
Ağır okumayı alt ajana devretmek, koordinatörü ince tutmak (bkz. [[2026-10-10-ajan-boyutu-ve-yalin-baglam]]).

## Yeniden bakma koşulu
Alt ajan sorunu (#967) kapanırsa ya da büyük web/log araştırması yapılan tek bir projede denenecekse: yalnız MCP sunucusunu ekle, hook'ları dışarıda bırak (`claude mcp add context-mode -- npx -y context-mode`).

## İlgili
- [[2026-10-06-graphify-ve-ponytail-incelemesi]]
- [[2026-10-10-ajan-token-analizi]]
