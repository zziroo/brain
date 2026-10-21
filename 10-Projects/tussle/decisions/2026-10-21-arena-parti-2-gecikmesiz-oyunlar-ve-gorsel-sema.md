---
type: decision
project: tussle
date: 2026-10-21
status: active
tags: [tussle, arena, oyunlar, gorsel, karar]
source: Claude Code oturumu "tussle: arena devam turu" (2026-10-21 gece)
---

# Arena parti 2: gecikmesiz beş oyun (Pocket, Puck, Drop Four, XOX, Number Hunt) + bütün arena görünümleri sahne kitinde

## Bağlam
Yusuf ilk partiyi telefonda denedi: "basit, kontroller hantal". Telemetri: kareler akıcı ama dokunuş→tepki 300–500 ms (ağ + 100–200 ms render gecikmesi + Sumo kurulumu/ızgara adımı); sunucu otoriteli gerçek zamanlı oyunlarda bu kalır. Yusuf'un fikirleri: bilardo, XOX gibi karşılıklı masa oyunu, "bir sayı gösteriliyor, karışık sayılar arasından kim bulursa". Ayrıca: "tasarımları çok sade yapıyoruz; tüm oyunları güncellediğimiz şema gibi yap."

## Karar
- **Üç gecikmesiz kalıp:** nişan al-bırak (nişan yerel, sunucuya tek hamle: Pocket 2 kişi bilardo, Puck 2–4 kişi shuffleboard/curling), sıra tabanlı masa (Drop Four, XOX; hamle süresi dolunca sunucu rastgele hamle yapar), kendi hızında yarış (Number Hunt: aynı tahta, aynı hedef sırası, herkes kendi hızında; "ilk dokunan alır" ağ farkıyla belirlenirdi, reddedildi). Kurallar `docs/ARENA-GAMES.md` Parti 2, `docs/ARENA-PLAN.md` §11–§15.
- **Dikiş:** `gesture: 'drag'` (drag-start/move/end, yalnız end gönderilir), `resize` kancası, `layout 'tall'`, `ArenaMeta.players {min,max}` sayısal, `src/shared/arena/turn.ts` (sıra saati, `byTimeUsed` eşitlik bozucu), `ball-physics.ts`, `src/client/arena/scene.ts` (view-kit sarmalayıcıları: `bakeArenaRoom/Ground`, `arenaVolume`, `drawBall`). Tap oyunları hücre/sayıyı `ain.c` ile gönderir; kabuk `c`'yi iletir ve önce gönderir, gönderilmeyen niyete ön izleme yok.
- **Görsel:** 10 arena oyununun hepsi VISUAL §2.1 şemasında (pişirilmiş oda+zemin, hacim, kontur, temas gölgesi; yüz yalnız kendi karakterinde) ve hepsinin gerçek kapağı var (`SCENES`, `--cover-<id>`). Gece'de sarı kökenli zeminler hardala kayıyor (günlük oyunlarla aynı kural; ince ayar isteğe bağlı).
- **main `HEAD` (parti 2 birleşik), yayın kararı Yusuf'ta.** 182 test dosyası, 2636 test yeşil; her oyun tarayıcıda bot ile oynandı, telefonda denenmedi.

## Neden
- Gecikmeyi gizlemek yerine türü değiştirmek: istemci tahmini büyük iş ve "geri sarma" hissi verir.
- Number Hunt yarış biçimi: adalet 100 ms'lik ağ farkına bağlı olmasın (Type Race ile aynı ilke).

## Reddedilen alternatifler
- Puck'ta sabit 75 sn tavan: 4 kişide 3. turu kesiyordu (inceleme simülasyonu); süre `3·n·(hamle+kayış)` oldu (2 kişi ≤72 sn, 4 kişi ≤144 sn en kötü durum).
- Pocket'ta ayrılan oyuncu adına otomatik vuruş: kaldırıldı, maç hemen biter.
- Kapak için `PLACEHOLDER_COVERS`: gerçek sahne fonksiyonları yazıldı.

## Sonuçlar / riskler
- Telefon teyidi: sürükle-bırak hissi (Pocket/Puck güç eğrisi `(çekme/0,5)^1,65`, merkez ~40 px, tam güç ~74 px), Drop Four/XOX hamle süreleri (10/8 sn) sıkıcı mı, Number Hunt karışma anı, Gece tonları.
- Kartın `seed`'i maç başlamadan istemciye gidiyorsa Number Hunt/Type Race tahtası önceden hesaplanabilir (hile; doğrulanmadı, arkadaş grubu için kabul).
- İnceleme: dikiş+Pocket 3 düşük, Puck 1 orta + 2 düşük, Drop Four/XOX 1 düşük, Number Hunt 1 orta + 2 düşük; hepsi düzeltildi. Orta bulgularda şüpheci koşulmadı (simülasyon/kod kanıtı yeterliydi), koordinatör kararı.
- Çalışma kopyasında takipsiz `src/client/mockups/kapisma.html` var (kaynağı bilinmiyor, dokunulmadı).

## İlgili
- [[2026-10-21-arena-ikinci-parti-crown-trails-paint-type-race]], [[2026-10-21-arena-kasma-veri-acligi-uyarlanabilir-render-gecikmesi]]
