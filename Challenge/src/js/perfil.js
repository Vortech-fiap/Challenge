// Link ativo
function setActiveFromHash() {
    const route = (location.hash.replace('#/', '') || 'perfil').toLowerCase();
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const current = document.querySelector(`.nav-link[data-route="${route}"]`);
    if (current) current.classList.add('active');
}
window.addEventListener('hashchange', setActiveFromHash);
if (!location.hash) location.hash = '';
setActiveFromHash();


// Avatar: abre input e faz preview
const avatarBtn = document.getElementById('btnAvatar');
const avatarInput = document.getElementById('avatarInput');
const avatarImg = document.getElementById('avatarImg');
avatarBtn.addEventListener('click', () => avatarInput.click());
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        avatarImg.src = reader.result;
        localStorage.setItem('perfil_avatar', reader.result);
        showToast('Foto atualizada ✅');
    };
    reader.readAsDataURL(file);
});

// Util: toast
function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    el.classList.add('animate-pop');
    setTimeout(() => el.classList.add('hidden'), 1800);
}

// === Helpers atualizados (garantem que a senha venha quando houver em ff_users) ===
function _parseJSONSafe(s, fallback) { try { return JSON.parse(s); } catch { return fallback; } }
function getAuthSession() {
    return _parseJSONSafe(localStorage.getItem('ff_session'), null)
        || _parseJSONSafe(sessionStorage.getItem('ff_session'), null);
}
function getAuthUsers() { return _parseJSONSafe(localStorage.getItem('ff_users'), []); }
function getCurrentAuthUser() {
    const sess = getAuthSession();
    if (!sess?.email) return null;
    const users = getAuthUsers();
    const u = users.find(x => x.email?.toLowerCase() === sess.email.toLowerCase());
    // se achou no ff_users, retorna com pwd; senão, fallback sem pwd
    return u || { name: sess.name, user: sess.user, email: sess.email };
}

// --------- SUBSTITUA sua loadProfile() por esta ---------
function loadProfile() {
    try {
        const info = JSON.parse(localStorage.getItem('perfil_info') || '{}');
        const prefs = JSON.parse(localStorage.getItem('perfil_prefs') || '{}');
        const av = localStorage.getItem('perfil_avatar');
        if (av) avatarImg.src = av;

        // preencher info salvas do perfil
        const f = document.getElementById('formInfo');
        ['nome', 'user', 'email', 'fone', 'local', 'bio'].forEach(k => {
            if (info[k]) f.elements[k].value = info[k];
        });

        // 🔗 Dados vindos do AUTH (ff_session/ff_users)
        const auth = getCurrentAuthUser();

        if (auth) {
            const mapAuthToForm = {
                nome: auth.name,
                user: auth.user,
                email: auth.email
            };

            // Preenche somente se vazio e trava o campo (readonly)
            Object.entries(mapAuthToForm).forEach(([key, val]) => {
                const el = f.elements[key];
                if (!el) return;
                if (!el.value && val) {
                    el.value = val;
                }
                // Trava o campo se houver valor (do perfil ou do auth)
                if (el.value) {
                    el.readOnly = true;
                    el.dataset.locked = 'auth';
                    // estilinho leve para indicar bloqueado (ajuste classes conforme seu design system)
                    el.classList.add('bg-slate-50', 'cursor-not-allowed');
                    // dica visual opcional (se você tiver um <small id="tip-nome"> etc.)
                    const tip = document.getElementById(`tip-${key}`);
                    if (tip) tip.textContent = 'Dados da sua conta';
                }
            });

            // (Opcional) Se quiser mostrar um status de senha já definida:
            // const pwdStatus = document.getElementById('pwdStatus');
            // if (pwdStatus && ('pwd' in auth)) pwdStatus.textContent = 'Senha definida';
        }

        // preencher prefs
        const p = document.getElementById('formPrefs');
        if (prefs.tema) p.elements['tema'].value = prefs.tema;
        ['notif_email', 'notif_push', 'newsletter'].forEach(k => p.elements[k].checked = !!prefs[k]);
        // chips
        (prefs.times || []).forEach(t => {
            const chip = document.querySelector(`.chip[data-time="${t}"]`);
            if (chip) chip.classList.add('active');
        });
        // 2FA
        document.getElementById('twofa').checked = !!JSON.parse(localStorage.getItem('perfil_twofa') || 'false');
    } catch (e) {
        console.warn('perfil load', e);
    }
}

// (Opcional) botão para liberar edição dos campos travados, caso você queira adicionar no HTML:

document.getElementById('unlockCore')?.addEventListener('click', () => {
    const f = document.getElementById('formInfo');
    ['nome', 'user', 'email'].forEach(k => {
        const el = f.elements[k];
        if (!el) return;
        el.readOnly = false;
        el.classList.remove('bg-slate-50', 'cursor-not-allowed');
        delete el.dataset.locked;
    });
});
loadProfile();

