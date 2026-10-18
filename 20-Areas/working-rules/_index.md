---
type: resource
project: genel
date: 2026-10-17
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
- [[kod-inceleme-ajani-ve-supheci-ajan]]: inceleme ayrı salt okunur ajanla, orta+ bulgulara şüpheci ajan (inceleme kapısının kökeni)
- [[ajan-modeli-dinamik-miras]]: eski kural, ajanlar koordinatörün modelini devralır (superseded; geçerli kural [[orkestrasyon]])
- [[orkestrasyon-token-maliyeti]]: ders; orkestrasyonda maliyet bağlam boyutundan gelir (30-Resources)

## Düzen
- [[hafiza-ve-vault-duzeni]]: bilgi nerede durur, tek kaynak kuralı, bakım ritmi
- [[klasor-proje-eslemesi]]: kod klasörü → vault projesi tablosu (hook ve /kaydet okur)
- [[2026-10-17-basla-yerine-hook-ve-bitir-komutu]]: `/basla` yerine SessionStart hook'u, `/kaydet` + `/bitir`
- [[2026-10-17-oturum-komutlar-vault-duzeni-ve-yedek]]: oturum özeti; vault taşıma, felaket kurtarma yedeği ve kasa dersleri
- [[2026-10-18-oturum-global-gece-gozcusu]]: oturum özeti; Diskort gözcüsü global gece gözcüsüne dönüştü (karar [[2026-10-18-global-gece-gozcusu]])

## Diskort'a özgü
- [[git-push-autonomy]]: doğrulanmış değişiklikte main'e commit + push serbest
- [[diskort-orchestrator-mode]]: global kurallara Diskort eklemeleri

## Ortam ve otomasyon
- [[izinler-ve-ayarlar]]: settings.json ve settings.local.json özeti
- [[zamanlanmis-gorevler-ve-skiller]]: Diskort gözcü (geri bildirim + hata + sağlık + kod incelemesi, tek görev), senkronize skiller
- [[izin-istemleri-ve-rutinler]]: rutinler neden sürekli izin ister (heredoc, birebir kayıt, `.claude` klasörü)
- [[claude-altina-yazma-izin-sorar]]: `.claude` altına yazmak her zaman izin sorar, gözetimsiz görevler takılır
- [[otomatik-mod-ssh-engeli-yeni-sohbette]]: otomatik mod bağlamsız yeni sohbette canlı sunucuya SSH'ı engeller; izin ayar dosyasında olmalı
- [[rutin-calisma-klasoru-silinince-oturum-acmaz]]: zamanlanmış görevin klasörü yoksa oturum açılmaz
- [[rutin-izin-modu-yan-oturumda-kaydedilmez]]: yan oturumda oluşturulan zamanlanmış görev izin modunu kaydetmez
- [[start-session-otomatik-tur-reddi]]: ToolSearch sonrası "Tool loaded." turunda start_session reddediliyor
- [[scratchpad-yeniden-baslatmada-silinir]]: scratchpad yeniden başlatmada silinir
- [[gizli-onizleme-panelinde-animasyon-durur-ve-gorunum-0x0]]: gizli önizleme panelinde rAF durur, görüntü alanı 0×0
- [[telefonla-erisim]]: telefondan Mac'teki Claude oturumuna erişim (`claude rc`)

## Mac geçişi (2026-10-05)
- [[2026-10-05-windowstan-maca-gecis]]: Windows → Mac taşıma kararı, paket ve yol çevirisi
- [[mac-gecisi-kontrol-listesi]]: Mac tarafında yapılacaklar (açık)
- [[2026-10-07-windows-makinesi-yalniz-silksong-icin]]: Windows makinesi yalnız Silksong (LoRA) için kaldı; son temizlik (2026-10-07)

## GitHub hesabı (2026-10-06)
- [[2026-10-06-github-repolari-zziroo-hesabina-tasindi]]: 15 repo `zziroo` hesabına taşındı, yönlendirme ve remote notları
- [[2026-10-07-zziroo-tasimasi-tamamlandi-ve-mac-listesi]]: taşımanın Mac ve sunucu tarafı bitti, Mac geçiş listesi işlendi
- [[ince-taneli-anahtar-repo-baska-hesaba-tasininca-calismaz]]: repo başka hesaba taşınınca eski ince taneli anahtar yazamaz
