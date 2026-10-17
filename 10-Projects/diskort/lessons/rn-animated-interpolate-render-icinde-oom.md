---
type: lesson
project: diskort
date: 2026-10-12
status: active
tags: [diskort, mobil, android, bellek, animated]
source: Claude Code oturumu 2026-10-12; inbox 2026-10-12 OOM kaydı (yasin, 0.10.3)
---

# Ders: RN Animated `interpolate`/`multiply` render içinde çağrılırsa her çizimde yeni yerel düğüm doğar (Android OOM)

Ses ekranında `SpeakingRing`, `TileFrame` ve `VoiceBar` render gövdesinde `pulse.interpolate(...)` ve `Animated.multiply(...)` çağırıyordu. `useNativeDriver` ile her düğüm Java tarafında `NativeAnimatedNodesManager.createAnimatedNode` → `HashMap.put` oluyor; konuşan her değiştiğinde (saniyede birkaç kez) yeniden çizim → düğüm yığını → 256 MB Java yığını doldu, çökme kaydındaki son tahsis tam bu.

**Kural:** `interpolate`/`multiply`/`add` sonuçlarını `useMemo` ile (bağımlılık: Animated.Value ref'leri) sakla; olay dinleyicilerinde durum değişmediyse `set` çağırma (ActiveSpeakersChanged küme karşılaştırması). Yığınsız "CRASH" + yüksek PSS ise yerel bellek: ayrı sorun (yeniden bağlanma döngüsü, WebRTC), JS'te aranmaz.

Bağlantı: [[2026-10-12-rol-etiketi-dpdfnet-agc-oom]].
