---
type: session
project: diskort
date: 2026-10-12
status: done
tags: [diskort, oturum]
source: Claude Code oturumu 2026-10-12
---

# Oturum 2026-10-12: rol etiketi, rol verme kuralı, DPDFNet eşikleri, masaüstü AGC, Android OOM, sink-id

Main'e giden commit'ler: cb62d5a rol etiketi · f5ad45b mobil Animated OOM · c9d8102 çıkış aygıtı/sink-id · 7a197f9 DPDFNet · 8f419e7 rol verme kuralı · 99f3652 masaüstü AGC + seviye telemetrisi · d40e39f Sürüm 0.11.0. Sunucu deploy edildi, v0.11.0 yayınlandı (Yusuf: "sürüme sen karar ver, ssh izni veriyorum").

- Kararlar: [[rol-etiketleme]], [[rol-verme-hedefin-seviyesine-bakmaz]], [[dpdfnet-esikler-gevsetildi-android-ayri-is-parcacigi]], [[masaustu-yazilimsal-agc]].
- Android OOM (inbox 10-10 ve 10-12): yasin'in Java yığını OOM'u ses ekranında her çizimde yeni Animated düğümleri (SpeakingRing/VoiceTiles/VoiceBar) + ActiveSpeakersChanged'de gereksiz set; memo'landı, değişmeyen küme atlanır, teardown'da `room.removeAllListeners()`. enginbabapro'nun 707 MB PSS'li yığınsız çökmesi yerel bellek (WebRTC yeniden bağlanma döngüsü, tahmin); bellek eğilimi telemetrisi (Kotlin `memorySnapshot`) ertelendi.
- "Failed to set sink id on remote audio track": kaybolan/sabitlenen çıkış aygıtı; 'default' → '' (LiveKit sabitlemez), `devicechange` ile geçiş, sfx sink zinciri sıralı, hata türü kayda yazılıyor. Web Audio karışımı açıkken ses etkilenmiyordu.
- İnceleme kapısı: her diff için ayrı inceleme ajanı; orta bulgular (URL içindeki @ad, rol sınırı, sfx yarışı, AGC pompalama, model geride kalınca 8 ms bekleme) düzeltildi. Kotlin bu Mac'te derlenemez; Android CI (workflow_dispatch) ile doğrulandı (run 38301713572, başarılı).
- Ders: Kotlin için `gh workflow run android.yml --ref main` derleme + birim testi koşturur, artifact APK üretir, yayın yapmaz.
