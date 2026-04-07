/* ─── CONFIG ──────────────────────────────── */
    const WIKI_REST = 'https://fr.wikipedia.org/api/rest_v1';
    const WIKI_API = 'https://fr.wikipedia.org/w/api.php';

  const PAIRS = [
    // ── Originaux ──────────────────────────────────────────────────────
    { start: 'Napoléon Bonaparte', end: 'Internet',              min: 3, path: ['Napoléon Bonaparte', 'France', 'Internet'] },
    { start: 'Tour Eiffel',        end: 'Dinosaure',             min: 3, path: ['Tour Eiffel', 'Paris', 'Muséum national d\'histoire naturelle', 'Dinosaure'] },
    { start: 'Albert Einstein',    end: 'Football',              min: 2, path: ['Albert Einstein', 'Allemagne', 'Football'] },
    { start: 'Paris',              end: 'Sushi',                 min: 2, path: ['Paris', 'Japon', 'Sushi'] },
    { start: 'Chocolat',           end: 'Guerre froide',         min: 3, path: ['Chocolat', 'États-Unis', 'Union soviétique', 'Guerre froide'] },
    { start: 'Marie Curie',        end: 'Jazz',                  min: 3, path: ['Marie Curie', 'États-Unis', 'La Nouvelle-Orléans', 'Jazz'] },
    { start: 'Chat',               end: 'Révolution française',  min: 2, path: ['Chat', 'France', 'Révolution française'] },
    { start: 'Égypte antique',     end: 'Station spatiale internationale', min: 3, path: ['Égypte antique', 'Terre', 'Orbite terrestre basse', 'Station spatiale internationale'] },
    { start: 'William Shakespeare',end: 'Atome',                 min: 3, path: ['William Shakespeare', 'Londres', 'Royal Society', 'Atome'] },
    { start: 'Jules Verne',        end: 'ADN',                   min: 3, path: ['Jules Verne', 'Science', 'Biologie', 'ADN'] },
    { start: 'Château de Versailles', end: 'Calcul infinitésimal', min: 3, path: ['Château de Versailles', 'France', 'Mathématiques', 'Calcul infinitésimal'] },
    { start: 'Léonard de Vinci',   end: 'Volcan',                min: 3, path: ['Léonard de Vinci', 'Italie', 'Mont Vésuve', 'Volcan'] },

    // ── Histoire ───────────────────────────────────────────────────────
    { start: 'Cléopâtre',          end: 'Rome antique',          min: 2, path: ['Cléopâtre', 'Égypte antique', 'Rome antique'] },
    { start: 'Charlemagne',        end: 'Pape',                  min: 2, path: ['Charlemagne', 'Saint-Empire romain germanique', 'Pape'] },
    { start: 'Alexandre le Grand', end: 'Philosophie',           min: 2, path: ['Alexandre le Grand', 'Grèce antique', 'Philosophie'] },
    { start: 'Christophe Colomb',  end: 'Chocolat',              min: 2, path: ['Christophe Colomb', 'Amérique', 'Chocolat'] },
    { start: 'Jeanne d\'Arc',      end: 'Angleterre',            min: 2, path: ['Jeanne d\'Arc', 'Guerre de Cent Ans', 'Angleterre'] },
    { start: 'Louis XIV',          end: 'Ballet',                min: 2, path: ['Louis XIV', 'France', 'Ballet'] },
    { start: 'Gengis Khan',        end: 'Soie',                  min: 2, path: ['Gengis Khan', 'Chine', 'Route de la soie'] },
    { start: 'Jules César',        end: 'Gladiateur',            min: 2, path: ['Jules César', 'Rome antique', 'Gladiateur'] },
    { start: 'Aztèques',           end: 'Espagne',               min: 2, path: ['Aztèques', 'Mexique', 'Espagne'] },
    { start: 'Seconde Guerre mondiale', end: 'Atome',            min: 2, path: ['Seconde Guerre mondiale', 'Bombe atomique', 'Atome'] },

    // ── Sciences & Nature ──────────────────────────────────────────────
    { start: 'Lune',               end: 'Marée',                 min: 2, path: ['Lune', 'Océan', 'Marée'] },
    { start: 'Trou noir',          end: 'Albert Einstein',       min: 2, path: ['Trou noir', 'Relativité générale', 'Albert Einstein'] },
    { start: 'Charles Darwin',     end: 'Galápagos',             min: 2, path: ['Charles Darwin', 'Sélection naturelle', 'Îles Galápagos'] },
    { start: 'Atome',              end: 'Bombe atomique',        min: 2, path: ['Atome', 'Fission nucléaire', 'Bombe atomique'] },
    { start: 'Volcan',             end: 'Café',                  min: 2, path: ['Volcan', 'Éthiopie', 'Café'] },
    { start: 'Requin',             end: 'Australie',             min: 2, path: ['Requin', 'Océan Indien', 'Australie'] },
    { start: 'Baleine',            end: 'Japon',                 min: 2, path: ['Baleine', 'Chasse à la baleine', 'Japon'] },
    { start: 'Éléphant',           end: 'Bouddhisme',            min: 2, path: ['Éléphant', 'Inde', 'Bouddhisme'] },
    { start: 'ADN',                end: 'Crime',                 min: 2, path: ['ADN', 'Génétique judiciaire', 'Crime'] },
    { start: 'Cerveau',            end: 'Intelligence artificielle', min: 2, path: ['Cerveau', 'Neurosciences', 'Intelligence artificielle'] },

    // ── Géographie ─────────────────────────────────────────────────────
    { start: 'Himalaya',           end: 'Bouddhisme',            min: 2, path: ['Himalaya', 'Tibet', 'Bouddhisme'] },
    { start: 'Amazonie',           end: 'Football',              min: 2, path: ['Amazonie', 'Brésil', 'Football'] },
    { start: 'Sahara',             end: 'Islam',                 min: 2, path: ['Sahara', 'Afrique du Nord', 'Islam'] },
    { start: 'Mont Everest',       end: 'Oxygène',               min: 2, path: ['Mont Everest', 'Népal', 'Oxygène'] },
    { start: 'Mer Méditerranée',   end: 'Olive',                 min: 2, path: ['Mer Méditerranée', 'Grèce', 'Olivier'] },

    // ── Culture & Arts ─────────────────────────────────────────────────
    { start: 'Wolfgang Amadeus Mozart', end: 'Opéra',            min: 2, path: ['Wolfgang Amadeus Mozart', 'Vienne', 'Opéra'] },
    { start: 'Ludwig van Beethoven',    end: 'Symphonie',        min: 2, path: ['Ludwig van Beethoven', 'Orchestre', 'Symphonie'] },
    { start: 'Victor Hugo',             end: 'Révolution française', min: 2, path: ['Victor Hugo', 'Paris', 'Révolution française'] },
    { start: 'Molière',                 end: 'Comédie',          min: 2, path: ['Molière', 'Théâtre', 'Comédie'] },
    { start: 'Vincent van Gogh',        end: 'Japon',            min: 2, path: ['Vincent van Gogh', 'Gravure sur bois', 'Japon'] },
    { start: 'Pablo Picasso',           end: 'Guerre civile espagnole', min: 2, path: ['Pablo Picasso', 'Guernica', 'Guerre civile espagnole'] },
    { start: 'Cinéma',                  end: 'Guerre froide',    min: 2, path: ['Cinéma', 'Hollywood', 'Guerre froide'] },

    // ── Gastronomie ────────────────────────────────────────────────────
    { start: 'Vin',                end: 'Grèce antique',         min: 2, path: ['Vin', 'Raisin', 'Grèce antique'] },
    { start: 'Thé',                end: 'Inde',                  min: 2, path: ['Thé', 'Chine', 'Inde'] },
    { start: 'Café',               end: 'Éthiopie',              min: 2, path: ['Café', 'Caféine', 'Éthiopie'] },
    { start: 'Fromage',            end: 'Bactérie',              min: 2, path: ['Fromage', 'Fermentation', 'Bactérie'] },
    { start: 'Pizza',              end: 'Tomate',                min: 2, path: ['Pizza', 'Naples', 'Tomate'] },
    { start: 'Bière',              end: 'Mésopotamie',           min: 2, path: ['Bière', 'Fermentation', 'Mésopotamie'] },

    // ── Sport & Technologie ────────────────────────────────────────────
    { start: 'Jeux olympiques',    end: 'Grèce antique',         min: 2, path: ['Jeux olympiques', 'Athènes', 'Grèce antique'] },
    { start: 'Tour de France',     end: 'Dopage',                min: 2, path: ['Tour de France', 'Cyclisme', 'Dopage'] },
    { start: 'Internet',           end: 'Guerre froide',         min: 2, path: ['Internet', 'ARPANET', 'Guerre froide'] },
    { start: 'Avion',              end: 'Première Guerre mondiale', min: 2, path: ['Avion', 'Frères Wright', 'Première Guerre mondiale'] },
    { start: 'Téléphone',          end: 'Alexander Graham Bell', min: 1, path: ['Téléphone', 'Alexander Graham Bell'] },
    { start: 'Chemin de fer',      end: 'Révolution industrielle', min: 2, path: ['Chemin de fer', 'Locomotive à vapeur', 'Révolution industrielle'] },
  ];

    /* ─── IFRAME CSS ──────────────────────────── */
    function iframeCss(dark) {
      const bg = dark ? '#0c0b11' : '#f7f5f2';
      const text = dark ? '#e6e2da' : '#18161a';
      const sub = dark ? '#a09ca8' : '#46424e';
      const muted = dark ? '#5e5a6e' : '#88848e';
      const bdr = dark ? '#22202e' : '#ccc8be';
      const card = dark ? '#181620' : '#edeae4';
      const link = dark ? '#78a8e8' : '#1a4f8a';
      const scr = dark ? '#22202e #0c0b11' : '#ccc8be #f7f5f2';
      return `
body{background:${bg}!important;color:${text}!important;font-family:'Linux Libertine','Georgia',serif!important;font-size:15.5px!important;line-height:1.75!important;padding:0!important;margin:0!important;min-height:100vh!important}
#content,.mw-body,.mw-body-content,#mw-content-text{background:transparent!important;padding:1.5rem 2rem!important}
h1,h2,h3,h4{color:${text}!important;border-bottom-color:${bdr}!important;font-family:'Linux Libertine','Georgia',serif!important}
h1{font-size:1.95rem!important;font-weight:700!important;margin-bottom:.4rem!important}
h2{font-size:1.3rem!important;margin-top:1.5rem!important;padding-top:.4rem!important}
a{color:${link}!important;text-decoration:none!important;cursor:pointer!important}
a:hover{text-decoration:underline!important}
a.new{color:#b04040!important}
table{background:${card}!important;border-color:${bdr}!important}
th{background:${card}!important;color:${text}!important;border-color:${bdr}!important}
td{color:${sub}!important;border-color:${bdr}!important}
.infobox,.infobox-full{background:${card}!important;border:1px solid ${bdr}!important;color:${sub}!important;float:right!important;margin:0 0 1rem 1.5rem!important;font-size:.84rem!important;max-width:270px!important;clear:right!important}
.infobox caption{color:${text}!important;font-weight:600!important}
.infobox td,.infobox th{background:transparent!important;border-color:${bdr}!important}
.thumb{background:${card}!important;border:1px solid ${bdr}!important}
.thumbcaption{color:${muted}!important;font-size:.8rem!important}
#toc,.toc{background:${card}!important;border:1px solid ${bdr}!important;padding:.6rem 1rem!important;display:inline-block!important}
.toctitle h2,.tocnumber,.toctext,.toc a{color:${muted}!important}
.hatnote{color:${muted}!important;font-style:italic!important;border-left:2px solid ${bdr}!important;padding-left:.75rem!important;margin-bottom:.9rem!important}
blockquote{border-left:2px solid ${bdr}!important;padding-left:.9rem!important;color:${muted}!important}
.mw-editsection,.mw-jump-link,#siteNotice,#siteSub,#contentSub,#contentSub2,.printfooter,#catlinks,#mw-navigation,.noprint,.navbox,.portal,.authority-control,#mw-notification-area{display:none!important}
img{max-width:100%!important;height:auto!important}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${bdr};border-radius:2px}
html{scrollbar-color:${scr};scrollbar-width:thin}
`;
    }

    const INTERCEPT = `
(function(){
  document.addEventListener('click',function(e){
    var el=e.target;
    while(el&&el.tagName!=='A') el=el.parentElement;
    if(!el) return;
    e.preventDefault();e.stopPropagation();
    var href=el.getAttribute('href')||'';
    var title=null;
    if(/^\\.\\//g.test(href)){
      title=decodeURIComponent(href.replace(/^\\.\\//,'').split('#')[0]).replace(/_/g,' ');
    } else if(href.includes('/wiki/')){
      title=decodeURIComponent(href.split('/wiki/').pop().split('#')[0]).replace(/_/g,' ');
    }
    if(!title||title.includes(':')||!title.trim()) return;
    window.parent.postMessage({type:'wiki-nav',title:title.trim()},'*');
  },true);
  document.addEventListener('submit',function(e){e.preventDefault();},true);

  var hoverTimer = null;
  document.addEventListener('mouseover', function(e){
    var el=e.target;
    while(el&&el.tagName!=='A') el=el.parentElement;
    if(!el) return;
    var href=el.getAttribute('href')||'';
    var title=null;
    if(/^\\.\\//g.test(href)){
      title=decodeURIComponent(href.replace(/^\\.\\//,'').split('#')[0]).replace(/_/g,' ');
    } else if(href.includes('/wiki/')){
      title=decodeURIComponent(href.split('/wiki/').pop().split('#')[0]).replace(/_/g,' ');
    }
    if(!title||title.includes(':')||!title.trim()) return;
    
    hoverTimer = setTimeout(function(){
      window.parent.postMessage({type:'wiki-hover', title:title.trim()},'*');
    }, 600);
  },true);

  document.addEventListener('mouseout', function(e){
    clearTimeout(hoverTimer);
    var el=e.target;
    while(el&&el.tagName!=='A') el=el.parentElement;
    if(el) window.parent.postMessage({type:'wiki-unhover'},'*');
  },true);
})();
`;

    /* ─── STATE ───────────────────────────────── */
  let S = { mode:'chill', pair:null, path:[], targetCats:[], seconds:0, timer:null, busy:false, sel:{start:null,end:null}, penalty:0 };
  let dbt = {start:null,end:null};
  let sidx = {start:-1,end:-1};

  function getDailyPair() {
    const d = new Date();
    // Seed basé sur la date
    let n = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    // Wang hash : mélange les bits pour casser la séquentialité
    n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
    n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
    n = n ^ (n >>> 16);
    return PAIRS[Math.abs(n) % PAIRS.length];
  }

  function checkStreak() {
    const today = new Date().toDateString();
    let lastDate = localStorage.getItem('wikipath_last_daily');
    let streak = parseInt(localStorage.getItem('wikipath_streak') || '0', 10);
    if (lastDate) {
      const msInDay = 86400000;
      const diff = new Date(today) - new Date(lastDate);
      if (diff > msInDay * 1.5) streak = 0; // Missed a day
    }
    return streak;
  }

  function winDaily() {
    const today = new Date().toDateString();
    let streak = checkStreak();
    const lastDate = localStorage.getItem('wikipath_last_daily');
    if (lastDate !== today) {
       streak++;
       localStorage.setItem('wikipath_streak', streak);
       localStorage.setItem('wikipath_last_daily', today);
    }
  }

  function isDailyDone() {
    return localStorage.getItem('wikipath_last_daily') === new Date().toDateString();
  }

  function renderDailyUI() {
    const streak = checkStreak();
    const btn = document.getElementById('btn-daily');
    const disp = document.getElementById('streak-disp');
    if (!btn) return;
    const streakTxt = streak > 0 ? ` 🔥 ${streak}` : '';

    if (isDailyDone()) {
      btn.disabled = true;
      btn.classList.add('daily-done');
      if (disp) disp.textContent = '';
      btn.setAttribute('data-label', btn.getAttribute('data-label') || '');
      btn.innerHTML = `✓ Défi du jour complété${streakTxt}`;
    } else {
      btn.disabled = false;
      btn.classList.remove('daily-done');
      btn.innerHTML = `🎯 JOUER DÉFI DU JOUR <span id="streak-disp">${streakTxt}</span>`;
    }
  }

    /* ─── THEME ───────────────────────────────── */
    let theme = localStorage.getItem('wikipath_theme') || 'dark';
    // Appliquer le thème sauvegardé immédiatement
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('theme-btn').textContent = theme === 'light' ? 'SOMBRE' : 'CLAIR';

    function toggleTheme() {
      theme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.getElementById('theme-btn').textContent = theme === 'light' ? 'SOMBRE' : 'CLAIR';
      localStorage.setItem('wikipath_theme', theme);
      if (document.getElementById('screen-game').classList.contains('active') && S.path.length) {
        reloadCurrentFrame();
      }
    }
    async function reloadCurrentFrame() {
      const cur = S.path[S.path.length - 1];
      try { await loadFrame(cur); } catch (e) { }
    }

    /* ─── SCREENS ─────────────────────────────── */
    const _overlay = (() => {
      const el = document.createElement('div');
      el.id = 'screen-overlay';
      document.body.appendChild(el);
      return el;
    })();

    function show(id) {
      const next = document.getElementById('screen-' + id);
      const current = document.querySelector('.screen.active');
      // Pas d'animation si même écran ou écran de chargement (trop fréquent)
      if (current === next) return;
      if (id === 'loading') {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        next.classList.add('active');
        return;
      }
      _overlay.classList.add('visible');
      setTimeout(() => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        next.classList.add('active');
        _overlay.classList.remove('visible');
      }, 180);
    }

    /* ─── SEARCH AUTOCOMPLETE ─────────────────── */
    function onSearch(inp, side) {
      const q = inp.value.trim();
      if (!q) { hideSug(side); return; }
      clearTimeout(dbt[side]);
      dbt[side] = setTimeout(() => doSearch(q, side), 250);
    }

    async function doSearch(q, side) {
      try {
        const r = await fetch(`${WIKI_API}?action=opensearch&search=${encodeURIComponent(q)}&limit=6&format=json&origin=*`);
        const [, titles] = await r.json();
        showSug(side, titles);
      } catch (e) { hideSug(side); }
    }

    function showSug(side, titles) {
      const box = document.getElementById('sug-' + side);
      box.innerHTML = ''; sidx[side] = -1;
      if (!titles.length) { box.innerHTML = '<div class="sug-empty">Aucun résultat</div>'; box.classList.add('open'); return; }
      titles.forEach(t => {
        const d = document.createElement('div'); d.className = 'sug-item'; d.textContent = t;
        d.onmousedown = () => selectArt(side, t); box.appendChild(d);
      });
      box.classList.add('open');
    }
    function hideSug(s) { document.getElementById('sug-' + s).classList.remove('open'); }

    function onKey(e, side) {
      const items = [...document.getElementById('sug-' + side).querySelectorAll('.sug-item')];
      if (!items.length) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); sidx[side] = Math.min(sidx[side] + 1, items.length - 1); items.forEach((x, i) => x.classList.toggle('hi', i === sidx[side])); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sidx[side] = Math.max(sidx[side] - 1, 0); items.forEach((x, i) => x.classList.toggle('hi', i === sidx[side])); }
      else if (e.key === 'Enter') { e.preventDefault(); const i = sidx[side] >= 0 ? sidx[side] : 0; if (items[i]) selectArt(side, items[i].textContent); }
      else if (e.key === 'Escape') { hideSug(side); }
    }

    function selectArt(side, title) {
      S.sel[side] = title; hideSug(side);
      const inp = document.getElementById('inp-' + side);
      inp.value = title; inp.classList.add('filled');
      document.getElementById('tag-' + side + '-txt').textContent = title;
      document.getElementById('tag-' + side).classList.add('show');
      checkReady();
    }

    function clearSel(side) {
      S.sel[side] = null;
      const inp = document.getElementById('inp-' + side);
      inp.value = ''; inp.classList.remove('filled');
      document.getElementById('tag-' + side).classList.remove('show');
      hideSug(side); checkReady();
    }

    function checkReady() {
      const ok = S.sel.start && S.sel.end && S.sel.start !== S.sel.end;
      document.getElementById('btn-play').classList.toggle('ready', !!ok);
    }

    function pickRandom() {
      const p = PAIRS[Math.floor(Math.random() * PAIRS.length)];
      selectArt('start', p.start); selectArt('end', p.end);
    }

    const MODE_DESC = {
      chill:       'Naviguez librement, revenez en arrière. Aucune limite de temps.',
      competitive: 'Le chronomètre tourne dès le premier clic. Battez votre record.',
      survival:    '60 secondes. Chaque lien cliqué rapporte +10s. Atteignez la cible à temps.',
      daily:       'La même paire pour tout le monde aujourd\'hui. Streak en jeu.',
    };

    function selectMode(m) {
      S.mode = m;
      document.getElementById('btn-m-chill').classList.toggle('sel', m === 'chill');
      document.getElementById('btn-m-comp').classList.toggle('sel', m === 'competitive');
      document.getElementById('btn-m-surv').classList.toggle('sel', m === 'survival');
      document.getElementById('btn-m-daily').classList.toggle('sel', m === 'daily');
      const desc = document.getElementById('mode-desc');
      if (desc) desc.textContent = MODE_DESC[m] || '';
    }
    // Afficher la description du mode par défaut au chargement
    document.addEventListener('DOMContentLoaded', () => {
      const desc = document.getElementById('mode-desc');
      if (desc) desc.textContent = MODE_DESC['chill'];
    });

  document.getElementById('btn-daily').onclick = () => {
    selectMode('daily');
    const p = getDailyPair();
    selectArt('start', p.start);
    selectArt('end', p.end);
    playGame();
  };

    function playGame() {
      if (!S.sel.start || !S.sel.end) return;
      S.pair = { start: S.sel.start, end: S.sel.end };
      startGame();
    }

    document.addEventListener('click', e => {
      ['start', 'end'].forEach(s => { if (!e.target.closest('#inp-' + s) && !e.target.closest('#sug-' + s)) hideSug(s); });
    });

    /* ─── FRAME ───────────────────────────────── */
    function prog(p) { document.getElementById('prog-fill').style.width = p + '%'; }

    async function buildHTML(title) {
      const enc = encodeURIComponent(title.replace(/ /g, '_'));
      const res = await fetch(`${WIKI_REST}/page/html/${enc}`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      let html = await res.text();
      html = html
        .replace(/href="\.\//g, 'href="https://fr.wikipedia.org/wiki/')
        .replace(/src="\/\//g, 'src="https://')
        .replace(/href="\/\//g, 'href="https://')
        .replace(/(srcset=")(\s*)(\/\/)/g, '$1$2https://')
        .replace(/<base[^>]*>/gi, '');
      const dark = theme === 'dark';
      const inH = `<style>${iframeCss(dark)}</style>`;
      const inB = `<script>${INTERCEPT}<\/script>`;
      html = html.includes('</head>') ? html.replace('</head>', inH + '</head>') : inH + html;
      html = html.includes('</body>') ? html.replace('</body>', inB + '</body>') : html + inB;
      return html;
    }

    async function resolveTitle(raw) {
      const enc = encodeURIComponent(raw.replace(/ /g, '_'));
      const r = await fetch(`${WIKI_REST}/page/summary/${enc}`);
      const j = await r.json();
      return j.title || raw;
    }

  async function fetchCategories(title) {
     const enc = encodeURIComponent(title);
     try {
       const r = await fetch(`${WIKI_API}?action=query&prop=categories&titles=${enc}&cllimit=500&format=json&origin=*`);
       const j = await r.json();
       const pages = j.query.pages;
       for (let p in pages) {
          if (pages[p].categories) return pages[p].categories.map(c => c.title);
       }
     } catch(e){}
     return [];
  }

  async function computeSemanticHeat(title) {
      if(!S.targetCats || !S.targetCats.length) return;
      const curCats = await fetchCategories(title);
      let matches = 0;
      for(let cc of curCats) {
         if(S.targetCats.includes(cc)) matches++;
      }
      
      const maxMatches = Math.min(S.targetCats.length, 6);
      let pct = Math.min(100, Math.max(5, Math.floor((matches / maxMatches) * 100)));
      
      document.getElementById('semantic-fill').style.width = pct + '%';
      if (pct < 15) document.getElementById('semantic-fill').style.background = '#1A4F8A'; // Cold
      else if (pct < 50) document.getElementById('semantic-fill').style.background = '#e3a022'; // Warm
      else document.getElementById('semantic-fill').style.background = '#c23a45'; // Hot
  }

    async function loadFrame(title) {
      const frame = document.getElementById('wiki-frame');
      frame.classList.add('fading'); prog(20);
      const [rt, html] = await Promise.all([resolveTitle(title), buildHTML(title)]);
      prog(70); frame.srcdoc = html;
      await new Promise(r => { frame.onload = r; setTimeout(r, 4500); });
      prog(100); setTimeout(() => prog(0), 350);
      frame.classList.remove('fading');
      return rt;
    }

    /* ─── GAME ────────────────────────────────── */
  async function startGame(){
    clearInterval(S.timer);
    S.penalty=0;
    S.path=[S.pair.start];
    S.seconds = S.mode==='survival' ? 60 : 0;
    S.busy=false;
    document.getElementById('hint-display').style.display='none';
    document.getElementById('semantic-fill').style.width='0%';
    document.getElementById('loading-title').textContent=S.pair.start;
    document.getElementById('loading-sub').textContent='Récupération de l\'article…';
    const loadingFill = document.querySelector('.loading-bar-fill');
    loadingFill.style.width = '0%';
    show('loading');
    try {
      loadingFill.style.width = '15%';
      const [resolvedEnd, targetCats] = await Promise.all([
        resolveTitle(S.pair.end),
        fetchCategories(S.pair.end)
      ]);
      loadingFill.style.width = '40%';
      document.getElementById('loading-sub').textContent = 'Construction de la page…';
      const rt = await loadFrame(S.pair.start);
      loadingFill.style.width = '100%';
      prog(0); // reset la barre de jeu avant d'afficher l'écran
      S.targetCats = targetCats || [];
      S.path[0]=rt;
      S.pair.end=resolvedEnd;
      document.getElementById('hdr-start').textContent=S.pair.start;
      document.getElementById('hdr-end').textContent=resolvedEnd;
      document.getElementById('hdr-clicks').textContent='0 clic';
      const tel = document.getElementById('hdr-timer');
      tel.classList.toggle('survival', S.mode === 'survival');
      if (S.mode === 'competitive' || S.mode === 'survival') {
        tel.style.display = ''; tel.textContent = fmt(S.seconds);
        S.timer = setInterval(() => {
          if (S.mode === 'survival') {
            S.seconds--; tel.textContent = fmt(S.seconds);
            if (S.seconds <= 0) { clearInterval(S.timer); showLose(); }
          } else {
            S.seconds++; tel.textContent = fmt(S.seconds);
          }
        }, 1000);
      } else { tel.style.display = 'none'; }
      updateBar(rt); renderGraph(); show('game');
    } catch (e) { alert('Erreur de chargement.'); show('home'); }
  }

    async function replayGame() { await startGame(); }

    async function navigateTo(raw) {
      if (S.busy) return; S.busy = true;
      document.getElementById('hint-display').style.display = 'none';
      try {
        const t = await loadFrame(raw);
        S.path.push(t);
        recordStat(t);
        const c = S.path.length - 1 + S.penalty;
        if (S.mode === 'survival' && !isTarget(t)) {
          S.seconds += 10;
          document.getElementById('hdr-timer').textContent = fmt(S.seconds);
          document.getElementById('hdr-timer').style.color = 'var(--pass)';
          setTimeout(() => document.getElementById('hdr-timer').style.color = '', 400);
        }
        document.getElementById('hdr-clicks').textContent = `${c} clic${c > 1 ? 's' : ''}`;
        computeSemanticHeat(t);
        updateBar(t); renderGraph();
        if (isTarget(t)) { clearInterval(S.timer); if(S.mode==='daily') winDaily(); setTimeout(showWin, 400); }
      } catch (e) { alert('Article introuvable.'); }
      S.busy = false;
    }

    async function goBack() {
      if (S.busy || S.path.length <= 1) return; S.busy = true;
      document.getElementById('hint-display').style.display = 'none';
      S.path.pop();
      const prev = S.path[S.path.length - 1];
      const c = S.path.length - 1 + S.penalty;
      try {
        await loadFrame(prev);
        document.getElementById('hdr-clicks').textContent = `${c} clic${c > 1 ? 's' : ''}`;
        updateBar(prev); renderGraph();
      } catch (e) { }
      S.busy = false;
    }

    /* ─── HELPERS ─────────────────────────────── */
    function isTarget(t) { const n = s => s.toLowerCase().replace(/_/g, ' ').trim(); return n(t) === n(S.pair.end); }
    function fmt(s) {
      if (s < 0) s = 0;
      return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    function updateBar(title) {
      const el = document.getElementById('art-title');
      const isT = isTarget(title);
      el.className = 'art-title' + (isT ? ' is-target' : '');
      el.innerHTML = esc(title) + (isT ? '<span class="target-flag">Cible atteinte</span>' : '');
      document.getElementById('btn-back').style.display = (S.mode === 'chill' && S.path.length > 1) ? '' : 'none';
    }

    function showLose() {
      const c = S.path.length - 1 + S.penalty;
      document.getElementById('lose-route').textContent = `${S.pair.start} → ${S.pair.end}`;
      document.getElementById('lose-clicks').textContent = c;
      show('lose');
    }

    function renderGraph() {
      const tl = document.getElementById('graph-tl');
      const line = document.getElementById('graph-line');
      tl.querySelectorAll('.graph-node').forEach(n => n.remove());
      line.style.height = Math.max(0, S.path.length * 40) + 'px';

      S.path.forEach((title, i) => {
        const isF = i === 0, isC = i === S.path.length - 1;
        const dc = isF ? 'd-start' : isC ? 'd-cur' : 'd-vis';
        const nc = isF ? 'c-start' : isC ? 'c-cur' : '';
        const tag = isF ? `<span class="g-tag" style="color:var(--pass)">Départ</span>` : '';
        tl.appendChild(mkN(title, dc, nc, tag));
      });

      // Target node
      tl.appendChild(mkN(S.pair.end, 'd-tgt', 'c-tgt', `<span class="g-tag" style="color:var(--accent)">Cible</span>`));
      setTimeout(() => { const sc = document.getElementById('graph-scroll'); sc.scrollTop = sc.scrollHeight; }, 60);
    }

    function mkN(title, dc, nc, tag) {
      const node = document.createElement('div'); node.className = 'graph-node';
      const dot = document.createElement('div'); dot.className = 'g-dot ' + dc;
      const txt = document.createElement('div'); txt.className = 'g-text';
      const name = document.createElement('div'); name.className = 'g-name ' + nc; name.innerHTML = esc(title) + (tag || '');
      txt.appendChild(name); node.appendChild(dot); node.appendChild(txt);
      return node;
    }

    function drawWinGraph() {
      const svg = document.getElementById('win-svg');
      if (!svg) return;
      svg.innerHTML = '';

      const path = S.path;
      const nodeR = 9;
      const gapX  = 110;   // espacement large pour éviter le chevauchement des labels
      const svgH  = 200;
      const midY  = svgH / 2;
      const offY  = 32;    // amplitude zigzag haut/bas
      const padX  = 55;    // marge gauche/droite

      const totalW = padX * 2 + Math.max(path.length - 1, 0) * gapX;
      const getX = i => padX + i * gapX;
      const getY = i => midY + (i % 2 === 0 ? -offY : offY);

      // viewBox responsive — le SVG s'adapte à la largeur du conteneur
      svg.setAttribute('viewBox', `0 0 ${totalW} ${svgH}`);
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', svgH);
      svg.removeAttribute('style'); // retirer l'overflow:visible inline

      // Lignes de connexion
      for (let i = 1; i < path.length; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', getX(i - 1)); line.setAttribute('y1', getY(i - 1));
        line.setAttribute('x2', getX(i));     line.setAttribute('y2', getY(i));
        line.setAttribute('stroke', 'var(--rule)');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-dasharray', '5 3');
        svg.appendChild(line);
      }

      // Nœuds + labels alternés haut/bas
      for (let i = 0; i < path.length; i++) {
        const x = getX(i), y = getY(i);
        const isFirst = i === 0, isLast = i === path.length - 1;
        const even = i % 2 === 0;

        const fill = isFirst ? 'var(--pass)' : isLast ? 'var(--accent)' : 'var(--sub)';

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x); circle.setAttribute('cy', y);
        circle.setAttribute('r', nodeR);
        circle.setAttribute('fill', fill);
        svg.appendChild(circle);

        // Label au-dessus sur les nœuds pairs, en-dessous sur les impairs
        const labelY = even ? y - nodeR - 9 : y + nodeR + 18;
        let tStr = path[i];
        if (tStr.length > 13) tStr = tStr.substring(0, 11) + '…';

        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', x);
        txt.setAttribute('y', labelY);
        txt.setAttribute('fill', fill);
        txt.setAttribute('font-family', 'var(--fm)');
        txt.setAttribute('font-size', '10.5px');
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('font-weight', isFirst || isLast ? '600' : '400');
        txt.textContent = tStr;
        svg.appendChild(txt);
      }
    }

  function showWin(){
    hidePreview();
    const c=S.path.length-1+S.penalty;

      // Absolute Record
      let rec = localStorage.getItem('wikipath_best');
      if (!rec || c < parseInt(rec)) {
        localStorage.setItem('wikipath_best', c);
        rec = c;
        document.getElementById('win-best').textContent = `Nouveau Record Absolu : ${c} clic${c > 1 ? 's' : ''} !`;
      } else {
        document.getElementById('win-best').textContent = `Record Absolu : ${rec} clics`;
      }

      // Optimal Calculation
    // Comparer avec S.sel (sélection originale) car S.pair.end est résolu par Wikipedia
    const matchPair = PAIRS.find(p => p.start === S.sel.start && p.end === S.sel.end);
    document.getElementById('win-optimal').textContent = matchPair && matchPair.min 
       ? `Chemin optimal théorique : ${matchPair.min} clics` 
       : `Optimal inconnu (Recherche libre)`;

    const solWrap = document.getElementById('win-solution');
    if (solWrap) {
       solWrap.style.display = matchPair && matchPair.path ? 'block' : 'none';
       if (matchPair && matchPair.path) {
          document.getElementById('sol-text').textContent = matchPair.path.join(' ➔ ');
          document.getElementById('sol-text').style.display = 'none'; // hidden by default
          document.getElementById('btn-sol').style.display = 'inline-block';
       }
    }

    document.querySelector('.win-kicker').textContent = 'Victoire';
      document.getElementById('win-route').textContent = `${S.pair.start} → ${S.pair.end}`;
      document.getElementById('win-title').textContent = `« ${S.pair.start} » jusqu'à « ${S.pair.end} »`;
      document.getElementById('win-clicks').textContent = c;
      const tw = document.getElementById('win-time-wrap');
      if (S.mode === 'competitive') { tw.style.display = ''; document.getElementById('win-time').textContent = fmt(S.seconds); }
      else { tw.style.display = 'none'; }
      
      const pathList = document.getElementById('win-path-list');
      const pathWrap = document.getElementById('win-path-wrap');
      pathList.innerHTML = '';
      S.path.forEach((t, i) => {
        const row = document.createElement('div'); row.className = 'win-item';
        const dot = document.createElement('div'); dot.className = 'win-dot';
        dot.style.background = i === 0 ? 'var(--pass)' : i === S.path.length - 1 ? 'var(--accent)' : 'var(--border)';
        const name = document.createElement('div'); name.className = 'win-name' + (i === 0 || i === S.path.length - 1 ? ' hi' : '');
        name.textContent = t; row.appendChild(dot); row.appendChild(name);
        pathList.appendChild(row);
      });
      pathWrap.style.display = S.path.length > 1 ? '' : 'none';

      // Save to history
    const newEntry = {
      start: S.pair.start, end: S.pair.end, mode: S.mode,
      clicks: c, time: S.mode==='competitive' ? S.seconds : null,
      date: new Date().toLocaleDateString('fr-FR')
    };
    saveHistory(newEntry);
    renderStats();
    drawWinGraph();

    show('win');
  }

  let hoverAbort = null;
  window.addEventListener('message', e => {
    if(!e.data) return;
    const inGame = document.getElementById('screen-game').classList.contains('active');
    if(e.data.type==='wiki-nav') navigateTo(e.data.title);
    if(e.data.type==='wiki-hover' && inGame) showPreview(e.data.title);
    if(e.data.type==='wiki-unhover') hidePreview();
  });
  
  window.addEventListener('mousemove', e => {
     const pv = document.getElementById('wiki-preview');
     if(pv.style.display !== 'none') {
        pv.style.left = Math.min(e.clientX + 15, window.innerWidth - 330) + 'px';
        pv.style.top = Math.min(e.clientY + 15, window.innerHeight - (pv.offsetHeight || 150) - 10) + 'px';
     }
  });

  async function showPreview(title) {
    if(hoverAbort) hoverAbort.abort();
    hoverAbort = new AbortController();
    try {
      const r = await fetch(`${WIKI_REST}/page/summary/${encodeURIComponent(title.replace(/ /g,'_'))}`, {signal: hoverAbort.signal});
      const d = await r.json();
      if(!d.extract) return;
      document.getElementById('wp-title').textContent = d.title;
      document.getElementById('wp-desc').textContent = d.extract.substring(0, 160) + '...';
      const img = document.getElementById('wp-img');
      if (d.thumbnail && d.thumbnail.source) {
         img.style.backgroundImage = `url(${d.thumbnail.source})`;
         img.style.display = 'block';
      } else {
         img.style.display = 'none';
      }
      document.getElementById('wiki-preview').style.display = 'block';
    } catch(err) {}
  }
  
  function hidePreview() {
    if(hoverAbort) hoverAbort.abort();
    document.getElementById('wiki-preview').style.display = 'none';
  }

  function goHome(){ clearInterval(S.timer); show('home'); renderDailyUI(); }

    function saveHistory(entry) {
      let hist = JSON.parse(localStorage.getItem('wikipath_history') || '[]');
      hist.unshift(entry);
      hist = hist.slice(0, 5);
      localStorage.setItem('wikipath_history', JSON.stringify(hist));
      const total = (parseInt(localStorage.getItem('wikipath_total') || '0')) + 1;
      localStorage.setItem('wikipath_total', total);
      const stripPlayed = document.getElementById('strip-played');
      if (stripPlayed) stripPlayed.textContent = total;
      renderHistory();
    }

    function renderHistory() {
      const hist = JSON.parse(localStorage.getItem('wikipath_history') || '[]');
      const row = document.getElementById('history-row');
      const list = document.getElementById('history-list');
      if (!hist.length) { row.style.display = 'none'; return; }
      row.style.display = '';
      list.innerHTML = '';
      hist.forEach(h => {
        const item = document.createElement('div'); item.className = 'history-item';
        item.title = "Cliquez pour rejouer cette partie";
        item.onclick = () => {
          selectArt('start', h.start);
          selectArt('end', h.end);
          if (h.mode) selectMode(h.mode);
          playGame();
        };
        const route = document.createElement('div'); route.className = 'history-route';
        route.textContent = `${h.start} → ${h.end}`;
        const meta = document.createElement('div'); meta.className = 'history-meta';
        const mMode = h.mode === 'competitive' ? 'Contre-la-montre' : h.mode === 'survival' ? 'Survie' : 'Exploration';
        let metaTxt = `${h.date} — ${mMode} — ${h.clicks} clic${h.clicks > 1 ? 's' : ''}`;
        if (h.time !== null) metaTxt += ` — ${fmt(h.time)}`;
        meta.textContent = metaTxt;
        item.appendChild(route); item.appendChild(meta); list.appendChild(item);
      });
    }

    /* New Actions and Stats */
    async function useHint() {
      if (S.busy) return;
      const curTitle = S.path[S.path.length - 1];
      const endTitle = S.pair.end;
      if (isTarget(curTitle)) return;
      S.busy = true;
      const btn = document.getElementById('btn-hint');
      btn.disabled = true;
      const hd = document.getElementById('hint-display');
      btn.textContent = "Recherche...";

      try {
        const encCur = encodeURIComponent(curTitle);
        const encEnd = encodeURIComponent(endTitle);

        const [resA, resB] = await Promise.all([
          fetch(`${WIKI_API}?action=query&titles=${encCur}&prop=links&pllimit=500&format=json&origin=*`),
          fetch(`${WIKI_API}?action=query&titles=${encEnd}&prop=linkshere&lhlimit=500&format=json&origin=*`)
        ]);
        const dataA = await resA.json(), dataB = await resB.json();

        let linksFromA = [];
        for (let p in dataA.query.pages) { if (dataA.query.pages[p].links) linksFromA = dataA.query.pages[p].links.map(l => l.title); }
        let linksToB = [];
        for (let p in dataB.query.pages) { if (dataB.query.pages[p].linkshere) linksToB = dataB.query.pages[p].linkshere.map(l => l.title); }

        let msg = "";
        if (linksFromA.includes(endTitle)) {
          msg = `🎉 Super ! Cliquez sur le lien « ${esc(endTitle)} » qui se trouve directement sur cette page !`;
        } else {
          const intersection = linksFromA.filter(x => linksToB.includes(x));
          if (intersection.length > 0) {
            msg = `🔗 Bonne nouvelle, le lien « ${esc(intersection[0])} » se trouve sur cette page, et il mène directement à « ${esc(endTitle)} » ! Cherchez-le et cliquez.`;
          } else {
            msg = `🧭 Aucun lien direct ou à 1 étape trouvé. Tentez de rejoindre un sujet plus général.`;
          }
        }

        hd.innerHTML = msg;
        hd.style.display = 'block';

        S.penalty += 1;
        const c = S.path.length - 1 + S.penalty;
        document.getElementById('hdr-clicks').textContent = `${c} clic${c > 1 ? 's' : ''}`;
      } catch (e) { console.error(e); }

      S.busy = false;
      btn.textContent = "Indice (+1 clic)";
      btn.disabled = false;
    }

    // Copie dans le presse-papier — fonctionne HTTP et HTTPS
    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback pour HTTP
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    }

    function buildShareUrl() {
      const base = window.location.origin + window.location.pathname;
      return base + '?path=' + encodeURIComponent(S.sel.start) + ',' + encodeURIComponent(S.sel.end);
    }

    async function copyScore() {
      const c = S.path.length - 1 + S.penalty;
      const modeTxt = S.mode === 'competitive' ? ` en ${fmt(S.seconds)}` : S.mode === 'survival' ? ' (Survie)' : '';
      const text = `🎯 Wikipath — "${S.pair.start}" → "${S.pair.end}" en ${c} clic${c > 1 ? 's' : ''}${modeTxt}`;
      try {
        await copyText(text);
        flashBtn('btn-copy-score', '✓ Copié !');
      } catch(e) { alert('Impossible de copier automatiquement. Sélectionnez le texte manuellement.'); }
    }

    async function copyLink() {
      try {
        await copyText(buildShareUrl());
        flashBtn('btn-copy-link', '✓ Copié !');
      } catch(e) { alert('Impossible de copier automatiquement.'); }
    }

    function flashBtn(id, msg) {
      const btn = document.getElementById(id);
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = msg;
      setTimeout(() => { btn.textContent = orig; }, 1800);
    }

    function recordStat(title) {
      let stats = JSON.parse(localStorage.getItem('wikipath_stats') || '{}');
      stats[title] = (stats[title] || 0) + 1;
      localStorage.setItem('wikipath_stats', JSON.stringify(stats));
    }

    function renderStats() {
      const stats = JSON.parse(localStorage.getItem('wikipath_stats') || '{}');
      const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const list = document.getElementById('win-stats-list');
      list.innerHTML = '';
      sorted.forEach(([title, count]) => {
        const d = document.createElement('div'); d.className = 'win-stat-item';
        const n = document.createElement('span'); n.textContent = title;
        const c = document.createElement('span'); c.textContent = `${count} visite${count > 1 ? 's' : ''}`;
        c.style.color = 'var(--accent)'; c.style.fontFamily = 'var(--fm)'; c.style.fontSize = '.6rem';
        d.appendChild(n); d.appendChild(c);
        list.appendChild(d);
      });
      document.getElementById('win-stats-top').style.display = sorted.length > 0 ? 'block' : 'none';
    }

    /* Init */
  renderHistory();
  renderDailyUI();

  // Stats strip
  const stripPairs = document.getElementById('strip-pairs');
  if (stripPairs) stripPairs.textContent = PAIRS.length;
  const stripPlayed = document.getElementById('strip-played');
  if (stripPlayed) {
    stripPlayed.textContent = localStorage.getItem('wikipath_total') || '0';
  }
  
  const params = new URLSearchParams(window.location.search);
  const pathParam = params.get('path');
  if (pathParam && pathParam.includes(',')) {
    const [startRaw, endRaw] = pathParam.split(',');
    selectArt('start', decodeURIComponent(startRaw));
    selectArt('end', decodeURIComponent(endRaw));
    alert(`🎯 On vous a mis au défi ! Trouvez le chemin de "${decodeURIComponent(startRaw)}" jusqu'à "${decodeURIComponent(endRaw)}" !`);
  } else {
    pickRandom();
  }