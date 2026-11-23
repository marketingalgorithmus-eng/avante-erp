/* Shell do Avante ERP: topbar, menu lateral, roteador com estado na URL, menu "Criar", paleta Ctrl K e atalhos Alt+n. */
window.Router = (function () {
  function parse(h) {
    h = h || location.hash || '#/painel';
    var i = h.indexOf('?');
    var path = i < 0 ? h : h.slice(0, i);
    var query = {};
    if (i >= 0) h.slice(i + 1).split('&').forEach(function (kv) {
      if (!kv) return;
      var p = kv.split('=');
      query[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    });
    return { path: path, query: query };
  }
  return { current: function () { return parse(); }, parse: parse };
})();

(function () {
  var D = window.DATA;
  var ROUTES = flatRoutes();
  var root = document.getElementById('app');
  var open = {};

  /* Logo Avante: barra azul + paralelogramo em tinta (branco no escuro), "vante" azul e "ERP" */
  var MARK = '<path class="logo-blue" d="M15.6 2h7.6c1.2 0 2.2.6 2.8 1.7L39.4 29.1c.2.5-.1.9-.6.9h-10.4c-1.4 0-2.6-.8-3.2-2L14.9 3.1c-.2-.5.1-1.1.7-1.1Z"/>' +
    '<path class="logo-ink" d="M10.6 13.7h8.6L11.9 28.2c-.6 1.1-1.7 1.8-3 1.8H.9c-.5 0-.8-.5-.5-.9l8.3-14.1c.4-.8 1.1-1.3 1.9-1.3Z"/>';
  /* Símbolo decorativo (arte institucional): "fill" = formas chapadas translúcidas, "line" = só contorno.
     Uso: AvanteDeco('fill', 'classe-de-posicao'). Sempre decorativo (aria-hidden). */
  var MARK_D = ['M15.6 2h7.6c1.2 0 2.2.6 2.8 1.7L39.4 29.1c.2.5-.1.9-.6.9h-10.4c-1.4 0-2.6-.8-3.2-2L14.9 3.1c-.2-.5.1-1.1.7-1.1Z',
    'M10.6 13.7h8.6L11.9 28.2c-.6 1.1-1.7 1.8-3 1.8H.9c-.5 0-.8-.5-.5-.9l8.3-14.1c.4-.8 1.1-1.3 1.9-1.3Z'];
  window.AvanteDeco = function (variant, cls) {
    var line = variant === 'line';
    return '<svg class="deco-a ' + (line ? 'is-line ' : 'is-fill ') + (cls || '') + '" viewBox="-1 -1 42 34" aria-hidden="true" focusable="false">' +
      MARK_D.map(function (d) {
        return '<path d="' + d + '"' + (line ? ' fill="none" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"' : ' fill="currentColor"') + '/>';
      }).join('') + '</svg>';
  };

  window.LogoMark = function () { return '<svg class="logo-mark" viewBox="0 0 40 32" aria-hidden="true">' + MARK + '</svg>'; };
  window.LogoSvg = function (sub) {
    return '<span class="logo" role="img" aria-label="Avante ' + (sub || 'ERP') + '">' + window.LogoMark() +
      '<span class="logo-word" aria-hidden="true">vante</span><span class="logo-erp" aria-hidden="true">' + (sub || 'ERP') + '</span></span>';
  };
  function logo() { return '<a class="brand" href="#/painel" aria-label="Avante ERP — Painel">' + LogoSvg('ERP') + '</a>'; }
  window.AvanteLogo = logo;

  function topbar() {
    return '<header class="topbar">' +
      '<button type="button" class="btn btn-ghost btn-icon" id="toggle-nav" aria-label="Mostrar ou recolher o menu">' + icon('menu', 18) + '</button>' +
      logo() +
      '<button type="button" class="search-trigger" id="open-palette" aria-label="Buscar no ERP">' + icon('search', 15) + '<span>Buscar telas e ações…</span><span class="kbd">Ctrl K</span></button>' +
      '<div class="topbar-actions">' +
        '<div class="rel"><button type="button" class="btn btn-primary" id="create-btn" aria-haspopup="menu" aria-expanded="false">' + icon('plus', 15) + '<span class="hide-sm">Criar</span></button>' +
          '<div class="menu-pop" id="create-menu" role="menu" hidden>' +
            '<p class="menu-label">Criar</p>' +
            CREATE_ACTIONS.map(function (a) {
              return '<a class="menu-item" role="menuitem" href="' + (a.create || a.route) + '">' + icon(a.icon, 15) + a.label + '<span class="kbd">Alt+' + a.key + '</span></a>';
            }).join('') +
          '</div></div>' +
        '<button type="button" class="btn btn-secondary hide-md">' + icon('chat', 15) + 'Assistente</button>' +
        '<button type="button" class="btn btn-ghost btn-icon rel" aria-label="Notificações">' + icon('bell', 17) + '</button>' +
        '<div class="rel"><button type="button" class="btn btn-ghost user-btn" id="user-btn" aria-haspopup="menu" aria-expanded="false">' +
          '<span class="avatar">' + D.usuario.inicial + '</span><span class="hide-sm">' + esc(D.usuario.nome) + '</span>' + icon('chevDown', 14, 'hide-sm') + '</button>' +
          '<div class="menu-pop" id="user-menu" role="menu" hidden>' +
            '<p class="menu-label">' + esc(D.usuario.perfil) + '</p>' +
            '<button type="button" class="menu-item" role="menuitem" id="theme-toggle">' + icon('moon', 15) + 'Alternar tema escuro</button>' +
            '<a class="menu-item" role="menuitem" href="#/configuracoes">' + icon('sliders', 15) + 'Configurações</a>' +
            '<a class="menu-item" role="menuitem" href="#/painel?modal=boas-vindas">' + icon('check', 15) + 'Ver boas-vindas</a>' +
            '<div class="menu-sep"></div>' +
            '<a class="menu-item" role="menuitem" href="#/login">' + icon('logout', 15) + 'Sair</a>' +
          '</div></div>' +
      '</div>' +
    '</header>';
  }

  function sidebar() {
    var nav = MENU.map(function (g) {
      if (g.route) {
        return '<div class="nav-group"><a class="nav-link" href="' + g.route + '" data-route="' + g.route + '" title="' + g.label + '">' +
          icon(g.icon, 17) + '<span class="nav-label">' + g.label + '</span></a></div>';
      }
      var main = g.children.filter(function (c) { return !c.more; });
      var more = g.children.filter(function (c) { return c.more; });
      var subs = main.map(function (c) {
        if (c.section) return '<p class="nav-section">' + c.section + '</p>';
        return '<a href="' + c.route + '" data-route="' + c.route + '">' + c.label + '</a>';
      }).join('');
      if (more.length) subs += '<button type="button" class="nav-more" data-flyout="' + g.id + '" aria-expanded="false" aria-controls="flyout">' +
        icon('grid', 14) + '<span>' + (g.moreLabel || 'Mais') + '</span>' + icon('chevRight', 14, 'chev-r') + '</button>';
      return '<div class="nav-group" data-group="' + g.id + '">' +
        '<button type="button" class="nav-toggle" aria-expanded="false" title="' + g.label + '">' + icon(g.icon, 17) +
        '<span class="nav-label">' + g.label + '</span>' + icon('chevDown', 14, 'chev') + '</button>' +
        '<div class="nav-sub">' + subs + '</div></div>';
    }).join('');

    /* Painel lateral secundário (azul-claro) com os itens "more" de cada grupo */
    var flyouts = MENU.filter(function (g) { return g.children && g.children.some(function (c) { return c.more; }); }).map(function (g) {
      return '<div class="flyout-body" data-flyout-body="' + g.id + '" hidden>' +
        '<div class="flyout-head"><button type="button" class="btn btn-ghost btn-icon btn-sm flyout-back" aria-label="Voltar ao menu">' + icon('chevRight', 15) + '</button>' +
          '<div><p class="flyout-kicker">' + esc(g.label) + '</p><p class="flyout-title">' + esc(g.moreLabel || 'Mais') + '</p></div>' +
          '<button type="button" class="btn btn-ghost btn-icon btn-sm flyout-close" aria-label="Fechar painel">' + icon('x', 15) + '</button></div>' +
        g.children.filter(function (c) { return c.more; }).map(function (c) {
          if (c.section) return '<p class="flyout-section">' + c.section + '</p>';
          return '<a href="' + c.route + '" data-route="' + c.route + '">' + c.label + icon('chevRight', 14, 'chev-r') + '</a>';
        }).join('') + '</div>';
    }).join('');

    /* Dois blocos separados: o painel principal (empresa + menu) e, abaixo, o bloco do PDV */
    return '<aside class="sidebar" id="sidebar" aria-label="Menu principal">' +
      '<div class="sidebar-panel">' +
        '<button type="button" class="company" title="Trocar empresa">' +
          '<span class="company-icon">' + icon('building', 20) + '</span>' +
          '<span class="company-meta"><span class="company-label">Empresa ativa</span><span class="company-name">' + esc(D.empresa.nome) + '</span></span>' +
          icon('chevDown', 14, 'chev') + '</button>' +
        '<nav class="nav">' + nav + '</nav>' +
        AvanteDeco('line', 'deco-sidebar') +
      '</div>' +
      '<div class="flyout" id="flyout" aria-label="Mais opções do menu">' + flyouts + '</div>' +
      '<div class="sidebar-foot"><a class="pdv-launch" href="#/transicao/pdv" title="Abrir PDV (Alt+1)">' +
        '<span class="pdv-launch-icon">' + icon('monitor', 19) + '</span>' +
        '<span class="lbl"><span class="pdv-launch-title">Abrir PDV</span></span>' +
        '<span class="pdv-launch-arrow" aria-hidden="true">' + icon('arrowRight', 17) + '</span></a></div>' +
    '</aside>';
  }

  function palette() {
    return '<div class="overlay" id="palette" hidden><div class="palette" role="dialog" aria-modal="true" aria-label="Buscar no ERP">' +
      '<label class="palette-input">' + icon('search', 16) + '<input id="palette-q" type="text" placeholder="Buscar telas e ações…" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="palette-list"/><span class="kbd">Esc</span></label>' +
      '<div class="palette-list" id="palette-list" role="listbox"></div></div></div>';
  }

  root.innerHTML = '<div id="app-shell">' + topbar() + '<div class="shell" id="shell">' + sidebar() + '<div class="scrim" id="scrim"></div><main class="main" id="main" tabindex="-1"></main></div></div>' +
    '<div id="full" hidden></div>' + palette();

  var appShell = document.getElementById('app-shell');
  var full = document.getElementById('full');
  var shell = document.getElementById('shell');
  var main = document.getElementById('main');
  var isMobile = function () { return window.matchMedia('(max-width: 1023px)').matches; };

  /* ---------- Menu lateral ---------- */
  document.querySelectorAll('.nav-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.parentElement.getAttribute('data-group');
      if (shell.classList.contains('is-collapsed') && !isMobile()) { shell.classList.remove('is-collapsed'); open[id] = true; }
      else open[id] = !open[id];
      syncGroups();
    });
  });
  function syncGroups() {
    document.querySelectorAll('.nav-group[data-group]').forEach(function (g) {
      var on = !!open[g.getAttribute('data-group')];
      g.classList.toggle('is-open', on);
      g.querySelector('.nav-toggle').setAttribute('aria-expanded', String(on));
    });
  }
  /* ---------- Painel lateral secundário ---------- */
  var flyout = document.getElementById('flyout');
  var flyoutOpen = null;
  function setFlyout(id) {
    flyoutOpen = id;
    shell.classList.toggle('has-flyout', !!id);
    document.querySelectorAll('[data-flyout-body]').forEach(function (b) { b.hidden = b.getAttribute('data-flyout-body') !== id; });
    document.querySelectorAll('.nav-more').forEach(function (b) {
      var on = b.getAttribute('data-flyout') === id;
      b.classList.toggle('is-open', on);
      b.setAttribute('aria-expanded', String(on));
    });
    if (id) { var f = flyout.querySelector('[data-flyout-body="' + id + '"] a'); if (f) f.focus({ preventScroll: true }); }
  }
  window.closeFlyout = function () { if (flyoutOpen) setFlyout(null); };
  document.querySelectorAll('.nav-more').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      var id = b.getAttribute('data-flyout');
      setFlyout(flyoutOpen === id ? null : id);
    });
  });
  flyout.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.closest('.flyout-close, .flyout-back')) setFlyout(null);
  });
  document.addEventListener('click', function (e) { if (flyoutOpen && !e.target.closest('#flyout, .nav-more')) setFlyout(null); });

  document.getElementById('toggle-nav').addEventListener('click', function () {
    if (isMobile()) shell.classList.toggle('is-drawer-open');
    else shell.classList.toggle('is-collapsed');
  });
  document.getElementById('scrim').addEventListener('click', function () { shell.classList.remove('is-drawer-open'); });

  /* ---------- Menus suspensos ---------- */
  function dropdown(btnId, menuId) {
    var btn = document.getElementById(btnId), menu = document.getElementById(menuId);
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = menu.hidden;
      closeMenus();
      menu.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) { var f = menu.querySelector('.menu-item'); if (f) f.focus(); }
    });
  }
  function closeMenus() {
    document.querySelectorAll('.menu-pop').forEach(function (m) { m.hidden = true; });
    document.querySelectorAll('[aria-haspopup="menu"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
  }
  dropdown('create-btn', 'create-menu');
  dropdown('user-btn', 'user-menu');
  document.addEventListener('click', function (e) {
    closeMenus();
    var ov = e.target.classList && e.target.classList.contains('modal-overlay') ? e.target : null;
    if (ov) location.hash = ov.getAttribute('data-close');
  });
  document.getElementById('theme-toggle').addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('avante-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
    render();
  });
  try { if (localStorage.getItem('avante-theme') === 'dark') document.documentElement.classList.add('dark'); } catch (e) {}

  /* ---------- Paleta Ctrl K ---------- */
  var pal = document.getElementById('palette'), q = document.getElementById('palette-q'), list = document.getElementById('palette-list');
  var items = CREATE_ACTIONS.map(function (a) { return { label: a.label, hint: 'Ação', route: a.create || a.route, icon: a.icon }; })
    .concat(ROUTES.map(function (r) { return { label: r.label, hint: r.group || 'Tela', route: r.route, icon: r.icon }; }));
  var sel = 0, shown = [];
  function norm(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
  function drawPalette() {
    var t = norm(q.value.trim());
    shown = items.filter(function (i) { return !t || norm(i.label + ' ' + i.hint).indexOf(t) >= 0; });
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    list.innerHTML = shown.length ? shown.map(function (i, k) {
      return '<button type="button" class="palette-item" role="option" data-k="' + k + '" aria-selected="' + (k === sel) + '">' + icon(i.icon, 15) + i.label + '<small>' + i.hint + '</small></button>';
    }).join('') : '<p class="palette-empty">Nada encontrado para “' + esc(q.value) + '”.</p>';
    var cur = list.querySelector('[aria-selected="true"]'); if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  function openPalette() { pal.hidden = false; q.value = ''; sel = 0; drawPalette(); q.focus(); }
  function closePalette() { pal.hidden = true; }
  function go(route) { closePalette(); location.hash = route; }
  document.getElementById('open-palette').addEventListener('click', openPalette);
  pal.addEventListener('click', function (e) { if (e.target === pal) closePalette(); });
  q.addEventListener('input', function () { sel = 0; drawPalette(); });
  list.addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b) go(shown[+b.getAttribute('data-k')].route); });
  q.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, shown.length - 1); drawPalette(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); drawPalette(); e.preventDefault(); }
    else if (e.key === 'Enter' && shown[sel]) go(shown[sel].route);
  });

  /* ---------- Teclado global ---------- */
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.hidden ? openPalette() : closePalette(); return; }
    if (e.key === 'Escape') {
      if (!pal.hidden) { closePalette(); return; }
      if (flyoutOpen) { setFlyout(null); return; }
      var ov = document.querySelector('.modal-overlay');
      if (ov) { location.hash = ov.getAttribute('data-close'); return; }
      closeMenus(); shell.classList.remove('is-drawer-open'); return;
    }
    if (e.altKey && !e.ctrlKey && /^[1-9]$/.test(e.key)) {
      var a = CREATE_ACTIONS.filter(function (x) { return x.key === e.key; })[0];
      if (a) { e.preventDefault(); location.hash = a.create || a.route; }
    }
  });

  /* ---------- Rotas ---------- */
  function missing(path) {
    return UI.page(UI.pageHeader({ title: 'Tela não encontrada', sub: 'A rota <span class="mono">' + esc(path) + '</span> não existe.' }) +
      UI.card({ body: UI.emptyState({ icon: 'alert', title: 'Não encontramos esta tela.', actions: [UI.btn({ label: 'Voltar ao Painel', href: '#/painel', icon: 'grid' })] }) }));
  }

  function setActive(navPath) {
    var r = ROUTES.filter(function (x) { return x.route === navPath; })[0];
    document.querySelectorAll('[data-route]').forEach(function (a) {
      var on = a.getAttribute('data-route') === navPath;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.querySelectorAll('.nav-group[data-group]').forEach(function (g) {
      var has = !!r && g.getAttribute('data-group') === r.groupId;
      g.classList.toggle('has-active', has);
      if (has) open[r.groupId] = true;
    });
    document.querySelectorAll('.nav-more').forEach(function (b) {
      b.classList.toggle('has-active', !!flyout.querySelector('[data-flyout-body="' + b.getAttribute('data-flyout') + '"] a.is-active'));
    });
    syncGroups();
    return r;
  }

  var lastPath = null;
  function render() {
    var cur = Router.current();
    var def = SCREENS[cur.path];
    if (!location.hash) { location.replace('#/painel'); return; }
    var layout = def && def.layout || 'app';
    var target = layout === 'app' ? main : full;
    appShell.hidden = layout !== 'app';
    full.hidden = layout === 'app';
    full.className = layout === 'pdv' ? 'theme-pdv layout-pdv' : 'bare';

    var r = setActive(def && def.nav || cur.path);
    document.title = (def && def.title || (r && r.label) || 'Avante') + ' · Avante ERP';
    if (cur.path !== lastPath) { shell.classList.remove('is-drawer-open'); setFlyout(null); }
    if (cur.query.menu && document.querySelector('[data-flyout-body="' + cur.query.menu + '"]')) setFlyout(cur.query.menu);

    try {
      if (!def) target.innerHTML = missing(cur.path);
      else if (def.mount) def.mount(target, cur.query);
      else target.innerHTML = def.render(cur.query);
      if (def && def.after) def.after(target, cur.query);
    } catch (err) {
      console.error(err);
      target.innerHTML = UI.page(UI.card({ body: UI.emptyState({ icon: 'alert', title: 'Não foi possível carregar esta tela.', text: esc(err.message), actions: [UI.btn({ label: 'Tentar novamente', href: location.hash })] }) }));
    }

    if (cur.path !== lastPath) { window.scrollTo(0, 0); lastPath = cur.path; }
    var dlg = target.querySelector('.modal');
    if (dlg) { var f = dlg.querySelector('input, select, textarea, button:not(.btn-ghost)'); if (f) f.focus({ preventScroll: true }); }
  }
  window.renderApp = render;

  window.addEventListener('hashchange', render);
  window.addEventListener('DOMContentLoaded', render);
  if (document.readyState !== 'loading') setTimeout(render, 0);
})();
