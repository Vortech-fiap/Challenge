function setActiveFromHash() {
      const route = (location.hash.replace('#/', '') || 'noticias').toLowerCase();
      document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
      const current = document.querySelector(`.nav-link[data-route="${route}"]`);
      if (current) current.classList.add('active');
    }
    window.addEventListener('hashchange', setActiveFromHash);

    document.addEventListener('DOMContentLoaded', () => {
      if (!location.hash) location.hash = '';
      setActiveFromHash();

      // filtro por chips
      const chips = document.querySelectorAll('#chips .chip');
      const cards = document.querySelectorAll('.news-card');
      let activeTag = null;

      function applyFilter() {
        cards.forEach(card => {
          if (!activeTag) return card.classList.remove('hidden');
          const tags = (card.dataset.tags || '').toLowerCase();
          card.classList.toggle('hidden', !tags.includes(activeTag));
        });
      }

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          if (activeTag === chip.dataset.tag) {
            activeTag = null;
          } else {
            chip.classList.add('active');
            activeTag = chip.dataset.tag.toLowerCase();
          }
          applyFilter();
        });
      });

      document.getElementById('clearFilter').addEventListener('click', () => {
        activeTag = null; chips.forEach(c => c.classList.remove('active')); applyFilter();
      });
    });