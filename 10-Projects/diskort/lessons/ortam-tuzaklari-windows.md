---
type: lesson
project: diskort
date: 2026-09-29
status: active
tags: [diskort, windows, powershell, claude-cli, ortam]
source: 5b97b763-8400-43fd-9e9e-ca9d48766518.jsonl, a7b70327-6e05-4060-a15b-293ddac27162.jsonl
---

# Windows ortam tuzakları: cmd/PowerShell, claude CLI PATH, Remote Control

- Kullanıcıya cmd komutu verilip PowerShell'de çalıştırılınca hata verdi; ortamı sor ya da PowerShell karşılığını ver (`Remove-Item -Recurse -Force`).
- Masaüstü uygulaması `claude` komutunu PATH'e eklemez; CLI ayrı kurulur (resmi kurulum betiği). Kurulan `claude.exe` `C:\Users\yusuf\.local\bin` altında ama betik PATH'e eklemedi; kullanıcı PATH'ine bu klasör elle eklenir.
- **Remote Control** (telefondan bilgisayardaki oturumu sürmek): ayrı bir Windows Terminal penceresinde `claude rc`, pencere açık ve bilgisayar uyanık kalmalı; uygulama terminal sekmesinde çalıştırmak oturum kapanınca durur. Telefondan "New session" proje klasöründe yeni koordinatör açar; "same-dir" seçildi çünkü koordinatör main'de çalışır, asıl işi ajanlar worktree'de yapar. Aynı anda iki koordinatör çalıştırma.
- Süreklilik sohbette değil dosyalarda (devir notu, hafıza): [[devir-notu-kucuk-tutulur]].

Benzer/ilgili not (başka ajan): [[ortam-tuzaklari-windows-bash-ssh]]
