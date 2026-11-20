/* Acesso e navegação: login, boas-vindas, transições ERP ↔ PDV, aviso de alterações não salvas. */
(function () {
  var D = window.DATA;
  var R = 'referencias/', F = 'referencias/ContabilSemdados/MaisDoFinanceiro/';

  /* ---------- Login (Avante_Tela Login) ---------- */
  screen('#/login', {
    layout: 'bare', title: 'Entrar',
    render: function () {
      return '<div class="auth">' +
        '<aside class="auth-art" aria-hidden="true">' +
          '<div class="auth-art-inner">' + AvanteLogo() +
            '<p class="auth-claim">ERP e PDV na nuvem para vender, controlar o estoque e acompanhar o financeiro no mesmo lugar.</p>' +
            '<ul class="auth-points">' +
              '<li>' + icon('cart', 16) + 'Venda registrada no PDV</li>' +
              '<li>' + icon('box', 16) + 'Estoque atualizado</li>' +
              '<li>' + icon('wallet', 16) + 'Entradas e saídas no financeiro</li>' +
            '</ul></div></aside>' +
        '<main class="auth-main"><form class="auth-form" onsubmit="location.hash=\'#/transicao/erp\';return false">' +
          '<span class="auth-lock">' + icon('user', 18) + '</span>' +
          '<h1 class="auth-title">Entre na sua conta</h1>' +
          '<div class="form-grid">' +
            UI.field({ label: 'E-mail ou usuário', type: 'email', placeholder: 'voce@empresa.com.br', required: true }) +
            '<div class="field" style="grid-column: span 12"><div class="row"><label class="label" for="senha">Senha<span class="req">*</span></label><span class="spacer"></span><a class="btn btn-link" href="#/login">Esqueci minha senha</a></div>' +
              '<input class="input" id="senha" type="password" required/></div>' +
            UI.field({ type: 'checkbox', label: 'Manter conectado neste aparelho', help: 'Use esta opção só em um aparelho de confiança.' }) +
          '</div>' +
          '<div class="captcha">' + icon('check', 16) + '<span>Verificação de segurança</span></div>' +
          UI.btn({ label: 'Entrar', variant: 'primary', type: 'submit', icon: 'arrowRight', cls: 'btn-block btn-lg' }) +
          '<div class="info">' + icon('chat', 16) + '<div><strong>Problemas com seu acesso?</strong><br/>Peça ao responsável pela empresa para conferir seu cadastro.</div></div>' +
        '</form></main></div>';
    }
  });
  print(R + 'Avante_Tela Login.png', '#/login', 'Login');

  /* ---------- Transições (tela de carregamento) ---------- */
  function transition(kind) {
    var pdv = kind === 'pdv';
    return '<div class="splash' + (pdv ? ' theme-pdv' : '') + '" role="status" aria-live="polite">' +
      '<span class="splash-mark">' + LogoMark() + '</span>' +
      '<p class="splash-title">Avante ' + (pdv ? 'PDV' : 'ERP') + '</p>' +
      '<p class="splash-sub">' + (pdv ? 'Abrindo o ponto de venda' : 'Carregando seu espaço') + '</p>' +
      '<span class="splash-bar"><span></span></span></div>';
  }
  var timer;
  screen('#/transicao/pdv', {
    layout: 'bare', title: 'Abrindo o PDV', render: function () { return transition('pdv'); },
    after: function (el, q) { clearTimeout(timer); if (q.parar == null) timer = setTimeout(function () { location.hash = '#/pdv'; }, 900); }
  });
  screen('#/transicao/erp', {
    layout: 'bare', title: 'Carregando', render: function () { return transition('erp'); },
    after: function (el, q) { clearTimeout(timer); if (q.parar == null) timer = setTimeout(function () { location.hash = '#/painel'; }, 900); }
  });
  print(F + 'Avante_TelaDeTransicaoDoERPParaOPDV.png', '#/transicao/pdv?parar=1', 'Transição ERP → PDV');
  print(F + 'Avante_TelaDeTransiçãoDoPdVParaERP.png', '#/transicao/erp?parar=1', 'Transição PDV → ERP');

  /* ---------- Boas-vindas (Avante_Primeira_info_q_aparece_quando_abro) ---------- */
  window.WelcomeModal = function () {
    function side(o) {
      return '<div class="welcome-card ' + o.cls + '">' +
        '<div class="row"><span class="sc-icon ' + o.tone + '">' + icon(o.icon, 15) + '</span><span class="block-sub">' + o.label + '</span></div>' +
        '<p class="welcome-value num">' + brl(0) + '</p>' +
        '<div class="total-line num"><span>Hoje</span><span>' + brl(0) + '</span></div>' +
        '<div class="total-line num"><span>Em atraso</span><span>' + brl(0) + '</span></div></div>';
    }
    return UI.modal({
      title: 'Hoje na sua empresa', sub: esc(D.empresa.nome), size: 'md', closeHref: '#/painel',
      body: '<div class="grid-2">' + side({ label: 'A receber', icon: 'arrowIn', tone: 't-receive', cls: 'is-in' }) + side({ label: 'A pagar', icon: 'arrowOut', tone: 't-pay', cls: 'is-out' }) + '</div>',
      secondary: false, footLeft: '<span class="block-sub">Resumo exibido ao entrar no sistema.</span>',
      primary: 'Continuar'
    });
  };
  print(R + 'Avante_Primeira_info_q_aparece_quando_abro.png', '#/painel?modal=boas-vindas', 'Boas-vindas');

  /* ---------- Menu lateral (prints de referência do menu) ---------- */
  print(F + 'Avante_funcoes.png', '#/painel', 'Menu lateral (parte 1)');
  print(F + 'Avante_Funcoes02.png', '#/financeiro', 'Menu lateral (parte 2)');

  /* ---------- Aviso de alterações não salvas (reutilizável) ---------- */
  window.UnsavedBar = function (closeHref) {
    return '<div class="unsaved" role="alert">' + icon('alert', 16) + '<p><strong>Há alterações não salvas.</strong> Deseja descartá-las?</p>' +
      '<div class="head-actions">' + UI.btn({ label: 'Continuar editando', href: UI.href({ sair: null }) }) +
      UI.btn({ label: 'Descartar e fechar', variant: 'danger-outline', href: closeHref }) + '</div></div>';
  };
})();
