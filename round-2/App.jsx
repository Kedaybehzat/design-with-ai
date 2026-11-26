import { useEffect, useMemo, useState } from 'react';
import './styles.css';

// Step 2 — dials (DESIGN.md: warm + amber; the rest chosen for "kolay, sıcak, rahat")
const DIALS = { neutral: 'warm', accent: 'amber', shape: 'soft', density: 'comfortable' };
const FONT_URL = 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap';

function useFonts() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, []);
}

const HOURS = Array.from({ length: 14 }, (_, i) => 9 + i); // 09:00 … 22:00 başlangıçlı dilimler (23:00'te kapanış)
const NOW = 15; // şu anki dilim: 15:00–16:00
const MAX_HOURS = 4;
const fmt = (h) => `${String(h).padStart(2, '0')}:00`;

const FLOORS = [
  { id: 'Z', name: 'Zemin kat', short: 'Zemin', note: 'Giriş katı, konuşmak serbest' },
  { id: '1', name: '1. kat', short: '1. kat', note: 'Fısıltı serbest' },
  { id: '2', name: '2. kat', short: '2. kat · sessiz', note: 'Sessiz kat, telefon kapalı' },
  { id: 'G', name: 'Grup çalışma odaları', short: 'Grup odaları', note: '4–6 kişilik kapalı odalar' },
];
const ISLANDS = ['A', 'B', 'C', 'D', 'E', 'F'];
const LOAD = [0.3, 0.5, 0.7, 0.8, 0.78, 0.82, 0.88, 0.84, 0.72, 0.58, 0.46, 0.36, 0.26, 0.18];

// deterministik sahte veri: her yenilemede aynı plan
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}

function buildDesks() {
  const desks = [];
  FLOORS.forEach((f) => {
    if (f.id === 'G') {
      for (let i = 1; i <= 6; i++) {
        const id = `G-${i}`;
        desks.push({
          id, floor: 'G', room: true, island: null, row: 0, col: 0,
          seats: i <= 3 ? 4 : 6, outlet: true, window: i % 2 === 1, lamp: false, screen: i > 3,
          hours: HOURS.map((h, hi) => { const r = hash(`${id}${h}`); const load = LOAD[hi] + 0.1; return r < load * 0.55 ? 'busy' : r < load ? 'reserved' : 'free'; }),
          flagged: null,
        });
      }
      return;
    }
    const extra = f.id === '2' ? 0.08 : f.id === 'Z' ? -0.06 : 0;
    let n = 0;
    ISLANDS.forEach((isl, ii) => {
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          n += 1;
          const id = `${f.id}-${String(n).padStart(2, '0')}`;
          const hours = HOURS.map((h, hi) => {
            const r = hash(`${id}:${h}`);
            const load = Math.min(0.95, LOAD[hi] + extra);
            return r < load * 0.7 ? 'busy' : r < load ? 'reserved' : 'free';
          });
          const nowIdx = HOURS.indexOf(NOW);
          const flagged = hours[nowIdx] === 'busy' && hash(`flag${id}`) < 0.1
            ? { minutes: 30 + Math.round(hash(`m${id}`) * 50), reports: 1 + Math.round(hash(`r${id}`) * 2) }
            : null;
          desks.push({
            id, floor: f.id, room: false, island: isl, row, col,
            seats: 1, outlet: col === 0 || col === 3, window: ii < 3 && row === 0,
            lamp: hash(`lamp${id}`) < 0.55, screen: false, hours, flagged,
          });
        }
      }
    });
  });
  return desks;
}

const STATUS = {
  free: { word: 'Boş', chip: 'free' },
  busy: { word: 'Dolu', chip: '' },
  reserved: { word: 'Rezerve', chip: '' },
  mine: { word: 'Senin', chip: 'accent' },
};

