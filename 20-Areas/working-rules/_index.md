---
type: resource
project: genel
date: 2026-10-15
status: active
tags: [working-rules, claude]
source: C:\Users\yusuf\.claude\CLAUDE.md
---

# Çalışma kuralları: Claude ile nasıl çalışıyoruz

Global kuralların damıtması. Orijinal dosya değiştirilmedi; geçerli olan her zaman `~/.claude/CLAUDE.md`.

## Global kurallar
- [[genel-kurallar]]: dil, plan/limit bilgisi
- [[orkestrasyon]]: koordinatör + arka plan ajanları, satır içi mi ajan mı, model seçimi
- [[2026-10-10-ajan-boyutu-ve-yalin-baglam]]: ajan boyutu sınırı, aşamalara bölme, yalın bağlam (token analizinden)
- [[2026-10-13-token-tasarrufu-ikinci-tur]]: review diff'e sınırlı, 200k tavan, Haiku keşif, ekran görüntüsü kısıtı (ikinci tur analiz)
- [[2026-10-15-yan-oturum-ssh-alias-auto-mod]]: masaüstü güncellemesi; yan oturum ne zaman, `ssh vps` tek biçim, varsayılan izin kipi auto
- [[2026-10-15-oneri-karti-mevcut-klasorde-acilir]]: ders; öneri kartı preset taşımaz, proje işi kartla önerilmez
- [[2026-10-15-oturum-basliklari-konu-oneki-ve-klasor-adlari]]: oturum başlığı `<proje>: <konu>`, ZZ kökünde önek konu (sistem/araştırma/marka/kişisel); mobil-playus ve incremantal-game klasörleri değişmedi, nedenleri
- [[inceleme-kapisi]]: merge öncesi ayrı inceleme ajanı, skeptic, bulgu eşikleri
- [[karar-dagilimi]]: Yusuf neye karar verir, Claude neye
- [[araclar-ve-raporlar]]: orkestrasyon raporu aracı

## Düzen
- [[hafiza-ve-vault-duzeni]]: bilgi nerede durur, tek kaynak kuralı, bakım ritmi

## Diskort'a özgü
- [[git-push-autonomy]]: doğrulanmış değişiklikte main'e commit + push serbest
- [[diskort-orchestrator-mode]]: global kurallara Diskort eklemeleri

## Ortam ve otomasyon
- [[izinler-ve-ayarlar]]: settings.json ve settings.local.json özeti
- [[zamanlanmis-gorevler-ve-skiller]]: Diskort gözcü (geri bildirim + hata + sağlık + kod incelemesi, tek görev), senkronize skiller

## Mac geçişi (2026-10-05)
- [[2026-10-05-windowstan-maca-gecis]]: Windows → Mac taşıma kararı, paket ve yol çevirisi
- [[mac-gecisi-kontrol-listesi]]: Mac tarafında yapılacaklar (açık)
- [[2026-10-07-windows-makinesi-yalniz-silksong-icin]]: Windows makinesi yalnız Silksong (LoRA) için kaldı; son temizlik (2026-10-07)

## GitHub hesabı (2026-10-06)
- [[2026-10-06-github-repolari-zziroo-hesabina-tasindi]]: 15 repo `zziroo` hesabına taşındı, yönlendirme ve remote notları
