
(() => {
  const API = 'https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=';

  // --- Helpers ---
  const strip = (s) => (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

  const aliases = {
    'brasil': [
      'Brazil', 'Brasil', 'Brazil National Team',
      'Selecao Brasileira', 'Seleção Brasileira', 'Brazil WNT', 'Brazil Women'
    ],
    'argentina': [
      'Argentina', 'Argentina National Team',
      'Seleccion Argentina', 'Selección Argentina', 'Argentina WNT', 'Argentina Women'
    ],
    'estados unidos': [
      'United States', 'USA', 'US', 'United States National Team',
      'USWNT', 'United States Women'
    ]
  };

  const countryMatch = (t, countryKey) => {
    const c = strip(t.strCountry || '');
    if (!c) return 0;
  
    const wanted = countryKey === 'estados unidos' ? ['united states', 'usa', 'us'] : [countryKey];
    return wanted.includes(c) ? 2 : 0;
  };

  const isNational = (t) => {
    const name = strip(t.strTeam || '');
    const alt = strip(t.strAlternate || '');
    const league = strip(t.strLeague || '');
    const gender = strip(t.strGender || '');
    let score = 0;
    if (/national/.test(name) || /national/.test(alt) || /national/.test(league)) score += 2;
    if (gender === 'male' || gender === 'female' || gender === '') score += 1; 
    return score;
  };

  async function fetchCrestByCountry(countryName) {
    const key = strip(countryName);
    const candidates = [
      countryName,
      ...(aliases[key] || []),
      countryName.normalize('NFD').replace(/\p{Diacritic}/gu, '')
    ].filter(Boolean);

    for (const q of [...new Set(candidates)]) {
      try {
        const res = await fetch(API + encodeURIComponent(q));
        if (!res.ok) continue;
        const json = await res.json();
        const teams = (json && json.teams) || [];
        if (!teams.length) continue;

       
        const withBadge = teams.filter(t => t.strBadge || t.strTeamBadge || t.strLogo);
        if (!withBadge.length) continue;

        
        const scored = withBadge
          .map(t => {
            const badge = t.strBadge || t.strTeamBadge || t.strLogo;
            const sNameEq = strip(t.strTeam || '') === strip(q) ? 2 : 0;
            const sNat = isNational(t);
            const sCountry = countryMatch(t, key);
         
            const sExactCountryName = ['brazil','argentina','united states'].includes(strip(t.strTeam || '')) ? 1 : 0;
            return { t, badge, score: sNameEq + sNat + sCountry + sExactCountryName };
          })
          .sort((a, b) => b.score - a.score);

        if (scored[0] && scored[0].badge) return scored[0].badge;
      } catch (e) {
   
      }
    }
    return null;
  }


  function putCrestInCard(articleEl, badgeUrl, countryName) {

    const initialBox = articleEl.querySelector('.flex.items-start.gap-4 > :first-child');
    if (!initialBox) return;

 
    initialBox.innerHTML = '';
    initialBox.classList.add('bg-white', 'p-1'); 
    initialBox.style.background = 'white';       

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `Escudo da seleção ${countryName}`;
    img.src = badgeUrl;
    
    img.className = 'h-12 w-12 object-contain';
    initialBox.appendChild(img);
  }

  async function hydrateNationalCrests() {
    const cards = document.querySelectorAll('#grid-selecoes article.team-card');
    for (const card of cards) {
      const nameEl = card.querySelector('h3');
      if (!nameEl) continue;
      const countryName = nameEl.textContent.trim();
      if (!countryName) continue;

      const badge = await fetchCrestByCountry(countryName);
      if (badge) {
        putCrestInCard(card, badge, countryName);
      } else {
        // Sem badge: mantém o fallback (iniciais) como está.
        // Se quiser, dá pra usar bandeira como fallback (countryflagsapi) — é só avisar.
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateNationalCrests);
  } else {
    hydrateNationalCrests();
  }
})();

