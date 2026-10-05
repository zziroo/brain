---
type: lesson
project: diskort
date: 2026-10-01
status: active
tags: [diskort, windows, powershell, claude-cli, ortam]
source: 5b97b763-8400-43fd-9e9e-ca9d48766518.jsonl, a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Windows ortam tuzakları: cmd/PowerShell, claude CLI PATH, Remote Control

- Kullanıcıya cmd komutu verilip PowerShell'de çalıştırılınca hata verdi; ortamı sor ya da PowerShell karşılığını ver (`Remove-Item -Recurse -Force`).
- Yusuf'un PowerShell'inde script çalıştırma kapalı: `pnpm dev:desktop` `pnpm.ps1 cannot be loaded` hatası verir. Komutu `pnpm.cmd ...` olarak ver; Execution Policy'yi biz değiştirmeyiz (güvenlik ayarı, isterse kendisi `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`). (2026-10-01)
- Masaüstü uygulaması `claude` komutunu PATH'e eklemez; CLI ayrı kurulur (resmi kurulum betiği). Kurulan `claude.exe` `C:\Users\yusuf\.local\bin` altında ama betik PATH'e eklemedi; kullanıcı PATH'ine bu klasör elle eklenir.
- **Remote Control** (telefondan bilgisayardaki oturumu sürmek): ayrı bir Windows Terminal penceresinde `claude rc`, pencere açık ve bilgisayar uyanık kalmalı; uygulama terminal sekmesinde çalıştırmak oturum kapanınca durur. Telefondan "New session" proje klasöründe yeni koordinatör açar; "same-dir" seçildi çünkü koordinatör main'de çalışır, asıl işi ajanlar worktree'de yapar. Aynı anda iki koordinatör çalıştırma.
- Headless Chrome (`--headless=new --window-size=390,...`) Windows'ta ~500 px'ten dar pencere açmıyor: ekran görüntüsü 390 px çıkar ama sayfa daha geniş yerleşir ve sağdan kesik görünür. Telefon görünümünü tarayıcı panelinin mobil emülasyonuyla ya da `document.documentElement.scrollWidth === innerWidth` ile doğrula. (2026-10-05)
- Yeni bir DNS kaydı eklendikten hemen sonra Windows'un çözücüsü eski "kayıt yok" cevabını önbellekte tutabiliyor (`curl: (6) Could not resolve host`), oysa 1.1.1.1 doğru cevap veriyor. Beklemeden doğrulamak için `curl --resolve <ad>:443:<ip>` ya da Chrome'da `--host-resolver-rules="MAP <ad> <ip>"`. (2026-10-05)
- Süreklilik sohbette değil dosyalarda (devir notu, hafıza): [[devir-notu-kucuk-tutulur]].

Benzer/ilgili not (başka ajan): [[ortam-tuzaklari-windows-bash-ssh]]
