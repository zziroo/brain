---
type: decision
project: diskort
date: 2026-10-10
status: active
tags: [diskort, macos, imzalama, notarizasyon, guncelleme, release]
source: Claude Code oturumu 2026-10-10 (0.10.3)
---

# Karar: macOS paketi Apple Developer ID ile imzalanır ve notarize edilir; macOS de otomatik güncellenir

## Bağlam
Yusuf: Mac'te küçük bir güncelleme gelse bile uygulamayı yeniden indirmek gerekiyor, Windows kendisi güncelliyor. Paket ad-hoc imzalıydı (`identity: '-'`); Squirrel.Mac yeni sürümün imzasının eskisiyle aynı takıma ait olmasını ister, ad-hoc imza her derlemede değiştiği için güncelleyici macOS'ta `manual` kipindeydi. Yusuf'un zaten Apple Developer hesabı vardı (iOS Ad Hoc için).

## Karar
- `release.yml` ayrı `macos` işi: Developer ID Application sertifikası (secret `MAC_CERT_P12_BASE64` + `MAC_CERT_PASSWORD`) CI'da kendi geçici anahtar zincirimize aktarılır ([[electron-builder-csc-link-anahtar-zinciri-parolasi]]); notarizasyon iOS için zaten olan App Store Connect anahtarıyla (`ASC_KEY_*`). Hedefler dmg + zip (Squirrel zip'i kurar). Sonda imza/staple/spctl denetimi.
- Sertifika secret'ı yoksa iş **hata verir** (ad-hoc yedek yol kaldırıldı).
- `updater.ts`: macOS'ta çalışan uygulama Developer ID imzalı ve yazılabilir bir `.app` içindeyse otomatik güncelleme; değilse eskisi gibi indirme sayfası. Squirrel'in kendi sonucu beklenir, süre indirme bitince başlar.
- İlk imzalı sürüm 0.10.3 (2026-10-10). Sertifika Xcode → Accounts → Manage Certificates ile oluşturuldu; `.p12` yedeklenecek ([[ios-ad-hoc-dagitim]]'deki yedek düzeni).

## Neden
- Bir kez kurulur, sonra her sürümde ek elle adım yok; [[kod-imzalama-ertelendi]]'deki SignPath itirazı (her sürümde iki onay) burada yok.
- Notarize paket ilk açılışta "Yine de Aç" istemez; TCC izinleri sürümler arasında korunur.

## Reddedilen alternatifler
- İmzasız kendi güncelleyicimiz (zip indir, betikle `/Applications`'daki paketi değiştir): ücretsiz ama kırılgan (DMG'den/yazılamayan yerden çalışma, her güncellemede izinlerin yeniden sorulması).
- Sertifika yoksa ad-hoc yedek yayın: inceleme bulgusu; imzalı kurulumlar o sürümü otomatik kuramaz, herkes elle kurmaya düşer.

## Sonuçlar / riskler
- Eski ad-hoc kurulumlar imzalı sürüme kendiliğinden geçemez; 0.10.3 bir kez elle kurulur, izinler (mikrofon, ekran kaydı, Erişilebilirlik) bir kez yeniden istenir.
- Sertifika yenilenirken aynı takım kimliği şart; secret silinmemeli.
- Notarizasyon macOS işini ~34 dk'ya çıkardı.
- Gerçek otomatik güncelleme uçtan uca henüz denenmedi (ilk fırsat: 0.10.3 → sonraki sürüm). (unverified)

## İlgili
- [[kod-imzalama-ertelendi]], [[surum-cikarma]], [[sessions/2026-10-10-macos-imza-telefon-gostergesi-0-10-3]]
