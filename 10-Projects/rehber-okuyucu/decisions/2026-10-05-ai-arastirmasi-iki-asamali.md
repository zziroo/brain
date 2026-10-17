---
type: decision
project: rehber-okuyucu
date: 2026-10-05
status: active
tags: [rehber-okuyucu, karar, ai-motoru, arastirma, guvenlik]
source: oturum 2026-10-05; Yusuf: "kaynak benim verdiğim rehber değil, AI'ın araştırıp topladığı veriler olsun; kendi rehberini oluşturacak"
---

# Karar: "AI araştırması" iki aşamalı: AI web'den kendi rehberini yazar, sonra mevcut hat onu kartlara çevirir

## Bağlam
Rehber linki yerine bir oyun verip AI'ın kendisinin araştırması istendi. Format aynı kalacaktı.

## Karar
- Girdi: Steam oyun linki ya da appid; yalnız sahip başlatır; çıktı dili tr/en. Kimlik `app<appid>`, `kind='research'` (şema v6), oyun başına bir kayıt.
- Aşama 1 (araştırma): `claude -p` yalnız `WebSearch,WebFetch` (+ `--allowedTools`, `--max-turns 40`, 30 dk). İstem `src/research-prompt.md`. Resmi başarım listesindeki her başarım en az bir bölümde (`ach`) yapısal olarak denetlenir. Çıktı katı JSON: bölümler (p/h/list/table/hr) + kaynaklar (yalnız http(s), ≤ 40).
- Aşama 2 (biçimlendirme): saklanan rehber `source: ai-research` başlığıyla mevcut istemden geçer (araçsız).
- Kaynaklar okuyucuya yalnız sonda liste olarak gösterilir. Araştırma rehberi "Araştırma" sekmesinde, kartlar AI sekmesinde.
- Araştırmada JSON çıkmazsa ya da CLI `success` dışında biterse onarım turu yok, iş başarısız. Onarım turunda (JSON var ama geçersiz) yeni kaynak eklenemez.
- İki aşama ayrı `ai_runs` satırı, günlük sınırdan 2 düşer. "Yeniden araştır" ikisini, "Yeniden biçimlendir" yalnız ikinciyi çalıştırır.
- 2026-10-05 düzeltmesi: araştırma istemine zorunlu "Oynanış sırası" bölümü (bölüm/görev sırasıyla başarımlar, kaçırılabilirlerin anı, toplanabilirler); biçimlendirici bunu walkthrough gibi işleyip yol haritası yapar. İlk Wolfenstein II araştırmasında yol haritası 4 kısa paragraftı.

## Neden
Mevcut biçimlendirme hattı ve okuyucu aynen kullanılır; araştırma rehberi insan rehberi gibi incelenebilir. Araçsız onarım turu araştırma bağlamını taşımadığı için modelin belleğinden rehber ve uydurma kaynak yazabiliyordu (şüpheci ajan doğruladı).

## Reddedilen alternatifler
- Tek aşamada doğrudan AiDoc üretmek: biçim kuralları ile araştırma aynı turda; hata ayıklama ve yeniden biçimlendirme zor.
- Kart bazında kaynak: Yusuf yalnız sonda liste istedi.
- Oyun adıyla arama: appid kesin resmi liste verir.

## Sonuçlar / riskler
- WebFetch dışa açık bir kanal: prompt injection ile aynı Docker ağındaki diğer konteynerlere istek denenebilir (yerel adrese bağlı servisler erişilemez). Ağ ayırma ayrı iş.
- Web'den gelen metin herkese açık yayınlanır (yalnız metin olarak çizilir).

## İlgili
- [[2026-10-04-bassiz-claude-at-dosya-anmalarini-acar]]
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]]
