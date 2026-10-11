import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Ozet, Varlik } from '../types'

const PANE = 'orkestra'
const URL = 'http://127.0.0.1:7788'
const SUNUCU = '~/.claude/orchestration-report/canli.mjs'
const durum = atom({ plugin: 'orkestra', key: 'durum' } as const, null)
const gizli = atom({ plugin: 'orkestra', key: 'gizli' } as const, false)
const hepsi = atom({ plugin: 'orkestra', key: 'hepsi' } as const, false)

// ---- biçimleme ----
const tok = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}k` : `${Math.round(n)}`)
const usd = (n: number) => `$${n.toFixed(2)}`
const sure = (ms: number) => (ms < 60e3 ? `${Math.round(ms / 1e3)} sn` : ms < 3600e3 ? `${Math.round(ms / 60e3)} dk` : `${(ms / 3600e3).toFixed(1)} sa`)
const kes = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s)
const renk = (d: string) => (d === 'aktif' || d === 'çalışıyor' ? 'success' : d === 'bekliyor' ? 'warning' : 'inactive')
const nokta = (d: string) => (d === 'aktif' || d === 'çalışıyor' ? '●' : d === 'bekliyor' ? '◐' : '○')
const cubuk = (oran: number, w: number) => {
  const dolu = Math.max(0, Math.min(w, Math.round(oran * w)))
  return '█'.repeat(dolu) + '░'.repeat(w - dolu)
}

// Sunucunun verdiği varlığı küçültür (band/pane'in gerek duyduğu alanlar).
function kucult(v: any): Varlik {
  const sa = v.sonArac
  return {
    id: String(v.id), tur: v.tur, oturum: String(v.oturum ?? ''), proje: String(v.proje ?? ''),
    baslik: String(v.baslik ?? v.aciklama ?? v.id), modelAd: String(v.modelAd ?? v.model ?? '?'),
    durum: String(v.durum ?? ''), detay: String(v.detay ?? ''), son: Number(v.son ?? 0),
    maliyet: Number(v.maliyet ?? 0), baglam: Number(v.baglam ?? 0), pencere: Number(v.pencere ?? 200000),
    cagri: Number(v.cagri ?? 0), cikis: Number(v.tok?.c ?? 0),
    sonArac: sa ? kes(`${sa.ad}${sa.ozet ? ' · ' + sa.ozet : ''}`, 70) : '',
    seri: Array.isArray(v.seri) ? v.seri.slice(-60).map((x: unknown) => Number(x) || 0) : [],
    ajanTuru: v.ajanTuru ? String(v.ajanTuru) : undefined, bitti: !!v.bitti,
  }
}

function sparkline(seri: number[], w: number, h: number, aktif: boolean): string {
  const n = seri.length || 1
  const max = Math.max(1, ...seri)
  const pts = seri.map((v, i) => `${((i / Math.max(1, n - 1)) * (w - 2) + 1).toFixed(1)},${(h - 1 - (v / max) * (h - 3)).toFixed(1)}`)
  const yol = pts.length ? 'M' + pts.join(' L') : ''
  const son = pts[pts.length - 1]
  const c = aktif ? '#5ec269' : '#8a8f98'
  const son_xy = son ? son.split(',') : null
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
    `<path d="${yol}" fill="none" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>` +
    (son_xy && aktif ? `<circle cx="${son_xy[0]}" cy="${son_xy[1]}" r="2.5" fill="${c}"><animate attributeName="r" values="2;4;2" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite"/></circle>` : '') +
    `</svg>`
}

