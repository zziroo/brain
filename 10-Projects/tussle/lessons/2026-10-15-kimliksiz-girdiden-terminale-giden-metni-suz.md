---
type: lesson
project: tussle
date: 2026-10-15
status: active
tags: [tussle, guvenlik, cli, log, inceleme]
source: Claude Code oturumu 2026-10-15 "tussle: hata toplama + geri bildirim" (inceleme + şüpheci bulgusu)
---

# Ders: Kimliksiz uçtan gelen metin terminale basılacaksa kontrol karakterlerini hem sunucuda hem CLI'de süz

`JSON.stringify` jsonl'a yazarken ESC ve C1 karakterlerini `\u001b` diye kaçırır, dosya güvenli görünür; ama CLI `JSON.parse` ile okuyunca karakterler ham hale döner ve operatörün terminaline gider (satır gizleme/sahteleme, OSC 52 ile pano yazma). İnceleme ajanı buldu, şüpheci ajan doğruladı (medium).

- Basılan **her** alan süzgeçten geçsin (mesaj kadar `rev`, `url`, kullanıcı adı, "bozuk satır" dalı da); yalnız `\s` sadeleştirmek yetmez.
- Süzgeç: `/[\x00-\x1f\x7f-\x9f]/` + Unicode yön/sıfır genişlik (`​-‏  -‮ ⁦-⁩ ﻿`); önce kontrol süzgeci, sonra boşluk sadeleştirme.
- Sunucuda da (`cut` içinde, satır sonu ve sekme hariç) süz: dosyayı `tail`/`less`/editör de okur; CLI süzgeci yine kalır (eski kayıtlar, sunucuya güvenmeme).
- Orta bulguda şüpheci ajan kuralı iyi çalıştı: bulguyu onayladı ve iki eksik (bozuk satır dalı, Unicode yön işaretleri) ekledi.

İlgili: [[2026-10-15-istemci-hata-toplama-jsonl-geri-bildirim-sqlite]]
