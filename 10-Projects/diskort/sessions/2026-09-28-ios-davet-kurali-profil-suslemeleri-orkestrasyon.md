---
type: session
project: diskort
date: 2026-09-28
status: done
tags: [diskort, ios, davet, profil, orkestrasyon]
source: C--dev-diskort fed9b022-eedf-4139-8a63-e3a6d0cf883d.jsonl
---

# Oturum: iOS ilk derleme, davetle kayıt kuralı, profil süsleri, orkestrasyon soruları

## Ne yapıldı
- Mobil medya oynatıcı: menü yerine, videoya dokununca animasyonlu tam ekran + sol altta ses kapatma. Galeriye kaydetme geri bildirimi resmin arkasında kalıyordu, düzeltildi.
- Hesap yönetimi netleşti: şifre sıfırlama ve hesap daveti platform geneli hesap yöneticisinde (kullanıcı), sunucu sahibinde değil. Yeni hesap yalnızca yönetici davetiyle açılıyor.
- Profil süsleri (banner, avatar çerçevesi) sade ve vektörel denendi; `profil-susleri` dalında, main'e girmedi; test sunucusunda denendi. Son durum doğrulanmadı.
- Sürümler 0.7.2 ve 0.8.0. 0.8.1: iPhone derlemesi. iOS Ad Hoc akışı: UDID sayfası, cihaz ekleme, profil, GitHub secret'ları, ilk IPA; bir arkadaşın cihazı onaylandı. İmzalama bilgilerinin şifrelenerek saklanması için otomasyon dalı açıldı.
- Kullanıcı yeni sohbette orkestrasyon kuracak: koordinatör sohbeti + alt ajanlar anlatıldı; devir notu = proje hafızası; "bir çalışma dönemi = bir koordinatör sohbeti" önerildi.
- Yeni sohbette canlı sunucuya SSH komutu otomatik mod denetçisince engellendi.

## Alınan kararlar
- [[hesap-acma-yalnizca-davetle]]
- [[ios-ad-hoc-dagitim-dev-era]]
- [[ssh-izni-yalnizca-diskort-sunucusu]]

## Öğrenilenler
- [[otomatik-mod-ssh-engeli-yeni-sohbette]]

## Açık kalanlar
- Kullanıcı "ben söyleyene kadar sürüm çıkarma" dedi; değişiklikler main'de birikir.
- iOS: derleme sonucu ve diğer arkadaşların UDID'leri beklendi.
- Profil süsleri için harici tasarım aracı seçeneği konuşuldu; karar yok.
