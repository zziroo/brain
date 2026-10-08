---
type: lesson
project: diskort
date: 2026-10-08
status: active
tags: [diskort, release, github-actions, macos]
source: Claude Code oturumu 2026-10-08 (sürüm 0.10.0 derlemesi)
---

# GitHub'ın macOS runner'ı kapasite yüzünden 15 dk sonra işi iptal edebilir; Mac/iOS paketi olmadan yayınlama

`release.yml` içindeki macOS ve iOS Ad Hoc işleri "The job was not acquired by Runner of type hosted even after multiple attempts" notuyla, hiç başlamadan 15 dk sonra iptal edildi (macOS arm64 kapasite uyarısı). Windows, Linux ve Android OTA sorunsuz çıktı. Çözüm: `gh run rerun <id> --failed` ile yalnız iptal edilen işleri yeniden kuyruğa al; gerekirse bir süre sonra tekrar.

Yayın zorunlu güncelleme olduğu için Mac dmg + `latest-mac.yml` ve `ota-ios.json` olmadan taslağı yayınlama: sunucu eski istemcileri 5 dk içinde reddeder, Mac ve iPhone kullanıcıları dışarıda kalır.
