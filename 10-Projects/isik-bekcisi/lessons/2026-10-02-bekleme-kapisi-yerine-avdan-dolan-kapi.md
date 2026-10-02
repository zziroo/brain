---
type: lesson
project: isik-bekcisi
date: 2026-10-02
status: active
tags: [isik-bekcisi, denge, oyun-tasarimi, bot]
source: oturum 2026-10-02 (incremantal-game), odak ışını / fener dengesi turu
---

# İlerleme kapısını "başında bekle" yerine "zaten yaptığın işle dolsun" yap; kapının büyüklüğü oyunun süresini pek değiştirmez

## Ne oldu
Yusuf fener doldurmanın uzun ve boş bir bekleyiş olduğunu söyledi. Üç deneme botla ölçüldü:
1. Feneri hızlandıran araçlar (ışın, çağrılan ruhlar) eklenip enerji aynı bırakılınca bot oyunu 28 seferde bitirdi (önce 44).
2. Süreyi geri getirmek için enerji büyütülünce bekleme geri geldi (2. fener için ~3 dk ışın tutmak).
3. Enerji küçültülüp yıldız maliyetleri artırılınca bot fenerleri güçsüzken art arda yaktı ve son bölgede tıkandı (165+ sefer, bir denemede hiç bitmedi).

Çözüm kapının kaynağını değiştirmek oldu: bölgede yakalanan her ruhun ışığı fenere kendiliğinden akıyor (%80), başında yalnızca kısa ve olaylı bir son kısım kalıyor.

## Ders
- Bekleme şikâyeti sayıyla (enerjiyi azalt) çözülmez; sayı küçülünce kapı kapı olmaktan çıkar, büyüyünce bekleme döner. Kapıyı oyuncunun zaten yaptığı etkinliğe bağla.
- Gelir ve güç üstel büyürken kapının büyüklüğü süreyi az etkiler: enerji 10 kat artınca yalnızca birkaç sefer eklendi. Süreyi yükseltme maliyetleri belirler.
- Maliyeti fazla artırmak "acele et, sonra duvara çarp" üretir: bot her zaman en derin fenerden başladığı için güçsüz girdiği bölgede kazanamaz. Botun aptal politikası gerçek bir oyuncu tuzağını da gösterir.
- Her denge değişikliğini tek sefer değil 4–6 tam oyunla ölç; tek oyunda 28 ile 75 sefer arasında sonuçlar çıktı.
- Botu komut satırından çalıştırılabilir yapmak (`tools/sim-node.mjs`) denge turunu dakikalara indirdi; tarayıcı gerekmedi.

İlgili: [[2026-10-02-odak-isini-fener-olayi-ve-yag-dengesi]], [[2026-10-02-carpimsal-gelistirmeler-geliri-patlatir]], [[10-Projects/isik-bekcisi/_overview|Işık Bekçisi]]
