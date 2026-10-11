---
name: tussle-proje
description: Tussle (mobil-playus klasörü) = Playus benzeri hafif mini oyun partisi; yayında tussle.ziroo.net; durum, kararlar, sıradaki işler
metadata:
  type: project
---

**Tussle**: arkadaşlarla günlük mini oyun kapışması; Playus'un (club.playus) hafif, özelleştirilebilir, canlı kapışmalı rakibi. Kod `/Users/ziroo/ZZ/zProjects/mobil-playus` (git, main). Tasarım `docs/DESIGN.md`, teknik sözleşme `docs/M0-PLAN.md`, oyun ekleme `docs/GAME-CONTRACT.md`, mimari `docs/ARCHITECTURE.md`, cila listesi `docs/POLISH.md`, giriş kurulumu `docs/AUTH-SETUP.md`, görsel yönerge `docs/VISUAL.md` ("Şeker Dükkanı": krem zemin, konturlu sticker kartlar, magenta tek düğme, Gündüz varsayılan; Playus öğeleri yasak listesi §6).

**Durum (2026-10-08):** M0 bitti ve yayında: https://tussle.ziroo.net (VPS konteyner `tussle`, 127.0.0.1:8087, Caddy `hosts/tussle.caddy`, veri `/opt/tussle/data`, sırlar `/opt/tussle/.env`; deploy `bash deploy/deploy.sh`). 4 oyun (Refleks Işığı, Kule, Hızlı Matematik, Bıçak At), oda kodu, günün oyunu + sezon, sunucu tarafı tekrar oynatma doğrulaması, sohbet, misafir kimliği; Google/Apple girişi kod hazır ama env yok (Yusuf OAuth/Services ID oluşturacak, `docs/AUTH-SETUP.md`). iOS Simulator'da gerçek WebKit ile uçtan uca doğrulandı. Xiaomi 17 Pro + Chrome: oyun ≤ 0,6 ms/kare; dokunuşta kaçan kare telefonun 60↔120 Hz geçişinden (tarayıcıda çare yok; Capacitor kabuğunda sabit kare hızı istenecek).

**Kararlar:** görsel kimlik ve ikon kararları vault'ta (`10-Projects/tussle/decisions/2026-10-08-gorsel-kimlik-...`, `...-marka-maskotu-...`, `...-font-nunito-...`); isim Tussle (global hedef); web çekirdeği + Capacitor (PWA şimdi, mağaza sonra; Apple Developer hesabı var, Google 25 $ + 12 kişi 14 gün kapalı test); 120 Hz isteğe bağlı ayar (varsayılan 60); misafir → Google/Apple bağlama; skorlu oyunda arka plan duraklatmaz (sim yakalar); sim'de Math trig/hypot yasak (dmath).

**Sıradaki (2026-10-08 gece, yayın 0404284 sonrası):** telefonda yeni arayüz turu, oyuncu detay sayfası, Sezon grafiği, host paneli içeriği, Kule zorluk ayarı, canlı kapışma (M1 hayalet katmanı), Capacitor kabukları, mağaza materyalleri, paylaşım kartı, puan isteme. Ertelenen güvenlik: ID token nonce, CSP.
