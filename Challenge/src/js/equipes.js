// Link ativo
    function setActiveFromHash() {
      const route = (location.hash.replace('#/', '') || 'equipes').toLowerCase();
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      const current = document.querySelector(`.nav-link[data-route="${route}"]`);
      if (current) current.classList.add('active');
    }
    window.addEventListener('hashchange', setActiveFromHash);
    if (!location.hash) location.hash = '';
    setActiveFromHash();

    // Tabs
    const btns = document.querySelectorAll('.tab-btn');
    const gridSelecoes = document.getElementById('grid-selecoes');
    const gridClubes = document.getElementById('grid-clubes');

    function selectTab(key) {
      btns.forEach(b => b.classList.remove('bg-white', 'text-brand-700', 'font-semibold'));
      btns.forEach(b => b.classList.add('text-slate-600', 'font-medium'));
      const active = document.querySelector(`.tab-btn[data-tab="${key}"]`);
      active.classList.add('bg-white', 'text-brand-700', 'font-semibold');
      active.classList.remove('text-slate-600', 'font-medium');

      if (key === 'selecoes') { gridSelecoes.classList.remove('hidden'); gridClubes.classList.add('hidden'); }
      else { gridSelecoes.classList.add('hidden'); gridClubes.classList.remove('hidden'); }
    }
    btns.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
    selectTab('selecoes');

    // Contadores animados
    function animateCounter(el) {
      const target = +el.dataset.value;
      let cur = 0;
      const step = Math.max(1, Math.floor(target / 50));
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = target >= 1000 ? cur.toLocaleString('pt-BR') : cur;
      }, 16);
      el.classList.add('animate-countup');
    }
    document.querySelectorAll('.counter').forEach(animateCounter);