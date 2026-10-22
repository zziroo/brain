---
type: decision
project: genel
date: 2026-10-22
status: active
tags: [working-rules, claude, kanca, tts, sesli]
source: "sistem: Ahenk sesli okuma hook'u" oturumu (ZZ kökü)
---

# Karar: Claude Code cevapları yerel Ahenk Cep TTS ile istek üzerine ("oku") okunur, otomatik değil

## Bağlam
Yusuf, Claude uygulamasındaki "sesli oku" tuşunun Türkçe'yi [Ahenk](https://github.com/ozguradmin/ahenk-turkish-tts)
sesiyle okumasını istedi. Uygulamadaki tuş sunucu tarafında (ElevenLabs; Anthropic'in alt yüklenicisi) çalışır,
ses seçimi yok; Anthropic'in geliştiriciye açık TTS API'si de yok. Dolayısıyla uygulama tuşu değişmez; Claude Code
tarafında yerel bir eşdeğer yapıldı.

## Karar
- `claude-kurulum` reposuna (bkz. [[2026-10-22-claude-kurulum-reposu]]) eklendi: `hooks/sesli-oku.mjs`,
  `sesli/` (oku.py, kur.sh, ayar.json, kendi `.venv`'i git dışı), `skills/sesli`. Commit `b1e01d4`, push edildi.
- **İstek üzerine okuma (okuma tuşu):** kullanıcı `oku` / `/sesli oku` yazınca UserPromptSubmit kancası bir önceki
  cevabı transkriptten alır, markdown ve kod bloklarını temizler, 6 cümle / 700 karakterle kırpar ("Gerisi
  ekranda"), arka planda Ahenk Cep ile okutur. `dur` keser, `oku hepsini` kırpmaz. Kanca 30 ms'de çıkar; ses ~2 sn'de başlar.
- **Otomatik okuma kapalı:** Stop kancası yalnız `~/.claude/sesli/acik` bayrağı varken her cevabı okur
  (`/sesli otomatik aç|kapat`). İlk sürüm otomatikti; Yusuf "normalde tuşa basınca okutuyordum" deyince istek
  üzerine çevrildi. Alt ajanlar hiçbir kipte okunmaz.

## Neden
- Ahenk Cep 8.6M parametre, 34 MB, CPU'da gerçek zamandan çok hızlı (7 sn ses 0.3 sn'de); Mac'te ağır model gerekmez.
  Büyük Ahenk (VoxCPM2 LoRA) GPU ister, uygun değil.
- Kanca arka planda okutup hemen çıkar, böylece cevap hiç bekletilmez; yeni okuma öncekini süreç grubu (setsid) ile keser.
- Otomatik okuma her küçük cevapta konuşur, dikkat dağıtır; kullanıcı alışkanlığı tuş.

## Reddedilen alternatifler
- Claude'un (ElevenLabs) sesini Ahenk'e klonlamak: ses Anthropic/ElevenLabs'e ait, repo kuralları da izinsiz klonlamaya karşı.
- macOS sistem sesi olarak Ahenk: üçüncü parti sistem sesi eklenemiyor.
- Her cevabı okuyan tek Stop kancası: ilk sürüm; istek üzerine okuma yok diye yetersiz kaldı, bayrakla isteğe bağlı bırakıldı.

## Dersler
- İlk sentez 10 sn sürdü, sonrakiler 0.3 sn: soğuk disk önbelleği (torch yükleme). Hız ölçerken ilk çalıştırmayı sayma.
- Kanca `~/.claude/sesli/...` yolunu okuduğu için repo klasörü `kur.sh` GIRDILER'e eklenmeden symlink yoktu ve
  kanca sessizce çıktı; yeni bir `~/.claude/<ad>` girdisi her zaman kur.sh listesine de girer.
- SIGTERM ile kesilen Python `finally` çalıştırmaz; geçici WAV kalıyordu. `signal.signal(SIGTERM, sys.exit)` ile çözüldü.
- Ahenk Cep ağırlıkları CC BY 4.0: README'de atıf var; model `~/.cache/huggingface` altında.

## Doğrulanmayanlar
- Kanca sentetik transkript ve stdin JSON ile test edildi; gerçek bir oturumda `oku` yazarak henüz denenmedi
  (kanca ayarları oturum açılışında yüklenir, bu oturumda devreye girmedi). Yeni oturumda ilk iş: bir cevaptan sonra `oku`.
- Yalnız macOS (`afplay`); Windows'ta kurulmadı, kur.sh denenmedi.

## İlgili
- [[2026-10-22-claude-kurulum-reposu]], [[_index]], [[araclar-ve-raporlar]]
