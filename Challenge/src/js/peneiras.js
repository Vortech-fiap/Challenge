const sidebar = document.getElementById('sidebar');
const btnMenu = document.getElementById('btnMenu');
if (btnMenu) btnMenu.addEventListener('click', () => {
    sidebar.classList.toggle('hidden'); sidebar.classList.toggle('fixed');
    sidebar.classList.toggle('inset-0'); sidebar.classList.toggle('z-50'); sidebar.classList.toggle('p-6');
});

 // Link ativo
    function setActiveFromHash() {
      const route = (location.hash.replace('#/', '') || 'peneiras').toLowerCase();
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      document.querySelector(`.nav-link[data-route="${route}"]`)?.classList.add('active');
    }
    window.addEventListener('hashchange', setActiveFromHash);
    if (!location.hash) location.hash = '';
    setActiveFromHash();

    // Tabs
    const btnTabs = document.querySelectorAll('.tab-btn');
    const secLista = document.getElementById('lista');
    const secMinhas = document.getElementById('minhas');
    btnTabs.forEach(b => b.addEventListener('click', () => {
      btnTabs.forEach(x => x.classList.remove('bg-white', 'text-brand-700', 'font-semibold'));
      btnTabs.forEach(x => x.classList.add('text-slate-600', 'font-medium'));
      b.classList.add('bg-white', 'text-brand-700', 'font-semibold');
      b.classList.remove('text-slate-600', 'font-medium');
      const tab = b.dataset.tab;
      secLista.classList.toggle('hidden', tab !== 'disponiveis');
      secMinhas.classList.toggle('hidden', tab !== 'minhas');
      if (tab === 'minhas') renderMinhas();
    }));
    // default
    btnTabs[0].click();

    // Busca e filtros
    const busca = document.getElementById('busca');
    const chips = document.querySelectorAll('.chip');
    const cards = document.querySelectorAll('.peneira-card');
    let filtros = new Set();
    function aplicarFiltros() {
      const q = (busca.value || '').toLowerCase();
      cards.forEach(c => {
        const tags = (c.dataset.tags || '').toLowerCase();
        const matchesText = !q || tags.includes(q);
        const matchesChips = !filtros.size || [...filtros].every(f => tags.includes(f.toLowerCase()));
        c.classList.toggle('hidden', !(matchesText && matchesChips));
      });
    }
    busca.addEventListener('input', aplicarFiltros);
    chips.forEach(ch => ch.addEventListener('click', () => {
      ch.classList.toggle('active');
      const v = ch.dataset.filter;
      if (ch.classList.contains('active')) filtros.add(v); else filtros.delete(v);
      aplicarFiltros();
    }));
    document.getElementById('limparFiltros').addEventListener('click', () => {
      busca.value = ''; filtros.clear(); chips.forEach(c => c.classList.remove('active')); aplicarFiltros();
    });

    // Toast
    function toast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg; el.classList.remove('hidden');
      setTimeout(() => el.classList.add('hidden'), 1800);
    }

    // Abrir formulário preenchendo título
    const formWrap = document.getElementById('formWrap');
    const formTitle = document.getElementById('formTitle');
    let currentEvent = null;
    document.querySelectorAll('.inscrever').forEach((btn, i) => {
      btn.addEventListener('click', (ev) => {
        const card = ev.target.closest('.peneira-card');
        const nome = card.querySelector('h3').textContent;
        formTitle.textContent = `Inscrição — ${nome}`;
        currentEvent = nome;
        formWrap.classList.remove('hidden');
        document.getElementById('formPeneira').scrollIntoView({ behavior: 'smooth', block: 'start' });
        resetForm();
        loadDraft();
      });
    });
    document.getElementById('btnFecharForm').addEventListener('click', () => formWrap.classList.add('hidden'));

    // Multi-steps
    const steps = [...document.querySelectorAll('.step')];
    const panes = [...document.querySelectorAll('.step-pane')];
    const btnVoltar = document.getElementById('btnVoltar');
    const btnProx = document.getElementById('btnProximo');
    const btnEnviar = document.getElementById('btnEnviar');
    let idx = 0;
    function updateSteps() {
      steps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      panes.forEach((p, i) => p.classList.toggle('hidden', i !== idx));
      btnVoltar.disabled = idx === 0;
      btnProx.classList.toggle('hidden', idx === panes.length - 1);
      btnEnviar.classList.toggle('hidden', idx !== panes.length - 1);
      if (idx === panes.length - 1) montarResumo();
    }
    btnVoltar.addEventListener('click', () => { if (idx > 0) { idx--; updateSteps(); } });
    btnProx.addEventListener('click', () => {
      // validações simples por step
      if (idx === 0) {
        const f = form.elements;
        if (!f.nome.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value)) { toast('Preencha nome e email válidos.'); return; }
      }
      if (idx === 2) {
        const f = form.elements;
        if (!f.termos.checked || !f.autorizo.checked) { toast('Aceite os termos e autorizações.'); return; }
      }
      idx++; updateSteps();
    });

    const form = document.getElementById('formPeneira');
    updateSteps();

    // Toggle responsável quando <18
    form.elements['idade'].addEventListener('input', (e) => {
      const show = parseInt(e.target.value || '0', 10) < 18;
      document.getElementById('responsavel').classList.toggle('hidden', !show);
    });

    // Rascunho
    const btnRascunho = document.getElementById('btnRascunho');
    btnRascunho.addEventListener('click', saveDraft);
    function draftKey() { return 'ff_peneira_draft_' + (currentEvent || 'event'); }
    function saveDraft() {
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem(draftKey(), JSON.stringify(data));
      toast('Rascunho salvo ✅');
    }
    function loadDraft() {
      const raw = localStorage.getItem(draftKey());
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        Object.keys(data).forEach(k => { if (form.elements[k]) form.elements[k].value = data[k]; });
        // checkboxes
        ['termos', 'autorizo'].forEach(k => form.elements[k] && (form.elements[k].checked = data[k] === 'on' || data[k] === true));
        document.getElementById('responsavel').classList.toggle('hidden', !(parseInt(form.elements['idade'].value || '0', 10) < 18));
        toast('Rascunho carregado ⏪');
      } catch (e) { }
    }
    function resetForm() {
      form.reset(); idx = 0; updateSteps();
      document.getElementById('responsavel').classList.add('hidden');
    }

    // Resumo
    function montarResumo() {
      const d = Object.fromEntries(new FormData(form).entries());
      const html = `
        <div class="grid gap-2 md:grid-cols-2">
          <div><b>Nome:</b> ${d.nome || '-'}</div>
          <div><b>Email:</b> ${d.email || '-'}</div>
          <div><b>Telefone:</b> ${d.fone || '-'}</div>
          <div><b>Idade:</b> ${d.idade || '-'} • <b>Altura:</b> ${d.altura || '-'} cm</div>
          <div class="md:col-span-2"><b>Local:</b> ${d.local || '-'}</div>
          <div><b>Posição:</b> ${d.posicao || '-'}</div>
          <div><b>Pé:</b> ${d.pe || '-'}</div>
          <div><b>Clube atual:</b> ${d.clube || '-'}</div>
          <div><b>Disponibilidade:</b> ${d.turno || '-'}</div>
          <div class="md:col-span-2"><b>Links:</b> ${d.links || '-'}</div>
          ${(parseInt(d.idade || '0', 10) < 18) ?
          `<div class="md:col-span-2"><b>Responsável:</b> ${d.resp_nome || '-'} • ${d.resp_fone || '-'}</div>` : ''}
          <div class="md:col-span-2"><b>Evento:</b> ${currentEvent || '-'}</div>
        </div>`;
      document.getElementById('resumo').innerHTML = html;
    }

    // Envio (mock)
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.evento = currentEvent; data.ts = Date.now();
      const key = 'ff_peneiras_inscricoes';
      const list = JSON.parse(localStorage.getItem(key) || '[]');
      list.push(data); localStorage.setItem(key, JSON.stringify(list));
      localStorage.removeItem(draftKey());
      toast('Inscrição enviada! 🎉');
      formWrap.classList.add('hidden');
      renderMinhas(); btnTabs[1].click();
    });

    // Minhas inscrições
    function renderMinhas() {
      const key = 'ff_peneiras_inscricoes';
      const list = JSON.parse(localStorage.getItem(key) || '[]').sort((a, b) => b.ts - a.ts);
      const wrap = document.getElementById('listaMinhas');
      const vazio = document.getElementById('minhasVazio');
      wrap.innerHTML = '';
      if (!list.length) { vazio.classList.remove('hidden'); return; }
      vazio.classList.add('hidden');
      list.forEach(item => {
        const d = new Date(item.ts);
        const el = document.createElement('div');
        el.className = 'rounded-2xl border border-brand-100 bg-white/80 backdrop-blur p-4 hover:shadow-card transition';
        el.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs text-slate-500">Enviado em ${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR')}</p>
              <h4 class="font-extrabold text-brand-700">${item.evento}</h4>
              <p class="text-sm text-slate-700">${item.nome} • ${item.email} • ${item.posicao || '-'}</p>
            </div>
            <button class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50">Baixar recibo</button>
          </div>`;
        wrap.appendChild(el);
      });
    }