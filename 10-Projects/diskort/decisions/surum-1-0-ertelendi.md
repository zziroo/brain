---
type: decision
project: diskort
date: 2026-10-02
status: active
tags: [diskort, surum]
source: Claude Code oturumu 2026-10-01/02 (DM arama + engelleme, 0.9.6)
---

# Karar: DM araması 0.9.6 olarak çıktı; 1.0 gerçek kullanımda oturduktan sonraya bırakıldı

## Bağlam
Yusuf DM araması sürümünü 1.0 olarak çıkarmayı sordu.

## Karar
Sürüm 0.9.6 (Yusuf'un seçimi). Claude 0.10.0 önermişti; Yusuf 0.9.6 dedi. 1.0, telefonda arama, grup araması ve yeni sunucuda akşam yayınları bir süre (öneri: ~1 hafta) sorunsuz geçtikten sonra.

## Neden
DM araması aynı gün yazıldı ve telefonda denenmedi; yeni sunucudaki UDP düzeltmesi gerçek çok kullanıcılı yayında kanıtlanmadı. 1.0'ın ilk günü sorun çıkıp 1.0.1/1.0.2 yamalarıyla sulanmasın.

## Reddedilen alternatifler
- Şimdi 1.0: kapalı grup için sürüm numarası sadece işaret, saçma değil; ama ilk izlenim riski.
- 0.10.0: Claude'un önerisi; Yusuf 0.9.6'yı seçti.

## Sonuçlar / riskler
1.0'a geçmeden önce koddaki sürüm karşılaştırmalarının (zorunlu güncelleme, OTA) `0.x` → `1.0.0` geçişinde doğru çalıştığı kontrol edilmeli.

## İlgili
- [[surum-cikarma-kurali]], [[dm-sesli-arama-ve-calma]]
