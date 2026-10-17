---
type: resource
project: genel
date: 2026-10-01
status: active
tags: [working-rules, hafiza, vault, duzen]
source: 2026-10-01 sadeleştirme oturumu
---

# Bilgi nerede durur: global kurallar, hafıza ve vault

Yeni bir Claude sohbeti hiçbir şey hatırlamaz. Açılışta yalnızca aşağıdaki katmanları görür; gerisini aramak gerekir.

## Katmanlar
| Katman | Yer | Ne tutar | Ne zaman yüklenir |
|---|---|---|---|
| Global kurallar | `~/.claude/CLAUDE.md` | Dil, orkestrasyon, inceleme kapısı, karar dağılımı, vault işaretçisi | Her oturumda, otomatik |
| Hafıza indeksi | `~/.claude/projects/<klasör>/memory/MEMORY.md` | Dosya başına tek satır | Sohbet o klasörde açılırsa |
| Hafıza dosyaları | aynı klasör | Davranış kuralları, kısa kararlı gerçekler, işaretçiler | İlgili görünürse |
| Vault | `/Users/ziroo/ZZ/brain` | Kararlar, dersler, runbook'lar, oturum özetleri, güncel durum | Aranırsa (kademeli) |
| Ayarlar | `settings.json`, `settings.local.json` | İzinler | Otomatik |

Hafıza **klasöre bağlıdır**: Diskort işi için sohbeti `/Users/ziroo/ZZ/zProjects/diskort` içinde aç.

## Kural: tek kaynak
- **Davranış kuralları ve Yusuf'un kararları** hafızada durur (kısa). Uzun gerekçe ve geçmiş vault'ta.
- **Güncel proje durumu**: tek kaynak vault'ta `10-Projects/<proje>/_overview.md` → "Güncel durum" ve "Sıradaki işler". Ayrı devir (handoff) notu yoktur. Hafızada yalnızca ince bir başlangıç protokolü durur (`diskort-baslangic`): önce overview'ı oku, sonra inbox, sonra kurallar. Oturum sonunda overview güncellenir.
- Yeni sohbette: komut yok. Proje klasöründe açılan her yeni oturuma SessionStart hook'u (`~/.claude/hooks/oturum-baslangici.mjs`) vault'u çeker ve overview'ın "Güncel durum" + "Sıradaki işler" bölümlerini bağlama ekler (klasör → proje: [[klasor-proje-eslemesi]]). Eski `/basla` 2026-10-17'de kaldırıldı: [[2026-10-17-basla-yerine-hook-ve-bitir-komutu]].
- Oturum ortasında: **`/kaydet`**; oturum sonunda: **`/bitir`** (kaydeder, sonra sormadan arşivler). `/kaydet`: Kararları, dersleri, oturum özetini yazar, `_overview.md`'yi günceller, secret taraması yapar, vault'u commit'ler. Otomatik değildir; çalıştırmak kullanıcıya kalır. Sonunda oturumu arşivlemeyi **önerir** (masaüstünde düğme; düğme yoksa "Arşivle" yanıt düğmesi, uzaktan bağlıyken soru), kendiliğinden arşivlemez: `/kaydet` çoğu zaman oturum ortasında çalışır ve sonrasında iş sürebilir (Yusuf 2026-10-16; reddedilen: kaydette otomatik arşiv; unutulanlar için dönemsel toplu arşiv sürer). Skill dosyaları: `~/.claude/skills/kaydet/SKILL.md`, `~/.claude/skills/bitir/SKILL.md`.
- **Uzun anlatı, geçmiş, doğrulama hikâyesi, commit hash'i**: hafızaya yazma; vault'a (`sessions/`, `decisions/`, `lessons/`) yaz.
- **Secret**: ikisine de yazma. Sadece konumunu yaz.
- **Not canlı gerçek değildir**: sunucu, sürüm, repo durumu için önce canlıyı doğrula.

## Bakım ritmi
- Oturum sonu: kararlar `decisions/`, öğrenilenler `lessons/`, güncel durum `_overview.md`.
- Haftalık: `00-Inbox/` boşalt, yetim ve yinelenen notları birleştir, hafıza dosyalarında eskiyeni sil.
- Büyük değişiklikten önce vault'ta `git commit`. Vault GitHub'da özel repo olarak duruyor (`zziroo/brain`): yazmadan önce `pull --ff-only`, commit'ten sonra `push`. Global `CLAUDE.md` ve hafıza git dışında: değiştirmeden önce kopyasını al (`C:\Users\yusuf\ZZ\_backups\`).

## İlgili
- [[_index]], [[orkestrasyon]], [[izinler-ve-ayarlar]]
