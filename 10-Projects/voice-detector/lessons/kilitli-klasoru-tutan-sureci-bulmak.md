---
type: lesson
project: voice-detector
date: 2026-09-28
status: active
tags: [voice-detector, windows, tasima, claude-desktop, terminal]
source: oturum 25d1d08a (OneDrive'dan taşıma)
---

# Boş bir klasör silinmiyorsa onu çalışma dizini olarak tutan süreci PEB'den okuyarak bul

## Ne oldu
Proje taşındıktan sonra eski OneDrive klasörü boş olduğu halde silinmedi ("başka bir işlem tarafından kullanılıyor"). Önce oturumun çalışma dizini sanıldı; oturum taşındıktan sonra da kilit sürdü.

## Çözüm
- Her sürecin geçerli dizini `NtQueryInformationProcess` → PEB → `RTL_USER_PROCESS_PARAMETERS.CurrentDirectory` (x64: PEB+0x20, sonra +0x38) okunarak bulundu; salt okuma, sürece dokunmaz.
- Kilidi tutan: Claude masaüstü uygulamasının **Terminal paneli sekmesi** (oturum başında eski klasörde açılmış PowerShell). Kullanıcının açtığı sekmeyi Claude kapatamaz/kapatmamalı; Yusuf'tan sekmeyi kapatması ya da `cd` ile çıkması istendi. Sonra klasör silindi (2026-10-04'te yokluğu doğrulandı).

## Tekrar etmemek için
- Klasör taşırken/silerken önce o klasörde açık terminal sekmesi, oturum ya da `dotnet` derleme sunucusu (`dotnet build-server shutdown`) var mı bak.
- Exe yolu kaydeden ayarlar (ör. "Windows ile başlat" `HKCU\...\Run`) taşımadan sonra eski yolu gösterir. Voice Detector'da bu kayıt 2026-10-04'te hâlâ silinmiş OneDrive yolunu gösteriyordu: uygulama yeni konumdan çalıştırılmadıkça düzelmez.

## İlgili
- [[_overview]], [[2026-09-28-tasima]]