/* ---------- icons (16px, 1.5 stroke, currentColor) ---------- */
const Svg = ({ size = 16, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>{children}</svg>
);
const I = {
  mark: (p) => <Svg size={20} viewBox="0 0 20 20" {...p}><path d="M3 15.5h14M5 15.5V9.5M15 15.5V9.5M3.5 9.5h13" /><path d="M12.5 9.5 14 4.5l2 1" /></Svg>,
  plug: (p) => <Svg {...p}><path d="M6 2v3M10 2v3M4.5 5h7v2.5a3.5 3.5 0 0 1-7 0V5ZM8 11v3" /></Svg>,
  window: (p) => <Svg {...p}><rect x="3" y="2.5" width="10" height="11" rx="1" /><path d="M8 2.5v11M3 8h10" /></Svg>,
  lamp: (p) => <Svg {...p}><path d="M5 2.5h6l1.5 5h-9L5 2.5ZM8 7.5v6M5.5 13.5h5" /></Svg>,
  screen: (p) => <Svg {...p}><rect x="2" y="3" width="12" height="8" rx="1" /><path d="M8 11v2.5M5.5 13.5h5" /></Svg>,
  people: (p) => <Svg {...p}><circle cx="6" cy="5.5" r="2.25" /><path d="M2 13.5c.5-2.5 2-3.75 4-3.75s3.5 1.25 4 3.75M10.5 3.5a2.2 2.2 0 0 1 0 4.2M12.5 10c.9.6 1.4 1.8 1.6 3.5" /></Svg>,
  person: (p) => <Svg {...p}><circle cx="8" cy="5" r="2.5" /><path d="M3.5 14c.6-3 2.3-4.5 4.5-4.5s3.9 1.5 4.5 4.5" /></Svg>,
  clock: (p) => <Svg {...p}><circle cx="8" cy="8" r="5.75" /><path d="M8 5v3.25l2 1.25" /></Svg>,
  check: (p) => <Svg {...p}><path d="m3.5 8.5 3 3 6-6.5" /></Svg>,
  close: (p) => <Svg {...p}><path d="m4 4 8 8M12 4l-8 8" /></Svg>,
  bag: (p) => <Svg {...p}><path d="M3.5 6h9l-.75 7.5h-7.5L3.5 6ZM6 6V4.5a2 2 0 0 1 4 0V6" /></Svg>,
  alert: (p) => <Svg {...p}><circle cx="8" cy="8" r="5.75" /><path d="M8 5v3.5M8 11h.01" /></Svg>,
  sun: (p) => <Svg {...p}><circle cx="8" cy="8" r="3" /><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" /></Svg>,
  moon: (p) => <Svg {...p}><path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5Z" /></Svg>,
};

/* ---------- app ---------- */
export default function App() {
  useFonts();
  useEffect(() => { Object.assign(document.documentElement.dataset, DIALS); }, []);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const [desks, setDesks] = useState(buildDesks);
  const [floor, setFloor] = useState('2');
  const [hour, setHour] = useState(16);
  const [filters, setFilters] = useState({ outlet: false, window: false, lamp: false });
  const [selectedId, setSelectedId] = useState(null);
  const [range, setRange] = useState(null); // { from, to } saat
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [reported, setReported] = useState({});
  const [reservations, setReservations] = useState([
    { id: 1, deskId: 'Z-07', floor: 'Zemin kat', from: 19, to: 21, day: 'Bugün' },
  ]);
  const [confirmCancel, setConfirmCancel] = useState(null);

  const mineAt = (deskId, h) => reservations.some((r) => r.day === 'Bugün' && r.deskId === deskId && h >= r.from && h < r.to);
  const statusAt = (desk, h) => (mineAt(desk.id, h) ? 'mine' : desk.hours[HOURS.indexOf(h)]);

  const floorDesks = desks.filter((d) => d.floor === floor);
  const selected = desks.find((d) => d.id === selectedId) || null;
  const matches = (d) => (!filters.outlet || d.outlet) && (!filters.window || d.window) && (!filters.lamp || d.lamp || d.screen);

  const freeOn = (fid, h) => desks.filter((d) => d.floor === fid && statusAt(d, h) === 'free').length;
  const freeAll = (h) => desks.filter((d) => !d.room && statusAt(d, h) === 'free').length;
  const totalDesks = desks.filter((d) => !d.room).length;
  const occ = (h) => 1 - freeAll(h) / totalDesks;

  const calm = useMemo(() => {
    const future = HOURS.filter((h) => h >= NOW);
    return future.reduce((best, h) => (occ(h) < occ(best) ? h : best), future[0]);
  }, [desks, reservations]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeDesk(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function openDesk(desk) {
    setSelectedId(desk.id);
    setSuccess(null);
    setError('');
    const st = statusAt(desk, hour);
    setRange(st === 'free' && hour >= NOW ? { from: hour, to: hour + 1 } : null);
  }
  function closeDesk() { setSelectedId(null); setRange(null); setError(''); setSuccess(null); }

  function pickSlot(h) {
    if (!selected) return;
    setSuccess(null);
    if (h < NOW || statusAt(selected, h) !== 'free') return;
    setError('');
    if (!range || range.to - range.from > 1 || h < range.from) { setRange({ from: h, to: h + 1 }); return; }
    if (h === range.from) { setRange(null); return; }
    const next = { from: range.from, to: h + 1 };
    const blocked = HOURS.filter((x) => x >= next.from && x < next.to).some((x) => statusAt(selected, x) !== 'free');
    if (blocked) { setError(`${fmt(range.from)} ile ${fmt(h + 1)} arasında dolu bir saat var. Aralığı böl ya da başka masa seç.`); setRange({ from: h, to: h + 1 }); return; }
    if (next.to - next.from > MAX_HOURS) { setError(`Vize haftasında bir masa en fazla ${MAX_HOURS} saat ayrılabiliyor.`); return; }
    setRange(next);
  }

  function reserve() {
    if (!selected || !range) return;
    const fl = FLOORS.find((f) => f.id === selected.floor);
    setReservations((prev) => [...prev, { id: Date.now(), deskId: selected.id, floor: fl.name, from: range.from, to: range.to, day: 'Bugün' }]);
    setSuccess({ deskId: selected.id, from: range.from, to: range.to });
    setRange(null);
  }

  function cancel(id) {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    setConfirmCancel(null);
    if (success) setSuccess(null);
  }

  const floorInfo = FLOORS.find((f) => f.id === floor);
  const freeHere = freeOn(floor, hour);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark"><I.mark /></span>
          <span className="brand-name">Masa Bul</span>
          <span className="brand-place">Sakarya Üniversitesi · Merkez Kütüphane</span>
        </div>
        <div className="top-right">
          <span className="chip accent"><span className="d" />Vize haftası</span>
          <span className="top-meta num">Perşembe, 26 Kasım · 15:52</span>
          <span className="user">Behzat Ç.</span>
          <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}>
            {theme === 'dark' ? <I.sun /> : <I.moon />}
          </button>
        </div>
      </header>

      <div className="layout">
        <main className="main">
          <div className="page-head">
            <h1 className="page-title">Bugün <em>sessiz bir köşe</em> nerede?</h1>
            <p className="page-sub">Evden çıkmadan bak, masanı ayır. Kütüphane 23:00'e kadar açık.</p>
          </div>

          <section className="tiles" aria-label="Doluluk özeti">
            <div className="tile">
              <span className="label">Binada şu an</span>
              <span className="value">312<span className="unit">/ 420 kişi</span></span>
              <div className="meter" aria-hidden="true"><b style={{ width: '74%' }} /><s style={{ left: '90%' }} /></div>
              <span className="tile-note">%90'dan sonra giriş sıraya alınır</span>
            </div>
            <div className="tile">
              <span className="label">{fmt(hour)}'da boş masa</span>
              <span className="value">{freeAll(hour)}<span className="unit">/ {totalDesks} masa</span></span>
              <div className="strip" aria-hidden="true">
                {HOURS.map((h) => (
                  <i key={h} className={h === hour ? 'now' : h < NOW ? 'soft' : ''} style={{ height: `${Math.max(3, (freeAll(h) / totalDesks) * 28 * 1.6)}px` }} />
                ))}
              </div>
            </div>
            <div className="tile">
              <span className="label">En sakin saat</span>
              <span className="value">{fmt(calm)}<span className="unit">tahmini</span></span>
              <div className="meter" aria-hidden="true"><b style={{ width: `${Math.round(occ(calm) * 100)}%` }} /></div>
              <span className="tile-note">O saatte doluluk %{Math.round(occ(calm) * 100)} olur</span>
            </div>
          </section>

          <section className="controls" aria-label="Kat ve saat seçimi">
            <div className="control-row">
              <span className="control-label">Kat</span>
              <div className="seg" role="group" aria-label="Kat">
                {FLOORS.map((f) => (
                  <button key={f.id} aria-pressed={floor === f.id} onClick={() => setFloor(f.id)}>
                    {f.short}<span className="count">{freeOn(f.id, hour)} boş</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="control-row">
              <span className="control-label">Saat</span>
              <div className="hours" role="group" aria-label="Saat dilimi">
                {HOURS.map((h) => (
                  <button key={h} className={`hour ${h < NOW ? 'past' : ''}`} aria-pressed={hour === h} onClick={() => setHour(h)}
                    aria-label={`${fmt(h)}, ${freeOn(floor, h)} boş masa${h === NOW ? ', şu an' : ''}`}>
                    <span className="t">{h === NOW && <span className="live-dot" />}{String(h).padStart(2, '0')}</span>
                    <span className="occ"><b style={{ width: `${Math.round((1 - freeOn(floor, h) / floorDesks.length) * 100)}%` }} /></span>
                  </button>
                ))}
              </div>
            </div>
            {floor !== 'G' && (
              <div className="control-row">
                <span className="control-label">İstek</span>
                {[['outlet', 'Prizli', I.plug], ['window', 'Pencere kenarı', I.window], ['lamp', 'Lambalı', I.lamp]].map(([k, label, Ic]) => (
                  <button key={k} className="toggle" aria-pressed={filters[k]} onClick={() => setFilters((p) => ({ ...p, [k]: !p[k] }))}>
                    {filters[k] ? <I.check /> : <Ic />}{label}
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="plan" aria-label="Kat planı">
            <div className="plan-head">
              <div className="plan-title">{floorInfo.name}<span className="muted">{floorInfo.note} · {fmt(hour)}–{fmt(hour + 1)} arası {freeHere} boş</span></div>
              <div className="legend">
                <span><i className="sw" style={{ background: 'var(--panel)', border: '1px solid var(--field-line)' }}><i style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--free)' }} /></i>Boş</span>
                <span><i className="sw" style={{ background: 'var(--bar-soft)', color: 'var(--text-2)' }}><I.person size={12} /></i>Dolu</span>
                <span><i className="sw" style={{ background: 'var(--chip)', border: '1px solid var(--line-strong)', color: 'var(--text-2)' }}><I.clock size={12} /></i>Rezerve</span>
                <span><i className="sw" style={{ background: 'var(--accent-tint)', border: '1px solid var(--accent-line)', color: 'var(--accent-text)' }}><I.check size={12} /></i>Senin</span>
                {hour === NOW && <span><i className="sw" style={{ color: 'var(--flag)', border: '1px solid var(--flag)', borderRadius: '50%' }}><I.bag size={12} /></i>Eşya bırakılmış</span>}
                <span><i className="sw" style={{ color: 'var(--text-3)' }}><I.plug size={12} /></i>Priz</span>
              </div>
            </div>

            <div className="room">
              {floor === 'G' ? (
                <>
                  <div className="wall">KORİDOR</div>
                  <div className="group-rooms">
                    {floorDesks.map((d) => {
                      const st = statusAt(d, hour);
                      return (
                        <button key={d.id} className={`gr ${st}`} aria-pressed={selectedId === d.id} onClick={() => openDesk(d)}
                          aria-label={`Oda ${d.id}, ${d.seats} kişilik, ${STATUS[st].word}`}>
                          <span className="gr-name">Oda {d.id.replace('G-', 'G')}</span>
                          <span className="gr-meta"><I.people size={14} />{d.seats} kişilik{d.screen ? ' · ekranlı' : ''}</span>
                          <span className={`chip ${STATUS[st].chip}`} style={{ justifySelf: 'start' }}>{STATUS[st].word}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="wall">PENCERELER</div>
                  <div className="islands">
                    {ISLANDS.map((isl) => (
                      <div className="island" key={isl}>
                        <span className="island-name">{isl} masaları</span>
                        {[0, 1].map((row) => (
                          <FragmentRow key={row} row={row}>
                            <div className="seat-row">
                              {floorDesks.filter((d) => d.island === isl && d.row === row).map((d) => (
                                <Seat key={d.id} desk={d} status={statusAt(d, hour)} selected={selectedId === d.id}
                                  dim={!matches(d)} showFlag={hour === NOW} onClick={() => openDesk(d)} />
                              ))}
                            </div>
                          </FragmentRow>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="wall bottom">GİRİŞ · DANIŞMA</div>
                </>
              )}
            </div>
            <div className="plan-foot">
              <span>Doluluk kapı turnikesinden ve rezervasyonlardan hesaplanıyor, 5 dakikada bir güncellenir.</span>
              <span className="num" style={{ whiteSpace: 'nowrap' }}>{floorDesks.length} {floor === 'G' ? 'oda' : 'masa'}</span>
            </div>
          </section>
        </main>

        <aside className="pane" aria-label="Masa detayı ve rezervasyonlarım">
          {selected ? (
            <DeskDetail
              desk={selected} hour={hour} statusAt={statusAt} range={range} error={error} success={success}
              reported={reported[selected.id]} onReport={() => setReported((p) => ({ ...p, [selected.id]: true }))}
              onPick={pickSlot} onReserve={reserve} onClose={closeDesk}
            />
          ) : (
            <section className="pane-sec">
              <div className="empty">
                <span className="big">Bir masa seç.</span>
                <p>Plandan boş bir masaya dokun; özelliklerini ve bugünkü saatlerini burada görürsün.</p>
              </div>
              <div className="note">
                <div className="head"><span className="chip free"><span className="d" />{freeOn('2', hour)} boş</span><span>2. kat, {fmt(hour)}</span></div>
                <p>Sessiz katta şu sıralar yer bulmak en zor. <em>Erken davranan kazanır.</em></p>
              </div>
            </section>
          )}

          <section className="pane-sec">
            <div>
              <div className="sec-title">Rezervasyonlarım</div>
              <div className="sec-sub">Başlangıçtan sonraki 15 dakika içinde kartını okutmazsan masa boşa çıkar.</div>
            </div>
            {reservations.length === 0 ? (
              <div className="res-list"><div className="res-empty">Henüz bir masan yok. <em>Sessiz bir köşe seni bekliyor.</em></div></div>
            ) : (
              <div className="res-list">
                {reservations.map((r) => (
                  <div className="res" key={r.id}>
                    <div>
                      <div className="res-name">Masa {r.deskId}</div>
                      <div className="res-meta">{r.day} · {fmt(r.from)}–{fmt(r.to)} · {r.floor}</div>
                    </div>
                    <div className="res-actions">
                      {confirmCancel === r.id ? (
                        <>
                          <button className="btn ghost" onClick={() => setConfirmCancel(null)}>Vazgeç</button>
                          <button className="btn ghost" style={{ color: 'var(--danger)' }} onClick={() => cancel(r.id)}>İptal et</button>
                        </>
                      ) : (
                        <button className="btn ghost" onClick={() => setConfirmCancel(r.id)}>İptal</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}

function FragmentRow({ row, children }) {
  return (
    <>
      {children}
      {row === 0 && <div className="table" aria-hidden="true" />}
    </>
  );
}

function Seat({ desk, status, selected, dim, showFlag, onClick }) {
  const flagged = showFlag && desk.flagged && status === 'busy';
  const label = `Masa ${desk.id}, ${STATUS[status].word}${desk.outlet ? ', prizli' : ''}${desk.window ? ', pencere kenarı' : ''}${flagged ? ', eşya bırakılmış olabilir' : ''}`;
  return (
    <button className={`seat ${status} ${dim ? 'dim' : ''} ${flagged ? 'flagged' : ''}`} aria-pressed={selected} aria-label={label} title={label} onClick={onClick}>
      {status === 'free' && <span className="dot" />}
      {status === 'busy' && <I.person size={14} />}
      {status === 'reserved' && <I.clock size={14} />}
      {status === 'mine' && <I.check size={14} />}
      {status === 'free' && <span>{desk.id.split('-')[1]}</span>}
      {desk.outlet && <span className="plug"><I.plug size={10} /></span>}
      {flagged && <span className="flag"><I.bag size={10} /></span>}
    </button>
  );
}

function DeskDetail({ desk, hour, statusAt, range, error, success, reported, onReport, onPick, onReserve, onClose }) {
  const fl = FLOORS.find((f) => f.id === desk.floor);
  const st = statusAt(desk, hour);
  const title = desk.room ? `Oda ${desk.id.replace('G-', 'G')}` : `Masa ${desk.id}`;
  const feats = desk.room
    ? [[I.people, 'Kapasite', `${desk.seats} kişi`, true], [I.plug, 'Priz', 'Var', true], [I.screen, 'Ekran', desk.screen ? 'Var' : 'Yok', desk.screen], [I.window, 'Pencere', desk.window ? 'Var' : 'Yok', desk.window]]
    : [[I.plug, 'Priz', desk.outlet ? 'Var' : 'Yok', desk.outlet], [I.window, 'Pencere kenarı', desk.window ? 'Evet' : 'Hayır', desk.window], [I.lamp, 'Masa lambası', desk.lamp ? 'Var' : 'Yok', desk.lamp]];
  const flagged = desk.flagged && hour === NOW && st === 'busy';

  return (
    <>
      <section className="pane-sec">
        <div className="desk-head">
          <div>
            <div className="eyebrow">{fl.name}{desk.island ? ` · ${desk.island} masaları` : ''}</div>
            <h2 className="desk-title">{title}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Detayı kapat"><I.close /></button>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className={`chip ${STATUS[st].chip}`}><span className="d" />{STATUS[st].word}</span>
          <span className="hint">{fmt(hour)}–{fmt(hour + 1)} için</span>
        </div>
        <div className="feats">
          {feats.map(([Ic, k, v, yes]) => (
            <div className="feat" key={k}><span className="ic"><Ic /></span><span>{k}</span><span className={`v ${yes ? '' : 'no'}`}>{v}</span></div>
          ))}
        </div>
      </section>

      {(flagged || st === 'busy') && hour === NOW && (
        <section className="pane-sec">
          {reported ? (
            <div className="note">
              <div className="head"><span className="chip flag"><I.check size={12} />Bildirildi</span></div>
              <p>Görevli 10 dakika içinde bakacak. Masanın sahibi dönmezse masa boşa çıkar ve sana haber veririz.</p>
            </div>
          ) : (
            <div className="note">
              <div className="head">
                {flagged ? <span className="chip flag"><I.bag size={12} />{desk.flagged.minutes} dk'dır kimse yok</span> : <span className="sec-title">Masada kimse yok mu?</span>}
              </div>
              <p>{flagged ? `${desk.flagged.reports} kişi masada sadece eşya olduğunu bildirdi.` : 'Masaya çanta bırakılıp gidildiyse görevliye haber ver.'}</p>
              <div className="actions"><button className="btn ghost" onClick={onReport}><I.bag />Eşya bırakılmış, bildir</button></div>
            </div>
          )}
        </section>
      )}

      <section className="pane-sec">
        <div>
          <div className="sec-title">Bugünkü uygunluk</div>
          <div className="sec-sub">Başlangıç ve bitiş saatine dokun. En fazla {MAX_HOURS} saat.</div>
        </div>
        <div>
          <div className="timeline" role="group" aria-label="Saat aralığı">
            {HOURS.map((h) => {
              const s = statusAt(desk, h);
              const sel = range && h >= range.from && h < range.to;
              const past = h < NOW;
              return (
                <button key={h} className={`slot ${s} ${past ? 'past' : ''} ${sel ? 'sel' : ''}`} onClick={() => onPick(h)}
                  disabled={past || s !== 'free'} aria-pressed={!!sel}
                  aria-label={`${fmt(h)}–${fmt(h + 1)}, ${past ? 'geçti' : STATUS[s].word}`} title={`${fmt(h)}–${fmt(h + 1)} · ${past ? 'geçti' : STATUS[s].word}`} />
              );
            })}
          </div>
          <div className="tl-axis" aria-hidden="true" style={{ marginTop: 6 }}>
            {HOURS.map((h) => <span key={h}>{String(h).padStart(2, '0')}</span>)}
          </div>
        </div>
        <div className="tl-legend">
          <span><i style={{ background: 'var(--panel)', border: '1px solid var(--field-line)' }} />Boş</span>
          <span><i style={{ background: 'var(--bar-soft)' }} />Dolu</span>
          <span><i style={{ background: 'var(--bar)' }} />Rezerve</span>
          <span><i style={{ background: 'var(--accent-tint)', border: '1px solid var(--accent)' }} />Seçimin</span>
        </div>

        {success ? (
          <div className="success" role="status">
            <span className="big">Masa senin.</span>
            <p>Masa {success.deskId} · bugün {fmt(success.from)}–{fmt(success.to)}. Kapıdaki okuyucuya kartını en geç {String(success.from).padStart(2, '0')}:15'te okut.</p>
          </div>
        ) : (
          <>
            {range ? (
              <div className="summary">
                <span className="range">{fmt(range.from)}–{fmt(range.to)}</span>
                <span className="len">{range.to - range.from} saat · bugün</span>
              </div>
            ) : (
              <div className="hint">{HOURS.some((h) => h >= NOW && statusAt(desk, h) === 'free') ? 'Henüz saat seçmedin.' : 'Bu masa bugün kapanışa kadar dolu. Plandan başka bir masa seç.'}</div>
            )}
            {error && <div className="error" role="alert"><I.alert size={14} /><span>{error}</span></div>}
            <div className="actions">
              <button className="btn primary full" disabled={!range} onClick={onReserve}>
                {range ? `${title} · ${fmt(range.from)}–${fmt(range.to)} rezerve et` : 'Rezerve et'}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
