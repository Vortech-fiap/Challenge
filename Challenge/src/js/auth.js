// Tabs & switches
    const tabLogin = document.getElementById('tabLogin');
    const tabCadastro = document.getElementById('tabCadastro');
    const formLogin = document.getElementById('formLogin');
    const formCadastro = document.getElementById('formCadastro');

    function selectTab(key) {
      const isLogin = key === 'login';
      tabLogin.classList.toggle('active', isLogin);
      tabCadastro.classList.toggle('active', !isLogin);
      if (isLogin) {
        tabLogin.classList.add('bg-white', 'text-brand-700', 'font-semibold');
        tabCadastro.classList.remove('bg-white', 'text-brand-700', 'font-semibold');
        tabCadastro.classList.add('text-slate-600', 'font-medium');
      } else {
        tabCadastro.classList.add('bg-white', 'text-brand-700', 'font-semibold');
        tabLogin.classList.remove('bg-white', 'text-brand-700', 'font-semibold');
        tabLogin.classList.add('text-slate-600', 'font-medium');
      }
      formLogin.classList.toggle('hidden', !isLogin);
      formCadastro.classList.toggle('hidden', isLogin);
    }
    tabLogin.addEventListener('click', () => selectTab('login'));
    tabCadastro.addEventListener('click', () => selectTab('cadastro'));
    document.getElementById('toLogin')?.addEventListener('click', () => selectTab('login'));
    selectTab('login');

    // Mostrar/ocultar senha
    document.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.querySelector(btn.dataset.toggle);
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    // Modal reset
    const modal = document.getElementById('modalReset');
    document.getElementById('btnReset').addEventListener('click', () => modal.classList.remove('hidden'));
    document.getElementById('resetCancel').addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('resetSend').addEventListener('click', () => {
      modal.classList.add('hidden');
      showToast('Se existir uma conta, enviaremos o email 😉');
    });

    // Helpers
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const redirectAfterLogin = 'src/pages/inicio.html';
    function showToast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.classList.remove('hidden');
      setTimeout(() => el.classList.add('hidden'), 1800);
    }

    // "Banco" LocalStorage
    function getUsers() {
      try { return JSON.parse(localStorage.getItem('ff_users') || '[]'); } catch { return []; }
    }
    function setUsers(list) { localStorage.setItem('ff_users', JSON.stringify(list)); }
    function setSession(user, remember) {
      const data = { email: user.email, name: user.name, user: user.user, ts: Date.now() };
      if (remember) localStorage.setItem('ff_session', JSON.stringify(data));
      else sessionStorage.setItem('ff_session', JSON.stringify(data));
    }

    // LOGIN
    formLogin.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // clear errors
      ['loginEmailErr', 'loginPwdErr'].forEach(id => document.getElementById(id).classList.remove('show'));

      const email = document.getElementById('loginEmail').value.trim();
      const pwd = document.getElementById('loginPwd').value;
      const remember = document.getElementById('remember').checked;

      let ok = true;
      if (!emailRegex.test(email)) { ok = false; document.getElementById('loginEmailErr').classList.add('show'); }
      if (!pwd) { ok = false; document.getElementById('loginPwdErr').classList.add('show'); }
      if (!ok) return;

      const users = getUsers();
      const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.pwd === pwd);
      if (!u) { showToast('Credenciais inválidas ❌'); return; }

      setSession(u, remember);
      showToast('Bem-vindo(a) de volta! ✅');
      setTimeout(() => location.href = redirectAfterLogin, 650);
    });

    // CADASTRO
    formCadastro.addEventListener('submit', (ev) => {
      ev.preventDefault();
      ['cadNomeErr', 'cadUserErr', 'cadEmailErr', 'cadPwdErr', 'cadPwd2Err', 'cadTermosErr'].forEach(id => document.getElementById(id).classList.remove('show'));

      const name = document.getElementById('cadNome').value.trim();
      const user = document.getElementById('cadUser').value.trim();
      const email = document.getElementById('cadEmail').value.trim();
      const pwd = document.getElementById('cadPwd').value;
      const pwd2 = document.getElementById('cadPwd2').value;
      const termos = document.getElementById('cadTermos').checked;

      let ok = true;
      if (!name) ok = (document.getElementById('cadNomeErr').classList.add('show'), false);
      if (!user) ok = (document.getElementById('cadUserErr').classList.add('show'), false);
      if (!emailRegex.test(email)) ok = (document.getElementById('cadEmailErr').classList.add('show'), false);
      if (!pwd || pwd.length < 6) ok = (document.getElementById('cadPwdErr').classList.add('show'), false);
      if (pwd !== pwd2) ok = (document.getElementById('cadPwd2Err').classList.add('show'), false);
      if (!termos) ok = (document.getElementById('cadTermosErr').classList.add('show'), false);
      if (!ok) return;

      const users = getUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast('Este email já está cadastrado ⚠️');
        return;
      }
      const newUser = { name, user, email, pwd, createdAt: Date.now() };
      users.push(newUser); setUsers(users); setSession(newUser, true);
      showToast('Conta criada! 🎉');
      setTimeout(() => location.href = redirectAfterLogin, 700);
    });

    // Se já existir sessão, pula auth
    (function autoRedirect() {
      if (localStorage.getItem('ff_session') || sessionStorage.getItem('ff_session')) {
        location.href = redirectAfterLogin;
      }
    })();