/*
 * Componentes reutilizáveis do Avante ERP (retornam HTML).
 * PageHeader, FilterBar, DataTable, EmptyState, FormSection, Field, Tabs, Modal, Kpi, Card, Badge.
 * Estados de tela (aba, modal, busca) vivem na URL: #/rota?tab=x&modal=y
 */
window.UI = (function () {
  function attrs(o) {
    if (!o) return '';
    return Object.keys(o).map(function (k) { return o[k] === true ? ' ' + k : (o[k] == null || o[k] === false ? '' : ' ' + k + '="' + esc(o[k]) + '"'); }).join('');
  }

  /* Monta um link de estado mantendo a rota atual: UI.href({ modal: 'novo' }) */
  function href(params, base) {
    var cur = window.Router ? Router.current() : { path: '#/painel', query: {} };
    var path = base || cur.path;
    var q = base ? {} : Object.assign({}, cur.query);
    Object.keys(params || {}).forEach(function (k) { if (params[k] == null) delete q[k]; else q[k] = params[k]; });
    var s = Object.keys(q).map(function (k) { return k + '=' + encodeURIComponent(q[k]); }).join('&');
    return path + (s ? '?' + s : '');
  }

  function btn(o) {
    var cls = 'btn btn-' + (o.variant || 'outline') + (o.size ? ' btn-' + o.size : '') + (o.cls ? ' ' + o.cls : '');
    var inner = (o.icon ? icon(o.icon, o.size === 'sm' ? 14 : 15) : '') + (o.label ? '<span>' + o.label + '</span>' : '') + (o.kbd ? '<span class="kbd">' + o.kbd + '</span>' : '');
    if (o.href) return '<a class="' + cls + '" href="' + o.href + '"' + attrs(o.attrs) + (o.label ? '' : ' aria-label="' + esc(o.aria || '') + '"') + '>' + inner + '</a>';
    return '<button type="' + (o.type || 'button') + '" class="' + cls + '"' + attrs(o.attrs) + (o.disabled ? ' disabled' : '') + (o.label ? '' : ' aria-label="' + esc(o.aria || '') + '"') + '>' + inner + '</button>';
  }

  function badge(tone, text, ic) { return '<span class="badge badge-' + tone + '">' + (ic ? icon(ic, 12) : '') + esc(text) + '</span>'; }

  function pageHeader(o) {
    return '<header class="page-head">' +
      '<div class="page-head-main">' +
        (o.crumbs && o.crumbs.length ? '<nav class="crumbs" aria-label="Você está em">' + o.crumbs.map(function (c, i) {
          return (i ? icon('chevRight', 12) : '') + (c.href ? '<a href="' + c.href + '">' + esc(c.label) + '</a>' : '<span>' + esc(c.label) + '</span>');
        }).join('') + '</nav>' : '') +
        '<h1 class="page-title">' + esc(o.title) + (o.badge || '') + '</h1>' +
        (o.sub ? '<p class="page-sub">' + o.sub + '</p>' : '') +
      '</div>' +
      (o.actions && o.actions.length ? '<div class="head-actions">' + o.actions.join('') + '</div>' : '') +
    '</header>';
  }

  function emptyState(o) {
    return '<div class="empty' + (o.center === false ? '' : ' is-center') + (o.compact ? ' is-compact' : '') + '">' +
      '<span class="empty-icon">' + icon(o.icon || 'inbox', 16) + '</span>' +
      '<p class="empty-title">' + o.title + '</p>' +
      (o.text ? '<p class="empty-text">' + o.text + '</p>' : '') +
      (o.actions && o.actions.length ? '<div class="empty-actions">' + o.actions.join('') + '</div>' : '') +
    '</div>';
  }

  /* ---------- Formulários ---------- */
  function field(f) {
    var id = f.id || ('f-' + Math.random().toString(36).slice(2, 8));
    var span = ' style="grid-column: span ' + (f.span || 12) + '"';
    var req = f.required ? '<span class="req" aria-hidden="true">*</span>' : '';
    var opt = f.optional ? '<span class="opt">(opcional)</span>' : '';
    var label = f.label ? '<label class="label" for="' + id + '">' + esc(f.label) + req + opt + '</label>' : '';
    var help = f.help ? '<p class="help">' + f.help + '</p>' : '';
    var ctl;
    var common = ' id="' + id + '"' + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '') + (f.required ? ' required' : '') + (f.disabled ? ' disabled' : '') + (f.readonly ? ' readonly' : '');
    switch (f.type) {
      case 'select':
        ctl = '<select class="input"' + common + '>' + (f.options || []).map(function (o) {
          var v = typeof o === 'string' ? o : o.label;
          return '<option' + (v === f.value ? ' selected' : '') + '>' + esc(v) + '</option>';
        }).join('') + '</select>'; break;
      case 'textarea':
        ctl = '<textarea class="input" rows="' + (f.rows || 3) + '"' + common + '>' + esc(f.value || '') + '</textarea>'; break;
      case 'checkbox':
        return '<div class="field field-check"' + span + '><label class="check"><input type="checkbox"' + common + (f.checked ? ' checked' : '') + '/><span>' + esc(f.label) + '</span></label>' + help + '</div>';
      case 'switch':
        return '<div class="field field-check"' + span + '><label class="switch"><input type="checkbox" role="switch"' + common + (f.checked ? ' checked' : '') + '/><span class="switch-ui"></span><span>' + esc(f.label) + '</span></label>' + help + '</div>';
      case 'money':
        ctl = '<div class="input-affix"><span>R$</span><input class="input num r" inputmode="decimal"' + common + ' value="' + esc(f.value == null ? '' : f.value) + '"/></div>'; break;
      case 'percent':
        ctl = '<div class="input-affix is-end"><input class="input num r" inputmode="decimal"' + common + ' value="' + esc(f.value == null ? '' : f.value) + '"/><span>%</span></div>'; break;
      case 'search':
        ctl = '<div class="input-affix"><span>' + icon('search', 14) + '</span><input class="input" type="search"' + common + ' value="' + esc(f.value || '') + '"/></div>'; break;
      case 'file':
        ctl = '<div class="dropzone">' + icon('image', 18) + '<span>' + esc(f.placeholder || 'Arraste o arquivo ou') + '</span>' + btn({ label: f.button || 'Selecionar arquivo', size: 'sm' }) + '</div>'; break;
      case 'static':
        ctl = '<p class="static' + (f.num ? ' num' : '') + '">' + (f.value || '—') + '</p>'; break;
      default:
        ctl = '<input class="input' + (f.num ? ' num' : '') + (f.align === 'right' ? ' r' : '') + '" type="' + (f.type || 'text') + '"' + common + ' value="' + esc(f.value == null ? '' : f.value) + '"/>';
    }
    return '<div class="field"' + span + '>' + label + ctl + help + '</div>';
  }

  function formSection(o) {
    return '<section class="form-section' + (o.collapsible ? ' is-collapsible' : '') + '">' +
      (o.collapsible
        ? '<details' + (o.open ? ' open' : '') + '><summary class="form-section-head"><span><span class="form-section-title">' + esc(o.title) + '</span>' + (o.desc ? '<span class="form-section-desc">' + o.desc + '</span>' : '') + '</span>' + icon('chevDown', 15, 'chev') + '</summary><div class="form-grid">' + o.fields.join('') + '</div></details>'
        : (o.title ? '<div class="form-section-head"><span><span class="form-section-title">' + esc(o.title) + '</span>' + (o.desc ? '<span class="form-section-desc">' + o.desc + '</span>' : '') + '</span>' + (o.aside || '') + '</div>' : '') +
          '<div class="form-grid">' + o.fields.join('') + '</div>') +
    '</section>';
  }

  /* ---------- Filtros ---------- */
  function filterBar(o) {
    var active = o.active || 0;
    return '<div class="card filter-bar">' +
      '<div class="filter-row">' +
        (o.search ? '<div class="filter-search">' + field({ type: 'search', placeholder: o.search, value: o.searchValue || '', span: 12 }) + '</div>' : '') +
        (o.fields || []).join('') +
        '<div class="filter-actions">' +
          (o.submit ? btn({ label: o.submit, variant: 'secondary' }) : '') +
          (o.more ? btn({ label: o.more, icon: 'sliders', variant: 'ghost', size: 'sm' }) : '') +
          btn({ label: 'Limpar filtros', variant: 'ghost', size: 'sm', cls: active ? '' : 'is-hidden' }) +
        '</div>' +
      '</div>' +
      (o.note ? '<p class="filter-note">' + o.note + '</p>' : '') +
    '</div>';
  }
  /* campo compacto para barra de filtros */
  function filter(label, options, value) {
    return '<label class="filter-field"><span>' + esc(label) + '</span><select class="input">' + options.map(function (o) { return '<option' + (o === value ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select></label>';
  }

  /* ---------- Tabela ---------- */
  function dataTable(o) {
    var cols = o.columns;
    var rows = o.rows || [];
    var head = '<thead><tr>' + (o.selectable ? '<th class="col-check"><input type="checkbox" aria-label="Selecionar todos"/></th>' : '') +
      cols.map(function (c) { return '<th class="' + (c.align === 'right' ? 'r' : c.align === 'center' ? 'c' : '') + '"' + (c.width ? ' style="width:' + c.width + '"' : '') + '>' + esc(c.label) + '</th>'; }).join('') +
      (o.actions ? '<th class="r col-actions">' + (o.actionsLabel || 'Ações') + '</th>' : '') + '</tr></thead>';
    var body;
    if (!rows.length) {
      var span = cols.length + (o.selectable ? 1 : 0) + (o.actions ? 1 : 0);
      body = '<tbody><tr class="is-empty"><td colspan="' + span + '">' + emptyState(o.empty || { title: 'Nenhum registro encontrado.' }) + '</td></tr></tbody>';
    } else {
      body = '<tbody>' + rows.map(function (r) {
        return '<tr>' + (o.selectable ? '<td class="col-check"><input type="checkbox" aria-label="Selecionar linha"/></td>' : '') +
          cols.map(function (c) {
            var v = typeof c.render === 'function' ? c.render(r) : esc(r[c.key] == null ? '—' : r[c.key]);
            return '<td class="' + (c.align === 'right' ? 'r' : c.align === 'center' ? 'c' : '') + (c.num ? ' num' : '') + '">' + v + '</td>';
          }).join('') +
          (o.actions ? '<td class="r col-actions"><div class="row-actions">' + o.actions(r) + '</div></td>' : '') + '</tr>';
      }).join('') + '</tbody>';
    }
    var foot = o.footer === false ? '' : '<div class="table-foot"><span class="num">' + (o.countLabel || (rows.length + (rows.length === 1 ? ' registro' : ' registros'))) + '</span>' + pager() + '</div>';
    return '<div class="card table-card">' + (o.toolbar ? '<div class="table-toolbar">' + o.toolbar + '</div>' : '') +
      '<div class="table-wrap"><table class="table">' + head + body + '</table></div>' + foot + '</div>';
  }
  function pager() {
    return '<div class="pager">' + btn({ label: 'Anterior', size: 'sm', disabled: true }) + '<span class="num">Página 1</span>' + btn({ label: 'Próxima', size: 'sm', disabled: true }) + '</div>';
  }

  /* ---------- Abas ---------- */
  function tabs(items, active, o) {
    o = o || {};
    return '<nav class="tabs' + (o.pills ? ' is-pills' : '') + '" role="tablist">' + items.map(function (t) {
      var on = t.id === active;
      return '<a role="tab" aria-selected="' + on + '" class="tab' + (on ? ' is-active' : '') + '" href="' + (t.href || href({ tab: t.id === items[0].id && !o.keepFirst ? null : t.id })) + '">' +
        (t.icon ? icon(t.icon, 14) : '') + esc(t.label) + (t.count != null ? '<span class="count num">' + t.count + '</span>' : '') + '</a>';
    }).join('') + '</nav>';
  }

  /* ---------- Cards ---------- */
  function card(o) {
    return '<section class="card' + (o.cls ? ' ' + o.cls : '') + '">' +
      (o.title ? '<div class="card-head"><h2 class="card-title">' + (o.icon ? icon(o.icon, 15) : '') + esc(o.title) + (o.badge || '') + '</h2>' + (o.actions ? '<div class="head-actions">' + o.actions.join('') + '</div>' : '') + '</div>' : '') +
      (o.body != null ? '<div class="card-body' + (o.flush ? ' is-flush' : '') + '">' + o.body + '</div>' : '') +
      (o.foot ? '<div class="card-foot">' + o.foot + '</div>' : '') +
    '</section>';
  }

  function kpi(o) {
    var isZero = o.zero != null ? o.zero : !o.raw;
    var tag = o.href ? 'a' : 'div';
    return '<' + tag + ' class="card kpi' + (o.tone ? ' kpi-' + o.tone : '') + '"' + (o.href ? ' href="' + o.href + '"' : '') + '>' +
      '<div class="kpi-top"><span>' + esc(o.label) + (o.help ? ' <span class="help-dot" title="' + esc(o.help) + '">?</span>' : '') + '</span>' + (o.icon ? icon(o.icon, 16) : '') + '</div>' +
      '<p class="kpi-value num' + (isZero && o.tone !== 'highlight' ? ' is-zero' : '') + '">' + o.value + '</p>' +
      (o.meta ? '<div class="kpi-meta num">' + o.meta + '</div>' : '') +
    '</' + tag + '>';
  }
  function kpis(list, cols) { return '<div class="kpis" style="grid-template-columns: repeat(' + (cols || list.length) + ', minmax(0, 1fr))">' + list.map(kpi).join('') + '</div>'; }

  /* ---------- Modal / painel lateral ---------- */
  function modal(o) {
    var close = o.closeHref || href({ modal: null, step: null, id: null });
    return '<div class="modal-overlay' + (o.size === 'sheet' ? ' is-sheet' : '') + '" data-close="' + close + '">' +
      '<div class="modal modal-' + (o.size || 'md') + '" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<header class="modal-head"><div><h2 class="modal-title" id="modal-title">' + esc(o.title) + '</h2>' + (o.sub ? '<p class="page-sub">' + o.sub + '</p>' : '') + '</div>' +
          '<a class="btn btn-ghost btn-icon" href="' + close + '" aria-label="Fechar">' + icon('x', 16) + '</a></header>' +
        (o.tabs ? '<div class="modal-tabs">' + o.tabs + '</div>' : '') +
        '<div class="modal-body">' + o.body + '</div>' +
        (o.footer !== false ? '<footer class="modal-foot">' + (o.footLeft || '<span></span>') + '<div class="head-actions">' +
          (o.right != null ? o.right :
            (o.secondary !== false ? '<a class="btn btn-outline" href="' + close + '">' + (o.cancel || 'Cancelar') + '</a>' : '') +
            (o.primary ? btn({ label: o.primary, variant: o.danger ? 'destructive' : 'primary', type: 'submit', kbd: o.primaryKbd }) : '')) +
        '</div></footer>' : '') +
      '</div></div>';
  }

  /* Confirmação destrutiva padrão */
  function confirm(o) {
    return modal({ title: o.title, size: 'sm', body: '<p class="confirm-text">' + o.text + '</p>', primary: o.action, danger: true, cancel: o.cancel || 'Voltar' });
  }

  function statusTabs(counts, active) {
    return tabs([
      { id: 'todos', label: 'Todos', count: counts.todos },
      { id: 'ativos', label: 'Ativos', count: counts.ativos },
      { id: 'arquivados', label: 'Arquivados', count: counts.arquivados }
    ].filter(function (t) { return t.count != null; }), active || 'todos');
  }

  function dl(items) {
    return '<dl class="dl">' + items.map(function (i) { return '<div><dt>' + esc(i[0]) + '</dt><dd' + (i[2] ? ' class="num"' : '') + '>' + (i[1] == null || i[1] === '' ? '—' : i[1]) + '</dd></div>'; }).join('') + '</dl>';
  }

  function section(title, body, o) {
    o = o || {};
    return '<section><div class="block-head"><h2 class="block-title">' + esc(title) + (o.count != null ? ' <span class="count num">' + o.count + '</span>' : '') + '</h2>' + (o.sub ? '<span class="block-sub">' + o.sub + '</span>' : '') + (o.actions ? '<div class="head-actions">' + o.actions.join('') + '</div>' : '') + '</div>' + body + '</section>';
  }

  function page(html) { return '<div class="page">' + html + '</div>'; }

  return {
    href: href, btn: btn, badge: badge, pageHeader: pageHeader, emptyState: emptyState,
    field: field, formSection: formSection, filterBar: filterBar, filter: filter,
    dataTable: dataTable, pager: pager, tabs: tabs, card: card, kpi: kpi, kpis: kpis,
    modal: modal, confirm: confirm, statusTabs: statusTabs, dl: dl, section: section, page: page
  };
})();

/* Registro de telas e de prints → URL (usado pelo roteador e pela verificação) */
window.SCREENS = {};
window.PRINTS = [];
window.screen = function (path, def) { window.SCREENS[path] = def; };
window.print = function (file, url, title) { window.PRINTS.push({ file: file, url: url, title: title }); };
