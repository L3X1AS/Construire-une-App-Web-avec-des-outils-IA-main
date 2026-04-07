/* ─── CONFIG ──────────────────────────────── */
    const WIKI_REST = 'https://fr.wikipedia.org/api/rest_v1';
    const WIKI_API = 'https://fr.wikipedia.org/w/api.php';

    const PAIRS = [
      { start: 'Napoléon Bonaparte', end: 'Internet' },
      { start: 'Tour Eiffel', end: 'Dinosaure' },
      { start: 'Albert Einstein', end: 'Football' },
      { start: 'Paris', end: 'Sushi' },
      { start: 'Leonardo da Vinci', end: 'Volcan' },
      { start: 'Chocolat', end: 'Guerre froide' },
      { start: 'Marie Curie', end: 'Jazz' },
      { start: 'Chat', end: 'Révolution française' },
      { start: 'Égypte antique', end: 'Station spatiale internationale' },
      { start: 'William Shakespeare', end: 'Atome' },
      { start: 'Versailles', end: 'Calcul infinitésimal' },
      { start: 'Jules Verne', end: 'ADN' },
    ];

    /* ─── IFRAME CSS ──────────────────────────── */
    function iframeCss(dark) {
      const bg = dark ? '#0e0d12' : '#f6f2ea';
      const text = dark ? '#e4e0d4' : '#1c1814';
      const sub = dark ? '#9a9488' : '#5a5148';
      const muted = dark ? '#6a6478' : '#8a7e70';
      const bdr = dark ? '#2e2c3a' : '#c4baaa';
      const card = dark ? '#1c1b22' : '#ece7dc';
      const link = dark ? '#7ba5e0' : '#1a4f8a';
      const scr = dark ? '#2e2c3a #0e0d12' : '#c4baaa #f6f2ea';
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
})();
`;

    /* ─── STATE ───────────────────────────────── */
    let S = { mode: 'chill', pair: null, path: [], seconds: 0, timer: null, busy: false, sel: { start: null, end: null }, penalty: 0 };
    let dbt = { start: null, end: null };
    let sidx = { start: -1, end: -1 };

    /* ─── THEME ───────────────────────────────── */
    let theme = 'light';
    function toggleTheme() {
      theme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.getElementById('theme-btn').textContent = theme === 'light' ? 'SOMBRE' : 'CLAIR';
      /* reload frame if in game */
      if (document.getElementById('screen-game').classList.contains('active') && S.path.length) {
        reloadCurrentFrame();
      }
    }
    async function reloadCurrentFrame() {
      const cur = S.path[S.path.length - 1];
      try { await loadFrame(cur); } catch (e) { }
    }

    /* ─── SCREENS ─────────────────────────────── */
    function show(id) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('screen-' + id).classList.add('active');
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

    function selectMode(m) {
      S.mode = m;
      document.getElementById('btn-m-chill').classList.toggle('sel', m === 'chill');
      document.getElementById('btn-m-comp').classList.toggle('sel', m === 'competitive');
      document.getElementById('btn-m-surv').classList.toggle('sel', m === 'survival');
    }

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
    async function startGame() {
      clearInterval(S.timer);
      S.penalty = 0;
      S.path = [S.pair.start];
      S.seconds = S.mode === 'survival' ? 60 : 0;
      S.busy = false;
      document.getElementById('hint-display').style.display = 'none';
      document.getElementById('loading-title').textContent = S.pair.start;
      document.getElementById('loading-sub').textContent = 'Chargement de l\'article';
      show('loading');
      try {
        const [rt, resolvedEnd] = await Promise.all([
          loadFrame(S.pair.start),
          resolveTitle(S.pair.end)
        ]);
        S.path[0] = rt;
        S.pair.end = resolvedEnd;
        document.getElementById('hdr-start').textContent = S.pair.start;
        document.getElementById('hdr-end').textContent = resolvedEnd;
        document.getElementById('hdr-clicks').textContent = '0 clic';
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
        updateBar(t); renderGraph();
        if (isTarget(t)) { clearInterval(S.timer); setTimeout(showWin, 400); }
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

    function showWin() {
      const c = S.path.length - 1 + S.penalty;

      // Absolute Record
      let rec = localStorage.getItem('wikipath_best');
      if (!rec || c < parseInt(rec)) {
        localStorage.setItem('wikipath_best', c);
        rec = c;
        document.getElementById('win-best').textContent = `Nouveau Record Absolu : ${c} clic${c > 1 ? 's' : ''} !`;
      } else {
        document.getElementById('win-best').textContent = `Record Absolu : ${rec} clics`;
      }

      document.querySelector('.win-kicker').textContent = 'Victoire';
      document.getElementById('win-route').textContent = `${S.pair.start} → ${S.pair.end}`;
      document.getElementById('win-title').textContent = `« ${S.pair.start} » jusqu'à « ${S.pair.end} »`;
      document.getElementById('win-clicks').textContent = c;
      const tw = document.getElementById('win-time-wrap');
      if (S.mode === 'competitive') { tw.style.display = ''; document.getElementById('win-time').textContent = fmt(S.seconds); }
      else { tw.style.display = 'none'; }
      const list = document.getElementById('win-path-list'); list.innerHTML = '';
      S.path.forEach((t, i) => {
        const row = document.createElement('div'); row.className = 'win-item';
        const dot = document.createElement('div'); dot.className = 'win-dot';
        dot.style.background = i === 0 ? 'var(--pass)' : i === S.path.length - 1 ? 'var(--accent)' : 'var(--border)';
        const name = document.createElement('div'); name.className = 'win-name' + (i === 0 || i === S.path.length - 1 ? ' hi' : '');
        name.textContent = t; row.appendChild(dot); row.appendChild(name); list.appendChild(row);
      });

      // Save to history
      const newEntry = {
        start: S.pair.start, end: S.pair.end, mode: S.mode,
        clicks: c, time: S.mode === 'competitive' ? S.seconds : null,
        date: new Date().toLocaleDateString('fr-FR')
      };
      saveHistory(newEntry);
      renderStats();

      show('win');
    }

    function goHome() { clearInterval(S.timer); show('home'); }
    window.addEventListener('message', e => { if (e.data && e.data.type === 'wiki-nav') navigateTo(e.data.title); });

    function saveHistory(entry) {
      let hist = JSON.parse(localStorage.getItem('wikipath_history') || '[]');
      hist.unshift(entry);
      hist = hist.slice(0, 5);
      localStorage.setItem('wikipath_history', JSON.stringify(hist));
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
          msg = `🎉 Super ! Cliquez sur le lien "${endTitle}" qui se trouve directement sur cette page !`;
        } else {
          const intersection = linksFromA.filter(x => linksToB.includes(x));
          if (intersection.length > 0) {
            msg = `🔗 Bonne nouvelle, le lien "${intersection[0]}" se trouve sur cette page, et il mène directement à "${endTitle}" ! Cherchez-le et cliquez.`;
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

    function shareResult() {
      const c = S.path.length - 1 + S.penalty;
      let modeTxt = S.mode === 'competitive' ? ` en ${fmt(S.seconds)} min` : S.mode === 'survival' ? " en mode Survie" : "";
      let url = window.location.origin + window.location.pathname;
      // Add param
      url += '?path=' + encodeURIComponent(S.pair.start) + ',' + encodeURIComponent(S.pair.end);
      const text = `🎯 J'ai relié "${S.pair.start}" → "${S.pair.end}" en ${c} clics sur Wikipath${modeTxt} !\nViens battre mon score sur le même défi :\n${url}`;
      navigator.clipboard.writeText(text).then(() => alert("Le lien du défi a été copié dans votre presse-papier !"));
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