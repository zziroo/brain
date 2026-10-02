---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, orkestrasyon, worktree, inceleme-kapisi, ajan]
source: Claude Code oturumu 72fd0708 (incremantal-game): 4 + 2 paralel Opus ajanı, 5 inceleme, 1 şüpheci, 1 doğrulayıcı
---

# Paralel worktree dalları: inceleme → düzeltme → dalın sahibine `git merge main` → ff; içerik ajanını uçuştaki dallar hakkında uyar

## Ne oldu
Altı özellik dilimi (kontroller, lazer, gökyüzü, hikâye metni, hikâye bağlama, geçişler) birbirine değen dosyalarda (`main.js`, `ui.js`, `render.js`, `i18n.js`, `camp.js`) çalıştı. Akış: her ajan kendi worktree'sinde çalışıp dalına commit attı → salt-okunur Opus incelemesi → orta bulgular için şüpheci (Sonnet) ya da koordinatörün kendi doğrulaması → bulgular aynı ajana `SendMessage` ile geri → ajan `git merge main` yapıp çakışmaları kendi çözdü ve yeniden doğruladı → koordinatör `--ff-only` ile aldı. İnceleme sonrası düzeltme commit'leri ayrıca bir Sonnet doğrulayıcıdan geçti. Beş dalın hiçbirinde koordinatör çakışma çözmedi; `main` hep ileri sarıldı. İki bağımsız ajan birleştirirken `main`'in bir hatasını buldu ([[2026-10-02-birlesmeden-sonra-her-sahneye-bak]]).

Aksayan: hikâye bağlama ajanı lazer öncesi `main`'den dallandı ve `run.js`'de yağ bedeli görmeyince "odaklı ışık yağı çabuk yer" diyen iki doğru hikâye satırını yanlış sanıp değiştirdi; birleştirmeden sonra geri aldırıldı. Ayrıca ajanlar aynı tarayıcı panelini paylaştığı için panel bazen bir ajana saatlerce gizli kaldı; o ajan DOM ölçümüyle yetindi, görsel denetimi koordinatör birleştirmeden sonra yaptı.

## Ders
- Çakışan dosyalar varsa worktree + "sahibi birleştirir" akışı iyi çalışıyor: sahibi kodunu bildiği için çakışmayı doğru çözüyor ve koordinatörün bağlamı korunuyor. Birleştirme talimatında `main`'in o dalın bazından beri **ne kazandığını** dosya dosya yaz; en tehlikeli çakışmayı (silinmiş kodun dal tarafında yaşaması) özellikle söyle.
- Bir ajana, başka bir dalda değişmekte olan davranışa dayanan içerik (metin, denge notu) yazdırıyorsan, "şu dal şunu değiştiriyor; bu konuda kodu değil bu notu esas al" de. Ajan güncel kodu gerçek sanır.
- Bir ajan "ilk tur" raporunda bir şeyi göremediğini söylüyorsa (gizli panel) onu bir sonraki tura açıkça taşı ve en sonunda kendin bak.
- Önce test, sonra düzeltme istemek işe yarıyor: "erken dönüş" eşiği için önce başarısız olan vakayı `story-check`'e ekletmek, düzeltmenin gerçekten bulguyu kapattığını gösterdi.
- Her orta bulgu için ayrı şüpheci şart değil: bulgu benzetim çıktısı ya da okunabilir bir kod satırıyla geliyorsa koordinatörün kendi doğrulaması yeter; şüpheci, kanıtı dolaylı olan bulgulara (kontrol dalındaki basılı tuş) ayrıldı ve orada daha basit bir düzeltme önerdi.

İlgili: [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]], [[20-Areas/working-rules/araclar-ve-raporlar|Araçlar ve raporlar]]
