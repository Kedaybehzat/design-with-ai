import { useMemo, useState } from 'react';

const FLOORS = ['Zemin Kat', '1. Kat', '2. Kat', '3. Kat (Sessiz)'];
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

// Örnek masa verisi: her kat için 12 masa, rastgele dolu saatler
function createDesks() {
  const desks = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  FLOORS.forEach((floor, fi) => {
    for (let i = 1; i <= 12; i++) {
      const booked = SLOTS.filter(() => rand() < 0.35);
      desks.push({
        id: `${fi}-${i}`,
        name: `${String.fromCharCode(65 + fi)}${String(i).padStart(2, '0')}`,
        floor,
        seats: rand() < 0.25 ? 4 : 1,
        outlet: rand() < 0.7,
        window: i % 4 === 0 || i % 4 === 1,
        quiet: fi === 3,
        booked,
      });
    }
  });
  return desks;
}

const styles = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  .lib-app {
    min-height: 100vh;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #f4f6fb;
    color: #1f2937;
  }
  .lib-header {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    padding: 28px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }
  .lib-header h1 { margin: 0; font-size: 26px; }
  .lib-header p { margin: 4px 0 0; opacity: 0.85; font-size: 14px; }
  .lib-stats { display: flex; gap: 12px; }
  .lib-stat {
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 10px 16px;
    text-align: center;
    min-width: 96px;
  }
  .lib-stat strong { display: block; font-size: 22px; }
  .lib-stat span { font-size: 12px; opacity: 0.85; }
  .lib-tabs { display: flex; gap: 8px; padding: 16px 32px 0; }
  .lib-tab {
    border: none;
    background: transparent;
    padding: 10px 18px;
    border-radius: 10px 10px 0 0;
    font-size: 15px;
    cursor: pointer;
    color: #6b7280;
    font-weight: 500;
  }
  .lib-tab.active { background: white; color: #4f46e5; box-shadow: 0 -2px 8px rgba(0,0,0,0.04); }
  .lib-main { padding: 0 32px 40px; }
  .lib-panel {
    background: white;
    border-radius: 0 16px 16px 16px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  .lib-filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }
  .lib-field label { display: block; font-size: 13px; color: #6b7280; margin-bottom: 6px; font-weight: 500; }
  .lib-field select, .lib-field input[type="date"], .lib-field input[type="text"] {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    background: #f9fafb;
  }
  .lib-checks { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px; }
  .lib-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
  }
  .lib-chip.on { background: #eef2ff; border-color: #6366f1; color: #4338ca; }
  .lib-chip input { display: none; }
  .lib-legend { display: flex; gap: 16px; font-size: 13px; color: #6b7280; margin-bottom: 16px; }
  .lib-legend i { display: inline-block; width: 12px; height: 12px; border-radius: 4px; margin-right: 6px; vertical-align: -1px; }
  .lib-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 16px;
  }
  .lib-desk {
    border-radius: 14px;
    padding: 16px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    text-align: center;
  }
  .lib-desk:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
  .lib-desk.free { background: #ecfdf5; border-color: #a7f3d0; }
  .lib-desk.busy { background: #fef2f2; border-color: #fecaca; cursor: not-allowed; opacity: 0.75; }
  .lib-desk.mine { background: #eef2ff; border-color: #a5b4fc; }
  .lib-desk h3 { margin: 4px 0; font-size: 20px; }
  .lib-desk .icon { font-size: 28px; }
  .lib-desk .meta { font-size: 12px; color: #6b7280; margin-top: 6px; }
  .lib-desk .badge {
    display: inline-block;
    margin-top: 10px;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
  }
  .free .badge { background: #10b981; color: white; }
  .busy .badge { background: #ef4444; color: white; }
  .mine .badge { background: #6366f1; color: white; }
  .lib-empty { text-align: center; padding: 48px; color: #9ca3af; }
  .lib-modal-bg {
    position: fixed; inset: 0;
    background: rgba(17,24,39,0.5);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    z-index: 10;
  }
  .lib-modal {
    background: white;
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  }
  .lib-modal h2 { margin: 0 0 4px; }
  .lib-modal .sub { color: #6b7280; font-size: 14px; margin-bottom: 20px; }
  .lib-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 8px 0 20px; }
  .lib-slot {
    padding: 8px 0;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
    font-size: 13px;
    cursor: pointer;
  }
  .lib-slot.sel { background: #4f46e5; color: white; border-color: #4f46e5; }
  .lib-slot:disabled { background: #f3f4f6; color: #d1d5db; text-decoration: line-through; cursor: not-allowed; }
  .lib-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
  .lib-btn {
    padding: 11px 20px;
    border-radius: 10px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .lib-btn.primary { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; }
  .lib-btn.primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .lib-btn.ghost { background: #f3f4f6; color: #374151; }
  .lib-btn.danger { background: #fee2e2; color: #b91c1c; }
  .lib-res {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 12px;
    gap: 12px; flex-wrap: wrap;
  }
  .lib-res h4 { margin: 0 0 4px; }
  .lib-res span { color: #6b7280; font-size: 14px; }
  .lib-toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #111827; color: white; padding: 12px 20px; border-radius: 12px;
    font-size: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 20;
  }
  @media (max-width: 600px) {
    .lib-header, .lib-main, .lib-tabs { padding-left: 16px; padding-right: 16px; }
    .lib-slots { grid-template-columns: repeat(3, 1fr); }
  }
`;

export default function App() {
  const [desks, setDesks] = useState(createDesks);
  const [tab, setTab] = useState('find');
  const [floor, setFloor] = useState('Tümü');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('10:00');
  const [needOutlet, setNeedOutlet] = useState(false);
  const [needWindow, setNeedWindow] = useState(false);
  const [needGroup, setNeedGroup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [chosenSlots, setChosenSlots] = useState([]);
  const [studentNo, setStudentNo] = useState('');
  const [reservations, setReservations] = useState([]);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const filtered = useMemo(
    () =>
      desks.filter(
        (d) =>
          (floor === 'Tümü' || d.floor === floor) &&
          (!needOutlet || d.outlet) &&
          (!needWindow || d.window) &&
          (!needGroup || d.seats > 1)
      ),
    [desks, floor, needOutlet, needWindow, needGroup]
  );

  const isMine = (desk) => reservations.some((r) => r.deskId === desk.id && r.slots.includes(time));
  const freeCount = filtered.filter((d) => !d.booked.includes(time)).length;

  const openDesk = (desk) => {
    if (desk.booked.includes(time) && !isMine(desk)) return;
    setSelected(desk);
    setChosenSlots(desk.booked.includes(time) ? [] : [time]);
  };

  const toggleSlot = (slot) => {
    setChosenSlots((prev) => (prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot].sort()));
  };

  const confirm = () => {
    if (!chosenSlots.length || !studentNo.trim()) return;
    setDesks((prev) =>
      prev.map((d) => (d.id === selected.id ? { ...d, booked: [...d.booked, ...chosenSlots] } : d))
    );
    setReservations((prev) => [
      ...prev,
      { id: Date.now(), deskId: selected.id, deskName: selected.name, floor: selected.floor, date, slots: chosenSlots },
    ]);
    showToast(`✅ ${selected.name} masası rezerve edildi!`);
    setSelected(null);
  };

  const cancel = (res) => {
    setDesks((prev) =>
      prev.map((d) => (d.id === res.deskId ? { ...d, booked: d.booked.filter((s) => !res.slots.includes(s)) } : d))
    );
    setReservations((prev) => prev.filter((r) => r.id !== res.id));
    showToast('Rezervasyon iptal edildi.');
  };

  return (
    <div className="lib-app">
      <style>{styles}</style>

      <header className="lib-header">
        <div>
          <h1>📚 KütüphaneMasa</h1>
          <p>Üniversite kütüphanesinde boş masanı bul, saniyeler içinde rezerve et.</p>
        </div>
        <div className="lib-stats">
          <div className="lib-stat">
            <strong>{freeCount}</strong>
            <span>Boş masa</span>
          </div>
          <div className="lib-stat">
            <strong>{filtered.length - freeCount}</strong>
            <span>Dolu masa</span>
          </div>
          <div className="lib-stat">
            <strong>{reservations.length}</strong>
            <span>Rezervasyonum</span>
          </div>
        </div>
      </header>

      <nav className="lib-tabs">
        <button className={`lib-tab ${tab === 'find' ? 'active' : ''}`} onClick={() => setTab('find')}>
          🔍 Masa Bul
        </button>
        <button className={`lib-tab ${tab === 'mine' ? 'active' : ''}`} onClick={() => setTab('mine')}>
          🗓️ Rezervasyonlarım ({reservations.length})
        </button>
      </nav>

      <main className="lib-main">
        <section className="lib-panel">
          {tab === 'find' ? (
            <>
              <div className="lib-filters">
                <div className="lib-field">
                  <label>Kat</label>
                  <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                    <option>Tümü</option>
                    {FLOORS.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div className="lib-field">
                  <label>Tarih</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="lib-field">
                  <label>Saat</label>
                  <select value={time} onChange={(e) => setTime(e.target.value)}>
                    {SLOTS.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="lib-checks">
                <label className={`lib-chip ${needOutlet ? 'on' : ''}`}>
                  <input type="checkbox" checked={needOutlet} onChange={(e) => setNeedOutlet(e.target.checked)} />
                  🔌 Priz var
                </label>
                <label className={`lib-chip ${needWindow ? 'on' : ''}`}>
                  <input type="checkbox" checked={needWindow} onChange={(e) => setNeedWindow(e.target.checked)} />
                  🪟 Cam kenarı
                </label>
                <label className={`lib-chip ${needGroup ? 'on' : ''}`}>
                  <input type="checkbox" checked={needGroup} onChange={(e) => setNeedGroup(e.target.checked)} />
                  👥 Grup masası
                </label>
              </div>

              <div className="lib-legend">
                <span><i style={{ background: '#10b981' }} />Boş</span>
                <span><i style={{ background: '#ef4444' }} />Dolu</span>
                <span><i style={{ background: '#6366f1' }} />Benim</span>
              </div>

              {filtered.length === 0 ? (
                <div className="lib-empty">Bu filtrelere uygun masa bulunamadı 😕</div>
              ) : (
                <div className="lib-grid">
                  {filtered.map((desk) => {
                    const mine = isMine(desk);
                    const busy = desk.booked.includes(time) && !mine;
                    const status = mine ? 'mine' : busy ? 'busy' : 'free';
                    return (
                      <div key={desk.id} className={`lib-desk ${status}`} onClick={() => openDesk(desk)}>
                        <div className="icon">{desk.seats > 1 ? '👥' : '🪑'}</div>
                        <h3>{desk.name}</h3>
                        <div className="meta">{desk.floor}</div>
                        <div className="meta">
                          {desk.outlet && '🔌 '}
                          {desk.window && '🪟 '}
                          {desk.quiet && '🤫 '}
                          {desk.seats} kişilik
                        </div>
                        <span className="badge">{mine ? 'Senin' : busy ? 'Dolu' : 'Boş'}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : reservations.length === 0 ? (
            <div className="lib-empty">
              Henüz rezervasyonun yok. <br />
              <button className="lib-btn primary" style={{ marginTop: 16 }} onClick={() => setTab('find')}>
                Masa Bul
              </button>
            </div>
          ) : (
            reservations.map((r) => (
              <div key={r.id} className="lib-res">
                <div>
                  <h4>🪑 Masa {r.deskName} · {r.floor}</h4>
                  <span>
                    📅 {new Date(r.date).toLocaleDateString('tr-TR')} · ⏰ {r.slots.join(', ')}
                  </span>
                </div>
                <button className="lib-btn danger" onClick={() => cancel(r)}>
                  İptal Et
                </button>
              </div>
            ))
          )}
        </section>
      </main>

      {selected && (
        <div className="lib-modal-bg" onClick={() => setSelected(null)}>
          <div className="lib-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Masa {selected.name}</h2>
            <div className="sub">
              {selected.floor} · {selected.seats} kişilik · {new Date(date).toLocaleDateString('tr-TR')}
            </div>

            <div className="lib-field">
              <label>Saat aralıkları seç</label>
            </div>
            <div className="lib-slots">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  className={`lib-slot ${chosenSlots.includes(s) ? 'sel' : ''}`}
                  disabled={selected.booked.includes(s)}
                  onClick={() => toggleSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="lib-field" style={{ marginBottom: 16 }}>
              <label>Öğrenci numarası</label>
              <input
                type="text"
                placeholder="ör. B201200001"
                value={studentNo}
                onChange={(e) => setStudentNo(e.target.value)}
              />
            </div>

            <div className="lib-actions">
              <button className="lib-btn ghost" onClick={() => setSelected(null)}>
                Vazgeç
              </button>
              <button
                className="lib-btn primary"
                disabled={!chosenSlots.length || !studentNo.trim()}
                onClick={confirm}
              >
                Rezerve Et ({chosenSlots.length} saat)
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="lib-toast">{toast}</div>}
    </div>
  );
}
