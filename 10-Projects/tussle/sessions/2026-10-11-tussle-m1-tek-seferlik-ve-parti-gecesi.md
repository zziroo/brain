---
type: session
project: tussle
date: 2026-10-11
status: active
tags: [tussle, oturum, m1, parti-gecesi]
source: oturum 2026-10-11 (mobil-playus: M1 eksikleri + Parti Gecesi)
---

# Oturum: M1 tek seferlik koşu ve Parti Gecesi yayında (`f22ed1a`)

- **M1 eksikleri** (`6507a23`): Yusuf kapsamı daralttı; yalnız tek seferlik koşu (çıkan/yenileyen/ikinci sekme = forfeit, 10 sn pay, migration 12). Rövanş, maç geçmişi, yeniden katılma yapılmadı; kişi sayısı filtresi sonraya. Karar: [[2026-10-11-canli-kapisma-tek-seferlik-kosu]].
- **Parti Gecesi** (`f22ed1a`): 1. faz (sunucu, kart, akış, ilk sahne; migration 13) + 2. faz (sahne cilası, kürsü, konfeti, yarış şeridi `setMany`, hazır kartı "Parti Gecesi · Oyun i/n") + inceleme düzeltmeleri. Karar: [[2026-10-11-parti-gecesi]]. Sözleşme repo `docs/PARTY-PLAN.md`.
- İnceleme: M1'de 2 orta (biri doğrulandı ve düzeltildi, biri düşüğe indi → pay 10 sn); Parti 1. fazda 1 yüksek (kürsü sonrası sonraki partinin ilk oyunu açılmıyordu) + 3 düşük, 2. fazda 1 orta (parti oyunu günlük denemenin üstüne açılabiliyordu) + 2 düşük; hepsi düzeltildi.
- **Yayın** `f22ed1a`: yedek `pre-f22ed1a.db`, DB 11 → 13, healthz ok, GitHub `zziroo/tussle` push edildi. 1.618 test yeşil.
- Dersler: [[2026-10-11-parti-gecesi-dersleri]].

**Doğrulanmadı:** Parti Gecesi gerçek telefonda ve gerçek kişilerle hiç oynanmadı (yalnız betikli oyuncular + headless Chrome kareleri): sahne animasyonlarının akıcılığı/hızı, konfeti, ses/titreşim, koyu tema, geri düğmesi, 16 kişide yarış şeridi "+n" okunurluğu (sınırda). Tek seferlik kuralın iPhone arka plan davranışı.
