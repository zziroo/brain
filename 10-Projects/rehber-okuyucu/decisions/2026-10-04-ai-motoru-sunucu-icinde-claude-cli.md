---
type: decision
project: rehber-okuyucu
date: 2026-10-04
status: active
tags: [rehber-okuyucu, ai-motoru, guvenlik, claude-cli]
source: oturum 2026-10-03/04 (achievement-guide-formatter)
---

# Karar: AI düzenlemesini sunucu içindeki araçsız Claude Code CLI üretir; SSH'li kuyruk işleyicisi yapılmadı

## Bağlam
İlk fikir Diskort geri bildirim akışının kopyasıydı: rehberler kuyrukta bekler, yerel bir Claude oturumu (zamanlanmış görev) SSH + CLI ile okuyup AI belgesini geri yazar. Yusuf song-finder'daki yapıyı önerdi: sunucu `claude -p` çalıştırır, Max aboneliği kullanılır.

## Karar
Sunucu, kuyruktaki rehber için Claude Code CLI'yi başsız kipte çalıştırır: `--restricted --tools ""`, sistem talimatı argüman, rehber metni stdin'de `<guide>` içinde, boş geçici dizin, tek iş aynı anda, günlük üst sınır (`AI_DAILY_MAX`, varsayılan 30). Yanıt `submit` ile aynı katı doğrulayıcıdan geçer; bir onarım turu vardır. Model URL yazamaz, yalnız rehberdeki görsel/bağlantıya numarayla atıf yapar. CLI (`claim/show/submit`) elle müdahale için kaldı.

## Neden
- Yusuf'un ayarlarında `ssh -i ~/.ssh/diskort_vps *` sormadan çalışıyor. Kuyruk işleyen oturum yabancıların yazdığı rehber metnini okurken elinde VPS root erişimi olurdu; gömülü talimata kanarsa Diskort sunucusuna kadar gider.
- Sunucu içi motorda modelin aracı yok: en kötü sonuç kötü bir JSON, o da şemadan geçmek zorunda.
- Bekleme yok (dakikalar), zamanlanmış görev gerekmiyor.

## Reddedilen alternatifler
- SSH + zamanlanmış görev (Diskort gözcüsü gibi): yukarıdaki root erişimi riski; ayrıca saatler süren bekleme.
- İşleyiciyi ikiye bölmek (komut çalıştıran oturum metni görmez, yalnız dosya okuyup yazan alt ajan): alt ajan yine yerel dosyaları okuyup belgeye sızdırabilirdi.
- Anthropic API anahtarı: ayrı ücret; Yusuf aboneliği kullanmak istedi.

## Sonuçlar / riskler
- Uzun ömürlü abonelik token'ı sunucuda `/etc/rehber.env` içinde durur.
- Konteyner alpine yerine debian-slim + CLI, bellek sınırı 1 GB.
- Aboneliği herkese açık hizmetin motoru yapmamak için üretimi yalnız sahip başlatır: [[2026-10-04-ai-uretimini-yalniz-sahip-baslatir]].

## İlgili
- [[10-Projects/rehber-okuyucu/_overview|Rehber Okuyucu]], [[geri-bildirim-sistemi-uygulama-ici]]
