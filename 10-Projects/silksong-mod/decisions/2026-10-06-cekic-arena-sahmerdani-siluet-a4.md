---
type: decision
project: silksong-mod
date: 2026-10-06
status: active
tags: [silksong, boss, tasarim, lora, animasyon]
source: Windows oturumu 2026-10-06 (konsept turları D:\SilksongMod\ai\out\scoria_v2, scoria_r2)
---

# Scoria'nın çekici kola kaynamış değil, arenanın şahmerdanı; siluet A4 (kaya baş-gövde, zincirli maşa)

**Karar (Yusuf, 2026-10-06):** Çekiç, örsün üstünde zincirle asılı prosedürel bir arena mekanizması olur; Scoria zinciri çekerek indirir. Kendi silahı 1. fazda zincirli maşa/kanca, 2. fazda bitmemiş iğne. Siluet, LoRA v2 konsept A4: tek parça çatlak cüruf kaya baş-gövde, iki kor göz, çok uzun ince kollar ve bacaklar, kambur ve yorgun duruş.

**Neden:**
- Stil modeli eğitim verisinde çekiç olmadığı için çekiç kolunu hiç çizmedi (prompt ağırlığı 1,4 ile bile); zincir, maşa ve kor aleti ise her seferinde kendiliğinden geldi. Yusuf "iyi çıktı veren tasarıma esne" dedi.
- Çekiç prosedürel sprite olunca gövdeye bağlı en zor animasyon parçası ortadan kalkar (~160 → ~150 kare, 3'ü mekanizma).
- Tematik olarak güçlenir: ocağı bırakamayan usta kendi ocağıyla dövüşür.
- A4, animasyonu en kolay siluet: gövde+baş tek sert parça, uzuvlar ince segment (kukla için ideal). A3 gövde bükümü ister, C4 çok eklemli, B4'ün kolları belirsiz.

**Reddedilen alternatifler:**
- *Çekici ayrı üretip kola yapıştırmak:* her turda ek iş, animasyonda en zor parça olmaya devam ederdi.
- *A3 (boynuzlu, dik):* daha jenerik "şövalye böcek", HK boss'larına fazla yakın.
- *C4 / B4:* ürkütücü ve karakterli ama animasyon maliyeti yüksek ya da kolsuz.

Sonuç: karakter LoRA'sı `scoria_char_v1` (15 görsel, stil v2 üstüne, 400. adım en iyi) tutarlı Scoria üretiyor; Idle denemesi 8 karede titremesiz. Tasarım dokümanı güncellendi (repo commit ab4caa2).
