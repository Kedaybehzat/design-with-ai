// Atölye iskeleti: bu dosyayı değiştirmenize gerek yok.
// Her tur kendi klasöründe: round-1/App.jsx, round-2/App.jsx, round-3/App.jsx.
// Hangi turun açılacağını adres belirler: http://localhost:5173/?round=2
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rounds = import.meta.glob('../round-*/App.jsx');
const params = new URLSearchParams(location.search);
const round = params.get('round');
// ?theme=light veya ?theme=dark ile açılış teması zorlanabilir (ekran görüntüsü için).
if (params.get('theme')) document.documentElement.dataset.theme = params.get('theme');
const root = createRoot(document.getElementById('root'));

function Index() {
  const items = [1, 2, 3].map((n) => ({ n, ready: Boolean(rounds[`../round-${n}/App.jsx`]) }));
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '96px auto', padding: 24, color: '#e8e8e8' }}>
      <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 8px' }}>Design with AI</h1>
      <p style={{ color: '#a6a6a6', margin: '0 0 32px' }}>Bir tur seçin. Her tur ayrı açılır, stilleri birbirine karışmaz.</p>
      {items.map(({ n, ready }) => (
        <p key={n} style={{ margin: '0 0 12px', fontSize: 17 }}>
          {ready ? <a href={`?round=${n}`} style={{ color: '#7ab8ff' }}>Tur {n}</a> : <span style={{ color: '#8f8f8f' }}>Tur {n}: henüz round-{n}/App.jsx yok</span>}
        </p>
      ))}
    </main>
  );
}

const load = rounds[`../round-${round}/App.jsx`];
if (load) {
  load().then(({ default: App }) => root.render(<StrictMode><App /></StrictMode>));
} else {
  document.body.style.background = '#141414';
  root.render(<Index />);
}
