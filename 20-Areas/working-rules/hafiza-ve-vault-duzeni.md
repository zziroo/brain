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
| Vault | `C:\Users\yusuf\ZZ\brain` | Kararlar, dersler, runbook'lar, oturum özetleri, güncel durum | Aranırsa (kademeli) |
| Ayarlar | `settings.json`, `settings.local.json` | İzinler | Otomatik |

Hafıza **klasöre bağlıdır**: Diskort işi için sohbeti `ZZ\zProjects\diskort` içinde aç.

## Kural: tek kaynak
- **Davranış kuralları ve Yusuf'un kararları** hafızada durur (kısa). Uzun gerekçe ve geçmiş vault'ta.
- **Güncel proje durumu**: tek kaynak vault'ta `10-Projects/<proje>/_overview.md` → "Güncel durum". Hafızadaki handoff yalnızca işaretçi + prosedürdür.
- **Uzun anlatı, geçmiş, doğrulama hikâyesi, commit hash'i**: hafızaya yazma; vault'a (`sessions/`, `decisions/`, `lessons/`) yaz.
- **Secret**: ikisine de yazma. Sadece konumunu yaz.
- **Not canlı gerçek değildir**: sunucu, sürüm, repo durumu için önce canlıyı doğrula.

## Bakım ritmi
- Oturum sonu: kararlar `decisions/`, öğrenilenler `lessons/`, güncel durum `_overview.md`.
- Haftalık: `00-Inbox/` boşalt, yetim ve yinelenen notları birleştir, hafıza dosyalarında eskiyeni sil.
- Büyük değişiklikten önce vault'ta `git commit`. Global `CLAUDE.md` ve hafıza git dışında: değiştirmeden önce kopyasını al (`C:\Users\yusuf\ZZ\_backups\`).

## İlgili
- [[_index]], [[orkestrasyon]], [[izinler-ve-ayarlar]]
