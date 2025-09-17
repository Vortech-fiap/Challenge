

    function setActiveFromHash() {
      const route = (location.hash.replace('#/', '') || 'inicio').toLowerCase();
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      const current = document.querySelector(`.nav-link[data-route="${route}"]`);
      if (current) current.classList.add('active');
    }

    // SPA-ish: só marca ativo por enquanto
    window.addEventListener('hashchange', setActiveFromHash);
    document.addEventListener('DOMContentLoaded', setActiveFromHash);





// PERFIL




    