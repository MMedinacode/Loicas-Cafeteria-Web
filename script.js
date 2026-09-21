/* ============================================================
   LOICA'S CAFETERÍA — datos y lógica
   ============================================================
   ⚠️ SIN PRECIOS A PROPÓSITO. El local no publica carta con precios.
   Una reseña menciona un rango de $1.500 a $8.000, pero es la
   apreciación de un cliente, NO una lista oficial: se cita como tal en
   la pestaña Carta y los productos van sin precio.

   Los productos listados están CONFIRMADOS por sus fotos de Instagram y
   por nuestras reseñas de Google. Ninguno inventado. Tienen un PDF de
   carta en su bio de Instagram — pedirlo para cargarla completa.
   ============================================================ */

/* ⚠️ DE DÓNDE SALEN ESTOS PRECIOS, Y LA DUDA QUE QUEDA — 21-09-2026
   La bio de @loicascafeteria enlaza "Carta Loica's 2025.pdf" en Drive, 8
   páginas. El PDF trae su texto dentro del árbol de accesibilidad, así que
   los precios se leyeron COMO TEXTO, no a ojo sobre una foto, y además se
   revisó página por página en el visor.

   LA DUDA: hay una segunda "Loica's Cafetería" en LITUECHE (San Antonio 1,
   teléfono 9 4053 4565), y dos directorios (carta.menu, cafeteriass.cl)
   asocian @loicascafeteria a esa, no a la de Maipú de esta página.

   POR QUÉ SE PUBLICA IGUAL: el horario que ellos mismos declaran en la bio
   —lunes a jueves de 14:00 a 20:00— calza exacto con la ficha de Google de
   MAIPÚ (abre 14:00, cierra 20:00). Litueche publica 12:00 a 20:00. Abrir
   a las dos de la tarde es raro y es el mismo dato. La bio es fuente propia;
   los directorios son scrapers.

   AUN ASÍ, CONFIRMARLO CON ELLOS antes de dar la carta por buena. Y el PDF
   se llama "2025": conviene preguntar si los precios siguen vigentes. Las
   dos preguntas caben en el primer mensaje.

   Helados, Fajitas y Empanadas están en su carta y no se alcanzaron a leer
   los nombres: quedan fuera antes que inventarlos. */
const MENU = {
  cafeteros: {
    label: 'Cafeteros',
    items: [
      { n:'Espresso',            p:2000 },
      { n:'Americano',           p:2500 },
      { n:'Capuccino',           p:3000 },
      { n:'Capuccino sabor',     p:3500, d:'Consulta por los sabores disponibles' },
      { n:'Latte',               p:3500, d:'"El café es perfecto", dice una de nuestras reseñas', img:'fotos/mesa-redvelvet-matcha.jpg' },
      { n:'Latte sabor',         p:3800, d:'Consulta por los sabores disponibles' },
      { n:'Mocaccino',           p:4000 },
      { n:'Chocolate caliente',  p:4200 },
      { n:'Matcha',              p:4000, d:'Con arte en la espuma' },
    ]
  },
  frias: {
    label: 'Bebidas frías',
    items: [
      { n:'Affogato',        p:3500 },
      { n:'Iced Americano',  p:2800 },
      { n:'Iced Latte',      p:3800 },
      { n:'Iced Matcha',     p:4300 },
      { n:'Café helado',     p:4000 },
      { n:'Frappé',          p:4000 },
      { n:'Milkshake',       p:4200 },
    ]
  },
  te: {
    label: 'Té de hojas',
    items: [
      { n:'Té individual',              p:1700, d:'Hojas de té de la zona central y del sur de Chile' },
      { n:'Té helado',                  p:2000 },
      { n:'Tetera inglesa para dos',    p:2800 },
      { n:'Tetera inglesa para tres',   p:3800 },
      { n:'Tetera inglesa para cuatro', p:5000 },
    ]
  },
  refrescos: {
    label: 'Limonadas y jugos',
    items: [
      { n:'Limonada simple',          p:2500 },
      { n:'Limonada menta jengibre',  p:3000 },
      { n:"Limonada loica's",         p:3000, d:'La de la casa' },
      { n:'Limonada blue',            p:2800 },
      { n:'Jugo natural',             p:2300 },
      { n:'Batidos',                  p:3200 },
      { n:'Bebida embotellada',       p:1500 },
      { n:'Agua mineral',             p:1200 },
    ]
  },
  waffles: {
    label: 'Waffles y postres',
    items: [
      { n:'Waffle con un bocado de helado',  p:4000, d:'Con crema batida y salsa a elección' },
      { n:'Waffle con dos bocados de helado', p:4500, d:'Con crema batida y salsa a elección' },
      { n:'Volcán de chocolate',             p:4000, d:'Acompañado de un bocado de helado a elección y crema' },
    ]
  },
  dulce: {
    label: 'Masitas y tortas',
    items: [
      { n:'Tronquitos de chocolate', p:1500 },
      { n:'Muffin',                  p:1500 },
      { n:'Brownie',                 p:1500 },
      { n:'Trencita',                p:1500 },
      { n:'Donas',                   p:2000 },
      { n:'Cuchufli',                p:2500 },
      { n:'Trozo de torta',          p:3700, d:'"Torta" es de las palabras más repetidas en nuestras reseñas' },
      { n:'Trozo de cheesecake',     p:3700 },
      { n:'Trozo de pie',            p:3700 },
    ]
  },
  salado: {
    label: 'Para comer',
    items: [
      { n:'Sándwich ave palta', p:3700, d:'Carne de pollo especialmente sazonada y palta hass' },
      { n:'Hamburguesa casera', p:5500, d:'225 grs de carne de vacuno, con dos ingredientes a elección' },
    ]
  }
};

