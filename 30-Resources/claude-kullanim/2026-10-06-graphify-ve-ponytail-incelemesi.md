---
type: resource
project: genel
date: 2026-10-06
status: active
tags: [claude-kullanim, token, eklenti, arastirma]
source: oturum "araştırma: graphify ve ponytail incelemesi" (ZZ kökü, 2026-10-06); kaynak bir Instagram reel'inin önerdiği araçlar
---

# Graphify denemeye değer (tek projede, ölçerek); Ponytail yerine CLAUDE.md'ye "minimal kod" kuralı yeter

## Bağlam
Bir Instagram reel'i "limite takılmayı önleyen, token azaltan, dosyaları tekrar okutmayan" Claude Code eklentileri öneriyordu. Yusuf iki ismi verdi: **ponytail** ve **graphify**. Videodaki diğer iddialar (ccusage, caveman, Serena, Superpowers, claude-mem) için sonuç: çoğu bizde zaten kural, `get_usage` ve vault olarak var; tek ilginç aday kod indeksleyen Serena idi, o da yalnız tek projede denenecek bir şey.

## Graphify
- Projeyi yerel tarayıp (kod ayrıştırma + çağrı grafiği) bilgi grafiği çıkarıyor; ajan dosyaları tek tek okumak yerine grafiği sorguluyor. Çıktı `graphify-out/` (graph.json, rapor, html).
- Kendi ölçümü: 52 dosyalık repoda sorgu maliyeti ~123k → ~1.7k token. Pazarlama rakamı, ama asıl derdimize (her ajanın ~45–50k soğuk başlangıcı) dokunuyor.
- Dikkat: doküman ve görselleri kavram çıkarmak için Claude'a gönderiyor (token yakar); grafik eskiyince yeniden üretmek gerekir.
- **Karar:** en büyük kod tabanında, proje oturumunda dene; önce/sonra ajan başlangıç token'larını orkestrasyon raporuyla karşılaştır. Henüz denenmedi (2026-10-16). 2026-10-20: önce düz kod haritası denenecek, Graphify yalnız o yetmezse ([[2026-10-20-bgts-context-engine-incelemesi]]).

## Ponytail
- Yazılım değil, kural seti (skill): kod yazmadan önce "gerçekli mi, kod tabanında var mı, standart kütüphane yapıyor mu" sordurur. Kendi iddiası %54 daha az kod.
- Aynı isimle farklı sahiplerin repoları var (dietrichayala, DietrichGebert, mikrammullah, gitee kopyası); asıl repo doğrulanamadı, plugin kurulumu tedarik zinciri riski.
- **Karar:** kurma; aynı etkiyi global CLAUDE.md'ye 3–4 satırlık "minimal kod" kuralıyla sağla.

## Ders
Reel'lerdeki "plugin" listeleri etkileşim toplamak için yapılıyor; araç adı videoda geçmiyor. Üçüncü parti MCP/plugin kodun tamamını okuyabildiği için repo güvenilirliği kurulumdan önce kontrol edilir.

## İlgili
- [[2026-10-09-context-mode-incelemesi]]
- [[2026-10-10-ajan-token-analizi]]
