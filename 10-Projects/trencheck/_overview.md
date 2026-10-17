---
type: project
project: trencheck
date: 2026-10-01
status: unverified
tags: [trencheck, telegram, tcdd, python]
source: C:\Users\yusuf\ZZ\zProjects\trencheck (README.md, bot.py, find_station.py, requirements.txt)
---

# Trencheck: TCDD e-bilet sisteminde boş koltuk bulununca Telegram'dan haber veren bot

Durum: kod, README ve `bot.py`/`find_station.py` okunarak özetlendi; çalıştırılmadı. Klasörde `src/` ve `tests/` YOK (görevde belirtilenle uyuşmuyor), git deposu değil. Son dosya değişikliği 2026-05-02; o tarihten beri dokunulmamış görünüyor. Konuşma kaydı yok.

## Amaç
Belirli bir tarih ve sefer saati(leri) için TCDD e-bilet sitesini düzenli aralıkla kontrol eder; koltuk boşalınca Telegram'da sesli bildirim + etiketleme, normal durum raporlarını sessiz gönderir.

## Mimari
- Tek dosya `bot.py` (~35 KB, Python): `pyTelegramBotAPI` (polling iş parçacığı) + `playwright` (headless Chromium, gerçek tarayıcıyı taklit: webdriver gizleme, tr-TR, masaüstü UA) + `python-dotenv` + `schedule` (kullanılmıyor görünüyor; ana döngü `time.sleep(1)` ile).
- Veri alma (`fetch_tcdd_data`): e-bilet sitesini açar, kalkış/varış/tarih seçer, sitenin `train-availability` yanıtını yakalayıp JSON olarak işler (sefer saati, varış, vagon sınıfı/koltuk sayısı).
- `check_tickets()`: `.env`'yi her turda yeniden okur (canlı yapılandırma); hedef seferleri (`TARGET_TIMES`, virgüllü) bulur; yer varsa "BİLET BULUNDU" mesajı (sesli), yoksa "Kontrol Raporu" (sessiz); yer bulunan diğer seferleri özetler. Zaman TR saatiyle (UTC+3).
- Telegram arayüzü: `/start` abone ekler (`subscribers.json`), `/stop`, `/settings` ile satır içi menü: takvim ile tarih seçimi, saat seçimi, istasyon değiştirme, duraklat/devam (`IS_PAUSED`, açılışta duraklatılmış başlar). Ayarlar `.env` dosyasına geri yazılır (`update_env`).
- `find_station.py`: istasyon arama kutusuna yazıp açılır listeden TCDD istasyon kimliklerini bulur, `stations.json`'a kaydeder.
- Yapılandırma `.env`: TELEGRAM_BOT_TOKEN, TARGET_DATE, TARGET_TIME(S), CHECK_INTERVAL_SECONDS, FROM/TO_STATION_ID/NAME (değerler bu vault'a yazılmaz; `.env`'ye dokunulmadı).
- Yan dosyalar: `last_update_id.txt`, `subscribers.json` (tek abone), `scratch/refactor.py`, `venv/`.

## Sıradaki işler

_Not: öneri, doğrulanmadı_

- README'yi güncelle: çok saatli takip (`TARGET_TIMES`), `/settings` menüsü ve istasyon seçimi anlatılmıyor; "`.env.example`" dosyası klasörde yok.
- Sabit tarihler (03.05.2026) geçmişte kaldı; bot yeni tarih girilmeden anlamsız.
- Bare `except:` blokları ve tarayıcıyı her kontrolde yeniden başlatma maliyeti iyileştirilebilir.
- Testler yok.

## İlgili
- [[Home]]
