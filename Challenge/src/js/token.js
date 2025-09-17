(function enforceAuth() {
    // Ajuste o caminho se precisar (ex.: '../index.html')
    const LOGIN_PAGE = '../../index.html';

    const isLoginPage = location.pathname.endsWith('/index.html') || /\/$/.test(location.pathname);
    if (isLoginPage) return;

    // Helpers
    const parseJSON = (s) => { try { return JSON.parse(s); } catch { return null; } };
    const getSession = () =>
      parseJSON(localStorage.getItem('ff_session')) ||
      parseJSON(sessionStorage.getItem('ff_session'));

    const session = getSession();

    if (!session || !session.email || !session.user) {
      location.replace(LOGIN_PAGE);
      return;
    }

    const users = parseJSON(localStorage.getItem('ff_users')) || [];
    const exists = users.some(u => u.email?.toLowerCase() === session.email?.toLowerCase());
    if (!exists) {
      localStorage.removeItem('ff_session');
      sessionStorage.removeItem('ff_session');
      location.replace(LOGIN_PAGE);
      return;
    }

    const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias
    if (Date.now() - (session.ts || 0) > MAX_AGE_MS) {
      localStorage.removeItem('ff_session');
      sessionStorage.removeItem('ff_session');
      location.replace(LOGIN_PAGE);
    }
})();