async function cek($: EngineInterface) {
  try {
    const r = await $.http.fetch(`${URL}/durum`)
    if (!r.ok) throw new Error(String(r.status))
    const j = JSON.parse(r.text)
    const g = j.genel ?? {}
    const o: Ozet = {
      ts: Number(g.ts ?? Date.now()), sunucu: true,
      canliOturum: Number(g.canliOturum ?? 0), aktifAjan: Number(g.aktifAjan ?? 0), cikisDk: Number(g.cikisDk ?? 0),
      son5dk: { tok: Number(g.son5dk?.tok ?? 0), maliyet: Number(g.son5dk?.maliyet ?? 0) },
      sonSaat: { tok: Number(g.sonSaat?.tok ?? 0), maliyet: Number(g.sonSaat?.maliyet ?? 0) },
      oturumlar: (j.oturumlar ?? []).map(kucult),
      ajanlar: (j.ajanlar ?? []).map(kucult),
    }
    await update($, durum, () => o)
    const calisan = o.ajanlar.filter(a => a.durum === 'çalışıyor').length
    $.ui.status(`● ${o.canliOturum} oturum · ${calisan} ajan · ${tok(o.cikisDk)} tok/dk · ${usd(o.sonSaat.maliyet)}/sa`)
  } catch {
    const eski = await read($, durum)
    if (!eski || eski.sunucu) await update($, durum, d => (d ? { ...d, sunucu: false } : { ts: 0, sunucu: false, canliOturum: 0, aktifAjan: 0, cikisDk: 0, son5dk: { tok: 0, maliyet: 0 }, sonSaat: { tok: 0, maliyet: 0 }, oturumlar: [], ajanlar: [] }))
    $.ui.status(undefined)
  }
}
async function baslat($: EngineInterface) {
  try {
    await $.process.run(['/bin/sh', '-c', `nohup node ${SUNUCU} --port 7788 >/dev/null 2>&1 &`], { timeoutMs: 5000 })
    $.ui.toast('Canlı pano sunucusu başlatıldı')
  } catch (e: any) {
    $.ui.toast(`Sunucu başlatılamadı: ${e?.message ?? e}`)
  }
  await $.clock.sleep(800)
  await cek($)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'orkestra', description: 'Canlı orkestra panelini aç (oturumlar ve ajanlar)' })
    void cek($)
    $.clock.every(2000, () => void cek($))
    return next(e)
  })

  on('command.run', { command: 'orkestra' }, async $ => {
    await update($, gizli, () => false)
    await $.ui.open({ id: PANE, title: 'Orkestra', focus: true })
    return { text: 'Orkestra paneli açıldı.' }
  })

  // ---- prompt üstü şerit ----
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const d = await read($, durum)
    if (e.props.hasSurvey || (await read($, gizli)) || d === null) return next(e)
    const { Box, Button, Text } = $.ui.resolve(e)
    if (!d.sunucu) {
      return (
        <Box gap={1}>
          <Text dimColor>○ Orkestra: canlı pano sunucusu kapalı</Text>
          <Button key="baslat" label="Başlat" onPress={() => void baslat($)} />
          <Button key="gizle" label="Gizle" plain onPress={() => void update($, gizli, () => true)} />
        </Box>
      )
    }
    const calisan = d.ajanlar.filter(a => a.durum === 'çalışıyor')
    const aktifO = d.oturumlar.filter(o => o.durum === 'aktif').length
    return (
      <Box gap={1}>
        <Text color={calisan.length || aktifO ? 'success' : 'inactive'} bold>●</Text>
        <Text bold>Orkestra</Text>
        <Text dimColor>
          {d.canliOturum} oturum ({aktifO} aktif) · {calisan.length} ajan · {tok(d.cikisDk)} tok/dk · son 1 sa {tok(d.sonSaat.tok)} tok {usd(d.sonSaat.maliyet)}
        </Text>
        <Button key="panel" label="Paneli aç" onPress={() => void $.ui.open({ id: PANE, title: 'Orkestra', focus: true })} />
        <Button key="gizle" label="Gizle" plain onPress={() => void update($, gizli, () => true)} />
      </Box>
    )
  })

  // ---- panel ----
  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const els = $.ui.resolve(e) as any
    const { Box, Button, Text } = els
    const Svg = e.surface !== 'terminal' ? els.Svg : null
    const d = await read($, durum)
    const tumu = await read($, hepsi)
    const W = Math.max(40, e.props.bodyColumns ?? 60)
    if (d === null) return <Text dimColor>Veri bekleniyor…</Text>
    if (!d.sunucu) {
      return (
        <Box flexDirection="column" gap={1}>
          <Text color="warning">Canlı pano sunucusu çalışmıyor ({URL}).</Text>
          <Button key="baslat" label="Sunucuyu başlat" onPress={() => void baslat($)} />
        </Box>
      )
    }
    const simdi = d.ts
    const ajanlarOf = (oid: string) => d.ajanlar.filter(a => a.oturum === oid && (tumu || a.durum === 'çalışıyor' || simdi - a.son < 10 * 60e3))
    const oturumlar = d.oturumlar.filter(o => tumu || o.durum === 'aktif' || o.durum === 'bekliyor' || ajanlarOf(o.id).length)
      .sort((a, b) => b.son - a.son)
    const kart = (v: Varlik, ajan: boolean) => {
      const canli = v.durum === 'aktif' || v.durum === 'çalışıyor'
      const oran = v.pencere ? v.baglam / v.pencere : 0
      const bw = Math.max(8, Math.min(24, W - 30))
      return (
        <Box key={v.id} flexDirection="column" borderStyle="round" borderColor={renk(v.durum)} borderDimColor={!canli} paddingX={1} marginLeft={ajan ? 2 : 0}>
          <Box gap={1}>
            <Text color={renk(v.durum)}>{nokta(v.durum)}</Text>
            <Text bold={!ajan} wrap="truncate-end">{kes(v.baslik, W - 24)}</Text>
            <Text dimColor>{ajan ? v.ajanTuru ?? 'ajan' : v.proje}</Text>
          </Box>
          <Box gap={1}>
            <Text color="claude">{v.modelAd}</Text>
            <Text color={renk(v.durum)}>{v.durum}</Text>
            <Text dimColor wrap="truncate-end">{v.detay}{v.son ? ` · ${sure(simdi - v.son)} önce` : ''}</Text>
          </Box>
          <Box gap={1}>
            <Text dimColor>bağlam</Text>
            <Text color={oran > 0.8 ? 'error' : oran > 0.5 ? 'warning' : 'success'}>{cubuk(oran, bw)}</Text>
            <Text dimColor>{tok(v.baglam)} / {tok(v.pencere)} · %{Math.round(oran * 100)}</Text>
          </Box>
          {v.sonArac ? <Text dimColor wrap="truncate-end">{v.sonArac}</Text> : null}
          <Box gap={1}>
            <Text bold>{usd(v.maliyet)}</Text>
            <Text dimColor>{tok(v.cikis)} çıkış · {v.cagri} çağrı</Text>
            {Svg ? <Svg source={sparkline(v.seri, 120, 18, canli)} alt={`son 60 dk çıkış`} width={120} height={18} isInteractive /> : null}
          </Box>
        </Box>
      )
    }
    return (
      <Box flexDirection="column" gap={1}>
        <Box gap={1} flexWrap="wrap">
          <Text bold>{d.canliOturum} canlı oturum</Text>
          <Text dimColor>·</Text>
          <Text bold>{d.ajanlar.filter(a => a.durum === 'çalışıyor').length} çalışan ajan</Text>
          <Text dimColor>· 5 dk {tok(d.son5dk.tok)} {usd(d.son5dk.maliyet)} · 1 sa {tok(d.sonSaat.tok)} {usd(d.sonSaat.maliyet)} · {tok(d.cikisDk)} tok/dk</Text>
          <Button key="hepsi" label={tumu ? 'Yalnız canlı' : 'Hepsini göster'} plain onPress={() => void update($, hepsi, v => !v)} />
        </Box>
        {oturumlar.length === 0 && <Text dimColor>Şu an canlı oturum yok.</Text>}
        {oturumlar.map(o => (
          <Box key={`g-${o.id}`} flexDirection="column">
            {kart(o, false)}
            {ajanlarOf(o.id).sort((a, b) => b.son - a.son).map(a => kart(a, true))}
          </Box>
        ))}
        <Text dimColor>Maliyet API karşılığıdır; Max aboneliğinde ayrıca faturalanmaz. Tam görünüm: {URL}/</Text>
      </Box>
    )
  })
}
