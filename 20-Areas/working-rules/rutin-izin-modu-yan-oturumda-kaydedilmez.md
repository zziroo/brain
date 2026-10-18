---
type: lesson
project: working-rules
date: 2026-10-18
status: active
tags: [zamanlanmis-gorev, izinler, yan-oturum, auto-mod]
source: Claude Code oturumu 2026-10-18 "sistem: global gece gözcüsü + Tussle"
---

# Başka oturumun başlattığı turda oluşturulan zamanlanmış görev izin modunu kaydetmez

`create_scheduled_task`, oturumun izin modunu (auto/bypass) göreve ancak tur masaüstü uygulamasında elle yazılmış bir mesajla başladıysa kaydeder. Yan oturumda (ilk mesajı başka oturumdan gelen) ya da otomatik olayla başlayan turda oluşturulan görev modsuz kaydedilir; çalıştırmalar Claude Code ayarlarındaki varsayılan modla başlar.

- Bu Mac'te genel `permissions.defaultMode: auto` olduğu için sorun çıkmadı: `gece-gozcusu` ilk denemesi (Run now) izin sorusu olmadan bitti ([[2026-10-18-global-gece-gozcusu]]).
- Yine de gözetimsiz görev için iki önlem: görevin çalışma klasörünün `.claude/settings.local.json`'una kullandığı komut şekillerinin açık izinlerini yaz ve ilk çalıştırmayı "Run now" ile dene (verilen onaylar göreve kaydedilir).
- Mod gerekirse Yusuf uygulamada görevi düzenleyerek seçer.

İlgili: [[zamanlanmis-gorevler-ve-skiller]], [[izin-istemleri-ve-rutinler]], [[rutin-calisma-klasoru-silinince-oturum-acmaz]]
