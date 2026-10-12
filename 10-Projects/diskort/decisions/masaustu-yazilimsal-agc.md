---
type: decision
project: diskort
date: 2026-10-12
status: active
tags: [diskort, ses, mikrofon, agc, telemetri]
source: Claude Code oturumu 2026-10-12 (commit 99f3652)
---

# Karar: Gürültü modeli açıkken masaüstünde yazılımsal otomatik kazanç; konuşma seviyesi telemetrisi

## Bağlam
Yusuf: aynı arkadaş telefondan konuşunca PC'de çok yüksek, PC'den konuşunca çok kısık. Neden (doğrulandı): PC'de DPDFNet açıkken tarayıcı AGC'si bilerek kapalıydı ([[model-calisirken-agc-kapali-ve-sinirlayici]]) ve yerine bir şey yoktu; telefonda WebRTC AGC'si açık (DPDFNet'ten önce). Fark ~15-20 dB. Kişi başı ses ayarları cihazda yerel; giden seviye ölçülmüyordu.

## Karar
- `gate-worklet.js`'e sınırlayıcıdan önce, sistem mikrofon seviyesine dokunmayan dijital kazanç: hedef -20 dBFS konuşma RMS, +18/-6 dB sınır, yükseltme 3 dB/s, kısma 20 dB/s, ~0,4 sn konuşma ortalamasına göre; yalnız kapı açık VE `db >= max(VAD eşiği, taban+12)` VE > -55 dBFS iken güncellenir, sessizlikte donuk. VAD eşikleri ve seviye göstergesi kazanç öncesi. Yalnız model istenmişken (tarayıcı AGC'si kapalıyken) çalışır; Standart modda tarayıcı AGC'si, ikisi birlikte asla. Mevcut "otomatik kazanç" ayarı kullanılır.
- Telemetri: kazanç öncesi/sonrası konuşma RMS medyanı + p90 (masaüstü; mobilde yalnız çıkış), `effectiveAgc`, `digitalAgc`; admin panelinde "Konuşma seviyesi" satırı (< -35 ya da > -10 dBFS uyarı rengi).
- Telefona dokunulmadı; ölçümden sonra fark kalırsa Android'de DPDFNet sonrası -4 dB kısma ya da WebRTC AGC'sini kapatıp aynı dijital AGC.

## Reddedilen alternatifler
- Tarayıcı AGC'sini modelle birlikte açmak: Windows analog AGC'si mikrofon seviyesini düşürüp boğuklaştırıyordu (0.9.5 dersi).
- Mobilde AGC'yi kapatmak / sabit kısma: ölçümsüz kör ayar, hoparlör modunda kısık kalır.
- Kişi ses ayarlarını hesapta senkronlamak: sorunu çözmez, fark gönderen tarafta.

## Risk
Gerçek mikrofonla dinlenmedi; +18 dB'de model artığı yükselebilir (VAD kipinde kapı kapalıyken duyulmaz). İlk telemetriyle hedef (-20/-18) doğrulanacak.
