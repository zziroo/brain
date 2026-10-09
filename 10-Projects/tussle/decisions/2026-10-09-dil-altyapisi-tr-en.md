---
type: decision
project: tussle
date: 2026-10-09
status: active
tags: [tussle, i18n, dil, sunucu]
source: oturum 2026-10-09 (mobil-playus: oda/sohbet/hareket/dil turu + oyun üretim kiti + Parti A)
---

# Karar: TR/EN dil altyapısı; sunucu hata kodu döner, akış satırları yapısal; hareket paketi reduced-motion'a bağlı

## Bağlam
Mağaza hedefi global; tüm metinler Türkçe literal'di. Aynı turda Yusuf menülerde "dinamik his" istedi, kasmama kuralıyla çelişmeden.

## Karar
- `src/client/i18n.ts` + `i18n/{tr,en}.ts` (tr kaynak, en `satisfies` ile anahtar eşliği; typecheck zorlar). `t()` yer tutucu + çoğul (`Intl.PluralRules`, fallback'li). Ayar: Sistem / Türkçe / English; dil değişince ekran yeniden kurulur, oyun sırasında asla; `<html lang>` ilk boyamadan önce satır içi script ile.
- Sunucu hata gövdesi `{error, code, message, field?, params?}`: `code` makine kodu (~55), `message` Türkçe eski istemciler için; istemci `errors.<code>` ile çevirir, bilinmeyen kodda sunucu mesajı.
- Akış satırları (`kind: feed`) yapısal yük `messages.feed` (migration 5) + eski `text`; istemci kendi dilinde üretir.
- Oyun adları/varyantlar istemcide çevrilir; `meta.ts` Türkçe kaynak, sim tarafı dilsiz (purity testi).
- **Hareket paketi:** yay fizikli alt sayfa (parmakla 1:1, hız/%35 eşiğiyle kapanır), View Transitions ile ekran geçişi (oyun ekranı yalnız solma, senkron mount), sticker pop-in (ilk 8 anında, kalanı IntersectionObserver, tek sefer), `:active` ezilme; yalnız transform/opacity; `data-reduced-motion` + OS ayarına bağlı.

## Neden
Mağaza için zorunlu; şimdi yapınca sonraki tüm metinler sözlükten doğuyor. Hata kodu modeli eski istemcileri bozmuyor. Hareket compositor'da kaldığı için ucuz telefonda kare düşürmüyor.

## Reddedilen alternatifler
- Pasif sözlüğü tembel yüklemek: ilk render'ı async yapar; ~7 KB gzip için değmez (3. dilde yeniden bak).
- Kaydırmaya bağlı JS animasyon (paralaks, küçülen başlık): her kaydırma karesinde JS, kasma riski.
- Manifest'i çok dilli yapmak: tek dil (İngilizce) kaldı; ürün kararı olarak açık.

## Sonuçlar / riskler
- Telefonda doğrulanmadı: View Transition görünümü ve geçiş sırasında dokunuş, Android `pan-down` içerikten çekme (iOS yalnız tutamaktan), İngilizce mod gerçek cihazda.
- CSP eklenirse satır içi dil/tema betiklerinin hash'i gerekir.

## İlgili
- [[2026-10-09-oda-ekrani-sohbet-merkezli]]