/* ---------- RENDER DE LA CARTA ---------- */
const tabsEl   = document.getElementById('menuTabs');
const panelsEl = document.getElementById('menuPanels');

Object.keys(MENU).forEach((key, i) => {
  const tab = document.createElement('button');
  tab.className = 'menu-tab' + (i === 0 ? ' active' : '');
  tab.type = 'button';
  tab.textContent = MENU[key].label;
  tab.dataset.key = key;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  tab.addEventListener('click', () => showTab(key));
  tabsEl.appendChild(tab);

  const panel = document.createElement('div');
  panel.className = 'menu-panel' + (i === 0 ? ' active' : '');
  panel.id = 'panel-' + key;

  const grid = document.createElement('div');
  grid.className = 'menu-grid';

  MENU[key].items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'menu-item reveal';

    if (item.img) {
      const foto = document.createElement('div');
      const im = document.createElement('img');
      im.src = item.img; im.alt = item.n; im.loading = 'lazy';
      im.style.cssText = 'width:58px;height:58px;object-fit:cover;border-radius:12px;';
      foto.appendChild(im);
      row.appendChild(foto);
    }

    const texto = document.createElement('div');
    texto.className = 'menu-item-text';
    const nombre = document.createElement('span');
    nombre.className = 'name';
    nombre.textContent = item.n;
    texto.appendChild(nombre);

    if (item.d) {
      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = item.d;
      texto.appendChild(desc);
    }

    /* Los precios salen del PDF que ellos mismos enlazan desde su bio de
       Instagram ("Carta Loica's 2025.pdf"). Si un producto no lo trae,
       sigue diciendo "Consultar": nunca un monto inventado. */
    const precio = document.createElement('div');
    precio.className = 'price';
    precio.textContent = item.p
      ? '$' + item.p.toLocaleString('es-CL')
      : 'Consultar';

    row.appendChild(texto);
    row.appendChild(precio);
    grid.appendChild(row);
  });

  panel.appendChild(grid);
  panelsEl.appendChild(panel);
});

function showTab(key) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    const activo = t.dataset.key === key;
    t.classList.toggle('active', activo);
    t.setAttribute('aria-selected', activo ? 'true' : 'false');
  });
  document.querySelectorAll('.menu-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'panel-' + key);
  });
  initScrollReveal();
}

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */
const navLinks = document.getElementById('navLinks');

function goToTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.tabPanel === tabId);
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === tabId);
  });
  navLinks.classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initScrollReveal();
}

document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); goToTab(el.dataset.tab); });
});

document.getElementById('navToggle').addEventListener('click', function () {
  const abierto = navLinks.classList.toggle('open');
  this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

/* ---------- INDICADOR ABIERTO / CERRADO ----------
   Horario CONFIRMADO en la bio de su Instagram (@loicascafeteria):
   Lunes a jueves 14:00–20:00 · Viernes a domingo 14:00–21:00. */
function horarioDeHoy() {
  const dia = new Date().getDay();               // 0=domingo … 6=sábado
  if (dia === 0 || dia === 5 || dia === 6) return [14 * 60, 21 * 60]; // vie, sáb, dom
  return [14 * 60, 20 * 60];                     // lunes a jueves
}

function actualizarEstado(dotId, textId) {
  const dot  = document.getElementById(dotId);
  const text = document.getElementById(textId);
  if (!dot || !text) return;
  const ahora   = new Date();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const h       = horarioDeHoy();
  const abierto = minutos >= h[0] && minutos < h[1];
  text.textContent = abierto ? 'Abierto ahora' : 'Cerrado ahora';
  dot.classList.toggle('closed', !abierto);
}

actualizarEstado('statusDot', 'statusText');
actualizarEstado('statusDot2', 'statusText2');
actualizarEstado('statusDot3', 'statusText3');

/* ---------- SCROLL REVEAL (con red de seguridad) ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal:not(.in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 6) * 55) + 'ms';
    io.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
  }, 1200);
}
initScrollReveal();

/* ---------- PANTALLA DE CARGA ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 320);
});

// Marca en la lista de horario el día de hoy. La lista es estática en el
// HTML a propósito: si el JS falla, el horario igual se lee.
function marcarDiaDeHoy() {
  const hoy = new Date().getDay();
  document.querySelectorAll('.horario-semana li[data-dia]').forEach(function (li) {
    li.classList.toggle('hs-hoy', Number(li.dataset.dia) === hoy);
  });
}
marcarDiaDeHoy();
