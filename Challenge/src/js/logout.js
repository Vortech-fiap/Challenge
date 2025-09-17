//LOGOUT
function doLogout() {
  
    localStorage.removeItem('authToken');

    
    localStorage.removeItem('ff_session');
    sessionStorage.removeItem('ff_session');

    
    location.hash = '';
    location.replace('../../index.html'); 
    
  }

  // --- Modal helpers ---
  const modal = document.getElementById('logoutModal');
  const panel = document.getElementById('logoutPanel');
  const overlay = modal.querySelector('[data-overlay]');
  const btnCancel = document.getElementById('logoutCancel');
  const btnConfirm = document.getElementById('logoutConfirm');
  const btnLogout = document.getElementById('btnLogout');

  let lastFocus = null;

  function openLogoutModal() {
    lastFocus = document.activeElement;
    modal.classList.remove('hidden');
    // animação de entrada
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0');
      panel.classList.remove('opacity-0', 'translate-y-3', 'sm:scale-95');
    });
    // acessibilidade: foca no botão "Sair"
    setTimeout(() => btnConfirm.focus(), 60);
    document.addEventListener('keydown', onEscClose, { once: true });
  }

  function closeLogoutModal() {
    // animação de saída
    overlay.classList.add('opacity-0');
    panel.classList.add('opacity-0', 'translate-y-3', 'sm:scale-95');
    // aguarda a transição (~150ms)
    setTimeout(() => {
      modal.classList.add('hidden');
      lastFocus?.focus();
    }, 160);
  }

  function onEscClose(e) {
    if (e.key === 'Escape') closeLogoutModal();
  }

  // --- Ligações dos botões ---
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      openLogoutModal();
    });
  }
  btnCancel.addEventListener('click', closeLogoutModal);
  overlay.addEventListener('click', closeLogoutModal);
  btnConfirm.addEventListener('click', () => {
    closeLogoutModal();
    doLogout();
  });

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnExcluir');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.replace('../../index.html');
    });
});