# Analiz rehberi (bu dalı okuyan Claude için)

Bu `analiz-paketi` dalı, Yusuf'un Claude Code ile kurduğu çalışma sisteminin dışarıdan incelenmesi için hazırlandı. İstenen şey bu sistemin **analizi ve belgelenmesi**: orkestrasyon, inceleme kapısı, hafıza, ikinci beyin (vault), araçlar ve otomasyonlar.

## Önce bunları bil
- **Salt okunur analiz.** Kökteki `CLAUDE.md` vault'a not yazmayı tarif eder; o kurallar asıl kullanım içindir. Bu analizde vault'a not ekleme, mevcut notları değiştirme. Çıktın ayrı bir belge olsun.
- **Anlık görüntü (2026-10-12).** Dosyalar o günün kopyası. Asıl kaynaklar Yusuf'un makinesinde `~/.claude/` altında yaşar.
- **Maskelenenler:** Sunucu IP'si `<VPS_IP>`. Ham `settings.json` dosyaları pakete konmadı; yerine `kurulum/ayarlar-ozeti.md` var. Pakette sır değeri yok, yalnızca secret adları geçer.
- Notlar Türkçe; bazı hafıza dosyaları İngilizce.

## Sistemin katmanları ve nerede oldukları

| Katman | Ne işe yarar | Bu dalda nerede |
|---|---|---|
| Global kurallar | Her oturuma yüklenen talimatlar: orkestrasyon, inceleme kapısı, karar dağılımı, model seçimi | `kurulum/global/global-claude-md.md` (asıl dosya `~/.claude/CLAUDE.md`) |
| Kuralların gerekçeli hali | Her kuralın neden konduğu, reddedilen alternatifler | `20-Areas/working-rules/` (`_index.md`'den başla) |
| İkinci beyin (vault) | Proje kararları, dersler, oturum özetleri, runbook'lar | `Home.md`, `10-Projects/<proje>/_overview.md`, `decisions/`, `lessons/`, `sessions/` |
| Oturum hafızası | Claude'un proje başına otomatik yüklediği kısa olgular | `kurulum/hafiza/<proje>/` (her klasörde `MEMORY.md` dizin) |
| Proje talimatları | Proje köküne konan `CLAUDE.md`'ler | `kurulum/proje-claude-md/` (otomatik yüklenmesinler diye yeniden adlandırıldı) |
| Skill'ler (slash komutları) | `/basla` vault'tan durum özeti, `/kaydet` vault'a yazma, `/pano` geçmiş dashboard'u, `/canli` canlı ajan panosu | `kurulum/skills/` |
| Zamanlanmış görevler | Diskort: günlük geri bildirim taraması, main'e gelen commit'lerin incelemesi | `kurulum/zamanlanmis-gorevler/` |
| Araçlar | Transkriptlerden orkestrasyon raporu, token/maliyet analizi, pano ve canlı sunucu (Node, bağımlılıksız) | `kurulum/arac-orchestration-report/` (`README.md`, `ortak.mjs` sır maskeleme) |
| Arayüz eklentisi | Claude Code içinde canlı "orkestra" paneli; `canli.mjs` sunucusuna bağlanır | `kurulum/mod-orkestra/` (tip dosyaları dahil edilmedi) |
| İzinler | Global ve proje izin kuralları | `kurulum/ayarlar-ozeti.md` |

## Önerilen okuma sırası
1. `kurulum/global/global-claude-md.md`: sistemin özü, kısa.
2. `20-Areas/working-rules/_index.md` ve bağlı notlar: kuralların gerekçeleri.
3. `Home.md`, ardından `10-Projects/diskort/_overview.md`. Diskort sistemin en olgun kullanıldığı proje; orkestrasyon kararları ve dersleri çoğunlukla orada (`decisions/`, `lessons/orkestrasyon-token-maliyeti.md`, `lessons/ajan-calisma-tuzaklari.md`).
4. `kurulum/skills/` ve `kurulum/hafiza/`: kuralların günlük kullanıma nasıl bağlandığı.
5. `kurulum/arac-orchestration-report/README.md`: ölçüm ve geri besleme döngüsü.

Vault'u toptan okuma; dosya ararken grep kullan, sonra ilgili notu oku.
