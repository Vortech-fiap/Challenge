(() => {
  const API = 'https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=';

  // Cache pra evitar buscas repetidas
  const cache = new Map();

  // Remove acentos e normaliza
  const strip = (s) => (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

  // Aliases úteis p/ clubes BR
  const aliases = {
    'sao paulo': [
      'Sao Paulo', 'São Paulo', 'Sao Paulo FC',
      'São Paulo FC', 'Sao Paulo Futebol Clube'
    ],
    'palmeiras': [
      'Palmeiras', 'SE Palmeiras', 'Sociedade Esportiva Palmeiras'
    ],
    'corinthians': [
      'Corinthians', 'Corinthians Paulista',
      'SC Corinthians Paulista', 'Sport Club Corinthians Paulista'
    ],
    'flamengo': [
      'Flamengo', 'CR Flamengo', 'Clube de Regatas do Flamengo'
    ]
  };

  async function fetchBadge(teamName) {
    const key = strip(teamName);
    if (cache.has(key)) return cache.get(key);

    const candidates = [
      teamName,
      ...((aliases[key] || [])),
      // variação sem acentos
      teamName.normalize('NFD').replace(/\p{Diacritic}/gu, '')
    ].filter(Boolean);

    const task = (async () => {
      for (const q of [...new Set(candidates)]) {
        try {
          const res = await fetch(API + encodeURIComponent(q));
          if (!res.ok) continue;
          const json = await res.json();
          const teams = (json && json.teams) || [];
          if (!teams.length) continue;

          // Filtros para priorizar futebol masculino no Brasil
          const filtered = teams.filter(t =>
            (!t.strSport || strip(t.strSport) === 'soccer') &&
            (!t.strCountry || strip(t.strCountry) === 'brazil') &&
            (!t.strGender || strip(t.strGender) === 'male')
          );

          // Heurística de melhor escolha
          const best =
            filtered.find(t => strip(t.strTeam) === strip(teamName)) ||
            filtered[0] ||
            teams.find(t => strip(t.strTeam) === strip(teamName)) ||
            teams[0];

          if (best) {
            return best.strBadge || best.strTeamBadge || best.strLogo || null;
          }
        } catch (_) {
          // ignora e tenta próximo candidato
        }
      }
      return null;
    })();

    cache.set(key, task);
    return task;
  }

  async function hydrateCrests() {
    const imgs = document.querySelectorAll('img[data-crest][data-team]');
    for (const img of imgs) {
      const team = img.dataset.team?.trim();
      if (!team) continue;
      img.setAttribute('loading', 'lazy');

      const badgeUrl = await fetchBadge(team);
      if (badgeUrl) {
        img.src = badgeUrl;
        img.alt = `Escudo ${team}`;
      } else {
        img.removeAttribute('src');
        img.alt = 'Escudo não encontrado';
        // Opcional: placeholder simples
        // img.src = 'https://placehold.co/96x96?text=?';
      }
    }
  }

  // Dispara ao carregar a página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrateCrests);
  } else {
    hydrateCrests();
  }
})();