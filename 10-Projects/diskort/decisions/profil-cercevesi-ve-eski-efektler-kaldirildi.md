---
type: decision
project: diskort
date: 2026-09-28
status: active
tags: [diskort, kozmetik, temizlik]
source: a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Karar: Profil çerçevesi sistemi, eski avatar süsleri ve eski profil efektleri kaldırıldı; yalnızca altı hareketli set kalır

## Bağlam
"Profil çerçevesi aslında profil efekti oldu." Yeni setler eskilerin yerini alıyor.

## Karar
Çerçeve sistemi, 8 eski SVG süs ve sunucudaki resim dönüştürme kodu, kar/ışıltı/yapraklar silindi (şema 23). Çakışma olmasın diye çalışan iki ajan birleşince ayrı değişiklik olarak yapıldı.

## Neden
Kullanıcı talimatı; tek sistem, az kod, 14 px'lik kart boşluğu kalktı.

## Reddedilen alternatifler
- Eski sistemleri yedek olarak tutmak: kullanıcı kaldırmayı istedi.

## Sonuçlar / riskler
- Eski istemciler retire edilmiş öğe seçerse sessiz no-op (review düşük bulgu).
- Bu karar 30 Eylül'de ikinci kez uygulandı (eski çizim motorları da silindi): [[kozmetik-paketleri-sunucudan-on-render]].
