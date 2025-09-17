const sidebar = document.getElementById('sidebar');
const btnMenu = document.getElementById('btnMenu');
if (btnMenu) {
    btnMenu.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        sidebar.classList.toggle('fixed');
        sidebar.classList.toggle('inset-0');
        sidebar.classList.toggle('z-50');
        sidebar.classList.toggle('p-6');
    });
}