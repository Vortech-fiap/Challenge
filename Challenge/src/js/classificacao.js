   // Link ativo
    function setActiveFromHash() {
      const route = (location.hash.replace('#/', '') || 'classificacao').toLowerCase();
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      const current = document.querySelector(`.nav-link[data-route="${route}"]`);
      if (current) current.classList.add('active');
    }
    window.addEventListener('hashchange', setActiveFromHash);
    if (!location.hash) location.hash = '#/classificacao';
    setActiveFromHash();

    
    // Tabs
    const btns = document.querySelectorAll('.tab-btn');
    const secBr = document.getElementById('tbl-brasileirao');
    const secLib = document.getElementById('tbl-libertadores');
    const secRank = document.getElementById('tbl-ranking');
    function selectTab(key) {
      btns.forEach(b => b.classList.remove('bg-white', 'text-brand-700', 'font-semibold'));
      btns.forEach(b => b.classList.add('text-slate-600', 'font-medium'));
      const active = document.querySelector(`.tab-btn[data-tab="${key}"]`);
      active.classList.add('bg-white', 'text-brand-700', 'font-semibold');
      active.classList.remove('text-slate-600', 'font-medium');

      secBr.classList.toggle('hidden', key !== 'brasileirao');
      secLib.classList.toggle('hidden', key !== 'libertadores');
      secRank.classList.toggle('hidden', key !== 'ranking');
    }
    btns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
    selectTab('brasileirao');

    // Contadores animados (suporta sufixo e decimais)
    function animateCounter(el) {
      const target = parseFloat(el.dataset.value);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const steps = 50;
      const inc = target / steps;
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = cur.toFixed(decimals) + suffix;
      }, 16);
      el.classList.add('animate-countup');
    }
    document.querySelectorAll('.counter').forEach(animateCounter);