// Salvar Info
document.getElementById('formInfo').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const f = ev.target;
    const data = {
        nome: f.elements['nome'].value.trim(),
        user: f.elements['user'].value.trim(),
        email: f.elements['email'].value.trim(),
        fone: f.elements['fone'].value.trim(),
        local: f.elements['local'].value.trim(),
        bio: f.elements['bio'].value.trim()
    };
    localStorage.setItem('perfil_info', JSON.stringify(data));
    document.getElementById('infoSaved').classList.remove('hidden');
    showToast('Informações salvas ✅');
});

// Chips times
const timesSel = new Set();
document.querySelectorAll('#chipsTimes .chip').forEach(ch => {
    ch.addEventListener('click', () => {
        ch.classList.toggle('active');
        const key = ch.dataset.time;
        if (ch.classList.contains('active')) timesSel.add(key); else timesSel.delete(key);
    });
});

// Salvar Prefs
document.getElementById('formPrefs').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const p = ev.target;
    const prefs = {
        notif_email: p.elements['notif_email'].checked,
        notif_push: p.elements['notif_push'].checked,
        newsletter: p.elements['newsletter'].checked,
        tema: p.elements['tema'].value,
        times: [...document.querySelectorAll('#chipsTimes .chip.active')].map(c => c.dataset.time)
    };
    localStorage.setItem('perfil_prefs', JSON.stringify(prefs));
    document.getElementById('prefsSaved').classList.remove('hidden');
    showToast('Preferências salvas ✅');
});

// Segurança (atualiza senha no ff_users)
document.getElementById('formSeg').addEventListener('submit', (ev) => {
  ev.preventDefault();
  const form = ev.target;

  const oldPwd = (form.elements['old']?.value || '').trim();
  const newPwd = (form.elements['new']?.value || '').trim();
  const confirm = (form.elements['confirm']?.value || '').trim();
  const twofaChecked = !!document.getElementById('twofa')?.checked;

  if (!newPwd || newPwd.length < 6) {
    showToast('Nova senha deve ter ao menos 6 caracteres ⚠️');
    return;
  }
  if (newPwd !== confirm) {
    showToast('As senhas não coincidem ❌');
    return;
  }


  const sess = getAuthSession();       
  const users = getAuthUsers();            
  if (!sess?.email) {
    showToast('Sessão não encontrada. Faça login novamente.');
    return;
  }

  let idx = users.findIndex(u => (u.email || '').toLowerCase() === sess.email.toLowerCase());

  if (idx >= 0) {
    const savedPwd = users[idx].pwd || '';
    if (!oldPwd || savedPwd !== oldPwd) {
      showToast('Senha atual incorreta ❌');
      return;
    }
  }


  if (idx === -1) {
    users.push({
      name: sess.name || '',
      user: sess.user || '',
      email: sess.email,
      pwd: newPwd,
      createdAt: Date.now()
    });
    idx = users.length - 1;
  } else {
    users[idx].pwd = newPwd;
  }

  localStorage.setItem('ff_users', JSON.stringify(users));
  localStorage.setItem('perfil_twofa', JSON.stringify(twofaChecked));

  document.getElementById('segSaved')?.classList.remove('hidden');
  showToast('Segurança atualizada ✅');

  const oldField = form.elements['old'];
  if (oldField) {
    oldField.value = newPwd;
    oldField.readOnly = true;
    oldField.classList.add('bg-slate-50', 'cursor-not-allowed', 'text-slate-700');
  }

  form.elements['new'].value = '';
  form.elements['confirm'].value = '';

  document.getElementById('twofa').checked = JSON.parse(localStorage.getItem('perfil_twofa') || 'false');
});

// Botão salvar do topo
document.getElementById('btnSalvarTopo').addEventListener('click', () => {
    document.getElementById('formInfo').dispatchEvent(new Event('submit', { cancelable: true }));
    document.getElementById('formPrefs').dispatchEvent(new Event('submit', { cancelable: true }));
});

document.addEventListener('DOMContentLoaded', () => {

  const j = (s) => { try { return JSON.parse(s); } catch { return null; } };
  const sess = j(localStorage.getItem('ff_session')) || j(sessionStorage.getItem('ff_session'));
  if (!sess?.email) return;

  const users = j(localStorage.getItem('ff_users')) || [];
  const auth = users.find(u => (u.email || '').toLowerCase() === sess.email.toLowerCase());
  if (!auth?.pwd) return; 


  const pwdField = document.querySelector('#formSeg input[name="old"]') 
                || document.querySelector('input[name="old"]');
  if (!pwdField) return;

  pwdField.value = auth.pwd;
  pwdField.type = 'password';
  pwdField.readOnly = true;
  pwdField.classList.add('bg-slate-50', 'cursor-not-allowed', 'text-slate-700');

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = 'Mostrar';
  toggle.className = 'mt-2 mb-5 text-sm border border-brand-700 p-1 rounded text-brand-700 text-sm font-semibold transition-all shadow hover:shadow-lg hover:-translate-y-0.5';
  pwdField.insertAdjacentElement('afterend', toggle);
  toggle.addEventListener('click', () => {
    const showing = pwdField.type === 'text';
    pwdField.type = showing ? 'password' : 'text';
    toggle.textContent = showing ? 'Mostrar' : 'Ocultar';
  });
});