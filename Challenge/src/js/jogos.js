// marca link ativo baseado no hash
    function setActiveFromHash() {
      const route = (location.hash.replace('#/', '') || 'jogos').toLowerCase();
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      const current = document.querySelector(`.nav-link[data-route="${route}"]`);
      if (current) current.classList.add('active');
    }
    window.addEventListener('hashchange', setActiveFromHash);
    document.addEventListener('DOMContentLoaded', () => {
      if (!location.hash) location.hash = '#/jogos';
      setActiveFromHash();

      // tabs filtro
      const buttons = document.querySelectorAll('.tab-btn');
      const cards = document.querySelectorAll('article[data-day], article[data-status]');
      function selectTab(key) {
        buttons.forEach(b => b.classList.remove('bg-white', 'text-brand-700', 'font-semibold'));
        buttons.forEach(b => b.classList.add('text-slate-600', 'font-medium'));
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${key}"]`);
        activeBtn.classList.add('bg-white', 'text-brand-700', 'font-semibold');
        activeBtn.classList.remove('text-slate-600', 'font-medium');

        cards.forEach(c => {
          const day = c.dataset.day;
          const status = c.dataset.status;
          let show = false;
          if (key === 'hoje') show = (day === 'hoje');
          if (key === 'amanha') show = (day === 'amanha');
          if (key === 'resultados') show = (status === 'resultado');
          c.classList.toggle('hidden', !show);
        });
      }
      buttons.forEach(b => b.addEventListener('click', () => selectTab(b.dataset.tab)));
      selectTab('hoje'); // default
    });
